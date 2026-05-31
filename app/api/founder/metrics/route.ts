import { NextResponse } from 'next/server'
import { isFounder, logFounderAction } from '@/lib/founder/protection'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// GET /api/founder/metrics — returns latest institutional_metrics row + triggers compute
export async function GET() {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminSupabaseClient()

  // Trigger a fresh compute (upserts today's snapshot)
  await admin.rpc('compute_institute_metrics').catch(() => null)

  // Fetch the latest snapshot
  const { data: metrics, error } = await admin
    .from('institutional_metrics')
    .select('*')
    .order('snapshot_date', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    // Return empty zeroed metrics if no data yet
    return NextResponse.json({ data: null })
  }

  // Also fetch all cohorts with their latest analytics snapshot
  const { data: cohorts } = await admin
    .from('cohorts')
    .select(`
      id, cohort_name, cohort_code, status, start_date, end_date,
      cohort_students (id, status),
      cohort_analytics (
        snapshot_date, total_enrolled, active_students,
        avg_attendance_rate, avg_current_index, avg_index_gain,
        at_risk_count, retention_rate
      )
    `)
    .order('start_date', { ascending: false })

  await logFounderAction('founder_analytics_view')

  return NextResponse.json({ data: metrics, cohorts: cohorts ?? [] })
}
