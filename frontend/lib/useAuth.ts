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
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' });
        if (!res.ok && mounted) {
          window.location.href = '/login';
        } else if (mounted) {
          setIsAuthenticated(true);
          setIsChecking(false);
        }
      } catch {
        if (mounted) {
          window.location.href = '/login';
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [r]);

  return { isChecking, isAuthenticated };
}
