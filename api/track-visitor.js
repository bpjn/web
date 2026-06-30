// api/track-visitor.js
// POST /api/track-visitor — record a page visit timestamp.
// No auth required (public endpoint).

import { supabase, json, err } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    await supabase('POST', 'visitors', '', { visited_at: new Date().toISOString() }, {
      Prefer: 'return=minimal',
    });
    return json(res, { ok: true });
  } catch (e) {
    return err(res, e.message, 500);
  }
}
