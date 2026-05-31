import { NextRequest, NextResponse } from 'next/server'
import { isFounder } from '@/lib/founder/protection'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'

// GET /api/founder/audit?page=1&action=
export async function GET(request: NextRequest) {
  if (!(await isFounder())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const action = searchParams.get('action')
  const limit = 50
  const offset = (page - 1) * limit

  const admin = createAdminSupabaseClient()
  let query = admin
    .from('founder_audit_log')
    .select('*', { count: 'exact' })
    .order('occurred_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (action) query = query.eq('action', action)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: 'Failed to load audit log' }, { status: 500 })

  return NextResponse.json({ data: data ?? [], total: count ?? 0, page, limit })
}
