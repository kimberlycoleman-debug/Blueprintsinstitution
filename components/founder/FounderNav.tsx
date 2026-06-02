'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const [isSmPlus, setIsSmPlus] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    setIsSmPlus(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsSmPlus(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const handleSignOut = async () => {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="border-b border-[var(--bp-gold)]/20 sticky top-0 z-30" style={{ background: 'rgba(26,18,11,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="bp-container flex items-center justify-between h-16">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/founder" className="font-display font-light text-base tracking-wide min-w-0 truncate" style={{ color: 'var(--bp-gold-light)' }}>
            {isSmPlus ? 'The B.L.U.E.P.R.I.N.T.S. Foundation' : 'B.L.U.E.P.R.I.N.T.S.'}
          </Link>
          <span className="text-[0.6rem] font-sans font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'var(--bp-gold)', color: 'var(--bp-dark)' }}>
            Sovereign
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                isActive(href, exact)
                  ? 'font-semibold'
                  : 'hover:bg-white/10'
              }`}
              style={isActive(href, exact)
                ? { background: 'var(--bp-gold)', color: 'var(--bp-dark)' }
                : { color: 'rgba(240,217,181,0.75)' }
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Founder identity + sign out */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: 'var(--bp-gold)', color: 'var(--bp-dark)' }}>
            KC
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs transition-colors hidden lg:block"
            style={{ color: 'rgba(240,217,181,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--bp-gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,217,181,0.6)')}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile nav row — shows on viewports < lg */}
      <div className="lg:hidden overflow-x-auto flex" style={{ borderTop: '1px solid rgba(196,146,58,0.15)' }}>
        {NAV_LINKS.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex-shrink-0 px-4 py-2.5 text-xs font-medium whitespace-nowrap tracking-wide transition-colors ${
              isActive(href, exact) ? 'border-b-2' : ''
            }`}
            style={isActive(href, exact)
              ? { color: 'var(--bp-gold)', borderColor: 'var(--bp-gold)' }
              : { color: 'rgba(240,217,181,0.55)' }
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
