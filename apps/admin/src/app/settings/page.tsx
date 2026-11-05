import { Database, Cloud, CheckCircle2, Circle } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

const integrations = [
  { name: "Supabase", role: "Database · Auth · Catalog", icon: Database, connected: false, note: "Products, orders, customers & admin login" },
  { name: "Cloudflare R2", role: "Image storage (CDN)", icon: Cloud, connected: false, note: "Saree photos — 10 GB free, zero egress" },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">Store profile & integrations</p>
      </div>

      <Card>
        <CardHeader title="Integrations" subtitle="Connect a backend to go from demo to live data" />
        <div className="space-y-2 p-4">
          {integrations.map((i) => (
            <div key={i.name} className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-3">
              <div className="grid h-10 w-10 place-items-center rounded-[11px] bg-[var(--muted)] text-[var(--foreground)]"><i.icon className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{i.name}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{i.role} · {i.note}</div>
              </div>
              {i.connected ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-sysgreen)]"><CheckCircle2 className="h-4 w-4" /> Connected</span>
              ) : (
                <button className="inline-flex items-center gap-1 rounded-[9px] border border-[var(--border)] px-3 py-1.5 text-xs font-semibold hover:bg-[var(--muted)]"><Circle className="h-3.5 w-3.5" /> Connect</button>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Store profile" />
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
          <Field label="Store name" value="Kameshwari Selections" />
          <Field label="Support email" value="hello@kameshwariselections.com" />
          <Field label="Phone" value="+91 98765 43210" />
          <Field label="Location" value="Hyderabad, Telangana" />
        </div>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input defaultValue={value} className="w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none focus:border-[var(--ring)]" />
    </div>
  );
}
