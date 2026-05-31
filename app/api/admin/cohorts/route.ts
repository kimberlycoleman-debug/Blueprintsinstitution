import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// GET  /api/admin/cohorts — list all cohorts with enrollment counts
export async function GET() {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin' && profile.role !== 'founder') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('cohorts')
    .select(`
      *,
      cohort_students (id, status),
      cohort_facilitators (
        role,
        profiles!facilitator_id (id, full_name, email)
      )
    `)
    .order('start_date', { ascending: false })

  if (error) return NextResponse.json({ error: 'Failed to load cohorts' }, { status: 500 })
  return NextResponse.json({ data: data ?? [] })
}

const CreateCohortSchema = z.object({
  cohort_name: z.string().min(2),
  cohort_code: z.string().min(2).max(20),
  start_date: z.string(),
  end_date: z.string(),
  status: z.enum(['upcoming', 'active', 'completed', 'paused']).default('upcoming'),
  max_students: z.number().int().min(1).max(200).default(25),
  notes: z.string().optional(),
  facilitator_ids: z.array(z.string().uuid()).optional(),
})

// POST /api/admin/cohorts — create a cohort (+ optionally assign facilitators)
export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const parsed = CreateCohortSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const adminSupabase = createAdminSupabaseClient()

  const { data: cohort, error: cohortError } = await adminSupabase
    .from('cohorts')
    .insert({
      cohort_name: parsed.data.cohort_name,
      cohort_code: parsed.data.cohort_code,
      start_date: parsed.data.start_date,
      end_date: parsed.data.end_date,
      status: parsed.data.status,
      max_students: parsed.data.max_students,
      notes: parsed.data.notes ?? null,
    })
    .select('id')
    .single()

  if (cohortError) {
    console.error('[admin/cohorts] create error:', cohortError.message)
    return NextResponse.json({ error: cohortError.message }, { status: 500 })
  }

  // Assign facilitators if provided
  if (parsed.data.facilitator_ids?.length) {
    const rows = parsed.data.facilitator_ids.map((id, i) => ({
      cohort_id: cohort.id,
      facilitator_id: id,
      role: i === 0 ? 'lead' : 'co_facilitator',
    }))
    await adminSupabase.from('cohort_facilitators').insert(rows)
  }

  return NextResponse.json({ success: true, cohort_id: cohort.id })
}

const UpdateCohortSchema = z.object({
  id: z.string().uuid(),
  cohort_name: z.string().min(2).optional(),
  status: z.enum(['upcoming', 'active', 'completed', 'paused']).optional(),
  notes: z.string().optional(),
  max_students: z.number().int().min(1).optional(),
})

// PATCH /api/admin/cohorts — update cohort status/name/notes
export async function PATCH(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin' && profile.role !== 'founder') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const parsed = UpdateCohortSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const adminSupabase = createAdminSupabaseClient()
  const { id, ...rest } = parsed.data
  const { error } = await adminSupabase
    .from('cohorts')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to update cohort' }, { status: 500 })
  return NextResponse.json({ success: true })
}
