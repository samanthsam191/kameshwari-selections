import Link from "next/link";
import { ArrowRight, Sparkles, Shirt, Palette, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { CATEGORIES, OCCASIONS, SITE_NAME } from "@/lib/constants";
import { mockProducts, mockCollections, mockTestimonials } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const newArrivals = mockProducts.filter((p) => p.isNew);
  const bestSellers = mockProducts.filter((p) => p.rating >= 4.7);

  return (
    <div>
      {/* === Hero Section === */}
      <section className="relative bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-gold-50)] overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-4">
              AI-Powered Shopping Experience
            </Badge>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-[var(--color-warm-900)] leading-tight mb-6">
              Every Saree Tells a{" "}
              <span className="text-[var(--color-primary-700)]">Story</span>
            </h1>
            <p className="text-lg text-[var(--color-warm-600)] mb-8 leading-relaxed">
              Discover premium handpicked sarees from Telangana. Try them on virtually, get AI-powered style recommendations, and find your perfect match.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/try-on">
                <Button size="lg" variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Try On Virtually
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[var(--color-primary-100)] rounded-full opacity-30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 w-72 h-72 bg-[var(--color-gold-100)] rounded-full opacity-40 blur-3xl" />
      </section>

      {/* === AI Features Highlight === */}
      <section className="py-12 bg-white border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Virtual Try-On",
                desc: "See yourself in any saree before you buy",
              },
              {
                icon: Palette,
                title: "Color Match",
                desc: "AI finds sarees that suit your skin tone",
              },
              {
                icon: MessageCircle,
                title: "AI Stylist",
                desc: "Chat for personalized recommendations",
              },
              {
                icon: Shirt,
                title: "Style Guide",
                desc: "6 regional draping styles to choose from",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] mb-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm text-[var(--foreground)]">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Shop by Category === */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
                Shop by Category
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Find your favourite fabric and weave
              </p>
            </div>
            <Link href="/products" className="hidden sm:inline-flex">
              <Button variant="ghost" className="gap-1 text-sm">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-warm-100)]"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm lg:text-base">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === New Arrivals === */}
      <section className="py-12 lg:py-16 bg-[var(--color-warm-50)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
                New Arrivals
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Fresh additions to our collection
              </p>
            </div>
            <Link href="/products?sort=newest">
              <Button variant="ghost" className="gap-1 text-sm">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* === Shop by Occasion === */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)] text-center mb-8">
            Shop by Occasion
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {OCCASIONS.map((occasion) => (
              <Link
                key={occasion}
                href={`/products?occasion=${occasion.toLowerCase()}`}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-700)] hover:border-[var(--color-primary-300)] transition-all"
                >
                  {occasion}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === Featured Collections === */}
      <section className="py-12 lg:py-16 bg-[var(--color-warm-50)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)] text-center mb-8">
            Curated Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[var(--color-warm-200)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-heading text-lg font-bold">
                    {collection.name}
                  </h3>
                  <p className="text-white/80 text-xs mt-1">
                    {collection.description}
                  </p>
                  <p className="text-white/60 text-xs mt-2">
                    {collection.productCount} sarees
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === Best Sellers === */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
                Best Sellers
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Loved by our customers
              </p>
            </div>
            <Link href="/collections/best-sellers">
              <Button variant="ghost" className="gap-1 text-sm">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* === Testimonials === */}
      <section className="py-12 lg:py-16 bg-[var(--color-primary-50)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--foreground)] text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTestimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]"
              >
                <div className="flex items-center mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-[var(--color-gold-500)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[var(--color-warm-600)] mt-3 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA Banner === */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[var(--color-primary-700)] to-[var(--color-primary-900)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
            Try Before You Buy
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Upload your photo and see how any saree from our collection looks on you. Powered by AI.
          </p>
          <Link href="/try-on">
            <Button size="xl" variant="gold" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Start Virtual Try-On
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
