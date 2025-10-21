'use client';
import { useEffect, useState } from 'react';
import { API_URL } from './api';

export function useAuthOptional() {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        const token = localStorage.getItem('access_token');
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include', headers, signal: controller.signal });
        if (mounted) {
          setIsAuthenticated(res.ok);
          setIsChecking(false);
        }
      } catch {
        if (mounted) {
          setIsAuthenticated(false);
          setIsChecking(false);
        }
      } finally {
        clearTimeout(timeout);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { isChecking, isAuthenticated };
}
