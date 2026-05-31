'use client'

import { useEffect, useRef } from 'react'
import { track, startTimer, type EngagementEventType, type TrackOptions } from '@/lib/analytics/track'

interface TrackPageViewProps {
  eventType?: EngagementEventType
  resourceType?: string
  resourceId?: string
  cohortId?: string
  metadata?: Record<string, unknown>
}

// ─────────────────────────────────────────────────────────────
// Drop-in page-view tracker.
// Place once at the top of any student page/layout to capture:
//   1. A view event on mount
//   2. Duration (time spent) on unmount
//
// Usage:
//   <TrackPageView
//     eventType="lesson_view"
//     resourceType="lesson"
//     resourceId={lesson.id}
//     cohortId={cohortId}
//   />
// ─────────────────────────────────────────────────────────────

export function TrackPageView({
  eventType = 'lesson_view',
  resourceType,
  resourceId,
  cohortId,
  metadata,
}: TrackPageViewProps) {
  const stopTimer = useRef<(() => number) | null>(null)

  useEffect(() => {
    const options: TrackOptions = {
      resourceType,
      resourceId,
      cohortId,
      metadata,
    }

    // Fire view event immediately
    track(eventType, options)

    // Start duration timer
    stopTimer.current = startTimer()

    // On unmount: fire with duration
    return () => {
      if (stopTimer.current) {
        const durationSeconds = stopTimer.current()
        if (durationSeconds > 2) {
          // Only log if they spent more than 2 seconds — filters accidental navigations
          track(eventType, { ...options, durationSeconds })
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceId])

  // Renders nothing — purely behavioral
  return null
}
