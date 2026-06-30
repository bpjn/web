-- Jalankan di Supabase SQL Editor

-- Tambah kolom image_url ke semua tabel
alter table news add column if not exists image_url text;
alter table gallery add column if not exists image_url text;
alter table services add column if not exists image_url text;

-- Tabel pengaturan website (dikontrol penuh dari admin)
create table if not exists settings (
  key text primary key,
  value text,
  updated_at timestamp with time zone default now()
);

-- Data default pengaturan
insert into settings (key, value) values
  ('site_name', 'PT Nama Perusahaan'),
  ('site_tagline', 'Est. 2010'),
  ('hero_title', 'Solusi <em>Terbaik</em> untuk Bisnis Anda'),
  ('hero_desc', 'Kami hadir dengan layanan profesional dan berpengalaman untuk mendukung pertumbuhan bisnis Anda. Kepercayaan klien adalah prioritas utama kami.'),
  ('hero_tag', '🏢 Perusahaan Terpercaya'),
  ('stat_klien', '500+'),
  ('stat_proyek', '350+'),
  ('stat_tahun', '14'),
  ('about_title', 'Komitmen Kami untuk <em>Kualitas Terbaik</em>'),
  ('about_desc', 'Sejak berdiri, kami terus berkomitmen memberikan layanan terbaik dengan standar profesionalisme tinggi.'),
  ('about_tahun', '14+'),
  ('visi', 'Menjadi perusahaan terdepan yang dipercaya dalam memberikan solusi terbaik bagi klien di seluruh Indonesia.'),
  ('misi', 'Memberikan pelayanan prima, inovatif, dan efisien dengan mengutamakan kepuasan dan kepercayaan klien.'),
  ('nilai', 'Integritas, profesionalisme, inovasi, dan tanggung jawab menjadi fondasi setiap langkah kami.'),
  ('kontak_alamat', 'Jl. Contoh No. 123, Kota Anda, Indonesia'),
  ('kontak_telp', '+62 21 1234 5678'),
  ('kontak_email', 'info@namaperusahaan.co.id'),
  ('kontak_jam', 'Senin – Jumat, 08.00 – 17.00 WIB'),
  ('footer_desc', 'Perusahaan profesional yang berdedikasi memberikan layanan terbaik dan solusi inovatif untuk bisnis Anda.'),
  ('footer_copy', '© 2025 PT Nama Perusahaan. Seluruh hak cipta dilindungi.'),
  ('sosmed_facebook', '#'),
  ('sosmed_instagram', '#'),
  ('sosmed_linkedin', '#'),
  ('sosmed_youtube', '#')
on conflict (key) do nothing;

alter table settings disable row level security;
