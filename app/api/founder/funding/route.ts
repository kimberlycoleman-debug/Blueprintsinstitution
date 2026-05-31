import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isFounder, logFounderAction } from '@/lib/founder/protection'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

const FundingSchema = z.object({
  funding_type: z.enum(['grant', 'major_donor', 'institutional_partner', 'church_partner', 'individual_donor', 'earned_revenue']),
  status: z.enum(['prospect', 'applied', 'under_review', 'awarded', 'declined', 'reporting', 'closed']).default('prospect'),
  source_name: z.string().min(2),
  source_contact: z.string().optional(),
  source_email: z.string().email().optional(),
  amount_requested: z.number().optional(),
  amount_awarded: z.number().optional(),
  amount_deployed: z.number().default(0),
  applied_at: z.string().optional(),
  awarded_at: z.string().optional(),
  reporting_deadline: z.string().optional(),
  period_start: z.string().optional(),
  period_end: z.string().optional(),
  is_restricted: z.boolean().default(false),
  restriction_description: z.string().optional(),
  free_seats_funded: z.number().int().default(0),
  notes: z.string().optional(),
  proposal_url: z.string().optional(),
  report_url: z.string().optional(),
})

// GET /api/founder/funding?status=&type=
export async function GET(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')

  const admin = createAdminSupabaseClient()
  let query = admin
    .from('funding_records')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)
  if (type) query = query.eq('funding_type', type)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: 'Failed to load funding records' }, { status: 500 })

  return NextResponse.json({ data: data ?? [] })
}

// POST /api/founder/funding — create funding record
export async function POST(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = FundingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const admin = createAdminSupabaseClient()
  const { data, error } = await admin
    .from('funding_records')
    .insert(parsed.data)
    .select('id')
    .single()

  if (error) {
    console.error('[founder/funding] create error:', error.message)
    return NextResponse.json({ error: 'Failed to create funding record' }, { status: 500 })
  }

  await logFounderAction('grant_report_generate', {
    resource_type: 'funding',
    resource_id: data.id,
    resource_label: parsed.data.source_name,
    detail: { type: parsed.data.funding_type, amount: parsed.data.amount_awarded },
  })

  return NextResponse.json({ success: true, id: data.id })
}

// PATCH /api/founder/funding — update funding record
export async function PATCH(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, ...rest } = body
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const admin = createAdminSupabaseClient()
  const { error } = await admin
    .from('funding_records')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to update record' }, { status: 500 })
  return NextResponse.json({ success: true })
}
