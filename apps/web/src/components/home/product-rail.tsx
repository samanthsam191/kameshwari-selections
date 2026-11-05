"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";
import type { Product } from "@/lib/mock-data";

export function ProductRail({
  title,
  subtitle,
  href,
  products,
}: {
  title: string;
  subtitle?: string;
  href: string;
  products: Product[];
}) {
  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] lg:text-3xl">{title}</h2>
              {subtitle && <p className="mt-1 text-sm text-[var(--muted-foreground)]">{subtitle}</p>}
            </div>
            <Link
              href={href}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--color-primary-700)] hover:gap-2 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        {/* mobile: horizontal snap rail */}
        <div className="-mx-4 flex snap-x-mandatory gap-3.5 overflow-x-auto px-4 pb-2 no-scrollbar sm:hidden">
          {products.map((p, i) => (
            <div key={p.id} className="w-[46%] shrink-0 snap-start">
              <ProductCard product={p} priority={i < 2} />
            </div>
          ))}
        </div>

        {/* sm+: grid */}
        <div className="hidden grid-cols-3 gap-4 sm:grid lg:grid-cols-4 lg:gap-6">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
