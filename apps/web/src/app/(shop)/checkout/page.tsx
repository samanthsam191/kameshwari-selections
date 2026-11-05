"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  ChevronRight,
  Lock,
  Camera,
  Shield,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart-store";
import { cn, formatPrice } from "@/lib/utils";

type Step = "address" | "payment" | "review";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / Google Pay / PhonePe", icon: Smartphone, popular: true },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, popular: false },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, popular: false },
];

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [step, setStep] = useState<Step>("address");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const subtotal = getTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  // Demo fallback if cart is empty
  const hasItems = items.length > 0;

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-[var(--foreground)]">Cart</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)] font-medium">Checkout</span>
      </nav>

      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(["address", "payment", "review"] as const).map((s, idx) => (
          <React.Fragment key={s}>
            <button
              onClick={() => setStep(s)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                step === s
                  ? "bg-[var(--primary)] text-white"
                  : s === "address" ||
                    (s === "payment" && (step === "payment" || step === "review")) ||
                    (s === "review" && step === "review")
                  ? "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]"
                  : "bg-gray-100 text-[var(--muted-foreground)]"
              )}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                {idx + 1}
              </span>
              <span className="hidden sm:inline capitalize">{s}</span>
            </button>
            {idx < 2 && <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          {/* Address step */}
          {step === "address" && (
            <div className="border rounded-xl p-6 bg-white">
              <h2 className="font-heading text-lg font-semibold mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[var(--primary)]" />
                Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                  <Input placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone Number *</label>
                  <Input placeholder="+91 98765 43210" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Address Line 1 *</label>
                  <Input placeholder="House/Flat number, Building name" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Address Line 2</label>
                  <Input placeholder="Street, Area, Landmark" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">City *</label>
                  <Input placeholder="City" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">State *</label>
                  <Input placeholder="State" defaultValue="Telangana" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">PIN Code *</label>
                  <Input placeholder="500001" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <Input placeholder="email@example.com" type="email" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button size="lg" onClick={() => setStep("payment")} className="gap-2">
                  Continue to Payment
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Payment step */}
          {step === "payment" && (
            <div className="border rounded-xl p-6 bg-white">
              <h2 className="font-heading text-lg font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[var(--primary)]" />
                Payment Method
              </h2>

              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      paymentMethod === method.id
                        ? "border-[var(--primary)] bg-[var(--color-primary-50)]"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        paymentMethod === method.id
                          ? "border-[var(--primary)]"
                          : "border-gray-300"
                      )}
                    >
                      {paymentMethod === method.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
                      )}
                    </div>
                    <method.icon className="h-5 w-5 text-[var(--color-warm-600)]" />
                    <span className="text-sm font-medium flex-1">{method.label}</span>
                    {method.popular && <Badge variant="success">Popular</Badge>}
                  </label>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <div className="mt-6 p-4 rounded-lg bg-[var(--secondary)]">
                  <label className="block text-sm font-medium mb-1.5">UPI ID</label>
                  <Input placeholder="name@upi or phone@paytm" />
                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5">
                    You'll receive a payment request on your UPI app
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="mt-6 p-4 rounded-lg bg-[var(--secondary)] space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Card Number</label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">CVV</label>
                      <Input placeholder="•••" type="password" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Name on Card</label>
                    <Input placeholder="Name on card" />
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    Pay with cash when your order is delivered. An additional ₹50 COD fee applies.
                  </p>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep("address")}>
                  ← Back
                </Button>
                <Button size="lg" onClick={() => setStep("review")} className="gap-2">
                  Review Order
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Review step */}
          {step === "review" && (
            <div className="space-y-6">
              {/* Address preview */}
              <div className="border rounded-xl p-5 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Delivery Address
                  </h3>
                  <button
                    onClick={() => setStep("address")}
                    className="text-xs text-[var(--color-primary-600)] hover:underline"
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm text-[var(--color-warm-600)]">
                  Demo User, +91 98765 43210<br />
                  123 Sample Street, Hyderabad<br />
                  Telangana — 500001
                </p>
              </div>

              {/* Payment preview */}
              <div className="border rounded-xl p-5 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Payment Method
                  </h3>
                  <button
                    onClick={() => setStep("payment")}
                    className="text-xs text-[var(--color-primary-600)] hover:underline"
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm text-[var(--color-warm-600)] capitalize">
                  {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                </p>
              </div>

              {/* Items preview */}
              <div className="border rounded-xl p-5 bg-white">
                <h3 className="font-semibold mb-4">
                  Order Items ({items.length})
                </h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-14 rounded bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center shrink-0">
                        <Camera className="h-4 w-4 text-[var(--color-primary-300)] opacity-40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          Qty: {item.quantity} • {item.selectedColor}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(
                          ((item.product.salePrice || item.product.basePrice) +
                            (item.blouseOption === "custom" ? 500 : 0)) *
                            item.quantity
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep("payment")}>
                  ← Back
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="gold"
                  className="gap-2"
                >
                  <Link href="/orders/demo-order-123">
                    <Lock className="h-4 w-4" />
                    Place Order — {formatPrice(total)}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Price summary sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="border rounded-xl p-5 bg-white sticky top-24">
            <h3 className="font-heading font-semibold mb-4">Price Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-warm-600)]">
                  Price ({items.length} {items.length === 1 ? "item" : "items"})
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-warm-600)]">Delivery</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              {paymentMethod === "cod" && (
                <div className="flex justify-between">
                  <span className="text-[var(--color-warm-600)]">COD Fee</span>
                  <span>{formatPrice(50)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-semibold text-base">
                <span>Total Amount</span>
                <span>{formatPrice(total + (paymentMethod === "cod" ? 50 : 0))}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs text-[var(--color-warm-600)]">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Safe and Secure Payments. 100% Authentic products.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
