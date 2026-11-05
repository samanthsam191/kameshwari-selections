"use client";

import React from "react";
import { GitCommitHorizontal } from "lucide-react";

const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || "";
const SHA = process.env.NEXT_PUBLIC_COMMIT_SHA || "";
const REF = process.env.NEXT_PUBLIC_COMMIT_REF || "";

function relative(iso: string): string {
  if (!iso) return "unknown";
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 0) return "just now";
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function BuildInfo() {
  const [rel, setRel] = React.useState("…");

  React.useEffect(() => {
    const tick = () => setRel(relative(BUILD_TIME));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const exact = BUILD_TIME ? new Date(BUILD_TIME).toLocaleString() : "unknown";
  const commit = SHA || "local";
  const title = `Deployed ${exact}\nCommit ${commit}${REF ? ` (${REF})` : ""}`;

  return (
    <div
      title={title}
      className="flex items-center gap-1.5 px-1 text-[11px] text-[var(--muted-foreground)]"
    >
      <GitCommitHorizontal className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">
        Updated {rel}
        <span className="mx-1 opacity-40">·</span>
        <span className="font-mono">{commit}</span>
      </span>
    </div>
  );
}
