// ─────────────────────────────────────────────────────────────
// SERVER-SIDE ENGAGEMENT TRACKER
// Import ONLY from Server Components, API routes, Server Actions.
// Never import this in client components — it uses next/headers.
// ─────────────────────────────────────────────────────────────

import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { EngagementEventType, TrackOptions } from './track'

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
    // Silent — tracking must never break the app
  }
}
