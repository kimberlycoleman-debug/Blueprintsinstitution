'use client'

import { useState, useEffect } from 'react'
import { TrackPageView } from '@/components/analytics/TrackPageView'

interface PurposeStatement {
  id: string
  purpose_statement: string
  my_calling: string | null
  my_assignment: string | null
  my_passions: string | null
  my_burdens: string | null
  my_unique_contribution: string | null
  my_kingdom_impact: string | null
  is_complete: boolean
  facilitator_reviewed: boolean
  facilitator_response: string | null
}

type SectionKey = keyof Omit<PurposeStatement, 'id' | 'is_complete' | 'facilitator_reviewed' | 'facilitator_response'>

const SECTIONS: { key: SectionKey; label: string; prompt: string }[] = [
  { key: 'purpose_statement', label: 'Purpose Statement ✦', prompt: 'The declaration of your kingdom assignment. Begin with "I exist to..." or "My purpose is..."' },
  { key: 'my_calling', label: 'My Calling', prompt: 'What is the specific calling God has placed on your life — not a job, but a sacred assignment?' },
  { key: 'my_assignment', label: 'My Assignment', prompt: 'Where and to whom are you being sent? What does the assignment look like on the ground?' },
  { key: 'my_passions', label: 'What I Am Passionate About', prompt: 'What sets you on fire? What do you return to again and again even without reward?' },
  { key: 'my_burdens', label: 'What Breaks My Heart', prompt: 'What grieves you about the world? Often your burden is your assignment.' },
  { key: 'my_unique_contribution', label: 'My Unique Contribution', prompt: 'What do you carry that very few others carry? What would be missing if you didn\'t show up?' },
  { key: 'my_kingdom_impact', label: 'Kingdom Impact I Pursue', prompt: 'What does the world look like — even in a small corner of it — because you lived your purpose?' },
]

export default function PurposeStatementPage() {
  const [statement, setStatement] = useState<Partial<PurposeStatement>>({})
  const [identityStatement, setIdentityStatement] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')

  // AI draft
  const [aiSection, setAiSection] = useState<SectionKey | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiDraft, setAiDraft] = useState<string | null>(null)

  useEffect(() => {
    // Load purpose statement + identity blueprint for context
    Promise.all([
      fetch('/api/capstone/purpose-statement').then((r) => r.json()),
      fetch('/api/capstone/identity-blueprint').then((r) => r.json()),
    ]).then(([{ data: ps }, { data: ib }]) => {
      if (ps) setStatement(ps)
      if (ib?.identity_statement) setIdentityStatement(ib.identity_statement)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  function update(key: SectionKey, value: string) {
    setStatement((prev) => ({ ...prev, [key]: value }))
  }

  async function save(complete = false) {
    setSaving(true)
    setSaveMsg('')
    setSaveError('')

    const res = await fetch('/api/capstone/purpose-statement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...statement,
        purpose_statement: statement.purpose_statement ?? '',
        is_complete: complete,
      }),
    })
    const json = await res.json()
    setSaving(false)
    if (!res.ok) {
      setSaveError(json.error ?? 'Could not save.')
    } else {
      setStatement((prev) => ({ ...prev, is_complete: json.data.is_complete }))
      setSaveMsg(complete ? 'Purpose Statement submitted!' : 'Saved.')
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  async function requestAiDraft(sectionKey: SectionKey) {
    const content = (statement[sectionKey] as string | undefined) ?? ''
    if (!content.trim()) return
    setAiSection(sectionKey)
    setAiLoading(true)
    setAiDraft(null)

    const res = await fetch('/api/capstone/purpose-statement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ai_draft',
        section: SECTIONS.find((s) => s.key === sectionKey)?.label ?? sectionKey,
        content,
        identity_statement: identityStatement || undefined,
      }),
    })
    const json = await res.json()
    setAiLoading(false)
    if (res.ok) setAiDraft(json.draft)
  }

  if (loading) return <div className="max-w-3xl mx-auto py-12 text-[var(--bp-muted)] text-sm">Loading…</div>

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <TrackPageView eventType="capstone_start" resourceType="purpose_statement" metadata={{ page: 'purpose-statement' }} />

      <div>
        <div className="text-xs tracking-widest text-[var(--bp-brown)] uppercase font-semibold mb-1">Q4 Capstone</div>
        <h1 className="text-3xl font-semibold">Purpose Statement™</h1>
        <p className="text-[var(--bp-muted)] mt-1">
          Identity becomes assignment. Built from everything you have learned about who you are.
        </p>
        {statement.is_complete && (
          <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
            ✓ Submitted
            {statement.facilitator_reviewed && ' · Reviewed by facilitator'}
          </div>
        )}
      </div>

      {/* Identity Blueprint context card */}
      {identityStatement && (
        <div className="bp-card p-5 bg-[var(--bp-cream)]">
          <p className="text-xs font-semibold text-[var(--bp-brown)] mb-1">Your Identity Blueprint Statement</p>
          <p className="text-sm leading-relaxed italic">&ldquo;{identityStatement}&rdquo;</p>
        </div>
      )}

      {/* Facilitator feedback */}
      {statement.facilitator_response && (
        <div className="bp-card p-6 bg-[var(--bp-warm)]">
          <p className="text-xs font-semibold text-[var(--bp-brown)] mb-2">Facilitator Response</p>
          <p className="text-sm leading-relaxed">{statement.facilitator_response}</p>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map(({ key, label, prompt }) => (
          <div key={key} className="bp-card p-6 space-y-3">
            <label className="block font-semibold text-sm">{label}</label>
            <p className="text-xs text-[var(--bp-muted)]">{prompt}</p>
            <textarea
              rows={key === 'purpose_statement' ? 4 : 3}
              className="bp-textarea"
              value={(statement[key] as string | undefined) ?? ''}
              onChange={(e) => update(key, e.target.value)}
              placeholder={`Write your ${label.toLowerCase()}…`}
            />
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={() => requestAiDraft(key)}
                disabled={(aiLoading && aiSection === key) || !((statement[key] as string | undefined)?.trim())}
                className="text-xs text-[var(--bp-brown)] border border-[var(--bp-warm)] px-3 py-1.5 rounded-lg hover:bg-[var(--bp-cream)] disabled:opacity-40 transition-colors"
              >
                {aiLoading && aiSection === key ? 'Asking companion…' : '✦ Deepen with companion'}
              </button>
            </div>
            {aiSection === key && aiDraft && (
              <div className="bg-[var(--bp-cream)] rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-[var(--bp-brown)]">Formation Companion</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiDraft}</p>
                <button
                  type="button"
                  onClick={() => { update(key, aiDraft); setAiDraft(null); setAiSection(null) }}
                  className="text-xs text-[var(--bp-brown-deep)] font-medium hover:underline"
                >
                  Use this draft
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      {saveError && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{saveError}</p>}
      {saveMsg && <p className="text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl">{saveMsg}</p>}

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => save(false)}
          disabled={saving || !statement.purpose_statement?.trim()}
          className="bp-btn bp-btn-secondary disabled:opacity-40"
        >
          {saving ? 'Saving…' : 'Save progress'}
        </button>
        {!statement.is_complete && (
          <button
            onClick={() => save(true)}
            disabled={saving || !statement.purpose_statement?.trim()}
            className="bp-btn bp-btn-primary disabled:opacity-40"
          >
            Submit to facilitator
          </button>
        )}
      </div>
    </div>
  )
}
