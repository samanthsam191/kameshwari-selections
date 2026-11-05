"use client";

import React from "react";

const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || "";
const SHA = process.env.NEXT_PUBLIC_COMMIT_SHA || "";
const REF = process.env.NEXT_PUBLIC_COMMIT_REF || "";

function relative(iso: string): string {
  if (!iso) return "unknown";
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60000) return "just now";
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function BuildInfo({ className }: { className?: string }) {
  const [rel, setRel] = React.useState("…");
  React.useEffect(() => {
    const tick = () => setRel(relative(BUILD_TIME));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const exact = BUILD_TIME ? new Date(BUILD_TIME).toLocaleString() : "unknown";
  const commit = SHA || "local";
  return (
    <span className={className} title={`Deployed ${exact}\nCommit ${commit}${REF ? ` (${REF})` : ""}`}>
      Updated {rel} · <span className="font-mono">{commit}</span>
    </span>
  );
}
