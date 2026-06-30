# Website Perusahaan — Vercel Edition

Website ini telah dikonversi dari **Netlify** ke **Vercel**.

---

## Struktur Proyek

```
vercel-website/
├── api/                        # Vercel Serverless Functions (Node.js ESM)
│   ├── auth.js                 # POST /api/auth — login admin
│   ├── get-data.js             # GET  /api/get-data?table=… — ambil data publik
│   ├── save-data.js            # POST /api/save-data — tambah data (perlu token)
│   ├── update-data.js          # POST /api/update-data — edit data (perlu token)
│   ├── delete-data.js          # POST /api/delete-data — hapus data (perlu token)
│   ├── upsert-settings.js      # POST /api/upsert-settings — simpan pengaturan
│   ├── send-pesan.js           # POST /api/send-pesan — terima pesan pengunjung
│   ├── upload-image.js         # POST /api/upload-image — upload ke Cloudinary
│   └── track-visitor.js        # POST /api/track-visitor — catat kunjungan
├── lib/
│   └── supabase.js             # Helper bersama (fetch wrapper, token verifier)
├── public/
│   ├── index.html              # Halaman utama
│   └── admin.html              # Panel admin
├── supabase_setup.sql          # SQL: buat tabel di Supabase
├── supabase_update.sql         # SQL: migrasi/update tabel
├── fix_image_url.sql           # SQL: perbaikan kolom image_url
├── vercel.json                 # Konfigurasi Vercel
└── package.json
```

---

## Cara Deploy ke Vercel

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login & Init
```bash
vercel login
cd vercel-website
vercel
```

### 3. Set Environment Variables

Di dashboard Vercel → **Settings → Environment Variables**, tambahkan:

| Nama                      | Keterangan                              |
|---------------------------|-----------------------------------------|
| `SUPABASE_URL`            | URL project Supabase kamu               |
| `SUPABASE_SERVICE_KEY`    | Service role key Supabase               |
| `ADMIN_USERNAME`          | Username login admin                    |
| `ADMIN_PASSWORD`          | Password login admin                    |
| `SESSION_SECRET`          | String acak panjang untuk signing token |
| `CLOUDINARY_CLOUD_NAME`   | Cloud name Cloudinary                   |
| `CLOUDINARY_UPLOAD_PRESET`| Upload preset Cloudinary (unsigned)     |

> **Tips:** Bisa juga pakai file `.env.local` saat development lokal.

### 4. Setup Database Supabase

Jalankan SQL berikut di Supabase SQL Editor (berurutan):
1. `supabase_setup.sql`
2. `supabase_update.sql` (jika perlu migrasi)
3. `fix_image_url.sql` (jika perlu fix kolom)

### 5. Deploy Production
```bash
vercel --prod
```

---

## Perbedaan dari Versi Netlify

| Netlify                              | Vercel                          |
|--------------------------------------|---------------------------------|
| `netlify/functions/*.js`             | `api/*.js`                      |
| `exports.handler = async (event) =>` | `export default async function handler(req, res)` |
| `netlify.toml`                       | `vercel.json`                   |
| `/.netlify/functions/<name>`         | `/api/<name>`                   |
| CommonJS (`require`)                 | ESM (`import/export`)           |

Semua logika bisnis dan database **tidak berubah** — hanya adapter serverless-nya saja yang disesuaikan.
