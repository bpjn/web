// lib/supabase.js — shared helpers for Vercel API routes

export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
export const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret';

/**
 * Verify a simple base64 session token created by /api/auth.
 * Returns true if the token is valid and not expired (24 h).
 */
export function verifyToken(token) {
  if (!token) return false;
  try {
    const [user, ts, secret] = Buffer.from(token, 'base64').toString('utf8').split(':');
    if (!user || !ts || secret !== SESSION_SECRET) return false;
    if (Date.now() - parseInt(ts, 10) > 24 * 60 * 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Thin wrapper around the Supabase REST API.
 * method  – HTTP verb
 * table   – table name
 * query   – query-string suffix, e.g. "?id=eq.5"
 * body    – object to send as JSON (optional)
 * extra   – additional headers (optional)
 */
export async function supabase(method, table, query = '', body = null, extra = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    method,
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      ...extra,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  // DELETE returns 204 with no body
  if (res.status === 204) return null;
  return res.json();
}

/** Standard JSON response helper */
export function json(res, data, status = 200) {
  res.status(status).json(data);
}

/** Standard error response helper */
export function err(res, msg, status = 400) {
  res.status(status).json({ error: msg });
}
