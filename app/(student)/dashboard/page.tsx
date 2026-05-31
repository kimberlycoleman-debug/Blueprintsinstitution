import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

const QUARTER_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Q1: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
  Q2: { bg: 'bg-sage-50', border: 'border-green-200', text: 'text-green-800' },
  Q3: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
  Q4: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800' },
}

const PILLAR_LETTERS = ['B', 'L', 'U', 'E', 'P', 'R', 'I', 'N', 'T', 'S']

export default async function DashboardPage() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')

  // Role-based routing
  if (profile.role === 'founder') redirect('/founder')
  if (profile.role === 'admin') redirect('/admin')
  if (profile.role === 'facilitator') redirect('/facilitator')

  // Redirect new students to complete onboarding wizard
  if (profile.onboarding_complete === false) redirect('/onboarding')

  const supabase = await createServerSupabaseClient()

  // Fetch quarters + modules + lesson counts
  const { data: quarters } = await supabase
    .from('quarters')
    .select(`
      id, quarter_code, name, theme, sequence,
      modules (
        id, name, module_number, sequence_in_quarter,
        lessons (id)
      )
    `)
    .order('sequence')

  // Fetch student's progress
  const { data: progressRows } = await supabase
    .from('progress')
    .select('lesson_id, completion_status')
    .eq('student_id', profile.id)

  // Fetch student's cohort
  const { data: cohortMembership } = await supabase
    .from('cohort_students')
    .select(`
      cohort_id,
      cohorts (cohort_name, status, start_date, end_date)
    `)
    .eq('student_id', profile.id)
    .eq('status', 'active')
    .maybeSingle()

  // Fetch next upcoming lesson from weekly flow
  const { data: nextSession } = await supabase
    .from('weekly_flow')
    .select(`
      week_number, scheduled_date, delivery_mode,
      lessons (id, name, description, modules (name, quarters (quarter_code, name)))
    `)
    .eq('cohort_id', cohortMembership?.cohort_id ?? '00000000-0000-0000-0000-000000000000')
    .eq('status', 'scheduled')
    .gte('scheduled_date', new Date().toISOString().split('T')[0])
    .order('scheduled_date')
    .limit(1)
    .maybeSingle()

  // Compute progress stats
  const completedIds = new Set(
    (progressRows ?? [])
      .filter((p) => p.completion_status === 'completed')
      .map((p) => p.lesson_id)
  )

  const allLessons = (quarters ?? []).flatMap((q) =>
    (q.modules ?? []).flatMap((m) => m.lessons ?? [])
  )
  const totalLessons = allLessons.length
  const completedCount = allLessons.filter((l) => completedIds.has(l.id)).length
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const firstName = profile.full_name?.split(' ')[0] ?? 'Friend'

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Greeting */}
      <div>
        <div className="text-xs tracking-widest text-[var(--bp-brown)] uppercase font-semibold mb-1">
          Formation Dashboard
        </div>
        <h1 className="text-3xl font-semibold">Welcome back, {firstName}.</h1>
        <p className="text-[var(--bp-muted)] mt-1">
          You are becoming who you were always meant to be.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bp-card p-6">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-sm font-semibold">12-Month Journey</p>
            <p className="text-xs text-[var(--bp-muted)] mt-0.5">
              {completedCount} of {totalLessons} lessons complete
            </p>
          </div>
          <span className="text-2xl font-semibold text-[var(--bp-brown-deep)]">{progressPct}%</span>
        </div>
        <div className="bp-progress">
          <div className="bp-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Pillar letters */}
        <div className="flex gap-1 mt-4">
          {PILLAR_LETTERS.map((letter, i) => {
            const threshold = (i / PILLAR_LETTERS.length) * 100
            const active = progressPct >= threshold
            return (
              <div
                key={letter}
                className={`flex-1 h-7 rounded flex items-center justify-center text-xs font-bold transition-all ${
                  active
                    ? 'bg-[var(--bp-brown-deep)] text-white'
                    : 'bg-[var(--bp-warm)] text-[var(--bp-muted)]'
                }`}
              >
                {letter}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Next Session */}
        <div className="bp-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--bp-brown)] mb-4">
            This Week
          </p>
          {nextSession ? (
            <div>
              <p className="text-xs text-[var(--bp-muted)] mb-1">
                Week {nextSession.week_number} · {nextSession.delivery_mode}
              </p>
              <h3 className="font-semibold text-lg mb-1">
                {(nextSession.lessons as unknown as { name: string } | null)?.name ?? 'Upcoming Lesson'}
              </h3>
              <p className="text-sm text-[var(--bp-muted)] mb-4">
                {new Date(nextSession.scheduled_date).toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric'
                })}
              </p>
              <Link
                href={`/lessons/${(nextSession.lessons as unknown as { id: string } | null)?.id}`}
                className="bp-btn bp-btn-primary text-sm px-5 py-2.5"
              >
                Go to Lesson →
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-[var(--bp-muted)] text-sm mb-4">
                No session scheduled yet. Your cohort will be assigned soon.
              </p>
              <Link href="/lessons" className="bp-btn bp-btn-secondary text-sm px-5 py-2.5">
                Browse Lessons
              </Link>
            </div>
          )}
        </div>

        {/* Cohort Card */}
        <div className="bp-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--bp-brown)] mb-4">
            My Cohort
          </p>
          {cohortMembership?.cohorts ? (
            <div>
              <h3 className="font-semibold text-lg mb-1">
              {(cohortMembership.cohorts as unknown as { cohort_name: string }).cohort_name}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Active
            </div>
            <p className="text-sm text-[var(--bp-muted)] mb-4">
              {(cohortMembership.cohorts as unknown as { start_date: string }).start_date
                ? `Started ${new Date((cohortMembership.cohorts as unknown as { start_date: string }).start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                  : 'Formation in progress'}
              </p>
              <Link href="/cohort" className="bp-btn bp-btn-secondary text-sm px-5 py-2.5">
                Cohort Space →
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-[var(--bp-muted)] text-sm">
                You haven&apos;t been assigned to a cohort yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Capstone progress */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--bp-brown)] mb-4">
          Capstone Deliverables
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Identity Blueprint',
              quarter: 'Q1',
              complete: profile.identity_blueprint_complete,
              href: '/identity-blueprint',
              desc: 'Who you are in Christ',
            },
            {
              label: 'Purpose Statement',
              quarter: 'Q4',
              complete: profile.purpose_statement_complete,
              href: '/purpose-statement',
              desc: 'Your kingdom assignment',
            },
            {
              label: 'Ministry Launch Plan',
              quarter: 'Q4',
              complete: profile.ministry_plan_complete,
              href: '/ministry-plan',
              desc: 'Your calling in action',
            },
          ].map((cap) => (
            <Link key={cap.label} href={cap.href}>
              <div className={`bp-card bp-card-interactive p-5 h-full ${cap.complete ? 'border-2 border-[var(--bp-sage)]' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-[var(--bp-brown)]">{cap.quarter}</span>
                  {cap.complete && (
                    <span className="text-xs bg-[var(--bp-sage)] text-white px-2 py-0.5 rounded-full">
                      Complete
                    </span>
                  )}
                </div>
                <p className="font-semibold mb-1">{cap.label}</p>
                <p className="text-xs text-[var(--bp-muted)]">{cap.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quarter overview */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--bp-brown)] mb-4">
          Curriculum Overview
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {(quarters ?? []).map((quarter) => {
            const qLessons = (quarter.modules ?? []).flatMap((m) => m.lessons ?? [])
            const qCompleted = qLessons.filter((l) => completedIds.has(l.id)).length
            const qPct = qLessons.length > 0 ? Math.round((qCompleted / qLessons.length) * 100) : 0
            const colors = QUARTER_COLORS[quarter.quarter_code] ?? QUARTER_COLORS.Q1

            return (
              <div key={quarter.id} className={`bp-card p-5 border ${colors.border}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                    {quarter.quarter_code}
                  </span>
                  <span className="text-sm font-semibold text-[var(--bp-muted)]">{qPct}%</span>
                </div>
                <h3 className="font-semibold mb-0.5">{quarter.name}</h3>
                <p className="text-xs text-[var(--bp-muted)] mb-3">{quarter.theme}</p>
                <div className="space-y-1">
                  {(quarter.modules ?? []).map((mod) => (
                    <div key={mod.id} className="text-xs text-[var(--bp-muted)] flex gap-2">
                      <span className="font-medium text-[var(--bp-text)]">M{mod.module_number}</span>
                      {mod.name}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
