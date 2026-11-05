"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function SmartImage({
  src,
  alt,
  palette = ["#961a43", "#c99a28"],
  className,
}: {
  src?: string | null;
  alt: string;
  palette?: string[];
  className?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const show = src && !failed;
  const [c1, c2 = c1] = palette;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[var(--muted)]", className)}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 25% 15%, ${c2}40, transparent 55%), linear-gradient(140deg, ${c1}, color-mix(in srgb, ${c1} 55%, #000))`,
        }}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 6px)",
          }}
        />
      </div>
      {show && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
        />
      )}
    </div>
  );
}
