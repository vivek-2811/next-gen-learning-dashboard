export default function ActivityChart() {
  const data = [3, 5, 2, 8, 6, 4, 7];

  return (
    <div className="rounded-3xl border border-white/10 p-6">
      <h3 className="font-semibold mb-4">
        Weekly Activity
      </h3>

      <div className="flex gap-2 items-end h-40">
        {data.map((value, i) => (
          <div
            key={i}
            className="bg-blue-500 rounded w-8"
            style={{
              height: `${value * 15}px`
            }}
          />
        ))}
      </div>
    </div>
  );
}
