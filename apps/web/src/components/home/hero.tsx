"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";
import { mockProducts } from "@/lib/mock-data";

const easeSilk = [0.22, 1, 0.36, 1] as const;

const floatCards = [
  { p: mockProducts[0], cls: "right-4 top-6 w-36 sm:w-44 rotate-[4deg]", delay: 0.2, anim: "animate-float" },
  { p: mockProducts[7], cls: "right-28 sm:right-44 top-40 w-28 sm:w-36 -rotate-[6deg]", delay: 0.35, anim: "animate-float-slow" },
  { p: mockProducts[5], cls: "right-10 sm:right-16 bottom-6 w-32 sm:w-40 rotate-[8deg]", delay: 0.5, anim: "animate-float" },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeSilk } },
  };

  return (
    <section className="relative overflow-hidden">
      {/* animated aurora backdrop */}
      <div className="aurora-bg absolute inset-0 opacity-70" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-warm-50)]/10 via-[var(--color-warm-50)]/40 to-[var(--background)]" aria-hidden />

      <div className="container relative mx-auto grid min-h-[86vh] grid-cols-1 items-center gap-8 px-4 py-16 lg:min-h-[78vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* copy */}
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show" className="relative z-10 max-w-xl">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-300)] bg-[var(--color-gold-50)]/80 px-3.5 py-1.5 text-xs font-semibold text-[var(--color-gold-800)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered saree boutique
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-5 font-heading text-[2.6rem] font-bold leading-[1.02] text-[var(--color-warm-900)] sm:text-6xl lg:text-7xl"
          >
            Every saree
            <br />
            tells a <span className="text-gradient-primary italic">story</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-warm-600)] sm:text-lg">
            Handpicked silk, cotton & Banarasi weaves from Telangana. Try them on virtually,
            match them to your skin tone with AI, delivered to your door.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link href="/products">
              <Button size="lg" className="gap-2 rounded-full shadow-lift">
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/try-on">
              <Button size="lg" variant="outline" className="gap-2 rounded-full border-[var(--color-primary-300)] bg-white/60 backdrop-blur">
                <Sparkles className="h-4 w-4" /> Try on virtually
              </Button>
            </Link>
          </motion.div>

          {/* trust row */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            {[
              { k: "12k+", v: "happy customers" },
              { k: "500+", v: "handwoven sarees" },
              { k: "4.9", v: "avg rating", star: true },
            ].map((s) => (
              <div key={s.v}>
                <div className="flex items-center gap-1 font-heading text-2xl font-bold text-[var(--color-primary-800)]">
                  {s.k}
                  {s.star && <Star className="h-4 w-4 fill-[var(--color-gold-500)] text-[var(--color-gold-500)]" />}
                </div>
                <div className="text-xs text-[var(--muted-foreground)]">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* floating saree cards */}
        <div className="relative hidden h-[30rem] lg:block">
          {floatCards.map(({ p, cls, delay, anim }) => (
            <motion.div
              key={p.id}
              initial={reduce ? false : { opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay, ease: easeSilk }}
              className={`absolute ${cls}`}
            >
              <div className={`${reduce ? "" : anim} overflow-hidden rounded-3xl border border-white/50 shadow-lift`}>
                <div className="aspect-[3/4] w-full">
                  <SmartImage src={p.images[0]} alt={p.name} palette={p.colors.map((c) => c.hex)} label={p.fabric} priority />
                </div>
              </div>
            </motion.div>
          ))}
          {/* ring accent */}
          <div className="absolute left-6 top-24 h-24 w-24 rounded-full border-2 border-dashed border-[var(--color-gold-400)]/50" />
        </div>

        {/* mobile: a single showcase strip */}
        <div className="relative -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar lg:hidden">
          {mockProducts.slice(0, 5).map((p, i) => (
            <motion.div
              key={p.id}
              initial={reduce ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08, ease: easeSilk }}
              className="w-40 shrink-0 overflow-hidden rounded-2xl border border-white/50 shadow-lift"
            >
              <div className="aspect-[3/4]">
                <SmartImage src={p.images[0]} alt={p.name} palette={p.colors.map((c) => c.hex)} label={p.fabric} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
