export const SITE_NAME = "Kameshwari Selections";
export const SITE_DESCRIPTION =
  "Premium handpicked sarees from Telangana — silk, cotton, Banarasi, and more. AI-powered virtual try-on, style recommendations, and doorstep delivery across India.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kameshwariselections.com";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1";

export const CATEGORIES = [
  { name: "Silk Sarees", slug: "silk", image: "/categories/silk.jpg" },
  { name: "Cotton Sarees", slug: "cotton", image: "/categories/cotton.jpg" },
  { name: "Banarasi Sarees", slug: "banarasi", image: "/categories/banarasi.jpg" },
  { name: "Kanjivaram Sarees", slug: "kanjivaram", image: "/categories/kanjivaram.jpg" },
  { name: "Pochampally Sarees", slug: "pochampally", image: "/categories/pochampally.jpg" },
  { name: "Gadwal Sarees", slug: "gadwal", image: "/categories/gadwal.jpg" },
  { name: "Linen Sarees", slug: "linen", image: "/categories/linen.jpg" },
  { name: "Organza Sarees", slug: "organza", image: "/categories/organza.jpg" },
] as const;

export const OCCASIONS = [
  "Wedding",
  "Festive",
  "Casual",
  "Office",
  "Party",
  "Puja",
  "Haldi",
  "Mehendi",
  "Reception",
] as const;

export const FABRICS = [
  "Pure Silk",
  "Cotton",
  "Banarasi Silk",
  "Kanjivaram Silk",
  "Organza",
  "Linen",
  "Georgette",
  "Chiffon",
  "Crepe",
  "Chanderi",
] as const;

export const DRAPING_STYLES = [
  { id: "nivi", name: "Nivi Style", description: "Most common, pleats tucked at waist" },
  { id: "bengali", name: "Bengali Style", description: "No pleats, key-hole front drape" },
  { id: "gujarati", name: "Gujarati Style", description: "Pallu brought from back to front over right shoulder" },
  { id: "maharashtrian", name: "Maharashtrian Style", description: "Nauvari, 9-yard dhoti style" },
  { id: "kerala", name: "Kerala Style", description: "Kasavu mundu, two-piece golden border" },
  { id: "coorgi", name: "Coorgi Style", description: "Pleats at back, pallu pinned at shoulder" },
] as const;

export const NAV_LINKS = [
  { name: "New Arrivals", href: "/products?sort=newest" },
  { name: "Silk", href: "/products?category=silk" },
  { name: "Cotton", href: "/products?category=cotton" },
  { name: "Banarasi", href: "/products?category=banarasi" },
  { name: "Wedding", href: "/products?occasion=wedding" },
  { name: "Collections", href: "/collections" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { name: "All Sarees", href: "/products" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Best Sellers", href: "/collections/best-sellers" },
    { name: "Under ₹2000", href: "/products?maxPrice=2000" },
    { name: "Wedding Collection", href: "/collections/wedding" },
  ],
  help: [
    { name: "Track Order", href: "/orders" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Return Policy", href: "/return-policy" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/about#story" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ],
} as const;
