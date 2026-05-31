import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  if (profile.role !== 'admin') redirect('/dashboard')

  const supabase = await createServerSupabaseClient()

  // Parallel stat queries
  const [
    { count: totalStudents },
    { count: pendingApplications },
    { count: activeCohorts },
    { count: totalFacilitators },
    { data: recentApps },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('applications').select('*', { count: 'exact', head: true }).in('status', ['submitted', 'under_review']),
    supabase.from('cohorts').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'facilitator'),
    supabase.from('applications')
      .select('id, application_number, full_name, email, status, submitted_at')
      .in('status', ['submitted', 'under_review'])
      .order('submitted_at', { ascending: false })
      .limit(5),
  ])

  const stats = [
    { label: 'Total students', value: totalStudents ?? 0, href: '/admin/users?role=student', color: 'text-[var(--bp-brown-deep)]' },
    { label: 'Pending applications', value: pendingApplications ?? 0, href: '/admin/applications', color: 'text-[var(--bp-brown)]' },
    { label: 'Active cohorts', value: activeCohorts ?? 0, href: '/admin/cohorts', color: 'text-green-700' },
    { label: 'Facilitators', value: totalFacilitators ?? 0, href: '/admin/users?role=facilitator', color: 'text-[var(--bp-brown)]' },
  ]

  const STATUS_STYLE: Record<string, string> = {
    submitted: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]',
    under_review: 'bg-blue-50 text-blue-700',
    approved: 'bg-green-50 text-green-700',
    declined: 'bg-red-50 text-red-700',
    waitlisted: 'bg-gray-50 text-gray-600',
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <div className="text-overline mb-1">
          Admin Dashboard
        </div>
        <h1 className="text-3xl font-semibold">Institute Overview</h1>
        <p className="text-[var(--bp-muted)] mt-1">Manage applications, cohorts, and users.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, href, color }) => (
          <Link key={label} href={href} className="bp-card p-5 hover:border-[var(--bp-brown)] transition-colors">
            <p className="text-xs text-[var(--bp-muted)]">{label}</p>
            <p className={`text-3xl font-semibold mt-1 ${color}`}>{value}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending applications */}
        <div className="bp-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Pending Applications</h2>
            <Link href="/admin/applications" className="text-xs text-[var(--bp-brown)] hover:underline">
              View all →
            </Link>
          </div>
          {!recentApps || recentApps.length === 0 ? (
            <p className="text-sm text-[var(--bp-muted)]">No pending applications.</p>
          ) : (
            <div className="space-y-3">
              {recentApps.map((app) => (
                <Link
                  key={app.id}
                  href={`/admin/applications/${app.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--bp-cream)] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{app.full_name}</p>
                    <p className="text-xs text-[var(--bp-muted)]">{app.application_number}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-3 flex-shrink-0 ${STATUS_STYLE[app.status] ?? 'bg-gray-50 text-gray-600'}`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/applications', label: 'Review applications', desc: 'Approve, decline, or schedule interviews' },
              { href: '/admin/cohorts/new', label: 'Create new cohort', desc: 'Set up a new formation cohort' },
              { href: '/admin/users', label: 'Manage users', desc: 'View students, facilitators, and admins' },
              { href: '/admin/cohorts', label: 'View cohorts', desc: 'Manage active and upcoming cohorts' },
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
      </div>
    </div>
  )
}
