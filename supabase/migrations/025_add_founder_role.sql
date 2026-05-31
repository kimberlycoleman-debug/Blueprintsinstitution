-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 025 — Add founder role to user_role enum
-- =====================================================

ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'founder';
