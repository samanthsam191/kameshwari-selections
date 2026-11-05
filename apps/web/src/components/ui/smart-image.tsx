"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src?: string | null;
  alt: string;
  /** Hex colors used to generate the premium fallback weave. */
  palette?: string[];
  className?: string;
  /** Short label drawn on the fallback (e.g. fabric name). */
  label?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Renders a real photo when the URL loads, otherwise a tasteful
 * woven-silk gradient fallback — so the UI always looks finished,
 * even with no image host reachable. When you later point `src` at a
 * CDN URL, the photo simply appears.
 */
export function SmartImage({
  src,
  alt,
  palette = ["#961a43", "#c99a28"],
  className,
  label,
  priority,
  sizes,
}: SmartImageProps) {
  const [failed, setFailed] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const showImg = src && !failed;

  const [c1, c2 = c1] = palette;
  const c3 = palette[2] ?? c2;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[var(--color-warm-100)]", className)}>
      {/* Generated fallback (always painted underneath) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 20% 10%, ${c2}38, transparent 55%), radial-gradient(120% 120% at 85% 90%, ${c3}42, transparent 55%), linear-gradient(140deg, ${c1}, color-mix(in srgb, ${c1} 55%, #000))`,
        }}
      >
        <div className="weave-texture absolute inset-0 opacity-70" />
        {/* subtle motif */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.14]"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <pattern id="paisley" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
              <path d="M11 2c5 0 8 4 8 8s-4 8-9 7c3-1 5-3 5-6s-2-5-5-5-5 2-5 5c0 5 5 8 10 8-7 2-13-3-13-10 0-6 4-10 9-10z" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#paisley)" />
        </svg>
        {label && (
          <span className="absolute bottom-3 left-3 font-heading text-[11px] uppercase tracking-[0.2em] text-white/70">
            {label}
          </span>
        )}
      </div>

      {showImg && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
