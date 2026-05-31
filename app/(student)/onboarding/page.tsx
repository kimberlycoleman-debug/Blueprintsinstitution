'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STEPS = [
  {
    label: 'Welcome',
    title: 'Welcome to the B.L.U.E.P.R.I.N.T.S. Institute.',
    body: `You have been accepted into a 12-month intensive discipleship journey designed to help you discover who you are in Christ, develop spiritual maturity, experience healing, and activate your God-given calling.\n\nThis is not a program. This is a formation.`,
    scripture: { text: '"For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."', ref: 'Ephesians 2:10' },
  },
  {
    label: 'Your Journey',
    title: 'Four quarters. Sixteen modules. One transformation.',
    quarters: [
      { code: 'Q1', name: 'Alpha — Identity', desc: 'Discover who God says you are. Renounce identity lies. Build your Identity Blueprint.' },
      { code: 'Q2', name: 'Formation — Maturity', desc: 'Develop spiritual disciplines, emotional health, and authentic community.' },
      { code: 'Q3', name: 'Maturity — Healing', desc: 'Experience inner healing, freedom from cycles, and holistic wholeness.' },
      { code: 'Q4', name: 'Ministry — Activation', desc: 'Step into your calling. Launch your ministry plan. Be commissioned.' },
    ],
  },
  {
    label: 'Your Tools',
    title: 'What you will build.',
    tools: [
      { name: 'Identity Blueprint', desc: 'A written declaration of who God says you are — your design, gifts, and purpose.' },
      { name: 'Purpose Statement', desc: 'A clear articulation of your God-given calling and the work you are built to do.' },
      { name: 'Ministry Plan', desc: 'A strategic roadmap for stepping into your assignment with intention.' },
      { name: 'AI Formation Companion', desc: 'A Spirit-guided AI companion to help you process reflections and receive insight.' },
    ],
  },
  {
    label: 'Begin',
    title: 'Your formation starts today.',
    body: `Your dashboard, lessons, cohort, and AI companion are all waiting for you. Every week brings a new lesson. Every reflection builds the next layer of who you are becoming.\n\nAre you ready to begin?`,
    scripture: { text: '"And we all, who with unveiled faces contemplate the Lord\'s glory, are being transformed into his image with ever-increasing glory."', ref: '2 Corinthians 3:18' },
  },
]

const QUARTER_COLORS: Record<string, string> = {
  Q1: 'bg-[var(--bp-cream)] border-[var(--bp-sand)] text-[var(--bp-brown-deep)]',
  Q2: 'bg-green-50 border-green-200 text-green-900',
  Q3: 'bg-blue-50 border-blue-200 text-blue-900',
  Q4: 'bg-purple-50 border-purple-200 text-purple-900',
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  async function handleNext() {
    if (!isLast) {
      setStep(s => s + 1)
      return
    }
    setLoading(true)
    try {
      await fetch('/api/onboarding/complete', { method: 'POST' })
    } catch {
      // non-fatal — still proceed
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">

        {/* Step indicator */}
        <div className="flex gap-2 mb-8 justify-center">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= step ? 'bg-[var(--bp-brown-deep)] w-6' : 'bg-[var(--bp-sand)]'}`} />
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--bp-warm)] overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-[#5C4A2A] via-[var(--bp-gold)] to-[#5C4A2A]" />

          <div className="p-8 md:p-10">
            {/* Step label */}
            <div className="text-xs tracking-widest text-[#5C4A2A] uppercase font-semibold mb-4">
              Step {step + 1} of {STEPS.length} — {current.label}
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1208] mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {current.title}
            </h1>

            {/* Body text */}
            {'body' in current && current.body && (
              <p className="text-[#4A3820] leading-relaxed mb-6 whitespace-pre-line">
                {current.body}
              </p>
            )}

            {/* Scripture */}
            {'scripture' in current && current.scripture && (
              <blockquote className="border-l-2 border-[var(--bp-gold)] pl-4 mb-6">
                <p className="text-sm italic text-[#5C4A2A]" style={{ fontFamily: 'Georgia, serif' }}>
                  {current.scripture.text}
                </p>
                <cite className="text-xs text-[#7A6245] mt-1 block">— {current.scripture.ref}</cite>
              </blockquote>
            )}

            {/* Quarters grid */}
            {'quarters' in current && current.quarters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {current.quarters.map(q => (
                  <div key={q.code} className={`rounded-lg border p-4 ${QUARTER_COLORS[q.code]}`}>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1 opacity-70">{q.code}</div>
                    <div className="font-semibold text-sm mb-1">{q.name}</div>
                    <div className="text-xs leading-relaxed opacity-80">{q.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tools list */}
            {'tools' in current && current.tools && (
              <div className="space-y-3 mb-6">
                {current.tools.map(t => (
                  <div key={t.name} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--bp-cream)]0 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#3D2E1A] text-sm">{t.name}</div>
                      <div className="text-xs text-[#7A6245] leading-relaxed">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 py-3 rounded-lg border border-[var(--bp-sand)] text-[#5C4A2A] text-sm font-medium hover:bg-[var(--bp-cream)] transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-[var(--bp-brown-deep)] text-white text-sm font-semibold hover:bg-[#4A3820] transition-colors disabled:opacity-60"
              >
                {loading ? 'Starting your journey…' : isLast ? 'Begin My Formation' : 'Continue'}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[#A08060] mt-6">
          B.L.U.E.P.R.I.N.T.S. Discipleship Institute · theblueprintsfoundation.org
        </p>
      </div>
    </div>
  )
}
