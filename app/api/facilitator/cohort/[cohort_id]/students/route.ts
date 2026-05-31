import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

// GET  /api/facilitator/cohort/[cohort_id]/students
// Returns all active students in the cohort with progress + reflection counts.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ cohort_id: string }> }
) {
  const { cohort_id } = await params
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'facilitator' && profile.role !== 'admin' && profile.role !== 'founder') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = await createServerSupabaseClient()

  // Verify facilitator is assigned to this cohort (or is admin/founder)
  if (profile.role !== 'admin' && profile.role !== 'founder') {
    const { data: assignment } = await supabase
      .from('cohort_facilitators')
      .select('id')
      .eq('cohort_id', cohort_id)
      .eq('facilitator_id', profile.id)
      .maybeSingle()

    if (!assignment) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: students, error } = await supabase
    .from('cohort_students')
    .select(`
      id, status, enrollment_date,
      profiles!student_id (
        id, full_name, email,
        identity_blueprint_complete,
        purpose_statement_complete,
        ministry_plan_complete
      )
    `)
    .eq('cohort_id', cohort_id)
    .eq('status', 'active')
    .order('enrollment_date')

  if (error) {
    return NextResponse.json({ error: 'Failed to load students' }, { status: 500 })
  }

  // Get progress counts per student
  const studentIds = (students ?? []).map((s) => {
    const p = s.profiles as unknown as { id: string }
    return p.id
  })

  const { data: progressRows } = await supabase
    .from('progress')
    .select('student_id, completion_status')
    .eq('cohort_id', cohort_id)
    .in('student_id', studentIds)

  // Get reflection counts per student
  const { data: reflectionCounts } = await supabase
    .from('reflections')
    .select('student_id')
    .in('student_id', studentIds)

  const progressByStudent: Record<string, { completed: number; total: number }> = {}
  for (const row of progressRows ?? []) {
    if (!progressByStudent[row.student_id]) {
      progressByStudent[row.student_id] = { completed: 0, total: 0 }
    }
    progressByStudent[row.student_id].total++
    if (row.completion_status === 'completed') {
      progressByStudent[row.student_id].completed++
    }
  }

  const reflectionsByStudent: Record<string, number> = {}
  for (const row of reflectionCounts ?? []) {
    reflectionsByStudent[row.student_id] = (reflectionsByStudent[row.student_id] ?? 0) + 1
  }

  const enriched = (students ?? []).map((s) => {
    const p = s.profiles as unknown as { id: string; full_name: string | null; email: string; identity_blueprint_complete: boolean; purpose_statement_complete: boolean; ministry_plan_complete: boolean }
    return {
      enrollment_id: s.id,
      status: s.status,
      student_id: p.id,
      full_name: p.full_name,
      email: p.email,
      identity_blueprint_complete: p.identity_blueprint_complete,
      purpose_statement_complete: p.purpose_statement_complete,
      ministry_plan_complete: p.ministry_plan_complete,
      lessons_completed: progressByStudent[p.id]?.completed ?? 0,
      lessons_total: progressByStudent[p.id]?.total ?? 0,
      reflection_count: reflectionsByStudent[p.id] ?? 0,
    }
  })

  return NextResponse.json({ data: enriched })
}
