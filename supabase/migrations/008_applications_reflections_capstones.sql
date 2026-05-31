-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 008 — Application, Reflections, Capstones
-- =====================================================

-- =====================================================
-- APPLICATIONS (Apply for Transformation)
-- =====================================================

create type application_status as enum (
  'submitted',
  'under_review',
  'interview_scheduled',
  'interview_complete',
  'approved',
  'declined',
  'waitlisted',
  'withdrawn'
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  application_number text not null unique,

  -- Applicant info
  full_name text not null,
  email text not null,
  phone text,
  date_of_birth date,
  city text,
  state text,
  country text,

  -- Application content
  testimony text not null,
  why_now text not null,           -- "Why this season?"
  expectations text,                -- What they hope to receive
  current_church text,
  current_role_title text,
  hours_committed_weekly integer,
  prior_discipleship_experience text,

  -- Vetting & decision
  status application_status not null default 'submitted',
  reviewed_by uuid references profiles(id) on delete set null,
  reviewer_notes text,
  interview_date date,
  interview_notes text,
  decision_date date,
  decision_notes text,

  -- AI-generated screening
  ai_summary text,
  ai_flags text[],

  -- Cohort assignment
  assigned_cohort_id uuid references cohorts(id) on delete set null,

  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger applications_updated_at
  before update on applications
  for each row execute function set_updated_at();

create index idx_applications_status on applications(status);
create index idx_applications_email on applications(email);
create index idx_applications_submitted on applications(submitted_at desc);

comment on table applications is 'Applications for transformation — institutional admission flow';

-- Link applications to profiles after approval
alter table profiles
  add constraint profiles_application_fkey
  foreign key (application_id)
  references applications(id)
  on delete set null;

-- =====================================================
-- REFLECTIONS (Student reflection journal)
-- =====================================================

create table reflections (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  workbook_element_id uuid references lesson_workbook_elements(id) on delete set null,

  -- Reflection content
  prompt text,
  response text not null,
  word_count integer,

  -- AI engagement
  ai_response text,        -- AI companion's response to the reflection
  ai_followup_prompts text[], -- AI-generated deeper questions

  -- Visibility
  is_private boolean not null default true,
  shared_with_facilitator boolean not null default false,
  shared_with_cohort boolean not null default false,

  -- Facilitator review
  facilitator_reviewed boolean not null default false,
  facilitator_response text,
  facilitator_id uuid references profiles(id) on delete set null,
  reviewed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger reflections_updated_at
  before update on reflections
  for each row execute function set_updated_at();

create index idx_reflections_student on reflections(student_id);
create index idx_reflections_lesson on reflections(lesson_id);
create index idx_reflections_facilitator on reflections(facilitator_id) where shared_with_facilitator = true;
create index idx_reflections_created on reflections(created_at desc);

comment on table reflections is 'Student reflection journal with AI companion responses';

-- =====================================================
-- IDENTITY BLUEPRINT STATEMENT (Q1 Capstone)
-- =====================================================

create table identity_blueprints (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade unique,

  -- Core identity declaration
  identity_statement text not null,

  -- Component sections
  who_god_says_i_am text,
  my_god_given_design text,
  my_strengths text,        -- CliftonStrengths integration
  my_enneagram text,
  my_spiritual_gifts text,
  my_biblical_parallels text,
  my_purpose_themes text,

  -- Lies vs Truth
  identity_lies_renounced text[],
  truth_declarations text[],

  -- AI assistance
  ai_draft_versions jsonb,
  ai_synthesis_notes text,

  -- Status
  is_complete boolean not null default false,
  submitted_at timestamptz,
  facilitator_reviewed boolean not null default false,
  facilitator_response text,
  reviewed_by uuid references profiles(id) on delete set null,
  reviewed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger identity_blueprints_updated_at
  before update on identity_blueprints
  for each row execute function set_updated_at();

create index idx_blueprints_student on identity_blueprints(student_id);
create index idx_blueprints_complete on identity_blueprints(is_complete);

comment on table identity_blueprints is 'Q1 Capstone — comprehensive identity statement';

-- =====================================================
-- PURPOSE STATEMENT (Q4 Capstone)
-- =====================================================

create table purpose_statements (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade unique,

  -- Core purpose declaration
  purpose_statement text not null,

  -- Component sections
  my_calling text,
  my_assignment text,
  my_passions text,
  my_burdens text,           -- What grieves your heart for God
  my_unique_contribution text,
  my_kingdom_impact text,

  -- AI assistance
  ai_synthesis_from_q1_q3 text,
  ai_draft_versions jsonb,

  -- Status
  is_complete boolean not null default false,
  submitted_at timestamptz,
  facilitator_reviewed boolean not null default false,
  facilitator_response text,
  reviewed_by uuid references profiles(id) on delete set null,
  reviewed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger purpose_statements_updated_at
  before update on purpose_statements
  for each row execute function set_updated_at();

create index idx_purpose_student on purpose_statements(student_id);
create index idx_purpose_complete on purpose_statements(is_complete);

comment on table purpose_statements is 'Q4 Capstone — purpose declaration';

-- =====================================================
-- MINISTRY LAUNCH PLAN (Q4 Capstone)
-- =====================================================

create table ministry_plans (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade unique,

  -- Plan summary
  ministry_name text,
  vision_statement text,
  mission_statement text,
  target_audience text,

  -- Action plan
  three_month_goals text[],
  six_month_goals text[],
  one_year_goals text[],

  -- Resources & team
  team_needed text,
  resources_needed text,
  funding_needed text,
  partnerships_sought text,

  -- Timeline
  launch_date date,
  first_milestone_date date,

  -- AI assistance
  ai_action_steps jsonb,
  ai_resource_recommendations text,

  -- Status
  is_complete boolean not null default false,
  submitted_at timestamptz,
  facilitator_reviewed boolean not null default false,
  facilitator_response text,
  reviewed_by uuid references profiles(id) on delete set null,
  reviewed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger ministry_plans_updated_at
  before update on ministry_plans
  for each row execute function set_updated_at();

create index idx_ministry_student on ministry_plans(student_id);
create index idx_ministry_complete on ministry_plans(is_complete);

comment on table ministry_plans is 'Q4 Capstone — actionable ministry launch plan';

-- =====================================================
-- COMMISSIONING & CERTIFICATES
-- =====================================================

create table commissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade unique,
  cohort_id uuid not null references cohorts(id) on delete restrict,

  -- Eligibility tracking
  attendance_percentage numeric(5,2),
  lessons_completed integer not null default 0,
  identity_blueprint_complete boolean not null default false,
  purpose_statement_complete boolean not null default false,
  ministry_plan_complete boolean not null default false,
  community_covenant_signed boolean not null default false,

  -- Commissioning
  certificate_number text unique,
  certificate_issued boolean not null default false,
  certificate_url text,
  commissioning_date date,
  commissioning_location text,
  prophetic_words text[],

  -- Final declarations
  calling_declaration text,
  final_blessing text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger commissions_updated_at
  before update on commissions
  for each row execute function set_updated_at();

create index idx_commissions_student on commissions(student_id);
create index idx_commissions_cohort on commissions(cohort_id);
create index idx_commissions_issued on commissions(certificate_issued);

comment on table commissions is 'Graduation, commissioning, and certificate issuance';
