import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

export default async function FacilitatorDashboard() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  if (profile.role !== 'facilitator' && profile.role !== 'admin') redirect('/dashboard')

  const supabase = await createServerSupabaseClient()

  const { data: assignments } = await supabase
    .from('cohort_facilitators')
    .select(`
      role,
      cohorts (
        id, cohort_name, cohort_code, status, start_date, end_date,
        cohort_students (id, status),
        weekly_flow (id, week_number, scheduled_date, status, lessons(title))
      )
    `)
    .eq('facilitator_id', profile.id)
    .order('created_at', { ascending: false })

  const firstName = profile.full_name?.split(' ')[0] ?? 'Facilitator'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="text-overline mb-1">
          Facilitator Dashboard
        </div>
        <h1 className="text-3xl font-semibold">Welcome back, {firstName}.</h1>
        <p className="text-[var(--bp-muted)] mt-1">
          Your cohorts. Your students. Their formation.
        </p>
      </div>

      {!assignments || assignments.length === 0 ? (
        <div className="bp-card p-10 text-center">
          <p className="text-[var(--bp-muted)] mb-2">You have not been assigned to any cohorts yet.</p>
          <p className="text-sm text-[var(--bp-muted)]">An admin will assign you when a cohort is ready.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {assignments.map((a) => {
            const cohort = a.cohorts as unknown as {
              id: string
              cohort_name: string
              cohort_code: string
              status: string
              start_date: string
              end_date: string
              cohort_students: { id: string; status: string }[]
              weekly_flow: { id: string; week_number: number; scheduled_date: string; status: string; lessons: { title: string } | null }[]
            }
            if (!cohort) return null

            const activeStudents = cohort.cohort_students.filter((s) => s.status === 'active').length
            const upcoming = cohort.weekly_flow
              .filter((w) => w.status === 'scheduled' && w.scheduled_date >= new Date().toISOString().split('T')[0])
              .sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date))[0]

            const statusColors: Record<string, string> = {
              active: 'bg-green-50 text-green-700',
              upcoming: 'bg-[var(--bp-cream)] text-[var(--bp-brown)]',
              completed: 'bg-[var(--bp-warm)] text-[var(--bp-brown)]',
            }

            return (
              <div key={cohort.id} className="bp-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-semibold text-lg">{cohort.cohort_name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[cohort.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {cohort.status}
                      </span>
                      <span className="text-xs text-[var(--bp-muted)] bg-[var(--bp-cream)] px-2 py-0.5 rounded-full">
                        {a.role}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--bp-muted)]">
                      {cohort.cohort_code} · {activeStudents} active student{activeStudents !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Link href={`/facilitator/cohort/${cohort.id}`} className="bp-btn bp-btn-secondary text-sm px-4 py-2">
                    View Cohort →
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--bp-warm)]">
                  <div>
                    <p className="text-xs text-[var(--bp-muted)]">Students</p>
                    <p className="font-semibold text-xl mt-0.5">{activeStudents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--bp-muted)]">Start date</p>
                    <p className="font-semibold mt-0.5 text-sm">
                      {new Date(cohort.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--bp-muted)]">Next session</p>
                    <p className="font-semibold mt-0.5 text-sm">
                      {upcoming
                        ? new Date(upcoming.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--bp-muted)]">Next lesson</p>
                    <p className="font-semibold mt-0.5 text-sm truncate">
                      {upcoming?.lessons?.title ?? '—'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-[var(--bp-warm)]">
                  <Link href={`/facilitator/cohort/${cohort.id}`} className="text-sm text-[var(--bp-brown)] hover:underline">
                    Cohort health
                  </Link>
                  <span className="text-[var(--bp-warm)]">·</span>
                  <Link href={`/facilitator/attendance?cohort=${cohort.id}`} className="text-sm text-[var(--bp-brown)] hover:underline">
                    Attendance
                  </Link>
                  <span className="text-[var(--bp-warm)]">·</span>
                  <Link href={`/facilitator/assessments?cohort=${cohort.id}`} className="text-sm text-[var(--bp-brown)] hover:underline">
                    Assessments
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
