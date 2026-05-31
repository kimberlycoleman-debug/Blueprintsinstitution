// ─────────────────────────────────────────────────────────────
// ENGAGEMENT TRACKING
// Powers the analytics foundation — every meaningful student
// action is captured here and feeds the at-risk detection,
// engagement dashboards, and Transformation Index pipeline.
// ─────────────────────────────────────────────────────────────

import { createBrowserSupabaseClient } from '@/lib/supabase/browser'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export type EngagementEventType =
  | 'login'
  | 'lesson_view'
  | 'lesson_complete'
  | 'reflection_start'
  | 'reflection_submit'
  | 'cohort_post'
  | 'cohort_response'
  | 'assessment_start'
  | 'assessment_complete'
  | 'capstone_start'
  | 'capstone_submit'
  | 'resource_view'
  | 'ai_conversation_start'
  | 'ai_message_sent'
  | 'application_start'
  | 'application_submit'

export interface TrackOptions {
  resourceType?: string
  resourceId?: string
  cohortId?: string
  durationSeconds?: number
  pageDepthPct?: number
  metadata?: Record<string, unknown>
}

// ─────────────────────────────────────────────────────────────
// Client-side tracker
// Call from browser components (event handlers, useEffect, etc.)
// Fire-and-forget — errors are silent to never disrupt UX.
// ─────────────────────────────────────────────────────────────

export async function track(
  eventType: EngagementEventType,
  options: TrackOptions = {}
): Promise<void> {
  try {
    const supabase = createBrowserSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('engagement_events').insert({
      user_id: user.id,
      event_type: eventType,
      resource_type: options.resourceType ?? null,
      resource_id: options.resourceId ?? null,
      cohort_id: options.cohortId ?? null,
      duration_seconds: options.durationSeconds ?? null,
      page_depth_pct: options.pageDepthPct ?? null,
      metadata: options.metadata ?? {},
    })
  } catch {
    // Silent — tracking must never break the app
  }
}

// ─────────────────────────────────────────────────────────────
// Server-side tracker
// Call from Server Components, API routes, and Server Actions.
// ─────────────────────────────────────────────────────────────

export async function trackServer(
  eventType: EngagementEventType,
  options: TrackOptions = {}
): Promise<void> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('engagement_events').insert({
      user_id: user.id,
      event_type: eventType,
      resource_type: options.resourceType ?? null,
      resource_id: options.resourceId ?? null,
      cohort_id: options.cohortId ?? null,
      duration_seconds: options.durationSeconds ?? null,
      page_depth_pct: options.pageDepthPct ?? null,
      metadata: options.metadata ?? {},
    })
  } catch {
    // Silent
  }
}

// ─────────────────────────────────────────────────────────────
// Timer utility
// Measures time spent on a page/resource.
// Usage:
//   const stop = startTimer()
//   // ... user does something ...
//   const seconds = stop()
//   track('lesson_view', { durationSeconds: seconds, ... })
// ─────────────────────────────────────────────────────────────

export function startTimer(): () => number {
  const start = Date.now()
  return () => Math.round((Date.now() - start) / 1000)
}
