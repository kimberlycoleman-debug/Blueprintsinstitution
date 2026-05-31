'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createBrowserSupabaseClient()
    const redirectTo = `${window.location.origin}/auth/reset-password`

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bp-card p-10">
          <div className="text-4xl mb-4">✉️</div>
          <h1 className="text-2xl font-semibold mb-3">Check your email</h1>
          <p className="text-[var(--bp-muted)] mb-6">
            We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the link.
          </p>
          <Link href="/login" className="bp-btn bp-btn-ghost text-sm">
            ← Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-2">Reset your password</h1>
        <p className="text-[var(--bp-muted)]">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <div className="bp-card p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bp-input"
              placeholder="you@example.com"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bp-btn bp-btn-primary w-full"
          >
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href="/login" className="text-[var(--bp-brown)] hover:underline">
            ← Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
