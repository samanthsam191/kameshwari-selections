"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, Search, Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { SmartImage } from "@/components/ui/smart-image";
import { ImageUploader, type UploadImg } from "@/components/products/image-uploader";
import { products as seed, type AdminProduct } from "@/lib/mock-data";
import { listProducts, createProduct, isSupabaseConfigured } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const empty = { name: "", category: "", fabric: "", price: "", mrp: "", stock: "", sku: "", description: "" };

export default function ProductsPage() {
  const [items, setItems] = React.useState<AdminProduct[]>(seed);
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [form, setForm] = React.useState(empty);
  const [images, setImages] = React.useState<UploadImg[]>([]);
  const [flashId, setFlashId] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Load live products from Supabase (falls back to the seed when unconfigured).
  React.useEffect(() => {
    let active = true;
    listProducts().then((list) => { if (active && list.length) setItems(list); }).catch(() => {});
    return () => { active = false; };
  }, []);

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const rows = items.filter((p) => (p.name + p.sku + p.category).toLowerCase().includes(q.toLowerCase()));
  const canSave = Boolean(form.name.trim() && form.price.trim()) && !saving;

  const reset = () => { setForm(empty); setImages([]); setError(null); };

  const flash = (id: string) => { setFlashId(id); setTimeout(() => setFlashId(null), 2200); };

  const save = async () => {
    setError(null);
    const input = {
      name: form.name.trim(),
      category: form.category.trim(),
      fabric: form.fabric.trim(),
      price: parseInt(form.price || "0", 10),
      mrp: parseInt(form.mrp || form.price || "0", 10),
      stock: parseInt(form.stock || "0", 10),
      sku: form.sku.trim(),
      description: form.description.trim(),
    };

    if (isSupabaseConfigured) {
      setSaving(true);
      try {
        const product = await createProduct(input, images.map((i) => i.file));
        setItems((prev) => [product, ...prev]);
        flash(product.id);
        reset();
        setOpen(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setSaving(false);
      }
      return;
    }

    // Demo mode (no backend): keep it in-memory using the local preview URL.
    const id = crypto.randomUUID();
    setItems((prev) => [{
      id,
      name: input.name,
      sku: input.sku || `KS-NEW-${items.length + 1}`,
      category: input.category || "Uncategorised",
      fabric: input.fabric || "—",
      price: input.price,
      mrp: input.mrp,
      stock: input.stock,
      status: input.stock > 0 ? "active" : "out_of_stock",
      image: images[0]?.url || "",
      palette: ["#961a43", "#c99a28"],
      sold: 0,
    }, ...prev]);
    flash(id);
    reset();
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{items.length} products · {items.filter((p) => p.status === "out_of_stock").length} out of stock</p>
        </div>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--accent)] px-3.5 py-2 text-sm font-semibold text-white transition active:scale-95">
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm outline-none focus:border-[var(--ring)]" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--muted-foreground)]">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-3 py-3 font-medium">Category</th>
                <th className="px-3 py-3 font-medium">Price</th>
                <th className="px-3 py-3 font-medium">Stock</th>
                <th className="px-3 py-3 font-medium">Sold</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <motion.tr
                  key={p.id}
                  animate={flashId === p.id ? { backgroundColor: ["rgba(150,26,67,0.12)", "rgba(150,26,67,0)"] } : {}}
                  transition={{ duration: 2 }}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/40"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                        <SmartImage src={p.image} alt={p.name} palette={p.palette} />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{p.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[var(--muted-foreground)]">{p.category}</td>
                  <td className="px-3 py-3 tabular-nums">{formatPrice(p.price)}</td>
                  <td className="px-3 py-3 tabular-nums">
                    <span className={p.stock === 0 ? "text-[var(--color-sysred)]" : p.stock < 10 ? "text-[var(--color-sysorange)]" : ""}>{p.stock}</span>
                  </td>
                  <td className="px-3 py-3 tabular-nums text-[var(--muted-foreground)]">{p.sold}</td>
                  <td className="px-5 py-3"><StatusPill status={p.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New product slide-over */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setOpen(false); }} className="fixed inset-0 z-40 bg-black/30" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[var(--card)] shadow-pop"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                <h2 className="text-lg font-semibold">New product</h2>
                <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-[var(--muted)]"><X className="h-5 w-5" /></button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Images</label>
                  <ImageUploader images={images} onChange={setImages} />
                </div>
                <Field label="Product name"><input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="e.g. Royal Kanjivaram Silk Saree" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Category"><input value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="Kanjivaram" /></Field>
                  <Field label="Fabric"><input value={form.fabric} onChange={(e) => set("fabric", e.target.value)} className={inputCls} placeholder="Pure Silk" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price (₹)"><input value={form.price} onChange={(e) => set("price", e.target.value)} type="number" className={inputCls} placeholder="12999" /></Field>
                  <Field label="MRP (₹)"><input value={form.mrp} onChange={(e) => set("mrp", e.target.value)} type="number" className={inputCls} placeholder="18999" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Stock"><input value={form.stock} onChange={(e) => set("stock", e.target.value)} type="number" className={inputCls} placeholder="15" /></Field>
                  <Field label="SKU"><input value={form.sku} onChange={(e) => set("sku", e.target.value)} className={inputCls} placeholder="KS-KAN-010" /></Field>
                </div>
                <Field label="Description"><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputCls} placeholder="Handwoven pure silk…" /></Field>
              </div>

              <div className="border-t border-[var(--border)] p-4">
                {error && <p className="mb-2 rounded-lg bg-[var(--color-sysred)]/10 px-3 py-2 text-xs text-[var(--color-sysred)]">{error}</p>}
                {!isSupabaseConfigured && (
                  <p className="mb-2 text-[11px] text-[var(--muted-foreground)]">Demo mode — connect Supabase to persist products & upload images for real.</p>
                )}
                <div className="flex gap-2">
                  <button onClick={() => setOpen(false)} disabled={saving} className="flex-1 rounded-[10px] border border-[var(--border)] py-2.5 text-sm font-semibold hover:bg-[var(--muted)] disabled:opacity-50">Cancel</button>
                  <button
                    onClick={save}
                    disabled={!canSave}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-[10px] bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
                  >
                    {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : <><Check className="h-4 w-4" /> Save product</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = "w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm outline-none focus:border-[var(--ring)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
