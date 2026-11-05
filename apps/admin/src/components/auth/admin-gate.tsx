"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { Shell } from "@/components/shell/shell";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    if (!isSupabaseConfigured) { setChecking(false); return; }
    const sb = getSupabase()!;
    sb.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Demo mode — no backend configured yet: open the dashboard directly.
  if (!isSupabaseConfigured) return <Shell>{children}</Shell>;

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  return <Shell>{children}</Shell>;
}

function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    const sb = getSupabase()!;
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setBusy(false); }
    // on success, onAuthStateChange in AdminGate swaps to the dashboard
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[var(--background)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-pop"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-900)] text-white shadow-card">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">Kameshwari Admin</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">Sign in to manage your store</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@store.com" autoComplete="email"
              className="w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm outline-none focus:border-[var(--ring)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" autoComplete="current-password"
              className="w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm outline-none focus:border-[var(--ring)]"
            />
          </div>

          {error && <p className="rounded-lg bg-[var(--color-sysred)]/10 px-3 py-2 text-xs text-[var(--color-sysred)]">{error}</p>}

          <button
            type="submit" disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[var(--muted-foreground)]">
          Create your admin user in Supabase → Authentication → Users.
        </p>
      </motion.div>
    </div>
  );
}
