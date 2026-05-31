'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const handleSignOut = async () => {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="border-b border-[var(--bp-gold)]/20 sticky top-0 z-30" style={{ background: 'var(--bp-dark)' }}>
      <div className="bp-container flex items-center justify-between h-14">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/founder" className="font-display font-light text-base tracking-wide" style={{ color: 'var(--bp-gold-light)' }}>
            The B.L.U.E.P.R.I.N.T.S. Foundation
          </Link>
          <span className="text-[0.6rem] font-sans font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full" style={{ background: 'var(--bp-gold)', color: 'var(--bp-dark)' }}>
            Sovereign
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
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
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: 'var(--bp-gold)', color: 'var(--bp-dark)' }}>
            KC
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs transition-colors"
            style={{ color: 'rgba(240,217,181,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--bp-gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,217,181,0.6)')}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/10 flex overflow-x-auto" style={{ background: 'var(--bp-dark)' }}>
        {NAV_LINKS.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex-shrink-0 px-4 py-2 text-sm whitespace-nowrap ${
              isActive(href, exact) ? 'font-semibold border-b-2' : ''
            }`}
            style={isActive(href, exact)
              ? { color: 'var(--bp-gold)', borderColor: 'var(--bp-gold)' }
              : { color: 'rgba(240,217,181,0.65)' }
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
