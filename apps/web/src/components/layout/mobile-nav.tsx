"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

const items = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Cart", href: "/cart", icon: ShoppingBag, center: true },
  { name: "Saved", href: "/account?tab=wishlist", icon: Heart },
  { name: "Account", href: "/account", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const count = useCartStore((s) => s.getItemCount());

  React.useEffect(() => setMounted(true), []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 safe-bottom pointer-events-none">
      <nav className="pointer-events-auto mx-auto mb-3 flex w-[min(92%,26rem)] items-end justify-between gap-1 rounded-[26px] border border-white/40 glass px-2.5 py-2 shadow-lift">
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          if (item.center) {
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.name}
                className="relative -mt-7 flex flex-col items-center"
              >
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)] text-white shadow-lift ring-4 ring-[var(--background)] transition-transform active:scale-90">
                  <Icon className="h-6 w-6" />
                  <AnimatePresence>
                    {mounted && count > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--color-gold-400)] px-1 text-[10px] font-bold text-[var(--color-warm-900)] ring-2 ring-[var(--background)]"
                      >
                        {count}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="mt-1 text-[10px] font-semibold text-[var(--color-primary-700)]">
                  {item.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5"
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl bg-[var(--color-primary-50)]"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                />
              )}
              <motion.span
                animate={{ y: active ? -1 : 0, scale: active ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                className={cn(
                  "relative z-10",
                  active ? "text-[var(--color-primary-700)]" : "text-[var(--color-warm-500)]"
                )}
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 2} />
              </motion.span>
              <span
                className={cn(
                  "relative z-10 text-[10px] font-medium transition-colors",
                  active ? "text-[var(--color-primary-700)]" : "text-[var(--color-warm-500)]"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
