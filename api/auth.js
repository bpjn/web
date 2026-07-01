import { SESSION_SECRET, json, err } from '../lib/supabase.js';
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass) return err(res, 'Server belum dikonfigurasi (env vars missing).', 500);
  const { username, password } = req.body ?? {};
  if (username === validUser && password === validPass) {
    const token = Buffer.from(`${username}:${Date.now()}:${SESSION_SECRET}`).toString('base64');
    return json(res, { ok: true, token });
  }
  return err(res, 'Username atau password salah.', 401);
}
