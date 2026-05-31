-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 006 — Assessment, Facilitator Tips, Resources
-- =====================================================

-- =====================================================
-- ASSESSMENT INDICATORS
-- =====================================================

create type assessment_timing as enum ('during_lesson', 'after_lesson');

create table lesson_assessment_indicators (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  timing assessment_timing not null,
  indicator_text text not null,
  sequence integer not null,
  -- Maps to an objective for closing the loop
  related_objective_id uuid references lesson_objectives(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (lesson_id, timing, sequence)
);

create index idx_assessments_lesson on lesson_assessment_indicators(lesson_id);
create index idx_assessments_timing on lesson_assessment_indicators(timing);

comment on table lesson_assessment_indicators is 'How facilitators measure transformation per lesson';

-- =====================================================
-- FACILITATOR TIPS
-- =====================================================

create type tip_phase as enum ('before_class', 'during_class', 'after_class', 'pastoral_care');

create table lesson_facilitator_tips (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  phase tip_phase not null,
  title text,
  content text not null,
  sequence integer not null,
  is_critical boolean not null default false, -- Highlight as must-know
  created_at timestamptz not null default now(),
  unique (lesson_id, phase, sequence)
);

create index idx_tips_lesson on lesson_facilitator_tips(lesson_id);
create index idx_tips_phase on lesson_facilitator_tips(phase);
create index idx_tips_critical on lesson_facilitator_tips(is_critical) where is_critical = true;

comment on table lesson_facilitator_tips is 'Before/during/after facilitator guidance + pastoral care notes';

-- =====================================================
-- RESISTANCE HANDLERS
-- =====================================================
-- Specific to your curriculum pattern:
-- "Student objection X → Facilitator response Y"

create table lesson_resistance_handlers (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  objection text not null,
  response text not null,
  sequence integer not null,
  created_at timestamptz not null default now(),
  unique (lesson_id, sequence)
);

create index idx_resistance_lesson on lesson_resistance_handlers(lesson_id);

comment on table lesson_resistance_handlers is 'Common student resistance and facilitator responses';

-- =====================================================
-- RESOURCES & RECOMMENDATIONS
-- =====================================================

create type resource_type as enum (
  'book',
  'article',
  'video',
  'audio',
  'website',
  'tool',
  'app',
  'document'
);

create table lesson_resources (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  resource_type resource_type not null,
  title text not null,
  author text,
  url text,
  description text,
  is_required boolean not null default false,
  sequence integer not null,
  created_at timestamptz not null default now()
);

create index idx_resources_lesson on lesson_resources(lesson_id);
create index idx_resources_type on lesson_resources(resource_type);

comment on table lesson_resources is 'Books, articles, tools recommended per lesson';

-- =====================================================
-- NEXT WEEK PREVIEW
-- =====================================================

create table lesson_previews (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade unique,
  preview_text text not null,
  preparation_assignment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger previews_updated_at
  before update on lesson_previews
  for each row execute function set_updated_at();

create index idx_previews_lesson on lesson_previews(lesson_id);

comment on table lesson_previews is 'Preview of next week + prep assignments';
