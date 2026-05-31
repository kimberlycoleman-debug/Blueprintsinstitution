import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentUser } from '@/lib/supabase/server'
import { getOpenAIClient, DEFAULT_MODEL } from '@/lib/ai/client'
import { IDENTITY_BLUEPRINT_PROMPT } from '@/lib/ai/prompts'

const SaveSchema = z.object({
  identity_statement: z.string().min(10),
  who_god_says_i_am: z.string().optional(),
  my_god_given_design: z.string().optional(),
  my_strengths: z.string().optional(),
  my_enneagram: z.string().optional(),
  my_spiritual_gifts: z.string().optional(),
  my_biblical_parallels: z.string().optional(),
  my_purpose_themes: z.string().optional(),
  identity_lies_renounced: z.array(z.string()).optional(),
  truth_declarations: z.array(z.string()).optional(),
  is_complete: z.boolean().optional(),
})

const AiDraftSchema = z.object({
  section: z.string(),
  content: z.string().min(10),
})

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('identity_blueprints')
    .select('*')
    .eq('student_id', user.id)
    .maybeSingle()

  if (error) return NextResponse.json({ error: 'Failed to load blueprint' }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { action } = body

  // AI draft request
  if (action === 'ai_draft') {
    const parsed = AiDraftSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

    try {
      const openai = getOpenAIClient()
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: IDENTITY_BLUEPRINT_PROMPT },
          {
            role: 'user',
            content: `I am working on the "${parsed.data.section}" section of my Identity Blueprint Statement.\n\nHere is what I have so far:\n\n${parsed.data.content}\n\nHelp me deepen and refine this language so it reflects who I AM, not just what I do.`,
          },
        ],
        max_tokens: 400,
        temperature: 0.7,
      })
      const draft = completion.choices[0]?.message?.content ?? ''
      return NextResponse.json({ draft })
    } catch {
      return NextResponse.json({ error: 'AI unavailable — save your work and try again.' }, { status: 503 })
    }
  }

  // Save / upsert
  const parsed = SaveSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const payload = {
    student_id: user.id,
    ...parsed.data,
    submitted_at: parsed.data.is_complete ? new Date().toISOString() : undefined,
  }

  const { data: existing } = await supabase
    .from('identity_blueprints')
    .select('id')
    .eq('student_id', user.id)
    .maybeSingle()

  let result
  if (existing) {
    const { data, error } = await supabase
      .from('identity_blueprints')
      .update(payload)
      .eq('student_id', user.id)
      .select('id, is_complete, updated_at')
      .single()
    result = { data, error }
  } else {
    const { data, error } = await supabase
      .from('identity_blueprints')
      .insert(payload)
      .select('id, is_complete, updated_at')
      .single()
    result = { data, error }
  }

  if (result.error) {
    console.error('[identity-blueprint] save error:', result.error.message)
    return NextResponse.json({ error: 'Failed to save blueprint' }, { status: 500 })
  }

  return NextResponse.json({ data: result.data }, { status: 200 })
}
