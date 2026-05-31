import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

// GET /api/facilitator/cohort/[cohort_id]/sessions
// Returns weekly_flow sessions for the cohort (for attendance selection).
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

  if (profile.role !== 'admin' && profile.role !== 'founder') {
    const { data: assignment } = await supabase
      .from('cohort_facilitators')
      .select('id')
      .eq('cohort_id', cohort_id)
      .eq('facilitator_id', profile.id)
      .maybeSingle()
    if (!assignment) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('weekly_flow')
    .select('id, week_number, scheduled_date, status, delivery_mode, lessons(id, title)')
    .eq('cohort_id', cohort_id)
    .order('week_number')

  if (error) return NextResponse.json({ error: 'Failed to load sessions' }, { status: 500 })
  return NextResponse.json({ data: data ?? [] })
}
