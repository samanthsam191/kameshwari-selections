# Make it dynamic — Supabase setup (≈10 min)

This turns the demo into a real app: products live in a database, images upload
to real storage, and the admin is protected by login. **One free account covers
database + storage + auth.**

> Until you do this, everything still works on **demo/mock data** (no login, uploads
> are in-memory). Nothing breaks without it.

---

## 1. Create the project
1. Go to **https://supabase.com** → sign in → **New project**.
2. Name it `kameshwari`, pick a region near India (e.g. Mumbai), set a DB password.
3. Wait ~2 min for it to provision.

## 2. Create the tables, storage bucket & seed data
1. Left sidebar → **SQL Editor** → **New query**.
2. Open **`supabase/schema.sql`** from this repo, copy everything, paste, click **Run**.
3. You should see the `products` table (Table Editor) and a `product-images` bucket (Storage).

## 3. Create your admin login
1. Left sidebar → **Authentication → Users → Add user → Create new user**.
2. Enter your email + a password. (Tick "Auto Confirm User".)
3. That's the login you'll use for the admin dashboard.

## 4. Get your keys
1. Left sidebar → **Project Settings → API**.
2. Copy **Project URL** and the **anon public** key.

## 5. Add the keys (two places)

**Locally** — create `apps/web/.env.local` **and** `apps/admin/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

**On Vercel** — in **both** projects (storefront + admin) → **Settings → Environment
Variables**, add the same two variables, then **Redeploy** (env vars are baked in at
build time, so a redeploy is required after adding them).

## 6. Test the loop
1. Open the **admin** → you'll now get a **login screen** → sign in with your user.
2. **Products → New product** → drag in real photos → **Save**.
   - Images upload to Supabase Storage; the product is saved to Postgres.
3. Open the **storefront** → the new product appears under **New Arrivals**. 🎉

---

## Notes
- The `anon` key is **safe to expose** — row-level security (in `schema.sql`) only
  allows the public to *read* products; *writing* requires being logged in.
- Images go to the public `product-images` bucket and are served over Supabase's CDN.
- Want Cloudflare R2 instead for images later? Easy swap — only the upload function
  changes. Supabase Storage is plenty to start.
