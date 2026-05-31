import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentUser } from '@/lib/supabase/server'

const PostSchema = z.object({
  post_type: z.enum(['reflection_share', 'prayer_request', 'celebration', 'question', 'announcement', 'resource_share']),
  title: z.string().max(200).nullable().optional(),
  content: z.string().min(1, 'Content is required').max(5000),
})

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createServerSupabaseClient()

  // Get student's active cohort
  const { data: membership } = await supabase
    .from('cohort_students')
    .select('cohort_id, cohorts (cohort_name)')
    .eq('student_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  if (!membership) {
    return NextResponse.json({ no_cohort: true })
  }

  const cohortRaw = membership.cohorts as unknown as { cohort_name: string }[] | { cohort_name: string } | null
  const cohort = Array.isArray(cohortRaw) ? cohortRaw[0] ?? null : cohortRaw

  // Fetch posts with author info and response counts
  const { data: posts, error } = await supabase
    .from('cohort_posts')
    .select(`
      id, post_type, title, content, is_pinned, created_at, author_id, cohort_id,
      profiles (full_name, email),
      cohort_post_responses (id)
    `)
    .eq('cohort_id', membership.cohort_id)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: 'Failed to load cohort posts' }, { status: 500 })
  }

  return NextResponse.json({
    data: posts,
    cohort_name: cohort?.cohort_name ?? null,
  })
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = PostSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? 'Invalid request'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()

  // Verify student belongs to a cohort
  const { data: membership } = await supabase
    .from('cohort_students')
    .select('cohort_id')
    .eq('student_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  if (!membership) {
    return NextResponse.json({ error: 'You are not assigned to a cohort' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('cohort_posts')
    .insert({
      cohort_id: membership.cohort_id,
      author_id: user.id,
      post_type: parsed.data.post_type,
      title: parsed.data.title ?? null,
      content: parsed.data.content,
    })
    .select(`
      id, post_type, title, content, is_pinned, created_at, author_id, cohort_id,
      profiles (full_name, email),
      cohort_post_responses (id)
    `)
    .single()

  if (error) {
    console.error('[cohort/posts] insert error:', error.message)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
