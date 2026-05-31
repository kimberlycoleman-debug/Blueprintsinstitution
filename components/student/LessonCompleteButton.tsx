'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LessonCompleteButton({
  lessonId,
  isCompleted,
}: {
  lessonId: string
  isCompleted: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(isCompleted)

  async function markComplete() {
    if (done) return
    setLoading(true)
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson_id: lessonId }),
    })
    setLoading(false)
    if (res.ok) {
      setDone(true)
      router.refresh()
    }
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 text-[var(--bp-sage)] font-semibold">
        <span className="w-6 h-6 rounded-full bg-[var(--bp-sage)] text-white flex items-center justify-center text-sm">✓</span>
        Lesson Complete
      </div>
    )
  }

  return (
    <button
      onClick={markComplete}
      disabled={loading}
      className="bp-btn bp-btn-primary disabled:opacity-40"
    >
      {loading ? 'Saving…' : 'Mark as Complete'}
    </button>
  )
}
