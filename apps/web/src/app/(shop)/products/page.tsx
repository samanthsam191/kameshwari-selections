"use client";

import React, { useState } from "react";
import { Filter, SlidersHorizontal, ChevronDown, X, Grid3X3, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { mockProducts } from "@/lib/mock-data";
import { CATEGORIES, FABRICS, OCCASIONS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
];

const PRICE_RANGES = [
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Above ₹20,000", min: 20000, max: Infinity },
];

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [gridCols, setGridCols] = useState<2 | 3>(2);

  // In demo mode, show all mock products
  const products = mockProducts;
  const activeFilters = [...selectedCategories, ...selectedFabrics, ...selectedOccasions];

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--muted-foreground)] mb-4">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)] font-medium">All Sarees</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
            All Sarees
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {products.length} products
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid toggle (desktop) */}
          <div className="hidden lg:flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setGridCols(2)}
              className={cn(
                "p-2 transition-colors",
                gridCols === 2 ? "bg-[var(--secondary)]" : "hover:bg-[var(--secondary)]"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={cn(
                "p-2 transition-colors",
                gridCols === 3 ? "bg-[var(--secondary)]" : "hover:bg-[var(--secondary)]"
              )}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-[var(--radius)] border border-[var(--input)] bg-transparent px-3 text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Filter toggle (mobile) */}
          <Button
            variant="outline"
            className="lg:hidden gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1 pr-1">
              {filter}
              <button className="ml-1 hover:text-[var(--destructive)]">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedFabrics([]);
              setSelectedOccasions([]);
            }}
            className="text-xs text-[var(--color-primary-600)] hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar filters (desktop always visible, mobile toggleable) */}
        <aside
          className={cn(
            "w-64 shrink-0 space-y-6",
            showFilters
              ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:static lg:p-0 lg:z-auto"
              : "hidden lg:block"
          )}
        >
          {/* Mobile close */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="font-semibold text-lg">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Category filter */}
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={(e) =>
                      setSelectedCategories(
                        e.target.checked
                          ? [...selectedCategories, cat.slug]
                          : selectedCategories.filter((c) => c !== cat.slug)
                      )
                    }
                    className="rounded border-[var(--input)] text-[var(--primary)]"
                  />
                  <span className="text-sm text-[var(--color-warm-700)]">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fabric filter */}
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Fabric</h3>
            <div className="space-y-2">
              {FABRICS.map((fabric) => (
                <label key={fabric} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFabrics.includes(fabric)}
                    onChange={(e) =>
                      setSelectedFabrics(
                        e.target.checked
                          ? [...selectedFabrics, fabric]
                          : selectedFabrics.filter((f) => f !== fabric)
                      )
                    }
                    className="rounded border-[var(--input)] text-[var(--primary)]"
                  />
                  <span className="text-sm text-[var(--color-warm-700)]">{fabric}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Occasion filter */}
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Occasion</h3>
            <div className="space-y-2">
              {OCCASIONS.map((occasion) => (
                <label key={occasion} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOccasions.includes(occasion)}
                    onChange={(e) =>
                      setSelectedOccasions(
                        e.target.checked
                          ? [...selectedOccasions, occasion]
                          : selectedOccasions.filter((o) => o !== occasion)
                      )
                    }
                    className="rounded border-[var(--input)] text-[var(--primary)]"
                  />
                  <span className="text-sm text-[var(--color-warm-700)]">{occasion}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-3">Price Range</h3>
            <div className="space-y-2">
              {PRICE_RANGES.map((range) => (
                <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-[var(--input)] text-[var(--primary)]"
                  />
                  <span className="text-sm text-[var(--color-warm-700)]">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mobile apply button */}
          <div className="lg:hidden pt-4 border-t">
            <Button className="w-full" onClick={() => setShowFilters(false)}>
              Show {products.length} products
            </Button>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div
            className={cn(
              "grid gap-4 lg:gap-6",
              gridCols === 3
                ? "grid-cols-2 lg:grid-cols-3"
                : "grid-cols-2 lg:grid-cols-4"
            )}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-10">
            <Button variant="outline" size="lg">
              Load More Sarees
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
