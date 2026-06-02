-- Migration 027: Add missing applicant fields to applications table
-- These fields are collected on the application form but had no DB columns

alter table applications
  add column if not exists age_range text,
  add column if not exists gender text,
  add column if not exists salvation_year text,
  add column if not exists spiritual_gifts text;

comment on column applications.age_range is 'Applicant age range (e.g. 25–34)';
comment on column applications.gender is 'Applicant gender (self-reported)';
comment on column applications.salvation_year is 'Year applicant gave their life to Christ';
comment on column applications.spiritual_gifts is 'Self-reported spiritual gifts';
