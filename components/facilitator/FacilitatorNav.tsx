'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

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
    <header
      className="sticky top-0 z-40"
      style={{
        background: 'rgba(26,18,11,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(196,146,58,0.18)',
      }}
    >
      <div className="bp-container flex items-center justify-between" style={{ height: '64px' }}>

        {/* Brand */}
        <Link
          href="/facilitator"
          className="font-display font-light tracking-wide flex-shrink-0"
          style={{ fontSize: '1rem', color: 'var(--bp-gold-light)' }}
        >
          B.L.U.E.P.R.I.N.T.S.
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-lg text-sm font-sans transition-colors"
              style={{
                color: isActive(href, exact) ? 'var(--bp-gold-light)' : 'rgba(240,217,181,0.55)',
                background: isActive(href, exact) ? 'rgba(196,146,58,0.12)' : 'transparent',
                fontWeight: isActive(href, exact) ? 500 : 400,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: avatar + sign out + mobile hamburger */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full text-[var(--bp-dark)] text-xs font-bold flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--bp-gold)' }}
          >
            {initials}
          </div>

          <button
            onClick={signOut}
            className="hidden md:block text-xs font-sans transition-colors"
            style={{ color: 'rgba(240,217,181,0.45)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--bp-gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,217,181,0.45)')}
          >
            Sign out
          </button>

          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px" style={{ background: 'rgba(240,217,181,0.7)' }} />
            <span className="block w-5 h-px" style={{ background: 'rgba(240,217,181,0.7)' }} />
            <span className="block w-5 h-px" style={{ background: 'rgba(240,217,181,0.7)' }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden py-3 space-y-1 px-4"
          style={{ borderTop: '1px solid rgba(196,146,58,0.14)' }}
        >
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-sans transition-colors"
              style={{
                color: isActive(href, exact) ? 'var(--bp-gold-light)' : 'rgba(240,217,181,0.55)',
                background: isActive(href, exact) ? 'rgba(196,146,58,0.12)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid rgba(196,146,58,0.1)', paddingTop: '8px', marginTop: '8px' }}>
            <button
              onClick={signOut}
              className="block w-full text-left px-3 py-2 text-sm font-sans"
              style={{ color: 'rgba(240,217,181,0.4)' }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  )
}


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
