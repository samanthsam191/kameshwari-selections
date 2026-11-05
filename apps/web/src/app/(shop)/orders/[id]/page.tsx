"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  Camera,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const ORDER_STEPS = [
  { label: "Order Placed", icon: CheckCircle2, done: true, date: "Nov 5, 2026" },
  { label: "Confirmed", icon: Package, done: true, date: "Nov 5, 2026" },
  { label: "Shipped", icon: Truck, done: false, date: "Expected Nov 7" },
  { label: "Delivered", icon: MapPin, done: false, date: "Expected Nov 9" },
];

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Success banner */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)] mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-[var(--muted-foreground)]">
          Thank you for shopping with Kameshwari Selections
        </p>
        <p className="text-sm mt-2">
          Order ID: <span className="font-mono font-semibold">KS-2026110512345</span>
        </p>
      </div>

      {/* Order tracking */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="border rounded-xl p-6 bg-white">
          <h2 className="font-heading font-semibold mb-6">Order Tracking</h2>

          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div className="h-full bg-green-500 w-[37%]" />
            </div>

            {ORDER_STEPS.map((step, idx) => (
              <div key={step.label} className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                    step.done
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-[var(--muted-foreground)]"
                  )}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <p
                  className={cn(
                    "text-xs font-medium text-center",
                    step.done ? "text-green-700" : "text-[var(--muted-foreground)]"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                  {step.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto grid gap-6">
        {/* Order items */}
        <div className="border rounded-xl p-6 bg-white">
          <h2 className="font-heading font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {[mockProducts[0], mockProducts[4]].map((product) => (
              <div key={product.id} className="flex gap-4">
                <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center shrink-0">
                  <Camera className="h-5 w-5 text-[var(--color-primary-300)] opacity-40" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    {product.colors[0].name} • Running Blouse
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">Qty: 1</p>
                </div>
                <p className="text-sm font-semibold">
                  {formatPrice(product.salePrice || product.basePrice)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[var(--color-warm-600)]">
              <span>Subtotal</span>
              <span>{formatPrice(14998)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-warm-600)]">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total Paid</span>
              <span>{formatPrice(14998)}</span>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="border rounded-xl p-6 bg-white">
          <h2 className="font-heading font-semibold mb-3">Delivery Address</h2>
          <p className="text-sm text-[var(--color-warm-600)]">
            Demo User<br />
            123 Sample Street, Hyderabad<br />
            Telangana — 500001<br />
            Phone: +91 98765 43210
          </p>
        </div>

        {/* Estimated delivery */}
        <div className="border rounded-xl p-5 bg-[var(--color-primary-50)] flex items-center gap-4">
          <Clock className="h-8 w-8 text-[var(--color-primary-500)]" />
          <div>
            <p className="font-semibold text-sm">Estimated Delivery</p>
            <p className="text-xs text-[var(--color-warm-600)]">
              Your order will be delivered by <strong>November 9, 2026</strong>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Order
          </Button>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
