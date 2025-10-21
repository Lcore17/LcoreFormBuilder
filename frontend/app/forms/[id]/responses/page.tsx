'use client';
import { API_URL } from '../../../../lib/api';
import { useAuth } from '../../../../lib/useAuth';
import useSWR from 'swr';
import Link from 'next/link';
import { ArrowLeft, Download, FileJson, FileSpreadsheet, Loader2, Inbox } from 'lucide-react';

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic';

const fetcher = (url: string) => {
  const token = localStorage.getItem('access_token');
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(url, { credentials: 'include', headers }).then((r) => r.json());
};

export default function ResponsesPage({ params }: { params: { id: string } }) {
  const { isChecking } = useAuth();
  const { data: form, error: formError } = useSWR(`${API_URL}/api/forms/${params.id}`, fetcher);
  const { data: submissions, error: submissionsError, isLoading } = useSWR(
    `${API_URL}/api/submissions/form/${params.id}`,
    fetcher
  );

  const downloadCsv = () => {
    const token = localStorage.getItem('access_token');
    const url = `${API_URL}/api/submissions/export/${params.id}/csv`;
    fetch(url, {
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${form?.title || 'form'}-responses.csv`;
        a.click();
      });
  };

  const downloadJson = () => {
    const token = localStorage.getItem('access_token');
    const url = `${API_URL}/api/submissions/export/${params.id}/json`;
    fetch(url, {
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${form?.title || 'form'}-responses.json`;
        a.click();
      });
  };

  if (isChecking || isLoading) {
    return (
      <main className="container py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[color:var(--brand-600)] mb-4" />
          <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Loading Responses
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Please wait...</p>
        </div>
      </main>
    );
  }

  if (formError || submissionsError || !form) {
    return (
      <main className="container py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Form Not Found</h1>
          <Link href="/forms" className="btn btn-outline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link 
          href="/forms"
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="section-title">Form Responses</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {form.title}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={downloadCsv} 
            className="btn-outline inline-flex items-center gap-2"
            disabled={!submissions || submissions.length === 0}
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV
          </button>
          <button 
            onClick={downloadJson} 
            className="btn-outline inline-flex items-center gap-2"
            disabled={!submissions || submissions.length === 0}
          >
            <FileJson className="h-4 w-4" />
            Export JSON
          </button>
        </div>
      </div>

      {!submissions || submissions.length === 0 ? (
        <div className="card">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Inbox className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No responses yet</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Share your form to start collecting responses
            </p>
            <Link href={`/public/${form.publicId}`} className="btn btn-primary">
              View Public Form
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Total Responses: {submissions.length}
              </h2>
            </div>
          </div>

          {submissions.map((submission: any) => (
            <div key={submission.id} className="card">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    Submission #{submission.id.slice(0, 8)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {new Date(submission.createdAt).toLocaleString()}
                  </div>
                </div>
                {submission.ip && (
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    IP: {submission.ip}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {submission.responses && submission.responses.length > 0 ? (
                  submission.responses.map((response: any) => (
                    <div key={response.id} className="space-y-1">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {response.field?.label || 'Unknown Field'}
                      </div>
                      <div className="text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                        {response.value || '(empty)'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-500 dark:text-slate-400 italic">
                    No response data available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
