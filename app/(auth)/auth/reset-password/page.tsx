'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // If arriving from an invite link, send to onboarding; otherwise back to login
  const isInvite = searchParams.get('invite') === '1'
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const supabase = createBrowserSupabaseClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) {
      setError(updateError.message)
    } else {
      setDone(true)
      setTimeout(() => router.push('/onboarding'), 1500)
    }
  }

  if (done) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bp-card-elevated p-10">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="font-display font-light text-2xl mb-2" style={{ color: 'var(--bp-cream)' }}>
            Password set. Welcome.
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.55)' }}>Taking you to your dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="text-overline mb-3" style={{ color: 'var(--bp-gold)' }}>
          {isInvite ? 'Account Activation' : 'Password Reset'}
        </div>
        <h1 className="font-display font-light text-4xl mb-2" style={{ color: 'var(--bp-cream)' }}>
          {isInvite ? 'Set your password.' : 'Create new password.'}
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.55)' }}>
          {isInvite
            ? 'Choose a strong password to activate your account.'
            : 'Choose a new strong password for your account.'}
        </p>
      </div>

      <div className="bp-card-elevated p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bp-input"
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-1.5">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="bp-input"
              placeholder="Re-enter password"
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
            {loading ? 'Setting password…' : isInvite ? 'Activate my account' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
