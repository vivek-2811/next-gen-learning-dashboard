-- =============================================================================
-- Next-Gen Learning Dashboard — User Courses Schema and Seeding
-- =============================================================================

-- ─── 1. Ensure courses table exists ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  progress    INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name   TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ─── 2. Create user_courses table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id   UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress    INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
);

COMMENT ON TABLE public.user_courses IS 'Tracks individual user course progress and enrollment.';

-- ─── 3. Enable Row Level Security (RLS) ──────────────────────────────────────
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own course enrollments
CREATE POLICY "Users can view own course enrollments"
  ON public.user_courses
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to update their own course progress
CREATE POLICY "Users can update own course progress"
  ON public.user_courses
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to enroll in new courses
CREATE POLICY "Users can enroll in courses"
  ON public.user_courses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to unenroll from courses
CREATE POLICY "Users can unenroll from courses"
  ON public.user_courses
  FOR DELETE
  USING (auth.uid() = user_id);

-- ─── 4. Seed sample courses ──────────────────────────────────────────────────
INSERT INTO public.courses (id, title, icon_name, progress) VALUES
  ('4a5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'Next.js 15 Foundations', 'Globe', 0),
  ('5b6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'TypeScript Deep Dive', 'Terminal', 0),
  ('6c7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'Advanced Tailwind Styling', 'Layout', 0),
  ('7d8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'Supabase Database Design', 'Database', 0),
  ('8e9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'Framer Motion Animations', 'Sparkles', 0)
ON CONFLICT (id) DO NOTHING;

-- ─── 5. Auto-enroll trigger ──────────────────────────────────────────────────
-- Automatically enrolls a newly signed-up user in the default courses.
CREATE OR REPLACE FUNCTION public.enroll_new_user_in_default_courses()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_courses (user_id, course_id, progress)
  VALUES
    (NEW.id, '4a5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 75),
    (NEW.id, '5b6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 100),
    (NEW.id, '6c7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 20),
    (NEW.id, '7d8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 0)
  ON CONFLICT (user_id, course_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created_enroll ON public.profiles;

CREATE TRIGGER on_profile_created_enroll
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.enroll_new_user_in_default_courses();
