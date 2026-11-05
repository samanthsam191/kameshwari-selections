"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";

/** Single-series revenue area chart with hover crosshair + tooltip. One brand hue. */
export function RevenueArea({ data }: { data: { month: string; value: number }[] }) {
  const W = 720, H = 240, PAD_L = 8, PAD_R = 8, PAD_T = 16, PAD_B = 28;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  const min = 0;

  const x = (i: number) => PAD_L + (i / (data.length - 1)) * innerW;
  const y = (v: number) => PAD_T + innerH - ((v - min) / (max - min)) * innerH;

  const line = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.value)}`).join(" ");
  const area = `${line} L ${x(data.length - 1)} ${PAD_T + innerH} L ${x(0)} ${PAD_T + innerH} Z`;

  const [hover, setHover] = React.useState<number | null>(null);
  const wrapRef = React.useRef<SVGSVGElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const rect = wrapRef.current!.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0, best = Infinity;
    data.forEach((_, i) => {
      const d = Math.abs(x(i) - px);
      if (d < best) { best = d; nearest = i; }
    });
    setHover(nearest);
  };

  const gridVals = [0, 0.25, 0.5, 0.75, 1].map((f) => min + f * (max - min));

  return (
    <div className="relative px-2 pb-1">
      <svg
        ref={wrapRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label="Monthly revenue trend"
      >
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-600)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-brand-600)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* recessive gridlines */}
        {gridVals.map((v, i) => (
          <line key={i} x1={PAD_L} x2={W - PAD_R} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeWidth={1} />
        ))}

        <path d={area} fill="url(#revFill)" />
        <path d={line} fill="none" stroke="var(--color-brand-600)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* x labels */}
        {data.map((d, i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" className="fill-[var(--muted-foreground)]" style={{ fontSize: 11 }}>
            {d.month}
          </text>
        ))}

        {/* hover */}
        {hover !== null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={PAD_T} y2={PAD_T + innerH} stroke="var(--color-brand-400)" strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(data[hover].value)} r={5} fill="var(--card)" stroke="var(--color-brand-600)" strokeWidth={2.5} />
          </>
        )}
      </svg>

      {hover !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 py-1.5 text-xs shadow-pop"
          style={{ left: `${(x(hover) / W) * 100}%`, top: 4 }}
        >
          <div className="font-semibold">{formatPrice(data[hover].value)}</div>
          <div className="text-[var(--muted-foreground)]">{data[hover].month} 2026</div>
        </div>
      )}
    </div>
  );
}
