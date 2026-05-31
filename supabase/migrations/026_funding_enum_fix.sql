-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 026 — Funding Enum Alignment
-- =====================================================
-- The funding_type and funding_status enums in 023
-- were missing values that the API routes actually use.
-- This migration adds them safely with IF NOT EXISTS.
--
-- funding_type additions:
--   church_partner   — local church funding partnerships
--   individual_donor — individual major donors
--   earned_revenue   — program fees, workshops, licensing
--
-- funding_status additions:
--   under_review     — submitted and under funder review
-- =====================================================

-- ── funding_type ──────────────────────────────────────

ALTER TYPE funding_type ADD VALUE IF NOT EXISTS 'church_partner';
ALTER TYPE funding_type ADD VALUE IF NOT EXISTS 'individual_donor';
ALTER TYPE funding_type ADD VALUE IF NOT EXISTS 'earned_revenue';

-- ── funding_status ────────────────────────────────────

ALTER TYPE funding_status ADD VALUE IF NOT EXISTS 'under_review';
