"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, ShoppingCart, Package, Users, Settings,
  Search, Bell, Menu, X, Plus, LogOut,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { BuildInfo } from "@/components/shell/build-info";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const nav = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingCart, badge: 3 },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "text-[var(--accent)]" : "text-[var(--color-ink-600)] hover:bg-[var(--muted)]"
            )}
          >
            {active && (
              <motion.span
                layoutId="side-active"
                className="absolute inset-0 rounded-[10px] bg-[var(--color-brand-50)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <Icon className="relative z-10 h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
            <span className="relative z-10">{item.name}</span>
            {item.badge && (
              <span className="relative z-10 ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[var(--color-sysred)] px-1 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-5 py-5">
      <div className="grid h-9 w-9 place-items-center rounded-[11px] bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-900)] font-semibold text-white shadow-card">
        K
      </div>
      <div className="leading-tight">
        <div className="text-[15px] font-semibold tracking-tight">Kameshwari</div>
        <div className="text-[11px] text-[var(--muted-foreground)]">Admin · CRM</div>
      </div>
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[264px_1fr]">
      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-[var(--border)] bg-[var(--sidebar)] lg:flex">
        <Brand />
        <NavList />
        <div className="mt-auto space-y-2 p-3">
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 p-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">S</div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm font-medium">Sam</div>
              <div className="truncate text-xs text-[var(--muted-foreground)]">Owner</div>
            </div>
            {isSupabaseConfigured && (
              <button
                onClick={() => getSupabase()?.auth.signOut()}
                title="Sign out"
                className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--card)] hover:text-[var(--color-sysred)]"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
          <BuildInfo />
        </div>
      </aside>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-[var(--sidebar)] shadow-pop lg:hidden"
            >
              <div className="flex items-center justify-between pr-3">
                <Brand />
                <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-[var(--muted)]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavList onNavigate={() => setOpen(false)} />
              <div className="mt-auto p-4"><BuildInfo /></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* main column */}
      <div className="flex min-h-screen flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[var(--border)] material px-4 lg:h-16 lg:px-6">
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-[var(--muted)] lg:hidden">
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              placeholder="Search orders, products, customers…"
              className="h-9 w-full rounded-[10px] border border-[var(--border)] bg-[var(--muted)]/50 pl-9 pr-3 text-sm outline-none focus:border-[var(--ring)] focus:bg-[var(--card)]"
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <button className="relative rounded-lg p-2 hover:bg-[var(--muted)]">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-sysred)]" />
            </button>
            <Link href="/products" className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white transition active:scale-95">
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">New product</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
