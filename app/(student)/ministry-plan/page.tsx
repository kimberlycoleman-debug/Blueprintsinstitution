'use client'

import { useState, useEffect } from 'react'
import { TrackPageView } from '@/components/analytics/TrackPageView'

interface MinistryPlan {
  id: string
  ministry_name: string | null
  vision_statement: string
  mission_statement: string | null
  target_audience: string | null
  three_month_goals: string[] | null
  six_month_goals: string[] | null
  one_year_goals: string[] | null
  team_needed: string | null
  resources_needed: string | null
  funding_needed: string | null
  partnerships_sought: string | null
  launch_date: string | null
  first_milestone_date: string | null
  is_complete: boolean
  facilitator_reviewed: boolean
  facilitator_response: string | null
}

type TextField = 'ministry_name' | 'vision_statement' | 'mission_statement' | 'target_audience' | 'team_needed' | 'resources_needed' | 'funding_needed' | 'partnerships_sought'

const TEXT_SECTIONS: { key: TextField; label: string; prompt: string; rows?: number }[] = [
  { key: 'vision_statement', label: 'Vision Statement ✦', rows: 4, prompt: 'What does the world look like when your ministry is fully alive? Paint the picture.' },
  { key: 'ministry_name', label: 'Ministry Name', rows: 1, prompt: 'What is this called? Even a working name is enough to start.' },
  { key: 'mission_statement', label: 'Mission Statement', rows: 2, prompt: 'In one or two sentences: what do you do, for whom, and why?' },
  { key: 'target_audience', label: 'Who You Serve', rows: 2, prompt: 'Who is this for? Be specific. "Everyone" is not an audience.' },
  { key: 'team_needed', label: 'Team Needed', rows: 2, prompt: 'What kinds of people do you need around you to do this well?' },
  { key: 'resources_needed', label: 'Resources Needed', rows: 2, prompt: 'What do you need to launch? Equipment, space, platform, budget?' },
  { key: 'funding_needed', label: 'Funding Needed', rows: 2, prompt: 'What is the financial ask for the first year? Be honest.' },
  { key: 'partnerships_sought', label: 'Partnerships Sought', rows: 2, prompt: 'Who could you partner with? Organizations, churches, networks?' },
]

type GoalKey = 'three_month_goals' | 'six_month_goals' | 'one_year_goals'
const GOAL_SECTIONS: { key: GoalKey; label: string; prompt: string }[] = [
  { key: 'three_month_goals', label: '3-Month Goals', prompt: 'Concrete, specific. What will you have done in the first 90 days?' },
  { key: 'six_month_goals', label: '6-Month Goals', prompt: 'Where are you by month six?' },
  { key: 'one_year_goals', label: '1-Year Goals', prompt: 'What does a full year of movement produce?' },
]

export default function MinistryPlanPage() {
  const [plan, setPlan] = useState<Partial<MinistryPlan>>({})
  const [purposeStatement, setPurposeStatement] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')

  // Goals as editable lists
  const [threeMonth, setThreeMonth] = useState<string[]>([''])
  const [sixMonth, setSixMonth] = useState<string[]>([''])
  const [oneYear, setOneYear] = useState<string[]>([''])

  // AI draft
  const [aiSection, setAiSection] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiDraft, setAiDraft] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/capstone/ministry-plan').then((r) => r.json()),
      fetch('/api/capstone/purpose-statement').then((r) => r.json()),
    ]).then(([{ data: mp }, { data: ps }]) => {
      if (mp) {
        setPlan(mp)
        setThreeMonth(mp.three_month_goals?.length ? mp.three_month_goals : [''])
        setSixMonth(mp.six_month_goals?.length ? mp.six_month_goals : [''])
        setOneYear(mp.one_year_goals?.length ? mp.one_year_goals : [''])
      }
      if (ps?.purpose_statement) setPurposeStatement(ps.purpose_statement)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  function update(key: TextField, value: string) {
    setPlan((prev) => ({ ...prev, [key]: value }))
  }

  async function save(complete = false) {
    setSaving(true)
    setSaveMsg('')
    setSaveError('')

    const res = await fetch('/api/capstone/ministry-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...plan,
        vision_statement: plan.vision_statement ?? '',
        three_month_goals: threeMonth.filter(Boolean),
        six_month_goals: sixMonth.filter(Boolean),
        one_year_goals: oneYear.filter(Boolean),
        is_complete: complete,
      }),
    })
    const json = await res.json()
    setSaving(false)
    if (!res.ok) {
      setSaveError(json.error ?? 'Could not save.')
    } else {
      setPlan((prev) => ({ ...prev, is_complete: json.data.is_complete }))
      setSaveMsg(complete ? 'Ministry Plan submitted!' : 'Saved.')
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  async function requestAiDraft(sectionLabel: string, content: string) {
    if (!content.trim()) return
    setAiSection(sectionLabel)
    setAiLoading(true)
    setAiDraft(null)

    const res = await fetch('/api/capstone/ministry-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ai_draft',
        section: sectionLabel,
        content,
        purpose_statement: purposeStatement || undefined,
      }),
    })
    const json = await res.json()
    setAiLoading(false)
    if (res.ok) setAiDraft(json.draft)
  }

  function GoalList({ goals, setGoals, label }: { goals: string[]; setGoals: React.Dispatch<React.SetStateAction<string[]>>; label: string }) {
    return (
      <>
        {goals.map((goal, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="bp-input flex-1"
              value={goal}
              placeholder={`${label} goal…`}
              onChange={(e) => setGoals((prev) => { const n = [...prev]; n[i] = e.target.value; return n })}
            />
            {goals.length > 1 && (
              <button type="button" onClick={() => setGoals((p) => p.filter((_, idx) => idx !== i))} className="text-[var(--bp-muted)] text-sm hover:text-red-500">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setGoals((p) => [...p, ''])} className="text-xs text-[var(--bp-brown)] hover:underline">+ Add goal</button>
      </>
    )
  }

  if (loading) return <div className="max-w-3xl mx-auto py-12 text-[var(--bp-muted)] text-sm">Loading…</div>

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <TrackPageView eventType="capstone_start" resourceType="ministry_plan" metadata={{ page: 'ministry-plan' }} />

      <div>
        <div className="text-overline mb-1">Q4 Capstone</div>
        <h1 className="text-3xl font-semibold">Ministry Launch Plan™</h1>
        <p className="text-[var(--bp-muted)] mt-1">
          Purpose made actionable. Not a business plan — a movement plan.
        </p>
        {plan.is_complete && (
          <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
            ✓ Submitted
            {plan.facilitator_reviewed && ' · Reviewed by facilitator'}
          </div>
        )}
      </div>

      {/* Purpose context */}
      {purposeStatement && (
        <div className="bp-card p-5 bg-[var(--bp-cream)]">
          <p className="text-xs font-semibold text-[var(--bp-brown)] mb-1">Your Purpose Statement</p>
          <p className="text-sm leading-relaxed italic">&ldquo;{purposeStatement}&rdquo;</p>
        </div>
      )}

      {/* Facilitator feedback */}
      {plan.facilitator_response && (
        <div className="bp-card p-6 bg-[var(--bp-warm)]">
          <p className="text-xs font-semibold text-[var(--bp-brown)] mb-2">Facilitator Response</p>
          <p className="text-sm leading-relaxed">{plan.facilitator_response}</p>
        </div>
      )}

      {/* Text sections */}
      <div className="space-y-6">
        {TEXT_SECTIONS.map(({ key, label, prompt, rows }) => (
          <div key={key} className="bp-card p-6 space-y-3">
            <label className="block font-semibold text-sm">{label}</label>
            <p className="text-xs text-[var(--bp-muted)]">{prompt}</p>
            <textarea
              rows={rows ?? 2}
              className="bp-textarea"
              value={(plan[key] as string | undefined) ?? ''}
              onChange={(e) => update(key, e.target.value)}
              placeholder={`Write your ${label.toLowerCase()}…`}
            />
            {key === 'vision_statement' && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => requestAiDraft(label, (plan[key] as string | undefined) ?? '')}
                  disabled={(aiLoading && aiSection === label) || !((plan[key] as string | undefined)?.trim())}
                  className="text-xs text-[var(--bp-brown)] border border-[var(--bp-warm)] px-3 py-1.5 rounded-lg hover:bg-[var(--bp-cream)] disabled:opacity-40 transition-colors"
                >
                  {aiLoading && aiSection === label ? 'Asking companion…' : '✦ Deepen with companion'}
                </button>
              </div>
            )}
            {aiSection === label && aiDraft && (
              <div className="bg-[var(--bp-cream)] rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-[var(--bp-brown)]">Formation Companion</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiDraft}</p>
                <button
                  type="button"
                  onClick={() => { update(key as TextField, aiDraft); setAiDraft(null); setAiSection(null) }}
                  className="text-xs text-[var(--bp-brown-deep)] font-medium hover:underline"
                >
                  Use this draft
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Goals */}
        {GOAL_SECTIONS.map(({ key, label, prompt }) => (
          <div key={key} className="bp-card p-6 space-y-3">
            <label className="block font-semibold text-sm">{label}</label>
            <p className="text-xs text-[var(--bp-muted)]">{prompt}</p>
            <GoalList
              goals={key === 'three_month_goals' ? threeMonth : key === 'six_month_goals' ? sixMonth : oneYear}
              setGoals={key === 'three_month_goals' ? setThreeMonth : key === 'six_month_goals' ? setSixMonth : setOneYear}
              label={label}
            />
          </div>
        ))}

        {/* Dates */}
        <div className="bp-card p-6 space-y-4">
          <label className="block font-semibold text-sm">Timeline</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[var(--bp-muted)] block mb-1">First milestone date</label>
              <input
                type="date"
                className="bp-input"
                value={plan.first_milestone_date ?? ''}
                onChange={(e) => setPlan((p) => ({ ...p, first_milestone_date: e.target.value || null }))}
              />
            </div>
            <div>
              <label className="text-xs text-[var(--bp-muted)] block mb-1">Target launch date</label>
              <input
                type="date"
                className="bp-input"
                value={plan.launch_date ?? ''}
                onChange={(e) => setPlan((p) => ({ ...p, launch_date: e.target.value || null }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {saveError && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{saveError}</p>}
      {saveMsg && <p className="text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl">{saveMsg}</p>}

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => save(false)}
          disabled={saving || !plan.vision_statement?.trim()}
          className="bp-btn bp-btn-secondary disabled:opacity-40"
        >
          {saving ? 'Saving…' : 'Save progress'}
        </button>
        {!plan.is_complete && (
          <button
            onClick={() => save(true)}
            disabled={saving || !plan.vision_statement?.trim()}
            className="bp-btn bp-btn-primary disabled:opacity-40"
          >
            Submit to facilitator
          </button>
        )}
      </div>
    </div>
  )
}
