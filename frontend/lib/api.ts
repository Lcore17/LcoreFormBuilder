// Normalize base API URL (avoid trailing slash issues)
const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const API_URL = RAW_API_URL.replace(/\/+$/, '');

function joinUrl(base: string, path: string) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_API_URL || /^http:\/\/localhost/.test(process.env.NEXT_PUBLIC_API_URL)) {
      console.warn('NEXT_PUBLIC_API_URL is not set to a public backend URL in production.');
    }
  }

  const url = joinUrl(API_URL, path);

  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
