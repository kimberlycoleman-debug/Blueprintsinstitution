'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const CHECKPOINTS = ['baseline', 'q1_end', 'q2_end', 'q3_end', 'q4_end', 'commissioning'] as const
const DIMENSIONS = ['identity', 'healing', 'calling', 'maturity', 'community'] as const
type Checkpoint = typeof CHECKPOINTS[number]
type Dimension = typeof DIMENSIONS[number]

const QUALITATIVE = ['not_demonstrated', 'emerging', 'demonstrated', 'embodied'] as const

interface Assessment {
  checkpoint: Checkpoint
  dimension: Dimension
  score_numeric: number | null
  score_qualitative: string | null
  narrative: string | null
}

interface StudentProfile {
  id: string
  full_name: string | null
  email: string
  reflection_count?: number
  identity_blueprint_complete?: boolean
  purpose_statement_complete?: boolean
  ministry_plan_complete?: boolean
}

function key(checkpoint: Checkpoint, dimension: Dimension) {
  return `${checkpoint}|${dimension}`
}

export default function StudentDetailPage() {
  const { student_id } = useParams<{ student_id: string }>()
  const searchParams = useSearchParams()
  const cohort_id = searchParams.get('cohort') ?? ''

  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [assessments, setAssessments] = useState<Record<string, Assessment>>({})
  const [editKey, setEditKey] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState<Partial<Assessment>>({})
  const [saving, setSaving] = useState(false)
  const [savedKey, setSavedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeCheckpoint, setActiveCheckpoint] = useState<Checkpoint>('baseline')

  useEffect(() => {
    const fetchData = async () => {
      const [studentsRes, assessRes] = await Promise.all([
        fetch(`/api/facilitator/cohort/${cohort_id}/students`),
        fetch(`/api/facilitator/assessments?student_id=${student_id}&cohort_id=${cohort_id}`),
      ])
      const { data: students } = await studentsRes.json()
      const { data: rows } = await assessRes.json()

      const found = (students ?? []).find((s: StudentProfile) => s.id === student_id)
      setProfile(found ?? null)

      const map: Record<string, Assessment> = {}
      for (const r of rows ?? []) {
        map[key(r.checkpoint, r.dimension)] = r
      }
      setAssessments(map)
      setLoading(false)
    }
    if (cohort_id && student_id) fetchData()
  }, [student_id, cohort_id])

  const startEdit = (checkpoint: Checkpoint, dimension: Dimension) => {
    const existing = assessments[key(checkpoint, dimension)]
    setEditKey(key(checkpoint, dimension))
    setEditDraft({
      checkpoint,
      dimension,
      score_numeric: existing?.score_numeric ?? null,
      score_qualitative: existing?.score_qualitative ?? null,
      narrative: existing?.narrative ?? null,
    })
  }

  const saveAssessment = async () => {
    if (!editDraft.checkpoint || !editDraft.dimension) return
    setSaving(true)
    const res = await fetch('/api/facilitator/assessments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id,
        cohort_id,
        ...editDraft,
      }),
    })
    if (res.ok) {
      const k = key(editDraft.checkpoint as Checkpoint, editDraft.dimension as Dimension)
      setAssessments((prev) => ({
        ...prev,
        [k]: editDraft as Assessment,
      }))
      setSavedKey(k)
      setTimeout(() => setSavedKey(null), 2000)
      setEditKey(null)
    }
    setSaving(false)
  }

  if (loading) return <div className="max-w-4xl mx-auto py-12 text-[var(--bp-muted)] text-sm">Loading student…</div>
  if (!profile) return <div className="max-w-4xl mx-auto py-12 text-[var(--bp-muted)] text-sm">Student not found.</div>

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--bp-muted)]">
        <Link href="/facilitator" className="hover:text-[var(--bp-text)]">Dashboard</Link>
        <span>/</span>
        <Link href={`/facilitator/cohort/${cohort_id}`} className="hover:text-[var(--bp-text)]">Cohort</Link>
        <span>/</span>
        <span className="text-[var(--bp-text)]">{profile.full_name ?? profile.email}</span>
      </div>

      {/* Student header */}
      <div className="bp-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{profile.full_name ?? 'Student'}</h1>
            <p className="text-sm text-[var(--bp-muted)] mt-0.5">{profile.email}</p>
          </div>
          <div className="flex gap-2">
            {profile.identity_blueprint_complete && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">IB ✓</span>
            )}
            {profile.purpose_statement_complete && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">PS ✓</span>
            )}
            {profile.ministry_plan_complete && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">ML ✓</span>
            )}
          </div>
        </div>
      </div>

      {/* Checkpoint tabs */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Facilitator Assessments</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {CHECKPOINTS.map((cp) => {
            const filled = DIMENSIONS.filter((d) => assessments[key(cp, d)]).length
            return (
              <button
                key={cp}
                onClick={() => setActiveCheckpoint(cp)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  activeCheckpoint === cp
                    ? 'bg-[var(--bp-brown-deep)] text-white border-[var(--bp-brown-deep)]'
                    : 'bg-white text-[var(--bp-muted)] border-[var(--bp-warm)] hover:border-[var(--bp-brown)]'
                }`}
              >
                {cp.replace('_', ' ')}
                {filled > 0 && (
                  <span className={`ml-2 text-xs ${activeCheckpoint === cp ? 'text-white opacity-70' : 'text-[var(--bp-brown)]'}`}>
                    {filled}/5
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Dimension grid */}
        <div className="space-y-4">
          {DIMENSIONS.map((dim) => {
            const k = key(activeCheckpoint, dim)
            const existing = assessments[k]
            const isEditing = editKey === k
            const isSaved = savedKey === k

            return (
              <div key={dim} className="bp-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium capitalize">{dim}</h3>
                    {existing && !isEditing && (
                      <div className="flex items-center gap-3 mt-1 text-sm text-[var(--bp-muted)]">
                        {existing.score_numeric != null && <span>Score: {existing.score_numeric}/100</span>}
                        {existing.score_qualitative && (
                          <span className="capitalize">{existing.score_qualitative.replace('_', ' ')}</span>
                        )}
                        {isSaved && <span className="text-green-600 text-xs">Saved ✓</span>}
                      </div>
                    )}
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => startEdit(activeCheckpoint, dim)}
                      className="bp-btn bp-btn-ghost text-xs px-3 py-1.5"
                    >
                      {existing ? 'Edit' : 'Add score'}
                    </button>
                  )}
                </div>

                {!isEditing && existing?.narrative && (
                  <p className="text-sm text-[var(--bp-muted)] italic">"{existing.narrative}"</p>
                )}

                {isEditing && (
                  <div className="space-y-3 pt-3 border-t border-[var(--bp-warm)]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Numeric score (0–100)</label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={editDraft.score_numeric ?? ''}
                          onChange={(e) => setEditDraft((p) => ({ ...p, score_numeric: e.target.value ? parseInt(e.target.value) : null }))}
                          className="bp-input w-full"
                          placeholder="e.g. 72"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Qualitative</label>
                        <select
                          value={editDraft.score_qualitative ?? ''}
                          onChange={(e) => setEditDraft((p) => ({ ...p, score_qualitative: e.target.value || null }))}
                          className="bp-input w-full"
                        >
                          <option value="">— Select —</option>
                          {QUALITATIVE.map((q) => (
                            <option key={q} value={q}>{q.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-[var(--bp-muted)]">Facilitator narrative</label>
                      <textarea
                        value={editDraft.narrative ?? ''}
                        onChange={(e) => setEditDraft((p) => ({ ...p, narrative: e.target.value || null }))}
                        className="bp-input w-full h-20 resize-none"
                        placeholder="Observations, growth indicators, formation notes…"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveAssessment}
                        disabled={saving}
                        className="bp-btn bp-btn-primary text-sm px-4 py-2 disabled:opacity-50"
                      >
                        {saving ? 'Saving…' : 'Save assessment'}
                      </button>
                      <button
                        onClick={() => setEditKey(null)}
                        className="bp-btn bp-btn-ghost text-sm px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
