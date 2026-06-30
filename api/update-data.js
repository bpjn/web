// api/update-data.js
// POST /api/update-data — patch an existing row in a protected table.
// Requires a valid admin token in the request body.
// Settings rows are identified by `key`; all other tables use `id`.

import { supabase, verifyToken, json, err } from '../lib/supabase.js';

const ALLOWED = ['news', 'gallery', 'services', 'settings'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { token, table, id, key, data } = req.body ?? {};

  if (!verifyToken(token)) return err(res, 'Tidak terautentikasi.', 401);
  if (!table || !ALLOWED.includes(table)) return err(res, 'Table tidak valid.');

  const filter = table === 'settings' ? `?key=eq.${key}` : `?id=eq.${id}`;

  try {
    const result = await supabase('PATCH', table, filter, data, { Prefer: 'return=representation' });
    return json(res, result);
  } catch (e) {
    return err(res, e.message, 500);
  }
}
