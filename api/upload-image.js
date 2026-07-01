import { verifyToken, json, err } from '../lib/supabase.js';
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dcs4qrebw';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'gallery';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  const { token, filename, filedata, mimetype } = req.body ?? {};
  if (!verifyToken(token)) return err(res, 'Tidak terautentikasi.', 401);
  if (!filename || !filedata) return err(res, 'File tidak ditemukan.');
  try {
    const body = new URLSearchParams({ file: `data:${mimetype ?? 'image/jpeg'};base64,${filedata}`, upload_preset: UPLOAD_PRESET });
    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
    if (!uploadRes.ok) { const text = await uploadRes.text(); return err(res, text, 500); }
    const { secure_url: url } = await uploadRes.json();
    return json(res, { url });
  } catch (e) { return err(res, e.message, 500); }
}
