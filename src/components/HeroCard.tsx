interface HeroCardProps {
  userName?: string;
  activeCoursesCount?: number;
}

export default function HeroCard({ userName = "Learner", activeCoursesCount = 0 }: HeroCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 p-8 bg-zinc-900">
      <h1 className="text-4xl font-bold">
        Welcome back, {userName} 👋
      </h1>

      <p className="mt-3 text-zinc-400">
        {"You're making great progress."}
      </p>

      <div className="mt-6 flex gap-6">
        <div>
          <span className="text-3xl">🔥</span>
          <p>12 Day Streak</p>
        </div>

        <div>
          <span className="text-3xl">📚</span>
          <p>
            {activeCoursesCount} Active {activeCoursesCount === 1 ? "Course" : "Courses"}
          </p>
        </div>
      </div>
    </div>
  );
}
