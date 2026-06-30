// api/delete-data.js
// POST /api/delete-data — delete a row from a protected table.
// Requires a valid admin token in the request body.

import { supabase, verifyToken, json, err } from '../lib/supabase.js';

const ALLOWED = ['news', 'gallery', 'services'];

export default async function handler(req, res) {
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
}
