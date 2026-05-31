'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { TrackPageView } from '@/components/analytics/TrackPageView'

interface Reflection {
  id: string
  prompt: string | null
  response: string
  ai_response: string | null
  is_private: boolean
  shared_with_facilitator: boolean
  created_at: string
  lessons: {
    id: string
    title: string
    modules: { name: string; quarters: { quarter_code: string } } | null
  } | null
}

function ReflectionsContent() {
  const searchParams = useSearchParams()
  const lessonIdParam = searchParams.get('lesson')
  const elementIdParam = searchParams.get('element')

  const [reflections, setReflections] = useState<Reflection[]>([])
  const [loading, setLoading] = useState(true)

  // Write new reflection
  const [response, setResponse] = useState('')
  const [isPrivate, setIsPrivate] = useState(true)
  const [shareWithFacilitator, setShareWithFacilitator] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [justSubmitted, setJustSubmitted] = useState<{ response: string; ai_response: string | null } | null>(null)

  useEffect(() => {
    fetch('/api/reflections')
      .then((r) => r.json())
      .then(({ data }) => {
        setReflections(data ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError('')
    setSubmitting(true)

    const res = await fetch('/api/reflections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson_id: lessonIdParam,
        workbook_element_id: elementIdParam ?? undefined,
        response,
        is_private: isPrivate,
        shared_with_facilitator: shareWithFacilitator,
      }),
    })

    const json = await res.json()
    setSubmitting(false)

    if (!res.ok) {
      setSubmitError(json.error ?? 'Something went wrong.')
    } else {
      setJustSubmitted(json.data)
      setResponse('')
      // Refresh list
      fetch('/api/reflections')
        .then((r) => r.json())
        .then(({ data }) => setReflections(data ?? []))
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <TrackPageView eventType="reflection_start" metadata={{ page: 'reflections' }} />
      <div>
        <div className="text-overline mb-1">
          Reflection Journal
        </div>
        <h1 className="text-3xl font-semibold">Your Reflections</h1>
        <p className="text-[var(--bp-muted)] mt-1">
          Every honest response is a step in formation.
        </p>
      </div>

      {/* Write new reflection */}
      {lessonIdParam && (
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-4">Write a Reflection</h2>

          {justSubmitted ? (
            <div className="space-y-4">
              <div className="bg-[var(--bp-cream)] rounded-xl p-4">
                <p className="text-sm whitespace-pre-wrap">{justSubmitted.response}</p>
              </div>
              {justSubmitted.ai_response && (
                <div className="bg-[var(--bp-warm)] rounded-xl p-5">
                  <p className="text-xs font-semibold text-[var(--bp-brown)] mb-2">Formation Companion</p>
                  <p className="text-sm text-[var(--bp-text)] leading-relaxed">{justSubmitted.ai_response}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setJustSubmitted(null)}
                  className="bp-btn bp-btn-secondary text-sm"
                >
                  Write another
                </button>
                <Link href={`/lessons/${lessonIdParam}`} className="bp-btn bp-btn-ghost text-sm">
                  ← Back to lesson
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Your reflection</label>
                <textarea
                  rows={6}
                  required
                  className="bp-textarea"
                  placeholder="What is God speaking to you through this lesson? What are you discovering?"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="accent-[var(--bp-brown-deep)]"
                  />
                  Keep private (only you can see this)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={shareWithFacilitator}
                    onChange={(e) => setShareWithFacilitator(e.target.checked)}
                    className="accent-[var(--bp-brown-deep)]"
                  />
                  Share with my facilitator
                </label>
              </div>

              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{submitError}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting || !response.trim()}
                  className="bp-btn bp-btn-primary disabled:opacity-40"
                >
                  {submitting ? 'Saving…' : 'Save Reflection'}
                </button>
                <Link href={`/lessons/${lessonIdParam}`} className="bp-btn bp-btn-ghost text-sm">
                  ← Back to lesson
                </Link>
              </div>
            </form>
          )}
        </div>
      )}

      {/* All reflections */}
      <div>
        <h2 className="font-semibold mb-4">All Reflections</h2>
        {loading ? (
          <div className="text-[var(--bp-muted)] text-sm">Loading…</div>
        ) : reflections.length === 0 ? (
          <div className="bp-card p-8 text-center">
            <p className="text-[var(--bp-muted)] mb-4">
              You haven&apos;t written any reflections yet.
            </p>
            <Link href="/lessons" className="bp-btn bp-btn-secondary text-sm">
              Go to Lessons
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reflections.map((r) => (
              <div key={r.id} className="bp-card p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    {r.lessons && (
                      <Link
                        href={`/lessons/${r.lessons.id}`}
                        className="text-xs font-medium text-[var(--bp-brown)] hover:underline"
                      >
                        {r.lessons.modules?.quarters?.quarter_code} · {r.lessons.title}
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {r.is_private && (
                      <span className="text-xs text-[var(--bp-muted)]">Private</span>
                    )}
                    {r.shared_with_facilitator && (
                      <span className="text-xs bg-[var(--bp-warm)] text-[var(--bp-brown-deep)] px-2 py-0.5 rounded-full">
                        Shared
                      </span>
                    )}
                    <span className="text-xs text-[var(--bp-muted)]">
                      {new Date(r.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                {r.prompt && (
                  <p className="text-xs italic text-[var(--bp-muted)] mb-2">&ldquo;{r.prompt}&rdquo;</p>
                )}
                <p className="text-sm whitespace-pre-wrap mb-3">{r.response}</p>
                {r.ai_response && (
                  <div className="bg-[var(--bp-cream)] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[var(--bp-brown)] mb-1">Formation Companion</p>
                    <p className="text-sm text-[var(--bp-text)]">{r.ai_response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReflectionsPage() {
  return (
    <Suspense>
      <ReflectionsContent />
    </Suspense>
  )
}
