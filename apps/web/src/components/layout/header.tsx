"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-[var(--border)] shadow-soft" : "bg-transparent"
      )}
    >
      {/* announcement */}
      <div className="overflow-hidden bg-[var(--color-primary-800)] text-white">
        <div className="flex whitespace-nowrap py-1.5 text-[11px] font-medium tracking-wide">
          <div className="flex min-w-full shrink-0 animate-[marquee_28s_linear_infinite] items-center justify-around gap-10 px-4">
            <span>✦ Free shipping over ₹2,999</span>
            <span>✦ Use <b className="text-[var(--color-gold-300)]">FIRST10</b> for 10% off</span>
            <span>✦ GI-tagged Telangana weaves</span>
            <span>✦ AI virtual try-on</span>
          </div>
          <div aria-hidden className="flex min-w-full shrink-0 animate-[marquee_28s_linear_infinite] items-center justify-around gap-10 px-4">
            <span>✦ Free shipping over ₹2,999</span>
            <span>✦ Use <b className="text-[var(--color-gold-300)]">FIRST10</b> for 10% off</span>
            <span>✦ GI-tagged Telangana weaves</span>
            <span>✦ AI virtual try-on</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <button
            className="-ml-2 p-2 lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex flex-col items-center lg:items-start">
            <span className="font-heading text-xl font-bold tracking-tight text-[var(--color-primary-800)] lg:text-2xl">
              Kameshwari
            </span>
            <span className="-mt-1 text-[9px] font-semibold uppercase tracking-[0.42em] text-[var(--color-gold-600)]">
              Selections
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-[var(--color-warm-700)] transition-colors hover:text-[var(--color-primary-700)]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[var(--color-primary-600)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 lg:gap-1">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen((v) => !v)} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/account?tab=wishlist" className="hidden sm:inline-flex">
              <Button variant="ghost" size="icon" aria-label="Wishlist"><Heart className="h-5 w-5" /></Button>
            </Link>
            <Link href="/account" className="hidden sm:inline-flex">
              <Button variant="ghost" size="icon" aria-label="Account"><User className="h-5 w-5" /></Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {mounted && count > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--color-primary-600)] px-1 text-[10px] font-bold text-white"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-full border-b border-[var(--border)] bg-[var(--card)] shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="relative mx-auto max-w-2xl">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <Input type="search" placeholder="Search sarees, fabrics, occasions…" className="h-12 pl-10 text-base" autoFocus />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-full border-b border-[var(--border)] bg-[var(--card)] shadow-lg lg:hidden"
          >
            <nav className="container mx-auto space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-base font-medium text-[var(--color-warm-700)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-700)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/try-on"
                className="mt-2 flex items-center gap-2 rounded-xl bg-[var(--color-primary-50)] px-3 py-2.5 text-base font-semibold text-[var(--color-primary-700)]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="h-4 w-4" /> Virtual Try-On
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
