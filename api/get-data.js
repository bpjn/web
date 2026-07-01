import { supabase, json, err } from '../lib/supabase.js';
const ALLOWED = ['news', 'gallery', 'services', 'settings', 'visitors', 'pesan'];
const ORDER = { settings: 'key', visitors: 'visited_at.desc' };
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');
  const { table } = req.query;
  if (!table || !ALLOWED.includes(table)) return err(res, 'Table tidak valid.');
  try {
    const order = ORDER[table] ?? 'created_at.desc';
    const data = await supabase('GET', table, `?order=${order}`);
    return json(res, data);
  } catch (e) { return err(res, e.message, 500); }
}
