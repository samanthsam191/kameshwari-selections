"use client";

import React from "react";
import { Reorder, AnimatePresence, motion } from "framer-motion";
import { UploadCloud, X, Star, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadImg { id: string; url: string; name: string; size: number; file: File }

function kb(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Controlled, reorderable image uploader. Previews via object URLs in-session.
 * When the backend is wired, add() will PUT each file to Cloudflare R2 /
 * Cloudinary and store the returned CDN URL instead of the object URL.
 */
export function ImageUploader({
  images,
  onChange,
  max = 10,
}: {
  images: UploadImg[];
  onChange: (next: UploadImg[]) => void;
  max?: number;
}) {
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const add = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(f), name: f.name, size: f.size, file: f }));
    onChange([...images, ...next].slice(0, max));
  };

  const remove = (id: string) => onChange(images.filter((i) => i.id !== id));

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-7 text-center transition-colors",
          drag ? "border-[var(--accent)] bg-[var(--color-brand-50)]" : "border-[var(--border)] hover:border-[var(--color-ink-300)] hover:bg-[var(--muted)]/40"
        )}
      >
        <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-brand-50)] text-[var(--accent)]">
          <UploadCloud className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-medium">Drop saree photos, or <span className="text-[var(--color-sysblue)]">browse</span></p>
        <p className="mt-1 text-xs text-[var(--muted-foreground)]">PNG, JPG or WebP · up to {max} · drag to reorder · first is the cover</p>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
      </div>

      {images.length > 0 && (
        <Reorder.Group axis="x" values={images} onReorder={onChange} className="mt-3 flex flex-wrap gap-2">
          <AnimatePresence>
            {images.map((img, i) => (
              <Reorder.Item
                key={img.id}
                value={img}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileDrag={{ scale: 1.06, zIndex: 10 }}
                className="group relative h-24 w-24 cursor-grab overflow-hidden rounded-xl border border-[var(--border)] active:cursor-grabbing"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.name} className="pointer-events-none h-full w-full object-cover" />

                {i === 0 ? (
                  <span className="absolute left-1 top-1 inline-flex items-center gap-0.5 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
                    <Star className="h-2.5 w-2.5 fill-current" /> Cover
                  </span>
                ) : (
                  <span className="absolute left-1 top-1 grid h-5 w-5 place-items-center rounded-md bg-black/45 text-white opacity-0 transition group-hover:opacity-100">
                    <GripVertical className="h-3 w-3" />
                  </span>
                )}

                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); remove(img.id); }}
                  className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/55 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>

                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/60 to-transparent px-1.5 pb-1 pt-3 text-[9px] text-white/90">
                  {kb(img.size)}
                </span>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}
      {images.length > 0 && (
        <p className="mt-2 text-xs text-[var(--muted-foreground)]">{images.length} of {max} · drag thumbnails to set the cover</p>
      )}
    </div>
  );
}
