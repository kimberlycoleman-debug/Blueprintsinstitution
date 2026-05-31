import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createServerSupabaseClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = user.id

  // Transformation Index — all checkpoints for this student (ordered by checkpoint)
  const checkpointOrder = ['baseline', 'q1_end', 'q2_end', 'q3_end', 'q4_end', 'commissioning']
  const { data: tiRecords } = await supabase
    .from('transformation_index')
    .select(`
      id,
      checkpoint,
      composite_index,
      identity_score,
      healing_score,
      calling_score,
      maturity_score,
      composite_delta,
      identity_delta,
      healing_delta,
      calling_delta,
      maturity_delta,
      sources_available,
      confidence_flag,
      computed_at
    `)
    .eq('student_id', studentId)
    .order('computed_at', { ascending: true })

  // Sort by canonical checkpoint order
  const sortedTI = (tiRecords ?? []).sort(
    (a, b) => checkpointOrder.indexOf(a.checkpoint) - checkpointOrder.indexOf(b.checkpoint)
  )
  // Latest TI record (most recent checkpoint)
  const latestTI = sortedTI.length > 0 ? sortedTI[sortedTI.length - 1] : null
  const baselineTI = sortedTI.length > 0 ? sortedTI[0] : null

  // Reflection analysis — depth scores over time (last 20)
  const { data: reflectionAnalysis } = await supabase
    .from('reflection_analysis')
    .select(`
      id,
      depth_score,
      depth_label,
      themes,
      sentiment,
      identity_language_score,
      word_count,
      analyzed_at,
      reflections (
        lesson_id,
        created_at
      )
    `)
    .eq('student_id', studentId)
    .order('analyzed_at', { ascending: false })
    .limit(20)

  const sortedReflections = [...(reflectionAnalysis ?? [])].reverse()
  const avgDepthScore = sortedReflections.length > 0
    ? Math.round(sortedReflections.reduce((sum, r) => sum + (r.depth_score ?? 0), 0) / sortedReflections.length)
    : null
  const avgIdentityLanguage = sortedReflections.length > 0
    ? Math.round(sortedReflections.reduce((sum, r) => sum + (r.identity_language_score ?? 0), 0) / sortedReflections.length)
    : null

  // Engagement events — summary counts by type (last 90 days)
  const since90 = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  const { data: engagementEvents } = await supabase
    .from('engagement_events')
    .select('event_type, occurred_at')
    .eq('user_id', studentId)
    .gte('occurred_at', since90)
    .order('occurred_at', { ascending: false })

  const eventCounts: Record<string, number> = {}
  for (const e of engagementEvents ?? []) {
    eventCounts[e.event_type] = (eventCounts[e.event_type] ?? 0) + 1
  }

  // Active days streak (consecutive days with any event, going back from today)
  const activeDays = new Set(
    (engagementEvents ?? []).map(e => new Date(e.occurred_at).toDateString())
  )
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 90; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (activeDays.has(d.toDateString())) {
      streak++
    } else {
      break
    }
  }

  // Progress — lessons completed + total
  const { data: progressRows } = await supabase
    .from('progress')
    .select('status')
    .eq('student_id', studentId)

  const lessonsCompleted = (progressRows ?? []).filter(p => p.status === 'completed').length
  const totalLessons = progressRows?.length ?? 0

  // Capstone completion status
  const [{ data: ibRow }, { data: psRow }, { data: mpRow }] = await Promise.all([
    supabase.from('identity_blueprints').select('is_complete').eq('student_id', studentId).maybeSingle(),
    supabase.from('purpose_statements').select('is_complete').eq('student_id', studentId).maybeSingle(),
    supabase.from('ministry_plans').select('is_complete').eq('student_id', studentId).maybeSingle(),
  ])

  // Reflection count
  const { count: reflectionCount } = await supabase
    .from('reflections')
    .select('id', { count: 'exact', head: true })
    .eq('student_id', studentId)

  return NextResponse.json({
    transformationIndex: {
      records: sortedTI,
      latest: latestTI,
      baseline: baselineTI,
      gain: latestTI && baselineTI
        ? (latestTI.composite_index ?? 0) - (baselineTI.composite_index ?? 0)
        : null,
    },
    reflectionAnalysis: {
      records: sortedReflections,
      avgDepthScore,
      avgIdentityLanguage,
      totalAnalyzed: sortedReflections.length,
    },
    engagement: {
      eventCounts,
      streak,
      activeDaysLast90: activeDays.size,
    },
    progress: {
      lessonsCompleted,
      totalLessons,
      reflectionCount: reflectionCount ?? 0,
      identityBlueprintComplete: ibRow?.is_complete ?? false,
      purposeStatementComplete: psRow?.is_complete ?? false,
      ministryPlanComplete: mpRow?.is_complete ?? false,
    },
  })
}
