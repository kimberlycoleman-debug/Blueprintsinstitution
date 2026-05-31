import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentUser } from '@/lib/supabase/server'

const ProgressSchema = z.object({
  lesson_id: z.string().uuid('Invalid lesson ID'),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = ProgressSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { lesson_id } = parsed.data
    const supabase = await createServerSupabaseClient()

    // Verify lesson exists
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('id', lesson_id)
      .maybeSingle()

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    // Upsert progress — mark completed
    const { error } = await supabase
      .from('progress')
      .upsert(
        {
          student_id: user.id,
          lesson_id,
          completion_status: 'completed',
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,lesson_id' }
      )

    if (error) {
      console.error('[progress] upsert error:', error.message)
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Progress saved' }, { status: 200 })
  } catch (err) {
    console.error('[progress] unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
