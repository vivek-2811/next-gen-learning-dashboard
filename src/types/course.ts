/**
 * Represents a single course record as stored in the `courses` Supabase table.
 *
 * Column mapping:
 *   id         → uuid PRIMARY KEY
 *   title      → text NOT NULL
 *   progress   → numeric (0–100), represents completion percentage
 *   icon_name  → text, references a Lucide icon name for display
 *   created_at → timestamptz, auto-set by Supabase (DEFAULT now())
 */
export interface Course {
  id: string;
  title: string;
  /** Completion percentage: 0–100 */
  progress: number;
  /** Lucide icon identifier, e.g. "BookOpen", "Code", "Flask" */
  icon_name: string;
  /** ISO 8601 timestamp string, e.g. "2024-01-15T10:30:00.000Z" */
  created_at: string;
}

/**
 * Payload shape for creating a new course.
 * Omits server-managed fields (`id`, `created_at`).
 */
export type CreateCoursePayload = Omit<Course, "id" | "created_at">;

/**
 * Payload shape for partially updating an existing course.
 */
export type UpdateCoursePayload = Partial<CreateCoursePayload>;
