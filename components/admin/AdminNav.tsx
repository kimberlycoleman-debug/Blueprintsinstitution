'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

interface Profile {
  id: string
  full_name: string | null
  email: string
  role: string
}

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/cohorts', label: 'Cohorts' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/commissions', label: 'Commissioning' },
  { href: '/admin/analytics', label: 'Analytics' },
]

export default function AdminNav({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const handleSignOut = async () => {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initials = profile.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : profile.email[0].toUpperCase()

  return (
    <header className="border-b border-[var(--bp-warm)] bg-[var(--bp-white)] sticky top-0 z-30">
      <div className="bp-container flex items-center justify-between h-14">
        {/* Brand + role badge */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-display font-light text-base tracking-wide text-[var(--bp-dark)]">
            The B.L.U.E.P.R.I.N.T.S. Foundation
          </Link>
          <span className="text-[0.6rem] font-sans font-bold tracking-[0.18em] uppercase bg-[var(--bp-brown-deep)] text-white px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                isActive(href, exact)
                  ? 'bg-[var(--bp-cream)] text-[var(--bp-brown-deep)] font-medium border-b-2 border-[var(--bp-gold)]'
                  : 'text-[var(--bp-muted)] hover:text-[var(--bp-text)] hover:bg-[var(--bp-cream)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Avatar + sign out */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full text-white text-xs font-semibold flex items-center justify-center" style={{ background: 'var(--bp-gold)' }}>
            {initials}
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs text-[var(--bp-muted)] hover:text-[var(--bp-text)] transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-[var(--bp-warm)] flex overflow-x-auto">
        {NAV_LINKS.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex-shrink-0 px-4 py-2 text-sm whitespace-nowrap ${
              isActive(href, exact)
                ? 'text-[var(--bp-brown-deep)] font-medium border-b-2 border-[var(--bp-gold)]'
                : 'text-[var(--bp-muted)]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
