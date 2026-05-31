'use client'

import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface CohortAnalytics {
  cohort_id: string
  snapshot_date: string
  total_enrolled: number
  active_students: number
  withdrawn_students: number
  completed_students: number
  avg_attendance_rate: number | null
  avg_lesson_completion_rate: number | null
  avg_reflection_submission_rate: number | null
  avg_current_index: number | null
  avg_baseline_index: number | null
  avg_index_gain: number | null
  avg_identity_score: number | null
  avg_healing_score: number | null
  avg_calling_score: number | null
  avg_maturity_score: number | null
  identity_blueprints_submitted: number
  purpose_statements_submitted: number
  ministry_plans_submitted: number
  at_risk_count: number
  retention_rate: number | null
  cohorts: {
    cohort_name: string
    cohort_code: string
    status: string
    start_date: string | null
    end_date: string | null
  } | null
}

interface StudentTI {
  student_id: string
  cohort_id: string
  full_name: string
  email: string
  cohort_name: string
  latest_checkpoint: string | null
  composite_index: number | null
  baseline_index: number | null
  gain: number | null
  identity_score: number | null
  healing_score: number | null
  calling_score: number | null
  maturity_score: number | null
  confidence_flag: string | null
}

interface AnalyticsData {
  cohortAnalytics: CohortAnalytics[]
  studentTI: StudentTI[]
  atRiskStudents: StudentTI[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Pct({ value }: { value: number | null }) {
  if (value == null) return <span className="text-[var(--bp-muted)]">—</span>
  const color = value >= 80 ? 'text-green-600' : value >= 60 ? 'text-amber-600' : 'text-red-500'
  return <span className={`font-medium ${color}`}>{value.toFixed(0)}%</span>
}

function Score({ value }: { value: number | null }) {
  if (value == null) return <span className="text-[var(--bp-muted)]">—</span>
  const color = value >= 70 ? 'text-green-600' : value >= 50 ? 'text-amber-600' : 'text-red-500'
  return <span className={`font-medium ${color}`}>{value}</span>
}

function GainBadge({ gain }: { gain: number | null }) {
  if (gain == null) return <span className="text-[var(--bp-muted)]">—</span>
  const positive = gain >= 0
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
      {positive ? '+' : ''}{gain.toFixed ? gain.toFixed(0) : gain}
    </span>
  )
}

const CHECKPOINT_LABELS: Record<string, string> = {
  baseline: 'Baseline',
  q1_end: 'Q1',
  q2_end: 'Q2',
  q3_end: 'Q3',
  q4_end: 'Q4',
  commissioning: 'Commission',
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Tab = 'cohorts' | 'students' | 'at-risk'

export default function FacilitatorAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('cohorts')
  const [selectedCohort, setSelectedCohort] = useState<string | 'all'>('all')
  const [sortField, setSortField] = useState<keyof StudentTI>('composite_index')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetch('/api/analytics/facilitator')
      .then(r => r.json())
      .then(json => { setData(json); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="h-6 bg-gray-100 rounded animate-pulse w-48 mb-4" />
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (!data) {
    return <p className="text-sm text-[var(--bp-muted)]">Could not load analytics.</p>
  }

  const { cohortAnalytics, studentTI, atRiskStudents } = data

  // Filtered + sorted students
  const filteredStudents = (selectedCohort === 'all' ? studentTI : studentTI.filter(s => s.cohort_id === selectedCohort))
    .slice()
    .sort((a, b) => {
      const av = a[sortField] as number | null
      const bv = b[sortField] as number | null
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      return sortDir === 'desc' ? bv - av : av - bv
    })

  const toggleSort = (field: keyof StudentTI) => {
    if (sortField === field) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortField(field); setSortDir('desc') }
  }

  // Aggregate across all cohorts
  const totalActive = cohortAnalytics.reduce((s, c) => s + (c.active_students ?? 0), 0)
  const avgAttendance = cohortAnalytics.length
    ? cohortAnalytics.reduce((s, c) => s + (c.avg_attendance_rate ?? 0), 0) / cohortAnalytics.length
    : null
  const avgTI = cohortAnalytics.length
    ? cohortAnalytics.reduce((s, c) => s + (c.avg_current_index ?? 0), 0) / cohortAnalytics.length
    : null

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Formation Analytics</h1>
        <p className="text-sm text-[var(--bp-muted)] mt-1">Cohort health, Transformation Index, and student progress across your cohorts.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{cohortAnalytics.length}</p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Active Cohorts</p>
        </div>
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{totalActive}</p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Active Students</p>
        </div>
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">
            {avgAttendance != null ? `${avgAttendance.toFixed(0)}%` : '—'}
          </p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Avg Attendance</p>
        </div>
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">
            {avgTI != null ? avgTI.toFixed(0) : '—'}
          </p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Avg TI Score</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--bp-warm)]">
        {([
          ['cohorts', `Cohort Health (${cohortAnalytics.length})`],
          ['students', `Student TI Table (${studentTI.length})`],
          ['at-risk', `At Risk (${atRiskStudents.length})`],
        ] as const).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === v ? 'border-[var(--bp-brown-deep)] text-[var(--bp-brown-deep)]' : 'border-transparent text-[var(--bp-muted)] hover:text-[var(--bp-brown)]'}`}
          >
            {l}
            {v === 'at-risk' && atRiskStudents.length > 0 && (
              <span className="ml-1.5 bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">{atRiskStudents.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Cohort Health Tab */}
      {tab === 'cohorts' && (
        <div className="space-y-4">
          {cohortAnalytics.length === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)]">
              <p className="font-medium">No cohort analytics data yet.</p>
              <p className="text-sm mt-1">Analytics snapshots are computed after assessments are entered.</p>
            </div>
          ) : (
            cohortAnalytics.map(c => (
              <div key={c.cohort_id} className="bp-card p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold">{c.cohorts?.cohort_name ?? 'Cohort'}</h2>
                    <p className="text-xs text-[var(--bp-muted)]">
                      {c.cohorts?.cohort_code} · snapshot {new Date(c.snapshot_date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.cohorts?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.cohorts?.status}
                  </span>
                </div>

                {/* Enrollment row */}
                <div className="grid grid-cols-4 gap-3 text-center text-sm">
                  {[
                    { label: 'Enrolled', val: c.total_enrolled },
                    { label: 'Active', val: c.active_students },
                    { label: 'At Risk', val: c.at_risk_count },
                    { label: 'Retention', val: c.retention_rate != null ? `${c.retention_rate.toFixed(0)}%` : '—' },
                  ].map(({ label, val }) => (
                    <div key={label} className="bg-[var(--bp-paper)] rounded-lg p-3">
                      <p className="font-semibold text-[var(--bp-brown-deep)]">{val}</p>
                      <p className="text-xs text-[var(--bp-muted)] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Engagement metrics */}
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-[var(--bp-muted)] mb-1">Attendance</p>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${c.avg_attendance_rate ?? 0}%` }} />
                    </div>
                    <p className="text-xs mt-1"><Pct value={c.avg_attendance_rate} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--bp-muted)] mb-1">Lesson Completion</p>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: `${c.avg_lesson_completion_rate ?? 0}%` }} />
                    </div>
                    <p className="text-xs mt-1"><Pct value={c.avg_lesson_completion_rate} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--bp-muted)] mb-1">Reflection Rate</p>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${c.avg_reflection_submission_rate ?? 0}%` }} />
                    </div>
                    <p className="text-xs mt-1"><Pct value={c.avg_reflection_submission_rate} /></p>
                  </div>
                </div>

                {/* TI panel */}
                <div className="bg-[#1a120b] rounded-xl p-4 text-amber-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium tracking-widest uppercase text-amber-400">Transformation Index</span>
                    <GainBadge gain={c.avg_index_gain} />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-2xl font-bold text-amber-300">{c.avg_baseline_index?.toFixed(0) ?? '—'}</p>
                      <p className="text-xs text-amber-600 mt-0.5">Baseline avg</p>
                    </div>
                    <div className="text-amber-500 text-xl flex items-center justify-center">→</div>
                    <div>
                      <p className="text-2xl font-bold text-amber-300">{c.avg_current_index?.toFixed(0) ?? '—'}</p>
                      <p className="text-xs text-amber-600 mt-0.5">Current avg</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-amber-900 text-center text-xs">
                    {[
                      { label: 'Identity', val: c.avg_identity_score },
                      { label: 'Healing', val: c.avg_healing_score },
                      { label: 'Calling', val: c.avg_calling_score },
                      { label: 'Maturity', val: c.avg_maturity_score },
                    ].map(({ label, val }) => (
                      <div key={label}>
                        <p className="text-amber-300 font-semibold">{val?.toFixed(0) ?? '—'}</p>
                        <p className="text-amber-600 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capstone progress */}
                <div className="flex gap-4 text-sm">
                  {[
                    { label: 'Identity Blueprint', val: c.identity_blueprints_submitted, total: c.total_enrolled },
                    { label: 'Purpose Statement', val: c.purpose_statements_submitted, total: c.total_enrolled },
                    { label: 'Ministry Plan', val: c.ministry_plans_submitted, total: c.total_enrolled },
                  ].map(({ label, val, total }) => (
                    <div key={label} className="flex-1">
                      <p className="text-xs text-[var(--bp-muted)] mb-1">{label}</p>
                      <p className="text-sm font-semibold text-[var(--bp-brown-deep)]">{val}/{total}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Student TI Table Tab */}
      {tab === 'students' && (
        <div className="space-y-4">
          {/* Cohort filter */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-[var(--bp-muted)]">Filter by cohort:</label>
            <select
              className="bp-input w-auto py-1.5 text-sm"
              value={selectedCohort}
              onChange={e => setSelectedCohort(e.target.value)}
            >
              <option value="all">All Cohorts</option>
              {cohortAnalytics.map(c => (
                <option key={c.cohort_id} value={c.cohort_id}>{c.cohorts?.cohort_name}</option>
              ))}
            </select>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)]">
              <p>No student data for this cohort yet.</p>
            </div>
          ) : (
            <div className="bp-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--bp-paper)] text-xs text-[var(--bp-muted)] border-b border-[var(--bp-warm)]">
                      <th className="text-left px-4 py-3 font-medium">Student</th>
                      <th className="text-center px-2 py-3 font-medium">Checkpoint</th>
                      <th className="text-center px-2 py-3 font-medium cursor-pointer hover:text-[var(--bp-brown)]" onClick={() => toggleSort('composite_index')}>
                        TI {sortField === 'composite_index' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                      </th>
                      <th className="text-center px-2 py-3 font-medium cursor-pointer hover:text-[var(--bp-brown)]" onClick={() => toggleSort('gain')}>
                        Gain {sortField === 'gain' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                      </th>
                      <th className="text-center px-2 py-3 font-medium">Identity</th>
                      <th className="text-center px-2 py-3 font-medium">Healing</th>
                      <th className="text-center px-2 py-3 font-medium">Calling</th>
                      <th className="text-center px-2 py-3 font-medium">Maturity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(s => (
                      <tr key={s.student_id} className="border-b border-[var(--bp-warm)] hover:bg-amber-50/50 last:border-0">
                        <td className="px-4 py-3">
                          <p className="font-medium text-[var(--bp-brown)]">{s.full_name}</p>
                          <p className="text-xs text-[var(--bp-muted)]">{s.cohort_name}</p>
                        </td>
                        <td className="text-center px-2 py-3 text-xs text-[var(--bp-muted)]">
                          {s.latest_checkpoint ? CHECKPOINT_LABELS[s.latest_checkpoint] ?? s.latest_checkpoint : '—'}
                        </td>
                        <td className="text-center px-2 py-3 font-semibold text-[var(--bp-brown-deep)]">
                          <Score value={s.composite_index} />
                        </td>
                        <td className="text-center px-2 py-3">
                          <GainBadge gain={s.gain} />
                        </td>
                        <td className="text-center px-2 py-3"><Score value={s.identity_score} /></td>
                        <td className="text-center px-2 py-3"><Score value={s.healing_score} /></td>
                        <td className="text-center px-2 py-3"><Score value={s.calling_score} /></td>
                        <td className="text-center px-2 py-3"><Score value={s.maturity_score} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* At-Risk Tab */}
      {tab === 'at-risk' && (
        <div className="space-y-4">
          {atRiskStudents.length === 0 ? (
            <div className="bp-card p-8 text-center">
              <p className="font-medium text-green-600">No at-risk students detected.</p>
              <p className="text-sm text-[var(--bp-muted)] mt-1">Students with a Transformation Index below 40 will appear here.</p>
            </div>
          ) : (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
                <p className="font-medium">At-Risk Threshold</p>
                <p className="mt-0.5">Students with a composite TI below 40 are flagged for pastoral attention. Review their engagement and schedule a check-in.</p>
              </div>
              <div className="space-y-2">
                {atRiskStudents.map(s => (
                  <div key={s.student_id} className="bp-card p-4 border-l-4 border-red-300">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-[var(--bp-brown)]">{s.full_name}</p>
                        <p className="text-xs text-[var(--bp-muted)]">{s.cohort_name} · {s.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-500">{s.composite_index ?? '—'}</p>
                        <p className="text-xs text-[var(--bp-muted)]">TI score</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-3 text-xs text-center">
                      {[
                        { label: 'Identity', val: s.identity_score },
                        { label: 'Healing', val: s.healing_score },
                        { label: 'Calling', val: s.calling_score },
                        { label: 'Maturity', val: s.maturity_score },
                      ].map(({ label, val }) => (
                        <div key={label} className="bg-[var(--bp-paper)] rounded-lg p-2">
                          <p className={`font-semibold ${(val ?? 0) < 40 ? 'text-red-500' : 'text-[var(--bp-brown-deep)]'}`}>{val ?? '—'}</p>
                          <p className="text-[var(--bp-muted)] mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
