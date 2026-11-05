import { cn } from "@/lib/utils";

const MAP: Record<string, { label: string; cls: string }> = {
  // orders
  pending: { label: "Pending", cls: "bg-[var(--color-sysorange)]/15 text-[var(--color-sysorange)]" },
  processing: { label: "Processing", cls: "bg-[var(--color-sysblue)]/15 text-[var(--color-sysblue)]" },
  shipped: { label: "Shipped", cls: "bg-[var(--color-sysindigo)]/15 text-[var(--color-sysindigo)]" },
  delivered: { label: "Delivered", cls: "bg-[var(--color-sysgreen)]/15 text-[color-mix(in_srgb,var(--color-sysgreen)_70%,#000)]" },
  cancelled: { label: "Cancelled", cls: "bg-[var(--color-sysred)]/15 text-[var(--color-sysred)]" },
  // products
  active: { label: "Active", cls: "bg-[var(--color-sysgreen)]/15 text-[color-mix(in_srgb,var(--color-sysgreen)_70%,#000)]" },
  draft: { label: "Draft", cls: "bg-[var(--color-ink-400)]/20 text-[var(--color-ink-600)]" },
  out_of_stock: { label: "Out of stock", cls: "bg-[var(--color-sysred)]/15 text-[var(--color-sysred)]" },
  // segments
  VIP: { label: "VIP", cls: "bg-[var(--color-syspurple)]/15 text-[var(--color-syspurple)]" },
  Loyal: { label: "Loyal", cls: "bg-[var(--color-sysblue)]/15 text-[var(--color-sysblue)]" },
  New: { label: "New", cls: "bg-[var(--color-sysgreen)]/15 text-[color-mix(in_srgb,var(--color-sysgreen)_70%,#000)]" },
  "At risk": { label: "At risk", cls: "bg-[var(--color-sysorange)]/15 text-[var(--color-sysorange)]" },
  prepaid: { label: "Prepaid", cls: "bg-[var(--color-sysblue)]/12 text-[var(--color-sysblue)]" },
  cod: { label: "COD", cls: "bg-[var(--color-ink-400)]/20 text-[var(--color-ink-600)]" },
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const s = MAP[status] ?? { label: status, cls: "bg-[var(--muted)] text-[var(--muted-foreground)]" };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", s.cls, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {s.label}
    </span>
  );
}
