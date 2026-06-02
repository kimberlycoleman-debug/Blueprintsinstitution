import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { sendEnrollmentConfirmation } from '@/lib/email/send'

// GET  /api/admin/applications?status=submitted&page=1
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin' && profile.role !== 'founder') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = 25
  const offset = (page - 1) * limit

  // Use admin client — app-level auth check already verified admin/founder role above.
  // The server client is blocked by is_admin() RLS which excludes the founder role.
  const supabase = createAdminSupabaseClient()
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
  if (profile.role !== 'admin' && profile.role !== 'founder') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

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

  // Send enrollment email + Supabase invite when application is approved
  if (parsed.data.status === 'approved') {
    try {
      const adminSupabase2 = createAdminSupabaseClient()
      const { data: app } = await adminSupabase2
        .from('applications')
        .select('email, full_name, assigned_cohort_id')
        .eq('id', parsed.data.id)
        .single()

      if (app?.email) {
        let cohortName = 'your upcoming cohort'
        if (app.assigned_cohort_id) {
          const { data: cohort } = await adminSupabase2
            .from('cohorts')
            .select('cohort_name')
            .eq('id', app.assigned_cohort_id)
            .single()
          if (cohort) cohortName = cohort.cohort_name
        }

        // Generate a Supabase invite link so the student can create their account.
        // Derive the app origin from the inbound request so the redirect works on
        // any deployment (Vercel preview, production, localhost) without relying
        // on an env var fallback to the wrong domain.
        const host = request.headers.get('host') ?? ''
        const proto = host.startsWith('localhost') ? 'http' : 'https'
        const appOrigin = process.env.NEXT_PUBLIC_APP_URL ?? `${proto}://${host}`

        let inviteLink: string | null = null
        try {
          const { data: linkData, error: linkError } = await adminSupabase2.auth.admin.generateLink({
            type: 'invite',
            email: app.email,
            options: {
              redirectTo: `${appOrigin}/auth/callback?next=/auth/reset-password`,
            },
          })
          if (linkError) {
            console.error('[admin/applications] generateLink error:', linkError.message)
          } else {
            inviteLink = linkData?.properties?.action_link ?? null
          }
        } catch (linkErr) {
          console.error('[admin/applications] invite link error:', linkErr)
        }

        await sendEnrollmentConfirmation(app.email, app.full_name ?? 'Student', cohortName, inviteLink)
      }
    } catch (emailErr) {
      console.error('[admin/applications] enrollment email error:', emailErr)
    }
  }

  return NextResponse.json({ success: true })
}
