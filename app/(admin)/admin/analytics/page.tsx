'use client'

import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

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
  institutional_seats_paid: number
  cost_per_completion: number | null
  total_grant_funding_awarded: number
  total_grant_funding_deployed: number
  overall_retention_rate: number | null
  avg_attendance_rate_allcohorts: number | null
  avg_reflection_rate_allcohorts: number | null
  computed_at: string
}

interface FundingRecord {
  id: string
  funding_type: string
  status: string
  source_name: string
  amount_requested: number | null
  amount_awarded: number | null
  amount_deployed: number | null
  free_seats_funded: number
  period_start: string | null
  period_end: string | null
  reporting_deadline: string | null
  is_restricted: boolean
  restriction_description: string | null
  notes: string | null
}

interface CohortOutcome {
  cohort_id: string
  snapshot_date: string
  total_enrolled: number
  completed_students: number
  avg_index_gain: number | null
  retention_rate: number | null
  identity_blueprints_submitted: number
  purpose_statements_submitted: number
  ministry_plans_submitted: number
  cohorts: {
    cohort_name: string
    cohort_code: string
    status: string
    start_date: string | null
    end_date: string | null
  } | null
}

interface AdminAnalyticsData {
  metrics: InstitutionalMetrics | null
  metricsHistory: Pick<InstitutionalMetrics, 'snapshot_date' | 'active_students_now' | 'total_graduates' | 'avg_transformation_index_alltime' | 'overall_retention_rate' | 'total_grant_funding_awarded' | 'total_grant_funding_deployed' | 'free_seats_funded'>[]
  funding: {
    records: FundingRecord[]
    totalAwarded: number
    totalDeployed: number
    totalFreeSeats: number
    upcomingDeadlines: FundingRecord[]
  }
  cohortOutcomes: CohortOutcome[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number | null | undefined, prefix = '', suffix = '') {
  if (n == null) return '—'
  return `${prefix}${n.toLocaleString()}${suffix}`
}

function fmtCurrency(n: number | null | undefined) {
  if (n == null) return '—'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toFixed(0)}`
}

const FUNDING_TYPE_COLORS: Record<string, string> = {
  grant: 'bg-blue-100 text-blue-700',
  major_donor: 'bg-purple-100 text-purple-700',
  institutional_partner: 'bg-green-100 text-green-700',
  board_gift: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]',
  general_donation: 'bg-gray-100 text-gray-600',
}

const STATUS_COLORS: Record<string, string> = {
  prospect: 'bg-gray-100 text-gray-500',
  applied: 'bg-blue-100 text-blue-600',
  awarded: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-500',
  reporting: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]',
  closed: 'bg-gray-100 text-gray-400',
}

type Tab = 'vitals' | 'funding' | 'cohorts'

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AdminAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('vitals')

  useEffect(() => {
    fetch('/api/analytics/admin')
      .then(r => r.json())
      .then(json => { setData(json); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="h-6 bg-gray-100 rounded animate-pulse w-48 mb-2" />
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!data) {
    return <p className="text-sm text-[var(--bp-muted)]">Could not load analytics.</p>
  }

  const { metrics: m, funding, cohortOutcomes } = data
  const overdueDeadlines = funding.upcomingDeadlines.filter(f => new Date(f.reporting_deadline!) < new Date())
  const upcomingSoon = funding.upcomingDeadlines.filter(f => new Date(f.reporting_deadline!) >= new Date())

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Institute Analytics</h1>
          <p className="text-sm text-[var(--bp-muted)] mt-1">
            Funder accountability · grant reporting · formation outcomes
            {m && (
              <span className="ml-2 text-xs">· snapshot {new Date(m.snapshot_date).toLocaleDateString()}</span>
            )}
          </p>
        </div>
      </div>

      {/* Deadline alerts */}
      {(overdueDeadlines.length > 0 || upcomingSoon.length > 0) && (
        <div className="space-y-2">
          {overdueDeadlines.map(f => (
            <div key={f.id} className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-800 flex items-center justify-between">
              <span>
                <strong>Overdue report:</strong> {f.source_name} — {f.reporting_deadline}
              </span>
              <span className="text-xs text-red-500">Past due</span>
            </div>
          ))}
          {upcomingSoon.map(f => (
            <div key={f.id} className="bg-[var(--bp-cream)] border border-[var(--bp-sand)] rounded-xl px-4 py-3 text-sm text-[var(--bp-brown-deep)] flex items-center justify-between">
              <span>
                <strong>Report due soon:</strong> {f.source_name} — {f.reporting_deadline}
              </span>
              <span className="text-xs text-[var(--bp-brown)]">Within 60 days</span>
            </div>
          ))}
        </div>
      )}

      {/* Top stats */}
      {m && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bp-card p-4 text-center">
            <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{m.total_students_served_alltime}</p>
            <p className="text-xs text-[var(--bp-muted)] mt-1">Students Served</p>
            <p className="text-xs text-[var(--bp-muted)]">all time</p>
          </div>
          <div className="bp-card p-4 text-center">
            <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{m.total_graduates}</p>
            <p className="text-xs text-[var(--bp-muted)] mt-1">Graduates</p>
          </div>
          <div className="bp-card p-4 text-center">
            <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{m.free_seats_funded}</p>
            <p className="text-xs text-[var(--bp-muted)] mt-1">Free Seats Funded</p>
          </div>
          <div className="bp-card p-4 text-center">
            <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">
              {m.avg_transformation_index_alltime?.toFixed(0) ?? '—'}
            </p>
            <p className="text-xs text-[var(--bp-muted)] mt-1">Avg TI (all-time)</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--bp-warm)]">
        {([
          ['vitals', 'Institute Vitals'],
          ['funding', `Funding (${funding.records.length})`],
          ['cohorts', `Cohort Outcomes (${cohortOutcomes.length})`],
        ] as const).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === v ? 'border-[var(--bp-brown-deep)] text-[var(--bp-brown-deep)]' : 'border-transparent text-[var(--bp-muted)] hover:text-[var(--bp-brown)]'}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Vitals Tab */}
      {tab === 'vitals' && m && (
        <div className="space-y-5">
          {/* Formation outcomes */}
          <div className="bp-card p-6 space-y-4">
            <h2 className="font-semibold">Formation Outcomes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Identity Blueprints', val: m.total_identity_blueprints },
                { label: 'Purpose Statements', val: m.total_purpose_statements },
                { label: 'Ministry Plans', val: m.total_ministry_plans },
                { label: 'Commissionings', val: m.total_commissionings },
              ].map(({ label, val }) => (
                <div key={label} className="bg-[var(--bp-paper)] rounded-xl p-4">
                  <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{val}</p>
                  <p className="text-xs text-[var(--bp-muted)] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement rates */}
          <div className="bp-card p-6 space-y-4">
            <h2 className="font-semibold">Engagement Rates (All Cohorts)</h2>
            <div className="space-y-3">
              {[
                { label: 'Average Attendance', val: m.avg_attendance_rate_allcohorts },
                { label: 'Average Reflection Rate', val: m.avg_reflection_rate_allcohorts },
                { label: 'Overall Retention', val: m.overall_retention_rate },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--bp-muted)]">{label}</span>
                    <span className="font-medium text-[var(--bp-brown)]">{val != null ? `${val.toFixed(0)}%` : '—'}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--bp-gold)] rounded-full"
                      style={{ width: `${val ?? 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transformation Index panel */}
          <div className="bg-[var(--bp-dark)] rounded-xl p-6 text-[var(--bp-gold-light)]">
            <p className="text-overline text-[var(--bp-gold)] mb-4">Transformation Index — All-Time</p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[var(--bp-gold-light)]">{m.avg_transformation_index_alltime?.toFixed(0) ?? '—'}</p>
                <p className="text-xs text-[var(--bp-brown)] mt-1">Avg composite (all graduates)</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--bp-gold-light)]">{m.avg_index_gain_per_graduate?.toFixed(0) ?? '—'}</p>
                <p className="text-xs text-[var(--bp-brown)] mt-1">Avg gain per graduate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[var(--bp-gold-light)]">{m.total_commissionings}</p>
                <p className="text-xs text-[var(--bp-brown)] mt-1">Commissioned</p>
              </div>
            </div>
          </div>

          {/* Economics */}
          <div className="bp-card p-6">
            <h2 className="font-semibold mb-4">Economics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-[var(--bp-paper)] rounded-xl p-4">
                <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{fmtCurrency(m.total_grant_funding_awarded)}</p>
                <p className="text-xs text-[var(--bp-muted)] mt-1">Total Awarded</p>
              </div>
              <div className="bg-[var(--bp-paper)] rounded-xl p-4">
                <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{fmtCurrency(m.total_grant_funding_deployed)}</p>
                <p className="text-xs text-[var(--bp-muted)] mt-1">Deployed</p>
              </div>
              <div className="bg-[var(--bp-paper)] rounded-xl p-4">
                <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{m.free_seats_funded}</p>
                <p className="text-xs text-[var(--bp-muted)] mt-1">Free Seats Funded</p>
              </div>
              <div className="bg-[var(--bp-paper)] rounded-xl p-4">
                <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{fmtCurrency(m.cost_per_completion)}</p>
                <p className="text-xs text-[var(--bp-muted)] mt-1">Cost / Completion</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Funding Tab */}
      {tab === 'funding' && (
        <div className="space-y-4">
          {/* Funding summary row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bp-card p-4 text-center">
              <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{fmtCurrency(funding.totalAwarded)}</p>
              <p className="text-xs text-[var(--bp-muted)] mt-1">Active Funding Awarded</p>
            </div>
            <div className="bp-card p-4 text-center">
              <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{fmtCurrency(funding.totalDeployed)}</p>
              <p className="text-xs text-[var(--bp-muted)] mt-1">Deployed</p>
              {funding.totalAwarded > 0 && (
                <p className="text-xs text-[var(--bp-muted)]">{((funding.totalDeployed / funding.totalAwarded) * 100).toFixed(0)}% utilized</p>
              )}
            </div>
            <div className="bp-card p-4 text-center">
              <p className="text-2xl font-bold text-[var(--bp-brown-deep)]">{funding.totalFreeSeats}</p>
              <p className="text-xs text-[var(--bp-muted)] mt-1">Total Free Seats Funded</p>
            </div>
          </div>

          {funding.records.length === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)]">
              <p>No funding records yet. Manage them in the Founder dashboard.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {funding.records.map(f => (
                <div key={f.id} className="bp-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-[var(--bp-brown)]">{f.source_name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${FUNDING_TYPE_COLORS[f.funding_type] ?? 'bg-gray-100 text-gray-500'}`}>
                          {f.funding_type.replace(/_/g, ' ')}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[f.status] ?? 'bg-gray-100 text-gray-500'}`}>
                          {f.status}
                        </span>
                        {f.is_restricted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">restricted</span>
                        )}
                      </div>
                      {f.restriction_description && (
                        <p className="text-xs text-[var(--bp-muted)] mt-0.5">Restriction: {f.restriction_description}</p>
                      )}
                      <div className="flex gap-4 mt-1 text-xs text-[var(--bp-muted)]">
                        {f.period_start && f.period_end && (
                          <span>{f.period_start} — {f.period_end}</span>
                        )}
                        {f.reporting_deadline && (
                          <span className={new Date(f.reporting_deadline) < new Date() ? 'text-red-500 font-medium' : ''}>
                            Report due: {f.reporting_deadline}
                          </span>
                        )}
                        {f.free_seats_funded > 0 && <span>{f.free_seats_funded} free seats</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-semibold text-[var(--bp-brown-deep)]">{fmtCurrency(f.amount_awarded)}</p>
                      {f.amount_deployed != null && (
                        <p className="text-xs text-[var(--bp-muted)]">{fmtCurrency(f.amount_deployed)} deployed</p>
                      )}
                      {f.amount_requested != null && f.amount_awarded == null && (
                        <p className="text-xs text-[var(--bp-muted)]">{fmtCurrency(f.amount_requested)} requested</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cohort Outcomes Tab */}
      {tab === 'cohorts' && (
        <div className="space-y-3">
          {cohortOutcomes.length === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)]">
              <p>No cohort outcomes yet. Data will populate as cohorts progress and analytics are computed.</p>
            </div>
          ) : (
            cohortOutcomes.map(c => (
              <div key={c.cohort_id} className="bp-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-[var(--bp-brown)]">{c.cohorts?.cohort_name ?? 'Cohort'}</p>
                    <p className="text-xs text-[var(--bp-muted)]">
                      {c.cohorts?.cohort_code}
                      {c.cohorts?.start_date && ` · ${c.cohorts.start_date}`}
                      {c.cohorts?.end_date && ` – ${c.cohorts.end_date}`}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.cohorts?.status === 'completed' ? 'bg-green-100 text-green-700' : c.cohorts?.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.cohorts?.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
                  {[
                    { label: 'Enrolled', val: c.total_enrolled },
                    { label: 'Completed', val: c.completed_students },
                    { label: 'Retention', val: c.retention_rate != null ? `${c.retention_rate.toFixed(0)}%` : '—' },
                    { label: 'Avg TI Gain', val: c.avg_index_gain != null ? `+${c.avg_index_gain.toFixed(0)}` : '—' },
                    { label: 'Capstones', val: `${c.identity_blueprints_submitted + c.purpose_statements_submitted + c.ministry_plans_submitted}` },
                    { label: 'Ministry Plans', val: c.ministry_plans_submitted },
                  ].map(({ label, val }) => (
                    <div key={label} className="bg-[var(--bp-paper)] rounded-lg p-2.5">
                      <p className="font-semibold text-[var(--bp-brown-deep)] text-sm">{val}</p>
                      <p className="text-[var(--bp-muted)] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
