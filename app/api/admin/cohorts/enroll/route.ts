import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// POST /api/admin/cohorts/enroll — enroll an approved applicant into a cohort
const EnrollSchema = z.object({
  cohort_id: z.string().uuid(),
  student_id: z.string().uuid(),
})

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin' && profile.role !== 'founder') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const parsed = EnrollSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const adminSupabase = createAdminSupabaseClient()

  // Check cohort capacity
  const { data: cohort } = await adminSupabase
    .from('cohorts')
    .select('max_students, cohort_students(id)')
    .eq('id', parsed.data.cohort_id)
    .single()

  if (cohort) {
    const enrolled = (cohort.cohort_students as { id: string }[]).length
    if (enrolled >= cohort.max_students) {
      return NextResponse.json({ error: 'Cohort is at capacity' }, { status: 409 })
    }
  }

  const { error } = await adminSupabase
    .from('cohort_students')
    .upsert(
      { cohort_id: parsed.data.cohort_id, student_id: parsed.data.student_id, status: 'active' },
      { onConflict: 'cohort_id,student_id' }
    )

  if (error) {
    console.error('[admin/cohorts/enroll] error:', error.message)
    return NextResponse.json({ error: 'Failed to enroll student' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

// GET /api/admin/cohorts/enroll?cohort_id= — get available facilitators for assignment
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .eq('role', 'facilitator')
    .eq('is_active', true)
    .order('full_name')

  if (error) return NextResponse.json({ error: 'Failed to load facilitators' }, { status: 500 })
  return NextResponse.json({ data: data ?? [] })
}
