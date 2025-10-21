'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';
import { LogOut, User2 } from 'lucide-react';

type Me = { user?: { id: string; name: string; email: string } };

export default function UserMenu() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (!token) {
          // No token, user is not logged in
          if (active) setLoading(false);
          return;
        }
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = (await res.json()) as Me;
          if (active) setMe(data);
        } else {
          // Token invalid or expired, remove it
          localStorage.removeItem('access_token');
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
      localStorage.removeItem('access_token');
      window.location.href = '/';
    } catch (error) {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
  };

  if (loading) return null;

  if (!me?.user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/register" className="hover:underline">Register</Link>
      </div>
    );
  }

  const { name, email } = me.user;
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 text-sm">
        <User2 className="h-4 w-4 text-[color:var(--brand-600)]" />
        <div className="text-slate-800 dark:text-slate-200">
          <div className="font-medium leading-none">{name}</div>
          <div className="text-xs muted">{email}</div>
        </div>
      </div>
      <button onClick={logout} className="btn btn-outline flex items-center gap-2">
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </div>
  );
}
