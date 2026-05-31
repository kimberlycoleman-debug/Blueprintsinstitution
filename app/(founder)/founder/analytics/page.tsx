'use client'

import { useState, useEffect } from 'react'

interface InstitutionalMetrics {
  snapshot_date: string
  total_students_served_alltime: number
  active_students_now: number
  active_cohorts_now: number
  total_cohorts_completed: number
  total_graduates: number
  avg_transformation_index_alltime: number | null
  avg_index_gain_per_graduate: number | null
  total_identity_blueprints: number
  total_purpose_statements: number
  total_ministry_plans: number
  total_commissionings: number
  free_seats_funded: number
  overall_retention_rate: number | null
  avg_attendance_rate_allcohorts: number | null
  avg_reflection_rate_allcohorts: number | null
  computed_at: string
}

interface CohortSummary {
  id: string
  cohort_name: string
  cohort_code: string
  status: string
  start_date: string | null
  end_date: string | null
  cohort_analytics: {
    snapshot_date: string
    total_enrolled: number
    active_students: number
    avg_attendance_rate: number | null
    avg_current_index: number | null
    avg_index_gain: number | null
    at_risk_count: number
    retention_rate: number | null
  }[]
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-600',
}

export default function FounderAnalyticsPage() {
  const [metrics, setMetrics] = useState<InstitutionalMetrics | null>(null)
  const [cohorts, setCohorts] = useState<CohortSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/founder/metrics')
      .then(r => r.json())
      .then(json => {
        setMetrics(json.data ?? null)
        setCohorts(json.cohorts ?? [])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center text-[var(--bp-muted)] text-sm">
        Computing institute metrics...
      </div>
    )
  }

  const m = metrics

  const capstones = [
    { label: 'Identity Blueprints', value: m?.total_identity_blueprints ?? 0, icon: '📋' },
    { label: 'Purpose Statements', value: m?.total_purpose_statements ?? 0, icon: '🎯' },
    { label: 'Ministry Plans', value: m?.total_ministry_plans ?? 0, icon: '⛪' },
    { label: 'Commissionings', value: m?.total_commissionings ?? 0, icon: '✝️' },
  ]

  const activeCohortList = cohorts.filter(c => c.status === 'active')
  const completedCohortList = cohorts.filter(c => c.status === 'completed')

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <p className="text-xs tracking-widest text-amber-600 uppercase font-semibold mb-1">Sovereign Analytics</p>
        <h1 className="text-2xl font-semibold">Institute-Wide Metrics</h1>
        {m && (
          <p className="text-xs text-[var(--bp-muted)] mt-1">
            Snapshot: {new Date(m.snapshot_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ·
            Computed: {new Date(m.computed_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </p>
        )}
      </div>

      {/* Top vitals bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total students (all-time)', value: m?.total_students_served_alltime ?? 0 },
          { label: 'Active now', value: m?.active_students_now ?? 0 },
          { label: 'Graduates', value: m?.total_graduates ?? 0 },
          { label: 'Retention rate', value: m?.overall_retention_rate != null ? `${m.overall_retention_rate}%` : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#1a120b] rounded-xl p-5 text-white">
            <p className="text-xs text-amber-300 mb-1">{label}</p>
            <p className="text-3xl font-semibold text-amber-400">{String(value)}</p>
          </div>
        ))}
      </div>

      {/* Transformation Index */}
      <div className="bp-card p-6">
        <h2 className="font-semibold mb-4">Transformation Index™ — Institute Averages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Avg TI (all graduates)', value: m?.avg_transformation_index_alltime ?? null },
            { label: 'Avg index gain', value: m?.avg_index_gain_per_graduate ?? null },
            { label: 'Avg attendance (all cohorts)', value: m?.avg_attendance_rate_allcohorts != null ? `${m.avg_attendance_rate_allcohorts}%` : null },
            { label: 'Free seats funded', value: m?.free_seats_funded ?? 0 },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-[var(--bp-muted)] mb-1">{label}</p>
              <p className="text-2xl font-semibold text-[var(--bp-brown-deep)]">
                {value != null ? String(value) : '—'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Capstone completions */}
      <div>
        <h2 className="text-xs tracking-widest text-[var(--bp-muted)] uppercase font-semibold mb-4">
          Capstone Completions — All Time
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {capstones.map(({ label, value, icon }) => (
            <div key={label} className="bp-card p-5 text-center">
              <p className="text-2xl mb-1">{icon}</p>
              <p className="text-3xl font-semibold text-[var(--bp-brown-deep)]">{value}</p>
              <p className="text-xs text-[var(--bp-muted)] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active cohorts breakdown */}
      {activeCohortList.length > 0 && (
        <div>
          <h2 className="text-xs tracking-widest text-[var(--bp-muted)] uppercase font-semibold mb-4">
            Active Cohorts — Formation Health
          </h2>
          <div className="space-y-3">
            {activeCohortList.map(cohort => {
              const analytics = cohort.cohort_analytics?.[0]
              return (
                <div key={cohort.id} className="bp-card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{cohort.cohort_name}</p>
                      <p className="text-xs text-[var(--bp-muted)]">{cohort.cohort_code}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[cohort.status] ?? ''}`}>
                      {cohort.status}
                    </span>
                  </div>
                  {analytics ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-[var(--bp-muted)]">Enrolled</p>
                        <p className="font-semibold">{analytics.total_enrolled}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--bp-muted)]">Active</p>
                        <p className="font-semibold">{analytics.active_students}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--bp-muted)]">Avg TI</p>
                        <p className="font-semibold">{analytics.avg_current_index ?? '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--bp-muted)]">TI Gain</p>
                        <p className={`font-semibold ${(analytics.avg_index_gain ?? 0) > 0 ? 'text-green-600' : ''}`}>
                          {analytics.avg_index_gain != null ? `+${analytics.avg_index_gain}` : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--bp-muted)]">At-risk</p>
                        <p className={`font-semibold ${analytics.at_risk_count > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {analytics.at_risk_count}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--bp-muted)]">Analytics snapshot not yet computed for this cohort.</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed cohorts */}
      {completedCohortList.length > 0 && (
        <div>
          <h2 className="text-xs tracking-widest text-[var(--bp-muted)] uppercase font-semibold mb-4">
            Completed Cohorts — Outcome Record
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--bp-warm)] text-left">
                  <th className="pb-2 font-medium text-[var(--bp-muted)] pr-4">Cohort</th>
                  <th className="pb-2 font-medium text-[var(--bp-muted)] pr-4">Enrolled</th>
                  <th className="pb-2 font-medium text-[var(--bp-muted)] pr-4">Avg TI</th>
                  <th className="pb-2 font-medium text-[var(--bp-muted)] pr-4">Gain</th>
                  <th className="pb-2 font-medium text-[var(--bp-muted)] pr-4">Retention</th>
                  <th className="pb-2 font-medium text-[var(--bp-muted)]">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {completedCohortList.map(cohort => {
                  const a = cohort.cohort_analytics?.[0]
                  return (
                    <tr key={cohort.id} className="border-b border-[var(--bp-warm)] last:border-0">
                      <td className="py-3 pr-4">
                        <p className="font-medium">{cohort.cohort_name}</p>
                        <p className="text-xs text-[var(--bp-muted)]">{cohort.cohort_code}</p>
                      </td>
                      <td className="py-3 pr-4">{a?.total_enrolled ?? '—'}</td>
                      <td className="py-3 pr-4">{a?.avg_current_index ?? '—'}</td>
                      <td className={`py-3 pr-4 ${(a?.avg_index_gain ?? 0) > 0 ? 'text-green-600' : ''}`}>
                        {a?.avg_index_gain != null ? `+${a.avg_index_gain}` : '—'}
                      </td>
                      <td className="py-3 pr-4">{a?.retention_rate != null ? `${a.retention_rate}%` : '—'}</td>
                      <td className="py-3">{a?.avg_attendance_rate != null ? `${a.avg_attendance_rate}%` : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!m && (
        <div className="text-center py-12 text-[var(--bp-muted)] text-sm">
          No metrics computed yet. Metrics will appear once students are enrolled in cohorts.
        </div>
      )}
    </div>
  )
}
