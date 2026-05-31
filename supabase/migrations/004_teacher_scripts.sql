-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 004 — Teacher Scripts
-- =====================================================
-- The word-for-word facilitation script for each lesson
-- Structured into sections so AI can query across them
-- =====================================================

-- =====================================================
-- TEACHER SCRIPT SECTIONS
-- =====================================================
-- Each lesson has multiple script sections:
-- Opening, Hook, Core Teaching (with parts), Transition

create type script_section_type as enum (
  'opening',
  'hook',
  'core_teaching',
  'transition_to_activation',
  'closing'
);

create table lesson_script_sections (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  section_type script_section_type not null,
  title text,
  duration_minutes integer,
  sequence integer not null,
  intro_directions text, -- "Welcome students, set context..."
  script_text text, -- The actual word-for-word script
  prayer_text text, -- Opening or closing prayer
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lesson_id, sequence)
);

create trigger script_sections_updated_at
  before update on lesson_script_sections
  for each row execute function set_updated_at();

create index idx_script_sections_lesson on lesson_script_sections(lesson_id);
create index idx_script_sections_type on lesson_script_sections(section_type);

comment on table lesson_script_sections is 'Word-for-word teacher facilitation scripts, structured by section';

-- =====================================================
-- SCRIPT MOMENTS
-- =====================================================
-- Within a script section: "SAY", "ASK", "DO", "PRAY", etc.
-- This lets AI query for specific moment types across lessons

create type script_moment_type as enum (
  'say',          -- Direct teacher dialogue
  'ask',          -- Question to students
  'pray',         -- Prayer moment
  'pause',        -- Allow silence/responses
  'note_to_facilitator', -- Internal direction
  'transition',   -- Move to next section
  'illustration', -- Story or example
  'scripture_read'
);

create table lesson_script_moments (
  id uuid primary key default gen_random_uuid(),
  script_section_id uuid not null references lesson_script_sections(id) on delete cascade,
  moment_type script_moment_type not null,
  sequence integer not null,
  content text not null,
  duration_seconds integer,
  created_at timestamptz not null default now(),
  unique (script_section_id, sequence)
);

create index idx_moments_section on lesson_script_moments(script_section_id);
create index idx_moments_type on lesson_script_moments(moment_type);

comment on table lesson_script_moments is 'Granular script moments — SAY, ASK, PRAY, etc. — queryable across all lessons';
