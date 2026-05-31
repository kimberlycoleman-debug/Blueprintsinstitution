import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentUser } from '@/lib/supabase/server'
import { getOpenAIClient, DEFAULT_MODEL } from '@/lib/ai/client'
import { MINISTRY_PLAN_PROMPT } from '@/lib/ai/prompts'

const SaveSchema = z.object({
  ministry_name: z.string().optional(),
  vision_statement: z.string().min(5),
  mission_statement: z.string().optional(),
  target_audience: z.string().optional(),
  three_month_goals: z.array(z.string()).optional(),
  six_month_goals: z.array(z.string()).optional(),
  one_year_goals: z.array(z.string()).optional(),
  team_needed: z.string().optional(),
  resources_needed: z.string().optional(),
  funding_needed: z.string().optional(),
  partnerships_sought: z.string().optional(),
  launch_date: z.string().nullable().optional(),
  first_milestone_date: z.string().nullable().optional(),
  is_complete: z.boolean().optional(),
})

const AiDraftSchema = z.object({
  section: z.string(),
  content: z.string().min(5),
  purpose_statement: z.string().optional(),
})

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('ministry_plans')
    .select('*')
    .eq('student_id', user.id)
    .maybeSingle()

  if (error) return NextResponse.json({ error: 'Failed to load ministry plan' }, { status: 500 })
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

    const purposeContext = parsed.data.purpose_statement
      ? `The student's Purpose Statement is: "${parsed.data.purpose_statement}"\n\n`
      : ''

    try {
      const openai = getOpenAIClient()
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: MINISTRY_PLAN_PROMPT },
          {
            role: 'user',
            content: `${purposeContext}I am working on the "${parsed.data.section}" section of my Ministry Launch Plan.\n\nHere is what I have:\n\n${parsed.data.content}\n\nHelp me make this concrete and actionable without crushing the spiritual weight of what I am being called to build.`,
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
    .from('ministry_plans')
    .select('id')
    .eq('student_id', user.id)
    .maybeSingle()

  let result
  if (existing) {
    const { data, error } = await supabase
      .from('ministry_plans')
      .update(payload)
      .eq('student_id', user.id)
      .select('id, is_complete, updated_at')
      .single()
    result = { data, error }
  } else {
    const { data, error } = await supabase
      .from('ministry_plans')
      .insert(payload)
      .select('id, is_complete, updated_at')
      .single()
    result = { data, error }
  }

  if (result.error) {
    console.error('[ministry-plan] save error:', result.error.message)
    return NextResponse.json({ error: 'Failed to save ministry plan' }, { status: 500 })
  }

  return NextResponse.json({ data: result.data }, { status: 200 })
}
