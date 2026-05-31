import { createClient } from '@supabase/supabase-js'

/**
 * Admin Supabase client using the service role key.
 * SERVER-SIDE ONLY. Bypasses RLS — use with extreme caution.
 * Reserved for: admin operations, AI background jobs, certificate generation.
 */
export function createAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!url || !key) {
    throw new Error('Missing Supabase admin credentials')
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
