'use client'

import { useState, useEffect, useCallback } from 'react'

interface AuditEvent {
  id: string
  actor_email: string | null
  action: string
  resource_type: string | null
  resource_id: string | null
  resource_label: string | null
  detail: Record<string, unknown>
  occurred_at: string
}

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  founder_dashboard_view: { label: 'Dashboard viewed', color: 'bg-gray-100 text-gray-600' },
  founder_analytics_view: { label: 'Analytics viewed', color: 'bg-blue-100 text-blue-600' },
  vault_view: { label: 'Vault accessed', color: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]' },
  vault_create: { label: 'Vault item created', color: 'bg-green-100 text-green-700' },
  vault_update: { label: 'Vault item updated', color: 'bg-yellow-100 text-yellow-700' },
  vault_delete: { label: 'Vault item archived', color: 'bg-orange-100 text-orange-700' },
  registry_access: { label: 'Registry accessed', color: 'bg-purple-100 text-purple-700' },
  grant_report_generate: { label: 'Funding record', color: 'bg-teal-100 text-teal-700' },
  unauthorized_access_attempt: { label: '⚠ Unauthorized attempt', color: 'bg-red-100 text-red-700' },
  system_override: { label: 'System override', color: 'bg-red-100 text-red-700' },
  emergency_export: { label: 'Emergency export', color: 'bg-red-200 text-red-800' },
}

const ALL_ACTIONS = [
  'founder_dashboard_view', 'founder_analytics_view',
  'vault_view', 'vault_create', 'vault_update', 'vault_delete',
  'registry_access', 'grant_report_generate',
  'unauthorized_access_attempt', 'system_override', 'emergency_export',
]

export default function AuditLogPage() {
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [actionFilter, setActionFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (actionFilter) params.set('action', actionFilter)
    const res = await fetch(`/api/founder/audit?${params}`)
    const json = await res.json()
    setEvents(json.data ?? [])
    setTotal(json.total ?? 0)
    setLoading(false)
  }, [page, actionFilter])

  useEffect(() => { load() }, [load])

  const totalPages = Math.ceil(total / 50)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <p className="text-overline mb-1">Sovereign Audit</p>
        <h1 className="text-2xl font-semibold">Immutable Audit Log</h1>
        <p className="text-sm text-[var(--bp-muted)] mt-1">
          Every privileged action is recorded and cannot be edited or deleted. {total} total events.
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-3 items-center">
        <label className="text-sm text-[var(--bp-muted)]">Filter by action:</label>
        <select
          className="bp-input max-w-xs text-sm"
          value={actionFilter}
          onChange={e => { setActionFilter(e.target.value); setPage(1) }}
        >
          <option value="">All actions</option>
          {ALL_ACTIONS.map(a => (
            <option key={a} value={a}>{ACTION_LABELS[a]?.label ?? a}</option>
          ))}
        </select>
      </div>

      {/* Log */}
      {loading ? (
        <p className="text-sm text-[var(--bp-muted)]">Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-[var(--bp-muted)] py-8 text-center">No audit events recorded yet.</p>
      ) : (
        <div className="space-y-1">
          {events.map(event => {
            const info = ACTION_LABELS[event.action] ?? { label: event.action, color: 'bg-gray-100 text-gray-600' }
            const isExpanded = expandedId === event.id
            const hasDetail = event.detail && Object.keys(event.detail).length > 0

            return (
              <div
                key={event.id}
                className="border border-[var(--bp-warm)] rounded-lg bg-white overflow-hidden"
              >
                <div
                  className={`flex items-start gap-3 p-3 ${hasDetail ? 'cursor-pointer hover:bg-[var(--bp-cream)]' : ''}`}
                  onClick={() => hasDetail && setExpandedId(isExpanded ? null : event.id)}
                >
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap mt-0.5 ${info.color}`}>
                    {info.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    {event.resource_label && (
                      <p className="text-sm text-[var(--bp-brown)] truncate">{event.resource_label}</p>
                    )}
                    <p className="text-xs text-[var(--bp-muted)]">
                      {event.actor_email ?? 'system'}
                      {event.resource_type && ` · ${event.resource_type}`}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[var(--bp-muted)]">
                      {new Date(event.occurred_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-[var(--bp-muted)]">
                      {new Date(event.occurred_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                  {hasDetail && (
                    <span className="text-[var(--bp-muted)] text-xs mt-1">{isExpanded ? '▲' : '▼'}</span>
                  )}
                </div>
                {isExpanded && hasDetail && (
                  <div className="border-t border-[var(--bp-warm)] bg-[var(--bp-cream)] px-4 py-3">
                    <pre className="text-xs text-[var(--bp-brown)] overflow-x-auto">
                      {JSON.stringify(event.detail, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="bp-btn bp-btn-secondary text-sm px-4 py-2 disabled:opacity-40"
          >
            ← Previous
          </button>
          <p className="text-sm text-[var(--bp-muted)]">Page {page} of {totalPages}</p>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
            className="bp-btn bp-btn-secondary text-sm px-4 py-2 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
