import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isFounder, logFounderAction } from '@/lib/founder/protection'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

const VaultCreateSchema = z.object({
  category: z.enum(['legal', 'financial', 'curriculum', 'grants', 'partnerships', 'operations', 'communications', 'personnel', 'strategic', 'confidential']),
  title: z.string().min(2),
  description: z.string().optional(),
  visibility: z.enum(['founder_only', 'admin_visible', 'board_visible']).default('founder_only'),
  content: z.string().optional(),
  external_url: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
})

const VaultUpdateSchema = VaultCreateSchema.partial().extend({
  id: z.string().uuid(),
  is_archived: z.boolean().optional(),
})

// GET /api/founder/vault?category=&archived=false
export async function GET(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const includeArchived = searchParams.get('archived') === 'true'

  const admin = createAdminSupabaseClient()
  let query = admin.from('founder_vault').select('*').order('created_at', { ascending: false })
  if (category) query = query.eq('category', category)
  if (!includeArchived) query = query.eq('is_archived', false)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: 'Failed to load vault' }, { status: 500 })

  await logFounderAction('vault_view', { detail: { category: category ?? 'all' } })
  return NextResponse.json({ data: data ?? [] })
}

// POST /api/founder/vault — create item
export async function POST(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = VaultCreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const admin = createAdminSupabaseClient()
  const { data, error } = await admin
    .from('founder_vault')
    .insert(parsed.data)
    .select('id')
    .single()

  if (error) {
    console.error('[founder/vault] create error:', error.message)
    return NextResponse.json({ error: 'Failed to create vault item' }, { status: 500 })
  }

  await logFounderAction('vault_create', {
    resource_type: 'vault',
    resource_id: data.id,
    resource_label: parsed.data.title,
    detail: { category: parsed.data.category },
  })

  return NextResponse.json({ success: true, id: data.id })
}

// PATCH /api/founder/vault — update item
export async function PATCH(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = VaultUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  const { id, ...rest } = parsed.data
  const admin = createAdminSupabaseClient()
  const { error } = await admin
    .from('founder_vault')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to update vault item' }, { status: 500 })

  await logFounderAction('vault_update', {
    resource_type: 'vault',
    resource_id: id,
    detail: { fields_updated: Object.keys(rest) },
  })

  return NextResponse.json({ success: true })
}

// DELETE /api/founder/vault?id= — soft-archive
export async function DELETE(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const admin = createAdminSupabaseClient()
  const { error } = await admin
    .from('founder_vault')
    .update({ is_archived: true, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to archive item' }, { status: 500 })

  await logFounderAction('vault_delete', { resource_type: 'vault', resource_id: id })
  return NextResponse.json({ success: true })
}
