'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; server?: string }>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation
    const nextErrors: typeof errors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address';
    if (!password || password.length < 6) nextErrors.password = 'Password must be at least 6 characters';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('access_token', data.token);
        window.location.href = '/forms';
      } else {
        let errorMsg = 'Invalid credentials';
        errorMsg = data?.message || errorMsg;
        setErrors({ server: errorMsg });
      }
    } catch (error) {
      console.error('Login fetch error:', error);
      setLoading(false);
      setErrors({ server: 'Login failed. Please check your connection and try again.' });
    }
  };

  const fillDemo = () => {
    setEmail('demo@example.com');
    setPassword('demo123');
  };

  return (
    <main className="container py-12">
      <div className="max-w-md mx-auto card p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--brand-100)] dark:bg-[color:var(--brand-900)] mb-3">
            <LogIn className="h-6 w-6 text-[color:var(--brand-600)]" />
          </div>
          <h1 className="section-title">Welcome back</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                className="input pl-10" 
                placeholder="you@example.com" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="label">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                className="input pl-10" 
                placeholder="••••••••" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>
          
          {errors.server && (
            <p className="text-sm text-red-600">{errors.server}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button className="btn btn-primary flex-1 inline-flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                'Logging in…'
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login
                </>
              )}
            </button>
            <button type="button" onClick={fillDemo} className="btn btn-outline">
              Use Demo
            </button>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            Don't have an account?{' '}
            <a href="/register" className="text-[color:var(--brand-600)] hover:underline font-medium">
              Register
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
