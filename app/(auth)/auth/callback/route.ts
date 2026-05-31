import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  // Invite flow: default to password setup; recovery: default to reset-password
  const defaultNext = (type === 'invite' || type === 'recovery') ? '/auth/reset-password' : '/dashboard'
  const rawNext = searchParams.get('next') ?? defaultNext
  // Append invite=1 hint when coming from an invite so the password page shows correct copy
  const next = type === 'invite' && !rawNext.includes('invite=')
    ? rawNext + (rawNext.includes('?') ? '&' : '?') + 'invite=1'
    : rawNext

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Auth failure — redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
