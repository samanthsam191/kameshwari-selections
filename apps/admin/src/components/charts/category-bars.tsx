"use client";

/** Horizontal magnitude bars, single sequential hue, direct value labels, rounded ends. */
export function CategoryBars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  // sequential: darker = larger share
  const shade = (v: number) => {
    const t = v / max; // 0..1
    const step = t > 0.8 ? 700 : t > 0.55 ? 600 : t > 0.35 ? 500 : 400;
    return `var(--color-brand-${step})`;
  };

  return (
    <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
      {data.map((d) => (
        <div key={d.label} className="group">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-[var(--foreground)]">{d.label}</span>
            <span className="tabular-nums text-[var(--muted-foreground)]">{d.value}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--muted)]">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: shade(d.value) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
