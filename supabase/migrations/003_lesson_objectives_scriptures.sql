-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 003 — Lesson Content: Objectives & Scriptures
-- =====================================================
-- Fully relational so AI can query across all 80 lessons
-- =====================================================

-- =====================================================
-- LEARNING OBJECTIVES
-- =====================================================

create table lesson_objectives (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  objective_number integer not null,
  objective_text text not null,
  -- Optional verb (Understand, Distinguish, Identify, Create, Experience)
  bloom_verb text,
  created_at timestamptz not null default now(),
  unique (lesson_id, objective_number)
);

create index idx_objectives_lesson on lesson_objectives(lesson_id);

comment on table lesson_objectives is 'Measurable learning outcomes per lesson';

-- =====================================================
-- KEY SCRIPTURES
-- =====================================================

create table lesson_scriptures (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  is_primary boolean not null default false,
  reference text not null,
  full_text text,
  translation text default 'NIV',
  sequence integer not null,
  created_at timestamptz not null default now(),
  unique (lesson_id, sequence)
);

create index idx_scriptures_lesson on lesson_scriptures(lesson_id);
create index idx_scriptures_primary on lesson_scriptures(lesson_id, is_primary);

comment on table lesson_scriptures is 'Primary and supporting scriptures per lesson';
