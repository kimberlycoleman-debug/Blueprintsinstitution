'use client'

import { useState, useEffect } from 'react'

interface Commission {
  id: string
  certificate_number: string | null
  certificate_issued: boolean
  commissioning_date: string | null
  commissioning_location: string | null
  calling_declaration: string | null
  final_blessing: string | null
  prophetic_words: string[] | null
  cohorts?: { cohort_name: string; cohort_code: string }
}

interface StudentProfile {
  full_name: string
}

export default function CertificatePage() {
  const [commission, setCommission] = useState<Commission | null>(null)
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [notIssued, setNotIssued] = useState(false)

  useEffect(() => {
    fetch('/api/commissions')
      .then(r => r.json())
      .then(json => {
        const c = json.commission ?? null
        if (!c || !c.certificate_issued) {
          setNotIssued(true)
        } else {
          setCommission(c)
        }
        if (json.studentName) setProfile({ full_name: json.studentName })
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="py-20 text-center text-[var(--bp-muted)] text-sm">Loading certificate...</div>
  }

  if (notIssued) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--bp-muted)] text-sm">Your certificate has not been issued yet.</p>
        <a href="/commissions" className="text-sm text-[var(--bp-brown)] hover:underline mt-2 inline-block">← Back to Commissioning</a>
      </div>
    )
  }

  const commDate = commission?.commissioning_date
    ? new Date(commission.commissioning_date).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <>
      {/* Print button — hidden when printing */}
      <div className="no-print flex justify-center gap-3 mb-8">
        <button
          onClick={() => window.print()}
          className="bp-btn-primary px-6 py-2.5 text-sm"
        >
          Print / Save as PDF
        </button>
        <a href="/commissions" className="bp-btn-secondary px-6 py-2.5 text-sm">
          ← Back
        </a>
      </div>

      {/* Certificate — designed for A4/Letter print */}
      <div
        id="certificate"
        className="certificate-page mx-auto bg-white"
        style={{
          width: '816px',
          minHeight: '1056px',
          padding: '72px 80px',
          border: '3px solid #8B7355',
          outline: '8px solid #F5F0E8',
          outlineOffset: '-20px',
          position: 'relative',
          boxSizing: 'border-box',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
        }}
      >
        {/* Top ornament */}
        <div className="text-center mb-8">
          <div style={{ color: '#C9A84C', fontSize: '28px', letterSpacing: '8px', marginBottom: '12px' }}>
            ✦ ✦ ✦
          </div>
          <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#8B7355', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
            The B.L.U.E.P.R.I.N.T.S. Discipleship Institute
          </p>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#A89070', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
            Identity Blueprint Formation™
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #C9A84C', marginBottom: '32px' }} />

        {/* Certificate title */}
        <div className="text-center mb-8">
          <p style={{ fontSize: '13px', letterSpacing: '3px', color: '#8B7355', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '16px' }}>
            Certificate of Commissioning
          </p>
          <p style={{ fontSize: '14px', color: '#5C4A2A', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}>
            This certifies that
          </p>
          <p style={{
            fontSize: '44px',
            fontWeight: '600',
            color: '#1a120b',
            lineHeight: '1.1',
            marginBottom: '16px',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
          }}>
            {profile?.full_name ?? 'Graduate'}
          </p>
          <div style={{ borderBottom: '1px solid #C9A84C', width: '300px', margin: '0 auto 20px' }} />
        </div>

        {/* Body */}
        <div className="text-center mb-8" style={{ color: '#5C4A2A', lineHeight: '1.8' }}>
          <p style={{ fontSize: '15px', marginBottom: '12px' }}>
            has faithfully completed the full formation journey of
          </p>
          <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a120b' }}>
            The B.L.U.E.P.R.I.N.T.S. Discipleship Institute
          </p>
          {commission?.cohorts && (
            <p style={{ fontSize: '14px', marginBottom: '12px', color: '#8B7355' }}>
              Cohort: {commission.cohorts.cohort_name} ({commission.cohorts.cohort_code})
            </p>
          )}
          <p style={{ fontSize: '14px', marginBottom: '20px' }}>
            and is hereby commissioned into their God-designed purpose and calling.
          </p>
        </div>

        {/* Calling declaration */}
        {commission?.calling_declaration && (
          <div style={{ background: '#FAFAF8', border: '1px solid #E8DDD0', borderRadius: '8px', padding: '20px 28px', marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#8B7355', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
              Calling Declaration
            </p>
            <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#5C4A2A', lineHeight: '1.7' }}>
              "{commission.calling_declaration}"
            </p>
          </div>
        )}

        {/* Scripture anchor */}
        <div className="text-center mb-8">
          <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#8B7355', lineHeight: '1.7' }}>
            "For we are God's handiwork, created in Christ Jesus to do good works,
          </p>
          <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#8B7355', lineHeight: '1.7', marginBottom: '4px' }}>
            which God prepared in advance for us to do."
          </p>
          <p style={{ fontSize: '11px', color: '#A89070', fontFamily: 'Inter, sans-serif', letterSpacing: '1px' }}>
            — Ephesians 2:10
          </p>
        </div>

        {/* Date + certificate number */}
        <div style={{ borderTop: '1px solid #C9A84C', paddingTop: '24px', marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#A89070', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                Commissioned
              </p>
              <p style={{ fontSize: '14px', color: '#5C4A2A' }}>{commDate}</p>
              {commission?.commissioning_location && (
                <p style={{ fontSize: '12px', color: '#8B7355', marginTop: '2px' }}>{commission.commissioning_location}</p>
              )}
            </div>
            <div className="text-center">
              <div style={{ borderTop: '1px solid #5C4A2A', width: '180px', marginBottom: '6px' }} />
              <p style={{ fontSize: '12px', color: '#5C4A2A', fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                Kimberly Coleman
              </p>
              <p style={{ fontSize: '9px', letterSpacing: '1px', color: '#A89070', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                Founding Architect
              </p>
            </div>
            <div className="text-right">
              <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#A89070', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                Certificate No.
              </p>
              <p style={{ fontSize: '13px', color: '#8B7355', fontFamily: 'Inter, sans-serif' }}>
                {commission?.certificate_number ?? '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom ornament */}
        <div className="text-center mt-6">
          <div style={{ color: '#C9A84C', fontSize: '16px', letterSpacing: '8px' }}>✦ ✦ ✦</div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          #certificate {
            width: 100% !important;
            border: 3px solid #8B7355 !important;
            outline: 8px solid #F5F0E8 !important;
            box-shadow: none !important;
            margin: 0 !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  )
}
