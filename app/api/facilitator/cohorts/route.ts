import { NextResponse } from 'next/server'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

// Returns all cohorts the current facilitator is assigned to,
// with enrollment counts and upcoming session.
export async function GET() {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'facilitator' && profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = await createServerSupabaseClient()

  // Get cohorts assigned to this facilitator
  const { data: assignments, error } = await supabase
    .from('cohort_facilitators')
    .select(`
      role,
      cohorts (
        id, cohort_name, cohort_code, status, start_date, end_date,
        cohort_students (id, status),
        weekly_flow (
          id, week_number, scheduled_date, delivery_mode, status,
          lessons (id, title)
        )
      )
    `)
    .eq('facilitator_id', profile.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[facilitator/cohorts] error:', error.message)
    return NextResponse.json({ error: 'Failed to load cohorts' }, { status: 500 })
  }

  return NextResponse.json({ data: assignments ?? [] })
}
