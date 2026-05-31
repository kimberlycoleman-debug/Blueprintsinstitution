'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

interface Application {
  id: string
  application_number: string
  full_name: string
  email: string
  phone: string | null
  city: string | null
  state: string | null
  testimony: string
  why_now: string
  expectations: string | null
  current_church: string | null
  current_role_title: string | null
  hours_committed_weekly: number | null
  status: string
  reviewer_notes: string | null
  interview_date: string | null
  decision_notes: string | null
  assigned_cohort_id: string | null
  submitted_at: string
}

interface Cohort {
  id: string
  cohort_name: string
  cohort_code: string
  status: string
}

const STATUS_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Under Review', value: 'under_review' },
  { label: 'Interview Scheduled', value: 'interview_scheduled' },
  { label: 'Approved', value: 'approved' },
  { label: 'Declined', value: 'declined' },
  { label: 'Waitlisted', value: 'waitlisted' },
]

const STATUS_STYLE: Record<string, string> = {
  submitted: 'bg-amber-50 text-amber-700 border-amber-200',
  under_review: 'bg-blue-50 text-blue-700 border-blue-200',
  interview_scheduled: 'bg-purple-50 text-purple-700 border-purple-200',
  interview_complete: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  declined: 'bg-red-50 text-red-700 border-red-200',
  waitlisted: 'bg-gray-50 text-gray-600 border-gray-200',
}

const NEXT_ACTIONS: Record<string, { label: string; status: string }[]> = {
  submitted: [{ label: 'Move to Review', status: 'under_review' }],
  under_review: [
    { label: 'Schedule Interview', status: 'interview_scheduled' },
    { label: 'Approve', status: 'approved' },
    { label: 'Waitlist', status: 'waitlisted' },
    { label: 'Decline', status: 'declined' },
  ],
  interview_scheduled: [{ label: 'Mark Interview Complete', status: 'interview_complete' }],
  interview_complete: [
    { label: 'Approve', status: 'approved' },
    { label: 'Waitlist', status: 'waitlisted' },
    { label: 'Decline', status: 'declined' },
  ],
}

export default function ApplicationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get('status') ?? ''

  const [applications, setApplications] = useState<Application[]>([])
  const [cohorts, setCohorts] = useState<Cohort[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Application | null>(null)
  const [reviewerNotes, setReviewerNotes] = useState('')
  const [decisionNotes, setDecisionNotes] = useState('')
  const [interviewDate, setInterviewDate] = useState('')
  const [assignCohort, setAssignCohort] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)

  const loadApplications = useCallback(async () => {
    setLoading(true)
    const url = `/api/admin/applications${statusFilter ? `?status=${statusFilter}` : ''}`
    const { data, total: t } = await fetch(url).then((r) => r.json())
    setApplications(data ?? [])
    setTotal(t ?? 0)
    setLoading(false)
  }, [statusFilter])

  useEffect(() => { loadApplications() }, [loadApplications])

  useEffect(() => {
    fetch('/api/admin/cohorts')
      .then((r) => r.json())
      .then(({ data }) => setCohorts((data ?? []).filter((c: Cohort) => c.status === 'upcoming' || c.status === 'active')))
  }, [])

  const openApp = (app: Application) => {
    setSelected(app)
    setReviewerNotes(app.reviewer_notes ?? '')
    setDecisionNotes(app.decision_notes ?? '')
    setInterviewDate(app.interview_date ?? '')
    setAssignCohort(app.assigned_cohort_id ?? '')
  }

  const updateStatus = async (status: string) => {
    if (!selected) return
    setSaving(true)
    const res = await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: selected.id,
        status,
        reviewer_notes: reviewerNotes || undefined,
        decision_notes: decisionNotes || undefined,
        interview_date: interviewDate || undefined,
        assigned_cohort_id: assignCohort || undefined,
      }),
    })
    if (res.ok) {
      setSavedId(selected.id)
      setTimeout(() => setSavedId(null), 2000)
      setSelected((prev) => prev ? { ...prev, status, reviewer_notes: reviewerNotes, decision_notes: decisionNotes } : null)
      loadApplications()
    }
    setSaving(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin" className="text-sm text-[var(--bp-muted)] hover:text-[var(--bp-text)]">← Dashboard</Link>
          </div>
          <h1 className="text-2xl font-semibold">Applications</h1>
          <p className="text-[var(--bp-muted)] text-sm mt-0.5">{total} total</p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => router.push(`/admin/applications${value ? `?status=${value}` : ''}`)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              statusFilter === value
                ? 'bg-[var(--bp-brown-deep)] text-white border-[var(--bp-brown-deep)]'
                : 'bg-white text-[var(--bp-muted)] border-[var(--bp-warm)] hover:border-[var(--bp-brown)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={`grid ${selected ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 items-start`}>
        {/* Applications list */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-sm text-[var(--bp-muted)] py-8 text-center">Loading…</div>
          ) : applications.length === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)] text-sm">No applications in this category.</div>
          ) : (
            applications.map((app) => (
              <button
                key={app.id}
                onClick={() => openApp(app)}
                className={`w-full text-left bp-card p-4 hover:border-[var(--bp-brown)] transition-colors ${
                  selected?.id === app.id ? 'border-[var(--bp-brown-deep)] bg-[var(--bp-cream)]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{app.full_name}</p>
                    <p className="text-xs text-[var(--bp-muted)]">{app.email} · {app.application_number}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {savedId === app.id && <span className="text-xs text-green-600">✓</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLE[app.status] ?? 'bg-gray-50 text-gray-600'}`}>
                      {app.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[var(--bp-muted)] mt-1">
                  Submitted {new Date(app.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Application detail + actions */}
        {selected && (
          <div className="bp-card p-6 sticky top-20 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-lg">{selected.full_name}</h2>
                <p className="text-sm text-[var(--bp-muted)]">{selected.email}</p>
                {selected.city && (
                  <p className="text-xs text-[var(--bp-muted)]">{selected.city}{selected.state ? `, ${selected.state}` : ''}</p>
                )}
              </div>
              <button onClick={() => setSelected(null)} className="text-[var(--bp-muted)] hover:text-[var(--bp-text)] text-lg leading-none">×</button>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              <div>
                <p className="text-xs font-semibold text-[var(--bp-muted)] uppercase tracking-wide mb-1">Testimony</p>
                <p className="text-sm">{selected.testimony}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--bp-muted)] uppercase tracking-wide mb-1">Why now?</p>
                <p className="text-sm">{selected.why_now}</p>
              </div>
              {selected.expectations && (
                <div>
                  <p className="text-xs font-semibold text-[var(--bp-muted)] uppercase tracking-wide mb-1">Expectations</p>
                  <p className="text-sm">{selected.expectations}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 text-xs text-[var(--bp-muted)]">
                {selected.current_church && <span>Church: {selected.current_church}</span>}
                {selected.hours_committed_weekly && <span>{selected.hours_committed_weekly}h/wk committed</span>}
              </div>
            </div>

            <div className="border-t border-[var(--bp-warm)] pt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Reviewer notes</label>
                <textarea
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  className="bp-input w-full h-16 resize-none text-sm"
                  placeholder="Internal notes…"
                />
              </div>
              {(selected.status === 'interview_scheduled' || selected.status === 'under_review') && (
                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Interview date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="bp-input w-full text-sm"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Decision notes</label>
                <textarea
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  className="bp-input w-full h-12 resize-none text-sm"
                  placeholder="Notes for the decision…"
                />
              </div>
              {cohorts.length > 0 && (
                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Assign to cohort</label>
                  <select
                    value={assignCohort}
                    onChange={(e) => setAssignCohort(e.target.value)}
                    className="bp-input w-full text-sm"
                  >
                    <option value="">— None —</option>
                    {cohorts.map((c) => (
                      <option key={c.id} value={c.id}>{c.cohort_name} ({c.cohort_code})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--bp-warm)] pt-4 flex flex-wrap gap-2">
              {(NEXT_ACTIONS[selected.status] ?? []).map(({ label, status }) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={saving}
                  className={`text-sm px-3 py-2 rounded-lg border font-medium transition-colors disabled:opacity-50 ${
                    status === 'approved'
                      ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                      : status === 'declined'
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      : 'bp-btn bp-btn-secondary'
                  }`}
                >
                  {saving ? '…' : label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
