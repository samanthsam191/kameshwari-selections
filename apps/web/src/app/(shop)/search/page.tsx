"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, TrendingUp, Clock, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { mockProducts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TRENDING_SEARCHES = [
  "Kanjivaram silk",
  "Pochampally ikat",
  "Banarasi wedding",
  "Cotton casual",
  "Under ₹2000",
  "Gadwal pattu",
  "Organza party",
  "Bridal red",
];

const RECENT_SEARCHES = ["Silk saree", "Blue pochampally", "Wedding collection"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredProducts = query.length > 0
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (term: string) => {
    setQuery(term);
    setHasSearched(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length > 0) setHasSearched(true);
            }}
            placeholder="Search for sarees by name, fabric, occasion..."
            className="w-full h-14 rounded-2xl border border-[var(--input)] bg-white pl-12 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
            autoFocus
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setHasSearched(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* AI suggestion */}
        <div className="flex items-center gap-2 mt-3 px-2">
          <Sparkles className="h-4 w-4 text-[var(--color-primary-500)]" />
          <p className="text-xs text-[var(--muted-foreground)]">
            Try: "Show me silk sarees under ₹5000 for a wedding" — our AI understands natural language
          </p>
        </div>
      </div>

      {/* No query: show suggestions */}
      {!hasSearched && (
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Recent searches */}
          {RECENT_SEARCHES.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 rounded-full border text-sm text-[var(--color-warm-600)] hover:bg-[var(--secondary)] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending searches */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-1.5 rounded-full bg-[var(--color-primary-50)] text-sm text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular categories */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Silk Sarees", "Cotton Sarees", "Wedding Sarees", "Daily Wear"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSearch(cat)}
                  className="p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary-50)] to-white border hover:shadow-md transition-shadow text-center"
                >
                  <p className="text-sm font-medium">{cat}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search results */}
      {hasSearched && (
        <div>
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            {filteredProducts.length > 0
              ? `Showing ${filteredProducts.length} results for "${query}"`
              : `No results found for "${query}"`}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-[var(--muted-foreground)] opacity-30 mb-4" />
              <h2 className="font-heading text-xl font-semibold mb-2">No results found</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6 max-w-sm mx-auto">
                We couldn't find any sarees matching "{query}". Try a different search term or browse our collections.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {TRENDING_SEARCHES.slice(0, 4).map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 rounded-full bg-[var(--color-primary-50)] text-sm text-[var(--color-primary-700)]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
