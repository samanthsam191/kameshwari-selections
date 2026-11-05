"use client";

import React from "react";
import { Users, Crown, UserPlus, AlertTriangle, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { customers } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

export default function CustomersPage() {
  const [q, setQ] = React.useState("");
  const rows = customers.filter((c) => (c.name + c.email + c.city).toLowerCase().includes(q.toLowerCase()));

  const vip = customers.filter((c) => c.segment === "VIP").length;
  const neu = customers.filter((c) => c.segment === "New").length;
  const risk = customers.filter((c) => c.segment === "At risk").length;
  const ltv = Math.round(customers.reduce((s, c) => s + c.spent, 0) / customers.length);

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
        <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{customers.length} customers · CRM</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile icon={Users} tint="blue" label="Total" value={`${customers.length}`} />
        <Tile icon={Crown} tint="purple" label="VIP" value={`${vip}`} />
        <Tile icon={UserPlus} tint="green" label="New this month" value={`${neu}`} />
        <Tile icon={AlertTriangle} tint="orange" label="At risk" value={`${risk}`} />
      </div>

      <div className="relative max-w-sm">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search customers…"
          className="h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3 text-sm outline-none focus:border-[var(--ring)]"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--muted-foreground)]">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-3 py-3 font-medium">Segment</th>
                <th className="px-3 py-3 font-medium">Orders</th>
                <th className="px-3 py-3 font-medium">Lifetime spend</th>
                <th className="px-3 py-3 font-medium">Last order</th>
                <th className="px-5 py-3 font-medium">Contact</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                        {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{c.name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{c.city} · joined {formatDate(c.joined)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><StatusPill status={c.segment} /></td>
                  <td className="px-3 py-3 tabular-nums">{c.orders}</td>
                  <td className="px-3 py-3 font-medium tabular-nums">{formatPrice(c.spent)}</td>
                  <td className="px-3 py-3 text-[var(--muted-foreground)]">{formatDate(c.lastOrder)}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <a href={`mailto:${c.email}`} className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"><Mail className="h-4 w-4" /></a>
                      <a href={`tel:${c.phone}`} className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"><Phone className="h-4 w-4" /></a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="px-1 text-xs text-[var(--muted-foreground)]">Avg. lifetime value {formatPrice(ltv)} · segments auto-computed from order history (wire to Supabase to make live).</p>
    </div>
  );
}

const tints: Record<string, string> = {
  blue: "bg-[var(--color-sysblue)]/12 text-[var(--color-sysblue)]",
  purple: "bg-[var(--color-syspurple)]/15 text-[var(--color-syspurple)]",
  green: "bg-[var(--color-sysgreen)]/15 text-[color-mix(in_srgb,var(--color-sysgreen)_70%,#000)]",
  orange: "bg-[var(--color-sysorange)]/15 text-[var(--color-sysorange)]",
};

function Tile({ icon: Icon, tint, label, value }: { icon: React.ElementType; tint: string; label: string; value: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={`grid h-10 w-10 place-items-center rounded-[11px] ${tints[tint]}`}><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-xl font-semibold tabular-nums">{value}</div>
        <div className="text-xs text-[var(--muted-foreground)]">{label}</div>
      </div>
    </Card>
  );
}
