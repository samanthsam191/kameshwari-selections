export const SITE_NAME = "Kameshwari Selections";
export const SITE_DESCRIPTION =
  "Premium handpicked sarees from Telangana — silk, cotton, Banarasi, and more. AI-powered virtual try-on, style recommendations, and doorstep delivery across India.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kameshwariselections.com";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1";

export const CATEGORIES = [
  { name: "Silk", slug: "silk", image: "", palette: ["#7a1739", "#c99a28"] },
  { name: "Cotton", slug: "cotton", image: "", palette: ["#166b6d", "#eccb52"] },
  { name: "Banarasi", slug: "banarasi", image: "", palette: ["#961a43", "#e3b52f"] },
  { name: "Kanjivaram", slug: "kanjivaram", image: "", palette: ["#5e1430", "#c99a28"] },
  { name: "Pochampally", slug: "pochampally", image: "", palette: ["#175557", "#d13c6b"] },
  { name: "Gadwal", slug: "gadwal", image: "", palette: ["#b82453", "#e3b52f"] },
  { name: "Linen", slug: "linen", image: "", palette: ["#7c6752", "#d6c7b4"] },
  { name: "Organza", slug: "organza", image: "", palette: ["#d13c6b", "#eccb52"] },
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
