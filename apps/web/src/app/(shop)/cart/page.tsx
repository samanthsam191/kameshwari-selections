"use client";

import React from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/ui/smart-image";
import { useCartStore } from "@/stores/cart-store";
import { mockProducts } from "@/lib/mock-data";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";

// Demo: pre-fill cart with a couple items for the demo
function useDemoCart() {
  const { items, addItem } = useCartStore();
  const initialized = React.useRef(false);
  React.useEffect(() => {
    if (!initialized.current && items.length === 0) {
      initialized.current = true;
      addItem({
        product: mockProducts[0],
        quantity: 1,
        selectedColor: mockProducts[0].colors[0].name,
        blouseOption: "running",
      });
      addItem({
        product: mockProducts[4],
        quantity: 2,
        selectedColor: mockProducts[4].colors[2].name,
        blouseOption: "unstitched",
      });
    }
  }, []);
}

export default function CartPage() {
  useDemoCart();
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [couponCode, setCouponCode] = React.useState("");

  const subtotal = getTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-20 w-20 mx-auto text-[var(--muted-foreground)] opacity-30 mb-6" />
        <h1 className="font-heading text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-[var(--muted-foreground)] mb-6">
          Looks like you haven't added any sarees yet.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)] font-medium">Shopping Cart</span>
      </nav>

      <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-8">
        Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => {
            const price = item.product.salePrice || item.product.basePrice;
            const discount = item.product.salePrice
              ? calculateDiscount(item.product.mrp, item.product.salePrice)
              : 0;
            const blouseExtra = item.blouseOption === "custom" ? 500 : 0;

            return (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="flex gap-4 rounded-2xl border bg-[var(--card)] p-4 shadow-soft"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="h-32 w-24 shrink-0 overflow-hidden rounded-xl lg:h-40 lg:w-32"
                >
                  <SmartImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    palette={item.product.colors.map((c) => c.hex)}
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-medium text-sm lg:text-base hover:text-[var(--color-primary-600)] line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {item.product.fabric} • {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor:
                          item.product.colors.find((c) => c.name === item.selectedColor)?.hex ||
                          "#ccc",
                      }}
                    />
                    <span className="text-xs text-[var(--color-warm-600)]">
                      {item.selectedColor}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">•</span>
                    <span className="text-xs text-[var(--color-warm-600)] capitalize">
                      {item.blouseOption === "running"
                        ? "Running Blouse"
                        : item.blouseOption === "custom"
                        ? "Custom Stitch (+₹500)"
                        : "Unstitched"}
                    </span>
                  </div>

                  <div className="flex items-end justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-[var(--secondary)] transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-[var(--secondary)] transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice((price + blouseExtra) * item.quantity)}
                      </p>
                      {discount > 0 && (
                        <p className="text-xs text-[var(--muted-foreground)] line-through">
                          {formatPrice(item.product.mrp * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="border rounded-xl p-6 bg-white sticky top-24">
            <h2 className="font-heading text-lg font-semibold mb-4">Order Summary</h2>

            {/* Coupon */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">Apply</Button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-warm-600)]">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-warm-600)]">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {shipping === 0 && (
                <div className="flex items-center gap-1.5 text-xs text-green-600">
                  <Truck className="h-3.5 w-3.5" />
                  Free shipping on orders above ₹999
                </div>
              )}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-base">Total</span>
                <span className="font-bold text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            <Button asChild size="lg" className="w-full mt-6 gap-2">
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <p className="text-xs text-center text-[var(--muted-foreground)] mt-3">
              Secure checkout powered by Razorpay
            </p>

            <div className="mt-4 pt-4 border-t">
              <Link
                href="/products"
                className="text-sm text-[var(--color-primary-600)] hover:underline flex items-center justify-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
