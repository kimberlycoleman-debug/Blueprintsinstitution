-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 021 — Founder Sovereign Tier
-- =====================================================
-- Creates the founder command center:
--   - founder_registry    (email-locked identity)
--   - founder_vault       (10-category document store)
--   - founder_audit_log   (every privileged action, immutable)
--   - founder_notes       (founder-only scratchpad)
-- Founder is NOT a role enum value — sovereignty is
-- enforced by email match against founder_registry.
-- =====================================================

-- =====================================================
-- ENUMS
-- =====================================================

create type vault_category as enum (
  'legal',
  'financial',
  'curriculum',
  'grants',
  'partnerships',
  'operations',
  'communications',
  'personnel',
  'strategic',
  'confidential'
);

create type vault_visibility as enum (
  'founder_only',
  'admin_visible',
  'board_visible'
);

create type audit_action as enum (
  'vault_create',
  'vault_update',
  'vault_delete',
  'vault_view',
  'registry_access',
  'founder_dashboard_view',
  'founder_analytics_view',
  'cohort_override',
  'student_data_export',
  'grant_report_generate',
  'system_config_change'
);

-- =====================================================
-- FOUNDER REGISTRY
-- =====================================================
-- The single source of founder identity.
-- Only one row. Email match = sovereign access.
-- =====================================================

create table founder_registry (
  id uuid primary key default gen_random_uuid(),

  -- Identity (locked)
  founder_email text not null unique,
  full_name text not null,
  title text not null default 'Founding Architect',

  -- Biographical context (for AI companion + dashboard)
  bio text,
  founding_date date,
  founding_scripture text default 'Ephesians 2:10',
  founding_mandate text default 'Matthew 28:19-20',

  -- Access control
  is_active boolean not null default true,
  last_accessed_at timestamptz,
  access_count integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger founder_registry_updated_at
  before update on founder_registry
  for each row execute function set_updated_at();

comment on table founder_registry is
  'Single-row founder identity registry. Email match enforces sovereign access.';

-- Seed the founder identity
insert into founder_registry (
  founder_email,
  full_name,
  title,
  bio,
  founding_date,
  founding_scripture,
  founding_mandate
) values (
  'kimberly@theblueprintsfoundation.org',
  'Kimberly Coleman',
  'Founding Architect',
  'Kimberly Coleman is the Founding Architect of The B.L.U.E.P.R.I.N.T.S. Foundation and The B.L.U.E.P.R.I.N.T.S. Discipleship Institute — the first formation institute in the world to measure spiritual transformation. Her mandate is Matthew 28:19-20. Her theology is Ephesians 2:10: every believer carries a God-designed blueprint, and this institute unlocks it.',
  '2026-11-01',
  'Ephesians 2:10',
  'Matthew 28:19-20'
);

-- =====================================================
-- HELPER: Is the current authenticated user the founder?
-- =====================================================

create or replace function is_founder()
returns boolean as $$
  select exists (
    select 1
    from founder_registry fr
    join profiles p on p.email = fr.founder_email
    where p.id = auth.uid()
    and fr.is_active = true
  );
$$ language sql stable security definer;

-- =====================================================
-- FOUNDER VAULT
-- =====================================================
-- 10-category document/asset store.
-- Only founder can write. Visibility controls read.
-- =====================================================

create table founder_vault (
  id uuid primary key default gen_random_uuid(),

  -- Classification
  category vault_category not null,
  title text not null,
  description text,
  visibility vault_visibility not null default 'founder_only',

  -- Content (flexible — structured or freetext)
  content text,                     -- freetext / markdown body
  content_json jsonb,               -- structured data when needed
  external_url text,                -- link to external doc (Drive, Notion, etc.)
  file_path text,                   -- Supabase Storage path if file attached

  -- Metadata
  tags text[] default '{}',
  is_archived boolean not null default false,
  version integer not null default 1,

  -- Authorship
  created_by uuid references profiles(id) on delete set null,
  last_edited_by uuid references profiles(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger founder_vault_updated_at
  before update on founder_vault
  for each row execute function set_updated_at();

create index idx_vault_category on founder_vault(category);
create index idx_vault_visibility on founder_vault(visibility);
create index idx_vault_archived on founder_vault(is_archived);
create index idx_vault_tags on founder_vault using gin(tags);

comment on table founder_vault is
  'Founder-controlled document and asset store. 10 categories, three visibility tiers.';

-- =====================================================
-- FOUNDER AUDIT LOG
-- =====================================================
-- Immutable record of every privileged action.
-- No deletes. No updates. Append-only.
-- =====================================================

create table founder_audit_log (
  id uuid primary key default gen_random_uuid(),

  -- Who, what, when
  actor_id uuid references profiles(id) on delete set null,
  actor_email text,                  -- denormalized for permanence
  action audit_action not null,

  -- Context
  resource_type text,               -- 'vault', 'cohort', 'student', etc.
  resource_id uuid,                 -- id of the affected resource
  resource_label text,              -- human-readable label (denormalized)

  -- Detail
  detail jsonb default '{}',        -- additional context (old/new values, etc.)
  ip_address inet,
  user_agent text,

  -- Integrity
  occurred_at timestamptz not null default now()

  -- No updated_at — this table is append-only / immutable
);

create index idx_audit_actor on founder_audit_log(actor_id);
create index idx_audit_action on founder_audit_log(action);
create index idx_audit_occurred on founder_audit_log(occurred_at desc);
create index idx_audit_resource on founder_audit_log(resource_type, resource_id);

comment on table founder_audit_log is
  'Immutable audit trail for all privileged founder actions. No deletes, no updates.';

-- Prevent updates and deletes on audit log (integrity guarantee)
create or replace function audit_log_immutable()
returns trigger as $$
begin
  raise exception 'founder_audit_log is immutable — records cannot be modified or deleted';
end;
$$ language plpgsql;

create trigger audit_log_no_update
  before update on founder_audit_log
  for each row execute function audit_log_immutable();

create trigger audit_log_no_delete
  before delete on founder_audit_log
  for each row execute function audit_log_immutable();

-- =====================================================
-- FOUNDER NOTES
-- =====================================================
-- Private founder scratchpad — ideas, prayers, strategy.
-- =====================================================

create table founder_notes (
  id uuid primary key default gen_random_uuid(),
  title text,
  body text not null,
  tags text[] default '{}',
  is_pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger founder_notes_updated_at
  before update on founder_notes
  for each row execute function set_updated_at();

create index idx_founder_notes_pinned on founder_notes(is_pinned);
create index idx_founder_notes_tags on founder_notes using gin(tags);

comment on table founder_notes is
  'Private founder scratchpad. Visible to founder only.';

-- =====================================================
-- HELPER: Log a founder audit event
-- =====================================================

create or replace function log_founder_action(
  p_action audit_action,
  p_resource_type text default null,
  p_resource_id uuid default null,
  p_resource_label text default null,
  p_detail jsonb default '{}'
)
returns void as $$
declare
  v_actor_id uuid;
  v_actor_email text;
begin
  select p.id, p.email
  into v_actor_id, v_actor_email
  from profiles p
  where p.id = auth.uid();

  insert into founder_audit_log (
    actor_id,
    actor_email,
    action,
    resource_type,
    resource_id,
    resource_label,
    detail
  ) values (
    v_actor_id,
    v_actor_email,
    p_action,
    p_resource_type,
    p_resource_id,
    p_resource_label,
    p_detail
  );
end;
$$ language plpgsql security definer;

-- =====================================================
-- RLS POLICIES — FOUNDER SOVEREIGN TIER
-- =====================================================

alter table founder_registry enable row level security;
alter table founder_vault enable row level security;
alter table founder_audit_log enable row level security;
alter table founder_notes enable row level security;

-- founder_registry: founder reads own record
create policy "Founder reads own registry record"
  on founder_registry for select
  using (is_founder());

-- founder_vault: founder full access
create policy "Founder full access to vault"
  on founder_vault for all
  using (is_founder())
  with check (is_founder());

-- founder_vault: admins can read admin_visible items
create policy "Admins read admin-visible vault items"
  on founder_vault for select
  using (
    visibility = 'admin_visible'
    and is_admin()
  );

-- founder_audit_log: founder reads all; no one else
create policy "Founder reads audit log"
  on founder_audit_log for select
  using (is_founder());

-- founder_audit_log: any authenticated user can insert (for server-side logging)
create policy "Authenticated users can log audit events"
  on founder_audit_log for insert
  with check (auth.uid() is not null);

-- founder_notes: founder only
create policy "Founder full access to notes"
  on founder_notes for all
  using (is_founder())
  with check (is_founder());

-- Force RLS even for postgres superuser on these tables
alter table founder_registry force row level security;
alter table founder_vault force row level security;
alter table founder_audit_log force row level security;
alter table founder_notes force row level security;
