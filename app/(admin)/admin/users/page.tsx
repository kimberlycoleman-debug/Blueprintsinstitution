'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

interface User {
  id: string
  full_name: string | null
  email: string
  role: string
  is_active: boolean
  enrollment_date: string | null
  created_at: string
}

const ROLE_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Students', value: 'student' },
  { label: 'Facilitators', value: 'facilitator' },
  { label: 'Admins', value: 'admin' },
  { label: 'Founder', value: 'founder' },
]

const ROLE_STYLE: Record<string, string> = {
  student: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]',
  facilitator: 'bg-blue-50 text-blue-700',
  admin: 'bg-[var(--bp-brown-deep)] text-white',
  founder: 'bg-[var(--bp-gold)] text-[var(--bp-dark)]',
}

export default function UsersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleFilter = searchParams.get('role') ?? ''

  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (roleFilter) params.set('role', roleFilter)
    if (search) params.set('search', search)
    const { data, total: t } = await fetch(`/api/admin/users?${params}`).then((r) => r.json())
    setUsers(data ?? [])
    setTotal(t ?? 0)
    setLoading(false)
  }, [roleFilter, search])

  useEffect(() => {
    const timer = setTimeout(() => loadUsers(), 300)
    return () => clearTimeout(timer)
  }, [loadUsers])

  const updateUser = async (id: string, update: { role?: string; is_active?: boolean }) => {
    setSaving(id)
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...update }),
    })
    if (res.ok) {
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, ...update } : u))
      setSavedId(id)
      setTimeout(() => setSavedId(null), 2000)
    }
    setSaving(null)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <div className="mb-1">
          <Link href="/admin" className="text-sm text-[var(--bp-muted)] hover:text-[var(--bp-text)]">← Dashboard</Link>
        </div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-[var(--bp-muted)] text-sm mt-0.5">{total} total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2">
          {ROLE_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => router.push(`/admin/users${value ? `?role=${value}` : ''}`)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                roleFilter === value
                  ? 'bg-[var(--bp-brown-deep)] text-white border-[var(--bp-brown-deep)]'
                  : 'bg-white text-[var(--bp-muted)] border-[var(--bp-warm)] hover:border-[var(--bp-brown)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email…"
          className="bp-input text-sm sm:ml-auto w-full sm:w-64"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-sm text-[var(--bp-muted)] py-8 text-center">Loading…</div>
      ) : users.length === 0 ? (
        <div className="bp-card p-8 text-center text-[var(--bp-muted)] text-sm">No users found.</div>
      ) : (
        <div className="bp-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--bp-warm)] bg-[var(--bp-cream)]">
                <th className="text-left text-xs text-[var(--bp-muted)] font-medium px-4 py-3">Name</th>
                <th className="text-left text-xs text-[var(--bp-muted)] font-medium px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-left text-xs text-[var(--bp-muted)] font-medium px-4 py-3">Role</th>
                <th className="text-left text-xs text-[var(--bp-muted)] font-medium px-4 py-3 hidden sm:table-cell">Joined</th>
                <th className="text-left text-xs text-[var(--bp-muted)] font-medium px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id} className={`border-b border-[var(--bp-warm)] last:border-0 ${i % 2 === 0 ? '' : 'bg-[var(--bp-white)]'}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{user.full_name ?? '—'}</p>
                    <p className="text-xs text-[var(--bp-muted)] md:hidden">{user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[var(--bp-muted)] hidden md:table-cell">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => updateUser(user.id, { role: e.target.value })}
                      disabled={saving === user.id}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer disabled:opacity-50 ${ROLE_STYLE[user.role] ?? 'bg-gray-100'}`}
                    >
                      <option value="student">student</option>
                      <option value="facilitator">facilitator</option>
                      <option value="admin">admin</option>
                      <option value="founder">founder</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-[var(--bp-muted)] hidden sm:table-cell">
                    {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => updateUser(user.id, { is_active: !user.is_active })}
                      disabled={saving === user.id}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors disabled:opacity-50 ${
                        user.is_active
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                          : 'bg-red-50 text-red-600 border-red-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200'
                      }`}
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {savedId === user.id
                      ? <span className="text-xs text-green-600">Saved ✓</span>
                      : saving === user.id
                      ? <span className="text-xs text-[var(--bp-muted)]">…</span>
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
