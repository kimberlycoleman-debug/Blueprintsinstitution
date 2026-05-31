import { createAdminSupabaseClient } from '@/lib/supabase/admin'

/**
 * Serverless-safe sliding-window rate limiter backed by Supabase.
 * @param key       - Unique identifier string, e.g. 'ip:endpoint' or 'uid:endpoint'
 * @param maxRequests - Max allowed requests within the window
 * @param windowSeconds - Window size in seconds
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const admin = createAdminSupabaseClient()
  const windowStart = new Date(Date.now() - windowSeconds * 1000).toISOString()

  const { count } = await admin
    .from('rate_limit_log')
    .select('*', { count: 'exact', head: true })
    .eq('key', key)
    .gte('created_at', windowStart)

  const current = count ?? 0

  if (current >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  // Log this request (fire-and-forget — failure here is non-fatal)
  void admin.from('rate_limit_log').insert({ key })

  return { allowed: true, remaining: maxRequests - current - 1 }
}
