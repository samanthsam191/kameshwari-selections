import { getSupabase, isSupabaseConfigured } from "./supabase";
import { products as mockProducts, type AdminProduct } from "./mock-data";

export { isSupabaseConfigured };

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "") || `product-${Date.now()}`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRow(r: any): AdminProduct {
  return {
    id: r.id,
    name: r.name,
    sku: r.sku || "",
    category: r.category || "",
    fabric: r.fabric || "",
    price: r.price ?? 0,
    mrp: r.mrp ?? r.price ?? 0,
    stock: r.stock ?? 0,
    status: (r.status as AdminProduct["status"]) || "active",
    image: Array.isArray(r.images) && r.images[0] ? r.images[0] : "",
    palette: Array.isArray(r.palette) && r.palette.length ? r.palette : ["#961a43", "#c99a28"],
    sold: r.sold ?? 0,
  };
}

/** Products for the admin table. Falls back to mock data when unconfigured. */
export async function listProducts(): Promise<AdminProduct[]> {
  const sb = getSupabase();
  if (!sb) return mockProducts;
  const { data, error } = await sb.from("products").select("*").order("created_at", { ascending: false });
  if (error || !data) return mockProducts;
  return data.map(mapRow);
}

export interface NewProductInput {
  name: string;
  category: string;
  fabric: string;
  price: number;
  mrp: number;
  stock: number;
  sku: string;
  description: string;
}

/** Upload images to Storage, then insert the product row. Requires auth + config. */
export async function createProduct(input: NewProductInput, files: File[]): Promise<AdminProduct> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured");

  const urls: string[] = [];
  for (const file of files) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await sb.storage.from("product-images").upload(path, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (upErr) throw new Error(`Image upload failed: ${upErr.message}`);
    const { data: pub } = sb.storage.from("product-images").getPublicUrl(path);
    urls.push(pub.publicUrl);
  }

  const row = {
    name: input.name,
    slug: slugify(input.name),
    description: input.description,
    category: input.category || "Uncategorised",
    fabric: input.fabric || "",
    price: input.price,
    mrp: input.mrp || input.price,
    images: urls,
    colors: [],
    palette: ["#961a43", "#c99a28"],
    is_new: true,
    stock: input.stock,
    sku: input.sku || `KS-NEW-${Date.now().toString().slice(-5)}`,
    sold: 0,
    status: input.stock > 0 ? "active" : "out_of_stock",
  };

  const { data, error } = await sb.from("products").insert(row).select().single();
  if (error) throw new Error(`Save failed: ${error.message}`);
  return mapRow(data);
}
