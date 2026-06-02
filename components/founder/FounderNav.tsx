'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

const NAV_LINKS = [
  { href: '/founder', label: 'Command Center', exact: true },
  { href: '/founder/vault', label: 'Vault' },
  { href: '/founder/analytics', label: 'Analytics' },
  { href: '/founder/funding', label: 'Funding' },
  { href: '/founder/audit', label: 'Audit Log' },
]

export default function FounderNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const handleSignOut = async () => {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: 'rgba(26,18,11,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(196,146,58,0.18)',
      }}
    >
      <div className="bp-container flex items-center justify-between" style={{ height: '64px' }}>

        {/* Brand — matches front page font exactly */}
        <Link
          href="/founder"
          className="font-display font-light tracking-wide flex-shrink-0"
          style={{ fontSize: '1rem', color: 'var(--bp-gold-light)', lineHeight: 1 }}
        >
          The B.L.U.E.P.R.I.N.T.S. Foundation
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-lg text-sm font-sans transition-colors"
              style={
                isActive(href, exact)
                  ? { background: 'var(--bp-gold)', color: 'var(--bp-dark)', fontWeight: 600 }
                  : { color: 'rgba(240,217,181,0.7)', fontWeight: 400 }
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side — KC avatar + sign out (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Avatar */}
          <div
            className="w-7 h-7 rounded-full font-sans text-xs font-bold flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--bp-gold)', color: 'var(--bp-dark)' }}
          >
            KC
          </div>

          {/* Sign out — desktop only */}
          <button
            onClick={handleSignOut}
            className="hidden lg:block font-sans text-xs transition-colors"
            style={{ color: 'rgba(240,217,181,0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--bp-gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,217,181,0.55)')}
          >
            Sign out
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-7 h-7"
            aria-label="Menu"
          >
            <span className="block w-5 h-px transition-all" style={{ background: 'var(--bp-gold-light)' }} />
            <span className="block w-5 h-px transition-all" style={{ background: 'var(--bp-gold-light)' }} />
            <span className="block w-5 h-px transition-all" style={{ background: 'var(--bp-gold-light)' }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="lg:hidden border-t"
          style={{ background: 'rgba(26,18,11,0.98)', borderColor: 'rgba(196,146,58,0.18)' }}
        >
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-sans text-sm border-b transition-colors"
              style={{
                borderColor: 'rgba(196,146,58,0.1)',
                color: isActive(href, exact) ? 'var(--bp-gold)' : 'rgba(240,217,181,0.7)',
                fontWeight: isActive(href, exact) ? 600 : 400,
              }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-6 py-3 font-sans text-sm"
            style={{ color: 'rgba(240,217,181,0.45)' }}
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  )
}
