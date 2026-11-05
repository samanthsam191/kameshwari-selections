# Deployment Guide — Kameshwari Selections

This is a **Turborepo monorepo** with two independent Next.js apps:

| App | Folder | Local port | Who it's for |
|-----|--------|-----------|--------------|
| Storefront | `apps/web` | 3000 | Public shoppers |
| Admin / CRM | `apps/admin` | 3001 | You (internal) |

Each app deploys as its **own Vercel project** pointing at the same repo, with a
different **Root Directory**. Vercel auto-detects the Turborepo and installs from
the repo root — you don't need any extra config.

---

## Does merging to `main` auto-deploy?

- **Before you connect Vercel:** No. Merging to `main` only runs the CI pipeline
  (`.github/workflows/ci.yml` — build + type-check). It does **not** publish a site.
- **After you connect Vercel (below):** Yes. With the Production Branch set to
  `main`, every push/merge to `main` deploys to production automatically, and every
  pull request gets its own **preview URL**.
- **Cost:** The Vercel **Hobby (free)** tier covers this. No payment required to start.

---

## One-time setup (do this twice — once per app)

1. Go to **https://vercel.com** → sign in **with GitHub**.
2. **Add New… → Project** → import **`samanthsam191/kameshwari-selections`**.
3. **Storefront project:**
   - **Root Directory:** click *Edit* → select **`apps/web`**.
   - Framework Preset: **Next.js** (auto-detected).
   - Build/Install commands: leave default (Vercel uses Turborepo automatically).
   - Deploy. You'll get a URL like `kameshwari-selections.vercel.app`.
4. **Admin project:** repeat *Add New… → Project* → same repo, but
   - **Root Directory:** **`apps/admin`**.
   - Deploy. You'll get e.g. `kameshwari-admin.vercel.app`.
   - ⚠️ **Protect it** — see security note below.
5. (Optional) Add a custom domain per project under **Settings → Domains**.

That's it. From now on, merges to `main` redeploy both automatically.

---

## ⚠️ Security — the admin is not yet locked

The admin currently has **no login gate** (it's on mock data). Do **not** leave
`apps/admin` publicly reachable with real data. Options:

- **Now (demo):** enable Vercel **Password Protection** on the admin project
  (Settings → Deployment Protection), or just run it locally (`npm run dev:admin`).
- **Soon (real):** add **Supabase Auth** as the admin login — then it's safe to
  expose. (Ask and I'll wire it.)

---

## Environment variables (add later, when backend is wired)

Set these per Vercel project under **Settings → Environment Variables**:

| Variable | App | Example |
|----------|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | web | `https://kameshwariselections.com` |
| `NEXT_PUBLIC_API_URL` | web | `https://…/v1` |
| `NEXT_PUBLIC_SUPABASE_URL` | both | from Supabase project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | both | from Supabase project |
| `R2_*` / `CLOUDINARY_*` | admin | from your image store |

---

## Run locally

```bash
npm install
npm run dev        # both apps (web :3000, admin :3001)
# or individually:
npm run dev:web
npm run dev:admin
```
