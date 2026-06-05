-- =============================================================================
-- Next-Gen Learning Dashboard — User Profiles Schema
-- =============================================================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================================


-- ─── 1. Create profiles table ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  email       TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Add a comment for documentation
COMMENT ON TABLE public.profiles IS 'User profile data, one row per auth.users entry.';


-- ─── 2. Enable Row Level Security ───────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow the trigger (service role) to insert profiles
CREATE POLICY "Service role can insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true);


-- ─── 3. Create trigger function ─────────────────────────────────────────────
-- Automatically creates a profile row when a new user signs up.
-- Extracts `name` from the auth.users `raw_user_meta_data` JSON field
-- which is populated by the `options.data` parameter during signUp().

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '')
  );
  RETURN NEW;
END;
$$;


-- ─── 4. Create trigger on auth.users ────────────────────────────────────────
-- Fires AFTER INSERT so the user row is fully committed before we reference it.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ─── 5. Create index for faster lookups ─────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);


-- ─── 6. Verify ──────────────────────────────────────────────────────────────
-- After running this script, sign up a test user and confirm:
--   SELECT * FROM public.profiles;
-- You should see a row with the new user's id, name, and email.
