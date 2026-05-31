'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Student {
  student_id: string
  full_name: string | null
  email: string
  lessons_completed: number
  lessons_total: number
  reflection_count: number
  identity_blueprint_complete: boolean
  purpose_statement_complete: boolean
  ministry_plan_complete: boolean
}

interface AtRiskStudent {
  student_id: string
  full_name: string | null
  risk_level: 'high' | 'medium' | 'low'
  signals: string[]
}

const SIGNAL_LABELS: Record<string, string> = {
  low_engagement_14d: 'Low engagement (14 days)',
  no_reflection_21d: 'No reflection (21 days)',
  low_attendance: 'Attendance below 60%',
  no_lesson_14d: 'No lesson completed (14 days)',
}

const RISK_COLORS: Record<string, string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-[var(--bp-cream)] text-[var(--bp-brown)] border-[var(--bp-sand)]',
  low: 'bg-yellow-50 text-yellow-700 border-yellow-200',
}

export default function CohortHealthPage() {
  const { cohort_id } = useParams<{ cohort_id: string }>()
  const [students, setStudents] = useState<Student[]>([])
  const [atRisk, setAtRisk] = useState<AtRiskStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'roster' | 'at-risk'>('at-risk')

  useEffect(() => {
    Promise.all([
      fetch(`/api/facilitator/cohort/${cohort_id}/students`).then((r) => r.json()),
      fetch(`/api/facilitator/cohort/${cohort_id}/at-risk`).then((r) => r.json()),
    ]).then(([{ data: s }, { data: ar }]) => {
      setStudents(s ?? [])
      setAtRisk(ar ?? [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [cohort_id])

  const atRiskIds = new Set(atRisk.map((s) => s.student_id))

  if (loading) return <div className="max-w-4xl mx-auto py-12 text-[var(--bp-muted)] text-sm">Loading cohort…</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/facilitator" className="text-sm text-[var(--bp-muted)] hover:text-[var(--bp-text)]">← Dashboard</Link>
        <span className="text-[var(--bp-warm)]">/</span>
        <span className="text-sm font-medium">Cohort Health</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold">Cohort Health</h1>
        <p className="text-[var(--bp-muted)] mt-1 text-sm">
          {students.length} active student{students.length !== 1 ? 's' : ''} · {atRisk.length} at-risk flag{atRisk.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total students', value: students.length },
          { label: 'At-risk', value: atRisk.length },
          { label: 'High risk', value: atRisk.filter((s) => s.risk_level === 'high').length },
          { label: 'Avg reflections', value: students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.reflection_count, 0) / students.length) : 0 },
        ].map(({ label, value }) => (
          <div key={label} className="bp-card p-4">
            <p className="text-xs text-[var(--bp-muted)]">{label}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Tab toggle */}
      <div className="flex gap-2 border-b border-[var(--bp-warm)]">
        {(['at-risk', 'roster'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? 'border-[var(--bp-brown-deep)] text-[var(--bp-brown-deep)]'
                : 'border-transparent text-[var(--bp-muted)] hover:text-[var(--bp-text)]'
            }`}
          >
            {t === 'at-risk' ? `At-Risk (${atRisk.length})` : `Full Roster (${students.length})`}
          </button>
        ))}
      </div>

      {/* At-risk tab */}
      {tab === 'at-risk' && (
        <div className="space-y-4">
          {atRisk.length === 0 ? (
            <div className="bp-card p-8 text-center">
              <p className="text-[var(--bp-muted)]">No students flagged. Cohort looks healthy.</p>
            </div>
          ) : (
            atRisk.map((s) => (
              <div key={s.student_id} className={`bp-card p-5 border ${RISK_COLORS[s.risk_level]}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{s.full_name ?? 'Unknown Student'}</p>
                    <span className={`text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-full ${RISK_COLORS[s.risk_level]}`}>
                      {s.risk_level} risk
                    </span>
                  </div>
                  <Link
                    href={`/facilitator/student/${s.student_id}?cohort=${cohort_id}`}
                    className="bp-btn bp-btn-secondary text-xs px-3 py-1.5"
                  >
                    View student →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.signals.map((signal) => (
                    <span key={signal} className="text-xs bg-white bg-opacity-60 border px-2 py-1 rounded-lg">
                      ⚠ {SIGNAL_LABELS[signal] ?? signal}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Full roster tab */}
      {tab === 'roster' && (
        <div className="space-y-3">
          {students.map((s) => {
            const progressPct = s.lessons_total > 0 ? Math.round((s.lessons_completed / s.lessons_total) * 100) : 0
            return (
              <div key={s.student_id} className={`bp-card p-5 ${atRiskIds.has(s.student_id) ? 'border-l-4 border-l-[var(--bp-gold)]' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{s.full_name ?? s.email}</p>
                      {atRiskIds.has(s.student_id) && (
                        <span className="text-xs bg-[var(--bp-cream)] text-[var(--bp-brown)] px-2 py-0.5 rounded-full">at-risk</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--bp-muted)]">
                      <span>{s.lessons_completed}/{s.lessons_total} lessons ({progressPct}%)</span>
                      <span>{s.reflection_count} reflection{s.reflection_count !== 1 ? 's' : ''}</span>
                      {s.identity_blueprint_complete && <span className="text-green-600">IB ✓</span>}
                      {s.purpose_statement_complete && <span className="text-green-600">PS ✓</span>}
                      {s.ministry_plan_complete && <span className="text-green-600">ML ✓</span>}
                    </div>
                  </div>
                  <Link
                    href={`/facilitator/student/${s.student_id}?cohort=${cohort_id}`}
                    className="bp-btn bp-btn-ghost text-xs px-3 py-1.5 flex-shrink-0"
                  >
                    View →
                  </Link>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-[var(--bp-warm)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--bp-brown)] rounded-full transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
