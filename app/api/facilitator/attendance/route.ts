import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

const AttendanceSchema = z.object({
  weekly_flow_id: z.string().uuid(),
  records: z.array(z.object({
    student_id: z.string().uuid(),
    status: z.enum(['present', 'absent', 'late', 'excused']),
    notes: z.string().optional(),
  })).min(1),
})

// GET  /api/facilitator/attendance?cohort_id=&weekly_flow_id=
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'facilitator' && profile.role !== 'admin' && profile.role !== 'founder') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const weekly_flow_id = searchParams.get('weekly_flow_id')

  if (!weekly_flow_id) return NextResponse.json({ error: 'weekly_flow_id required' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('attendance')
    .select('student_id, status, notes, recorded_at, profiles!student_id(full_name, email)')
    .eq('weekly_flow_id', weekly_flow_id)

  if (error) return NextResponse.json({ error: 'Failed to load attendance' }, { status: 500 })
  return NextResponse.json({ data: data ?? [] })
}

// POST /api/facilitator/attendance — upsert attendance for a session
export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'facilitator' && profile.role !== 'admin' && profile.role !== 'founder') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const parsed = AttendanceSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const rows = parsed.data.records.map((r) => ({
    weekly_flow_id: parsed.data.weekly_flow_id,
    student_id: r.student_id,
    status: r.status,
    notes: r.notes ?? null,
    recorded_by: profile.id,
    recorded_at: new Date().toISOString(),
  }))

  const { error } = await supabase
    .from('attendance')
    .upsert(rows, { onConflict: 'weekly_flow_id,student_id' })

  if (error) {
    console.error('[attendance] upsert error:', error.message)
    return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 })
  }

  return NextResponse.json({ success: true, count: rows.length })
}
