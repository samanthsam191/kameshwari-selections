import Link from "next/link";
import { Sparkles, Palette, MessageCircle, Shirt, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/ui/smart-image";
import { Hero } from "@/components/home/hero";
import { ProductRail } from "@/components/home/product-rail";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { CATEGORIES, OCCASIONS } from "@/lib/constants";
import { mockCollections, mockTestimonials } from "@/lib/mock-data";
import { getStorefrontProducts } from "@/lib/products";

// Always fetch fresh so newly-added products appear immediately.
export const revalidate = 0;

const features = [
  { icon: Sparkles, title: "Virtual Try-On", desc: "See any saree on you before buying" },
  { icon: Palette, title: "Color Match", desc: "AI picks shades for your skin tone" },
  { icon: MessageCircle, title: "AI Stylist", desc: "Chat for personal recommendations" },
  { icon: Shirt, title: "6 Drape Styles", desc: "Regional draping, step by step" },
];

const trust = [
  { icon: Truck, label: "Free shipping ₹2,999+" },
  { icon: ShieldCheck, label: "Authentic GI-tagged weaves" },
  { icon: RefreshCw, label: "7-day easy returns" },
];

export default async function HomePage() {
  const products = await getStorefrontProducts();
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      <Hero />

      {/* trust strip */}
      <section className="border-y border-[var(--border)] bg-[var(--card)]">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 text-sm">
          {trust.map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-[var(--color-warm-700)]">
              <t.icon className="h-4 w-4 text-[var(--color-primary-600)]" />
              <span className="font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI features */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto mb-10 max-w-xl text-center">
            <Badge variant="gold" className="mb-3">Why Kameshwari</Badge>
            <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] lg:text-4xl">
              Shopping sarees, reimagined
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-50)] text-[var(--color-primary-700)] transition-transform group-hover:scale-110">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* categories */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] lg:text-3xl">Shop by weave</h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">Find your favourite fabric & tradition</p>
              </div>
            </div>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
                >
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
                    <SmartImage src={c.image} alt={c.name} palette={[...c.palette]} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-heading text-lg font-semibold text-white">{c.name}</h3>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/75 opacity-0 transition-all group-hover:opacity-100">
                      Explore →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <ProductRail title="New arrivals" subtitle="Fresh off the loom" href="/products?sort=newest" products={newArrivals} />

      {/* occasion band */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div className="aurora-bg absolute inset-0 opacity-50" aria-hidden />
        <div className="container relative mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] lg:text-3xl">Dressed for every occasion</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted-foreground)]">
              From haldi mornings to reception nights
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {OCCASIONS.map((o) => (
                <Link key={o} href={`/products?occasion=${o.toLowerCase()}`}>
                  <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--card)]/80 px-4 py-2 text-sm font-medium backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-700)]">
                    {o}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* collections */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="mb-6 text-center font-heading text-2xl font-bold text-[var(--foreground)] lg:text-3xl">
              Curated collections
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockCollections.map((col, i) => (
              <StaggerItem key={col.id}>
                <Link
                  href={`/collections/${col.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-soft"
                >
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
                    <SmartImage
                      src={col.image}
                      alt={col.name}
                      palette={[["#7a1739", "#c99a28"], ["#166b6d", "#eccb52"], ["#961a43", "#e3b52f"], ["#175557", "#d13c6b"]][i % 4]}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-heading text-lg font-bold text-white">{col.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-white/75">{col.description}</p>
                    <p className="mt-2 text-xs font-medium text-[var(--color-gold-300)]">{col.productCount} sarees →</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <ProductRail title="Best sellers" subtitle="Loved by our customers" href="/collections/best-sellers" products={bestSellers} />

      {/* testimonials */}
      <section className="bg-[var(--color-primary-50)] py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="mb-10 text-center font-heading text-2xl font-bold text-[var(--foreground)] lg:text-3xl">
              Draped in love
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {mockTestimonials.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
                  <div className="mb-3 flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-[var(--color-gold-500)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-[var(--color-warm-700)]">&ldquo;{t.text}&rdquo;</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-primary-700)] font-heading text-sm font-bold text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--foreground)]">{t.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{t.location}</div>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-primary-700)] via-[var(--color-primary-800)] to-[var(--color-primary-950)] px-6 py-14 text-center text-white shadow-lift lg:px-12 lg:py-20">
              <div className="aurora-bg absolute inset-0 opacity-25" aria-hidden />
              <div className="relative">
                <Sparkles className="mx-auto mb-4 h-8 w-8 text-[var(--color-gold-300)]" />
                <h2 className="font-heading text-3xl font-bold lg:text-5xl">Try before you buy</h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Upload a photo and see how any saree drapes on you — powered by AI.
                </p>
                <Link href="/try-on" className="mt-8 inline-block">
                  <Button size="xl" variant="gold" className="gap-2 rounded-full shadow-lift">
                    <Sparkles className="h-5 w-5" /> Start Virtual Try-On
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
