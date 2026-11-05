"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { SmartImage } from "@/components/ui/smart-image";
import { ImageUploader } from "@/components/products/image-uploader";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function ProductsPage() {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const rows = products.filter((p) => (p.name + p.sku + p.category).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{products.length} products · {products.filter((p) => p.status === "out_of_stock").length} out of stock</p>
        </div>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--accent)] px-3.5 py-2 text-sm font-semibold text-white transition active:scale-95">
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="h-10 w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm outline-none focus:border-[var(--ring)]"
        />
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
                <tr key={p.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/40">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New product slide-over */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/30" />
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
                  <ImageUploader />
                </div>
                <Field label="Product name"><input className={inputCls} placeholder="e.g. Royal Kanjivaram Silk Saree" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Category"><input className={inputCls} placeholder="Kanjivaram" /></Field>
                  <Field label="Fabric"><input className={inputCls} placeholder="Pure Silk" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price (₹)"><input type="number" className={inputCls} placeholder="12999" /></Field>
                  <Field label="MRP (₹)"><input type="number" className={inputCls} placeholder="18999" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Stock"><input type="number" className={inputCls} placeholder="15" /></Field>
                  <Field label="SKU"><input className={inputCls} placeholder="KS-KAN-010" /></Field>
                </div>
                <Field label="Description"><textarea rows={3} className={inputCls} placeholder="Handwoven pure silk…" /></Field>
              </div>

              <div className="flex gap-2 border-t border-[var(--border)] p-4">
                <button onClick={() => setOpen(false)} className="flex-1 rounded-[10px] border border-[var(--border)] py-2.5 text-sm font-semibold hover:bg-[var(--muted)]">Cancel</button>
                <button onClick={() => setOpen(false)} className="flex-1 rounded-[10px] bg-[var(--accent)] py-2.5 text-sm font-semibold text-white active:scale-[0.98]">Save product</button>
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
