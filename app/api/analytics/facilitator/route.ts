import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

interface TIRecord {
  student_id: string
  checkpoint: string
  composite_index: number | null
  identity_score: number | null
  healing_score: number | null
  calling_score: number | null
  maturity_score: number | null
  composite_delta: number | null
  confidence_flag: string | null
  computed_at: string
}

export async function GET() {
  const supabase = await createServerSupabaseClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const facilitatorId = user.id

  // Get cohorts assigned to this facilitator
  const { data: facilitatorCohorts } = await supabase
    .from('cohort_facilitators')
    .select('cohort_id')
    .eq('facilitator_id', facilitatorId)

  const cohortIds = (facilitatorCohorts ?? []).map(r => r.cohort_id)

  if (cohortIds.length === 0) {
    return NextResponse.json({ cohortAnalytics: [], studentTI: [], atRiskStudents: [] })
  }

  // Cohort analytics — latest snapshot per cohort
  const { data: allSnapshots } = await supabase
    .from('cohort_analytics')
    .select(`
      id,
      cohort_id,
      snapshot_date,
      total_enrolled,
      active_students,
      withdrawn_students,
      completed_students,
      avg_attendance_rate,
      avg_lesson_completion_rate,
      avg_reflection_submission_rate,
      avg_current_index,
      avg_baseline_index,
      avg_index_gain,
      avg_identity_score,
      avg_healing_score,
      avg_calling_score,
      avg_maturity_score,
      identity_blueprints_submitted,
      purpose_statements_submitted,
      ministry_plans_submitted,
      at_risk_count,
      retention_rate,
      cohorts (
        cohort_name,
        cohort_code,
        status,
        start_date,
        end_date
      )
    `)
    .in('cohort_id', cohortIds)
    .order('snapshot_date', { ascending: false })

  // De-duplicate: keep only the most recent snapshot per cohort
  type CohortSnap = NonNullable<typeof allSnapshots>[number]
  const latestByCohort = new Map<string, CohortSnap>()
  for (const snap of allSnapshots ?? []) {
    if (!latestByCohort.has(snap.cohort_id)) {
      latestByCohort.set(snap.cohort_id, snap)
    }
  }
  const cohortAnalytics = Array.from(latestByCohort.values())

  // Get all students in these cohorts
  const { data: cohortStudents } = await supabase
    .from('cohort_students')
    .select(`
      student_id,
      cohort_id,
      status,
      profiles (
        id,
        full_name,
        email
      ),
      cohorts (
        cohort_name,
        cohort_code
      )
    `)
    .in('cohort_id', cohortIds)
    .eq('status', 'active')

  const studentIds = [...new Set((cohortStudents ?? []).map(s => s.student_id))]

  // Transformation Index — latest per student
  const tiAllRecords: TIRecord[] = studentIds.length > 0
    ? ((await supabase
        .from('transformation_index')
        .select(`
          student_id,
          checkpoint,
          composite_index,
          identity_score,
          healing_score,
          calling_score,
          maturity_score,
          composite_delta,
          confidence_flag,
          computed_at
        `)
        .in('student_id', studentIds)
        .order('computed_at', { ascending: false })).data ?? [])
    : []

  // Latest TI per student
  const latestTIByStudent = new Map<string, TIRecord>()
  for (const ti of tiAllRecords) {
    if (!latestTIByStudent.has(ti.student_id)) {
      latestTIByStudent.set(ti.student_id, ti)
    }
  }

  // Baseline TI per student (checkpoint = 'baseline')
  const baselineTIByStudent = new Map<string, number>()
  for (const ti of tiAllRecords) {
    if (ti.checkpoint === 'baseline') {
      baselineTIByStudent.set(ti.student_id, ti.composite_index ?? 0)
    }
  }

  // Build student TI table
  const studentTI = (cohortStudents ?? []).map(s => {
    const latest = latestTIByStudent.get(s.student_id)
    const baseline = baselineTIByStudent.get(s.student_id) ?? null
    return {
      student_id: s.student_id,
      cohort_id: s.cohort_id,
      full_name: (s.profiles as { full_name: string | null } | null)?.full_name ?? 'Unknown',
      email: (s.profiles as { email: string } | null)?.email ?? '',
      cohort_name: (s.cohorts as { cohort_name: string } | null)?.cohort_name ?? '',
      latest_checkpoint: latest?.checkpoint ?? null,
      composite_index: latest?.composite_index ?? null,
      baseline_index: baseline,
      gain: latest?.composite_index != null && baseline != null
        ? latest.composite_index - baseline
        : null,
      identity_score: latest?.identity_score ?? null,
      healing_score: latest?.healing_score ?? null,
      calling_score: latest?.calling_score ?? null,
      maturity_score: latest?.maturity_score ?? null,
      confidence_flag: latest?.confidence_flag ?? null,
    }
  })

  // At-risk: students with at_risk signal from cohort analytics at_risk_count > 0
  // Plus students with low TI (composite < 40) or no recent engagement
  const atRiskStudents = studentTI.filter(
    s => s.composite_index != null && s.composite_index < 40
  )

  return NextResponse.json({
    cohortAnalytics,
    studentTI,
    atRiskStudents,
  })
}
