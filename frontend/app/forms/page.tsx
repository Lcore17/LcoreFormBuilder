'use client';
import useSWR from 'swr';
import { API_URL } from '../../lib/api';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/useAuth';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';
import { FileText, BarChart3, ListChecks, Search, ExternalLink, Copy, Loader2, Trash2, Edit, Sparkles } from 'lucide-react';

const fetcher = (url: string) => {
  const token = localStorage.getItem('access_token');
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(url, { credentials: 'include', headers }).then((r) => r.json());
};

export default function FormsPage() {
  const { isChecking, isAuthenticated } = useAuth();
  const { data: metrics, mutate: mutateMetrics } = useSWR(`${API_URL}/api/forms/metrics/summary`, fetcher);
  const { data: formsResponse, error, isLoading, mutate } = useSWR(`${API_URL}/api/forms`, fetcher);
  const [q, setQ] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { notify } = useToast();

  // Handle both array and object responses
  const forms = Array.isArray(formsResponse) ? formsResponse : (formsResponse?.forms || []);
  
  const filtered = forms.filter((f: any) =>
    [f.title, f.description].join(' ').toLowerCase().includes(q.toLowerCase())
  );

  const deleteForm = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const token = localStorage.getItem('access_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${API_URL}/api/forms/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers,
      });

      if (res.ok) {
        notify('Form deleted successfully');
        mutate(); // Refresh forms list
        mutateMetrics(); // Refresh metrics
      } else {
        const errorData = await res.json().catch(() => ({}));
        notify(errorData.message || 'Failed to delete form. Please try again.');
        console.error('Delete error:', errorData);
      }
    } catch (error) {
      notify('Network error. Please check your connection.');
      console.error('Delete error:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // Show loading screen while checking authentication
  if (isChecking) {
    return (
      <main className="container py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[color:var(--brand-600)] mb-4" />
          <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">Loading Dashboard</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Verifying your session...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-10 space-y-8">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-4 flex items-center gap-3">
          <FileText className="h-5 w-5 text-[color:var(--brand-600)]" />
          <div>
            <div className="text-sm muted">Total Forms</div>
            <div className="text-2xl font-semibold">{metrics?.totalForms ?? '—'}</div>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <ListChecks className="h-5 w-5 text-[color:var(--brand-600)]" />
          <div>
            <div className="text-sm muted">Total Responses</div>
            <div className="text-2xl font-semibold">{metrics?.totalResponses ?? '—'}</div>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-[color:var(--brand-600)]" />
          <div>
            <div className="text-sm muted">Avg Responses/Form</div>
            <div className="text-2xl font-semibold">{metrics?.avgResponses ?? '—'}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search forms..." className="input pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/forms/templates" 
            className="btn-outline inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </Link>
          <Link href="/forms/new" className="btn btn-primary">New Form</Link>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[color:var(--brand-600)] mx-auto mb-4" />
          <p className="muted">Loading forms...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">Failed to load forms. Please try again.</p>
        </div>
      ) : filtered?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((f: any) => (
            <div key={f.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[color:var(--brand-100)] dark:bg-[color:var(--brand-900)]">
                  <FileText className="h-4 w-4 text-[color:var(--brand-600)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    {f.title}
                  </div>
                  {f.description && (
                    <div className="text-sm muted line-clamp-2">{f.description}</div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Link 
                  href={`/forms/${f.id}/edit`} 
                  className="btn btn-outline text-xs flex items-center gap-1"
                >
                  <Edit className="h-3 w-3"/>
                  Edit
                </Link>
                <Link 
                  href={`/forms/${f.id}/responses`} 
                  className="btn btn-outline text-xs flex items-center gap-1"
                >
                  <BarChart3 className="h-3 w-3"/>
                  Responses
                </Link>
                <a 
                  href={`/public/${f.publicId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline text-xs flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3"/>
                  Open
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${location.origin}/public/${f.publicId}`);
                    notify('Link copied to clipboard!');
                  }}
                  className="btn btn-outline text-xs flex items-center gap-1"
                  title="Copy link to clipboard"
                >
                  <Copy className="h-3 w-3"/>
                  Copy
                </button>
                <button
                  onClick={() => deleteForm(f.id, f.title)}
                  disabled={deletingId === f.id}
                  className="btn btn-outline text-xs flex items-center gap-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 border-red-300 dark:border-red-900"
                  title="Delete form"
                >
                  {deletingId === f.id ? (
                    <Loader2 className="h-3 w-3 animate-spin"/>
                  ) : (
                    <Trash2 className="h-3 w-3"/>
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : q ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No forms match your search.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try different keywords</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color:var(--brand-100)] dark:bg-[color:var(--brand-900)] mb-4">
            <FileText className="h-8 w-8 text-[color:var(--brand-600)]" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 font-medium">No forms yet</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Click "New Form" to create your first form</p>
        </div>
      )}
    </main>
  );
}
