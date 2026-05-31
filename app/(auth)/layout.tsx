import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bp-cream)] flex flex-col">
      {/* Top bar */}
      <header className="py-5 px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-[var(--bp-brown-deep)] hover:text-[var(--bp-text)] transition-colors"
        >
          ← The Blueprint Discipleship Institute
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-5 px-6 text-center text-xs text-[var(--bp-muted)]">
        © 2026 The B.L.U.E.P.R.I.N.T.S. Foundation. All rights reserved.
      </footer>
    </div>
  )
}
