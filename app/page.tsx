import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bp-container py-6 flex justify-between items-center">
        <div className="font-semibold text-bp-brown-deep">
          B.L.U.E.P.R.I.N.T.S. Foundation
        </div>
        <nav className="flex gap-2">
          <Link href="/login" className="bp-btn bp-btn-ghost">
            Sign in
          </Link>
          <Link href="/application" className="bp-btn bp-btn-primary">
            Apply
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bp-container py-20 text-center">
        <div className="text-xs tracking-widest text-bp-brown uppercase font-semibold mb-6">
          THE BLUEPRINT DISCIPLESHIP INSTITUTE
        </div>
        <h1 className="serif text-5xl md:text-6xl mb-6 max-w-4xl mx-auto leading-tight">
          You are becoming who you were always{' '}
          <span className="italic text-bp-brown">meant to be.</span>
        </h1>
        <p className="text-lg text-bp-muted max-w-2xl mx-auto mb-10">
          A 12-month intensive discipleship training program. Discover identity.
          Develop maturity. Experience healing. Activate your calling.
        </p>
        <Link href="/application" className="bp-btn bp-btn-primary text-base px-10 py-4">
          Apply for Transformation
        </Link>
      </section>

      {/* Mandate */}
      <section className="bp-container py-16">
        <div className="bp-mandate max-w-3xl mx-auto">
          <div className="bp-mandate-label">Founding Mandate</div>
          <div className="bp-mandate-text">
            "Therefore go and make disciples of all nations, baptizing them in the
            name of the Father and of the Son and of the Holy Spirit, and teaching
            them to obey everything I have commanded you."
            <br />— Matthew 28:19-20
          </div>
        </div>
      </section>

      {/* Four Quarters */}
      <section className="bp-container py-16">
        <h2 className="text-3xl text-center mb-4">The 12-Month Journey</h2>
        <p className="text-bp-muted text-center mb-12 max-w-2xl mx-auto">
          Four quarters. Sixteen modules. Eighty lessons. One transformation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bp-card">
            <div className="text-xs tracking-widest text-bp-brown uppercase font-semibold mb-2">
              Quarter 1
            </div>
            <h3 className="mb-3">Alpha — Identity</h3>
            <p className="text-sm text-bp-muted">
              Discover who you are in Christ. Create your Identity Blueprint Statement.
            </p>
          </div>

          <div className="bp-card">
            <div className="text-xs tracking-widest text-bp-brown uppercase font-semibold mb-2">
              Quarter 2
            </div>
            <h3 className="mb-3">Formation — Maturity</h3>
            <p className="text-sm text-bp-muted">
              Develop spiritual disciplines, emotional health, and authentic community.
            </p>
          </div>

          <div className="bp-card">
            <div className="text-xs tracking-widest text-bp-brown uppercase font-semibold mb-2">
              Quarter 3
            </div>
            <h3 className="mb-3">Maturity — Healing</h3>
            <p className="text-sm text-bp-muted">
              Experience inner healing, freedom from cycles, and holistic wholeness.
            </p>
          </div>

          <div className="bp-card">
            <div className="text-xs tracking-widest text-bp-brown uppercase font-semibold mb-2">
              Quarter 4
            </div>
            <h3 className="mb-3">Ministry — Activation</h3>
            <p className="text-sm text-bp-muted">
              Step into calling. Launch ministry. Be commissioned.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bp-container py-12 mt-16 border-t border-bp-warm text-center text-sm text-bp-muted">
        <div className="mb-2">© 2026 The Blueprint Foundation</div>
        <div className="text-xs mb-3">
          Discipleship OS™, B.L.U.E.P.R.I.N.T.™, R.E.S.T.O.R.E.™, K.I.N.D.™ are trademarks of The Blueprint Foundation.
        </div>
        <div className="flex gap-4 justify-center text-xs">
          <Link href="/privacy" className="hover:text-bp-brown transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-bp-brown transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </main>
  )
}
