"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const discount = product.salePrice
    ? calculateDiscount(product.mrp, product.salePrice)
    : 0;
  const displayPrice = product.salePrice || product.basePrice;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-[var(--color-warm-100)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
        {/* Placeholder gradient since we don't have real images */}
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${product.colors[0]?.hex || '#e8e4de'}20, ${product.colors[0]?.hex || '#e8e4de'}40)`,
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge variant="gold" className="text-[10px]">NEW</Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="text-[10px]">{discount}% OFF</Badge>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <Button
            className="w-full gap-2 bg-[var(--color-primary-700)]/95 backdrop-blur"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 lg:p-4">
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mb-2">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.hex}
              className="h-3.5 w-3.5 rounded-full border border-[var(--border)] shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-[var(--muted-foreground)]">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-[var(--foreground)] line-clamp-2 hover:text-[var(--color-primary-700)] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Fabric */}
        <p className="text-xs text-[var(--muted-foreground)] mt-1">{product.fabric}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-[var(--foreground)]">
            {formatPrice(displayPrice)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-[var(--muted-foreground)] line-through">
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "text-[var(--color-gold-500)]"
                    : "text-[var(--color-warm-200)]"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-[var(--muted-foreground)]">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
}
