'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

interface Profile {
  full_name: string | null
  email: string
  role: string
}

const NAV_LINKS = [
  { href: '/facilitator', label: 'Dashboard', exact: true },
  { href: '/facilitator/cohort', label: 'Cohort Health' },
  { href: '/facilitator/attendance', label: 'Attendance' },
  { href: '/facilitator/assessments', label: 'Assessments' },
  { href: '/facilitator/analytics', label: 'Analytics' },
]

export default function FacilitatorNav({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = profile.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : profile.email[0].toUpperCase()

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="bp-glass-nav sticky top-0 z-40">
      <div className="bp-container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Link href="/facilitator" className="font-display font-light text-base tracking-wide text-[var(--bp-dark)]">
            The B.L.U.E.P.R.I.N.T.S. Foundation
          </Link>
          <span className="text-[0.6rem] font-sans font-bold tracking-[0.18em] uppercase bg-[var(--bp-cream)] text-[var(--bp-brown)] px-2 py-0.5 rounded-full border border-[var(--bp-sand)]">
            Facilitator
          </span>
        </div>

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

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'var(--bp-gold)', color: 'var(--bp-dark)' }}>
            {initials}
          </div>
          <button
            onClick={signOut}
            className="text-xs text-[var(--bp-muted)] hover:text-[var(--bp-text)] transition-colors hidden md:block"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="md:hidden flex gap-1 px-4 pb-3 overflow-x-auto border-t border-[var(--bp-warm)]">
        {NAV_LINKS.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              isActive(href, exact)
                ? 'bg-[var(--bp-cream)] text-[var(--bp-brown-deep)] font-semibold'
                : 'text-[var(--bp-muted)] hover:bg-[var(--bp-cream)]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
