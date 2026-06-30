-- Hapus data galeri lama yang image_url-nya salah
-- (foto di storage tetap ada, cuma record database yang dihapus)
delete from gallery where image_url is not null;

-- Kalau mau hapus juga berita dan layanan yang punya image_url salah:
-- update news set image_url = null where image_url is not null;
-- update services set image_url = null where image_url is not null;
