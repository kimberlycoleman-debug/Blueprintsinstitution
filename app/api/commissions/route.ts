import { NextResponse } from 'next/server'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// GET /api/commissions — student fetches their own commission + eligibility status
export async function GET() {
  const supabase = await createServerSupabaseClient()
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminSupabaseClient()

  // Get commission record if exists
  const { data: commission } = await admin
    .from('commissions')
    .select('*, cohorts(cohort_name, cohort_code)')
    .eq('student_id', profile.id)
    .maybeSingle()

  // Compute live eligibility from source tables
  const [ibRes, psRes, mpRes, cohortRes] = await Promise.all([
    supabase.from('identity_blueprints').select('id').eq('student_id', profile.id).maybeSingle(),
    supabase.from('purpose_statements').select('id').eq('student_id', profile.id).maybeSingle(),
    supabase.from('ministry_plans').select('id').eq('student_id', profile.id).maybeSingle(),
    admin
      .from('cohort_students')
      .select('cohort_id, status')
      .eq('student_id', profile.id)
      .in('status', ['active', 'completed'])
      .limit(1)
      .maybeSingle(),
  ])

  // Attendance percentage from cohort
  let attendancePct: number | null = null
  if (cohortRes.data?.cohort_id) {
    const { data: attRows } = await admin
      .from('attendance')
      .select('status')
      .eq('student_id', profile.id)
      .eq('cohort_id', cohortRes.data.cohort_id)

    if (attRows && attRows.length > 0) {
      const present = attRows.filter(r => r.status === 'present' || r.status === 'excused').length
      attendancePct = Math.round((present / attRows.length) * 100)
    }
  }

  // Lesson completion count
  const { count: lessonsCompleted } = await supabase
    .from('progress')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', profile.id)
    .not('completed_at', 'is', null)

  const eligibility = {
    identity_blueprint_complete: !!ibRes.data,
    purpose_statement_complete: !!psRes.data,
    ministry_plan_complete: !!mpRes.data,
    attendance_percentage: attendancePct,
    lessons_completed: lessonsCompleted ?? 0,
    community_covenant_signed: commission?.community_covenant_signed ?? false,
    cohort_id: cohortRes.data?.cohort_id ?? null,
  }

  const meetsThreshold =
    eligibility.identity_blueprint_complete &&
    eligibility.purpose_statement_complete &&
    eligibility.ministry_plan_complete &&
    (eligibility.attendance_percentage ?? 0) >= 70

  return NextResponse.json({
    commission,
    eligibility,
    meetsThreshold,
    studentName: profile.full_name ?? null,
  })
}
