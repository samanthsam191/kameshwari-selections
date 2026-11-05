"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { orders } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

const TABS = ["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const;

export default function OrdersPage() {
  const [tab, setTab] = React.useState<(typeof TABS)[number]>("all");
  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{orders.length} orders · {orders.filter((o) => o.status === "pending").length} need attention</p>
      </div>

      {/* segmented control */}
      <div className="inline-flex flex-wrap gap-1 rounded-[12px] border border-[var(--border)] bg-[var(--muted)]/50 p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-[9px] px-3 py-1.5 text-sm font-medium capitalize transition ${
              tab === t ? "bg-[var(--card)] text-[var(--foreground)] shadow-card" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--muted-foreground)]">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-3 py-3 font-medium">Customer</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Payment</th>
                <th className="px-3 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/40">
                  <td className="px-5 py-3 font-medium tabular-nums">{o.id}</td>
                  <td className="px-3 py-3">
                    <div>{o.customer}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{o.email}</div>
                  </td>
                  <td className="px-3 py-3 text-[var(--muted-foreground)]">{formatDate(o.date)}</td>
                  <td className="px-3 py-3"><StatusPill status={o.payment} /></td>
                  <td className="px-3 py-3 tabular-nums">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-[var(--muted-foreground)]">No {tab} orders.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
