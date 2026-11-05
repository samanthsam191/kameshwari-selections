-- ============================================================
-- Kameshwari Selections — Supabase schema
-- Run this in your Supabase project: SQL Editor → New query → paste → Run.
-- Safe to re-run (idempotent).
-- ============================================================

-- ---------- Products table ----------
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  slug          text not null,
  description   text default '',
  category      text default '',
  fabric        text default '',
  occasions     text[] default '{}',
  price         integer not null default 0,     -- current selling price (₹)
  mrp           integer not null default 0,     -- original price (₹)
  images        text[] default '{}',            -- public CDN URLs
  colors        jsonb  default '[]'::jsonb,      -- [{ name, hex }]
  palette       text[] default '{#961a43,#c99a28}',
  is_new        boolean default true,
  rating        numeric default 4.6,
  review_count  integer default 0,
  stock         integer default 0,
  sku           text default '',
  sold          integer default 0,
  status        text default 'active'           -- active | draft | out_of_stock
);

create index if not exists products_created_at_idx on public.products (created_at desc);
create unique index if not exists products_slug_key on public.products (slug);

-- ---------- Row Level Security ----------
alter table public.products enable row level security;

-- Everyone (even logged-out shoppers) can READ products.
drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products
  for select using (true);

-- Only logged-in admins can WRITE products.
drop policy if exists "products auth write" on public.products;
create policy "products auth write" on public.products
  for all to authenticated using (true) with check (true);

-- ---------- Storage bucket for images ----------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Public can read images; authenticated admins can upload/modify.
drop policy if exists "product images public read" on storage.objects;
create policy "product images public read" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "product images auth write" on storage.objects;
create policy "product images auth write" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

drop policy if exists "product images auth update" on storage.objects;
create policy "product images auth update" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');

-- ---------- Seed data (so the shop isn't empty before you add products) ----------
insert into public.products (name, slug, description, category, fabric, occasions, price, mrp, colors, palette, is_new, rating, review_count, stock, sku, sold, status)
values
('Royal Kanjivaram Silk Saree','royal-kanjivaram-silk-saree','Handwoven pure Kanjivaram silk with temple border and rich pallu.','kanjivaram','Pure Silk','{Wedding,Festive}',12999,18999,'[{"name":"Maroon","hex":"#800020"},{"name":"Royal Blue","hex":"#002366"}]','{#7a1739,#c99a28}',true,4.8,124,15,'KS-KAN-001',124,'active'),
('Banarasi Silk Wedding Saree','banarasi-silk-wedding-saree','Exquisite Banarasi silk with intricate zari work and heavy pallu.','banarasi','Banarasi Silk','{Wedding,Reception}',22999,22999,'[{"name":"Red","hex":"#DC143C"},{"name":"Gold","hex":"#DAA520"}]','{#961a43,#e3b52f}',false,4.9,256,8,'KS-BAN-002',256,'active'),
('Pochampally Ikat Cotton Saree','pochampally-ikat-cotton-saree','Authentic double-ikat Pochampally weave from Telangana. Light and comfortable.','pochampally','Cotton','{Casual,Office}',2799,4999,'[{"name":"Indigo","hex":"#3F51B5"},{"name":"Teal","hex":"#009688"}]','{#175557,#d13c6b}',true,4.6,89,32,'KS-POC-003',89,'active'),
('Gadwal Pattu Silk Saree','gadwal-pattu-silk-saree','Traditional Gadwal saree with cotton body and silk kuttu border. GI-tagged.','gadwal','Pure Silk','{Puja,Festive}',5499,8999,'[{"name":"Magenta","hex":"#FF00FF"},{"name":"Bottle Green","hex":"#006A4E"}]','{#b82453,#e3b52f}',true,4.7,67,18,'KS-GAD-004',67,'active'),
('Soft Linen Casual Saree','soft-linen-casual-saree','Premium breathable linen with minimal zari border. Perfect for summer.','linen','Linen','{Casual,Office}',1999,3499,'[{"name":"Beige","hex":"#F5F5DC"},{"name":"Sage","hex":"#9CAF88"}]','{#7c6752,#d6c7b4}',true,4.5,201,0,'KS-LIN-005',201,'out_of_stock'),
('Designer Organza Saree','designer-organza-saree','Lightweight organza with hand-embroidered floral motifs.','organza','Organza','{Party,Reception}',6999,10999,'[{"name":"Lavender","hex":"#E6E6FA"},{"name":"Peach","hex":"#FFDAB9"}]','{#d13c6b,#eccb52}',true,4.4,43,12,'KS-ORG-006',43,'active')
on conflict (slug) do nothing;
