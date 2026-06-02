import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import ApplicationActions from '@/components/admin/ApplicationActions'

const STATUS_STYLE: Record<string, string> = {
  submitted: 'bg-[var(--bp-cream)] text-[var(--bp-brown)] border-[var(--bp-sand)]',
  under_review: 'bg-blue-50 text-blue-700 border-blue-200',
  interview_scheduled: 'bg-purple-50 text-purple-700 border-purple-200',
  interview_complete: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  declined: 'bg-red-50 text-red-700 border-red-200',
  waitlisted: 'bg-gray-50 text-gray-600 border-gray-200',
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  if (profile.role !== 'admin' && profile.role !== 'founder') redirect('/dashboard')

  const supabase = createAdminSupabaseClient()

  const [{ data: app }, { data: cohortsData }] = await Promise.all([
    supabase.from('applications').select('*').eq('id', id).single(),
    supabase
      .from('cohorts')
      .select('id, cohort_name, cohort_code, status')
      .in('status', ['active', 'upcoming'])
      .order('start_date', { ascending: true }),
  ])

  if (!app) notFound()

  const cohorts = cohortsData ?? []

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin/applications" className="text-sm text-[var(--bp-muted)] hover:text-[var(--bp-text)]">
              ← All Applications
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">{app.full_name}</h1>
          <p className="text-[var(--bp-muted)] text-sm mt-0.5">{app.application_number} · Submitted {new Date(app.submitted_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full border flex-shrink-0 ${STATUS_STYLE[app.status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          {app.status.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Application content — left 2 cols */}
        <div className="md:col-span-2 space-y-5">

          {/* Contact info */}
          <div className="bp-card p-6">
            <h2 className="font-semibold text-sm text-[var(--bp-muted)] uppercase tracking-wide mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <p className="text-xs text-[var(--bp-muted)] mb-0.5">Email</p>
                <p className="font-medium">{app.email}</p>
              </div>
              {app.phone && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Phone</p>
                  <p className="font-medium">{app.phone}</p>
                </div>
              )}
              {(app.city || app.state) && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Location</p>
                  <p className="font-medium">{[app.city, app.state].filter(Boolean).join(', ')}</p>
                </div>
              )}
              {app.age_range && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Age range</p>
                  <p className="font-medium">{app.age_range}</p>
                </div>
              )}
              {app.gender && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Gender</p>
                  <p className="font-medium">{app.gender}</p>
                </div>
              )}
              {app.current_role_title && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Current role</p>
                  <p className="font-medium">{app.current_role_title}</p>
                </div>
              )}
              {app.hours_committed_weekly != null && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Hours/week committed</p>
                  <p className="font-medium">{app.hours_committed_weekly}h</p>
                </div>
              )}
            </div>
          </div>

          {/* Spiritual background */}
          <div className="bp-card p-6 space-y-4">
            <h2 className="font-semibold text-sm text-[var(--bp-muted)] uppercase tracking-wide">Spiritual Background</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {app.current_church && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Current church</p>
                  <p className="font-medium">{app.current_church}</p>
                </div>
              )}
              {app.salvation_year && (
                <div>
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Saved</p>
                  <p className="font-medium">{app.salvation_year}</p>
                </div>
              )}
              {app.spiritual_gifts && (
                <div className="col-span-2">
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Spiritual gifts</p>
                  <p>{app.spiritual_gifts}</p>
                </div>
              )}
              {app.prior_discipleship_experience && (
                <div className="col-span-2">
                  <p className="text-xs text-[var(--bp-muted)] mb-0.5">Prior discipleship experience</p>
                  <p>{app.prior_discipleship_experience}</p>
                </div>
              )}
            </div>
          </div>

          {/* Long-form responses */}
          <div className="bp-card p-6 space-y-5">
            <h2 className="font-semibold text-sm text-[var(--bp-muted)] uppercase tracking-wide">Application Responses</h2>
            <div>
              <p className="text-xs font-semibold text-[var(--bp-muted)] uppercase tracking-wide mb-1">Testimony</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{app.testimony}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--bp-muted)] uppercase tracking-wide mb-1">Why now?</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{app.why_now}</p>
            </div>
            {app.expectations && (
              <div>
                <p className="text-xs font-semibold text-[var(--bp-muted)] uppercase tracking-wide mb-1">Expectations</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{app.expectations}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions sidebar — right col */}
        <div className="space-y-4">
          <ApplicationActions
            applicationId={app.id}
            initialStatus={app.status}
            initialReviewerNotes={app.reviewer_notes}
            initialDecisionNotes={app.decision_notes}
            initialInterviewDate={app.interview_date}
            initialCohortId={app.assigned_cohort_id}
            cohorts={cohorts}
          />

          {/* Read-only history */}
          {(app.interview_date || app.decision_date || app.reviewed_by) && (
            <div className="bp-card p-5 text-xs space-y-2 text-[var(--bp-muted)]">
              <p className="font-semibold text-[var(--bp-text)] text-sm mb-3">History</p>
              {app.interview_date && <p>Interview: {new Date(app.interview_date).toLocaleDateString()}</p>}
              {app.decision_date && <p>Decision: {new Date(app.decision_date).toLocaleDateString()}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
