import Link from "next/link";
import { IndianRupee, ShoppingCart, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueArea } from "@/components/charts/revenue-area";
import { CategoryBars } from "@/components/charts/category-bars";
import { StatusPill } from "@/components/ui/status-pill";
import { SmartImage } from "@/components/ui/smart-image";
import { stats, revenueSeries, categorySplit, orders, products } from "@/lib/mock-data";
import { formatPrice, formatCompact } from "@/lib/utils";

export default function DashboardPage() {
  const recent = orders.slice(0, 5);
  const top = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Good morning, Sam 👋</h1>
        <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">Here&rsquo;s how Kameshwari is doing today.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Revenue (Oct)" value={formatPrice(stats.revenue)} delta={stats.revenueDelta} icon={IndianRupee} tint="brand" />
        <StatCard label="Orders" value={formatCompact(stats.orders)} delta={stats.ordersDelta} icon={ShoppingCart} tint="blue" />
        <StatCard label="Customers" value={formatCompact(stats.customers)} delta={stats.customersDelta} icon={Users} tint="green" />
        <StatCard label="Avg order value" value={formatPrice(stats.aov)} delta={stats.aovDelta} icon={TrendingUp} tint="orange" />
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue" subtitle="Last 12 months" action={<span className="text-sm font-semibold text-[var(--color-sysgreen)]">+{stats.revenueDelta}%</span>} />
          <RevenueArea data={revenueSeries} />
        </Card>
        <Card>
          <CardHeader title="Sales by category" subtitle="Share of units sold" />
          <CategoryBars data={categorySplit} />
        </Card>
      </div>

      {/* recent orders + top products */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Recent orders" action={<Link href="/orders" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-sysblue)]">View all <ArrowRight className="h-3.5 w-3.5" /></Link>} />
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--muted-foreground)]">
                  <th className="px-5 py-2 font-medium">Order</th>
                  <th className="px-3 py-2 font-medium">Customer</th>
                  <th className="px-3 py-2 font-medium">Total</th>
                  <th className="px-5 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/40">
                    <td className="px-5 py-3 font-medium tabular-nums">{o.id}</td>
                    <td className="px-3 py-3">
                      <div>{o.customer}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{o.city}</div>
                    </td>
                    <td className="px-3 py-3 tabular-nums">{formatPrice(o.total)}</td>
                    <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Top products" subtitle="By units sold" />
          <div className="flex flex-col gap-1 p-3">
            {top.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl p-2 hover:bg-[var(--muted)]/50">
                <span className="w-4 text-center text-sm font-semibold text-[var(--muted-foreground)]">{i + 1}</span>
                <div className="h-11 w-11 overflow-hidden rounded-lg">
                  <SmartImage src={p.image} alt={p.name} palette={p.palette} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">{p.sold} sold · {formatPrice(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
