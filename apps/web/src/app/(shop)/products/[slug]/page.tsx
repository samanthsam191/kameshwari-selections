"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Share2,
  ShoppingBag,
  Star,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  Sparkles,
  Camera,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { mockProducts, type Product } from "@/lib/mock-data";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";

// Mock reviews
const mockReviews = [
  {
    id: "r1",
    name: "Priya S.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely stunning saree! The fabric quality is excellent and the colors are vibrant. Received it well-packaged. Will definitely order again.",
    verified: true,
  },
  {
    id: "r2",
    name: "Meena R.",
    rating: 4,
    date: "1 month ago",
    comment:
      "Beautiful saree, exactly as shown in the pictures. The blouse piece fabric is also good. Slightly delayed delivery but worth the wait.",
    verified: true,
  },
  {
    id: "r3",
    name: "Anjali K.",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "I used the virtual try-on feature and the saree looked even better in person! Great experience overall.",
    verified: true,
  },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            size === "lg" ? "h-5 w-5" : "h-4 w-4",
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const product = mockProducts.find((p) => p.slug === resolvedParams.slug) || mockProducts[0];

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");

  const discount = product.salePrice ? calculateDiscount(product.mrp, product.salePrice) : 0;
  const displayPrice = product.salePrice || product.basePrice;

  // Related products (same category, excluding current)
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <ChevronRight className="inline h-3 w-3 mx-1" />
        <Link href="/products" className="hover:text-[var(--foreground)]">Sarees</Link>
        <ChevronRight className="inline h-3 w-3 mx-1" />
        <span className="text-[var(--foreground)] font-medium capitalize">{product.category}</span>
        <ChevronRight className="inline h-3 w-3 mx-1" />
        <span className="text-[var(--foreground)] font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)]">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-primary-300)]">
              <div className="text-center">
                <Camera className="h-16 w-16 mx-auto mb-3 opacity-40" />
                <p className="text-sm opacity-60">Product Image {selectedImage + 1}</p>
              </div>
            </div>
            {product.isNew && (
              <Badge className="absolute top-4 left-4 z-10">NEW</Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-4 right-4 z-10">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all",
                  "bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)]",
                  selectedImage === idx
                    ? "border-[var(--primary)] shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-5 w-5 text-[var(--color-primary-300)] opacity-40" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & name */}
          <div>
            <p className="text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-wider mb-1">
              {product.fabric} — {product.category}
            </p>
            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size="lg" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm text-[var(--muted-foreground)]">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[var(--foreground)]">
              {formatPrice(displayPrice)}
            </span>
            {product.salePrice && (
              <>
                <span className="text-lg text-[var(--muted-foreground)] line-through">
                  {formatPrice(product.mrp)}
                </span>
                <Badge variant="success">{discount}% off</Badge>
              </>
            )}
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">Inclusive of all taxes</p>

          {/* Color selector */}
          <div>
            <p className="text-sm font-medium mb-3">
              Color: <span className="text-[var(--muted-foreground)]">{product.colors[selectedColor].name}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color, idx) => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(idx)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all relative",
                    selectedColor === idx
                      ? "border-[var(--primary)] scale-110 shadow-md"
                      : "border-gray-200 hover:scale-105"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === idx && (
                    <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Blouse option */}
          <div>
            <p className="text-sm font-medium mb-3">Blouse</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm rounded-lg border-2 border-[var(--primary)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium">
                Running Blouse Piece
              </button>
              <button className="px-4 py-2 text-sm rounded-lg border-2 border-gray-200 hover:border-gray-300 text-[var(--color-warm-600)]">
                Unstitched Blouse
              </button>
              <button className="px-4 py-2 text-sm rounded-lg border-2 border-gray-200 hover:border-gray-300 text-[var(--color-warm-600)]">
                Custom Stitch (+₹500)
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium mb-3">Quantity</p>
            <div className="inline-flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 hover:bg-[var(--secondary)] transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 py-2 text-sm font-medium min-w-[48px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2.5 hover:bg-[var(--secondary)] transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {product.stock <= 10 && (
              <p className="text-xs text-[var(--color-warning)] mt-1.5">
                Only {product.stock} left in stock!
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button size="xl" className="flex-1 gap-2 text-base">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="gold"
              size="xl"
              className="gap-2"
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                )}
              />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Virtual try-on CTA */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[var(--color-primary-50)] to-purple-50 border border-[var(--color-primary-100)]">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[var(--color-primary-500)] to-purple-500 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Virtual Try-On Available
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                See how this saree looks on you with AI
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Camera className="h-4 w-4" />
              Try On
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-[var(--color-warm-600)]">
              <Truck className="h-4 w-4 text-[var(--color-primary-500)]" />
              <span>Free Shipping above ₹999</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-warm-600)]">
              <RotateCcw className="h-4 w-4 text-[var(--color-primary-500)]" />
              <span>7-Day Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-warm-600)]">
              <Shield className="h-4 w-4 text-[var(--color-primary-500)]" />
              <span>100% Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Details / Reviews */}
      <div className="mt-12 lg:mt-16">
        <div className="flex border-b">
          {(["description", "details", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-3 text-sm font-medium capitalize transition-colors relative",
                activeTab === tab
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <div className="max-w-3xl space-y-4">
              <p className="text-[var(--color-warm-700)] leading-relaxed">
                {product.description}
              </p>
              <p className="text-[var(--color-warm-700)] leading-relaxed">
                Each saree is carefully inspected for quality before shipping. The fabric is soft
                to touch and drapes beautifully. Comes with an unstitched blouse piece in matching
                color. Saree length is 5.5 meters with 0.8 meter blouse piece.
              </p>
              <h3 className="font-heading font-semibold text-lg mt-6 mb-3">Care Instructions</h3>
              <ul className="list-disc list-inside text-sm text-[var(--color-warm-600)] space-y-1.5">
                <li>Dry clean recommended for first wash</li>
                <li>Hand wash gently with mild detergent for subsequent washes</li>
                <li>Do not bleach or wring</li>
                <li>Dry in shade, avoid direct sunlight</li>
                <li>Iron on medium heat, preferably on the reverse side</li>
                <li>Store folded in a cotton cloth to maintain sheen</li>
              </ul>
            </div>
          )}

          {activeTab === "details" && (
            <div className="max-w-2xl">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Fabric", product.fabric],
                    ["Category", product.category],
                    ["Saree Length", "5.5 meters"],
                    ["Blouse Piece", "0.8 meters (unstitched)"],
                    ["Width", "45 inches"],
                    ["Weight", "650 grams (approx)"],
                    ["Border Type", "Zari Border"],
                    ["Pattern", "Woven"],
                    ["Occasion", product.occasions.join(", ")],
                    ["Wash Care", "Dry Clean / Hand Wash"],
                    ["Country of Origin", "India"],
                    ["Manufacturer", "Kameshwari Selections, Telangana"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b">
                      <td className="py-3 pr-4 font-medium text-[var(--foreground)] w-40">
                        {label}
                      </td>
                      <td className="py-3 text-[var(--color-warm-600)] capitalize">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl space-y-6">
              {/* Rating summary */}
              <div className="flex items-center gap-6 p-6 rounded-xl bg-[var(--secondary)]">
                <div className="text-center">
                  <p className="text-4xl font-bold">{product.rating}</p>
                  <StarRating rating={product.rating} size="lg" />
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {product.reviewCount} reviews
                  </p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const pct = stars === 5 ? 72 : stars === 4 ? 20 : stars === 3 ? 5 : 2;
                    return (
                      <div key={stars} className="flex items-center gap-2 text-xs">
                        <span className="w-3">{stars}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-yellow-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-[var(--muted-foreground)]">
                          {pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-sm font-semibold text-[var(--color-primary-700)]">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.name}</p>
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} />
                            {review.verified && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                <Check className="h-2.5 w-2.5 mr-0.5" /> Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-[var(--muted-foreground)]">{review.date}</span>
                    </div>
                    <p className="text-sm text-[var(--color-warm-600)] leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="outline">Load More Reviews</Button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-12 lg:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl lg:text-2xl font-bold">You May Also Like</h2>
          <Link
            href="/products"
            className="text-sm text-[var(--color-primary-600)] hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
