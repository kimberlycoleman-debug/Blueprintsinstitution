'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Cohort {
  id: string
  cohort_name: string
  cohort_code: string
}

interface ApplicationActionsProps {
  applicationId: string
  initialStatus: string
  initialReviewerNotes: string | null
  initialDecisionNotes: string | null
  initialInterviewDate: string | null
  initialCohortId: string | null
  cohorts: Cohort[]
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

export default function ApplicationActions({
  applicationId,
  initialStatus,
  initialReviewerNotes,
  initialDecisionNotes,
  initialInterviewDate,
  initialCohortId,
  cohorts,
}: ApplicationActionsProps) {
  const router = useRouter()
  const [status, setStatus] = useState(initialStatus)
  const [reviewerNotes, setReviewerNotes] = useState(initialReviewerNotes ?? '')
  const [decisionNotes, setDecisionNotes] = useState(initialDecisionNotes ?? '')
  const [interviewDate, setInterviewDate] = useState(initialInterviewDate ?? '')
  const [assignCohort, setAssignCohort] = useState(initialCohortId ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAction = async (nextStatus: string) => {
    setSaving(true)
    setError(null)
    const res = await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: applicationId,
        status: nextStatus,
        reviewer_notes: reviewerNotes || undefined,
        decision_notes: decisionNotes || undefined,
        interview_date: interviewDate || undefined,
        assigned_cohort_id: assignCohort || undefined,
      }),
    })
    if (res.ok) {
      setStatus(nextStatus)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    } else {
      const json = await res.json().catch(() => ({}))
      setError(json.error ?? 'Failed to update. Please try again.')
    }
    setSaving(false)
  }

  const actions = NEXT_ACTIONS[status] ?? []

  return (
    <div className="bp-card p-6 space-y-5">
      <h2 className="font-semibold text-base">Review & Decision</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Reviewer notes (internal)</label>
          <textarea
            value={reviewerNotes}
            onChange={(e) => setReviewerNotes(e.target.value)}
            className="bp-input w-full h-20 resize-none text-sm"
            placeholder="Internal notes visible only to admins…"
          />
        </div>

        {(status === 'interview_scheduled' || status === 'under_review') && (
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
          <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Decision notes (sent to applicant on approval)</label>
          <textarea
            value={decisionNotes}
            onChange={(e) => setDecisionNotes(e.target.value)}
            className="bp-input w-full h-16 resize-none text-sm"
            placeholder="Notes accompanying the decision…"
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

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}
      {saved && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">✓ Application updated successfully.</p>
      )}

      {actions.length > 0 ? (
        <div className="border-t border-[var(--bp-warm)] pt-4 flex flex-wrap gap-2">
          {actions.map(({ label, status: nextStatus }) => (
            <button
              key={nextStatus}
              onClick={() => handleAction(nextStatus)}
              disabled={saving}
              className={`text-sm px-4 py-2 rounded-lg border font-medium transition-colors disabled:opacity-50 ${
                nextStatus === 'approved'
                  ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                  : nextStatus === 'declined'
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  : 'bp-btn bp-btn-secondary'
              }`}
            >
              {saving ? '…' : label}
            </button>
          ))}
        </div>
      ) : (
        <div className="border-t border-[var(--bp-warm)] pt-4">
          <p className="text-sm text-[var(--bp-muted)] italic">
            This application has been {status.replace(/_/g, ' ')}. No further actions available.
          </p>
        </div>
      )}
    </div>
  )
}
