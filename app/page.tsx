import Link from 'next/link'

const PILLARS = [
  { letter: 'B', word: 'Belief' },
  { letter: 'L', word: 'Legacy' },
  { letter: 'U', word: 'Unity' },
  { letter: 'E', word: 'Eternity' },
  { letter: 'P', word: 'Purpose' },
  { letter: 'R', word: 'Renewal' },
  { letter: 'I', word: 'Identity' },
  { letter: 'N', word: 'Nurture' },
  { letter: 'T', word: 'Truth' },
  { letter: 'S', word: 'Service' },
]

const QUARTERS = [
  {
    quarter: 'Quarter 1',
    name: 'Alpha',
    theme: 'Identity',
    description: 'Discover who you are in Christ. Shed false identities. Anchor in the Word.',
    lessons: 20,
    color: 'bp-card-warm',
  },
  {
    quarter: 'Quarter 2',
    name: 'Formation',
    theme: 'Maturity',
    description: 'Develop spiritual disciplines, emotional health, and authentic community.',
    lessons: 20,
    color: 'bp-card',
  },
  {
    quarter: 'Quarter 3',
    name: 'Maturity',
    theme: 'Healing',
    description: 'Experience deep inner healing, freedom from cycles, and holistic wholeness.',
    lessons: 20,
    color: 'bp-card',
  },
  {
    quarter: 'Quarter 4',
    name: 'Ministry',
    theme: 'Activation',
    description: 'Step into your God-given calling. Launch ministry. Be commissioned.',
    lessons: 20,
    color: 'bp-card-gold',
  },
]

const CAPSTONES = [
  {
    icon: '✦',
    title: 'Identity Blueprint Statement',
    description:
      'A personal manifesto of who you are in Christ — rooted in scripture, sealed in conviction.',
  },
  {
    icon: '◈',
    title: 'Purpose Statement',
    description:
      'A clear articulation of your God-given calling and the unique assignment on your life.',
  },
  {
    icon: '❋',
    title: 'Ministry Action Plan',
    description:
      'A strategic road map for how you will steward your gifts to serve the Kingdom.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── Navigation ───────────────────────────────────────── */}
      <header className="bp-glass-nav sticky top-0 z-50">
        <div className="bp-container py-4 flex justify-between items-center">
          <div className="font-display text-base font-light tracking-wide text-bp-dark">
            The B.L.U.E.P.R.I.N.T.S. Foundation
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/login" className="bp-btn bp-btn-ghost text-sm">
              Sign in
            </Link>
            <Link href="/application" className="bp-btn bp-btn-gold text-sm">
              Apply Now
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bp-container pt-20 pb-28 text-center">
        <div className="text-overline mb-8 animate-fade-up">
          The Blueprint Discipleship Institute
        </div>

        <h1
          className="font-display font-light text-bp-dark mx-auto max-w-4xl animate-fade-up-delay"
          style={{ lineHeight: '1.06', fontSize: 'clamp(3rem, 6.5vw, 5.5rem)' }}
        >
          You are becoming who you were{' '}
          <em className="text-gold not-italic" style={{ fontStyle: 'italic' }}>
            always meant to be.
          </em>
        </h1>

        <div className="bp-divider animate-fade-up-delay" />

        <p className="text-lg text-bp-muted max-w-2xl mx-auto mb-12 animate-fade-up-delay-2" style={{ lineHeight: '1.75' }}>
          A 12-month intensive discipleship training program grounded in scripture.
          Discover identity. Develop maturity. Experience healing. Activate your calling.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
          <Link href="/application" className="bp-btn bp-btn-gold text-base px-10 py-4">
            Apply for Your Seat
          </Link>
          <Link href="#journey" className="bp-btn bp-btn-outline text-base px-10 py-4">
            Explore the Journey
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 animate-fade-up-delay-2">
          {[
            { value: '12', label: 'Months' },
            { value: '52', label: 'Lessons' },
            { value: '4', label: 'Quarters' },
            { value: '3', label: 'Capstones' },
            { value: '∞', label: 'Transformation' },
          ].map(({ value, label }, i) => (
            <div key={i} className="flex items-center gap-4">
              {i > 0 && <div className="w-px h-6 bg-[var(--bp-sand)] hidden sm:block" />}
              <div className="text-center">
                <div className="font-display font-light text-2xl text-[var(--bp-brown-deep)]">{value}</div>
                <div className="text-[0.625rem] font-bold tracking-[0.18em] uppercase text-[var(--bp-muted)]">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mandate ──────────────────────────────────────────── */}
      <section className="bp-container pb-24">
        <div className="bp-mandate max-w-3xl mx-auto">
          <div className="bp-mandate-label">Founding Mandate</div>
          <p className="bp-mandate-text">
            "Therefore go and make disciples of all nations, baptizing them in the name
            of the Father and of the Son and of the Holy Spirit, and teaching them to obey
            everything I have commanded you."
          </p>
          <div className="bp-mandate-reference">Matthew 28:19–20</div>
        </div>
      </section>

      {/* ── Pillars ───────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--bp-cream)' }}>
        <div className="bp-container">
          <div className="text-overline text-center mb-4">The Ten Pillars</div>
          <h2 className="font-display font-light text-bp-dark text-center mb-4">
            B.L.U.E.P.R.I.N.T.S.
          </h2>
          <p className="text-bp-muted text-center max-w-xl mx-auto mb-14" style={{ lineHeight: '1.75' }}>
            Ten pillars. Each letter a pillar of formation. Together, the architecture of
            a transformed life.
          </p>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {PILLARS.map(({ letter, word }) => (
              <div key={letter} className="bp-pillar group">
                <div className="bp-pillar-letter group-hover:scale-110">{letter}</div>
                <div className="text-[0.6rem] font-bold tracking-widest uppercase text-bp-brown mt-1">
                  {word}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12-Month Journey ─────────────────────────────────── */}
      <section id="journey" className="bp-section">
        <div className="bp-container">
          <div className="text-overline text-center mb-4">The Journey</div>
          <h2 className="font-display font-light text-bp-dark text-center mb-4">
            Twelve Months. One Transformation.
          </h2>
          <p className="text-bp-muted text-center max-w-2xl mx-auto mb-16" style={{ lineHeight: '1.75' }}>
            Four quarters. Thirteen modules. Forty-eight core lessons — plus four in the advanced track.
            Every session builds on the last — iron sharpening iron, scripture anchoring soul.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUARTERS.map(({ quarter, name, theme, description, lessons, color }) => (
              <div key={quarter} className={`${color} bp-card bp-card-interactive`}>
                <div className="bp-badge bp-badge-warm mb-4">{quarter}</div>
                <h3 className="font-display font-light mb-1 text-bp-dark">
                  {name}
                </h3>
                <div className="text-gold font-bold text-sm tracking-wide mb-3">
                  {theme}
                </div>
                <p className="text-sm text-bp-muted mb-5" style={{ lineHeight: '1.7' }}>
                  {description}
                </p>
                <div className="bp-badge bp-badge-gold">
                  {lessons} Lessons
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Build ────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--bp-cream)' }}>
        <div className="bp-container">
          <div className="text-overline text-center mb-4">Capstone Deliverables</div>
          <h2 className="font-display font-light text-bp-dark text-center mb-4">
            What You Will Build
          </h2>
          <p className="text-bp-muted text-center max-w-xl mx-auto mb-16" style={{ lineHeight: '1.75' }}>
            Every graduate leaves with three living documents — artifacts of transformation
            to carry into every season ahead.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {CAPSTONES.map(({ icon, title, description }) => (
              <div key={title} className="bp-card bp-card-warm text-center">
                <div
                  className="text-3xl mb-5 mx-auto"
                  style={{ color: 'var(--bp-gold)', fontFamily: 'var(--font-display)' }}
                >
                  {icon}
                </div>
                <h3 className="font-display font-normal text-bp-dark mb-3" style={{ fontSize: '1.25rem' }}>
                  {title}
                </h3>
                <p className="text-sm text-bp-muted" style={{ lineHeight: '1.75' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark CTA ─────────────────────────────────────────── */}
      <section className="bp-dark-section py-28">
        <div className="bp-container text-center">
          <div
            className="text-[0.6875rem] font-bold tracking-[0.2em] uppercase mb-6"
            style={{ color: 'var(--bp-gold)' }}
          >
            Applications Are Open
          </div>
          <h2
            className="font-display font-light mx-auto max-w-3xl mb-6"
            style={{ color: 'var(--bp-cream)', lineHeight: '1.1' }}
          >
            Your transformation begins with{' '}
            <em style={{ color: 'var(--bp-gold)', fontStyle: 'italic' }}>one decision.</em>
          </h2>
          <p
            className="max-w-xl mx-auto mb-12 text-lg"
            style={{ color: 'rgba(245,240,232,0.7)', lineHeight: '1.75' }}
          >
            Seats are limited. Every cohort is a covenant community. Apply with intention.
            Come prepared to be changed.
          </p>
          <Link href="/application" className="bp-btn bp-btn-gold text-base px-12 py-4">
            Apply for Your Seat
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer
        className="py-12 text-center text-sm"
        style={{ background: 'var(--bp-dark)', color: 'rgba(245,240,232,0.5)' }}
      >
        <div
          className="font-display font-light text-2xl mb-4"
          style={{ color: 'var(--bp-cream)' }}
        >
          B.L.U.E.P.R.I.N.T.S.
        </div>
        <div className="mb-3" style={{ color: 'rgba(245,240,232,0.6)' }}>
          © 2026 The B.L.U.E.P.R.I.N.T.S. Foundation
        </div>
        <div className="text-xs mb-6 max-w-lg mx-auto" style={{ lineHeight: '1.7' }}>
          B.L.U.E.P.R.I.N.T.S.™, Identity Blueprint Formation™, Identity Blueprint Statement™,
          Purpose Statement™, and Ministry Launch Plan™ are trademarks of The B.L.U.E.P.R.I.N.T.S. Foundation.
        </div>
        <div className="flex gap-6 justify-center text-xs">
          <Link href="/privacy" className="hover:text-bp-cream transition-colors" style={{ color: 'rgba(245,240,232,0.5)' }}>
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-bp-cream transition-colors" style={{ color: 'rgba(245,240,232,0.5)' }}>
            Terms of Service
          </Link>
        </div>
      </footer>
    </main>
  )
}
