import { NextResponse } from 'next/server'
import { createServerSupabaseClient, getCurrentUser } from '@/lib/supabase/server'

// POST /api/onboarding/complete — marks the current student's onboarding as done
export async function POST() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('profiles')
    .update({ onboarding_complete: true })
    .eq('id', user.id)

  if (error) {
    console.error('[onboarding/complete] update error:', error.message)
    return NextResponse.json({ error: 'Failed to complete onboarding' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
