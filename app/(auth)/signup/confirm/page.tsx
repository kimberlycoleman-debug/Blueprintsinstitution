import Link from 'next/link'

export default function SignupConfirmPage() {
  return (
    <div className="w-full max-w-md text-center">
      <div className="bp-card p-10">
        <div className="text-5xl mb-5">✉️</div>
        <h1 className="text-2xl font-semibold mb-3">Check your email</h1>
        <p className="text-[var(--bp-muted)] mb-2">
          We sent a confirmation link to your email address.
        </p>
        <p className="text-[var(--bp-muted)] mb-8 text-sm">
          Click the link in your email to activate your account and begin your formation journey.
        </p>
        <Link href="/login" className="bp-btn bp-btn-ghost text-sm">
          ← Back to sign in
        </Link>
      </div>
    </div>
  )
}
