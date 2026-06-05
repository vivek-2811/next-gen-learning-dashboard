export default function HeroCard() {
  return (
    <div className="rounded-3xl border border-white/10 p-8 bg-zinc-900">
      <h1 className="text-4xl font-bold">
        Welcome back, Vivek 👋
      </h1>

      <p className="mt-3 text-zinc-400">
        You're making great progress.
      </p>

      <div className="mt-6 flex gap-6">
        <div>
          <span className="text-3xl">🔥</span>
          <p>12 Day Streak</p>
        </div>

        <div>
          <span className="text-3xl">📚</span>
          <p>4 Active Courses</p>
        </div>
      </div>
    </div>
  );
}
