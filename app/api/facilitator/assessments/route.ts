import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

const AssessmentSchema = z.object({
  student_id: z.string().uuid(),
  cohort_id: z.string().uuid(),
  checkpoint: z.enum(['baseline', 'q1_end', 'q2_end', 'q3_end', 'q4_end', 'commissioning']),
  dimension: z.enum(['identity', 'healing', 'calling', 'maturity', 'community']),
  score_numeric: z.number().int().min(0).max(100).optional(),
  score_qualitative: z.enum(['not_demonstrated', 'emerging', 'demonstrated', 'embodied']).optional(),
  narrative: z.string().optional(),
})

// GET  /api/facilitator/assessments?student_id=&cohort_id=
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'facilitator' && profile.role !== 'admin' && profile.role !== 'founder') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const student_id = searchParams.get('student_id')
  const cohort_id = searchParams.get('cohort_id')

  if (!student_id || !cohort_id) {
    return NextResponse.json({ error: 'student_id and cohort_id required' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', student_id)
    .eq('cohort_id', cohort_id)
    .eq('assessment_type', 'facilitator')
    .order('checkpoint')
    .order('dimension')

  if (error) return NextResponse.json({ error: 'Failed to load assessments' }, { status: 500 })
  return NextResponse.json({ data: data ?? [] })
}

// POST /api/facilitator/assessments — upsert one facilitator assessment score
export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'facilitator' && profile.role !== 'admin' && profile.role !== 'founder') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const parsed = AssessmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('assessments')
    .upsert({
      student_id: parsed.data.student_id,
      cohort_id: parsed.data.cohort_id,
      assessed_by: profile.id,
      assessment_type: 'facilitator',
      checkpoint: parsed.data.checkpoint,
      dimension: parsed.data.dimension,
      score_numeric: parsed.data.score_numeric ?? null,
      score_qualitative: parsed.data.score_qualitative ?? null,
      narrative: parsed.data.narrative ?? null,
      is_finalized: false,
      assessed_at: new Date().toISOString(),
    }, {
      onConflict: 'student_id,assessment_type,checkpoint,dimension',
    })

  if (error) {
    console.error('[assessments] upsert error:', error.message)
    return NextResponse.json({ error: 'Failed to save assessment' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
