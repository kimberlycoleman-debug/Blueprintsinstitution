import Link from 'next/link'
import { getFounderProfile, logFounderAction } from '@/lib/founder/protection'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

export default async function FounderCommandCenter() {
  await logFounderAction('founder_dashboard_view')

  const [profile, metricsRes, auditRes] = await Promise.all([
    getFounderProfile(),
    createAdminSupabaseClient()
      .rpc('compute_institute_metrics')
      .then(() =>
        createAdminSupabaseClient()
          .from('institutional_metrics')
          .select('*')
          .order('snapshot_date', { ascending: false })
          .limit(1)
          .single()
      ),
    createAdminSupabaseClient()
      .from('founder_audit_log')
      .select('id, action, resource_label, resource_type, occurred_at')
      .order('occurred_at', { ascending: false })
      .limit(6),
  ])

  const metrics = metricsRes.data
  const auditEvents = auditRes.data ?? []

  const m = metrics ?? {}

  const vitals = [
    { label: 'Students served (all-time)', value: m.total_students_served_alltime ?? 0, href: '/admin/users?role=student' },
    { label: 'Active students', value: m.active_students_now ?? 0, href: '/admin/cohorts' },
    { label: 'Active cohorts', value: m.active_cohorts_now ?? 0, href: '/admin/cohorts' },
    { label: 'Graduates', value: m.total_graduates ?? 0, href: '/founder/analytics' },
    { label: 'Identity Blueprints', value: m.total_identity_blueprints ?? 0, href: '/founder/analytics' },
    { label: 'Purpose Statements', value: m.total_purpose_statements ?? 0, href: '/founder/analytics' },
    { label: 'Ministry Plans', value: m.total_ministry_plans ?? 0, href: '/founder/analytics' },
    { label: 'Free seats funded', value: m.free_seats_funded ?? 0, href: '/founder/funding' },
  ]

  const ACTION_LABELS: Record<string, string> = {
    founder_dashboard_view: 'Viewed Command Center',
    founder_analytics_view: 'Viewed Analytics',
    vault_view: 'Accessed Vault',
    vault_create: 'Created Vault Item',
    vault_update: 'Updated Vault Item',
    vault_delete: 'Archived Vault Item',
    registry_access: 'Registry Access',
    grant_report_generate: 'Funding Record Updated',
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Founder identity header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest text-amber-600 uppercase font-semibold mb-1">
            Founding Architect · Sovereign Access
          </p>
          <h1 className="text-3xl font-semibold">
            Welcome, {profile?.full_name?.split(' ')[0] ?? 'Kimberly'}.
          </h1>
          <p className="text-[var(--bp-muted)] mt-1 italic text-sm">
            "{profile?.founding_scripture ?? 'Ephesians 2:10'}" · "{profile?.founding_mandate ?? 'Matthew 28:19-20'}"
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-[var(--bp-muted)]">Last accessed</p>
          <p className="text-sm font-medium">
            {profile?.last_accessed_at
              ? new Date(profile.last_accessed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'First access'}
          </p>
          <p className="text-xs text-[var(--bp-muted)] mt-0.5">{profile?.access_count ?? 0} total accesses</p>
        </div>
      </div>

      {/* Institute vitals */}
      <div>
        <h2 className="text-xs tracking-widest text-[var(--bp-muted)] uppercase font-semibold mb-4">
          Institute Vitals — Live Snapshot
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vitals.map(({ label, value, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-[var(--bp-cream)] border border-[var(--bp-warm)] rounded-xl p-5 hover:border-amber-400 transition-colors"
            >
              <p className="text-xs text-[var(--bp-muted)] mb-1">{label}</p>
              <p className="text-3xl font-semibold text-[var(--bp-brown-deep)]">{value}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Transformation Index highlight */}
      {metrics && (
        <div className="bg-[#1a120b] rounded-2xl p-6 text-white">
          <p className="text-xs tracking-widest text-amber-400 uppercase font-semibold mb-3">
            Transformation Index™ — The Founding Distinctive
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Avg index (all-time)', value: metrics.avg_transformation_index_alltime ?? '—' },
              { label: 'Avg gain per graduate', value: metrics.avg_index_gain_per_graduate ?? '—' },
              { label: 'Retention rate', value: metrics.overall_retention_rate != null ? `${metrics.overall_retention_rate}%` : '—' },
              { label: 'Attendance avg', value: metrics.avg_attendance_rate_allcohorts != null ? `${metrics.avg_attendance_rate_allcohorts}%` : '—' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-amber-200 mb-1">{label}</p>
                <p className="text-2xl font-semibold text-amber-400">{String(value)}</p>
              </div>
            ))}
          </div>
          <Link href="/founder/analytics" className="inline-block mt-4 text-xs text-amber-300 hover:text-amber-100">
            Full analytics →
          </Link>
        </div>
      )}

      {/* Quick actions + recent audit */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-4">Sovereign Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/founder/vault', label: 'Open Vault', desc: 'Legal, financial, strategic documents' },
              { href: '/founder/analytics', label: 'View Analytics', desc: 'Transformation Index, cohort outcomes' },
              { href: '/founder/funding', label: 'Funding Records', desc: 'Grants, donors, free-seat tracking' },
              { href: '/admin', label: 'Admin Dashboard', desc: 'Applications, cohorts, users' },
              { href: '/founder/audit', label: 'Audit Log', desc: 'Every privileged action, immutable record' },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bp-cream)] transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium group-hover:text-[var(--bp-brown-deep)]">{label}</p>
                  <p className="text-xs text-[var(--bp-muted)]">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent audit */}
        <div className="bp-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Activity</h2>
            <Link href="/founder/audit" className="text-xs text-[var(--bp-brown)] hover:underline">View all →</Link>
          </div>
          {auditEvents.length === 0 ? (
            <p className="text-sm text-[var(--bp-muted)]">No activity recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {auditEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm">{ACTION_LABELS[event.action] ?? event.action}</p>
                    {event.resource_label && (
                      <p className="text-xs text-[var(--bp-muted)] truncate">{event.resource_label}</p>
                    )}
                  </div>
                  <p className="text-xs text-[var(--bp-muted)] flex-shrink-0">
                    {new Date(event.occurred_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
