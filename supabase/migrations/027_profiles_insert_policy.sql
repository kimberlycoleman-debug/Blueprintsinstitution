-- =====================================================
-- BLUEPRINT DISCIPLESHIP INSTITUTE
-- Migration 027 — Profiles self-heal INSERT policy
-- =====================================================
-- Allow an authenticated user to insert their own profile row.
-- This is a safety net for cases where the handle_new_user trigger
-- does not fire (e.g., certain Supabase cloud edge cases).
-- The application code will call this on first dashboard visit
-- if no profile row is found.

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'profiles'
      and policyname = 'users can create own profile'
  ) then
    execute $policy$
      create policy "users can create own profile"
        on profiles for insert
        with check (auth.uid() = id)
    $policy$;
  end if;
end
$$;
