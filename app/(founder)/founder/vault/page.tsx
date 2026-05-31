'use client'

import { useState, useEffect, useCallback } from 'react'

type VaultCategory =
  | 'legal' | 'financial' | 'curriculum' | 'grants' | 'partnerships'
  | 'operations' | 'communications' | 'personnel' | 'strategic' | 'confidential'

type VaultVisibility = 'founder_only' | 'admin_visible' | 'board_visible'

interface VaultItem {
  id: string
  category: VaultCategory
  title: string
  description: string | null
  visibility: VaultVisibility
  content: string | null
  external_url: string | null
  tags: string[]
  is_archived: boolean
  version: number
  created_at: string
  updated_at: string
}

const CATEGORIES: { value: VaultCategory; label: string; color: string }[] = [
  { value: 'legal', label: 'Legal', color: 'bg-red-100 text-red-700' },
  { value: 'financial', label: 'Financial', color: 'bg-green-100 text-green-700' },
  { value: 'curriculum', label: 'Curriculum', color: 'bg-blue-100 text-blue-700' },
  { value: 'grants', label: 'Grants', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'partnerships', label: 'Partnerships', color: 'bg-purple-100 text-purple-700' },
  { value: 'operations', label: 'Operations', color: 'bg-orange-100 text-orange-700' },
  { value: 'communications', label: 'Communications', color: 'bg-pink-100 text-pink-700' },
  { value: 'personnel', label: 'Personnel', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'strategic', label: 'Strategic', color: 'bg-teal-100 text-teal-700' },
  { value: 'confidential', label: 'Confidential', color: 'bg-gray-100 text-gray-700' },
]

const VISIBILITY_LABELS: Record<VaultVisibility, { label: string; color: string }> = {
  founder_only: { label: 'Founder Only', color: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]' },
  admin_visible: { label: 'Admin Visible', color: 'bg-blue-100 text-blue-700' },
  board_visible: { label: 'Board Visible', color: 'bg-green-100 text-green-700' },
}

const BLANK_FORM = {
  category: 'strategic' as VaultCategory,
  title: '',
  description: '',
  visibility: 'founder_only' as VaultVisibility,
  content: '',
  external_url: '',
  tags: [] as string[],
}

export default function VaultPage() {
  const [activeCategory, setActiveCategory] = useState<VaultCategory | 'all'>('all')
  const [items, setItems] = useState<VaultItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<VaultItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(BLANK_FORM)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const loadItems = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (activeCategory !== 'all') params.set('category', activeCategory)
    const res = await fetch(`/api/founder/vault?${params}`)
    const json = await res.json()
    setItems(json.data ?? [])
    setLoading(false)
  }, [activeCategory])

  useEffect(() => { loadItems() }, [loadItems])

  const openCreate = () => {
    setEditId(null)
    setForm({ ...BLANK_FORM, category: activeCategory === 'all' ? 'strategic' : activeCategory })
    setSelected(null)
    setShowForm(true)
  }

  const openEdit = (item: VaultItem) => {
    setEditId(item.id)
    setForm({
      category: item.category,
      title: item.title,
      description: item.description ?? '',
      visibility: item.visibility,
      content: item.content ?? '',
      external_url: item.external_url ?? '',
      tags: item.tags,
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    const payload = { ...form, description: form.description || undefined, content: form.content || undefined, external_url: form.external_url || undefined }

    const res = editId
      ? await fetch('/api/founder/vault', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...payload }) })
      : await fetch('/api/founder/vault', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

    setSaving(false)
    if (res.ok) {
      setShowForm(false)
      setEditId(null)
      setForm(BLANK_FORM)
      loadItems()
    }
  }

  const handleArchive = async (id: string) => {
    if (!confirm('Archive this vault item?')) return
    await fetch(`/api/founder/vault?id=${id}`, { method: 'DELETE' })
    setSelected(null)
    loadItems()
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] }))
    setTagInput('')
  }

  const catInfo = (cat: VaultCategory) => CATEGORIES.find(c => c.value === cat)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-overline mb-1">Sovereign Vault</p>
          <h1 className="text-2xl font-semibold">Document &amp; Asset Store</h1>
        </div>
        <button onClick={openCreate} className="bp-btn-primary text-sm px-4 py-2">
          + Add Item
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-[var(--bp-brown-deep)] text-white' : 'bg-[var(--bp-cream)] text-[var(--bp-brown)] hover:bg-[var(--bp-cream)]'}`}
        >
          All ({items.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = items.filter(i => i.category === cat.value).length
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.value ? 'bg-[var(--bp-brown-deep)] text-white' : 'bg-[var(--bp-cream)] text-[var(--bp-brown)] hover:bg-[var(--bp-cream)]'}`}
            >
              {cat.label} {count > 0 && `(${count})`}
            </button>
          )
        })}
      </div>

      {/* Split pane */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-2">
          {loading ? (
            <p className="text-sm text-[var(--bp-muted)]">Loading...</p>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-[var(--bp-muted)] text-sm">
              No items in this category yet.
              <br />
              <button onClick={openCreate} className="text-[var(--bp-brown)] hover:underline mt-1">
                Add the first one →
              </button>
            </div>
          ) : (
            items.map(item => (
              <button
                key={item.id}
                onClick={() => { setSelected(item); setShowForm(false) }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === item.id ? 'border-[var(--bp-gold)] bg-[var(--bp-cream)]' : 'border-[var(--bp-warm)] bg-white hover:border-[var(--bp-sand)]'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-[var(--bp-muted)] mt-0.5 truncate">{item.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catInfo(item.category)?.color ?? ''}`}>
                      {catInfo(item.category)?.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${VISIBILITY_LABELS[item.visibility].color}`}>
                    {VISIBILITY_LABELS[item.visibility].label}
                  </span>
                  {item.tags.slice(0, 2).map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail / Form panel */}
        <div>
          {showForm ? (
            <div className="bp-card p-6 space-y-4">
              <h2 className="font-semibold">{editId ? 'Edit Item' : 'New Vault Item'}</h2>

              <div>
                <label className="bp-label">Category</label>
                <select className="bp-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as VaultCategory }))}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              <div>
                <label className="bp-label">Title *</label>
                <input className="bp-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Document title" />
              </div>

              <div>
                <label className="bp-label">Description</label>
                <input className="bp-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief summary" />
              </div>

              <div>
                <label className="bp-label">Visibility</label>
                <select className="bp-input" value={form.visibility} onChange={e => setForm(f => ({ ...f, visibility: e.target.value as VaultVisibility }))}>
                  <option value="founder_only">Founder Only</option>
                  <option value="admin_visible">Admin Visible</option>
                  <option value="board_visible">Board Visible</option>
                </select>
              </div>

              <div>
                <label className="bp-label">Content / Notes</label>
                <textarea className="bp-input min-h-[100px]" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Markdown or freetext body..." />
              </div>

              <div>
                <label className="bp-label">External URL</label>
                <input className="bp-input" type="url" value={form.external_url} onChange={e => setForm(f => ({ ...f, external_url: e.target.value }))} placeholder="https://drive.google.com/..." />
              </div>

              <div>
                <label className="bp-label">Tags</label>
                <div className="flex gap-2">
                  <input className="bp-input flex-1" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag + Enter" />
                  <button type="button" onClick={addTag} className="bp-btn-secondary text-sm px-3">Add</button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.tags.map(t => (
                      <span key={t} className="text-xs bg-[var(--bp-cream)] text-[var(--bp-brown)] px-2 py-0.5 rounded-full flex items-center gap-1">
                        {t}
                        <button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} className="hover:text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving || !form.title.trim()} className="bp-btn-primary text-sm px-5 py-2 disabled:opacity-50">
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
                <button onClick={() => setShowForm(false)} className="bp-btn-secondary text-sm px-4 py-2">Cancel</button>
              </div>
            </div>
          ) : selected ? (
            <div className="bp-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catInfo(selected.category)?.color ?? ''}`}>
                    {catInfo(selected.category)?.label}
                  </span>
                  <h2 className="text-xl font-semibold mt-2">{selected.title}</h2>
                  {selected.description && <p className="text-sm text-[var(--bp-muted)] mt-1">{selected.description}</p>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${VISIBILITY_LABELS[selected.visibility].color}`}>
                  {VISIBILITY_LABELS[selected.visibility].label}
                </span>
              </div>

              {selected.content && (
                <div className="bg-[var(--bp-cream)] rounded-lg p-4 text-sm whitespace-pre-wrap mb-4">
                  {selected.content}
                </div>
              )}

              {selected.external_url && (
                <a
                  href={selected.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--bp-brown)] hover:underline flex items-center gap-1 mb-4"
                >
                  Open external link →
                </a>
              )}

              {selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selected.tags.map(t => (
                    <span key={t} className="text-xs bg-[var(--bp-cream)] text-[var(--bp-brown)] px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              )}

              <p className="text-xs text-[var(--bp-muted)] mb-4">
                v{selected.version} · Updated {new Date(selected.updated_at).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button onClick={() => openEdit(selected)} className="bp-btn-secondary text-sm px-4 py-2">Edit</button>
                <button onClick={() => handleArchive(selected.id)} className="text-sm text-red-500 hover:text-red-700 px-3 py-2">Archive</button>
              </div>
            </div>
          ) : (
            <div className="bp-card p-6 flex items-center justify-center min-h-[200px] text-[var(--bp-muted)] text-sm">
              Select an item to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
