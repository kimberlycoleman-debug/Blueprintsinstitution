import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'
import LessonCompleteButton from '@/components/student/LessonCompleteButton'
import { TrackPageView } from '@/components/analytics/TrackPageView'

interface PageProps {
  params: Promise<{ lesson_id: string }>
}

export default async function LessonPage({ params }: PageProps) {
  const { lesson_id } = await params
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')

  const supabase = await createServerSupabaseClient()

  // Fetch full lesson with all related content
  const { data: lesson } = await supabase
    .from('lessons')
    .select(`
      id, title, description, duration_minutes, depth_level, category,
      modules (id, name, module_number, quarters (quarter_code, name, theme)),
      lesson_objectives (objective_number, objective_text, bloom_verb),
      lesson_scriptures (reference, full_text, translation, is_primary, sequence),
      lesson_activations (
        id, title, purpose, duration_minutes,
        activation_steps (step_number, title, instructions, duration_minutes, materials_needed)
      ),
      lesson_discussions (group_type, question_number, question_text, facilitator_notes),
      lesson_workbook_elements (id, title, element_type, instructions, sequence)
    `)
    .eq('id', lesson_id)
    .maybeSingle()

  if (!lesson) notFound()

  // Fetch student progress on this lesson
  const { data: progressRow } = await supabase
    .from('progress')
    .select('completion_status, qualitative_status, completed_at')
    .eq('student_id', profile.id)
    .eq('lesson_id', lesson_id)
    .maybeSingle()

  // Fetch student reflections for this lesson
  const { data: reflections } = await supabase
    .from('reflections')
    .select('id, prompt, response, ai_response, created_at')
    .eq('student_id', profile.id)
    .eq('lesson_id', lesson_id)
    .order('created_at', { ascending: true })

  // Mark as in_progress if not already started
  if (!progressRow) {
    await supabase.from('progress').insert({
      student_id: profile.id,
      lesson_id: lesson_id,
      completion_status: 'in_progress',
    })
  }

  type ModuleShape = { name: string; module_number: number; quarters: { quarter_code: string; name: string; theme: string }[] }
  const moduleRaw = lesson.modules as unknown as ModuleShape[] | ModuleShape | null
  const module = Array.isArray(moduleRaw) ? moduleRaw[0] ?? null : moduleRaw
  const quarter = module?.quarters?.[0] ?? null
  const scriptures = ((lesson.lesson_scriptures ?? []) as { reference: string; full_text: string | null; translation: string | null; is_primary: boolean; sequence: number }[])
    .sort((a, b) => a.sequence - b.sequence)
  const objectives = ((lesson.lesson_objectives ?? []) as { objective_number: number; objective_text: string; bloom_verb: string | null }[])
    .sort((a, b) => a.objective_number - b.objective_number)
  const activation = (lesson.lesson_activations as { id: string; title: string; purpose: string | null; duration_minutes: number | null; activation_steps: { step_number: number; title: string | null; instructions: string; duration_minutes: number | null; materials_needed: string | null }[] }[] | null)?.[0]
  const discussions = ((lesson.lesson_discussions ?? []) as { group_type: string; question_number: number; question_text: string; facilitator_notes: string | null }[])
    .sort((a, b) => a.question_number - b.question_number)
  const workbook = ((lesson.lesson_workbook_elements ?? []) as { id: string; title: string; element_type: string; instructions: string | null; sequence: number }[])
    .sort((a, b) => a.sequence - b.sequence)

  const isCompleted = progressRow?.completion_status === 'completed'

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <TrackPageView
        eventType="lesson_view"
        resourceType="lesson"
        resourceId={lesson_id}
        metadata={{ lesson_title: lesson.title }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--bp-muted)]">
        <Link href="/dashboard" className="hover:text-[var(--bp-text)]">Dashboard</Link>
        <span>/</span>
        <Link href="/lessons" className="hover:text-[var(--bp-text)]">Lessons</Link>
        <span>/</span>
        <span className="text-[var(--bp-text)]">{lesson.title}</span>
      </nav>

      {/* Lesson Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          {quarter && (
            <span className="text-xs font-semibold bg-[var(--bp-warm)] text-[var(--bp-brown-deep)] px-3 py-1 rounded-full">
              {quarter.quarter_code} · {quarter.name}
            </span>
          )}
          {module && (
            <span className="text-xs text-[var(--bp-muted)]">
              Module {module.module_number}: {module.name}
            </span>
          )}
          {isCompleted && (
            <span className="text-xs bg-[var(--bp-sage)] text-white px-3 py-1 rounded-full ml-auto">
              ✓ Complete
            </span>
          )}
        </div>
        <h1 className="text-3xl font-semibold mb-2">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-[var(--bp-muted)] text-base">{lesson.description}</p>
        )}
        <div className="flex gap-4 mt-3 text-xs text-[var(--bp-muted)]">
          {lesson.duration_minutes && <span>{lesson.duration_minutes} min</span>}
          {lesson.depth_level && <span className="capitalize">{lesson.depth_level.replace('_', ' ')}</span>}
        </div>
      </div>

      {/* Scriptures */}
      {scriptures.length > 0 && (
        <div className="bp-mandate">
          <div className="bp-mandate-label">Key Scripture{scriptures.length > 1 ? 's' : ''}</div>
          <div className="space-y-4">
            {scriptures.map((s, i) => (
              <div key={i}>
                {s.full_text && (
                  <p className="bp-mandate-text">&ldquo;{s.full_text}&rdquo;</p>
                )}
                <p className="text-xs text-[var(--bp-muted)] mt-1">
                  — {s.reference} {s.translation ? `(${s.translation})` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Objectives */}
      {objectives.length > 0 && (
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-4">What You&apos;ll Learn</h2>
          <ul className="space-y-2">
            {objectives.map((obj) => (
              <li key={obj.objective_number} className="flex gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-[var(--bp-warm)] flex items-center justify-center text-xs font-semibold text-[var(--bp-brown-deep)] flex-shrink-0 mt-0.5">
                  {obj.objective_number}
                </span>
                <span>
                  {obj.bloom_verb && (
                    <span className="font-medium text-[var(--bp-brown)]">{obj.bloom_verb} </span>
                  )}
                  {obj.objective_text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Activation Exercise */}
      {activation && (
        <div className="bp-card p-6 border-l-4 border-[var(--bp-brown)]">
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-semibold">Activation Exercise</h2>
            {activation.duration_minutes && (
              <span className="text-xs text-[var(--bp-muted)]">{activation.duration_minutes} min</span>
            )}
          </div>
          <h3 className="text-lg font-medium mb-1">{activation.title}</h3>
          {activation.purpose && (
            <p className="text-sm text-[var(--bp-muted)] mb-4">{activation.purpose}</p>
          )}
          {activation.activation_steps?.length > 0 && (
            <div className="space-y-4 mt-4">
              {activation.activation_steps
                .sort((a, b) => a.step_number - b.step_number)
                .map((step) => (
                  <div key={step.step_number} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-[var(--bp-brown-deep)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {step.step_number}
                    </div>
                    <div className="flex-1">
                      {step.title && <p className="font-medium text-sm mb-1">{step.title}</p>}
                      <p className="text-sm text-[var(--bp-text)]">{step.instructions}</p>
                      {step.materials_needed && (
                        <p className="text-xs text-[var(--bp-muted)] mt-1 italic">Materials: {step.materials_needed}</p>
                      )}
                      {step.duration_minutes && (
                        <p className="text-xs text-[var(--bp-muted)] mt-1">{step.duration_minutes} min</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Discussion Questions */}
      {discussions.length > 0 && (
        <div className="bp-card p-6">
          <h2 className="font-semibold mb-4">Discussion Questions</h2>
          <div className="space-y-4">
            {discussions.map((q) => (
              <div key={q.question_number} className="flex gap-3">
                <span className="text-[var(--bp-brown)] font-bold text-sm mt-0.5">{q.question_number}.</span>
                <div>
                  <p className="text-sm">{q.question_text}</p>
                  {q.group_type !== 'large_group' && (
                    <span className="text-xs text-[var(--bp-muted)] mt-1 inline-block capitalize">
                      {q.group_type.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workbook */}
      {workbook.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold">Your Workbook</h2>
          {workbook.map((elem) => (
            <div key={elem.id} className="bp-card p-6 bg-[var(--bp-cream)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--bp-brown)]">
                  {elem.element_type.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="font-medium mb-2">{elem.title}</p>
              {elem.instructions && (
                <p className="text-sm text-[var(--bp-muted)] mb-4">{elem.instructions}</p>
              )}
              <Link
                href={`/reflections?lesson=${lesson_id}&element=${elem.id}`}
                className="bp-btn bp-btn-secondary text-sm px-4 py-2"
              >
                Write Reflection →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Existing Reflections */}
      {(reflections ?? []).length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold">Your Reflections</h2>
          {(reflections ?? []).map((r) => (
            <div key={r.id} className="bp-card p-6">
              {r.prompt && (
                <p className="text-xs text-[var(--bp-muted)] italic mb-2">&ldquo;{r.prompt}&rdquo;</p>
              )}
              <p className="text-sm mb-3 whitespace-pre-wrap">{r.response}</p>
              {r.ai_response && (
                <div className="bg-[var(--bp-cream)] rounded-xl p-4 mt-3">
                  <p className="text-xs font-semibold text-[var(--bp-brown)] mb-1">Formation Companion</p>
                  <p className="text-sm text-[var(--bp-text)]">{r.ai_response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Complete + Navigation */}
      <div className="bp-card p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <p className="font-medium">Ready to mark this lesson complete?</p>
          <p className="text-sm text-[var(--bp-muted)]">Your progress will be saved to your journey.</p>
        </div>
        <LessonCompleteButton lessonId={lesson_id} isCompleted={isCompleted} />
      </div>

    </div>
  )
}
