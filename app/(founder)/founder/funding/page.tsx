'use client'

import { useState, useEffect, useCallback } from 'react'

interface FundingRecord {
  id: string
  funding_type: string
  status: string
  source_name: string
  source_contact: string | null
  source_email: string | null
  amount_requested: number | null
  amount_awarded: number | null
  amount_deployed: number
  applied_at: string | null
  awarded_at: string | null
  reporting_deadline: string | null
  is_restricted: boolean
  restriction_description: string | null
  free_seats_funded: number
  notes: string | null
  proposal_url: string | null
  report_url: string | null
  created_at: string
}

const FUNDING_TYPES = ['grant', 'major_donor', 'institutional_partner', 'church_partner', 'individual_donor', 'earned_revenue']
const STATUSES = ['prospect', 'applied', 'under_review', 'awarded', 'declined', 'reporting', 'closed']

const STATUS_COLORS: Record<string, string> = {
  prospect: 'bg-gray-100 text-gray-600',
  applied: 'bg-blue-100 text-blue-700',
  under_review: 'bg-yellow-100 text-yellow-700',
  awarded: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-600',
  reporting: 'bg-purple-100 text-purple-700',
  closed: 'bg-gray-200 text-gray-500',
}

const TYPE_LABELS: Record<string, string> = {
  grant: 'Grant',
  major_donor: 'Major Donor',
  institutional_partner: 'Institutional Partner',
  church_partner: 'Church Partner',
  individual_donor: 'Individual Donor',
  earned_revenue: 'Earned Revenue',
}

const BLANK_FORM = {
  funding_type: 'grant',
  status: 'prospect',
  source_name: '',
  source_contact: '',
  source_email: '',
  amount_requested: '',
  amount_awarded: '',
  amount_deployed: '',
  applied_at: '',
  awarded_at: '',
  reporting_deadline: '',
  is_restricted: false,
  restriction_description: '',
  free_seats_funded: '',
  notes: '',
  proposal_url: '',
  report_url: '',
}

const fmt = (n: number | null | undefined) =>
  n != null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n) : '—'

export default function FundingPage() {
  const [records, setRecords] = useState<FundingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selected, setSelected] = useState<FundingRecord | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK_FORM)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    if (typeFilter) params.set('type', typeFilter)
    const res = await fetch(`/api/founder/funding?${params}`)
    const json = await res.json()
    setRecords(json.data ?? [])
    setLoading(false)
  }, [statusFilter, typeFilter])

  useEffect(() => { load() }, [load])

  // Summaries
  const totalAwarded = records.filter(r => ['awarded', 'reporting', 'closed'].includes(r.status)).reduce((sum, r) => sum + (r.amount_awarded ?? 0), 0)
  const totalDeployed = records.reduce((sum, r) => sum + (r.amount_deployed ?? 0), 0)
  const totalFreeSeats = records.reduce((sum, r) => sum + (r.free_seats_funded ?? 0), 0)

  const openCreate = () => {
    setEditId(null)
    setForm(BLANK_FORM)
    setSelected(null)
    setShowForm(true)
  }

  const openEdit = (r: FundingRecord) => {
    setEditId(r.id)
    setForm({
      funding_type: r.funding_type,
      status: r.status,
      source_name: r.source_name,
      source_contact: r.source_contact ?? '',
      source_email: r.source_email ?? '',
      amount_requested: r.amount_requested != null ? String(r.amount_requested) : '',
      amount_awarded: r.amount_awarded != null ? String(r.amount_awarded) : '',
      amount_deployed: r.amount_deployed != null ? String(r.amount_deployed) : '',
      applied_at: r.applied_at ?? '',
      awarded_at: r.awarded_at ?? '',
      reporting_deadline: r.reporting_deadline ?? '',
      is_restricted: r.is_restricted,
      restriction_description: r.restriction_description ?? '',
      free_seats_funded: String(r.free_seats_funded),
      notes: r.notes ?? '',
      proposal_url: r.proposal_url ?? '',
      report_url: r.report_url ?? '',
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.source_name.trim()) return
    setSaving(true)

    const payload = {
      funding_type: form.funding_type,
      status: form.status,
      source_name: form.source_name,
      source_contact: form.source_contact || undefined,
      source_email: form.source_email || undefined,
      amount_requested: form.amount_requested ? Number(form.amount_requested) : undefined,
      amount_awarded: form.amount_awarded ? Number(form.amount_awarded) : undefined,
      amount_deployed: form.amount_deployed ? Number(form.amount_deployed) : 0,
      applied_at: form.applied_at || undefined,
      awarded_at: form.awarded_at || undefined,
      reporting_deadline: form.reporting_deadline || undefined,
      is_restricted: form.is_restricted,
      restriction_description: form.restriction_description || undefined,
      free_seats_funded: form.free_seats_funded ? Number(form.free_seats_funded) : 0,
      notes: form.notes || undefined,
      proposal_url: form.proposal_url || undefined,
      report_url: form.report_url || undefined,
    }

    const res = editId
      ? await fetch('/api/founder/funding', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...payload }) })
      : await fetch('/api/founder/funding', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

    setSaving(false)
    if (res.ok) {
      setShowForm(false)
      setEditId(null)
      load()
    }
  }

  const f = (key: keyof typeof BLANK_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-overline mb-1">Funding &amp; Development</p>
          <h1 className="text-2xl font-semibold">Funding Records</h1>
        </div>
        <button onClick={openCreate} className="bp-btn bp-btn-primary text-sm px-4 py-2">+ Add Record</button>
      </div>

      {/* Funding totals */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[var(--bp-dark)] rounded-xl p-5 text-white">
          <p className="text-xs text-[var(--bp-gold-light)] mb-1">Total awarded</p>
          <p className="text-2xl font-semibold text-[var(--bp-gold)]">{fmt(totalAwarded)}</p>
        </div>
        <div className="bp-card p-5">
          <p className="text-xs text-[var(--bp-muted)] mb-1">Total deployed</p>
          <p className="text-2xl font-semibold text-[var(--bp-brown-deep)]">{fmt(totalDeployed)}</p>
        </div>
        <div className="bp-card p-5">
          <p className="text-xs text-[var(--bp-muted)] mb-1">Free seats funded</p>
          <p className="text-2xl font-semibold text-[var(--bp-brown-deep)]">{totalFreeSeats}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select className="bp-input text-sm max-w-[160px]" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select className="bp-input text-sm max-w-[200px]" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">All types</option>
          {FUNDING_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
        </select>
      </div>

      {/* Main content */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Records list */}
        <div className="space-y-2">
          {loading ? (
            <p className="text-sm text-[var(--bp-muted)]">Loading...</p>
          ) : records.length === 0 ? (
            <div className="text-center py-12 text-[var(--bp-muted)] text-sm">
              No funding records yet.
              <br />
              <button onClick={openCreate} className="text-[var(--bp-brown)] hover:underline mt-1">Add the first one →</button>
            </div>
          ) : (
            records.map(r => (
              <button
                key={r.id}
                onClick={() => { setSelected(r); setShowForm(false) }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === r.id ? 'border-[var(--bp-gold)] bg-[var(--bp-cream)]' : 'border-[var(--bp-warm)] bg-white hover:border-[var(--bp-sand)]'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{r.source_name}</p>
                    <p className="text-xs text-[var(--bp-muted)]">{TYPE_LABELS[r.funding_type] ?? r.funding_type}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[r.status] ?? ''}`}>
                    {r.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-[var(--bp-muted)]">
                  {r.amount_awarded != null && <span>Awarded: {fmt(r.amount_awarded)}</span>}
                  {r.free_seats_funded > 0 && <span>{r.free_seats_funded} free seats</span>}
                  {r.reporting_deadline && <span>Due: {new Date(r.reporting_deadline).toLocaleDateString()}</span>}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail / Form */}
        <div>
          {showForm ? (
            <div className="bp-card p-6 space-y-4 max-h-[700px] overflow-y-auto">
              <h2 className="font-semibold">{editId ? 'Edit Record' : 'New Funding Record'}</h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="bp-label">Type *</label>
                  <select className="bp-input" value={form.funding_type} onChange={f('funding_type')}>
                    {FUNDING_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="bp-label">Status</label>
                  <select className="bp-input" value={form.status} onChange={f('status')}>
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="bp-label">Source Name *</label>
                <input className="bp-input" value={form.source_name} onChange={f('source_name')} placeholder="Foundation or donor name" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="bp-label">Contact</label>
                  <input className="bp-input" value={form.source_contact} onChange={f('source_contact')} placeholder="Name" />
                </div>
                <div>
                  <label className="bp-label">Email</label>
                  <input className="bp-input" type="email" value={form.source_email} onChange={f('source_email')} placeholder="email@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="bp-label">Requested ($)</label>
                  <input className="bp-input" type="number" value={form.amount_requested} onChange={f('amount_requested')} placeholder="0" />
                </div>
                <div>
                  <label className="bp-label">Awarded ($)</label>
                  <input className="bp-input" type="number" value={form.amount_awarded} onChange={f('amount_awarded')} placeholder="0" />
                </div>
                <div>
                  <label className="bp-label">Deployed ($)</label>
                  <input className="bp-input" type="number" value={form.amount_deployed} onChange={f('amount_deployed')} placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="bp-label">Applied</label>
                  <input className="bp-input" type="date" value={form.applied_at} onChange={f('applied_at')} />
                </div>
                <div>
                  <label className="bp-label">Awarded</label>
                  <input className="bp-input" type="date" value={form.awarded_at} onChange={f('awarded_at')} />
                </div>
                <div>
                  <label className="bp-label">Report due</label>
                  <input className="bp-input" type="date" value={form.reporting_deadline} onChange={f('reporting_deadline')} />
                </div>
              </div>

              <div>
                <label className="bp-label">Free seats funded</label>
                <input className="bp-input" type="number" value={form.free_seats_funded} onChange={f('free_seats_funded')} placeholder="0" />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="restricted"
                  checked={form.is_restricted}
                  onChange={e => setForm(prev => ({ ...prev, is_restricted: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="restricted" className="text-sm">Restricted funds</label>
              </div>

              {form.is_restricted && (
                <div>
                  <label className="bp-label">Restriction description</label>
                  <input className="bp-input" value={form.restriction_description} onChange={f('restriction_description')} placeholder="Describe the restriction..." />
                </div>
              )}

              <div>
                <label className="bp-label">Notes</label>
                <textarea className="bp-input min-h-[80px]" value={form.notes} onChange={f('notes')} placeholder="Relationship notes, follow-up..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="bp-label">Proposal URL</label>
                  <input className="bp-input" type="url" value={form.proposal_url} onChange={f('proposal_url')} placeholder="https://..." />
                </div>
                <div>
                  <label className="bp-label">Report URL</label>
                  <input className="bp-input" type="url" value={form.report_url} onChange={f('report_url')} placeholder="https://..." />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving || !form.source_name.trim()} className="bp-btn bp-btn-primary text-sm px-5 py-2 disabled:opacity-50">
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
                <button onClick={() => setShowForm(false)} className="bp-btn bp-btn-secondary text-sm px-4 py-2">Cancel</button>
              </div>
            </div>
          ) : selected ? (
            <div className="bp-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-[var(--bp-muted)]">{TYPE_LABELS[selected.funding_type]}</span>
                  <h2 className="text-xl font-semibold mt-0.5">{selected.source_name}</h2>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selected.status] ?? ''}`}>
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div><p className="text-xs text-[var(--bp-muted)]">Requested</p><p className="font-medium">{fmt(selected.amount_requested)}</p></div>
                <div><p className="text-xs text-[var(--bp-muted)]">Awarded</p><p className="font-medium">{fmt(selected.amount_awarded)}</p></div>
                <div><p className="text-xs text-[var(--bp-muted)]">Deployed</p><p className="font-medium">{fmt(selected.amount_deployed)}</p></div>
                <div><p className="text-xs text-[var(--bp-muted)]">Free seats</p><p className="font-medium">{selected.free_seats_funded}</p></div>
              </div>

              {selected.reporting_deadline && (
                <div className="mb-4 p-3 bg-[var(--bp-cream)] border border-[var(--bp-sand)] rounded-lg text-sm">
                  <p className="text-xs text-[var(--bp-brown)] font-medium">Report due</p>
                  <p className="text-[var(--bp-brown-deep)]">{new Date(selected.reporting_deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              )}

              {selected.notes && (
                <div className="mb-4">
                  <p className="text-xs text-[var(--bp-muted)] mb-1">Notes</p>
                  <p className="text-sm whitespace-pre-wrap">{selected.notes}</p>
                </div>
              )}

              {selected.is_restricted && selected.restriction_description && (
                <div className="mb-4 text-sm">
                  <p className="text-xs text-red-500 font-medium mb-0.5">Restricted funds</p>
                  <p>{selected.restriction_description}</p>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                {selected.proposal_url && (
                  <a href={selected.proposal_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--bp-brown)] hover:underline">Proposal →</a>
                )}
                {selected.report_url && (
                  <a href={selected.report_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--bp-brown)] hover:underline">Report →</a>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(selected)} className="bp-btn bp-btn-secondary text-sm px-4 py-2">Edit</button>
              </div>
            </div>
          ) : (
            <div className="bp-card p-6 flex items-center justify-center min-h-[200px] text-[var(--bp-muted)] text-sm">
              Select a record to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
