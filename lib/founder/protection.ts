import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

const FOUNDER_EMAIL = 'kimberly@theblueprintsfoundation.org'

// ─────────────────────────────────────────────────────────────
// Core check: is the currently authenticated user the founder?
// Uses the DB function is_founder() for RLS-consistent results.
// ─────────────────────────────────────────────────────────────

export async function isFounder(): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.rpc('is_founder')
    if (error) return false
    return data === true
  } catch {
    return false
  }
}

// ─────────────────────────────────────────────────────────────
// Guard: use at the top of founder-only Server Components/routes.
// Redirects to /login if not authenticated, /dashboard if not founder.
// ─────────────────────────────────────────────────────────────

export async function requireFounder(): Promise<void> {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (user.email !== FOUNDER_EMAIL) {
    // Log the unauthorized access attempt
    await logFounderAction('registry_access', {
      resource_type: 'founder_route',
      detail: {
        attempted_by: user.email,
        reason: 'email_mismatch',
      },
    })
    redirect('/dashboard')
  }
}

// ─────────────────────────────────────────────────────────────
// Audit logging — records every privileged founder action.
// Uses the DB function log_founder_action() for consistency.
// Safe to call without awaiting when fire-and-forget is fine.
// ─────────────────────────────────────────────────────────────

type AuditAction =
  | 'vault_create'
  | 'vault_update'
  | 'vault_delete'
  | 'vault_view'
  | 'registry_access'
  | 'founder_dashboard_view'
  | 'founder_analytics_view'
  | 'cohort_override'
  | 'student_data_export'
  | 'grant_report_generate'
  | 'system_config_change'

interface LogActionOptions {
  resource_type?: string
  resource_id?: string
  resource_label?: string
  detail?: Record<string, unknown>
}

export async function logFounderAction(
  action: AuditAction,
  options: LogActionOptions = {}
): Promise<void> {
  try {
    const supabase = await createServerSupabaseClient()
    await supabase.rpc('log_founder_action', {
      p_action: action,
      p_resource_type: options.resource_type ?? null,
      p_resource_id: options.resource_id ?? null,
      p_resource_label: options.resource_label ?? null,
      p_detail: options.detail ?? {},
    })
  } catch {
    // Audit log failures are silent — never block the user action
  }
}

// ─────────────────────────────────────────────────────────────
// Vault helpers
// ─────────────────────────────────────────────────────────────

export type VaultCategory =
  | 'legal'
  | 'financial'
  | 'curriculum'
  | 'grants'
  | 'partnerships'
  | 'operations'
  | 'communications'
  | 'personnel'
  | 'strategic'
  | 'confidential'

export type VaultVisibility = 'founder_only' | 'admin_visible' | 'board_visible'

export interface VaultItem {
  id: string
  category: VaultCategory
  title: string
  description: string | null
  visibility: VaultVisibility
  content: string | null
  content_json: Record<string, unknown> | null
  external_url: string | null
  file_path: string | null
  tags: string[]
  is_archived: boolean
  version: number
  created_at: string
  updated_at: string
}

export async function getVaultItems(
  category?: VaultCategory,
  includeArchived = false
): Promise<VaultItem[]> {
  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('founder_vault')
    .select('*')
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)
  if (!includeArchived) query = query.eq('is_archived', false)

  const { data, error } = await query
  if (error) throw new Error(`Vault fetch failed: ${error.message}`)
  return (data ?? []) as VaultItem[]
}

export async function createVaultItem(
  item: Omit<VaultItem, 'id' | 'created_at' | 'updated_at' | 'version'>
): Promise<string> {
  const supabase = await createServerSupabaseClient()
  const { data: user } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('founder_vault')
    .insert({ ...item, created_by: user.user?.id, last_edited_by: user.user?.id })
    .select('id')
    .single()

  if (error) throw new Error(`Vault create failed: ${error.message}`)

  await logFounderAction('vault_create', {
    resource_type: 'vault',
    resource_id: data.id,
    resource_label: item.title,
    detail: { category: item.category },
  })

  return data.id
}

// ─────────────────────────────────────────────────────────────
// Registry helpers
// ─────────────────────────────────────────────────────────────

export interface FounderProfile {
  id: string
  founder_email: string
  full_name: string
  title: string
  bio: string | null
  founding_date: string | null
  founding_scripture: string
  founding_mandate: string
  last_accessed_at: string | null
  access_count: number
}

export async function getFounderProfile(): Promise<FounderProfile | null> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('founder_registry')
    .select('*')
    .single()

  if (error) return null

  // Update last_accessed_at via admin client (bypasses RLS for self-update)
  const admin = createAdminSupabaseClient()
  await admin
    .from('founder_registry')
    .update({
      last_accessed_at: new Date().toISOString(),
      access_count: (data.access_count ?? 0) + 1,
    })
    .eq('id', data.id)

  await logFounderAction('registry_access', {
    resource_type: 'founder_registry',
    resource_id: data.id,
  })

  return data as FounderProfile
}
