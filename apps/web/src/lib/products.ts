import { getServerSupabase } from "./supabase";
import { mockProducts, type Product } from "./mock-data";

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRow(r: any): Product {
  const price = r.price ?? 0;
  const mrp = r.mrp ?? price;
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description || "",
    category: r.category || "",
    fabric: r.fabric || "",
    occasions: Array.isArray(r.occasions) ? r.occasions : [],
    basePrice: price,
    salePrice: price < mrp ? price : null,
    mrp,
    images: Array.isArray(r.images) ? r.images : [],
    colors: Array.isArray(r.colors) ? r.colors : [],
    isNew: Boolean(r.is_new),
    rating: Number(r.rating ?? 4.6),
    reviewCount: r.review_count ?? 0,
    stock: r.stock ?? 0,
  };
}

/**
 * Storefront product list. Reads live from Supabase when configured (and
 * non-empty); otherwise returns mock data so the shop is never blank.
 */
export async function getStorefrontProducts(): Promise<Product[]> {
  const sb = getServerSupabase();
  if (!sb) return mockProducts;
  try {
    const { data, error } = await sb.from("products").select("*").order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return mockProducts;
    return data.map(mapRow);
  } catch {
    return mockProducts;
  }
}
