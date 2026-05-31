import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// GET  /api/facilitator/cohort/[cohort_id]/at-risk
// Calls detect_at_risk_students() and returns results.
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

  // Use admin client — detect_at_risk_students is security definer but needs unrestricted read
  const adminSupabase = createAdminSupabaseClient()
  const { data, error } = await adminSupabase.rpc('detect_at_risk_students', {
    p_cohort_id: cohort_id,
  })

  if (error) {
    console.error('[at-risk] rpc error:', error.message)
    return NextResponse.json({ error: 'Failed to run at-risk detection' }, { status: 500 })
  }

  return NextResponse.json({ data: data ?? [] })
}
