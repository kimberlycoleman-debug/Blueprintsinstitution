'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Student {
  student_id: string
  full_name: string | null
  email: string
  lessons_completed: number
  lessons_total: number
  reflection_count: number
  identity_blueprint_complete: boolean
  purpose_statement_complete: boolean
  ministry_plan_complete: boolean
}

interface Cohort {
  id: string
  cohort_name: string
  cohort_code: string
}

function AssessmentsContent() {
  const searchParams = useSearchParams()
  const cohortParam = searchParams.get('cohort') ?? ''

  const [cohorts, setCohorts] = useState<Cohort[]>([])
  const [selectedCohort, setSelectedCohort] = useState(cohortParam)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [cohortsLoading, setCohortsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/facilitator/cohorts')
      .then((r) => r.json())
      .then(({ data }) => {
        setCohorts(data ?? [])
        if (!cohortParam && data?.length > 0) setSelectedCohort(data[0].id)
      })
      .finally(() => setCohortsLoading(false))
  }, [cohortParam])

  useEffect(() => {
    if (!selectedCohort) return
    setLoading(true)
    fetch(`/api/facilitator/cohort/${selectedCohort}/students`)
      .then((r) => r.json())
      .then(({ data }) => setStudents(data ?? []))
      .finally(() => setLoading(false))
  }, [selectedCohort])

  const cohortName = cohorts.find((c) => c.id === selectedCohort)?.cohort_name ?? ''

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <div className="mb-1">
          <Link href="/facilitator" className="text-sm text-[var(--bp-muted)] hover:text-[var(--bp-text)]">← Dashboard</Link>
        </div>
        <h1 className="text-2xl font-semibold">Assessments</h1>
        <p className="text-[var(--bp-muted)] text-sm mt-0.5">Select a student to view or enter their formation scores.</p>
      </div>

      {/* Cohort picker */}
      {!cohortsLoading && cohorts.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {cohorts.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCohort(c.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selectedCohort === c.id
                  ? 'bg-[var(--bp-brown-deep)] text-white border-[var(--bp-brown-deep)]'
                  : 'bg-white text-[var(--bp-muted)] border-[var(--bp-warm)] hover:border-[var(--bp-brown)]'
              }`}
            >
              {c.cohort_name}
            </button>
          ))}
        </div>
      )}

      {cohortsLoading ? (
        <div className="text-sm text-[var(--bp-muted)] py-8 text-center">Loading cohorts…</div>
      ) : cohorts.length === 0 ? (
        <div className="bp-card p-10 text-center">
          <p className="text-[var(--bp-muted)] text-sm">You have not been assigned to any cohorts yet.</p>
        </div>
      ) : (
        <>
          {cohortName && (
            <p className="text-sm font-medium text-[var(--bp-brown-deep)]">{cohortName}</p>
          )}
          {loading ? (
            <div className="text-sm text-[var(--bp-muted)] py-8 text-center">Loading students…</div>
          ) : students.length === 0 ? (
            <div className="bp-card p-10 text-center">
              <p className="text-[var(--bp-muted)] text-sm">No students enrolled in this cohort.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {students.map((s) => {
                const capstones = [
                  s.identity_blueprint_complete,
                  s.purpose_statement_complete,
                  s.ministry_plan_complete,
                ].filter(Boolean).length

                return (
                  <Link
                    key={s.student_id}
                    href={`/facilitator/student/${s.student_id}?cohort=${selectedCohort}`}
                    className="bp-card p-4 flex items-center justify-between hover:border-[var(--bp-brown)] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{s.full_name ?? s.email}</p>
                      <p className="text-xs text-[var(--bp-muted)] mt-0.5">
                        {s.lessons_completed}/{s.lessons_total} lessons · {s.reflection_count} reflection{s.reflection_count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <div className="text-right">
                        <p className="text-xs text-[var(--bp-muted)]">Capstones</p>
                        <p className="font-semibold text-sm">{capstones}/3</p>
                      </div>
                      <span className="text-[var(--bp-brown)] text-sm">→</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function AssessmentsPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-[var(--bp-muted)]">Loading…</div>}>
      <AssessmentsContent />
    </Suspense>
  )
}
