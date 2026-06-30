// api/upsert-settings.js
// POST /api/upsert-settings — update a settings key, inserting it if it doesn't exist yet.
// Requires a valid admin token in the request body.

import { supabase, verifyToken, json, err } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { token, key, value } = req.body ?? {};

  if (!verifyToken(token)) return err(res, 'Tidak terautentikasi.', 401);
  if (!key) return err(res, 'Key tidak boleh kosong.');

  try {
    // Try to update first
    const updated = await supabase(
      'PATCH',
      'settings',
      `?key=eq.${encodeURIComponent(key)}`,
      { value },
      { Prefer: 'return=representation' },
    );

    // If no row was matched, insert a new one
    if (!Array.isArray(updated) || updated.length === 0) {
      await supabase('POST', 'settings', '', { key, value }, { Prefer: 'return=minimal' });
    }

    return json(res, { ok: true });
  } catch (e) {
    return err(res, e.message, 500);
  }
}
