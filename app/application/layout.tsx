import Link from 'next/link'

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: 'var(--bp-dark)' }}>

      {/* Ambient radial glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(196,146,58,0.07) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(196,146,58,0.04) 0%, transparent 55%)' }}
        />
      </div>

      {/* Top bar */}
      <header className="relative z-10 py-5 px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium transition-colors"
          style={{ color: 'rgba(245,240,232,0.45)' }}
        >
          ← Back
        </Link>
        <div
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: 'rgba(196,146,58,0.6)' }}
        >
          B.L.U.E.P.R.I.N.T.S.
        </div>
      </header>

      {/* Brand wordmark */}
      <div className="relative z-10 text-center pt-6 pb-2">
        <p className="font-display font-light text-4xl tracking-wide" style={{ color: 'var(--bp-cream)' }}>
          B.L.U.E.P.R.I.N.T.S.
        </p>
        <div
          className="text-[0.6875rem] font-bold tracking-[0.2em] uppercase mt-2"
          style={{ color: 'var(--bp-gold)' }}
        >
          The Blueprint Discipleship Institute
        </div>
        <div className="w-10 h-px mx-auto mt-5" style={{ background: 'var(--bp-gold)', opacity: 0.4 }} />
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 px-6 text-center text-xs" style={{ color: 'rgba(245,240,232,0.25)' }}>
        © 2026 The B.L.U.E.P.R.I.N.T.S. Foundation · All rights reserved.
      </footer>
    </div>
  )
}
