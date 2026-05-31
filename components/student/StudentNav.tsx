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
    <header className="border-b border-[var(--bp-warm)] bg-white sticky top-0 z-40">
      <div className="bp-container flex items-center justify-between h-16">
        {/* Brand */}
        <Link href="/dashboard" className="font-semibold text-[var(--bp-brown-deep)] text-sm tracking-tight">
          Blueprint Institute
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-[var(--bp-warm)] text-[var(--bp-brown-deep)]'
                  : 'text-[var(--bp-muted)] hover:text-[var(--bp-text)] hover:bg-[var(--bp-white)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--bp-warm)] flex items-center justify-center text-xs font-semibold text-[var(--bp-brown-deep)]">
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
      <div className="md:hidden flex gap-1 px-4 pb-3 overflow-x-auto">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-[var(--bp-warm)] text-[var(--bp-brown-deep)]'
                : 'text-[var(--bp-muted)] hover:bg-[var(--bp-white)]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
