-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 020 — Rename curriculum_track enum values
-- solavian_core     → blueprint_core
-- solavian_advanced → blueprint_advanced
-- =====================================================
alter type curriculum_track rename value 'solavian_core' to 'blueprint_core';
alter type curriculum_track rename value 'solavian_advanced' to 'blueprint_advanced';
