-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 023 — Analytics Rollups
-- =====================================================
-- Computed aggregate tables and functions:
--   - cohort_analytics       (per-cohort snapshot metrics)
--   - institutional_metrics  (institute-wide snapshots)
--   - outcome_followups      (longitudinal 6mo/12mo/24mo)
--   - funding_records        (grants + donor gifts)
-- Plus the compute functions, at-risk detection,
-- and grant report helpers.
-- =====================================================

-- =====================================================
-- ENUMS
-- =====================================================

create type followup_period as enum (
  '6_month',
  '12_month',
  '24_month'
);

create type funding_type as enum (
  'grant',
  'major_donor',
  'institutional_partner',
  'board_gift',
  'general_donation'
);

create type funding_status as enum (
  'prospect',
  'applied',
  'awarded',
  'declined',
  'reporting',
  'closed'
);

-- =====================================================
-- COHORT ANALYTICS
-- =====================================================
-- Snapshot rollup per cohort. Recomputed on schedule.
-- Powers facilitator dashboard and founder cohort view.
-- =====================================================

create table cohort_analytics (
  id uuid primary key default gen_random_uuid(),

  cohort_id uuid not null references cohorts(id) on delete cascade,
  snapshot_date date not null default current_date,

  -- Enrollment
  total_enrolled integer default 0,
  active_students integer default 0,
  withdrawn_students integer default 0,
  completed_students integer default 0,

  -- Engagement
  avg_attendance_rate numeric(5,2),       -- 0.00–100.00
  avg_lesson_completion_rate numeric(5,2),
  avg_reflection_submission_rate numeric(5,2),
  avg_cohort_participation_rate numeric(5,2),

  -- Formation (Transformation Index)
  avg_baseline_index numeric(5,2),
  avg_current_index numeric(5,2),
  avg_index_gain numeric(5,2),            -- current minus baseline
  highest_index numeric(5,2),
  lowest_index numeric(5,2),

  -- Per-dimension averages (current checkpoint)
  avg_identity_score numeric(5,2),
  avg_healing_score numeric(5,2),
  avg_calling_score numeric(5,2),
  avg_maturity_score numeric(5,2),

  -- Capstone progress
  identity_blueprints_submitted integer default 0,
  purpose_statements_submitted integer default 0,
  ministry_plans_submitted integer default 0,

  -- At-risk
  at_risk_count integer default 0,        -- students flagged by detect_at_risk_students()

  -- Facilitator effectiveness (proxy: avg index gain under this facilitator)
  facilitator_effectiveness_score numeric(5,2),

  -- Retention
  retention_rate numeric(5,2),            -- started ÷ still active or completed

  computed_at timestamptz not null default now()
);

create index idx_cohort_analytics_cohort on cohort_analytics(cohort_id);
create index idx_cohort_analytics_date on cohort_analytics(snapshot_date desc);

comment on table cohort_analytics is
  'Per-cohort analytics snapshots. Recomputed nightly. Powers facilitator and founder dashboards.';

-- =====================================================
-- INSTITUTIONAL METRICS
-- =====================================================
-- Institute-wide snapshot. One row per snapshot date.
-- Powers the founder sovereign dashboard top-line vitals.
-- =====================================================

create table institutional_metrics (
  id uuid primary key default gen_random_uuid(),
  snapshot_date date not null default current_date unique,

  -- Scale
  total_students_served_alltime integer default 0,
  active_students_now integer default 0,
  active_cohorts_now integer default 0,
  total_cohorts_completed integer default 0,

  -- Formation outcomes
  total_graduates integer default 0,        -- completed + commissioned
  avg_transformation_index_alltime numeric(5,2),
  avg_index_gain_per_graduate numeric(5,2),

  -- Capstone completion
  total_identity_blueprints integer default 0,
  total_purpose_statements integer default 0,
  total_ministry_plans integer default 0,
  total_commissionings integer default 0,

  -- Economics
  free_seats_funded integer default 0,
  institutional_seats_paid integer default 0,
  cost_per_completion numeric(10,2),
  total_grant_funding_awarded numeric(12,2) default 0,
  total_grant_funding_deployed numeric(12,2) default 0,

  -- Efficiency
  overall_retention_rate numeric(5,2),
  avg_attendance_rate_allcohorts numeric(5,2),
  avg_reflection_rate_allcohorts numeric(5,2),

  computed_at timestamptz not null default now()
);

comment on table institutional_metrics is
  'Institute-wide snapshot metrics. One row per date. Powers founder sovereign dashboard and grant reporting.';

-- =====================================================
-- OUTCOME FOLLOWUPS
-- =====================================================
-- Longitudinal tracking post-graduation.
-- 6-month, 12-month, 24-month checkpoints.
-- This is what separates "we ran a program" from
-- "we produced lasting change."
-- =====================================================

create table outcome_followups (
  id uuid primary key default gen_random_uuid(),

  student_id uuid not null references profiles(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,
  followup_period followup_period not null,

  -- Still walking in blueprint?
  still_engaged_in_calling boolean,
  calling_activation_narrative text,       -- in their own words

  -- Ministry launched?
  ministry_launched boolean,
  ministry_description text,
  ministry_reach_count integer,           -- estimated people impacted

  -- Discipling others?
  discipling_others boolean,
  disciples_count integer,

  -- Formation sustained?
  transformation_sustained_self_score integer check (transformation_sustained_self_score between 1 and 7),
  transformation_sustained_narrative text,

  -- Spiritual disciplines
  maintaining_disciplines boolean,
  disciplines_narrative text,

  -- Any regression?
  has_regressed boolean default false,
  regression_narrative text,

  -- Meta
  collected_at timestamptz not null default now(),
  collected_by uuid references profiles(id) on delete set null,  -- facilitator / staff
  is_verified boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger outcome_followups_updated_at
  before update on outcome_followups
  for each row execute function set_updated_at();

create index idx_followups_student on outcome_followups(student_id);
create index idx_followups_period on outcome_followups(followup_period);
create unique index idx_followups_student_period
  on outcome_followups(student_id, followup_period);

comment on table outcome_followups is
  'Longitudinal post-graduation outcome tracking at 6mo, 12mo, 24mo. The evidence that formation lasted.';

-- =====================================================
-- FUNDING RECORDS
-- =====================================================
-- Tracks grants, major donors, and institutional
-- partner revenue. Powers cost-per-student reporting
-- and funder accountability.
-- =====================================================

create table funding_records (
  id uuid primary key default gen_random_uuid(),

  -- Classification
  funding_type funding_type not null,
  status funding_status not null default 'prospect',

  -- Source
  source_name text not null,              -- foundation name, donor name, church name
  source_contact text,
  source_email text,

  -- Amounts
  amount_requested numeric(12,2),
  amount_awarded numeric(12,2),
  amount_deployed numeric(12,2) default 0,

  -- Dates
  applied_at date,
  awarded_at date,
  reporting_deadline date,
  period_start date,
  period_end date,

  -- Restricted / unrestricted
  is_restricted boolean not null default false,
  restriction_description text,

  -- Impact allocation
  free_seats_funded integer default 0,    -- how many free student seats this funded
  cohort_ids uuid[] default '{}',         -- cohorts this funding supported

  -- Notes
  notes text,
  proposal_url text,                      -- link to proposal doc
  report_url text,                        -- link to final report

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger funding_records_updated_at
  before update on funding_records
  for each row execute function set_updated_at();

create index idx_funding_type on funding_records(funding_type);
create index idx_funding_status on funding_records(status);
create index idx_funding_source on funding_records(source_name);

comment on table funding_records is
  'Grants, donor gifts, and institutional partner revenue. Powers funder accountability reporting and free-seat tracking.';

-- =====================================================
-- COMPUTED FUNCTION: Cohort Analytics
-- =====================================================

create or replace function compute_cohort_analytics(p_cohort_id uuid)
returns uuid as $$
declare
  v_enrolled          integer;
  v_active            integer;
  v_withdrawn         integer;
  v_completed         integer;
  v_avg_attendance    numeric;
  v_avg_lesson_comp   numeric;
  v_avg_baseline_ti   numeric;
  v_avg_current_ti    numeric;
  v_avg_gain          numeric;
  v_highest_ti        numeric;
  v_lowest_ti         numeric;
  v_avg_identity      numeric;
  v_avg_healing       numeric;
  v_avg_calling       numeric;
  v_avg_maturity      numeric;
  v_ib_count          integer;
  v_ps_count          integer;
  v_mp_count          integer;
  v_at_risk           integer;
  v_retention         numeric;
  v_new_id            uuid;
begin

  -- Enrollment counts
  select
    count(*),
    count(*) filter (where status = 'active'),
    count(*) filter (where status = 'withdrawn'),
    count(*) filter (where status = 'completed')
  into v_enrolled, v_active, v_withdrawn, v_completed
  from cohort_students
  where cohort_id = p_cohort_id;

  -- Attendance rate (average across all sessions in this cohort)
  select round(
    100.0 * count(*) filter (where status = 'present')
    / nullif(count(*), 0), 2
  )
  into v_avg_attendance
  from attendance
  where cohort_id = p_cohort_id;

  -- Lesson completion rate (students who completed ÷ enrolled)
  select round(
    100.0 * count(distinct pr.student_id) filter (where pr.completed_at is not null)
    / nullif(v_enrolled, 0), 2
  )
  into v_avg_lesson_comp
  from progress pr
  where pr.cohort_id = p_cohort_id;

  -- Transformation Index stats
  select
    avg(case when ti.checkpoint = 'baseline' then ti.composite_index end),
    avg(ti.composite_index),
    avg(ti.composite_index) - avg(case when ti.checkpoint = 'baseline' then ti.composite_index end),
    max(ti.composite_index),
    min(ti.composite_index),
    avg(ti.identity_score),
    avg(ti.healing_score),
    avg(ti.calling_score),
    avg(ti.maturity_score)
  into
    v_avg_baseline_ti, v_avg_current_ti, v_avg_gain,
    v_highest_ti, v_lowest_ti,
    v_avg_identity, v_avg_healing, v_avg_calling, v_avg_maturity
  from (
    -- Latest TI per student
    select distinct on (student_id)
      student_id, composite_index, identity_score, healing_score,
      calling_score, maturity_score, checkpoint
    from transformation_index
    where cohort_id = p_cohort_id
    order by student_id, computed_at desc
  ) ti;

  -- Capstone counts
  select count(*) into v_ib_count
  from identity_blueprints ib
  join cohort_students cs on cs.student_id = ib.student_id
  where cs.cohort_id = p_cohort_id;

  select count(*) into v_ps_count
  from purpose_statements ps
  join cohort_students cs on cs.student_id = ps.student_id
  where cs.cohort_id = p_cohort_id;

  select count(*) into v_mp_count
  from ministry_plans mp
  join cohort_students cs on cs.student_id = mp.student_id
  where cs.cohort_id = p_cohort_id;

  -- At-risk: students with <50% engagement (low engagement proxy)
  select count(distinct cs.student_id)
  into v_at_risk
  from cohort_students cs
  left join engagement_events ee on ee.user_id = cs.student_id and ee.cohort_id = p_cohort_id
  where cs.cohort_id = p_cohort_id
    and cs.status = 'active'
  group by cs.student_id
  having count(ee.id) < 5;  -- fewer than 5 engagement events = at-risk signal

  -- Retention rate
  v_retention := round(100.0 * (v_active + v_completed) / nullif(v_enrolled, 0), 2);

  -- Insert snapshot
  insert into cohort_analytics (
    cohort_id,
    snapshot_date,
    total_enrolled,
    active_students,
    withdrawn_students,
    completed_students,
    avg_attendance_rate,
    avg_lesson_completion_rate,
    avg_baseline_index,
    avg_current_index,
    avg_index_gain,
    highest_index,
    lowest_index,
    avg_identity_score,
    avg_healing_score,
    avg_calling_score,
    avg_maturity_score,
    identity_blueprints_submitted,
    purpose_statements_submitted,
    ministry_plans_submitted,
    at_risk_count,
    retention_rate
  ) values (
    p_cohort_id,
    current_date,
    coalesce(v_enrolled, 0),
    coalesce(v_active, 0),
    coalesce(v_withdrawn, 0),
    coalesce(v_completed, 0),
    v_avg_attendance,
    v_avg_lesson_comp,
    v_avg_baseline_ti,
    v_avg_current_ti,
    v_avg_gain,
    v_highest_ti,
    v_lowest_ti,
    v_avg_identity,
    v_avg_healing,
    v_avg_calling,
    v_avg_maturity,
    coalesce(v_ib_count, 0),
    coalesce(v_ps_count, 0),
    coalesce(v_mp_count, 0),
    coalesce(v_at_risk, 0),
    v_retention
  )
  returning id into v_new_id;

  return v_new_id;
end;
$$ language plpgsql security definer;

-- =====================================================
-- COMPUTED FUNCTION: Institute-Wide Metrics
-- =====================================================

create or replace function compute_institute_metrics()
returns uuid as $$
declare
  v_new_id uuid;
begin
  insert into institutional_metrics (
    snapshot_date,
    total_students_served_alltime,
    active_students_now,
    active_cohorts_now,
    total_cohorts_completed,
    total_graduates,
    avg_transformation_index_alltime,
    avg_index_gain_per_graduate,
    total_identity_blueprints,
    total_purpose_statements,
    total_ministry_plans,
    total_commissionings,
    free_seats_funded,
    overall_retention_rate
  )
  select
    current_date,
    -- All-time students
    (select count(*) from cohort_students),
    -- Active now
    (select count(*) from cohort_students where status = 'active'),
    -- Active cohorts
    (select count(*) from cohorts where status = 'active'),
    -- Completed cohorts
    (select count(*) from cohorts where status = 'completed'),
    -- Graduates (completed cohort students)
    (select count(*) from cohort_students where status = 'completed'),
    -- Avg TI (latest per student)
    (select round(avg(composite_index), 2)
     from (
       select distinct on (student_id) composite_index
       from transformation_index
       order by student_id, computed_at desc
     ) latest_ti),
    -- Avg gain per graduate
    (select round(avg(ca.avg_index_gain), 2) from cohort_analytics ca
     join cohorts c on c.id = ca.cohort_id where c.status = 'completed'),
    -- Capstone counts
    (select count(*) from identity_blueprints),
    (select count(*) from purpose_statements),
    (select count(*) from ministry_plans),
    (select count(*) from commissions),
    -- Free seats funded
    (select coalesce(sum(free_seats_funded), 0) from funding_records
     where status in ('awarded', 'reporting', 'closed')),
    -- Retention rate
    (select round(
       100.0 * count(*) filter (where status in ('active', 'completed'))
       / nullif(count(*), 0), 2
     ) from cohort_students)
  on conflict (snapshot_date) do update set
    total_students_served_alltime  = excluded.total_students_served_alltime,
    active_students_now            = excluded.active_students_now,
    active_cohorts_now             = excluded.active_cohorts_now,
    total_cohorts_completed        = excluded.total_cohorts_completed,
    total_graduates                = excluded.total_graduates,
    avg_transformation_index_alltime = excluded.avg_transformation_index_alltime,
    avg_index_gain_per_graduate    = excluded.avg_index_gain_per_graduate,
    total_identity_blueprints      = excluded.total_identity_blueprints,
    total_purpose_statements       = excluded.total_purpose_statements,
    total_ministry_plans           = excluded.total_ministry_plans,
    total_commissionings           = excluded.total_commissionings,
    free_seats_funded              = excluded.free_seats_funded,
    overall_retention_rate         = excluded.overall_retention_rate,
    computed_at                    = now()
  returning id into v_new_id;

  return v_new_id;
end;
$$ language plpgsql security definer;

-- =====================================================
-- FUNCTION: Detect At-Risk Students
-- =====================================================
-- Returns student_ids + risk signals for a cohort.
-- Called nightly or on-demand by facilitator dashboard.
-- =====================================================

create or replace function detect_at_risk_students(p_cohort_id uuid)
returns table (
  student_id uuid,
  full_name text,
  risk_level text,
  signals text[]
) as $$
begin
  return query
  select
    p.id,
    p.full_name,
    case
      when arr.signal_count >= 3 then 'high'
      when arr.signal_count = 2  then 'medium'
      else                            'low'
    end as risk_level,
    arr.signals
  from profiles p
  join cohort_students cs on cs.student_id = p.id
  join lateral (
    select
      count(signal)::integer as signal_count,
      array_agg(signal) as signals
    from (
      -- Signal 1: fewer than 3 engagement events in last 14 days
      select 'low_engagement_14d' as signal
      where (
        select count(*) from engagement_events ee
        where ee.user_id = p.id
          and ee.cohort_id = p_cohort_id
          and ee.occurred_at > now() - interval '14 days'
      ) < 3

      union all

      -- Signal 2: no reflection in last 21 days
      select 'no_reflection_21d'
      where not exists (
        select 1 from reflections r
        where r.student_id = p.id
          and r.created_at > now() - interval '21 days'
      )

      union all

      -- Signal 3: attendance rate below 60%
      select 'low_attendance'
      where (
        select round(
          100.0 * count(*) filter (where att.status = 'present')
          / nullif(count(*), 0), 2
        )
        from attendance att
        where att.student_id = p.id
          and att.cohort_id = p_cohort_id
      ) < 60

      union all

      -- Signal 4: no lesson completion in last 14 days
      select 'no_lesson_14d'
      where not exists (
        select 1 from progress pr
        where pr.student_id = p.id
          and pr.cohort_id = p_cohort_id
          and pr.completed_at > now() - interval '14 days'
      )
    ) signals_raw
  ) arr on true
  where cs.cohort_id = p_cohort_id
    and cs.status = 'active'
    and arr.signal_count > 0
  order by arr.signal_count desc;
end;
$$ language plpgsql security definer;

-- =====================================================
-- RLS POLICIES — ANALYTICS ROLLUPS
-- =====================================================

alter table cohort_analytics enable row level security;
alter table institutional_metrics enable row level security;
alter table outcome_followups enable row level security;
alter table funding_records enable row level security;

-- cohort_analytics: facilitators see their cohorts; admin/founder see all
create policy "Facilitators see their cohort analytics"
  on cohort_analytics for select
  using (
    cohort_id in (
      select cohort_id from cohort_facilitators where facilitator_id = auth.uid()
    )
    or is_admin()
    or is_founder()
  );

create policy "Server can write cohort analytics"
  on cohort_analytics for insert
  with check (auth.uid() is not null);

-- institutional_metrics: admin + founder only
create policy "Admins and founder see institutional metrics"
  on institutional_metrics for select
  using (is_admin() or is_founder());

create policy "Server can write institutional metrics"
  on institutional_metrics for insert
  with check (auth.uid() is not null);

create policy "Server can update institutional metrics"
  on institutional_metrics for update
  using (auth.uid() is not null);

-- outcome_followups: students see own; facilitators see cohort; founder sees all
create policy "Students see own followups"
  on outcome_followups for select
  using (student_id = auth.uid());

create policy "Facilitators see cohort followups"
  on outcome_followups for select
  using (
    cohort_id in (
      select cohort_id from cohort_facilitators where facilitator_id = auth.uid()
    )
    or is_admin()
    or is_founder()
  );

create policy "Facilitators and admins can insert followups"
  on outcome_followups for insert
  with check (is_facilitator_or_admin() or is_founder());

create policy "Facilitators and admins can update followups"
  on outcome_followups for update
  using (is_facilitator_or_admin() or is_founder());

-- funding_records: founder + admin only
create policy "Founder and admin see funding records"
  on funding_records for select
  using (is_founder() or is_admin());

create policy "Founder and admin can manage funding records"
  on funding_records for all
  using (is_founder() or is_admin())
  with check (is_founder() or is_admin());

-- Force RLS
alter table cohort_analytics force row level security;
alter table institutional_metrics force row level security;
alter table outcome_followups force row level security;
alter table funding_records force row level security;
