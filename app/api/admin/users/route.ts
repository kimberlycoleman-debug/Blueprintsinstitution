import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient, getCurrentProfile } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// GET  /api/admin/users?role=student&search=kim
export async function GET(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = 50
  const offset = (page - 1) * limit

  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('profiles')
    .select('id, full_name, email, role, is_active, enrollment_date, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (role) query = query.eq('role', role)
  if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: 'Failed to load users' }, { status: 500 })

  return NextResponse.json({ data: data ?? [], total: count ?? 0, page, limit })
}

const UpdateUserSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['student', 'facilitator', 'admin']).optional(),
  is_active: z.boolean().optional(),
  full_name: z.string().optional(),
})

// PATCH /api/admin/users — update user role or active status
export async function PATCH(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const parsed = UpdateUserSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid request' }, { status: 400 })
  }

  // Prevent admin from demoting themselves
  if (parsed.data.id === profile.id && parsed.data.role && parsed.data.role !== 'admin') {
    return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 })
  }

  const adminSupabase = createAdminSupabaseClient()
  const { id, ...rest } = parsed.data
  const { error } = await adminSupabase
    .from('profiles')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('[admin/users] update error:', error.message)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
