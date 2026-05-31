'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Cohort {
  id: string
  cohort_name: string
  cohort_code: string
  start_date: string
  end_date: string
  status: string
  max_students: number
  notes: string | null
  cohort_students: { id: string; status: string }[]
  cohort_facilitators: {
    role: string
    profiles: { id: string; full_name: string | null; email: string } | null
  }[]
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-50 text-green-700',
  upcoming: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]',
  completed: 'bg-[var(--bp-warm)] text-[var(--bp-brown)]',
  paused: 'bg-gray-100 text-gray-600',
}

interface NewCohortForm {
  cohort_name: string
  cohort_code: string
  start_date: string
  end_date: string
  status: string
  max_students: number
  notes: string
}

interface Facilitator {
  id: string
  full_name: string | null
  email: string
}

const EMPTY_FORM: NewCohortForm = {
  cohort_name: '',
  cohort_code: '',
  start_date: '',
  end_date: '',
  status: 'upcoming',
  max_students: 25,
  notes: '',
}

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([])
  const [facilitators, setFacilitators] = useState<Facilitator[]>([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState<NewCohortForm>(EMPTY_FORM)
  const [selectedFacilitators, setSelectedFacilitators] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState('')

  const loadCohorts = async () => {
    const { data } = await fetch('/api/admin/cohorts').then((r) => r.json())
    setCohorts(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadCohorts()
    fetch('/api/admin/cohorts/enroll')
      .then((r) => r.json())
      .then(({ data }) => setFacilitators(data ?? []))
  }, [])

  const handleCreate = async () => {
    if (!form.cohort_name || !form.cohort_code || !form.start_date || !form.end_date) {
      setError('Name, code, start date, and end date are required.')
      return
    }
    setSaving(true)
    setError('')
    const res = await fetch('/api/admin/cohorts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, facilitator_ids: selectedFacilitators }),
    })
    const json = await res.json()
    if (!res.ok) { setError(json.error ?? 'Failed to create cohort'); setSaving(false); return }
    setForm(EMPTY_FORM)
    setSelectedFacilitators([])
    setShowNew(false)
    loadCohorts()
    setSaving(false)
  }

  const patchStatus = async (id: string, status: string) => {
    await fetch('/api/admin/cohorts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setEditingId(null)
    loadCohorts()
  }

  const toggleFacilitator = (id: string) => {
    setSelectedFacilitators((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1">
            <Link href="/admin" className="text-sm text-[var(--bp-muted)] hover:text-[var(--bp-text)]">← Dashboard</Link>
          </div>
          <h1 className="text-2xl font-semibold">Cohorts</h1>
          <p className="text-[var(--bp-muted)] text-sm mt-0.5">{cohorts.length} total cohort{cohorts.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="bp-btn bp-btn-primary px-4 py-2 text-sm"
        >
          {showNew ? 'Cancel' : '+ New Cohort'}
        </button>
      </div>

      {/* New cohort form */}
      {showNew && (
        <div className="bp-card p-6 space-y-4">
          <h2 className="font-semibold">Create New Cohort</h2>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[var(--bp-text)]">Cohort name *</label>
              <input value={form.cohort_name} onChange={(e) => setForm((p) => ({ ...p, cohort_name: e.target.value }))}
                className="bp-input w-full" placeholder="e.g. Cohort Alpha 2026" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[var(--bp-text)]">Cohort code *</label>
              <input value={form.cohort_code} onChange={(e) => setForm((p) => ({ ...p, cohort_code: e.target.value.toUpperCase() }))}
                className="bp-input w-full" placeholder="e.g. ALPHA-2026" maxLength={20} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[var(--bp-text)]">Start date *</label>
              <input type="date" value={form.start_date} onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))}
                className="bp-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[var(--bp-text)]">End date *</label>
              <input type="date" value={form.end_date} onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))}
                className="bp-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[var(--bp-text)]">Max students</label>
              <input type="number" min={1} max={200} value={form.max_students}
                onChange={(e) => setForm((p) => ({ ...p, max_students: parseInt(e.target.value) || 25 }))}
                className="bp-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-[var(--bp-text)]">Status</label>
              <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className="bp-input w-full">
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-[var(--bp-text)]">Notes (optional)</label>
            <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              className="bp-input w-full h-16 resize-none" />
          </div>
          {facilitators.length > 0 && (
            <div>
              <label className="block text-xs font-medium mb-2 text-[var(--bp-muted)]">Assign facilitators (optional)</label>
              <div className="flex flex-wrap gap-2">
                {facilitators.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleFacilitator(f.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      selectedFacilitators.includes(f.id)
                        ? 'bg-[var(--bp-brown-deep)] text-white border-[var(--bp-brown-deep)]'
                        : 'bg-white text-[var(--bp-muted)] border-[var(--bp-warm)] hover:border-[var(--bp-brown)]'
                    }`}
                  >
                    {f.full_name ?? f.email}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <button onClick={handleCreate} disabled={saving}
              className="bp-btn bp-btn-primary px-5 py-2 disabled:opacity-50">
              {saving ? 'Creating…' : 'Create Cohort'}
            </button>
            <button onClick={() => { setShowNew(false); setError('') }} className="bp-btn bp-btn-ghost px-5 py-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cohorts list */}
      {loading ? (
        <div className="text-sm text-[var(--bp-muted)] py-8 text-center">Loading cohorts…</div>
      ) : cohorts.length === 0 ? (
        <div className="bp-card p-8 text-center text-[var(--bp-muted)] text-sm">No cohorts yet. Create the first one.</div>
      ) : (
        <div className="space-y-4">
          {cohorts.map((cohort) => {
            const activeStudents = cohort.cohort_students.filter((s) => s.status === 'active').length
            const leads = cohort.cohort_facilitators.filter((f) => f.role === 'lead')
            return (
              <div key={cohort.id} className="bp-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{cohort.cohort_name}</h3>
                      {editingId === cohort.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          onBlur={() => patchStatus(cohort.id, editStatus)}
                          autoFocus
                          className="text-xs bp-input py-0.5 px-2"
                        >
                          {['upcoming', 'active', 'paused', 'completed'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <button
                          onClick={() => { setEditingId(cohort.id); setEditStatus(cohort.status) }}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer ${STATUS_COLORS[cohort.status] ?? 'bg-gray-100 text-gray-600'}`}
                        >
                          {cohort.status}
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[var(--bp-muted)]">
                      {cohort.cohort_code} ·{' '}
                      {new Date(cohort.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} –{' '}
                      {new Date(cohort.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <Link href={`/facilitator/cohort/${cohort.id}`} className="bp-btn bp-btn-ghost text-xs px-3 py-1.5">
                    View →
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[var(--bp-warm)] text-sm">
                  <div>
                    <p className="text-xs text-[var(--bp-muted)]">Students</p>
                    <p className="font-medium">{activeStudents} / {cohort.max_students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--bp-muted)]">Lead facilitator</p>
                    <p className="font-medium truncate">
                      {leads[0]?.profiles?.full_name ?? leads[0]?.profiles?.email ?? '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--bp-muted)]">Capacity</p>
                    <div className="mt-1 h-1.5 bg-[var(--bp-warm)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--bp-brown)] rounded-full"
                        style={{ width: `${Math.min(100, Math.round((activeStudents / cohort.max_students) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
                {cohort.notes && (
                  <p className="text-xs text-[var(--bp-muted)] mt-3 italic">{cohort.notes}</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
