"use client";

import React from "react";
import { UploadCloud, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Img { id: string; url: string; name: string }

/**
 * Demo image uploader. Previews locally via object URLs. When the backend is
 * wired, onDrop will PUT files to Cloudflare R2 / Cloudinary and store the
 * returned CDN URLs on the product.
 */
export function ImageUploader() {
  const [imgs, setImgs] = React.useState<Img[]>([]);
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const add = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(f), name: f.name }));
    setImgs((p) => [...p, ...next]);
  };

  const remove = (id: string) => setImgs((p) => p.filter((i) => i.id !== id));

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          drag ? "border-[var(--accent)] bg-[var(--color-brand-50)]" : "border-[var(--border)] hover:border-[var(--color-ink-300)] hover:bg-[var(--muted)]/40"
        )}
      >
        <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-brand-50)] text-[var(--accent)]">
          <UploadCloud className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-medium">Drop saree photos, or <span className="text-[var(--color-sysblue)]">browse</span></p>
        <p className="mt-1 text-xs text-[var(--muted-foreground)]">PNG, JPG or WebP · up to 10 images · first image is the cover</p>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => add(e.target.files)} />
      </div>

      {imgs.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {imgs.map((img, i) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 inline-flex items-center gap-0.5 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  <Star className="h-2.5 w-2.5 fill-current" /> Cover
                </span>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); remove(img.id); }}
                className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/55 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
