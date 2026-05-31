import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentUser } from '@/lib/supabase/server'
import { getOpenAIClient, DEFAULT_MODEL } from '@/lib/ai/client'
import { PURPOSE_STATEMENT_PROMPT } from '@/lib/ai/prompts'

const SaveSchema = z.object({
  purpose_statement: z.string().min(10),
  my_calling: z.string().optional(),
  my_assignment: z.string().optional(),
  my_passions: z.string().optional(),
  my_burdens: z.string().optional(),
  my_unique_contribution: z.string().optional(),
  my_kingdom_impact: z.string().optional(),
  is_complete: z.boolean().optional(),
})

const AiDraftSchema = z.object({
  section: z.string(),
  content: z.string().min(10),
  identity_statement: z.string().optional(),
})

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('purpose_statements')
    .select('*')
    .eq('student_id', user.id)
    .maybeSingle()

  if (error) return NextResponse.json({ error: 'Failed to load purpose statement' }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { action } = body

  if (action === 'ai_draft') {
    const parsed = AiDraftSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

    const identityContext = parsed.data.identity_statement
      ? `The student's Identity Blueprint Statement is: "${parsed.data.identity_statement}"\n\n`
      : ''

    try {
      const openai = getOpenAIClient()
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: PURPOSE_STATEMENT_PROMPT },
          {
            role: 'user',
            content: `${identityContext}I am working on the "${parsed.data.section}" section of my Purpose Statement.\n\nHere is what I have so far:\n\n${parsed.data.content}\n\nHelp me articulate this as kingdom purpose — rooted in identity, not performance.`,
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
    .from('purpose_statements')
    .select('id')
    .eq('student_id', user.id)
    .maybeSingle()

  let result
  if (existing) {
    const { data, error } = await supabase
      .from('purpose_statements')
      .update(payload)
      .eq('student_id', user.id)
      .select('id, is_complete, updated_at')
      .single()
    result = { data, error }
  } else {
    const { data, error } = await supabase
      .from('purpose_statements')
      .insert(payload)
      .select('id, is_complete, updated_at')
      .single()
    result = { data, error }
  }

  if (result.error) {
    console.error('[purpose-statement] save error:', result.error.message)
    return NextResponse.json({ error: 'Failed to save purpose statement' }, { status: 500 })
  }

  return NextResponse.json({ data: result.data }, { status: 200 })
}
