'use client';
import { API_URL } from '../../../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../lib/useAuth';
import useSWR from 'swr';
import { 
  Type, 
  AlignLeft, 
  ListOrdered, 
  CheckSquare, 
  Hash, 
  Trash2, 
  Plus,
  Save,
  Eye,
  FileText,
  Loader2,
  ArrowLeft
} from 'lucide-react';

// Force dynamic rendering since this page requires authentication
export const dynamic = 'force-dynamic';

type Field = { id?: string; label: string; type: string; required?: boolean; options?: string[]; order: number };

const fetcher = (url: string) => {
  const token = localStorage.getItem('access_token');
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(url, { credentials: 'include', headers }).then((r) => r.json());
};

export default function EditFormPage({ params }: { params: { id: string } }) {
  const { isChecking } = useAuth();
  const r = useRouter();
  const { data: form, error, isLoading } = useSWR(`${API_URL}/api/forms/${params.id}`, fetcher);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [fields, setFields] = useState<Field[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [enableCaptcha, setEnableCaptcha] = useState<boolean>(false);
  const { data: versions } = useSWR(`${API_URL}/api/forms/${params.id}/versions`, fetcher);

  // Load form data when it's fetched
  useEffect(() => {
    if (form && !isInitialized) {
      setTitle(form.title || '');
      setDescription(form.description || '');
      setIsPublic(form.isPublic !== undefined ? form.isPublic : true);
      setFields(form.fields || []);
      setEnableCaptcha(form.enableCaptcha || false);
      setIsInitialized(true);
    }
  }, [form, isInitialized]);

  const addField = (type: string) => {
    setFields((prev) => {
      const newField: Field = { 
        label: 'New Field', 
        type, 
        order: prev.length,
        options: (type === 'radio' || type === 'checkbox') ? ['Option 1', 'Option 2'] : undefined
      };
      return [...prev, newField];
    });
  };
  
  const updateField = (i: number, patch: Partial<Field>) => {
    setFields((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  };
  
  const removeField = (i: number) => setFields((prev) => prev.filter((_, idx) => idx !== i));

  const save = async () => {
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(`${API_URL}/api/forms/${params.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers,
      body: JSON.stringify({ title, description, isPublic, fields, password: password || undefined, enableCaptcha }),
    });
    
    if (res.ok) {
      r.push('/forms');
    } else {
      const errorText = await res.text().catch(() => 'Unknown error');
      console.error('Failed to update form:', errorText);
      alert('Failed to update form: ' + errorText);
    }
  };

  // Show loading screen while checking authentication or loading form
  if (isChecking || isLoading) {
    return (
      <main className="container py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[color:var(--brand-600)] mb-4" />
          <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            {isChecking ? 'Verifying Session' : 'Loading Form'}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Please wait...</p>
        </div>
      </main>
    );
  }

  if (error || !form) {
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
      {/* Top Bar - Fixed on mobile */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Link 
                href="/forms"
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {title || 'Edit Form'}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  Make changes to your form
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                onClick={save} 
                className="btn btn-primary inline-flex items-center gap-2 text-sm px-4 py-2"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4 lg:py-6">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Editor Section */}
          <section className="space-y-4">
            {/* Form Settings Card */}
            <div className="card space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <FileText className="h-4 w-4 text-[color:var(--brand-600)]" />
                <h2 className="font-semibold text-slate-900 dark:text-white">Form Settings</h2>
              </div>
              
              <div>
                <label className="label">Form Title *</label>
                <input 
                  className="input" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter form title"
                />
              </div>
              
              <div>
                <label className="label">Description</label>
                <textarea 
                  className="input resize-none" 
                  placeholder="Brief description of your form" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isPublic} 
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded cursor-pointer"
                  /> 
                  <span className="font-medium">Public Form</span>
                </label>
                
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={enableCaptcha} 
                    onChange={(e) => setEnableCaptcha(e.target.checked)}
                    className="rounded cursor-pointer"
                  /> 
                  <span className="font-medium">Enable CAPTCHA</span>
                </label>
              </div>
              
              <div>
                <label className="label">Form Password (optional)</label>
                <input 
                  className="input" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set or update password"
                />
                <p className="text-xs muted mt-1">Leave blank to keep existing</p>
              </div>
            </div>

            {/* Add Fields Card */}
            <div className="card">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <Plus className="h-4 w-4 text-[color:var(--brand-600)]" />
                <h2 className="font-semibold text-slate-900 dark:text-white">Add Fields</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                <button 
                  onClick={() => addField('text')} 
                  className="btn-outline inline-flex items-center justify-center gap-2 py-3"
                >
                  <Type className="h-4 w-4" />
                  <span className="text-sm">Text</span>
                </button>
                <button 
                  onClick={() => addField('textarea')} 
                  className="btn-outline inline-flex items-center justify-center gap-2 py-3"
                >
                  <AlignLeft className="h-4 w-4" />
                  <span className="text-sm">Long Text</span>
                </button>
                <button 
                  onClick={() => addField('radio')} 
                  className="btn-outline inline-flex items-center justify-center gap-2 py-3"
                >
                  <ListOrdered className="h-4 w-4" />
                  <span className="text-sm">Choice</span>
                </button>
                <button 
                  onClick={() => addField('checkbox')} 
                  className="btn-outline inline-flex items-center justify-center gap-2 py-3"
                >
                  <CheckSquare className="h-4 w-4" />
                  <span className="text-sm">Checkbox</span>
                </button>
                <button 
                  onClick={() => addField('number')} 
                  className="btn-outline inline-flex items-center justify-center gap-2 py-3"
                >
                  <Hash className="h-4 w-4" />
                  <span className="text-sm">Number</span>
                </button>
              </div>
            </div>

            {/* Fields List */}
            <div className="space-y-3">
          {fields.map((f, i) => (
            <div key={i} className="card space-y-3">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <input 
                    className="input" 
                    value={f.label} 
                    onChange={(e) => updateField(i, { label: e.target.value })}
                    placeholder="Field label"
                  />
                  
                  <div className="flex items-center gap-2">
                    <select 
                      value={f.type} 
                      onChange={(e) => updateField(i, { type: e.target.value })} 
                      className="input flex-1"
                    >
                      <option value="text">Short Text</option>
                      <option value="textarea">Long Text</option>
                      <option value="number">Number</option>
                      <option value="radio">Multiple Choice</option>
                      <option value="checkbox">Checkboxes</option>
                    </select>
                    
                    <label className="text-sm flex items-center gap-1 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={!!f.required} 
                        onChange={(e) => updateField(i, { required: e.target.checked })}
                        className="rounded"
                      /> 
                      Required
                    </label>
                  </div>
                </div>
                
                <button 
                  onClick={() => removeField(i)} 
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                  title="Delete field"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              {(f.type === 'radio' || f.type === 'checkbox') && (
                <div className="space-y-2 pl-3 border-l-2 border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Options</div>
                  {(f.options || ['Option 1']).map((opt, oi) => (
                    <input 
                      key={oi} 
                      className="input text-sm"
                      value={opt}
                      onChange={(e) => {
                        const opts = [...(f.options || ['Option 1'])];
                        opts[oi] = e.target.value;
                        updateField(i, { options: opts });
                      }}
                      placeholder={`Option ${oi + 1}`}
                    />
                  ))}
                  <button 
                    className="text-sm text-[color:var(--brand-600)] hover:underline inline-flex items-center gap-1" 
                    onClick={() => updateField(i, { options: [...(f.options || ['Option 1']), `Option ${(f.options?.length || 1) + 1}`] })}
                  >
                    <Plus className="h-3 w-3" />
                    Add option
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section className="lg:sticky lg:top-20 lg:self-start">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[color:var(--brand-600)]" />
              <span className="font-semibold text-sm text-slate-900 dark:text-white">Live Preview</span>
            </div>
            <span className="badge text-xs">Real-time</span>
          </div>
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[color:var(--brand-50)] to-[color:var(--brand-100)] dark:from-slate-800 dark:to-slate-800 p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                  <FileText className="h-5 w-5 text-[color:var(--brand-600)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white break-words">
                    {title || 'Untitled Form'}
                  </h2>
                  {description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 break-words">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Form Body */}
            <div className="p-6 bg-white dark:bg-slate-900/40">
              {fields.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <Eye className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400 dark:text-slate-600 italic">
                    Add fields to see the preview
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                    Your form will appear here as you build it
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {fields.map((f, i) => (
                    <div key={i} className="space-y-2">
                      <label className="label flex items-center gap-1">
                        {f.label || 'Untitled Field'}
                        {f.required && (
                          <span className="text-red-500" title="Required field">*</span>
                        )}
                      </label>
                      
                      {f.type === 'text' && (
                        <input 
                          className="input" 
                          placeholder="Your answer" 
                          disabled 
                        />
                      )}
                      
                      {f.type === 'textarea' && (
                        <textarea 
                          className="input resize-none" 
                          rows={4} 
                          placeholder="Your answer" 
                          disabled 
                        />
                      )}
                      
                      {f.type === 'number' && (
                        <input 
                          type="number" 
                          className="input" 
                          placeholder="0" 
                          disabled 
                        />
                      )}
                      
                      {f.type === 'radio' && (
                        <div className="space-y-2.5 pl-1">
                          {(f.options || ['Option 1']).map((opt, oi) => (
                            <label 
                              key={oi} 
                              className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-[color:var(--brand-600)] transition-colors group"
                            >
                              <input 
                                name={`preview-f-${i}`} 
                                type="radio" 
                                className="accent-[color:var(--brand-600)] cursor-pointer"
                                disabled 
                              /> 
                              <span className="group-hover:translate-x-0.5 transition-transform">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {f.type === 'checkbox' && (
                        <div className="space-y-2.5 pl-1">
                          {(f.options || ['Option 1']).map((opt, oi) => (
                            <label 
                              key={oi} 
                              className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-[color:var(--brand-600)] transition-colors group"
                            >
                              <input 
                                type="checkbox" 
                                className="rounded accent-[color:var(--brand-600)] cursor-pointer"
                                disabled 
                              /> 
                              <span className="group-hover:translate-x-0.5 transition-transform">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Captcha Preview */}
              {fields.length > 0 && enableCaptcha && (
                <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <label className="label">Security Check</label>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Math problem will appear here for verification
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-sm font-semibold px-3 py-2 bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-600">
                      5 + 7 = ?
                    </div>
                    <input 
                      type="number"
                      className="input max-w-[80px] text-sm"
                      placeholder="12"
                      disabled 
                    />
                  </div>
                </div>
              )}
              
              {/* Submit Button Preview */}
              {fields.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button className="btn btn-primary w-full" disabled>
                    Submit Response
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Version History - Full Width on Mobile, Below Preview on Desktop */}
        <section className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-slate-800">
              <FileText className="h-4 w-4 text-[color:var(--brand-600)]" />
              <h2 className="font-semibold text-slate-900 dark:text-white">Version History</h2>
            </div>
            <div className="p-4">
              {!versions || versions.length === 0 ? (
                <p className="muted text-sm text-center py-8">No versions yet.</p>
              ) : (
                <ul className="space-y-2">
                  {versions.map((v: any) => (
                    <li key={v.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(v.createdAt).toLocaleString()}
                      </span>
                      <button 
                        className="btn btn-outline btn-sm self-start sm:self-auto"
                        onClick={async () => {
                          const ok = confirm('Restore this version? This will overwrite current form.');
                          if (!ok) return;
                          const token = localStorage.getItem('access_token');
                          const headers: Record<string, string> = {};
                          if (token) {
                            headers['Authorization'] = `Bearer ${token}`;
                          }
                          const res = await fetch(`${API_URL}/api/forms/${params.id}/restore/${v.id}`, { 
                            method: 'POST', 
                            credentials: 'include',
                            headers
                          });
                          if (res.ok) {
                            window.location.reload();
                          } else {
                            alert('Failed to restore version');
                          }
                        }}
                      >
                        Restore
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
      {/* Close container */}
      </div>
    </main>
  );
}
