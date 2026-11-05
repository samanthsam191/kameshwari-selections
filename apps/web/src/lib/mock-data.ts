export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  fabric: string;
  occasions: string[];
  basePrice: number;
  salePrice: number | null;
  mrp: number;
  images: string[];
  colors: { name: string; hex: string }[];
  isNew: boolean;
  rating: number;
  reviewCount: number;
  stock: number;
}

// Real saree / Indian-textile photos from Pexels & Unsplash (free license).
// If a host is unreachable the UI falls back to a generated silk-weave via
// <SmartImage>, so the layout always looks finished. Swap for CDN URLs later.
const IMAGES = {
  // Indian artisan weaving colorful fabric (Pexels, free)
  artisan1: "https://images.pexels.com/photos/9209327/pexels-photo-9209327.jpeg?auto=compress&w=800&h=1000&fit=crop",
  // Indian man on traditional handloom (Pexels, free)
  handloom1: "https://images.pexels.com/photos/14953193/pexels-photo-14953193.jpeg?auto=compress&w=800&h=1000&fit=crop",
  // Elderly man weaving silk, Varanasi (Pexels, free)
  varanasi: "https://images.pexels.com/photos/17777833/pexels-photo-17777833.jpeg?auto=compress&w=800&h=1000&fit=crop",
  // Indian weaver crafting traditional textiles (Pexels, free)
  artisan2: "https://images.pexels.com/photos/32673642/pexels-photo-32673642.jpeg?auto=compress&w=800&h=1000&fit=crop",
  // Traditional Indian woman weaving on loom (Pexels, free)
  womanWeaving: "https://images.pexels.com/photos/8207648/pexels-photo-8207648.jpeg?auto=compress&w=800&h=1000&fit=crop",
  // Person weaving on loom (Pexels, free)
  loomWeave: "https://images.pexels.com/photos/17649814/pexels-photo-17649814.jpeg?auto=compress&w=800&h=1000&fit=crop",
  // Traditional handloom weaving in Bangladesh (Pexels, free)
  handloom2: "https://images.pexels.com/photos/35195886/pexels-photo-35195886.jpeg?auto=compress&w=800&h=1000&fit=crop",
  // Woman in red saree with gold jewelry (Unsplash, free)
  redSaree: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=70",
};

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Royal Kanjivaram Silk Saree",
    slug: "royal-kanjivaram-silk-saree",
    description: "Handwoven pure Kanjivaram silk saree with traditional temple border and rich pallu. Perfect for weddings and festive occasions.",
    category: "kanjivaram",
    fabric: "Pure Silk",
    occasions: ["Wedding", "Festive"],
    basePrice: 15999,
    salePrice: 12999,
    mrp: 18999,
    images: [IMAGES.artisan1, IMAGES.handloom1, IMAGES.varanasi],
    colors: [
      { name: "Maroon", hex: "#800020" },
      { name: "Royal Blue", hex: "#002366" },
      { name: "Emerald Green", hex: "#046307" },
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
  },
  {
    id: "p2",
    name: "Banarasi Silk Wedding Saree",
    slug: "banarasi-silk-wedding-saree",
    description: "Exquisite Banarasi silk saree with intricate zari work. Features traditional motifs and heavy pallu.",
    category: "banarasi",
    fabric: "Banarasi Silk",
    occasions: ["Wedding", "Reception"],
    basePrice: 22999,
    salePrice: null,
    mrp: 22999,
    images: [IMAGES.varanasi, IMAGES.artisan2],
    colors: [
      { name: "Red", hex: "#DC143C" },
      { name: "Gold", hex: "#DAA520" },
    ],
    isNew: false,
    rating: 4.9,
    reviewCount: 256,
    stock: 8,
  },
  {
    id: "p3",
    name: "Pochampally Ikat Cotton Saree",
    slug: "pochampally-ikat-cotton-saree",
    description: "Authentic Pochampally Ikat saree from Telangana. Double ikat weave with geometric patterns. Light and comfortable for daily wear.",
    category: "pochampally",
    fabric: "Cotton",
    occasions: ["Casual", "Office"],
    basePrice: 3499,
    salePrice: 2799,
    mrp: 4999,
    images: [IMAGES.handloom2, IMAGES.artisan1],
    colors: [
      { name: "Indigo Blue", hex: "#3F51B5" },
      { name: "Rust Orange", hex: "#BF360C" },
      { name: "Teal", hex: "#009688" },
    ],
    isNew: true,
    rating: 4.6,
    reviewCount: 89,
    stock: 32,
  },
  {
    id: "p4",
    name: "Gadwal Pattu Silk Saree",
    slug: "gadwal-pattu-silk-saree",
    description: "Traditional Gadwal saree with cotton body and silk border (kuttu border). GI-tagged Telangana heritage weave.",
    category: "gadwal",
    fabric: "Pure Silk",
    occasions: ["Puja", "Festive"],
    basePrice: 6999,
    salePrice: 5499,
    mrp: 8999,
    images: [IMAGES.womanWeaving, IMAGES.loomWeave],
    colors: [
      { name: "Magenta", hex: "#FF00FF" },
      { name: "Bottle Green", hex: "#006A4E" },
    ],
    isNew: false,
    rating: 4.7,
    reviewCount: 67,
    stock: 18,
  },
  {
    id: "p5",
    name: "Soft Linen Casual Saree",
    slug: "soft-linen-casual-saree",
    description: "Premium quality linen saree with minimal zari border. Breathable and perfect for summer. Comes with running blouse piece.",
    category: "linen",
    fabric: "Linen",
    occasions: ["Casual", "Office"],
    basePrice: 2499,
    salePrice: 1999,
    mrp: 3499,
    images: [IMAGES.loomWeave, IMAGES.artisan2],
    colors: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Sage Green", hex: "#9CAF88" },
      { name: "Dusty Pink", hex: "#DCAE96" },
      { name: "Sky Blue", hex: "#87CEEB" },
    ],
    isNew: true,
    rating: 4.5,
    reviewCount: 201,
    stock: 50,
  },
  {
    id: "p6",
    name: "Designer Organza Saree",
    slug: "designer-organza-saree",
    description: "Lightweight organza saree with hand-embroidered floral motifs. Sheer elegance for parties and receptions.",
    category: "organza",
    fabric: "Organza",
    occasions: ["Party", "Reception"],
    basePrice: 8999,
    salePrice: 6999,
    mrp: 10999,
    images: [IMAGES.artisan2, IMAGES.varanasi],
    colors: [
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Peach", hex: "#FFDAB9" },
    ],
    isNew: true,
    rating: 4.4,
    reviewCount: 43,
    stock: 12,
  },
  {
    id: "p7",
    name: "Handloom Cotton Khadi Saree",
    slug: "handloom-cotton-khadi-saree",
    description: "Pure handloom khadi cotton saree. Eco-friendly, handspun fabric with natural dyes. Supporting local artisans.",
    category: "cotton",
    fabric: "Cotton",
    occasions: ["Casual", "Puja", "Office"],
    basePrice: 1899,
    salePrice: null,
    mrp: 1899,
    images: [IMAGES.handloom1, IMAGES.handloom2],
    colors: [
      { name: "Off White", hex: "#FAF0E6" },
      { name: "Earthy Brown", hex: "#8B4513" },
    ],
    isNew: false,
    rating: 4.3,
    reviewCount: 156,
    stock: 40,
  },
  {
    id: "p8",
    name: "Bridal Red Kanjivaram Saree",
    slug: "bridal-red-kanjivaram-saree",
    description: "Bridal special pure zari Kanjivaram silk. Heavy pallu with peacock motifs. 1100 grams pure silk with certificate.",
    category: "kanjivaram",
    fabric: "Pure Silk",
    occasions: ["Wedding"],
    basePrice: 35999,
    salePrice: 29999,
    mrp: 42999,
    images: [IMAGES.redSaree, IMAGES.artisan1],
    colors: [
      { name: "Bridal Red", hex: "#CC0000" },
    ],
    isNew: false,
    rating: 5.0,
    reviewCount: 78,
    stock: 5,
  },
];

export const mockCollections = [
  {
    id: "c1",
    name: "Wedding Season",
    slug: "wedding",
    description: "Bridal and wedding guest sarees for the perfect celebration",
    image: IMAGES.redSaree,
    productCount: 24,
  },
  {
    id: "c2",
    name: "Under ₹2,000",
    slug: "under-2000",
    description: "Beautiful sarees that don't break the bank",
    image: IMAGES.loomWeave,
    productCount: 18,
  },
  {
    id: "c3",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Our most loved sarees chosen by customers like you",
    image: IMAGES.varanasi,
    productCount: 12,
  },
  {
    id: "c4",
    name: "Telangana Heritage",
    slug: "telangana-heritage",
    description: "Pochampally, Gadwal, and Narayanpet — GI-tagged weaves from Telangana",
    image: IMAGES.handloom2,
    productCount: 15,
  },
];

export const mockTestimonials = [
  {
    name: "Priya Reddy",
    location: "Hyderabad",
    text: "The virtual try-on feature helped me pick the perfect saree for my sister's wedding. The color matched exactly what I saw online!",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    location: "Warangal",
    text: "Authentic Pochampally sarees at great prices. The quality is outstanding and delivery was quick.",
    rating: 5,
  },
  {
    name: "Sneha Kumar",
    location: "Bangalore",
    text: "I love the AI stylist! It recommended the perfect saree for my skin tone. Will definitely order again.",
    rating: 4,
  },
];
