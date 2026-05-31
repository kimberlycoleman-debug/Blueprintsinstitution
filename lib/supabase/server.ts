import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
            )
          } catch {
            // Server Component context — can't write cookies
          }
        },
      },
    }
  )
}

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getCurrentProfile() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile) return profile

  // Self-heal: create the profile row if the handle_new_user trigger
  // did not fire (can happen in certain Supabase cloud edge cases).
  const { data: newProfile } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      email: user.email ?? '',
      full_name: (user.user_metadata?.full_name as string | undefined) ?? '',
      role: 'student',
    })
    .select('*')
    .single()

  return newProfile ?? null
}
