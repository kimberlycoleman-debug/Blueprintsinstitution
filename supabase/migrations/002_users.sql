-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 002 — Users, Identity, Roles
-- =====================================================
-- User profiles tied to Supabase Auth
-- Three role types: student, facilitator, admin
-- =====================================================

-- =====================================================
-- USER PROFILES
-- =====================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  avatar_url text,
  role user_role not null default 'student',
  is_active boolean not null default true,

  -- Onboarding & lifecycle
  enrollment_date date,
  application_id uuid, -- references applications(id) — added in migration 008

  -- Identity formation tracking
  identity_blueprint_complete boolean not null default false,
  purpose_statement_complete boolean not null default false,
  ministry_plan_complete boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

create index idx_profiles_role on profiles(role);
create index idx_profiles_active on profiles(is_active);

comment on table profiles is 'User profiles — students, facilitators, and admins';

-- =====================================================
-- Add facilitator FK to lessons
-- =====================================================

alter table lessons
  add constraint lessons_facilitator_fkey
  foreign key (facilitator_user_id)
  references profiles(id)
  on delete set null;

create index idx_lessons_facilitator on lessons(facilitator_user_id);

-- =====================================================
-- AUTO-CREATE PROFILE ON AUTH SIGN-UP
-- =====================================================

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- =====================================================
-- HELPER: Get current user's role
-- =====================================================

create or replace function current_user_role()
returns user_role as $$
  select role from profiles where id = auth.uid();
$$ language sql stable security definer;

-- =====================================================
-- HELPER: Check if current user is admin
-- =====================================================

create or replace function is_admin()
returns boolean as $$
  select current_user_role() = 'admin';
$$ language sql stable;

-- =====================================================
-- HELPER: Check if current user is facilitator or admin
-- =====================================================

create or replace function is_facilitator_or_admin()
returns boolean as $$
  select current_user_role() in ('facilitator', 'admin');
$$ language sql stable;
