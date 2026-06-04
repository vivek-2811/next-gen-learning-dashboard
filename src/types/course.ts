// ---------------------------------------------------------------------------
// Course — domain type mirroring the `courses` table in Supabase
//
// Column → TypeScript mapping:
//   id         uuid          PRIMARY KEY DEFAULT gen_random_uuid()
//   title      text          NOT NULL
//   progress   numeric       CHECK (progress >= 0 AND progress <= 100)
//   icon_name  text          NOT NULL  (Lucide icon identifier)
//   created_at timestamptz   NOT NULL DEFAULT now()
// ---------------------------------------------------------------------------

/**
 * A single row from the `courses` table.
 *
 * Keep this type in sync with your Supabase table schema. If you generate
 * types via the Supabase CLI (`supabase gen types typescript`), replace this
 * with the generated `Database["public"]["Tables"]["courses"]["Row"]` type
 * and re-export it as `Course` for convenience.
 */
export interface Course {
  id: string;
  title: string;
  /** Completion percentage — constrained to 0–100 in the database. */
  progress: number;
  /**
   * Lucide React icon name.
   * @see https://lucide.dev/icons/
   * @example "BookOpen" | "Code" | "FlaskConical" | "Globe"
   */
  icon_name: string;
  /** ISO 8601 UTC timestamp string. */
  created_at: string;
}

// ---------------------------------------------------------------------------
// Mutation payload types
// ---------------------------------------------------------------------------

/** Shape for INSERT — omits server-generated fields. */
export type CreateCoursePayload = Omit<Course, "id" | "created_at">;

/** Shape for PATCH — all mutable fields optional. */
export type UpdateCoursePayload = Partial<CreateCoursePayload>;

// ---------------------------------------------------------------------------
// Result type — typed discriminated union for server action returns
// ---------------------------------------------------------------------------

/** Successful data fetch. */
export type CourseFetchSuccess = {
  readonly status: "success";
  readonly data: Course[];
};

/** Data fetch that failed at the Supabase layer. */
export type CourseFetchError = {
  readonly status: "error";
  readonly message: string;
  readonly code: string | null;
};

/**
 * Discriminated union returned by `getCourses`.
 *
 * Callers pattern-match on `status` to distinguish an empty table
 * from a network/RLS/schema error — something a plain `Course[] | null`
 * return type cannot express.
 *
 * @example
 * ```ts
 * const result = await getCourses()
 * if (result.status === "error") {
 *   return <ErrorBanner message={result.message} />
 * }
 * return <CourseList courses={result.data} />
 * ```
 */
export type CourseFetchResult = CourseFetchSuccess | CourseFetchError;
