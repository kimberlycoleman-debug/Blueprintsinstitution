'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'
  const urlError = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(
    urlError === 'auth_callback_failed' ? 'Authentication failed. Please try again.' : ''
  )
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createBrowserSupabaseClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        setError('Please confirm your email before signing in. Check your inbox for the confirmation link.')
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } else {
      router.push(redirect)
      router.refresh()
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-display font-light text-4xl mb-2" style={{ color: 'var(--bp-cream)' }}>Welcome back</h1>
        <p style={{ color: 'rgba(245,240,232,0.55)' }}>Sign in to continue your formation journey.</p>
      </div>

      <div className="bp-card-elevated p-8">
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

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-[var(--bp-brown)] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bp-input"
              placeholder="Your password"
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
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--bp-warm)] text-center text-sm text-[var(--bp-muted)]">
          Don&apos;t have an account?{' '}
          <Link href="/application" className="text-[var(--bp-brown-deep)] font-semibold hover:underline">
            Apply to the program
          </Link>
        </div>
      </div>

      {/* Scripture */}
      <p className="text-center mt-8 text-sm font-display italic" style={{ color: 'rgba(245,240,232,0.35)' }}>
        &ldquo;You are becoming who you were always meant to be.&rdquo;
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
