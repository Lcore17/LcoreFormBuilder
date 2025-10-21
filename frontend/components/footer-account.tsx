'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';

type Me = { user?: { id: string } };

export default function FooterAccountLinks() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include', headers });
        if (active) {
          if (res.ok) setMe(await res.json());
          setLoading(false);
        }
      } catch {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  if (loading) return null;

  if (!me?.user) {
    return (
      <ul className="space-y-3 text-sm">
        <li>
          <Link href="/login" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/register" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
            Sign Up
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="space-y-3 text-sm">
      <li>
        <Link href="/forms" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/forms/new" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
          Create Form
        </Link>
      </li>
    </ul>
  );
}
