'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

interface Profile {
  full_name: string | null
  email: string
  role: string
  identity_blueprint_complete: boolean
  purpose_statement_complete: boolean
  ministry_plan_complete: boolean
}

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/lessons', label: 'Lessons' },
  { href: '/reflections', label: 'Reflections' },
  { href: '/cohort', label: 'My Cohort' },
  { href: '/commissions', label: 'Commissioning' },
  { href: '/analytics', label: 'My Formation' },
]

export default function StudentNav({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const initials = profile.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : profile.email[0].toUpperCase()

  return (
    <header className="bp-glass-nav sticky top-0 z-40">
      <div className="bp-container flex items-center justify-between h-16">
        {/* Brand */}
        <Link href="/dashboard" className="font-display font-light text-base tracking-wide text-[var(--bp-dark)]">
          The B.L.U.E.P.R.I.N.T.S. Foundation
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-[var(--bp-cream)] text-[var(--bp-brown-deep)] font-medium border-b-2 border-[var(--bp-gold)]'
                  : 'text-[var(--bp-muted)] hover:text-[var(--bp-text)] hover:bg-[var(--bp-cream)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
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

      {/* Mobile nav */}
      <div className="md:hidden flex gap-1 px-4 pb-3 overflow-x-auto border-t border-[var(--bp-warm)]">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              pathname === href || pathname.startsWith(href + '/')
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
