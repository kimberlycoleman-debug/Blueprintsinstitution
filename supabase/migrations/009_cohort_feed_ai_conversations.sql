-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 009 — Cohort Feed & AI Conversations
-- =====================================================

-- =====================================================
-- COHORT FEED
-- =====================================================

create type feed_post_type as enum (
  'announcement',
  'prayer_request',
  'celebration',
  'reflection_share',
  'question',
  'resource_share'
);

create table cohort_posts (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references cohorts(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  post_type feed_post_type not null default 'reflection_share',
  title text,
  content text not null,
  is_pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger cohort_posts_updated_at
  before update on cohort_posts
  for each row execute function set_updated_at();

create index idx_posts_cohort on cohort_posts(cohort_id);
create index idx_posts_author on cohort_posts(author_id);
create index idx_posts_pinned on cohort_posts(cohort_id, is_pinned) where is_pinned = true;
create index idx_posts_created on cohort_posts(cohort_id, created_at desc);

comment on table cohort_posts is 'Cohort space — prayer, celebrations, reflections';

-- =====================================================
-- POST RESPONSES
-- =====================================================

create table cohort_post_responses (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references cohort_posts(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index idx_responses_post on cohort_post_responses(post_id);

comment on table cohort_post_responses is 'Replies to cohort posts';

-- =====================================================
-- AI CONVERSATIONS
-- =====================================================
-- Persistent AI conversation history for each student

create type ai_conversation_type as enum (
  'reflection_companion',
  'identity_blueprint_builder',
  'purpose_statement_builder',
  'ministry_plan_assistant',
  'general_formation_companion',
  'scripture_meditation'
);

create table ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  conversation_type ai_conversation_type not null,

  -- Context
  related_lesson_id uuid references lessons(id) on delete set null,
  related_reflection_id uuid references reflections(id) on delete set null,
  related_capstone_type text, -- 'identity_blueprint', 'purpose_statement', 'ministry_plan'

  title text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger ai_conversations_updated_at
  before update on ai_conversations
  for each row execute function set_updated_at();

create index idx_ai_conv_user on ai_conversations(user_id);
create index idx_ai_conv_type on ai_conversations(conversation_type);
create index idx_ai_conv_lesson on ai_conversations(related_lesson_id);

comment on table ai_conversations is 'AI conversation threads — context-aware formation companion';

-- =====================================================
-- AI MESSAGES
-- =====================================================

create type ai_message_role as enum ('user', 'assistant', 'system');

create table ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references ai_conversations(id) on delete cascade,
  role ai_message_role not null,
  content text not null,
  -- Metadata for AI tuning
  model_used text,
  prompt_tokens integer,
  completion_tokens integer,
  total_tokens integer,
  created_at timestamptz not null default now()
);

create index idx_ai_messages_conversation on ai_messages(conversation_id, created_at);

comment on table ai_messages is 'Individual messages within an AI conversation';
