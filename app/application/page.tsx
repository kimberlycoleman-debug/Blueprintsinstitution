'use client'

import { useState } from 'react'
import Link from 'next/link'

// ---- Types --------------------------------------------------
type Step = 1 | 2 | 3 | 4

interface FormData {
  // Step 1 — Personal
  full_name: string
  email: string
  phone: string
  city: string
  state: string
  age_range: string
  gender: string
  // Step 2 — Faith Background
  church: string
  salvation_year: string
  discipleship_experience: string
  spiritual_gifts: string
  // Step 3 — Application Questions
  why_applying: string
  what_hoping: string
  current_challenges: string
  // Step 4 — Commitment
  commitment_acknowledgment: boolean
}

const INITIAL_FORM: FormData = {
  full_name: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  age_range: '',
  gender: '',
  church: '',
  salvation_year: '',
  discipleship_experience: '',
  spiritual_gifts: '',
  why_applying: '',
  what_hoping: '',
  current_challenges: '',
  commitment_acknowledgment: false,
}

const STEPS = ['Personal Info', 'Faith Background', 'Your Application', 'Commitment']

// ---- Progress Indicator ------------------------------------
function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              step < current
                ? 'bg-[var(--bp-sage)] text-white'
                : step === current
                ? 'bg-[var(--bp-brown-deep)] text-white'
                : 'bg-[var(--bp-warm)] text-[var(--bp-muted)]'
            }`}
          >
            {step < current ? '✓' : step}
          </div>
          {step < total && (
            <div
              className={`flex-1 h-0.5 w-8 ${step < current ? 'bg-[var(--bp-sage)]' : 'bg-[var(--bp-warm)]'}`}
            />
          )}
        </div>
      ))}
      <span className="ml-2 text-sm text-[var(--bp-muted)]">{STEPS[current - 1]}</span>
    </div>
  )
}

// ---- Step 1: Personal Info ----------------------------------
function Step1({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1.5">Full name *</label>
        <input
          type="text"
          required
          className="bp-input"
          placeholder="Your full name"
          value={data.full_name}
          onChange={(e) => update({ full_name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Email address *</label>
        <input
          type="email"
          required
          className="bp-input"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Phone number</label>
        <input
          type="tel"
          className="bp-input"
          placeholder="(555) 000-0000"
          value={data.phone}
          onChange={(e) => update({ phone: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">City</label>
          <input
            type="text"
            className="bp-input"
            placeholder="City"
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">State</label>
          <input
            type="text"
            className="bp-input"
            placeholder="State"
            value={data.state}
            onChange={(e) => update({ state: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Age range</label>
          <select
            className="bp-select"
            value={data.age_range}
            onChange={(e) => update({ age_range: e.target.value })}
          >
            <option value="">Select…</option>
            <option>18–24</option>
            <option>25–34</option>
            <option>35–44</option>
            <option>45–54</option>
            <option>55+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Gender</label>
          <select
            className="bp-select"
            value={data.gender}
            onChange={(e) => update({ gender: e.target.value })}
          >
            <option value="">Select…</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  )
}

// ---- Step 2: Faith Background -------------------------------
function Step2({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1.5">Church or faith community</label>
        <input
          type="text"
          className="bp-input"
          placeholder="Name of your church"
          value={data.church}
          onChange={(e) => update({ church: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Year you gave your life to Christ</label>
        <input
          type="text"
          className="bp-input"
          placeholder="e.g. 2015"
          value={data.salvation_year}
          onChange={(e) => update({ salvation_year: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Previous discipleship experience
        </label>
        <select
          className="bp-select"
          value={data.discipleship_experience}
          onChange={(e) => update({ discipleship_experience: e.target.value })}
        >
          <option value="">Select…</option>
          <option>None — this is my first time</option>
          <option>Some — I&apos;ve done a short course or Bible study</option>
          <option>Moderate — I&apos;ve been through a discipleship program</option>
          <option>Significant — I have years of formal discipleship</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Spiritual gifts you believe you have
        </label>
        <input
          type="text"
          className="bp-input"
          placeholder="e.g. teaching, mercy, encouragement…"
          value={data.spiritual_gifts}
          onChange={(e) => update({ spiritual_gifts: e.target.value })}
        />
      </div>
    </div>
  )
}

// ---- Step 3: Application Questions --------------------------
function Step3({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">
          Why are you applying to The Blueprint Discipleship Institute? *
        </label>
        <p className="text-xs text-[var(--bp-muted)] mb-2">
          Be honest and personal. There are no wrong answers.
        </p>
        <textarea
          required
          rows={4}
          className="bp-textarea"
          placeholder="Share your heart…"
          value={data.why_applying}
          onChange={(e) => update({ why_applying: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">
          What are you hoping to discover, develop, or heal through this program?
        </label>
        <textarea
          rows={4}
          className="bp-textarea"
          placeholder="What transformation are you believing for?"
          value={data.what_hoping}
          onChange={(e) => update({ what_hoping: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">
          What challenges are you currently facing in your walk with God or sense of purpose?
        </label>
        <textarea
          rows={3}
          className="bp-textarea"
          placeholder="What feels unresolved, unclear, or stuck?"
          value={data.current_challenges}
          onChange={(e) => update({ current_challenges: e.target.value })}
        />
      </div>
    </div>
  )
}

// ---- Step 4: Commitment ------------------------------------
function Step4({ data, update }: { data: FormData; update: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-6">
      <div className="bp-mandate rounded-2xl p-6">
        <p className="text-sm font-semibold mb-3 text-[var(--bp-brown-deep)]">
          Program Commitment
        </p>
        <ul className="space-y-2 text-sm text-[var(--bp-text)]">
          <li>• This is a 12-month intensive formation journey — not a casual course.</li>
          <li>• You will be assigned to a cohort of fellow students and a facilitator.</li>
          <li>• You commit to completing all 80 lessons, weekly reflections, and cohort engagement.</li>
          <li>• You commit to producing your Identity Blueprint, Purpose Statement, and Ministry Launch Plan.</li>
          <li>• You agree to show up with honesty, humility, and an open heart before God.</li>
        </ul>
      </div>

      <div className="bg-[var(--bp-cream)] rounded-2xl p-6">
        <p className="serif italic text-base text-center text-[var(--bp-brown-deep)]">
          &ldquo;For we are God&apos;s handiwork, created in Christ Jesus to do good works,
          which God prepared in advance for us to do.&rdquo;
        </p>
        <p className="text-center text-xs text-[var(--bp-muted)] mt-2">— Ephesians 2:10</p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 w-5 h-5 rounded accent-[var(--bp-brown-deep)]"
          checked={data.commitment_acknowledgment}
          onChange={(e) => update({ commitment_acknowledgment: e.target.checked })}
        />
        <span className="text-sm text-[var(--bp-text)]">
          I have read and understand the program commitment above. I am applying in earnest and,
          if accepted, I commit to fully participating in The Blueprint Discipleship Institute.
        </span>
      </label>
    </div>
  )
}

// ---- Main Component ----------------------------------------
export default function ApplicationPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(partial: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...partial }))
  }

  function canProceed(): boolean {
    if (step === 1) return !!(form.full_name.trim() && form.email.trim())
    if (step === 3) return !!form.why_applying.trim()
    if (step === 4) return form.commitment_acknowledgment
    return true
  }

  async function handleSubmit() {
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ---- Submitted state ------------------------------------
  if (submitted) {
    return (
      <div className="w-full max-w-xl">
        <div className="bp-card-elevated p-10 text-center">
          <div className="text-5xl mb-5">🙏</div>
          <h1 className="text-2xl font-semibold mb-3">Application received</h1>
          <p className="text-[var(--bp-muted)] mb-2">
            Thank you, <strong>{form.full_name}</strong>. Your application has been submitted.
          </p>
          <p className="text-[var(--bp-muted)] text-sm mb-8">
            Our team will review your application and be in touch at{' '}
            <strong>{form.email}</strong>. This typically takes 5–7 business days.
          </p>
          <div className="bg-[var(--bp-cream)] rounded-2xl p-6 mb-8">
            <p className="serif italic text-[var(--bp-brown-deep)]">
              &ldquo;You are becoming who you were always meant to be.&rdquo;
            </p>
          </div>
          <Link href="/" className="bp-btn bp-btn-ghost text-sm">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  // ---- Form -----------------------------------------------
  return (
    <div className="w-full max-w-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-display font-light text-4xl mb-2" style={{ color: 'var(--bp-cream)' }}>Apply to the Institute</h1>
        <p style={{ color: 'rgba(245,240,232,0.55)' }}>
          This is the beginning of your formation journey. Take your time.
        </p>
      </div>

      <div className="bp-card-elevated p-8">
        <StepIndicator current={step} total={4} />

        {step === 1 && <Step1 data={form} update={update} />}
        {step === 2 && <Step2 data={form} update={update} />}
        {step === 3 && <Step3 data={form} update={update} />}
        {step === 4 && <Step4 data={form} update={update} />}

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl mt-5">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--bp-warm)]">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="bp-btn bp-btn-ghost text-sm"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={!canProceed()}
              className="bp-btn bp-btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || submitting}
              className="bp-btn bp-btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-[var(--bp-muted)] mt-6">
        Already accepted?{' '}
        <Link href="/signup" className="text-[var(--bp-brown)] hover:underline">
          Create your account
        </Link>
      </p>
    </div>
  )
}
