'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const STATUS_OPTIONS = ['present', 'absent', 'late', 'excused'] as const
type AttendanceStatus = typeof STATUS_OPTIONS[number]

interface WeeklySession {
  id: string
  week_number: number
  scheduled_date: string
  status: string
  lessons: { title: string } | null
  cohort_id: string
  cohort_name: string
}

interface Student {
  student_id: string
  full_name: string | null
  email: string
}

interface AttendanceRecord {
  student_id: string
  status: AttendanceStatus
  notes: string
}

const STATUS_STYLE: Record<AttendanceStatus, string> = {
  present: 'bg-green-100 text-green-800 border-green-300',
  absent: 'bg-red-100 text-red-800 border-red-300',
  late: 'bg-[var(--bp-cream)] text-[var(--bp-brown-deep)] border-[var(--bp-sand)]',
  excused: 'bg-blue-100 text-blue-800 border-blue-300',
}

export default function AttendancePage() {
  const searchParams = useSearchParams()
  const cohortParam = searchParams.get('cohort') ?? ''

  const [sessions, setSessions] = useState<WeeklySession[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedSession, setSelectedSession] = useState<string>('')
  const [existing, setExisting] = useState<Record<string, AttendanceStatus>>({})
  const [records, setRecords] = useState<Record<string, AttendanceRecord>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loadingSessions, setLoadingSessions] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(false)

  // Load cohort sessions
  useEffect(() => {
    if (!cohortParam) return
    fetch(`/api/facilitator/cohort/${cohortParam}/sessions`)
      .then((r) => r.json())
      .then(({ data }) => {
        setSessions(data ?? [])
        // Auto-select most recent past/today session
        const today = new Date().toISOString().split('T')[0]
        const best = (data ?? [])
          .filter((s: WeeklySession) => s.scheduled_date <= today)
          .sort((a: WeeklySession, b: WeeklySession) => b.scheduled_date.localeCompare(a.scheduled_date))[0]
        if (best) setSelectedSession(best.id)
        setLoadingSessions(false)
      })
      .catch(() => setLoadingSessions(false))
  }, [cohortParam])

  // Load students when cohort changes
  useEffect(() => {
    if (!cohortParam) return
    setLoadingStudents(true)
    fetch(`/api/facilitator/cohort/${cohortParam}/students`)
      .then((r) => r.json())
      .then(({ data }) => {
        setStudents(data ?? [])
        // Initialize all as present
        const init: Record<string, AttendanceRecord> = {}
        for (const s of data ?? []) {
          init[s.student_id] = { student_id: s.student_id, status: 'present', notes: '' }
        }
        setRecords(init)
        setLoadingStudents(false)
      })
      .catch(() => setLoadingStudents(false))
  }, [cohortParam])

  // Load existing attendance when session is selected
  useEffect(() => {
    if (!selectedSession) return
    fetch(`/api/facilitator/attendance?weekly_flow_id=${selectedSession}`)
      .then((r) => r.json())
      .then(({ data }) => {
        const ex: Record<string, AttendanceStatus> = {}
        for (const row of data ?? []) {
          ex[row.student_id] = row.status
        }
        setExisting(ex)
        // Merge existing into records
        setRecords((prev) => {
          const merged = { ...prev }
          for (const [sid, status] of Object.entries(ex)) {
            if (merged[sid]) merged[sid] = { ...merged[sid], status }
          }
          return merged
        })
      })
  }, [selectedSession])

  const toggleStatus = (student_id: string, status: AttendanceStatus) => {
    setRecords((prev) => ({
      ...prev,
      [student_id]: { ...prev[student_id], student_id, status },
    }))
  }

  const updateNote = (student_id: string, note: string) => {
    setNotes((prev) => ({ ...prev, [student_id]: note }))
    setRecords((prev) => ({
      ...prev,
      [student_id]: { ...prev[student_id], notes: note },
    }))
  }

  const handleSave = async () => {
    if (!selectedSession) return
    setSaving(true)
    const res = await fetch('/api/facilitator/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        weekly_flow_id: selectedSession,
        records: Object.values(records),
      }),
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const selectedSessionData = sessions.find((s) => s.id === selectedSession)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--bp-muted)]">
        <Link href="/facilitator" className="hover:text-[var(--bp-text)]">Dashboard</Link>
        <span>/</span>
        {cohortParam && (
          <>
            <Link href={`/facilitator/cohort/${cohortParam}`} className="hover:text-[var(--bp-text)]">Cohort</Link>
            <span>/</span>
          </>
        )}
        <span className="text-[var(--bp-text)]">Attendance</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold">Attendance</h1>
        <p className="text-[var(--bp-muted)] mt-1 text-sm">Mark attendance for a session. Changes are saved immediately.</p>
      </div>

      {/* Session selector */}
      <div className="bp-card p-5">
        <label className="block text-sm font-medium mb-2">Session</label>
        {loadingSessions ? (
          <div className="text-sm text-[var(--bp-muted)]">Loading sessions…</div>
        ) : sessions.length === 0 ? (
          <div className="text-sm text-[var(--bp-muted)]">No sessions found for this cohort.</div>
        ) : (
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="bp-input w-full"
          >
            <option value="">— Select a session —</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                Week {s.week_number} · {new Date(s.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {s.lessons?.title ? ` — ${s.lessons.title}` : ''}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Attendance list */}
      {selectedSession && !loadingStudents && (
        <div className="space-y-3">
          {students.length === 0 ? (
            <div className="bp-card p-8 text-center text-[var(--bp-muted)] text-sm">No active students.</div>
          ) : (
            <>
              {/* Quick all-present/all-absent shortcuts */}
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setRecords((prev) => {
                    const r = { ...prev }
                    for (const k of Object.keys(r)) r[k] = { ...r[k], status: 'present' }
                    return r
                  })}
                  className="text-xs bp-btn bp-btn-ghost px-3 py-1.5"
                >
                  Mark all present
                </button>
                <button
                  onClick={() => setRecords((prev) => {
                    const r = { ...prev }
                    for (const k of Object.keys(r)) r[k] = { ...r[k], status: 'absent' }
                    return r
                  })}
                  className="text-xs bp-btn bp-btn-ghost px-3 py-1.5"
                >
                  Mark all absent
                </button>
                <span className="ml-auto text-xs text-[var(--bp-muted)] self-center">
                  {Object.values(records).filter((r) => r.status === 'present').length} present ·{' '}
                  {Object.values(records).filter((r) => r.status === 'absent').length} absent
                </span>
              </div>

              {students.map((student) => {
                const record = records[student.student_id]
                const status = record?.status ?? 'present'
                const wasExisting = existing[student.student_id]

                return (
                  <div key={student.student_id} className="bp-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{student.full_name ?? student.email}</p>
                        {wasExisting && (
                          <p className="text-xs text-[var(--bp-muted)]">Previously: {wasExisting}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => toggleStatus(student.student_id, s)}
                            className={`text-xs px-2.5 py-1 rounded-lg border capitalize transition-colors ${
                              status === s
                                ? STATUS_STYLE[s]
                                : 'bg-white text-[var(--bp-muted)] border-[var(--bp-warm)] hover:border-[var(--bp-brown)]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    {(status === 'late' || status === 'excused' || status === 'absent') && (
                      <input
                        type="text"
                        value={notes[student.student_id] ?? ''}
                        onChange={(e) => updateNote(student.student_id, e.target.value)}
                        placeholder="Add note (optional)…"
                        className="bp-input w-full text-sm mt-1"
                      />
                    )}
                  </div>
                )
              })}

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving || !selectedSession}
                  className="bp-btn bp-btn-primary px-6 py-2.5 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save attendance'}
                </button>
                {saved && <span className="text-sm text-green-600">Attendance saved ✓</span>}
              </div>
            </>
          )}
        </div>
      )}

      {!selectedSession && !loadingSessions && sessions.length > 0 && (
        <div className="bp-card p-8 text-center text-[var(--bp-muted)] text-sm">
          Select a session above to begin marking attendance.
        </div>
      )}
    </div>
  )
}
