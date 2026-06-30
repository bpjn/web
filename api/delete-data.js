const { supabase, verifyToken, json, err } = require('../lib/supabase');

const ALLOWED = ['news', 'gallery', 'services', 'pesan'];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { token, table, id } = req.body ?? {};

  if (!verifyToken(token)) return err(res, 'Tidak terautentikasi.', 401);
  if (!table || !ALLOWED.includes(table)) return err(res, 'Table tidak valid.');
  if (!id) return err(res, 'ID diperlukan.');

  try {
    await supabase('DELETE', table, `?id=eq.${id}`);
    return json(res, { ok: true });
  } catch (e) {
    return err(res, e.message, 500);
  }
};
