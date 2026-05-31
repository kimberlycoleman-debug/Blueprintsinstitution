'use client'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[var(--bp-white)] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[var(--bp-warm)] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[var(--bp-brown)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M6.343 6.343a9 9 0 000 12.728M9.172 9.172a5 5 0 000 7.072M12 12h.01" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-[var(--bp-text)] mb-3">
          You are offline
        </h1>

        <p className="text-[var(--bp-muted)] text-sm leading-relaxed mb-6">
          It looks like you have lost your connection. Your formation journey continues — even offline, you carry what God has placed in you.
        </p>

        {/* Scripture anchor */}
        <blockquote className="border-l-2 border-[var(--bp-gold)] pl-4 text-left mb-8">
          <p className="text-sm italic text-[var(--bp-brown)] serif">
            &ldquo;For we are God&rsquo;s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.&rdquo;
          </p>
          <cite className="text-xs text-[var(--bp-muted)] mt-1 block">— Ephesians 2:10</cite>
        </blockquote>

        <button
          onClick={() => window.location.reload()}
          className="bp-btn-primary px-6 py-2.5 text-sm w-full"
        >
          Try again
        </button>

        <p className="text-xs text-[var(--bp-muted)] mt-4">
          When your connection returns, your progress will be right where you left it.
        </p>
      </div>
    </div>
  )
}
