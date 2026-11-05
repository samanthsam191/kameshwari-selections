"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)] text-white flex-col justify-center p-16">
        <div className="max-w-md">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Kameshwari Selections
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Discover the finest handloom sarees from Telangana. AI-powered virtual try-on, personalised styling, and doorstep delivery.
          </p>

          <div className="space-y-4">
            {[
              "Virtual Try-On with AI draping",
              "500+ Handpicked Sarees",
              "GI-Tagged Telangana Weaves",
              "Free Shipping above ₹999",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-[var(--color-gold-400)]" />
                <span className="text-sm text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="font-heading text-2xl font-bold text-[var(--color-primary-700)]">
              Kameshwari Selections
            </h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-[var(--foreground)]">
              {step === "phone" ? "Welcome" : "Verify OTP"}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {step === "phone"
                ? "Sign in with your phone number to continue"
                : `We've sent a 6-digit OTP to +91 ${phone}`}
            </p>
          </div>

          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] font-medium">
                    +91
                  </span>
                  <Input
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-12"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => setStep("otp")}
                disabled={phone.length < 10}
              >
                Get OTP
                <ArrowRight className="h-4 w-4" />
              </Button>

              <p className="text-xs text-center text-[var(--muted-foreground)]">
                By continuing, you agree to our{" "}
                <Link href="#" className="text-[var(--color-primary-600)] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[var(--color-primary-600)] hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Enter OTP</label>
                <div className="flex gap-2 justify-center">
                  {[...Array(6)].map((_, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 rounded-lg border border-[var(--input)] text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                    />
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full gap-2" asChild>
                <Link href="/">
                  Verify & Sign In
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <div className="text-center">
                <button className="text-sm text-[var(--color-primary-600)] hover:underline">
                  Resend OTP
                </button>
                <span className="mx-2 text-[var(--muted-foreground)]">•</span>
                <button
                  onClick={() => setStep("phone")}
                  className="text-sm text-[var(--muted-foreground)] hover:underline"
                >
                  Change Number
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
