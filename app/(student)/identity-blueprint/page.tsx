'use client'

import { useState, useEffect } from 'react'
import { TrackPageView } from '@/components/analytics/TrackPageView'

interface Blueprint {
  id: string
  identity_statement: string
  who_god_says_i_am: string | null
  my_god_given_design: string | null
  my_strengths: string | null
  my_enneagram: string | null
  my_spiritual_gifts: string | null
  my_biblical_parallels: string | null
  my_purpose_themes: string | null
  identity_lies_renounced: string[] | null
  truth_declarations: string[] | null
  is_complete: boolean
  facilitator_reviewed: boolean
  facilitator_response: string | null
}

type SectionKey = keyof Omit<Blueprint, 'id' | 'is_complete' | 'facilitator_reviewed' | 'facilitator_response' | 'identity_lies_renounced' | 'truth_declarations'>

const SECTIONS: { key: SectionKey; label: string; prompt: string }[] = [
  { key: 'identity_statement', label: 'Identity Statement ✦', prompt: 'The core declaration of who you are in Christ. Begin with "I am..."' },
  { key: 'who_god_says_i_am', label: 'Who God Says I Am', prompt: 'What does Scripture and the Spirit confirm about your identity?' },
  { key: 'my_god_given_design', label: 'My God-Given Design', prompt: 'How were you wired? What are the unique contours of who you are?' },
  { key: 'my_strengths', label: 'My Strengths', prompt: 'Your CliftonStrengths themes and how they shape how you move in the world.' },
  { key: 'my_enneagram', label: 'Enneagram', prompt: 'Your type, your core motivation, what\'s been redeemed.' },
  { key: 'my_spiritual_gifts', label: 'Spiritual Gifts', prompt: 'What gifts has the Spirit placed in you? How have they shown up?' },
  { key: 'my_biblical_parallels', label: 'Biblical Parallels', prompt: 'Which biblical figures carry threads of your story? What do you share with them?' },
  { key: 'my_purpose_themes', label: 'Purpose Themes', prompt: 'What recurring themes have you seen across your journey, callings, and grief?' },
]

export default function IdentityBlueprintPage() {
  const [blueprint, setBlueprint] = useState<Partial<Blueprint>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')

  // Lies / truths as editable lists
  const [lies, setLies] = useState<string[]>([''])
  const [truths, setTruths] = useState<string[]>([''])

  // AI draft
  const [aiSection, setAiSection] = useState<SectionKey | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiDraft, setAiDraft] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/capstone/identity-blueprint')
      .then((r) => r.json())
      .then(({ data }) => {
        if (data) {
          setBlueprint(data)
          setLies(data.identity_lies_renounced?.length ? data.identity_lies_renounced : [''])
          setTruths(data.truth_declarations?.length ? data.truth_declarations : [''])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function update(key: SectionKey, value: string) {
    setBlueprint((prev) => ({ ...prev, [key]: value }))
  }

  async function save(complete = false) {
    setSaving(true)
    setSaveMsg('')
    setSaveError('')

    const res = await fetch('/api/capstone/identity-blueprint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...blueprint,
        identity_statement: blueprint.identity_statement ?? '',
        identity_lies_renounced: lies.filter(Boolean),
        truth_declarations: truths.filter(Boolean),
        is_complete: complete,
      }),
    })
    const json = await res.json()
    setSaving(false)
    if (!res.ok) {
      setSaveError(json.error ?? 'Could not save.')
    } else {
      setBlueprint((prev) => ({ ...prev, is_complete: json.data.is_complete }))
      setSaveMsg(complete ? 'Blueprint submitted!' : 'Saved.')
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  async function requestAiDraft(sectionKey: SectionKey) {
    const content = (blueprint[sectionKey] as string | undefined) ?? ''
    if (!content.trim()) return
    setAiSection(sectionKey)
    setAiLoading(true)
    setAiDraft(null)

    const res = await fetch('/api/capstone/identity-blueprint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ai_draft',
        section: SECTIONS.find((s) => s.key === sectionKey)?.label ?? sectionKey,
        content,
      }),
    })
    const json = await res.json()
    setAiLoading(false)
    if (res.ok) setAiDraft(json.draft)
  }

  if (loading) return <div className="max-w-3xl mx-auto py-12 text-[var(--bp-muted)] text-sm">Loading…</div>

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <TrackPageView eventType="capstone_start" resourceType="identity_blueprint" metadata={{ page: 'identity-blueprint' }} />

      <div>
        <div className="text-overline mb-1">Q1 Capstone</div>
        <h1 className="text-3xl font-semibold">Identity Blueprint Statement™</h1>
        <p className="text-[var(--bp-muted)] mt-1">
          A declaration of who you are — not what you do. Built over three months. Written in your voice.
        </p>
        {blueprint.is_complete && (
          <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
            ✓ Submitted
            {blueprint.facilitator_reviewed && ' · Reviewed by facilitator'}
          </div>
        )}
      </div>

      {/* Facilitator feedback */}
      {blueprint.facilitator_response && (
        <div className="bp-card p-6 bg-[var(--bp-warm)]">
          <p className="text-xs font-semibold text-[var(--bp-brown)] mb-2">Facilitator Response</p>
          <p className="text-sm leading-relaxed">{blueprint.facilitator_response}</p>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map(({ key, label, prompt }) => (
          <div key={key} className="bp-card p-6 space-y-3">
            <label className="block font-semibold text-sm">{label}</label>
            <p className="text-xs text-[var(--bp-muted)]">{prompt}</p>
            <textarea
              rows={key === 'identity_statement' ? 4 : 3}
              className="bp-textarea"
              value={(blueprint[key] as string | undefined) ?? ''}
              onChange={(e) => update(key, e.target.value)}
              placeholder={`Write your ${label.toLowerCase()}…`}
            />
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={() => requestAiDraft(key)}
                disabled={aiLoading && aiSection === key || !((blueprint[key] as string | undefined)?.trim())}
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

        {/* Lies renounced */}
        <div className="bp-card p-6 space-y-3">
          <label className="block font-semibold text-sm">Identity Lies I Renounce</label>
          <p className="text-xs text-[var(--bp-muted)]">False beliefs about who you are that you are setting down.</p>
          {lies.map((lie, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="bp-input flex-1"
                value={lie}
                placeholder="I am not enough…"
                onChange={(e) => setLies((prev) => { const n = [...prev]; n[i] = e.target.value; return n })}
              />
              {lies.length > 1 && (
                <button type="button" onClick={() => setLies((p) => p.filter((_, idx) => idx !== i))} className="text-[var(--bp-muted)] text-sm hover:text-red-500">✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setLies((p) => [...p, ''])} className="text-xs text-[var(--bp-brown)] hover:underline">+ Add another</button>
        </div>

        {/* Truth declarations */}
        <div className="bp-card p-6 space-y-3">
          <label className="block font-semibold text-sm">Truth Declarations</label>
          <p className="text-xs text-[var(--bp-muted)]">Declarations of what is true about who you are.</p>
          {truths.map((truth, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="bp-input flex-1"
                value={truth}
                placeholder="I am called and equipped…"
                onChange={(e) => setTruths((prev) => { const n = [...prev]; n[i] = e.target.value; return n })}
              />
              {truths.length > 1 && (
                <button type="button" onClick={() => setTruths((p) => p.filter((_, idx) => idx !== i))} className="text-[var(--bp-muted)] text-sm hover:text-red-500">✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setTruths((p) => [...p, ''])} className="text-xs text-[var(--bp-brown)] hover:underline">+ Add another</button>
        </div>
      </div>

      {/* Actions */}
      {saveError && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{saveError}</p>}
      {saveMsg && <p className="text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl">{saveMsg}</p>}

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => save(false)}
          disabled={saving || !blueprint.identity_statement?.trim()}
          className="bp-btn bp-btn-secondary disabled:opacity-40"
        >
          {saving ? 'Saving…' : 'Save progress'}
        </button>
        {!blueprint.is_complete && (
          <button
            onClick={() => save(true)}
            disabled={saving || !blueprint.identity_statement?.trim()}
            className="bp-btn bp-btn-primary disabled:opacity-40"
          >
            Submit to facilitator
          </button>
        )}
      </div>
    </div>
  )
}
