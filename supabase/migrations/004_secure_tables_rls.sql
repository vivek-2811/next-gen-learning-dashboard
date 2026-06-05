-- =============================================================================
-- Next-Gen Learning Dashboard — Security Hardening (RLS)
-- =============================================================================
-- This migration secures all tables by enabling RLS and establishing policies
-- to restrict user read/write operations to their own records only.
-- =============================================================================

-- ─── 1. Secure Profiles Table ────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies to avoid duplicate errors
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.profiles;

-- Allow users to read only their own profile row
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to update only their own profile fields
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Note: No INSERT or DELETE policy is created for users. 
-- The public.handle_new_user trigger runs with SECURITY DEFINER privileges,
-- enabling it to create profiles safely upon sign-up without public insert privileges.


-- ─── 2. Secure Courses Table (Catalog) ───────────────────────────────────────
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view all courses" ON public.courses;

-- Allow all authenticated users to read the catalog of courses
CREATE POLICY "Users can view all courses"
  ON public.courses
  FOR SELECT
  TO authenticated
  USING (true);

-- Note: No INSERT, UPDATE, or DELETE policies exist for public/authenticated users.
-- Only database administrators/service roles can modify the courses catalog.


-- ─── 3. Secure User Courses Table (Enrollment) ───────────────────────────────
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own course enrollments" ON public.user_courses;
DROP POLICY IF EXISTS "Users can update own course progress" ON public.user_courses;
DROP POLICY IF EXISTS "Users can enroll in courses" ON public.user_courses;
DROP POLICY IF EXISTS "Users can unenroll from courses" ON public.user_courses;

-- Allow users to view only their own course progress records
CREATE POLICY "Users can view own course enrollments"
  ON public.user_courses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to update only their own course progress
CREATE POLICY "Users can update own course progress"
  ON public.user_courses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to enroll themselves (insert records referencing their own uid)
CREATE POLICY "Users can enroll in courses"
  ON public.user_courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to unenroll themselves (delete records referencing their own uid)
CREATE POLICY "Users can unenroll from courses"
  ON public.user_courses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);


-- ─── 4. Secure Activity Logs Table ───────────────────────────────────────────
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can insert own activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can update own activity" ON public.activity_logs;

-- Allow users to view only their own activity log entries
CREATE POLICY "Users can view own activity"
  ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert activity logs referencing their own uid
CREATE POLICY "Users can insert own activity"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own activity logs
CREATE POLICY "Users can update own activity"
  ON public.activity_logs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
