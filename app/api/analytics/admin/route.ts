import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

async function isAdmin(supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return profile?.role === 'admin' || profile?.role === 'facilitator'
}

export async function GET() {
  const supabase = await createServerSupabaseClient()

  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const admin = createAdminSupabaseClient()

  // Trigger compute_institute_metrics() to refresh today's snapshot
  await admin.rpc('compute_institute_metrics')

  // Latest institutional metrics snapshot
  const { data: metrics } = await admin
    .from('institutional_metrics')
    .select('*')
    .order('snapshot_date', { ascending: false })
    .limit(1)
    .maybeSingle()

  // All-time metrics history (last 12 snapshots for trend)
  const { data: metricsHistory } = await admin
    .from('institutional_metrics')
    .select(`
      snapshot_date,
      active_students_now,
      total_graduates,
      avg_transformation_index_alltime,
      overall_retention_rate,
      total_grant_funding_awarded,
      total_grant_funding_deployed,
      free_seats_funded
    `)
    .order('snapshot_date', { ascending: false })
    .limit(12)

  // Funding records — all (for grant report breakdown)
  const { data: fundingRecords } = await admin
    .from('funding_records')
    .select(`
      id,
      funding_type,
      status,
      source_name,
      amount_requested,
      amount_awarded,
      amount_deployed,
      free_seats_funded,
      period_start,
      period_end,
      reporting_deadline,
      is_restricted,
      restriction_description,
      notes
    `)
    .order('awarded_at', { ascending: false })

  // Funding summary
  const activeFunding = (fundingRecords ?? []).filter(f => ['awarded', 'reporting'].includes(f.status))
  const totalAwarded = activeFunding.reduce((sum, f) => sum + (f.amount_awarded ?? 0), 0)
  const totalDeployed = activeFunding.reduce((sum, f) => sum + (f.amount_deployed ?? 0), 0)
  const totalFreeSeats = (fundingRecords ?? []).reduce((sum, f) => sum + (f.free_seats_funded ?? 0), 0)

  // Upcoming reporting deadlines (next 60 days)
  const now = new Date()
  const in60 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
  const upcomingDeadlines = (fundingRecords ?? []).filter(f => {
    if (!f.reporting_deadline) return false
    const d = new Date(f.reporting_deadline)
    return d >= now && d <= in60
  })

  // Cohort outcomes summary — all completed cohorts
  const { data: completedCohorts } = await admin
    .from('cohort_analytics')
    .select(`
      cohort_id,
      snapshot_date,
      total_enrolled,
      completed_students,
      avg_index_gain,
      retention_rate,
      identity_blueprints_submitted,
      purpose_statements_submitted,
      ministry_plans_submitted,
      cohorts (
        cohort_name,
        cohort_code,
        start_date,
        end_date,
        status
      )
    `)
    .order('snapshot_date', { ascending: false })

  // Latest snapshot per cohort
  type CohortSnap = NonNullable<typeof completedCohorts>[number]
  const latestByCohort = new Map<string, CohortSnap>()
  for (const snap of completedCohorts ?? []) {
    if (!latestByCohort.has(snap.cohort_id)) {
      latestByCohort.set(snap.cohort_id, snap)
    }
  }
  const cohortOutcomes = Array.from(latestByCohort.values())

  return NextResponse.json({
    metrics,
    metricsHistory: (metricsHistory ?? []).reverse(),
    funding: {
      records: fundingRecords ?? [],
      totalAwarded,
      totalDeployed,
      totalFreeSeats,
      upcomingDeadlines,
    },
    cohortOutcomes,
  })
}
