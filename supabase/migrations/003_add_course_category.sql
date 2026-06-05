-- =============================================================================
-- Next-Gen Learning Dashboard — Category Filtering Migration
-- =============================================================================

-- ─── 1. Add category column with constraint ─────────────────────────────────
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category TEXT;

-- Add check constraint for valid categories
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS check_course_category;
ALTER TABLE public.courses ADD CONSTRAINT check_course_category CHECK (category IN ('Frontend', 'Backend', 'AI', 'DevOps', 'DSA'));

-- ─── 2. Update existing courses with categories ──────────────────────────────
UPDATE public.courses SET category = 'Frontend' WHERE id = '4a5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a';
UPDATE public.courses SET category = 'Frontend' WHERE id = '5b6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b';
UPDATE public.courses SET category = 'Frontend' WHERE id = '6c7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c';
UPDATE public.courses SET category = 'Backend' WHERE id = '7d8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d';
UPDATE public.courses SET category = 'Frontend' WHERE id = '8e9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e';

-- ─── 3. Seed additional courses for AI, DevOps, and DSA categories ───────────
INSERT INTO public.courses (id, title, icon_name, progress, category) VALUES
  ('9f0a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c', 'Introduction to Neural Networks', 'Cpu', 0, 'AI'),
  ('0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 'CI/CD Pipelines with GitHub Actions', 'Shield', 0, 'DevOps'),
  ('1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e', 'Data Structures & Algorithms', 'Calculator', 0, 'DSA')
ON CONFLICT (id) DO NOTHING;

-- ─── 4. Auto-enroll update for trigger function ──────────────────────────────
CREATE OR REPLACE FUNCTION public.enroll_new_user_in_default_courses()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_courses (user_id, course_id, progress)
  VALUES
    (NEW.id, '4a5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 75), -- Next.js (Frontend)
    (NEW.id, '5b6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 100), -- TS (Frontend)
    (NEW.id, '6c7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 20), -- Tailwind (Frontend)
    (NEW.id, '7d8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 0), -- Supabase (Backend)
    (NEW.id, '9f0a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c', 45), -- Neural Networks (AI)
    (NEW.id, '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', 10), -- CI/CD (DevOps)
    (NEW.id, '1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e', 0) -- DSA (DSA)
  ON CONFLICT (user_id, course_id) DO NOTHING;
  RETURN NEW;
END;
$$;
