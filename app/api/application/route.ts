import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendApplicationConfirmation } from '@/lib/email/send'

const ApplicationSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('A valid email is required'),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  age_range: z.string().optional(),
  gender: z.string().optional(),
  church: z.string().optional(),
  salvation_year: z.string().optional(),
  discipleship_experience: z.string().optional(),
  spiritual_gifts: z.string().optional(),
  why_applying: z.string().min(10, 'Please share why you are applying'),
  what_hoping: z.string().optional(),
  current_challenges: z.string().optional(),
  commitment_acknowledgment: z.boolean().refine((v) => v === true, {
    message: 'You must acknowledge the program commitment',
  }),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 applications per hour per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const rl = await checkRateLimit(`ip:application:${ip}`, 5, 3600)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const parsed = ApplicationSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? 'Invalid submission'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const data = parsed.data
    const supabase = await createServerSupabaseClient()

    // Check for duplicate application by email
    const { data: existing } = await supabase
      .from('applications')
      .select('id')
      .eq('email', data.email)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'An application with this email already exists.' },
        { status: 409 }
      )
    }

    const { error } = await supabase.from('applications').insert({
      application_number: `APP-${new Date().getFullYear()}-${Date.now().toString(36).slice(-6).toUpperCase()}`,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      age_range: data.age_range ?? null,
      gender: data.gender ?? null,
      current_church: data.church ?? null,
      salvation_year: data.salvation_year ?? null,
      prior_discipleship_experience: data.discipleship_experience ?? null,
      spiritual_gifts: data.spiritual_gifts ?? null,
      testimony: data.why_applying,
      why_now: data.what_hoping ?? 'Not specified',
      expectations: data.current_challenges ?? null,
      status: 'submitted',
    })

    if (error) {
      console.error('[application] insert error:', error.message)
      return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 })
    }

    // Send confirmation email (non-blocking on failure)
    try {
      await sendApplicationConfirmation(data.email, data.full_name)
    } catch (emailErr) {
      console.error('[application] email error:', emailErr)
    }

    return NextResponse.json({ message: 'Application submitted successfully.' }, { status: 201 })
  } catch (err) {
    console.error('[application] unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
