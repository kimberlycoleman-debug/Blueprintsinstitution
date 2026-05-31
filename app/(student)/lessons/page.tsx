import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'

export default async function LessonsPage() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')

  const supabase = await createServerSupabaseClient()

  const { data: quarters } = await supabase
    .from('quarters')
    .select(`
      id, quarter_code, name, theme, sequence,
      modules (
        id, name, module_number, sequence_in_quarter,
        lessons (id, title, description, duration_minutes, depth_level, sequence_in_module)
      )
    `)
    .order('sequence')

  const { data: progressRows } = await supabase
    .from('progress')
    .select('lesson_id, completion_status')
    .eq('student_id', profile.id)

  const progressMap = new Map(
    (progressRows ?? []).map((p) => [p.lesson_id, p.completion_status])
  )

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <div className="text-xs tracking-widest text-[var(--bp-brown)] uppercase font-semibold mb-1">
          Curriculum
        </div>
        <h1 className="text-3xl font-semibold">All Lessons</h1>
        <p className="text-[var(--bp-muted)] mt-1">
          12 months · 4 quarters · 16 modules · 80 lessons
        </p>
      </div>

      {(quarters ?? []).map((quarter) => (
        <div key={quarter.id}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold bg-[var(--bp-warm)] text-[var(--bp-brown-deep)] px-3 py-1 rounded-full">
              {quarter.quarter_code}
            </span>
            <div>
              <h2 className="font-semibold text-lg">{quarter.name}</h2>
              <p className="text-xs text-[var(--bp-muted)]">{quarter.theme}</p>
            </div>
          </div>

          <div className="space-y-4">
            {((quarter.modules ?? []) as { id: string; name: string; module_number: number; sequence_in_quarter: number; lessons: { id: string; title: string; description: string | null; duration_minutes: number | null; depth_level: string | null; sequence_in_module: number }[] }[])
              .sort((a, b) => a.sequence_in_quarter - b.sequence_in_quarter)
              .map((mod) => (
                <div key={mod.id} className="bp-card p-0 overflow-hidden">
                  <div className="px-5 py-3 bg-[var(--bp-cream)] border-b border-[var(--bp-warm)]">
                    <p className="text-sm font-semibold">
                      Module {mod.module_number}: {mod.name}
                    </p>
                  </div>
                  <div className="divide-y divide-[var(--bp-warm)]">
                    {(mod.lessons ?? [])
                      .sort((a, b) => a.sequence_in_module - b.sequence_in_module)
                      .map((lesson) => {
                        const status = progressMap.get(lesson.id) ?? 'not_started'
                        return (
                          <Link
                            key={lesson.id}
                            href={`/lessons/${lesson.id}`}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--bp-white)] transition-colors group"
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                              status === 'completed'
                                ? 'bg-[var(--bp-sage)] text-white'
                                : status === 'in_progress'
                                ? 'bg-[var(--bp-brown)] text-white'
                                : 'bg-[var(--bp-warm)] text-[var(--bp-muted)]'
                            }`}>
                              {status === 'completed' ? '✓' : lesson.sequence_in_module}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm group-hover:text-[var(--bp-brown-deep)] transition-colors truncate">
                                {lesson.title}
                              </p>
                              {lesson.description && (
                                <p className="text-xs text-[var(--bp-muted)] mt-0.5 truncate">{lesson.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              {lesson.duration_minutes && (
                                <span className="text-xs text-[var(--bp-muted)]">{lesson.duration_minutes}m</span>
                              )}
                              <span className="text-[var(--bp-muted)] group-hover:text-[var(--bp-brown-deep)]">→</span>
                            </div>
                          </Link>
                        )
                      })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
