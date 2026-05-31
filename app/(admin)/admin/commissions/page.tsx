'use client'

import { useState, useEffect, useCallback } from 'react'

interface CommissionRecord {
  id: string
  student_id: string
  cohort_id: string
  certificate_number: string | null
  certificate_issued: boolean
  commissioning_date: string | null
  commissioning_location: string | null
  calling_declaration: string | null
  final_blessing: string | null
  prophetic_words: string[] | null
  identity_blueprint_complete: boolean
  purpose_statement_complete: boolean
  ministry_plan_complete: boolean
  attendance_percentage: number | null
  lessons_completed: number
  community_covenant_signed: boolean
  created_at: string
  profiles: { id: string; full_name: string; email: string } | null
  cohorts: { cohort_name: string; cohort_code: string } | null
}

interface UncommissionedStudent {
  student_id: string
  cohort_id: string
  status: string
  profiles: { id: string; full_name: string; email: string } | null
  cohorts: { cohort_name: string; cohort_code: string } | null
}

type Tab = 'commissioned' | 'eligible'

const BLANK_DETAIL = {
  commissioning_date: '',
  commissioning_location: '',
  calling_declaration: '',
  final_blessing: '',
  prophetic_word: '',
}

export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState<CommissionRecord[]>([])
  const [uncommissioned, setUncommissioned] = useState<UncommissionedStudent[]>([])
  const [tab, setTab] = useState<Tab>('commissioned')
  const [selected, setSelected] = useState<CommissionRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState(BLANK_DETAIL)
  const [prophWords, setProphWords] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [creating, setCreating] = useState<UncommissionedStudent | null>(null)
  const [createDetail, setCreateDetail] = useState(BLANK_DETAIL)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/commissions')
    const json = await res.json()
    setCommissions(json.commissions ?? [])
    setUncommissioned(json.uncommissioned ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openCommission = (c: CommissionRecord) => {
    setSelected(c)
    setDetail({
      commissioning_date: c.commissioning_date ?? '',
      commissioning_location: c.commissioning_location ?? '',
      calling_declaration: c.calling_declaration ?? '',
      final_blessing: c.final_blessing ?? '',
      prophetic_word: '',
    })
    setProphWords(c.prophetic_words ?? [])
  }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    const res = await fetch('/api/admin/commissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: selected.id,
        commissioning_date: detail.commissioning_date || undefined,
        commissioning_location: detail.commissioning_location || undefined,
        calling_declaration: detail.calling_declaration || undefined,
        final_blessing: detail.final_blessing || undefined,
        prophetic_words: prophWords.length > 0 ? prophWords : undefined,
      }),
    })
    setSaving(false)
    if (res.ok) load()
  }

  const handleIssueCert = async () => {
    if (!selected) return
    if (!confirm(`Issue certificate to ${selected.profiles?.full_name}? This cannot be undone.`)) return
    setSaving(true)
    const res = await fetch('/api/admin/commissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: selected.id,
        certificate_issued: true,
        commissioning_date: detail.commissioning_date || new Date().toISOString().split('T')[0],
        commissioning_location: detail.commissioning_location || undefined,
        calling_declaration: detail.calling_declaration || undefined,
        final_blessing: detail.final_blessing || undefined,
        prophetic_words: prophWords.length > 0 ? prophWords : undefined,
      }),
    })
    setSaving(false)
    if (res.ok) { setSelected(null); load() }
  }

  const handleCovenant = async (id: string, value: boolean) => {
    await fetch('/api/admin/commissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, community_covenant_signed: value }),
    })
    load()
  }

  const handleCreateCommission = async (student: UncommissionedStudent) => {
    setSaving(true)
    const res = await fetch('/api/admin/commissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: student.student_id,
        cohort_id: student.cohort_id,
        calling_declaration: createDetail.calling_declaration || undefined,
        commissioning_date: createDetail.commissioning_date || undefined,
        commissioning_location: createDetail.commissioning_location || undefined,
      }),
    })
    setSaving(false)
    if (res.ok) {
      setCreating(null)
      setCreateDetail(BLANK_DETAIL)
      load()
    }
  }

  const issuedCount = commissions.filter(c => c.certificate_issued).length

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Commissioning</h1>
        <p className="text-sm text-[var(--bp-muted)] mt-1">
          {issuedCount} certificate{issuedCount !== 1 ? 's' : ''} issued · {uncommissioned.length} student{uncommissioned.length !== 1 ? 's' : ''} eligible
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--bp-warm)]">
        {([['commissioned', `Commissioned (${commissions.length})`], ['eligible', `Not Yet Commissioned (${uncommissioned.length})`]] as const).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === value ? 'border-[var(--bp-brown-deep)] text-[var(--bp-brown-deep)]' : 'border-transparent text-[var(--bp-muted)] hover:text-[var(--bp-brown)]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-[var(--bp-muted)]">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left: list */}
          <div className="space-y-2">
            {tab === 'commissioned' && (
              commissions.length === 0 ? (
                <p className="text-sm text-[var(--bp-muted)] py-8 text-center">No commissions yet.</p>
              ) : (
                commissions.map(c => (
                  <button
                    key={c.id}
                    onClick={() => openCommission(c)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === c.id ? 'border-[var(--bp-gold)] bg-[var(--bp-cream)]' : 'border-[var(--bp-warm)] bg-white hover:border-[var(--bp-sand)]'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{c.profiles?.full_name ?? 'Unknown'}</p>
                        <p className="text-xs text-[var(--bp-muted)]">{c.cohorts?.cohort_name}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {c.certificate_issued ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Cert issued</span>
                        ) : (
                          <span className="text-xs bg-[var(--bp-cream)] text-[var(--bp-brown)] px-2 py-0.5 rounded-full font-medium">Pending</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-[var(--bp-muted)]">
                      {c.commissioning_date && (
                        <span>{new Date(c.commissioning_date).toLocaleDateString()}</span>
                      )}
                      {c.certificate_number && <span>{c.certificate_number}</span>}
                    </div>
                    {/* Eligibility mini-bar */}
                    <div className="flex gap-1 mt-2">
                      {[c.identity_blueprint_complete, c.purpose_statement_complete, c.ministry_plan_complete].map((ok, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${ok ? 'bg-green-400' : 'bg-gray-200'}`} />
                      ))}
                      {c.attendance_percentage != null && (
                        <span className={`text-xs ml-1 ${c.attendance_percentage >= 70 ? 'text-green-600' : 'text-red-500'}`}>
                          {c.attendance_percentage}%
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )
            )}

            {tab === 'eligible' && (
              uncommissioned.length === 0 ? (
                <p className="text-sm text-[var(--bp-muted)] py-8 text-center">All enrolled students are already commissioned.</p>
              ) : (
                uncommissioned.map(s => (
                  <div
                    key={s.student_id}
                    className={`p-4 rounded-xl border transition-all ${creating?.student_id === s.student_id ? 'border-[var(--bp-gold)] bg-[var(--bp-cream)]' : 'border-[var(--bp-warm)] bg-white'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{s.profiles?.full_name ?? 'Unknown'}</p>
                        <p className="text-xs text-[var(--bp-muted)]">{s.cohorts?.cohort_name} · {s.status}</p>
                        <p className="text-xs text-[var(--bp-muted)]">{s.profiles?.email}</p>
                      </div>
                      <button
                        onClick={() => { setCreating(s); setCreateDetail(BLANK_DETAIL) }}
                        className="text-xs bg-[var(--bp-brown-deep)] text-white px-3 py-1.5 rounded-lg hover:opacity-90 flex-shrink-0"
                      >
                        Commission
                      </button>
                    </div>
                    {creating?.student_id === s.student_id && (
                      <div className="mt-4 space-y-3 border-t border-[var(--bp-sand)] pt-4">
                        <div>
                          <label className="bp-label">Calling Declaration (optional)</label>
                          <textarea
                            className="bp-input min-h-[70px]"
                            value={createDetail.calling_declaration}
                            onChange={e => setCreateDetail(d => ({ ...d, calling_declaration: e.target.value }))}
                            placeholder="The student's calling statement..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="bp-label">Commission date</label>
                            <input type="date" className="bp-input" value={createDetail.commissioning_date} onChange={e => setCreateDetail(d => ({ ...d, commissioning_date: e.target.value }))} />
                          </div>
                          <div>
                            <label className="bp-label">Location</label>
                            <input className="bp-input" value={createDetail.commissioning_location} onChange={e => setCreateDetail(d => ({ ...d, commissioning_location: e.target.value }))} placeholder="City, venue..." />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCreateCommission(s)}
                            disabled={saving}
                            className="bp-btn-primary text-sm px-4 py-2 disabled:opacity-50"
                          >
                            {saving ? 'Creating...' : 'Create Commission Record'}
                          </button>
                          <button onClick={() => setCreating(null)} className="bp-btn-secondary text-sm px-3 py-2">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )
            )}
          </div>

          {/* Right: detail panel */}
          <div>
            {selected ? (
              <div className="bp-card p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold">{selected.profiles?.full_name}</h2>
                    <p className="text-xs text-[var(--bp-muted)]">{selected.cohorts?.cohort_name} · {selected.certificate_number}</p>
                  </div>
                  {selected.certificate_issued && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Cert issued</span>
                  )}
                </div>

                {/* Eligibility summary */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: 'Identity Blueprint', ok: selected.identity_blueprint_complete },
                    { label: 'Purpose Statement', ok: selected.purpose_statement_complete },
                    { label: 'Ministry Plan', ok: selected.ministry_plan_complete },
                    { label: `Attendance (${selected.attendance_percentage ?? 0}%)`, ok: (selected.attendance_percentage ?? 0) >= 70 },
                  ].map(({ label, ok }) => (
                    <div key={label} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      <span>{ok ? '✓' : '✗'}</span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Community covenant toggle */}
                <div className="flex items-center justify-between py-2 border-y border-[var(--bp-warm)]">
                  <label className="text-sm">Community Covenant signed</label>
                  <button
                    onClick={() => handleCovenant(selected.id, !selected.community_covenant_signed)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${selected.community_covenant_signed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {selected.community_covenant_signed ? 'Signed ✓' : 'Not signed'}
                  </button>
                </div>

                {/* Edit fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="bp-label">Commission date</label>
                    <input type="date" className="bp-input" value={detail.commissioning_date} onChange={e => setDetail(d => ({ ...d, commissioning_date: e.target.value }))} />
                  </div>
                  <div>
                    <label className="bp-label">Location</label>
                    <input className="bp-input" value={detail.commissioning_location} onChange={e => setDetail(d => ({ ...d, commissioning_location: e.target.value }))} placeholder="City, venue..." />
                  </div>
                </div>

                <div>
                  <label className="bp-label">Calling Declaration</label>
                  <textarea className="bp-input min-h-[80px]" value={detail.calling_declaration} onChange={e => setDetail(d => ({ ...d, calling_declaration: e.target.value }))} placeholder="The student's calling declaration..." />
                </div>

                <div>
                  <label className="bp-label">Final Blessing</label>
                  <textarea className="bp-input min-h-[70px]" value={detail.final_blessing} onChange={e => setDetail(d => ({ ...d, final_blessing: e.target.value }))} placeholder="Blessing spoken over this graduate..." />
                </div>

                <div>
                  <label className="bp-label">Prophetic Words</label>
                  <div className="flex gap-2">
                    <input
                      className="bp-input flex-1"
                      value={detail.prophetic_word}
                      onChange={e => setDetail(d => ({ ...d, prophetic_word: e.target.value }))}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && detail.prophetic_word.trim()) {
                          e.preventDefault()
                          setProphWords(w => [...w, detail.prophetic_word.trim()])
                          setDetail(d => ({ ...d, prophetic_word: '' }))
                        }
                      }}
                      placeholder="Add prophetic word + Enter"
                    />
                  </div>
                  {prophWords.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {prophWords.map((w, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-[var(--bp-gold)] mt-0.5 flex-shrink-0">✦</span>
                          <p className="flex-1 italic text-[var(--bp-brown)]">"{w}"</p>
                          <button onClick={() => setProphWords(words => words.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-xs flex-shrink-0">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button onClick={handleSave} disabled={saving} className="bp-btn-secondary text-sm px-4 py-2 disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  {!selected.certificate_issued && (
                    <button
                      onClick={handleIssueCert}
                      disabled={saving}
                      className="bp-btn bp-btn-gold text-sm px-4 py-2 disabled:opacity-50"
                    >
                      Issue Certificate
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bp-card p-6 flex items-center justify-center min-h-[200px] text-[var(--bp-muted)] text-sm">
                Select a student to manage their commissioning
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
