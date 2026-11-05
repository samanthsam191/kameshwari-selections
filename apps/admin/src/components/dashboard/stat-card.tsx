import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function StatCard({
  label, value, delta, icon: Icon, tint = "brand",
}: {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
  tint?: "brand" | "blue" | "green" | "orange";
}) {
  const up = delta >= 0;
  const tintCls = {
    brand: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
    blue: "bg-[var(--color-sysblue)]/12 text-[var(--color-sysblue)]",
    green: "bg-[var(--color-sysgreen)]/15 text-[color-mix(in_srgb,var(--color-sysgreen)_70%,#000)]",
    orange: "bg-[var(--color-sysorange)]/15 text-[var(--color-sysorange)]",
  }[tint];

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className={cn("grid h-10 w-10 place-items-center rounded-[11px]", tintCls)}>
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
            up ? "bg-[var(--color-sysgreen)]/15 text-[color-mix(in_srgb,var(--color-sysgreen)_65%,#000)]" : "bg-[var(--color-sysred)]/15 text-[var(--color-sysred)]"
          )}
        >
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(delta)}%
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
      <div className="mt-0.5 text-sm text-[var(--muted-foreground)]">{label}</div>
    </Card>
  );
}
