-- =============================================================================
-- Next-Gen Learning Dashboard — Activity Logs Schema
-- =============================================================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================================


-- ─── 1. Create activity_logs table ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hours          NUMERIC NOT NULL DEFAULT 0,
  lessons        INTEGER NOT NULL DEFAULT 0,
  activity_date  DATE NOT NULL DEFAULT CURRENT_DATE
);

COMMENT ON TABLE public.activity_logs IS 'Daily learning activity per user. One row per user per day.';

-- Prevent duplicate entries for the same user + date
CREATE UNIQUE INDEX IF NOT EXISTS idx_activity_logs_user_date
  ON public.activity_logs (user_id, activity_date);

-- Fast lookups by user
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id
  ON public.activity_logs (user_id);


-- ─── 2. Enable Row Level Security ──────────────────────────────────────────

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Users can only read their own activity
CREATE POLICY "Users can view own activity"
  ON public.activity_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own activity
CREATE POLICY "Users can insert own activity"
  ON public.activity_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own activity
CREATE POLICY "Users can update own activity"
  ON public.activity_logs
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ─── 3. Insert sample data (optional — replace USER_ID_HERE) ───────────────
-- Uncomment and replace the UUID with a real user ID from auth.users
--
-- INSERT INTO public.activity_logs (user_id, hours, lessons, activity_date) VALUES
--   ('USER_ID_HERE', 3.2, 5, CURRENT_DATE - INTERVAL '6 days'),
--   ('USER_ID_HERE', 5.1, 8, CURRENT_DATE - INTERVAL '5 days'),
--   ('USER_ID_HERE', 2.0, 3, CURRENT_DATE - INTERVAL '4 days'),
--   ('USER_ID_HERE', 7.8, 12, CURRENT_DATE - INTERVAL '3 days'),
--   ('USER_ID_HERE', 6.4, 9, CURRENT_DATE - INTERVAL '2 days'),
--   ('USER_ID_HERE', 4.3, 6, CURRENT_DATE - INTERVAL '1 day'),
--   ('USER_ID_HERE', 5.6, 7, CURRENT_DATE)
-- ON CONFLICT (user_id, activity_date) DO UPDATE
--   SET hours = EXCLUDED.hours, lessons = EXCLUDED.lessons;
