-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 025 — Profiles self-heal INSERT policy
-- =====================================================
-- Allow an authenticated user to insert their own profile row.
-- This is a safety net for cases where the handle_new_user trigger
-- does not fire (e.g., certain Supabase cloud edge cases).
-- The application code will call this on first dashboard visit
-- if no profile row is found.

create policy "users can create own profile"
  on profiles for insert
  with check (auth.uid() = id);
