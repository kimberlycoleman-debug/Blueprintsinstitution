-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 001 — Foundation
-- =====================================================
-- Creates enums, helper functions, and the three-tier
-- curriculum structure (Quarters → Modules → Lessons)
-- =====================================================

-- =====================================================
-- ENUMS
-- =====================================================

create type user_role as enum ('student', 'facilitator', 'admin');

create type lesson_status as enum (
  'planning',
  'in_development',
  'ready_to_teach',
  'taught'
);

create type content_status as enum (
  'blank',
  'draft',
  'complete',
  'needs_review'
);

create type scripture_status as enum (
  'not_started',
  'needs_disclaimer',
  'complete'
);

create type depth_level as enum (
  'foundation',
  'discernment',
  'practice',
  'embodiment'
);

create type cohort_status as enum ('upcoming', 'active', 'completed');

create type student_status as enum ('active', 'on_hold', 'withdrawn', 'completed');

create type weekly_flow_status as enum ('scheduled', 'completed', 'rescheduled');

create type attendance_status as enum ('present', 'absent', 'late', 'excused');

create type progress_completion as enum ('not_started', 'in_progress', 'completed');

create type assessment_qualitative as enum (
  'not_demonstrated',
  'emerging',
  'demonstrated',
  'embodied'
);

create type curriculum_track as enum ('solavian_core', 'solavian_advanced');

-- =====================================================
-- HELPER FUNCTION: Auto-update updated_at timestamp
-- =====================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =====================================================
-- TIER 1: QUARTERS
-- =====================================================

create table quarters (
  id uuid primary key default gen_random_uuid(),
  quarter_code text not null unique,
  name text not null,
  theme text not null,
  description text,
  sequence integer not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger quarters_updated_at
  before update on quarters
  for each row execute function set_updated_at();

comment on table quarters is 'The four quarters of the 12-month formation pathway';

-- =====================================================
-- TIER 2: MODULES
-- =====================================================

create table modules (
  id uuid primary key default gen_random_uuid(),
  module_code text not null unique,
  name text not null,
  description text,
  module_number integer not null,
  sequence_in_quarter integer not null,
  quarter_id uuid not null references quarters(id) on delete cascade,
  learning_outcomes text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (quarter_id, sequence_in_quarter)
);

create trigger modules_updated_at
  before update on modules
  for each row execute function set_updated_at();

create index idx_modules_quarter on modules(quarter_id);

comment on table modules is '16 modules — 4 per quarter';

-- =====================================================
-- TIER 3: LESSONS (the big one)
-- =====================================================

create table lessons (
  id uuid primary key default gen_random_uuid(),
  lesson_code text not null unique,
  lesson_number integer not null,
  title text not null,
  description text,

  -- Curriculum classification
  track curriculum_track not null default 'solavian_core',
  module_id uuid not null references modules(id) on delete cascade,
  quarter_id uuid not null references quarters(id) on delete restrict,
  sequence_in_module integer not null,

  -- Categorization
  category text,
  topic text,
  depth_level depth_level,

  -- Status tracking
  status lesson_status not null default 'planning',
  content_status content_status not null default 'blank',
  scripture_status scripture_status not null default 'not_started',

  -- Lesson metadata
  duration_minutes integer,
  resources_needed text,
  notes text,
  facilitator_user_id uuid, -- references users(id) — added in migration 002

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, sequence_in_module)
);

create trigger lessons_updated_at
  before update on lessons
  for each row execute function set_updated_at();

create index idx_lessons_module on lessons(module_id);
create index idx_lessons_quarter on lessons(quarter_id);
create index idx_lessons_status on lessons(status);
create index idx_lessons_content_status on lessons(content_status);
create index idx_lessons_track on lessons(track);

comment on table lessons is '80 lessons across 16 modules — full curriculum spine';
