'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from './api';

export function useAuth() {
  const r = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);
      try {
        const token = localStorage.getItem('access_token');
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include', headers, signal: controller.signal });
        if (!res.ok && mounted) {
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        } else if (mounted) {
          setIsAuthenticated(true);
          setIsChecking(false);
        }
      } catch {
        if (mounted) {
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
      } finally {
        clearTimeout(timeout);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [r]);

  return { isChecking, isAuthenticated };
}
