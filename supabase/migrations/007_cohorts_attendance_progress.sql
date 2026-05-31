-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 007 — Operational Tables
-- =====================================================
-- Cohorts, Weekly Flow, Attendance, Progress Tracking
-- =====================================================

-- =====================================================
-- COHORTS
-- =====================================================

create table cohorts (
  id uuid primary key default gen_random_uuid(),
  cohort_name text not null,
  cohort_code text not null unique,
  start_date date not null,
  end_date date not null,
  status cohort_status not null default 'upcoming',
  quarter_id uuid references quarters(id) on delete restrict,
  max_students integer default 25,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger cohorts_updated_at
  before update on cohorts
  for each row execute function set_updated_at();

create index idx_cohorts_status on cohorts(status);
create index idx_cohorts_quarter on cohorts(quarter_id);
create index idx_cohorts_dates on cohorts(start_date, end_date);

comment on table cohorts is 'Cohort groups of students moving through the curriculum together';

-- =====================================================
-- COHORT MEMBERSHIPS
-- =====================================================
-- Students assigned to cohorts (many-to-many)

create table cohort_students (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references cohorts(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  status student_status not null default 'active',
  enrollment_date date not null default current_date,
  completion_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cohort_id, student_id)
);

create trigger cohort_students_updated_at
  before update on cohort_students
  for each row execute function set_updated_at();

create index idx_cohort_students_cohort on cohort_students(cohort_id);
create index idx_cohort_students_student on cohort_students(student_id);
create index idx_cohort_students_status on cohort_students(status);

comment on table cohort_students is 'Student-to-cohort assignments and status';

-- =====================================================
-- COHORT FACILITATORS
-- =====================================================
-- Facilitators assigned to cohorts (many-to-many)

create type facilitator_role as enum ('lead', 'co_facilitator', 'guest', 'mentor');

create table cohort_facilitators (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references cohorts(id) on delete cascade,
  facilitator_id uuid not null references profiles(id) on delete cascade,
  role facilitator_role not null default 'lead',
  assigned_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  unique (cohort_id, facilitator_id, role)
);

create index idx_cohort_facilitators_cohort on cohort_facilitators(cohort_id);
create index idx_cohort_facilitators_facilitator on cohort_facilitators(facilitator_id);

comment on table cohort_facilitators is 'Facilitator-to-cohort assignments';

-- =====================================================
-- WEEKLY FLOW (scheduled sessions)
-- =====================================================

create table weekly_flow (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references cohorts(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete restrict,
  week_number integer not null,
  scheduled_date date not null,
  scheduled_start_time time,
  scheduled_end_time time,
  delivery_mode text default 'live', -- 'live', 'in_app', 'hybrid'
  facilitator_id uuid references profiles(id) on delete set null,
  status weekly_flow_status not null default 'scheduled',
  location text,
  meeting_link text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cohort_id, week_number)
);

create trigger weekly_flow_updated_at
  before update on weekly_flow
  for each row execute function set_updated_at();

create index idx_weekly_flow_cohort on weekly_flow(cohort_id);
create index idx_weekly_flow_lesson on weekly_flow(lesson_id);
create index idx_weekly_flow_date on weekly_flow(scheduled_date);
create index idx_weekly_flow_status on weekly_flow(status);

comment on table weekly_flow is 'Scheduled weekly sessions per cohort';

-- =====================================================
-- ATTENDANCE
-- =====================================================

create table attendance (
  id uuid primary key default gen_random_uuid(),
  weekly_flow_id uuid not null references weekly_flow(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  status attendance_status not null,
  arrival_time time,
  departure_time time,
  notes text,
  recorded_by uuid references profiles(id) on delete set null,
  recorded_at timestamptz not null default now(),
  unique (weekly_flow_id, student_id)
);

create index idx_attendance_session on attendance(weekly_flow_id);
create index idx_attendance_student on attendance(student_id);
create index idx_attendance_status on attendance(status);

comment on table attendance is 'Per-session attendance tracking';

-- =====================================================
-- PROGRESS TRACKER
-- =====================================================
-- Per-student per-lesson progress with dual scoring

create table progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,

  completion_status progress_completion not null default 'not_started',
  started_at timestamptz,
  completed_at timestamptz,

  -- Dual scoring system: numeric + qualitative
  assessment_score numeric(5,2) check (assessment_score >= 0 and assessment_score <= 100),
  qualitative_status assessment_qualitative,

  -- Facilitator's narrative feedback
  facilitator_notes text,
  -- Internal tracking notes
  notes text,

  assessed_by uuid references profiles(id) on delete set null,
  assessed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, lesson_id)
);

create trigger progress_updated_at
  before update on progress
  for each row execute function set_updated_at();

create index idx_progress_student on progress(student_id);
create index idx_progress_lesson on progress(lesson_id);
create index idx_progress_cohort on progress(cohort_id);
create index idx_progress_status on progress(completion_status);
create index idx_progress_qualitative on progress(qualitative_status);

comment on table progress is 'Per-student per-lesson progress with dual scoring (numeric + qualitative depth)';
