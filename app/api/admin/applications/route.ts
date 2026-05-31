import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// GET  /api/admin/applications?status=submitted&page=1
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = 25
  const offset = (page - 1) * limit

  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('applications')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) query = query.eq('status', status)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: 'Failed to load applications' }, { status: 500 })

  return NextResponse.json({ data: data ?? [], total: count ?? 0, page, limit })
}

const UpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['under_review', 'interview_scheduled', 'interview_complete', 'approved', 'declined', 'waitlisted']),
  reviewer_notes: z.string().optional(),
  interview_date: z.string().optional(),
  decision_notes: z.string().optional(),
  assigned_cohort_id: z.string().uuid().optional().nullable(),
})

// PATCH /api/admin/applications — update status/notes/cohort
export async function PATCH(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const adminSupabase = createAdminSupabaseClient()
  const update: Record<string, unknown> = {
    status: parsed.data.status,
    reviewed_by: profile.id,
    updated_at: new Date().toISOString(),
  }
  if (parsed.data.reviewer_notes !== undefined) update.reviewer_notes = parsed.data.reviewer_notes
  if (parsed.data.interview_date !== undefined) update.interview_date = parsed.data.interview_date
  if (parsed.data.decision_notes !== undefined) update.decision_notes = parsed.data.decision_notes
  if (parsed.data.assigned_cohort_id !== undefined) update.assigned_cohort_id = parsed.data.assigned_cohort_id
  if (parsed.data.status === 'approved' || parsed.data.status === 'declined') {
    update.decision_date = new Date().toISOString().split('T')[0]
  }

  const { error } = await adminSupabase
    .from('applications')
    .update(update)
    .eq('id', parsed.data.id)

  if (error) {
    console.error('[admin/applications] update error:', error.message)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
