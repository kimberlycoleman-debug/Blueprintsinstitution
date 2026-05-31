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
          <div className="text-overline mb-3" style={{ color: 'var(--bp-gold)' }}>
            Founding Architect · Sovereign Access
          </div>
          <h1 className="font-display font-light text-[var(--bp-dark)]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
            Welcome, {profile?.full_name?.split(' ')[0] ?? 'Kimberly'}.
          </h1>
          <p className="text-[var(--bp-muted)] mt-2 italic text-sm font-display">
            &ldquo;{profile?.founding_scripture ?? 'Ephesians 2:10'}&rdquo; &middot; &ldquo;{profile?.founding_mandate ?? 'Matthew 28:19-20'}&rdquo;
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[0.6875rem] text-[var(--bp-muted)] tracking-widest uppercase font-bold">Last accessed</p>
          <p className="text-sm font-medium mt-1">
            {profile?.last_accessed_at
              ? new Date(profile.last_accessed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'First access'}
          </p>
          <p className="text-xs text-[var(--bp-muted)] mt-0.5">{profile?.access_count ?? 0} total accesses</p>
        </div>
      </div>

      {/* Institute vitals */}
      <div>
        <div className="text-overline mb-5">Institute Vitals — Live Snapshot</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {vitals.map(({ label, value, href }) => (
            <Link
              key={label}
              href={href}
              className="bp-card bp-card-warm bp-card-interactive block"
              style={{ padding: '1.75rem 1.75rem 2rem' }}
            >
              <span className="block text-xs font-semibold tracking-widest uppercase text-[var(--bp-muted)] mb-4 leading-snug">{label}</span>
              <span className="block font-display font-light" style={{ fontSize: '3.5rem', lineHeight: 1, color: 'var(--bp-brown-deep)' }}>{value}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Transformation Index highlight */}
      {metrics && (
        <div className="bp-dark-section rounded-2xl p-8">
          <div className="text-overline mb-5" style={{ color: 'var(--bp-gold)' }}>
            Transformation Index™ — The Founding Distinctive
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Avg index (all-time)', value: metrics.avg_transformation_index_alltime ?? '—' },
              { label: 'Avg gain per graduate', value: metrics.avg_index_gain_per_graduate ?? '—' },
              { label: 'Retention rate', value: metrics.overall_retention_rate != null ? `${metrics.overall_retention_rate}%` : '—' },
              { label: 'Attendance avg', value: metrics.avg_attendance_rate_allcohorts != null ? `${metrics.avg_attendance_rate_allcohorts}%` : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="relative z-10">
                <p className="text-xs mb-2" style={{ color: 'rgba(240,217,181,0.65)' }}>{label}</p>
                <p className="font-display font-light" style={{ fontSize: '2rem', lineHeight: 1, color: 'var(--bp-gold)' }}>{String(value)}</p>
              </div>
            ))}
          </div>
          <Link href="/founder/analytics" className="inline-block mt-6 text-xs font-semibold tracking-wide transition-colors" style={{ color: 'rgba(240,217,181,0.65)' }}>
            Full analytics →
          </Link>
        </div>
      )}

      {/* Quick actions + recent audit */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bp-card p-6">
          <div className="text-overline mb-5">Sovereign Actions</div>
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
            <div className="text-overline">Recent Activity</div>
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
