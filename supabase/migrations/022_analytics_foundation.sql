-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 022 — Analytics Foundation
-- =====================================================
-- Builds the formation measurement infrastructure:
--   - engagement_events    (granular activity tracking)
--   - assessments          (self + facilitator, 5 dimensions)
--   - reflection_analysis  (AI depth scoring over time)
--   - transformation_index (the flagship composite metric)
-- This is the founding distinctive, operationalized.
-- "First formation institute to measure spiritual transformation."
-- =====================================================

-- =====================================================
-- ENUMS
-- =====================================================

create type assessment_type as enum ('self', 'facilitator');

create type assessment_checkpoint as enum (
  'baseline',
  'q1_end',
  'q2_end',
  'q3_end',
  'q4_end',
  'commissioning'
);

create type formation_dimension as enum (
  'identity',       -- I know who God created me to be
  'healing',        -- I am free from what wounded me
  'calling',        -- I know what I am called to do
  'maturity',       -- I have sustainable spiritual disciplines
  'community'       -- I am known and know others
);

create type engagement_event_type as enum (
  'login',
  'lesson_view',
  'lesson_complete',
  'reflection_start',
  'reflection_submit',
  'cohort_post',
  'cohort_response',
  'assessment_start',
  'assessment_complete',
  'capstone_start',
  'capstone_submit',
  'resource_view',
  'ai_conversation_start',
  'ai_message_sent',
  'application_start',
  'application_submit'
);

create type depth_score_label as enum (
  'surface',
  'developing',
  'substantive',
  'profound'
);

-- =====================================================
-- ENGAGEMENT EVENTS
-- =====================================================
-- Granular activity log — every meaningful student action.
-- Captured from day one to power engagement dashboards
-- and at-risk detection.
-- =====================================================

create table engagement_events (
  id uuid primary key default gen_random_uuid(),

  -- Who
  user_id uuid not null references profiles(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,

  -- What
  event_type engagement_event_type not null,
  resource_type text,             -- 'lesson', 'reflection', 'capstone', etc.
  resource_id uuid,               -- id of the specific resource

  -- Depth signal
  duration_seconds integer,       -- time spent (for lesson views, AI convos, etc.)
  page_depth_pct integer,         -- scroll depth 0-100 (where applicable)

  -- Context
  metadata jsonb default '{}',    -- flexible additional data

  occurred_at timestamptz not null default now()
);

create index idx_engagement_user on engagement_events(user_id);
create index idx_engagement_cohort on engagement_events(cohort_id);
create index idx_engagement_type on engagement_events(event_type);
create index idx_engagement_occurred on engagement_events(occurred_at desc);
create index idx_engagement_resource on engagement_events(resource_type, resource_id);

comment on table engagement_events is
  'Granular activity tracking for every meaningful student action. Powers engagement analytics and at-risk detection.';

-- =====================================================
-- ASSESSMENTS
-- =====================================================
-- Self-assessments and facilitator assessments at
-- defined checkpoints across 5 formation dimensions.
-- Together with artifacts, these triangulate the
-- Transformation Index.
-- =====================================================

create table assessments (
  id uuid primary key default gen_random_uuid(),

  -- Subject and assessor
  student_id uuid not null references profiles(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,
  assessed_by uuid references profiles(id) on delete set null,

  -- Classification
  assessment_type assessment_type not null,
  checkpoint assessment_checkpoint not null,
  dimension formation_dimension not null,

  -- Scores (dual: numeric + qualitative)
  score_numeric integer check (score_numeric between 0 and 100),
  score_qualitative assessment_qualitative,   -- reuse existing enum from 001

  -- Likert anchors (for self-assessments — 1-7)
  likert_score integer check (likert_score between 1 and 7),

  -- Narrative
  narrative text,                 -- open reflection (self) or pastoral note (facilitator)

  -- Integrity
  is_finalized boolean not null default false,
  assessed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger assessments_updated_at
  before update on assessments
  for each row execute function set_updated_at();

create index idx_assessments_student on assessments(student_id);
create index idx_assessments_cohort on assessments(cohort_id);
create index idx_assessments_checkpoint on assessments(checkpoint);
create index idx_assessments_dimension on assessments(dimension);
create index idx_assessments_type on assessments(assessment_type);
-- Enforce one assessment per student/type/checkpoint/dimension
create unique index idx_assessments_unique
  on assessments(student_id, assessment_type, checkpoint, dimension);

comment on table assessments is
  'Self and facilitator assessments at 6 checkpoints across 5 formation dimensions. Source 1 and 2 of the triangulated Transformation Index.';

-- =====================================================
-- REFLECTION ANALYSIS
-- =====================================================
-- AI-powered depth scoring of student reflections.
-- Tracks theme evolution, sentiment, and language
-- markers (performance → identity shift) over time.
-- Source 3 (artifact) of the Transformation Index.
-- =====================================================

create table reflection_analysis (
  id uuid primary key default gen_random_uuid(),

  -- Source
  reflection_id uuid not null references reflections(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,

  -- Depth scoring
  depth_score integer check (depth_score between 0 and 100),
  depth_label depth_score_label,

  -- Content intelligence
  themes text[] default '{}',         -- extracted themes (array)
  sentiment text,                      -- overall sentiment label
  word_count integer,

  -- Language marker analysis
  identity_language_score integer check (identity_language_score between 0 and 100),
    -- 0 = pure performance language ("I did / I achieved / I failed")
    -- 100 = pure identity language ("I am / God made me / I carry")
  performance_language_markers text[] default '{}',
  identity_language_markers text[] default '{}',

  -- AI metadata
  model_used text,                    -- e.g. 'gpt-4o-mini'
  prompt_version text,
  raw_analysis jsonb default '{}',    -- full model output for auditability

  analyzed_at timestamptz not null default now()

  -- No updated_at — analysis records are append-only per reflection
);

create index idx_reflection_analysis_student on reflection_analysis(student_id);
create index idx_reflection_analysis_reflection on reflection_analysis(reflection_id);
create index idx_reflection_analysis_depth on reflection_analysis(depth_score);
create index idx_reflection_analysis_analyzed on reflection_analysis(analyzed_at desc);
create index idx_reflection_analysis_themes on reflection_analysis using gin(themes);

comment on table reflection_analysis is
  'AI depth-scoring of student reflections. Tracks theme evolution and language shift from performance to identity. Source 3 (artifact) of the Transformation Index.';

-- =====================================================
-- TRANSFORMATION INDEX
-- =====================================================
-- THE flagship metric. Computed per student at each
-- assessment checkpoint. Triangulates:
--   - self-assessment (assessments WHERE type=self)
--   - facilitator assessment (assessments WHERE type=facilitator)
--   - artifact score (avg reflection depth at that point)
--
-- Four sub-scores (each 25%) → composite 0-100.
-- =====================================================

create table transformation_index (
  id uuid primary key default gen_random_uuid(),

  -- Subject
  student_id uuid not null references profiles(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,
  checkpoint assessment_checkpoint not null,

  -- The four formation sub-scores (each 0-100)
  identity_score integer check (identity_score between 0 and 100),
  healing_score integer check (healing_score between 0 and 100),
  calling_score integer check (calling_score between 0 and 100),
  maturity_score integer check (maturity_score between 0 and 100),

  -- The composite (average of the four)
  composite_index integer check (composite_index between 0 and 100),

  -- Triangulation components (how much of each source contributed)
  self_component numeric(5,2),          -- 0.00–100.00, self-assessment contribution
  facilitator_component numeric(5,2),   -- facilitator assessment contribution
  artifact_component numeric(5,2),      -- reflection analysis contribution

  -- Triangulation confidence
  sources_available integer check (sources_available between 0 and 3),
    -- 3 = all three sources; 2 = two; 1 = self-only estimate
  confidence_flag text,
    -- 'high' (3 sources) / 'medium' (2 sources) / 'low' (1 source) / 'insufficient'

  -- Deltas from prior checkpoint (null at baseline)
  composite_delta integer,
  identity_delta integer,
  healing_delta integer,
  calling_delta integer,
  maturity_delta integer,

  -- Computation metadata
  computed_at timestamptz not null default now(),
  computation_version text default '1.0'

  -- No updated_at — each computation is a new row; history is preserved
);

create index idx_ti_student on transformation_index(student_id);
create index idx_ti_cohort on transformation_index(cohort_id);
create index idx_ti_checkpoint on transformation_index(checkpoint);
create index idx_ti_composite on transformation_index(composite_index);
create index idx_ti_computed on transformation_index(computed_at desc);
-- One row per student/checkpoint per computation run
create unique index idx_ti_student_checkpoint
  on transformation_index(student_id, checkpoint, computed_at);

comment on table transformation_index is
  'Flagship composite metric. Triangulates self + facilitator + artifact assessments per student at each checkpoint. The founding distinctive made data.';

-- =====================================================
-- COMPUTED FUNCTION: Transformation Index
-- =====================================================
-- Computes and inserts/upserts a Transformation Index
-- row for a given student at a given checkpoint.
-- Called after assessments are finalized.
-- =====================================================

create or replace function compute_transformation_index(
  p_student_id uuid,
  p_checkpoint assessment_checkpoint,
  p_cohort_id uuid default null
)
returns uuid as $$
declare
  -- Self-assessment scores per dimension
  v_self_identity   numeric;
  v_self_healing    numeric;
  v_self_calling    numeric;
  v_self_maturity   numeric;

  -- Facilitator scores per dimension
  v_fac_identity    numeric;
  v_fac_healing     numeric;
  v_fac_calling     numeric;
  v_fac_maturity    numeric;

  -- Artifact (reflection depth) scores
  v_artifact_score  numeric;

  -- Component averages per dimension
  v_identity_score  integer;
  v_healing_score   integer;
  v_calling_score   integer;
  v_maturity_score  integer;
  v_composite       integer;

  -- Triangulation bookkeeping
  v_sources         integer := 0;
  v_self_ok         boolean := false;
  v_fac_ok          boolean := false;
  v_artifact_ok     boolean := false;
  v_confidence      text;

  -- Prior checkpoint delta
  v_prior           record;
  v_composite_delta integer;
  v_identity_delta  integer;
  v_healing_delta   integer;
  v_calling_delta   integer;
  v_maturity_delta  integer;

  v_new_id          uuid;
begin

  -- ── Source 1: Self-assessments ──────────────────
  select
    avg(case when dimension = 'identity'  then score_numeric end),
    avg(case when dimension = 'healing'   then score_numeric end),
    avg(case when dimension = 'calling'   then score_numeric end),
    avg(case when dimension = 'maturity'  then score_numeric end)
  into v_self_identity, v_self_healing, v_self_calling, v_self_maturity
  from assessments
  where student_id   = p_student_id
    and checkpoint   = p_checkpoint
    and assessment_type = 'self'
    and is_finalized = true
    and score_numeric is not null;

  if v_self_identity is not null then
    v_self_ok := true;
    v_sources := v_sources + 1;
  end if;

  -- ── Source 2: Facilitator assessments ───────────
  select
    avg(case when dimension = 'identity'  then score_numeric end),
    avg(case when dimension = 'healing'   then score_numeric end),
    avg(case when dimension = 'calling'   then score_numeric end),
    avg(case when dimension = 'maturity'  then score_numeric end)
  into v_fac_identity, v_fac_healing, v_fac_calling, v_fac_maturity
  from assessments
  where student_id      = p_student_id
    and checkpoint      = p_checkpoint
    and assessment_type = 'facilitator'
    and is_finalized    = true
    and score_numeric   is not null;

  if v_fac_identity is not null then
    v_fac_ok := true;
    v_sources := v_sources + 1;
  end if;

  -- ── Source 3: Artifact (reflection depth) ───────
  -- Average depth_score of reflections analyzed up to this checkpoint
  select avg(ra.depth_score)
  into v_artifact_score
  from reflection_analysis ra
  join reflections r on r.id = ra.reflection_id
  where r.student_id = p_student_id
    and ra.depth_score is not null;

  if v_artifact_score is not null then
    v_artifact_ok := true;
    v_sources := v_sources + 1;
  end if;

  -- ── Confidence flag ──────────────────────────────
  v_confidence := case v_sources
    when 3 then 'high'
    when 2 then 'medium'
    when 1 then 'low'
    else        'insufficient'
  end;

  -- ── Per-dimension scores (triangulate available sources) ──
  -- Use null-safe average across sources
  v_identity_score := round((
    coalesce(v_self_identity,   0) * case when v_self_ok     then 1 else 0 end
    + coalesce(v_fac_identity,  0) * case when v_fac_ok      then 1 else 0 end
    + coalesce(v_artifact_score,0) * case when v_artifact_ok then 1 else 0 end
  ) / greatest(v_sources, 1));

  v_healing_score := round((
    coalesce(v_self_healing,    0) * case when v_self_ok     then 1 else 0 end
    + coalesce(v_fac_healing,   0) * case when v_fac_ok      then 1 else 0 end
    + coalesce(v_artifact_score,0) * case when v_artifact_ok then 1 else 0 end
  ) / greatest(v_sources, 1));

  v_calling_score := round((
    coalesce(v_self_calling,    0) * case when v_self_ok     then 1 else 0 end
    + coalesce(v_fac_calling,   0) * case when v_fac_ok      then 1 else 0 end
    + coalesce(v_artifact_score,0) * case when v_artifact_ok then 1 else 0 end
  ) / greatest(v_sources, 1));

  v_maturity_score := round((
    coalesce(v_self_maturity,   0) * case when v_self_ok     then 1 else 0 end
    + coalesce(v_fac_maturity,  0) * case when v_fac_ok      then 1 else 0 end
    + coalesce(v_artifact_score,0) * case when v_artifact_ok then 1 else 0 end
  ) / greatest(v_sources, 1));

  -- ── Composite (equal 25% weight per dimension) ──
  v_composite := round((v_identity_score + v_healing_score + v_calling_score + v_maturity_score) / 4.0);

  -- ── Deltas from most recent prior checkpoint ─────
  select composite_index, identity_score, healing_score, calling_score, maturity_score
  into v_prior
  from transformation_index
  where student_id = p_student_id
  order by computed_at desc
  limit 1;

  if v_prior is not null then
    v_composite_delta := v_composite      - v_prior.composite_index;
    v_identity_delta  := v_identity_score - v_prior.identity_score;
    v_healing_delta   := v_healing_score  - v_prior.healing_score;
    v_calling_delta   := v_calling_score  - v_prior.calling_score;
    v_maturity_delta  := v_maturity_score - v_prior.maturity_score;
  end if;

  -- ── Insert new computation ────────────────────────
  insert into transformation_index (
    student_id,
    cohort_id,
    checkpoint,
    identity_score,
    healing_score,
    calling_score,
    maturity_score,
    composite_index,
    self_component,
    facilitator_component,
    artifact_component,
    sources_available,
    confidence_flag,
    composite_delta,
    identity_delta,
    healing_delta,
    calling_delta,
    maturity_delta
  ) values (
    p_student_id,
    p_cohort_id,
    p_checkpoint,
    v_identity_score,
    v_healing_score,
    v_calling_score,
    v_maturity_score,
    v_composite,
    case when v_self_ok     then round(v_self_identity::numeric, 2)     else null end,
    case when v_fac_ok      then round(v_fac_identity::numeric, 2)      else null end,
    case when v_artifact_ok then round(v_artifact_score::numeric, 2)    else null end,
    v_sources,
    v_confidence,
    v_composite_delta,
    v_identity_delta,
    v_healing_delta,
    v_calling_delta,
    v_maturity_delta
  )
  returning id into v_new_id;

  return v_new_id;
end;
$$ language plpgsql security definer;

-- =====================================================
-- RLS POLICIES — ANALYTICS FOUNDATION
-- =====================================================

alter table engagement_events enable row level security;
alter table assessments enable row level security;
alter table reflection_analysis enable row level security;
alter table transformation_index enable row level security;

-- engagement_events
create policy "Students see own engagement"
  on engagement_events for select
  using (user_id = auth.uid());

create policy "Server can insert engagement events"
  on engagement_events for insert
  with check (auth.uid() is not null);

create policy "Facilitators and admins see cohort engagement"
  on engagement_events for select
  using (
    is_facilitator_or_admin()
    and (
      cohort_id in (
        select cohort_id from cohort_facilitators where facilitator_id = auth.uid()
      )
      or is_admin()
    )
  );

create policy "Founder sees all engagement"
  on engagement_events for select
  using (is_founder());

-- assessments
create policy "Students see own assessments"
  on assessments for select
  using (student_id = auth.uid());

create policy "Students can submit self-assessments"
  on assessments for insert
  with check (
    student_id = auth.uid()
    and assessment_type = 'self'
  );

create policy "Facilitators see and assess their cohort students"
  on assessments for all
  using (
    is_facilitator_or_admin()
    and (
      cohort_id in (
        select cohort_id from cohort_facilitators where facilitator_id = auth.uid()
      )
      or is_admin()
    )
  )
  with check (
    is_facilitator_or_admin()
  );

create policy "Founder sees all assessments"
  on assessments for select
  using (is_founder());

-- reflection_analysis
create policy "Students see own reflection analysis"
  on reflection_analysis for select
  using (student_id = auth.uid());

create policy "Server can insert reflection analysis"
  on reflection_analysis for insert
  with check (auth.uid() is not null);

create policy "Facilitators and admins see cohort reflection analysis"
  on reflection_analysis for select
  using (is_facilitator_or_admin());

create policy "Founder sees all reflection analysis"
  on reflection_analysis for select
  using (is_founder());

-- transformation_index
create policy "Students see own transformation index"
  on transformation_index for select
  using (student_id = auth.uid());

create policy "Server can insert transformation index rows"
  on transformation_index for insert
  with check (auth.uid() is not null);

create policy "Facilitators and admins see cohort transformation index"
  on transformation_index for select
  using (
    is_facilitator_or_admin()
    and (
      cohort_id in (
        select cohort_id from cohort_facilitators where facilitator_id = auth.uid()
      )
      or is_admin()
    )
  );

create policy "Founder sees all transformation index"
  on transformation_index for select
  using (is_founder());

-- Force RLS
alter table engagement_events force row level security;
alter table assessments force row level security;
alter table reflection_analysis force row level security;
alter table transformation_index force row level security;
