'use client';
import useSWR from 'swr';
import { API_URL } from '../../../lib/api';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FileText, Send, CheckCircle2, Loader2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PublicFormPage() {
  const { publicId } = useParams<{ publicId: string }>();
  const { data: form } = useSWR(`${API_URL}/api/forms/public/${publicId}`, fetcher);
  const [values, setValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  if (!form) {
    return (
      <main className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[color:var(--brand-600)] mx-auto mb-4" />
          <p className="muted">Loading form...</p>
        </div>
      </main>
    );
  }

  const submit = async () => {
    setLoading(true);
    try {
      const responses = (form.fields || []).map((f: any) => ({ fieldId: f.id, value: values[f.id] ?? '' }));
      const res = await fetch(`${API_URL}/api/submissions/public/${publicId}`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ responses, password })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      alert('Failed to submit. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="container py-20">
        <div className="max-w-2xl mx-auto">
          <div className="card p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
            <p className="muted">Your response has been recorded successfully.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-700 mb-6">
            <FileText className="h-6 w-6 text-[color:var(--brand-600)]" />
            <div>
              <h1 className="text-2xl font-bold">{form.title}</h1>
              {form.description && (
                <p className="text-sm muted mt-1">{form.description}</p>
              )}
            </div>
          </div>

          {form.passwordProtected && (
            <div className="mb-6">
              <label className="label">Form Password</label>
              <input 
                className="input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-6">
            {form.fields.map((f: any) => (
              <div key={f.id} className="space-y-2">
                <label className="label">
                  {f.label}
                  {f.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {f.type === 'text' && (
                  <input 
                    className="input" 
                    placeholder="Your answer"
                    onChange={(e) => setValues({ ...values, [f.id]: e.target.value })} 
                  />
                )}
                
                {f.type === 'textarea' && (
                  <textarea 
                    className="input" 
                    rows={4}
                    placeholder="Your answer"
                    onChange={(e) => setValues({ ...values, [f.id]: e.target.value })} 
                  />
                )}
                
                {f.type === 'number' && (
                  <input 
                    type="number" 
                    className="input" 
                    placeholder="0"
                    onChange={(e) => setValues({ ...values, [f.id]: e.target.value })} 
                  />
                )}
                
                {f.type === 'radio' && (
                  <div className="space-y-2 pl-1">
                    {(f.options || []).map((opt: string, oi: number) => (
                      <label key={oi} className="flex items-center gap-2 text-sm cursor-pointer hover:text-[color:var(--brand-600)]">
                        <input 
                          type="radio" 
                          name={f.id} 
                          className="accent-[color:var(--brand-600)]"
                          onChange={() => setValues({ ...values, [f.id]: opt })} 
                        /> 
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
                
                {f.type === 'checkbox' && (
                  <div className="space-y-2 pl-1">
                    {(f.options || []).map((opt: string, oi: number) => (
                      <label key={oi} className="flex items-center gap-2 text-sm cursor-pointer hover:text-[color:var(--brand-600)]">
                        <input 
                          type="checkbox" 
                          className="rounded accent-[color:var(--brand-600)]"
                          onChange={(e) => {
                            const arr = new Set<string>(values[f.id] || []);
                            if (e.target.checked) arr.add(opt); else arr.delete(opt);
                            setValues({ ...values, [f.id]: Array.from(arr) });
                          }} 
                        /> 
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button 
                onClick={submit} 
                disabled={loading}
                className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
