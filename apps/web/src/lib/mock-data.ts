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

// Placeholder image URLs (Unsplash-style)
const IMG = (id: number) => `https://images.unsplash.com/photo-${id}?w=600&h=800&fit=crop`;

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
    images: [IMG(1583391733956), IMG(1610030469983), IMG(1594736797933)],
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
    images: [IMG(1595777457583), IMG(1610030469983)],
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
    images: [IMG(1583391733956), IMG(1594736797933)],
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
    images: [IMG(1610030469983), IMG(1583391733956)],
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
    images: [IMG(1594736797933), IMG(1595777457583)],
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
    images: [IMG(1583391733956), IMG(1610030469983)],
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
    images: [IMG(1594736797933), IMG(1583391733956)],
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
    images: [IMG(1610030469983), IMG(1595777457583)],
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
    image: IMG(1583391733956),
    productCount: 24,
  },
  {
    id: "c2",
    name: "Under ₹2,000",
    slug: "under-2000",
    description: "Beautiful sarees that don't break the bank",
    image: IMG(1594736797933),
    productCount: 18,
  },
  {
    id: "c3",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Our most loved sarees chosen by customers like you",
    image: IMG(1595777457583),
    productCount: 12,
  },
  {
    id: "c4",
    name: "Telangana Heritage",
    slug: "telangana-heritage",
    description: "Pochampally, Gadwal, and Narayanpet — GI-tagged weaves from Telangana",
    image: IMG(1610030469983),
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
