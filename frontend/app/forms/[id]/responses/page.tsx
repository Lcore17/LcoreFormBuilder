'use client';
import { API_URL } from '../../../../lib/api';
import { useAuth } from '../../../../lib/useAuth';
import useSWR from 'swr';
import Link from 'next/link';
import { ArrowLeft, Download, FileJson, FileSpreadsheet, Loader2, Inbox, Table2, LayoutList, Calendar, User, FileText } from 'lucide-react';
import { useState } from 'react';

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
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Back Button + Title */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Link 
                href="/forms"
                className="flex-shrink-0 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                  Form Responses
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                  {form.title}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* View Mode Toggle - Desktop */}
              <div className="hidden sm:flex items-center gap-1 mr-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-[color:var(--brand-100)] text-[color:var(--brand-700)] dark:bg-[color:var(--brand-900)] dark:text-[color:var(--brand-300)]'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                  title="Card View"
                >
                  <LayoutList className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'table'
                      ? 'bg-[color:var(--brand-100)] text-[color:var(--brand-700)] dark:bg-[color:var(--brand-900)] dark:text-[color:var(--brand-300)]'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                  title="Table View"
                >
                  <Table2 className="h-4 w-4" />
                </button>
              </div>

              {/* Export Buttons */}
              <button 
                onClick={downloadCsv} 
                className="btn-outline inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2"
                disabled={!submissions || submissions.length === 0}
                title="Export as CSV"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span className="hidden sm:inline">CSV</span>
              </button>
              <button 
                onClick={downloadJson} 
                className="btn-outline inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2"
                disabled={!submissions || submissions.length === 0}
                title="Export as JSON"
              >
                <FileJson className="h-4 w-4" />
                <span className="hidden sm:inline">JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {!submissions || submissions.length === 0 ? (
          <div className="card max-w-2xl mx-auto p-6">
            <div className="text-center py-16 px-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
                <Inbox className="h-10 w-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">No responses yet</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Share your form to start collecting responses. Once people submit, you'll see all their responses here.
              </p>
              <Link href={`/public/${form.publicId}`} className="btn btn-primary inline-flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View Public Form
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Card */}
            <div className="card p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Total Responses
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[color:var(--brand-600)]">
                    {submissions.length}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Form Fields
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {form.fields?.length || 0}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Latest Response
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {new Date(submissions[0].createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Cards View */}
            {viewMode === 'cards' && (
              <div className="space-y-4">
                {submissions.map((submission: any, idx: number) => (
                  <div key={submission.id} className="card p-6 hover:shadow-lg transition-shadow">
                    {/* Submission Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[color:var(--brand-100)] dark:bg-[color:var(--brand-900)] flex items-center justify-center">
                          <span className="text-sm font-bold text-[color:var(--brand-700)] dark:text-[color:var(--brand-300)]">
                            #{idx + 1}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            Response {submission.id.slice(0, 8).toUpperCase()}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <Calendar className="h-3 w-3" />
                            {new Date(submission.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {submission.ip && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                          <User className="h-3 w-3" />
                          {submission.ip}
                        </div>
                      )}
                    </div>

                    {/* Responses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submission.responses && submission.responses.length > 0 ? (
                        submission.responses.map((response: any) => (
                          <div key={response.id} className="space-y-2">
                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              {response.field?.label || 'Unknown Field'}
                            </div>
                            <div className="text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                              {response.value || <span className="text-slate-400 italic">(empty)</span>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-sm text-slate-500 dark:text-slate-400 italic text-center py-4">
                          No response data available
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="card p-6 overflow-hidden">
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          Date & Time
                        </th>
                        {form.fields?.map((field: any) => (
                          <th 
                            key={field.id} 
                            className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                          >
                            {field.label}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          IP
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {submissions.map((submission: any, idx: number) => (
                        <tr key={submission.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            {new Date(submission.createdAt).toLocaleString()}
                          </td>
                          {form.fields?.map((field: any) => {
                            const response = submission.responses?.find((r: any) => r.fieldId === field.id);
                            return (
                              <td key={field.id} className="px-4 py-3 text-sm text-slate-900 dark:text-white max-w-xs truncate">
                                {response?.value || <span className="text-slate-400 italic">—</span>}
                              </td>
                            );
                          })}
                          <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {submission.ip || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
