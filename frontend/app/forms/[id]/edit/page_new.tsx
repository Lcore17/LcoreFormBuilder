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
  ArrowLeft,
  Settings,
  GripVertical
} from 'lucide-react';

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

  if (isChecking || isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[color:var(--brand-600)] mx-auto mb-4" />
          <p className="text-lg font-medium">{isChecking ? 'Verifying Session' : 'Loading Form'}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Please wait...</p>
        </div>
      </main>
    );
  }

  if (error || !form) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Form Not Found</h1>
          <Link href="/forms" className="btn btn-outline">Back to Dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Link 
                href="/forms"
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Back"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-semibold truncate">Edit Form</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate hidden sm:block">{title || 'Untitled'}</p>
              </div>
            </div>
            <button onClick={save} className="btn btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2 inline-flex items-center gap-1.5 sm:gap-2">
              <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4 sm:py-6">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Builder Panel */}
          <div className="space-y-4">
            {/* Settings Card */}
            <div className="card">
              <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <h2 className="font-semibold text-sm sm:text-base">Form Settings</h2>
              </div>
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div>
                  <label className="label text-xs sm:text-sm">Title</label>
                  <input 
                    className="input text-sm sm:text-base" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <label className="label text-xs sm:text-sm">Description (Optional)</label>
                  <textarea 
                    className="input text-sm sm:text-base" 
                    placeholder="Brief description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isPublic} 
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="rounded"
                    /> 
                    <span>Public Form</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={enableCaptcha} 
                      onChange={(e) => setEnableCaptcha(e.target.checked)}
                      className="rounded"
                    /> 
                    <span>Enable CAPTCHA</span>
                  </label>
                </div>
                <div>
                  <label className="label text-xs sm:text-sm">Password Protection (Optional)</label>
                  <input 
                    className="input text-sm sm:text-base" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set or update password"
                  />
                </div>
              </div>
            </div>

            {/* Add Fields */}
            <div className="card">
              <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="font-semibold text-sm sm:text-base">Add Fields</h2>
              </div>
              <div className="p-3 sm:p-4">
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  <button onClick={() => addField('text')} className="btn-outline text-xs sm:text-sm px-2 sm:px-3 py-2 inline-flex items-center justify-center gap-1.5">
                    <Type className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Text</span>
                  </button>
                  <button onClick={() => addField('textarea')} className="btn-outline text-xs sm:text-sm px-2 sm:px-3 py-2 inline-flex items-center justify-center gap-1.5">
                    <AlignLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Long Text</span>
                  </button>
                  <button onClick={() => addField('radio')} className="btn-outline text-xs sm:text-sm px-2 sm:px-3 py-2 inline-flex items-center justify-center gap-1.5">
                    <ListOrdered className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Choice</span>
                  </button>
                  <button onClick={() => addField('checkbox')} className="btn-outline text-xs sm:text-sm px-2 sm:px-3 py-2 inline-flex items-center justify-center gap-1.5">
                    <CheckSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Checkbox</span>
                  </button>
                  <button onClick={() => addField('number')} className="btn-outline text-xs sm:text-sm px-2 sm:px-3 py-2 inline-flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1">
                    <Hash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Number</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Fields List */}
            <div className="space-y-3">
              {fields.map((f, i) => (
                <div key={i} className="card p-3 sm:p-4">
                  <div className="flex items-start gap-2">
                    <div className="pt-2 cursor-move text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <GripVertical className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-2 min-w-0">
                      <input 
                        className="input text-sm sm:text-base" 
                        value={f.label} 
                        onChange={(e) => updateField(i, { label: e.target.value })}
                        placeholder="Field label"
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <select 
                          value={f.type} 
                          onChange={(e) => updateField(i, { type: e.target.value })} 
                          className="input flex-1 text-xs sm:text-sm"
                        >
                          <option value="text">Short Text</option>
                          <option value="textarea">Long Text</option>
                          <option value="number">Number</option>
                          <option value="radio">Multiple Choice</option>
                          <option value="checkbox">Checkboxes</option>
                        </select>
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <input 
                            type="checkbox" 
                            checked={!!f.required} 
                            onChange={(e) => updateField(i, { required: e.target.checked })}
                            className="rounded"
                          /> 
                          <span>Required</span>
                        </label>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeField(i)} 
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors flex-shrink-0"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {(f.type === 'radio' || f.type === 'checkbox') && (
                    <div className="mt-3 pl-8 space-y-2">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Options</div>
                      {(f.options || ['Option 1']).map((opt, oi) => (
                        <input 
                          key={oi} 
                          className="input text-xs sm:text-sm"
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
                        className="text-xs sm:text-sm text-[color:var(--brand-600)] hover:underline inline-flex items-center gap-1" 
                        onClick={() => updateField(i, { options: [...(f.options || ['Option 1']), `Option ${(f.options?.length || 1) + 1}`] })}
                      >
                        <Plus className="h-3 w-3" />
                        Add option
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {fields.length === 0 && (
                <div className="card p-8 text-center">
                  <div className="text-slate-400 dark:text-slate-600 text-sm">
                    No fields yet. Add fields using the buttons above.
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pb-4">
              <button onClick={save} className="btn btn-primary flex-1 sm:flex-initial">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
              <Link href="/forms" className="btn-outline flex-1 sm:flex-initial">
                Cancel
              </Link>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="card overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <span className="font-medium text-sm">Live Preview</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    Real-time
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[color:var(--brand-50)] to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[color:var(--brand-600)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold break-words">
                      {title || 'Untitled Form'}
                    </h2>
                    {description && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 break-words">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                {fields.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                      <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-400 text-sm">Add fields to see preview</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fields.map((f, i) => (
                      <div key={i} className="space-y-2">
                        <label className="label text-xs sm:text-sm flex items-center gap-1">
                          {f.label || 'Untitled Field'}
                          {f.required && <span className="text-red-500">*</span>}
                        </label>
                        
                        {f.type === 'text' && <input className="input text-sm" placeholder="Your answer" disabled />}
                        {f.type === 'textarea' && <textarea className="input text-sm resize-none" rows={3} placeholder="Your answer" disabled />}
                        {f.type === 'number' && <input type="number" className="input text-sm" placeholder="0" disabled />}
                        
                        {f.type === 'radio' && (
                          <div className="space-y-2 pl-1">
                            {(f.options || ['Option 1']).map((opt, oi) => (
                              <label key={oi} className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:text-[color:var(--brand-600)]">
                                <input name={`preview-f-${i}`} type="radio" className="accent-[color:var(--brand-600)]" disabled /> 
                                {opt}
                              </label>
                            ))}
                          </div>
                        )}
                        
                        {f.type === 'checkbox' && (
                          <div className="space-y-2 pl-1">
                            {(f.options || ['Option 1']).map((opt, oi) => (
                              <label key={oi} className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:text-[color:var(--brand-600)]">
                                <input type="checkbox" className="rounded accent-[color:var(--brand-600)]" disabled /> 
                                {opt}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {enableCaptcha && (
                      <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 mt-4">
                        <label className="label text-xs">Security Check</label>
                        <div className="flex items-center gap-2">
                          <div className="font-mono text-xs font-semibold px-2 py-1.5 bg-white dark:bg-slate-900 rounded border">
                            5 + 7 = ?
                          </div>
                          <input type="number" className="input max-w-[60px] text-xs" placeholder="12" disabled />
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <button className="btn btn-primary w-full text-sm" disabled>Submit Response</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
