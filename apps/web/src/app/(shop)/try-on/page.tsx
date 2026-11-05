"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Upload,
  Sparkles,
  Wand2,
  Palette,
  RotateCcw,
  Share2,
  Download,
  ShoppingBag,
  ChevronRight,
  Image as ImageIcon,
  User,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { DRAPING_STYLES } from "@/lib/constants";

export default function VirtualTryOnPage() {
  const [step, setStep] = useState<"upload" | "select" | "result">("upload");
  const [selectedSaree, setSelectedSaree] = useState<string | null>(null);
  const [drapingStyle, setDrapingStyle] = useState("nivi");

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      <nav className="text-xs text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)] font-medium">Virtual Try-On</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-10">
        <Badge variant="gold" className="mb-3">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          AI-Powered
        </Badge>
        <h1 className="font-heading text-2xl lg:text-4xl font-bold text-[var(--foreground)] mb-2">
          Virtual Saree Try-On
        </h1>
        <p className="text-[var(--muted-foreground)] max-w-lg mx-auto">
          See how any saree looks on you before buying. Upload your photo, pick a saree, choose your draping style — our AI does the rest.
        </p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[
          { id: "upload" as const, label: "Upload Photo", num: 1 },
          { id: "select" as const, label: "Select Saree", num: 2 },
          { id: "result" as const, label: "View Result", num: 3 },
        ].map((s, idx) => (
          <React.Fragment key={s.id}>
            <button
              onClick={() => setStep(s.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                step === s.id
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-100 text-[var(--muted-foreground)]"
              )}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                {s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {idx < 2 && <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-dashed border-[var(--color-primary-200)] rounded-2xl p-12 text-center bg-gradient-to-b from-[var(--color-primary-50)] to-white">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[var(--color-primary-400)] to-purple-400 flex items-center justify-center">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-heading text-xl font-semibold mb-2">Upload Your Photo</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6 max-w-sm mx-auto">
              Take a front-facing photo or upload one from your gallery. Stand straight with arms slightly apart for best results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="gap-2" onClick={() => setStep("select")}>
                <Camera className="h-5 w-5" />
                Take Photo
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => setStep("select")}>
                <Upload className="h-5 w-5" />
                Upload from Gallery
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: User, title: "Full Body", desc: "Stand facing the camera, full body visible" },
              { icon: ImageIcon, title: "Good Lighting", desc: "Natural light works best for accurate colors" },
              { icon: Layers, title: "Plain Background", desc: "A plain wall gives the cleanest result" },
            ].map((tip) => (
              <div key={tip.title} className="p-4 rounded-xl bg-[var(--secondary)] text-center">
                <tip.icon className="h-6 w-6 mx-auto mb-2 text-[var(--color-primary-500)]" />
                <p className="text-sm font-medium">{tip.title}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select saree & draping style */}
      {step === "select" && (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview area */}
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <User className="h-24 w-24 mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-[var(--muted-foreground)]">Your photo preview</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setStep("upload")}>
                  Change Photo
                </Button>
              </div>
            </div>

            {/* Selection controls */}
            <div className="space-y-6">
              {/* Choose saree */}
              <div>
                <h3 className="font-heading font-semibold mb-3">Choose a Saree</h3>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {mockProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedSaree(product.id)}
                      className={cn(
                        "p-2 rounded-lg border-2 text-left transition-all",
                        selectedSaree === product.id
                          ? "border-[var(--primary)] bg-[var(--color-primary-50)]"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="aspect-square rounded bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center mb-1.5">
                        <Camera className="h-4 w-4 text-[var(--color-primary-300)] opacity-40" />
                      </div>
                      <p className="text-[10px] font-medium line-clamp-1">{product.name}</p>
                      <p className="text-[10px] text-[var(--color-primary-600)]">
                        {formatPrice(product.salePrice || product.basePrice)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Draping style */}
              <div>
                <h3 className="font-heading font-semibold mb-3">Draping Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {DRAPING_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setDrapingStyle(style.id)}
                      className={cn(
                        "px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all",
                        drapingStyle === style.id
                          ? "border-[var(--primary)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
                          : "border-gray-200 text-[var(--color-warm-600)] hover:border-gray-300"
                      )}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin tone analysis */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-[var(--color-primary-50)] border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="h-5 w-5 text-purple-500" />
                  <p className="text-sm font-semibold">AI Color Match</p>
                </div>
                <p className="text-xs text-[var(--color-warm-600)]">
                  Our AI analyzes your skin tone and recommends the best colors. This saree is a <Badge variant="success" className="text-[10px]">Great Match</Badge> for your complexion.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => setStep("result")}
                disabled={!selectedSaree}
              >
                <Wand2 className="h-5 w-5" />
                Generate Try-On
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === "result" && (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Result image */}
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="h-16 w-16 mx-auto text-[var(--color-primary-400)] mb-4" />
                <p className="text-sm font-medium text-[var(--color-primary-600)]">
                  AI-Generated Try-On Result
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-[200px] mx-auto">
                  In production, this would show the AI-generated image of you wearing the selected saree
                </p>
              </div>
            </div>

            {/* Result details */}
            <div className="space-y-6">
              <div>
                <Badge variant="gold" className="mb-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Result
                </Badge>
                <h2 className="font-heading text-xl font-semibold">
                  {mockProducts.find((p) => p.id === selectedSaree)?.name || "Royal Kanjivaram Silk Saree"}
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {DRAPING_STYLES.find((s) => s.id === drapingStyle)?.name || "Nivi"} style draping
                </p>
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <p className="text-sm font-semibold text-green-800 mb-1">
                  ✨ This saree looks great on you!
                </p>
                <p className="text-xs text-green-700">
                  Based on your skin tone analysis, this color complements your complexion beautifully.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" size="lg">
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setStep("select")}>
                  <RotateCcw className="h-4 w-4" />
                  Try Another
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-3.5 w-3.5" />
                  Save Image
                </Button>
              </div>

              {/* Try more sarees */}
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-sm mb-3">Try More Sarees</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {mockProducts.slice(0, 5).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedSaree(product.id);
                        setStep("select");
                      }}
                      className="w-16 shrink-0"
                    >
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center mb-1">
                        <Camera className="h-4 w-4 text-[var(--color-primary-300)] opacity-40" />
                      </div>
                      <p className="text-[10px] text-center line-clamp-1">{product.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
