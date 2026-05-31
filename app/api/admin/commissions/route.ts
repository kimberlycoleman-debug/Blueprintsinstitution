import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { sendCommissioningCertificate } from '@/lib/email/send'

const CreateSchema = z.object({
  student_id: z.string().uuid(),
  cohort_id: z.string().uuid(),
  commissioning_date: z.string().optional(),
  commissioning_location: z.string().optional(),
  calling_declaration: z.string().optional(),
  final_blessing: z.string().optional(),
  prophetic_words: z.array(z.string()).optional(),
  community_covenant_signed: z.boolean().default(false),
})

const UpdateSchema = z.object({
  id: z.string().uuid(),
  commissioning_date: z.string().optional(),
  commissioning_location: z.string().optional(),
  calling_declaration: z.string().optional(),
  final_blessing: z.string().optional(),
  prophetic_words: z.array(z.string()).optional(),
  community_covenant_signed: z.boolean().optional(),
  certificate_issued: z.boolean().optional(),
})

function generateCertNumber(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `BLUE-${year}-${rand}`
}
// GET /api/admin/commissions — all students with commission status
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile || (profile.role !== 'admin' && profile.role !== 'founder')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const cohortId = searchParams.get('cohort_id')
  const issued = searchParams.get('issued')

  const admin = createAdminSupabaseClient()

  // Get all commission records
  let query = admin
    .from('commissions')
    .select(`
      *,
      profiles!commissions_student_id_fkey(id, full_name, email),
      cohorts!commissions_cohort_id_fkey(cohort_name, cohort_code)
    `)
    .order('created_at', { ascending: false })

  if (cohortId) query = query.eq('cohort_id', cohortId)
  if (issued === 'true') query = query.eq('certificate_issued', true)
  if (issued === 'false') query = query.eq('certificate_issued', false)

  const { data: commissions, error } = await query
  if (error) return NextResponse.json({ error: 'Failed to load commissions' }, { status: 500 })

  // Also get all students in active/completed cohorts without a commission record
  const commissionedIds = (commissions ?? []).map(c => c.student_id)

  let eligibleQuery = admin
    .from('cohort_students')
    .select(`
      student_id,
      cohort_id,
      status,
      profiles!cohort_students_student_id_fkey(id, full_name, email),
      cohorts!cohort_students_cohort_id_fkey(cohort_name, cohort_code)
    `)
    .in('status', ['active', 'completed'])

  if (cohortId) eligibleQuery = eligibleQuery.eq('cohort_id', cohortId)
  const { data: cohortStudents } = await eligibleQuery

  const uncommissioned = (cohortStudents ?? []).filter(
    cs => !commissionedIds.includes(cs.student_id)
  )

  return NextResponse.json({
    commissions: commissions ?? [],
    uncommissioned,
  })
}

// POST /api/admin/commissions — create commission record
export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile || (profile.role !== 'admin' && profile.role !== 'founder')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const admin = createAdminSupabaseClient()

  // Pull live eligibility data
  const [ibRes, psRes, mpRes] = await Promise.all([
    admin.from('identity_blueprints').select('id').eq('student_id', parsed.data.student_id).maybeSingle(),
    admin.from('purpose_statements').select('id').eq('student_id', parsed.data.student_id).maybeSingle(),
    admin.from('ministry_plans').select('id').eq('student_id', parsed.data.student_id).maybeSingle(),
  ])

  // Attendance
  const { data: attRows } = await admin
    .from('attendance')
    .select('status')
    .eq('student_id', parsed.data.student_id)
    .eq('cohort_id', parsed.data.cohort_id)

  const attendancePct = attRows && attRows.length > 0
    ? Math.round(
        (attRows.filter(r => r.status === 'present' || r.status === 'excused').length / attRows.length) * 100
      )
    : null

  const { count: lessonsCompleted } = await admin
    .from('progress')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', parsed.data.student_id)
    .not('completed_at', 'is', null)

  const certNumber = generateCertNumber()

  const { data, error } = await admin
    .from('commissions')
    .insert({
      ...parsed.data,
      certificate_number: certNumber,
      identity_blueprint_complete: !!ibRes.data,
      purpose_statement_complete: !!psRes.data,
      ministry_plan_complete: !!mpRes.data,
      attendance_percentage: attendancePct,
      lessons_completed: lessonsCompleted ?? 0,
    })
    .select('id')
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Student already commissioned' }, { status: 409 })
    }
    console.error('[admin/commissions] create error:', error.message)
    return NextResponse.json({ error: 'Failed to create commission' }, { status: 500 })
  }

  // Send commissioning email to the student
  try {
    const { data: studentProfile } = await admin
      .from('profiles')
      .select('email, full_name')
      .eq('id', parsed.data.student_id)
      .single()

    if (studentProfile?.email) {
      const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      await sendCommissioningCertificate(
        studentProfile.email,
        studentProfile.full_name ?? 'Student',
        certNumber,
        dateStr
      )
    }
  } catch (emailErr) {
    console.error('[admin/commissions] commissioning email error:', emailErr)
  }

  return NextResponse.json({ success: true, id: data.id })
}

// PATCH /api/admin/commissions — update commission (issue cert, set dates, add declaration)
export async function PATCH(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile || (profile.role !== 'admin' && profile.role !== 'founder')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const { id, ...rest } = parsed.data
  const admin = createAdminSupabaseClient()

  const { error } = await admin
    .from('commissions')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to update commission' }, { status: 500 })
  return NextResponse.json({ success: true })
}
