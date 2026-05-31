-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 024 — Onboarding + Rate Limiting
-- =====================================================

-- Track whether a student has completed the welcome onboarding wizard
alter table profiles
  add column if not exists onboarding_complete boolean not null default false;

-- =====================================================
-- RATE LIMIT LOG
-- =====================================================
-- Simple keyed request log for serverless-safe rate limiting.
-- Key format: 'ip:endpoint' or 'uid:endpoint'

create table if not exists rate_limit_log (
  id        bigserial primary key,
  key       text        not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rate_limit_log_key_time
  on rate_limit_log(key, created_at);

-- Cleanup function — delete entries older than 24 hours
create or replace function cleanup_rate_limit_log()
returns void language plpgsql security definer as $$
begin
  delete from rate_limit_log where created_at < now() - interval '24 hours';
end;
$$;

comment on table rate_limit_log is 'Per-key sliding-window rate limit log';
