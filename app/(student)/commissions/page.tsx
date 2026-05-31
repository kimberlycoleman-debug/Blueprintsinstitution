'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Commission {
  id: string
  cohort_id: string
  certificate_number: string | null
  certificate_issued: boolean
  commissioning_date: string | null
  commissioning_location: string | null
  prophetic_words: string[] | null
  calling_declaration: string | null
  final_blessing: string | null
  identity_blueprint_complete: boolean
  purpose_statement_complete: boolean
  ministry_plan_complete: boolean
  attendance_percentage: number | null
  lessons_completed: number
  community_covenant_signed: boolean
  cohorts?: { cohort_name: string; cohort_code: string }
}

interface Eligibility {
  identity_blueprint_complete: boolean
  purpose_statement_complete: boolean
  ministry_plan_complete: boolean
  attendance_percentage: number | null
  lessons_completed: number
  community_covenant_signed: boolean
  cohort_id: string | null
}

const CHECK_ITEMS = [
  {
    key: 'identity_blueprint_complete' as const,
    label: 'Identity Blueprint Statement™ complete',
    href: '/identity-blueprint',
    required: true,
  },
  {
    key: 'purpose_statement_complete' as const,
    label: 'Purpose Statement™ complete',
    href: '/purpose-statement',
    required: true,
  },
  {
    key: 'ministry_plan_complete' as const,
    label: 'Ministry Launch Plan™ complete',
    href: '/ministry-plan',
    required: true,
  },
]

export default function CommissioningPage() {
  const [commission, setCommission] = useState<Commission | null>(null)
  const [eligibility, setEligibility] = useState<Eligibility | null>(null)
  const [meetsThreshold, setMeetsThreshold] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    fetch('/api/commissions')
      .then(r => r.json())
      .then(json => {
        setCommission(json.commission ?? null)
        setEligibility(json.eligibility ?? null)
        setMeetsThreshold(json.meetsThreshold ?? false)
        setLoading(false)
      })
      .catch(() => { setFetchError(true); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center text-[var(--bp-muted)] text-sm">
        Loading commissioning status...
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--bp-muted)] mb-4">Unable to load commissioning status. Please refresh the page.</p>
        <Link href="/dashboard" className="bp-btn bp-btn-secondary text-sm">← Back to Dashboard</Link>
      </div>
    )
  }

  const elig = eligibility

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center pt-4">
        <p className="text-overline mb-2">
          Identity Blueprint Formation™
        </p>
        <h1 className="text-3xl font-semibold">Commissioning</h1>
        <p className="text-[var(--bp-muted)] mt-2 text-sm max-w-md mx-auto">
          Your commissioning marks the completion of your formation journey and your sending into
          your God-designed purpose.
        </p>
      </div>

      {/* Certificate issued — primary state */}
      {commission?.certificate_issued && (
        <div className="bg-[var(--bp-dark)] text-white rounded-2xl p-8 text-center">
          <p className="text-[var(--bp-gold)] text-xs tracking-widest uppercase font-semibold mb-3">
            Commissioned ✦
          </p>
          <p className="text-2xl font-semibold mb-1">You are commissioned.</p>
          {commission.commissioning_date && (
            <p className="text-[var(--bp-gold-light)] text-sm mb-4">
              {new Date(commission.commissioning_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {commission.commissioning_location && ` · ${commission.commissioning_location}`}
            </p>
          )}
          {commission.certificate_number && (
            <p className="text-xs text-[var(--bp-gold-light)] mb-6">Certificate #{commission.certificate_number}</p>
          )}
          <Link
            href="/commissions/certificate"
            className="inline-block bg-[var(--bp-cream)]0 text-[#1a120b] font-semibold px-6 py-2.5 rounded-lg hover:bg-[var(--bp-gold)] transition-colors"
          >
            View &amp; Print Certificate →
          </Link>
        </div>
      )}

      {/* Commission record exists but cert not issued yet */}
      {commission && !commission.certificate_issued && (
        <div className="bp-card p-6 border-[var(--bp-sand)] bg-[var(--bp-cream)]">
          <p className="text-sm font-semibold text-[var(--bp-brown-deep)] mb-1">Commissioning scheduled</p>
          {commission.commissioning_date ? (
            <p className="text-sm text-[var(--bp-brown)]">
              {new Date(commission.commissioning_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {commission.commissioning_location && ` at ${commission.commissioning_location}`}
            </p>
          ) : (
            <p className="text-sm text-[var(--bp-brown)]">Your facilitator or administrator will confirm the date.</p>
          )}
        </div>
      )}

      {/* Eligibility checklist */}
      <div className="bp-card p-6">
        <h2 className="font-semibold mb-4">Formation Completion</h2>
        <div className="space-y-3">
          {CHECK_ITEMS.map(item => {
            const complete = elig?.[item.key] ?? false
            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${complete ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {complete && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${complete ? 'text-[var(--bp-brown)]' : 'text-[var(--bp-muted)]'}`}>
                    {item.label}
                  </span>
                </div>
                {!complete && (
                  <Link href={item.href} className="text-xs text-[var(--bp-brown)] hover:underline">
                    Complete →
                  </Link>
                )}
              </div>
            )
          })}

          {/* Attendance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${(elig?.attendance_percentage ?? 0) >= 70 ? 'bg-green-500' : 'bg-gray-200'}`}>
                {(elig?.attendance_percentage ?? 0) >= 70 && <span className="text-white text-xs">✓</span>}
              </div>
              <span className={`text-sm ${(elig?.attendance_percentage ?? 0) >= 70 ? 'text-[var(--bp-brown)]' : 'text-[var(--bp-muted)]'}`}>
                Attendance ≥ 70% {elig?.attendance_percentage != null && `(${elig.attendance_percentage}% achieved)`}
              </span>
            </div>
          </div>

          {/* Community Covenant */}
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${elig?.community_covenant_signed ? 'bg-green-500' : 'bg-gray-200'}`}>
              {elig?.community_covenant_signed && <span className="text-white text-xs">✓</span>}
            </div>
            <span className={`text-sm ${elig?.community_covenant_signed ? 'text-[var(--bp-brown)]' : 'text-[var(--bp-muted)]'}`}>
              Community Covenant signed
            </span>
          </div>
        </div>

        {/* Readiness status */}
        <div className={`mt-5 p-4 rounded-lg text-sm ${meetsThreshold ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-[var(--bp-cream)] text-[var(--bp-muted)]'}`}>
          {meetsThreshold
            ? 'You have met the commissioning requirements. Your facilitator will initiate your commissioning.'
            : 'Complete the requirements above to become eligible for commissioning.'}
        </div>
      </div>

      {/* Commissioning declaration */}
      {commission?.calling_declaration && (
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-3">Your Calling Declaration</h2>
          <blockquote className="border-l-4 border-[var(--bp-gold)] pl-4 italic text-[var(--bp-brown)] text-sm leading-relaxed">
            "{commission.calling_declaration}"
          </blockquote>
        </div>
      )}

      {/* Final blessing */}
      {commission?.final_blessing && (
        <div className="bg-[var(--bp-cream)] rounded-xl p-6 text-center">
          <p className="text-overline mb-3">Final Blessing</p>
          <p className="text-[var(--bp-brown)] italic leading-relaxed">"{commission.final_blessing}"</p>
        </div>
      )}

      {/* Prophetic words */}
      {commission?.prophetic_words && commission.prophetic_words.length > 0 && (
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-3">Prophetic Words Spoken Over You</h2>
          <div className="space-y-2">
            {commission.prophetic_words.map((word, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-[var(--bp-gold)] flex-shrink-0 mt-0.5">✦</span>
                <p className="text-[var(--bp-brown)] italic">"{word}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anchor scripture */}
      <div className="text-center py-4">
        <p className="text-xs text-[var(--bp-muted)] italic">
          "For we are God's handiwork, created in Christ Jesus to do good works,
          which God prepared in advance for us to do." — Ephesians 2:10
        </p>
      </div>
    </div>
  )
}
