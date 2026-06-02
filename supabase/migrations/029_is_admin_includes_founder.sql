-- Migration 029: Update is_admin() to include founder role
-- Founder has sovereign access; all RLS policies using is_admin() must allow them too.

create or replace function is_admin()
returns boolean as $$
  select current_user_role() in ('admin', 'founder');
$$ language sql stable security definer;
