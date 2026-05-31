-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 005 — Activation, Discussion, Workbook
-- =====================================================

-- =====================================================
-- ACTIVATION EXERCISES
-- =====================================================

create table lesson_activations (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  title text not null,
  purpose text,
  duration_minutes integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger activations_updated_at
  before update on lesson_activations
  for each row execute function set_updated_at();

create index idx_activations_lesson on lesson_activations(lesson_id);

comment on table lesson_activations is 'Hands-on activation exercise per lesson';

-- Activation step structure (multi-step exercises)
create table activation_steps (
  id uuid primary key default gen_random_uuid(),
  activation_id uuid not null references lesson_activations(id) on delete cascade,
  step_number integer not null,
  title text,
  duration_minutes integer,
  instructions text not null,
  materials_needed text,
  created_at timestamptz not null default now(),
  unique (activation_id, step_number)
);

create index idx_activation_steps on activation_steps(activation_id);

-- =====================================================
-- DISCUSSION QUESTIONS
-- =====================================================

create type discussion_group_type as enum ('large_group', 'small_group', 'partner', 'individual');

create table lesson_discussions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  group_type discussion_group_type not null default 'large_group',
  question_number integer not null,
  question_text text not null,
  facilitator_notes text,
  created_at timestamptz not null default now(),
  unique (lesson_id, question_number)
);

create index idx_discussions_lesson on lesson_discussions(lesson_id);

comment on table lesson_discussions is 'Discussion questions for group processing';

-- =====================================================
-- STUDENT WORKBOOK
-- =====================================================

create type workbook_element_type as enum (
  'reflection_prompt',
  'worksheet',
  'fill_in',
  'planning_template',
  'scripture_memory',
  'commitment',
  'assignment'
);

create table lesson_workbook_elements (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  element_type workbook_element_type not null,
  title text not null,
  instructions text,
  prompt_text text,
  fields_schema jsonb, -- For structured templates (e.g., Sabbath Boundaries with subfields)
  sequence integer not null,
  is_required boolean not null default true,
  due_after_lesson boolean not null default false, -- Complete during or take-home
  created_at timestamptz not null default now(),
  unique (lesson_id, sequence)
);

create index idx_workbook_lesson on lesson_workbook_elements(lesson_id);
create index idx_workbook_type on lesson_workbook_elements(element_type);

comment on table lesson_workbook_elements is 'Student workbook sections — reflections, worksheets, templates';
