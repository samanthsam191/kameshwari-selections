"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/ui/smart-image";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const [wished, setWished] = React.useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const discount = product.salePrice ? calculateDiscount(product.mrp, product.salePrice) : 0;
  const displayPrice = product.salePrice || product.basePrice;
  const palette = product.colors.map((c) => c.hex);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      product,
      quantity: 1,
      selectedColor: product.colors[0]?.name ?? "Default",
      blouseOption: "running",
    });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-soft",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            palette={palette}
            label={product.fabric}
            priority={priority}
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </div>

        {/* gradient scrim for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="gold" className="text-[10px] shadow">NEW</Badge>}
          {discount > 0 && (
            <Badge variant="destructive" className="text-[10px] shadow">{discount}% OFF</Badge>
          )}
        </div>

        {/* wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWished((w) => !w);
          }}
          aria-label="Add to wishlist"
          className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full glass text-[var(--foreground)] shadow-sm transition active:scale-90"
        >
          <motion.span animate={{ scale: wished ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.35 }}>
            <Heart
              className={cn("h-[18px] w-[18px]", wished && "fill-[var(--color-primary-600)] text-[var(--color-primary-600)]")}
            />
          </motion.span>
        </button>

        {/* quick add */}
        <div className="absolute inset-x-2.5 bottom-2.5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={quickAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary-700)]/95 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-[var(--color-primary-800)] active:scale-[0.98]"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </button>
        </div>
      </Link>

      {/* info */}
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 flex items-center gap-1.5">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.hex}
              className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-[var(--muted-foreground)]">+{product.colors.length - 4}</span>
          )}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)] transition-colors hover:text-[var(--color-primary-700)]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[var(--foreground)]">{formatPrice(displayPrice)}</span>
              {product.salePrice && (
                <span className="text-xs text-[var(--muted-foreground)] line-through">{formatPrice(product.mrp)}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-0.5 rounded-full bg-[var(--color-gold-50)] px-1.5 py-0.5">
            <Star className="h-3 w-3 fill-[var(--color-gold-500)] text-[var(--color-gold-500)]" />
            <span className="text-[11px] font-semibold text-[var(--color-gold-800)]">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
