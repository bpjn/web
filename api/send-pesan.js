import { supabase, json, err } from '../lib/supabase.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  const { nama, email, telp, subjek, isi } = req.body ?? {};
  if (!nama || !email || !isi) return err(res, 'Nama, email, dan isi pesan wajib diisi.');
  try {
    await supabase('POST', 'pesan', '', { nama, email, telp: telp ?? '', subjek: subjek ?? '', isi, status: 'baru', created_at: new Date().toISOString() }, { Prefer: 'return=minimal' });
    return json(res, { ok: true });
  } catch (e) { return err(res, e.message, 500); }
}
