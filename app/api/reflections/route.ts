import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentUser } from '@/lib/supabase/server'
import { getOpenAIClient, DEFAULT_MODEL } from '@/lib/ai/client'
import { REFLECTION_COMPANION_PROMPT } from '@/lib/ai/prompts'

const ReflectionSchema = z.object({
  lesson_id: z.string().uuid(),
  response: z.string().min(10, 'Please write at least a sentence'),
  prompt: z.string().optional(),
  workbook_element_id: z.string().uuid().optional(),
  is_private: z.boolean().default(true),
  shared_with_facilitator: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = ReflectionSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? 'Invalid request'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const data = parsed.data
    const supabase = await createServerSupabaseClient()

    // Fetch lesson title for context
    const { data: lesson } = await supabase
      .from('lessons')
      .select('title, modules (name, quarters (name))')
      .eq('id', data.lesson_id)
      .maybeSingle()

    // Generate AI companion response
    let aiResponse: string | null = null
    try {
      const openai = getOpenAIClient()
      const moduleRaw = lesson?.modules as unknown as { name: string }[] | { name: string } | null
      const moduleName = (Array.isArray(moduleRaw) ? moduleRaw[0] : moduleRaw)?.name
      const context = lesson
        ? `The student is reflecting on a lesson titled "${lesson.title}"${moduleName ? ` from the module "${moduleName}"` : ''}.`
        : ''

      const userMessage = data.prompt
        ? `Reflection prompt: "${data.prompt}"\n\nStudent's response: ${data.response}`
        : data.response

      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: REFLECTION_COMPANION_PROMPT },
          { role: 'user', content: `${context}\n\n${userMessage}` },
        ],
        max_tokens: 300,
        temperature: 0.7,
      })

      aiResponse = completion.choices[0]?.message?.content ?? null
    } catch (aiErr) {
      console.error('[reflection] AI error (non-fatal):', aiErr)
      // Save reflection without AI response — not a fatal error
    }

    // Save reflection
    const { data: saved, error } = await supabase
      .from('reflections')
      .insert({
        student_id: user.id,
        lesson_id: data.lesson_id,
        workbook_element_id: data.workbook_element_id ?? null,
        prompt: data.prompt ?? null,
        response: data.response,
        word_count: data.response.split(/\s+/).length,
        ai_response: aiResponse,
        is_private: data.is_private,
        shared_with_facilitator: data.shared_with_facilitator,
      })
      .select('id, response, ai_response, created_at')
      .single()

    if (error) {
      console.error('[reflection] insert error:', error.message)
      return NextResponse.json({ error: 'Failed to save reflection' }, { status: 500 })
    }

    return NextResponse.json({ data: saved }, { status: 201 })
  } catch (err) {
    console.error('[reflection] unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const lesson_id = searchParams.get('lesson_id')

  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('reflections')
    .select(`
      id, prompt, response, ai_response, is_private, shared_with_facilitator,
      created_at, updated_at,
      lessons (id, title, modules (name, quarters (quarter_code)))
    `)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  if (lesson_id) {
    query = query.eq('lesson_id', lesson_id)
  }

  const { data, error } = await query.limit(50)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch reflections' }, { status: 500 })
  }

  return NextResponse.json({ data })
}
