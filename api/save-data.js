// api/save-data.js
// POST /api/save-data — insert a new row into a protected table.
// Requires a valid admin token in the request body.

import { supabase, verifyToken, json, err } from '../lib/supabase.js';

const ALLOWED = ['news', 'gallery', 'services', 'settings'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { token, table, data } = req.body ?? {};

  if (!verifyToken(token)) return err(res, 'Tidak terautentikasi.', 401);
  if (!table || !ALLOWED.includes(table)) return err(res, 'Table tidak valid.');

  try {
    const result = await supabase('POST', table, '', data, { Prefer: 'return=representation' });
    return json(res, result);
  } catch (e) {
    return err(res, e.message, 500);
  }
}
