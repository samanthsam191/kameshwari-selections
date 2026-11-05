import { cn } from "@/lib/utils";
import React from "react";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-card", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-4">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
