-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 010 — Row Level Security
-- =====================================================
-- Enforces three-role access:
--   - Students see only their own data + their cohort's shared content
--   - Facilitators see their assigned cohorts
--   - Admins see everything
-- =====================================================

-- =====================================================
-- HELPER: Get student's cohort IDs
-- =====================================================

create or replace function student_cohort_ids(p_user_id uuid)
returns setof uuid as $$
  select cohort_id from cohort_students
  where student_id = p_user_id and status = 'active'
$$ language sql stable security definer;

-- =====================================================
-- HELPER: Get facilitator's cohort IDs
-- =====================================================

create or replace function facilitator_cohort_ids(p_user_id uuid)
returns setof uuid as $$
  select cohort_id from cohort_facilitators
  where facilitator_id = p_user_id
$$ language sql stable security definer;

-- =====================================================
-- ENABLE RLS
-- =====================================================

alter table profiles enable row level security;
alter table quarters enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table lesson_objectives enable row level security;
alter table lesson_scriptures enable row level security;
alter table lesson_script_sections enable row level security;
alter table lesson_script_moments enable row level security;
alter table lesson_activations enable row level security;
alter table activation_steps enable row level security;
alter table lesson_discussions enable row level security;
alter table lesson_workbook_elements enable row level security;
alter table lesson_assessment_indicators enable row level security;
alter table lesson_facilitator_tips enable row level security;
alter table lesson_resistance_handlers enable row level security;
alter table lesson_resources enable row level security;
alter table lesson_previews enable row level security;
alter table cohorts enable row level security;
alter table cohort_students enable row level security;
alter table cohort_facilitators enable row level security;
alter table weekly_flow enable row level security;
alter table attendance enable row level security;
alter table progress enable row level security;
alter table applications enable row level security;
alter table reflections enable row level security;
alter table identity_blueprints enable row level security;
alter table purpose_statements enable row level security;
alter table ministry_plans enable row level security;
alter table commissions enable row level security;
alter table cohort_posts enable row level security;
alter table cohort_post_responses enable row level security;
alter table ai_conversations enable row level security;
alter table ai_messages enable row level security;

-- =====================================================
-- PROFILES
-- =====================================================

create policy "users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "facilitators see students in their cohorts"
  on profiles for select
  using (
    id in (
      select cs.student_id
      from cohort_students cs
      where cs.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "students see facilitators in their cohorts"
  on profiles for select
  using (
    id in (
      select cf.facilitator_id
      from cohort_facilitators cf
      where cf.cohort_id in (select student_cohort_ids(auth.uid()))
    )
  );

create policy "students see cohort peers"
  on profiles for select
  using (
    id in (
      select cs.student_id
      from cohort_students cs
      where cs.cohort_id in (select student_cohort_ids(auth.uid()))
    )
  );

create policy "admins see all profiles"
  on profiles for all
  using (is_admin());

-- =====================================================
-- CURRICULUM (quarters, modules, lessons) — all auth users read
-- =====================================================

create policy "auth users read quarters"
  on quarters for select to authenticated using (true);

create policy "admins manage quarters"
  on quarters for all using (is_admin());

create policy "auth users read modules"
  on modules for select to authenticated using (true);

create policy "admins manage modules"
  on modules for all using (is_admin());

create policy "auth users read lessons"
  on lessons for select to authenticated using (true);

create policy "admins manage lessons"
  on lessons for all using (is_admin());

-- Lesson content tables — same pattern
create policy "auth read objectives" on lesson_objectives for select to authenticated using (true);
create policy "admins manage objectives" on lesson_objectives for all using (is_admin());

create policy "auth read scriptures" on lesson_scriptures for select to authenticated using (true);
create policy "admins manage scriptures" on lesson_scriptures for all using (is_admin());

create policy "auth read script sections" on lesson_script_sections for select to authenticated using (true);
create policy "admins manage script sections" on lesson_script_sections for all using (is_admin());

create policy "auth read script moments" on lesson_script_moments for select to authenticated using (true);
create policy "admins manage script moments" on lesson_script_moments for all using (is_admin());

create policy "auth read activations" on lesson_activations for select to authenticated using (true);
create policy "admins manage activations" on lesson_activations for all using (is_admin());

create policy "auth read activation steps" on activation_steps for select to authenticated using (true);
create policy "admins manage activation steps" on activation_steps for all using (is_admin());

create policy "auth read discussions" on lesson_discussions for select to authenticated using (true);
create policy "admins manage discussions" on lesson_discussions for all using (is_admin());

create policy "auth read workbook" on lesson_workbook_elements for select to authenticated using (true);
create policy "admins manage workbook" on lesson_workbook_elements for all using (is_admin());

-- Facilitator-specific content (only facilitators and admins)
create policy "facilitators read assessments"
  on lesson_assessment_indicators for select
  using (is_facilitator_or_admin());

create policy "admins manage assessments"
  on lesson_assessment_indicators for all using (is_admin());

create policy "facilitators read tips"
  on lesson_facilitator_tips for select
  using (is_facilitator_or_admin());

create policy "admins manage tips"
  on lesson_facilitator_tips for all using (is_admin());

create policy "facilitators read resistance"
  on lesson_resistance_handlers for select
  using (is_facilitator_or_admin());

create policy "admins manage resistance"
  on lesson_resistance_handlers for all using (is_admin());

create policy "auth read resources" on lesson_resources for select to authenticated using (true);
create policy "admins manage resources" on lesson_resources for all using (is_admin());

create policy "auth read previews" on lesson_previews for select to authenticated using (true);
create policy "admins manage previews" on lesson_previews for all using (is_admin());

-- =====================================================
-- COHORTS
-- =====================================================

create policy "students see their cohorts"
  on cohorts for select
  using (id in (select student_cohort_ids(auth.uid())));

create policy "facilitators see their cohorts"
  on cohorts for select
  using (id in (select facilitator_cohort_ids(auth.uid())));

create policy "admins manage cohorts"
  on cohorts for all using (is_admin());

-- =====================================================
-- COHORT MEMBERSHIPS
-- =====================================================

create policy "students see their cohort membership"
  on cohort_students for select
  using (student_id = auth.uid());

create policy "facilitators see students in their cohorts"
  on cohort_students for select
  using (cohort_id in (select facilitator_cohort_ids(auth.uid())));

create policy "admins manage cohort students"
  on cohort_students for all using (is_admin());

create policy "students see cohort facilitators"
  on cohort_facilitators for select
  using (cohort_id in (select student_cohort_ids(auth.uid())));

create policy "facilitators see cohort assignments"
  on cohort_facilitators for select
  using (facilitator_id = auth.uid());

create policy "admins manage cohort facilitators"
  on cohort_facilitators for all using (is_admin());

-- =====================================================
-- WEEKLY FLOW
-- =====================================================

create policy "students see their weekly flow"
  on weekly_flow for select
  using (cohort_id in (select student_cohort_ids(auth.uid())));

create policy "facilitators see their weekly flow"
  on weekly_flow for select
  using (cohort_id in (select facilitator_cohort_ids(auth.uid())));

create policy "facilitators update their weekly flow"
  on weekly_flow for update
  using (cohort_id in (select facilitator_cohort_ids(auth.uid())));

create policy "admins manage weekly flow"
  on weekly_flow for all using (is_admin());

-- =====================================================
-- ATTENDANCE
-- =====================================================

create policy "students see own attendance"
  on attendance for select
  using (student_id = auth.uid());

create policy "facilitators see attendance for their cohorts"
  on attendance for select
  using (
    weekly_flow_id in (
      select wf.id from weekly_flow wf
      where wf.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "facilitators record attendance"
  on attendance for insert
  with check (
    weekly_flow_id in (
      select wf.id from weekly_flow wf
      where wf.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "facilitators update attendance"
  on attendance for update
  using (
    weekly_flow_id in (
      select wf.id from weekly_flow wf
      where wf.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "admins manage attendance"
  on attendance for all using (is_admin());

-- =====================================================
-- PROGRESS
-- =====================================================

create policy "students see own progress"
  on progress for select using (student_id = auth.uid());

create policy "students create own progress"
  on progress for insert with check (student_id = auth.uid());

create policy "students update own progress"
  on progress for update using (student_id = auth.uid());

create policy "facilitators see cohort progress"
  on progress for select
  using (cohort_id in (select facilitator_cohort_ids(auth.uid())));

create policy "facilitators assess cohort progress"
  on progress for update
  using (cohort_id in (select facilitator_cohort_ids(auth.uid())));

create policy "admins manage progress"
  on progress for all using (is_admin());

-- =====================================================
-- APPLICATIONS
-- =====================================================
-- Public can insert (apply)
-- Only admins can read and update

create policy "anyone can submit application"
  on applications for insert with check (true);

create policy "applicants can view own application by email"
  on applications for select using (email = auth.email());

create policy "admins manage applications"
  on applications for all using (is_admin());

-- =====================================================
-- REFLECTIONS
-- =====================================================

create policy "students manage own reflections"
  on reflections for all using (student_id = auth.uid());

create policy "facilitators see shared reflections"
  on reflections for select
  using (
    shared_with_facilitator = true and
    student_id in (
      select cs.student_id from cohort_students cs
      where cs.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "facilitators respond to shared reflections"
  on reflections for update
  using (
    shared_with_facilitator = true and
    student_id in (
      select cs.student_id from cohort_students cs
      where cs.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "cohort peers see shared cohort reflections"
  on reflections for select
  using (
    shared_with_cohort = true and
    student_id in (
      select cs.student_id from cohort_students cs
      where cs.cohort_id in (select student_cohort_ids(auth.uid()))
    )
  );

create policy "admins see all reflections"
  on reflections for all using (is_admin());

-- =====================================================
-- CAPSTONES
-- =====================================================

create policy "students manage own identity blueprint"
  on identity_blueprints for all using (student_id = auth.uid());

create policy "facilitators see cohort identity blueprints"
  on identity_blueprints for select
  using (
    student_id in (
      select cs.student_id from cohort_students cs
      where cs.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "admins manage identity blueprints"
  on identity_blueprints for all using (is_admin());

create policy "students manage own purpose statement"
  on purpose_statements for all using (student_id = auth.uid());

create policy "facilitators see cohort purpose statements"
  on purpose_statements for select
  using (
    student_id in (
      select cs.student_id from cohort_students cs
      where cs.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "admins manage purpose statements"
  on purpose_statements for all using (is_admin());

create policy "students manage own ministry plan"
  on ministry_plans for all using (student_id = auth.uid());

create policy "facilitators see cohort ministry plans"
  on ministry_plans for select
  using (
    student_id in (
      select cs.student_id from cohort_students cs
      where cs.cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "admins manage ministry plans"
  on ministry_plans for all using (is_admin());

create policy "students see own commission"
  on commissions for select using (student_id = auth.uid());

create policy "facilitators see cohort commissions"
  on commissions for select
  using (cohort_id in (select facilitator_cohort_ids(auth.uid())));

create policy "admins manage commissions"
  on commissions for all using (is_admin());

-- =====================================================
-- COHORT FEED
-- =====================================================

create policy "cohort members see posts"
  on cohort_posts for select
  using (
    cohort_id in (select student_cohort_ids(auth.uid()))
    or cohort_id in (select facilitator_cohort_ids(auth.uid()))
  );

create policy "cohort members create posts"
  on cohort_posts for insert
  with check (
    author_id = auth.uid()
    and (
      cohort_id in (select student_cohort_ids(auth.uid()))
      or cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "authors update own posts"
  on cohort_posts for update using (author_id = auth.uid());

create policy "authors delete own posts"
  on cohort_posts for delete using (author_id = auth.uid());

create policy "admins manage posts"
  on cohort_posts for all using (is_admin());

create policy "cohort members see responses"
  on cohort_post_responses for select
  using (
    post_id in (
      select id from cohort_posts where
      cohort_id in (select student_cohort_ids(auth.uid()))
      or cohort_id in (select facilitator_cohort_ids(auth.uid()))
    )
  );

create policy "cohort members create responses"
  on cohort_post_responses for insert
  with check (author_id = auth.uid());

create policy "authors manage own responses"
  on cohort_post_responses for all using (author_id = auth.uid());

create policy "admins manage responses"
  on cohort_post_responses for all using (is_admin());

-- =====================================================
-- AI CONVERSATIONS
-- =====================================================

create policy "users manage own AI conversations"
  on ai_conversations for all using (user_id = auth.uid());

create policy "admins see all AI conversations"
  on ai_conversations for select using (is_admin());

create policy "users manage own AI messages"
  on ai_messages for all
  using (
    conversation_id in (
      select id from ai_conversations where user_id = auth.uid()
    )
  );

create policy "admins see all AI messages"
  on ai_messages for select using (is_admin());

-- =====================================================
-- FORCE ROW LEVEL SECURITY
-- =====================================================
-- Even superuser must obey RLS for institutional data

alter table profiles force row level security;
alter table cohorts force row level security;
alter table cohort_students force row level security;
alter table cohort_facilitators force row level security;
alter table weekly_flow force row level security;
alter table attendance force row level security;
alter table progress force row level security;
alter table reflections force row level security;
alter table identity_blueprints force row level security;
alter table purpose_statements force row level security;
alter table ministry_plans force row level security;
alter table commissions force row level security;
alter table cohort_posts force row level security;
alter table cohort_post_responses force row level security;
alter table ai_conversations force row level security;
alter table ai_messages force row level security;
