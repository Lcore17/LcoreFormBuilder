'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const r = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; server?: string }>({});
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name || name.trim().length < 2) next.name = 'Name must be at least 2 characters';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address';
    if (!password || password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      setLoading(false);
      if (res.ok) {
        // Keep it inline: show success and redirect
        alert('Account created! Please login.');
        window.location.href = '/login';
      } else {
        const data = await res.json().catch(() => null);
        setErrors({ server: data?.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ server: 'Registration failed. Please try again.' });
    }
  };

  const fillDemo = () => {
    setName('Test User');
    setEmail('test@example.com');
    setPassword('test123');
  };

  return (
    <main className="container py-12">
      <div className="max-w-md mx-auto card p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--brand-100)] dark:bg-[color:var(--brand-900)] mb-3">
            <UserPlus className="h-6 w-6 text-[color:var(--brand-600)]" />
          </div>
          <h1 className="section-title">Create account</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Get started with Lcore Forms
          </p>
        </div>
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                className="input pl-10" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
          
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
                minLength={6}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              At least 6 characters
            </p>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>
          
          {errors.server && (
            <p className="text-sm text-red-600">{errors.server}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button className="btn btn-primary flex-1 inline-flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                'Creating…'
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Register
                </>
              )}
            </button>
            <button type="button" onClick={fillDemo} className="btn btn-outline">
              Demo Fill
            </button>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            Already have an account?{' '}
            <a href="/login" className="text-[color:var(--brand-600)] hover:underline font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
