'use client'

import { useState, useEffect } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

interface TIRecord {
  id: string
  checkpoint: string
  composite_index: number | null
  identity_score: number | null
  healing_score: number | null
  calling_score: number | null
  maturity_score: number | null
  composite_delta: number | null
  confidence_flag: string | null
  computed_at: string
}

interface ReflectionRecord {
  depth_score: number | null
  depth_label: string | null
  identity_language_score: number | null
  themes: string[] | null
  analyzed_at: string
}

interface AnalyticsData {
  transformationIndex: {
    records: TIRecord[]
    latest: TIRecord | null
    baseline: TIRecord | null
    gain: number | null
  }
  reflectionAnalysis: {
    records: ReflectionRecord[]
    avgDepthScore: number | null
    avgIdentityLanguage: number | null
    totalAnalyzed: number
  }
  engagement: {
    eventCounts: Record<string, number>
    streak: number
    activeDaysLast90: number
  }
  progress: {
    lessonsCompleted: number
    totalLessons: number
    reflectionCount: number
    identityBlueprintComplete: boolean
    purposeStatementComplete: boolean
    ministryPlanComplete: boolean
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const CHECKPOINT_LABELS: Record<string, string> = {
  baseline: 'Baseline',
  q1_end: 'Q1 End',
  q2_end: 'Q2 End',
  q3_end: 'Q3 End',
  q4_end: 'Q4 End',
  commissioning: 'Commissioning',
}

const DEPTH_COLORS: Record<string, string> = {
  surface: 'bg-gray-200 text-gray-600',
  developing: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]',
  substantive: 'bg-blue-100 text-blue-700',
  profound: 'bg-[var(--bp-dark)] text-[var(--bp-gold-light)]',
}

function ScoreBar({ score, label, color = 'bg-[var(--bp-gold)]' }: { score: number | null; label: string; color?: string }) {
  const pct = score ?? 0
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--bp-muted)]">{label}</span>
        <span className="font-medium text-[var(--bp-brown)]">{score ?? '—'}{score != null ? '/100' : ''}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function DeltaBadge({ delta }: { delta: number | null }) {
  if (delta == null) return null
  const positive = delta >= 0
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
      {positive ? '+' : ''}{delta}
    </span>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StudentAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'formation' | 'reflections' | 'engagement'>('formation')

  useEffect(() => {
    fetch('/api/analytics/student')
      .then(r => r.json())
      .then(json => { setData(json); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="h-6 bg-gray-100 rounded animate-pulse w-48 mb-2" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-72" />
      </div>
    )
  }

  if (!data) {
    return <p className="text-sm text-[var(--bp-muted)]">Could not load analytics.</p>
  }

  const { transformationIndex: ti, reflectionAnalysis: ra, engagement: eng, progress } = data
  const latest = ti.latest
  const baseline = ti.baseline
  const capstoneCount = [progress.identityBlueprintComplete, progress.purposeStatementComplete, progress.ministryPlanComplete].filter(Boolean).length

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Formation Journey</h1>
        <p className="text-sm text-[var(--bp-muted)] mt-1">
          Track your spiritual transformation across identity, healing, calling, and maturity.
        </p>
      </div>

      {/* Top stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">
            {latest?.composite_index ?? '—'}
          </p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Current TI Score</p>
          {ti.gain != null && (
            <div className="mt-1 flex justify-center">
              <DeltaBadge delta={ti.gain} />
            </div>
          )}
        </div>
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{progress.lessonsCompleted}</p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Lessons Complete</p>
          {progress.totalLessons > 0 && (
            <p className="text-xs text-[var(--bp-muted)]">of {progress.totalLessons}</p>
          )}
        </div>
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{progress.reflectionCount}</p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Reflections Written</p>
        </div>
        <div className="bp-card p-4 text-center">
          <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{capstoneCount}/3</p>
          <p className="text-xs text-[var(--bp-muted)] mt-1">Capstones Complete</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--bp-warm)]">
        {([['formation', 'Transformation Index'], ['reflections', 'Reflection Depth'], ['engagement', 'Engagement']] as const).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setActiveTab(v)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === v ? 'border-[var(--bp-brown-deep)] text-[var(--bp-brown-deep)]' : 'border-transparent text-[var(--bp-muted)] hover:text-[var(--bp-brown)]'}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Formation Tab */}
      {activeTab === 'formation' && (
        <div className="space-y-6">
          {ti.records.length === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)]">
              <p className="font-medium">No assessments recorded yet.</p>
              <p className="text-sm mt-1">Your Transformation Index will appear once your facilitator completes your first assessment.</p>
            </div>
          ) : (
            <>
              {/* Current dimension scores */}
              {latest && (
                <div className="bp-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Current Formation Scores</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--bp-muted)]">{CHECKPOINT_LABELS[latest.checkpoint] ?? latest.checkpoint}</span>
                      {latest.confidence_flag && (
                        <span className="text-xs bg-[var(--bp-cream)] text-[var(--bp-brown)] px-2 py-0.5 rounded-full">
                          {latest.confidence_flag} confidence
                        </span>
                      )}
                    </div>
                  </div>
                  <ScoreBar score={latest.identity_score} label="Identity — I know who God created me to be" color="bg-[var(--bp-gold)]" />
                  <ScoreBar score={latest.healing_score} label="Healing — I am free from what wounded me" color="bg-green-400" />
                  <ScoreBar score={latest.calling_score} label="Calling — I know what I am called to do" color="bg-blue-400" />
                  <ScoreBar score={latest.maturity_score} label="Maturity — I have sustainable spiritual disciplines" color="bg-purple-400" />
                  <div className="pt-2 border-t border-[var(--bp-warm)]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Composite Transformation Index</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[var(--bp-brown-deep)]">{latest.composite_index ?? '—'}</span>
                        {ti.gain != null && <DeltaBadge delta={ti.gain} />}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Checkpoint history table */}
              <div className="bp-card p-6">
                <h2 className="font-semibold mb-4">Checkpoint History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-[var(--bp-muted)] border-b border-[var(--bp-warm)]">
                        <th className="text-left pb-2 pr-4 font-medium">Checkpoint</th>
                        <th className="text-center pb-2 px-2 font-medium">Identity</th>
                        <th className="text-center pb-2 px-2 font-medium">Healing</th>
                        <th className="text-center pb-2 px-2 font-medium">Calling</th>
                        <th className="text-center pb-2 px-2 font-medium">Maturity</th>
                        <th className="text-center pb-2 pl-2 font-medium">Composite</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ti.records.map((record, i) => (
                        <tr key={record.id} className="border-b border-[var(--bp-warm)] last:border-0">
                          <td className="py-2.5 pr-4 font-medium text-[var(--bp-brown)]">
                            {CHECKPOINT_LABELS[record.checkpoint] ?? record.checkpoint}
                            {i === ti.records.length - 1 && (
                              <span className="ml-2 text-xs bg-[var(--bp-cream)] text-[var(--bp-brown)] px-1.5 py-0.5 rounded-full">current</span>
                            )}
                          </td>
                          <td className="text-center py-2.5 px-2">{record.identity_score ?? '—'}</td>
                          <td className="text-center py-2.5 px-2">{record.healing_score ?? '—'}</td>
                          <td className="text-center py-2.5 px-2">{record.calling_score ?? '—'}</td>
                          <td className="text-center py-2.5 px-2">{record.maturity_score ?? '—'}</td>
                          <td className="text-center py-2.5 pl-2">
                            <div className="flex items-center justify-center gap-1.5">
                              <span className="font-semibold text-[var(--bp-brown-deep)]">{record.composite_index ?? '—'}</span>
                              {record.composite_delta != null && i > 0 && <DeltaBadge delta={record.composite_delta} />}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Capstone progress */}
              <div className="bp-card p-6">
                <h2 className="font-semibold mb-4">Capstone Artifacts</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Identity Blueprint Statement™', done: progress.identityBlueprintComplete, href: '/identity-blueprint' },
                    { label: 'Purpose Statement™', done: progress.purposeStatementComplete, href: '/purpose-statement' },
                    { label: 'Ministry Launch Plan™', done: progress.ministryPlanComplete, href: '/ministry-plan' },
                  ].map(({ label, done, href }) => (
                    <a
                      key={label}
                      href={href}
                      className={`p-4 rounded-xl border text-center transition-all hover:border-[var(--bp-sand)] ${done ? 'border-green-200 bg-green-50' : 'border-[var(--bp-warm)] bg-white'}`}
                    >
                      <div className="text-2xl mb-2">{done ? '✓' : '○'}</div>
                      <p className="text-xs font-medium text-[var(--bp-brown)]">{label}</p>
                      <p className={`text-xs mt-1 ${done ? 'text-green-600' : 'text-[var(--bp-muted)]'}`}>
                        {done ? 'Complete' : 'In progress'}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Reflections Tab */}
      {activeTab === 'reflections' && (
        <div className="space-y-6">
          {ra.totalAnalyzed === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)]">
              <p className="font-medium">No reflection analysis yet.</p>
              <p className="text-sm mt-1">Submit reflections on your lessons to see depth scores and language insights here.</p>
            </div>
          ) : (
            <>
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bp-card p-4 text-center">
                  <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{ra.avgDepthScore ?? '—'}</p>
                  <p className="text-xs text-[var(--bp-muted)] mt-1">Avg Depth Score</p>
                  <p className="text-xs text-[var(--bp-muted)]">out of 100</p>
                </div>
                <div className="bp-card p-4 text-center">
                  <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{ra.avgIdentityLanguage ?? '—'}</p>
                  <p className="text-xs text-[var(--bp-muted)] mt-1">Identity Language</p>
                  <p className="text-xs text-[var(--bp-muted)]">vs. performance language</p>
                </div>
                <div className="bp-card p-4 text-center">
                  <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{ra.totalAnalyzed}</p>
                  <p className="text-xs text-[var(--bp-muted)] mt-1">Reflections Analyzed</p>
                </div>
              </div>

              {/* Identity language explanation */}
              <div className="bg-[var(--bp-cream)] border border-[var(--bp-sand)] rounded-xl p-4 text-sm text-[var(--bp-brown-deep)]">
                <p className="font-medium mb-1">What is Identity Language?</p>
                <p>A higher identity language score means your reflections use language rooted in <em>who you are</em> ("I am," "God made me," "I carry") rather than what you do ("I achieved," "I failed"). This shift is a marker of genuine formation.</p>
              </div>

              {/* Reflection depth over time */}
              <div className="bp-card p-6">
                <h2 className="font-semibold mb-4">Depth Over Time</h2>
                <div className="space-y-2">
                  {ra.records.map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-[var(--bp-muted)] w-20 flex-shrink-0">
                        {new Date(r.analyzed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--bp-gold)] rounded-full transition-all"
                          style={{ width: `${r.depth_score ?? 0}%` }}
                        />
                      </div>
                      <span className="text-xs w-8 text-right font-medium text-[var(--bp-brown)]">{r.depth_score ?? '—'}</span>
                      {r.depth_label && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-24 text-center flex-shrink-0 ${DEPTH_COLORS[r.depth_label] ?? 'bg-gray-100 text-gray-600'}`}>
                          {r.depth_label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Engagement Tab */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bp-card p-4 text-center">
              <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{eng.streak}</p>
              <p className="text-xs text-[var(--bp-muted)] mt-1">Day Streak</p>
              <p className="text-xs text-[var(--bp-muted)]">consecutive days active</p>
            </div>
            <div className="bp-card p-4 text-center">
              <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">{eng.activeDaysLast90}</p>
              <p className="text-xs text-[var(--bp-muted)] mt-1">Active Days</p>
              <p className="text-xs text-[var(--bp-muted)]">last 90 days</p>
            </div>
            <div className="bp-card p-4 text-center">
              <p className="text-3xl font-bold text-[var(--bp-brown-deep)]">
                {Object.values(eng.eventCounts).reduce((a, b) => a + b, 0)}
              </p>
              <p className="text-xs text-[var(--bp-muted)] mt-1">Total Actions</p>
              <p className="text-xs text-[var(--bp-muted)]">last 90 days</p>
            </div>
          </div>

          {Object.keys(eng.eventCounts).length > 0 ? (
            <div className="bp-card p-6">
              <h2 className="font-semibold mb-4">Activity Breakdown</h2>
              <div className="space-y-2">
                {Object.entries(eng.eventCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, count]) => {
                    const maxCount = Math.max(...Object.values(eng.eventCounts))
                    return (
                      <div key={type} className="flex items-center gap-3">
                        <span className="text-xs text-[var(--bp-muted)] w-36 flex-shrink-0 capitalize">
                          {type.replace(/_/g, ' ')}
                        </span>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--bp-gold-light)] rounded-full"
                            style={{ width: `${(count / maxCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-[var(--bp-brown)] w-6 text-right">{count}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          ) : (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)]">
              <p className="font-medium">No engagement events in the last 90 days.</p>
              <p className="text-sm mt-1">Your activity across lessons, reflections, and the cohort will appear here.</p>
            </div>
          )}

          {/* Scripture anchor */}
          <blockquote className="border-l-2 border-[var(--bp-gold)] pl-4 py-1">
            <p className="text-sm italic text-[var(--bp-brown)]">
              "For we are God&apos;s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."
            </p>
            <cite className="text-xs text-[var(--bp-muted)] mt-1 block">— Ephesians 2:10</cite>
          </blockquote>
        </div>
      )}
    </div>
  )
}
