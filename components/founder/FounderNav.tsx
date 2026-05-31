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
    <header className="border-b border-amber-200 bg-[#1a120b] sticky top-0 z-30">
      <div className="bp-container flex items-center justify-between h-14">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/founder" className="text-sm font-semibold tracking-tight text-amber-100">
            B.L.U.E.P.R.I.N.T.S.
          </Link>
          <span className="text-xs bg-amber-500 text-[#1a120b] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">
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
                  ? 'bg-amber-500 text-[#1a120b] font-semibold'
                  : 'text-amber-200 hover:text-amber-100 hover:bg-white/10'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Founder identity + sign out */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-amber-500 text-[#1a120b] text-xs font-bold flex items-center justify-center">
            KC
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs text-amber-300 hover:text-amber-100 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/10 flex overflow-x-auto bg-[#1a120b]">
        {NAV_LINKS.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex-shrink-0 px-4 py-2 text-sm whitespace-nowrap ${
              isActive(href, exact)
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'text-amber-300'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
