'use client';
import { API_URL } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../lib/useAuth';
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
  Sparkles,
  Mail,
  SlidersHorizontal
} from 'lucide-react';

type Field = { id?: string; label: string; type: string; required?: boolean; options?: string[]; order: number; minLength?: number | null; maxLength?: number | null; minValue?: number | null; maxValue?: number | null; pattern?: string | null };

export default function NewFormPage() {
  const { isChecking } = useAuth();
  const r = useRouter();
  const [title, setTitle] = useState('Untitled Form');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [fields, setFields] = useState<Field[]>([
    { label: 'Your Name', type: 'text', order: 0 },
  ]);
  // Advanced settings state
  const [brandColor, setBrandColor] = useState<string>('#3b82f6');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [maxSubmissions, setMaxSubmissions] = useState<number | ''>('');
  const [thankYouMessage, setThankYouMessage] = useState<string>('');
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [language, setLanguage] = useState<string>('en');
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [enableCaptcha, setEnableCaptcha] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  // Check for template from sessionStorage
  useEffect(() => {
    const templateData = sessionStorage.getItem('selectedTemplate');
    if (templateData) {
      const template = JSON.parse(templateData);
      if (template.id !== 'blank') {
        setTitle(template.name);
        setDescription(template.description);
        setFields(template.fields.map((f: any, idx: number) => ({
          ...f,
          order: idx,
        })));
      }
      // Clear template from sessionStorage after using it
      sessionStorage.removeItem('selectedTemplate');
    }
  }, []);

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
    const res = await fetch(`${API_URL}/api/forms`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({ 
        title, 
        description, 
        isPublic, 
        fields,
        brandColor,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
        maxSubmissions: maxSubmissions === '' ? null : Number(maxSubmissions),
        thankYouMessage: thankYouMessage || null,
        redirectUrl: redirectUrl || null,
        language,
        webhookUrl: webhookUrl || null,
        enableCaptcha,
        password: password || undefined,
      }),
    });
    if (res.ok) {
      r.push('/forms');
    } else {
      const errorText = await res.text().catch(() => 'Unknown error');
      console.error('Failed to save form:', errorText);
      alert('Failed to save form: ' + errorText);
    }
  };

  // Show loading screen while checking authentication
  if (isChecking) {
    return (
      <main className="container py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[color:var(--brand-600)] mb-4" />
          <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">Loading Form Builder</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Verifying your session...</p>
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
                <FileText className="h-5 w-5" />
              </Link>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {title || 'New Form'}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  Create a new form
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link 
                href="/forms/templates"
                className="btn-outline inline-flex items-center gap-2 text-sm px-3 py-2"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Templates</span>
              </Link>
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
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Form Title *</label>
                  <input 
                    className="input" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter form title"
                    maxLength={80}
                  />
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea 
                    className="input resize-none" 
                    placeholder="Brief description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    maxLength={160}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={isPublic} 
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded cursor-pointer"
                  id="public-form"
                /> 
                <label htmlFor="public-form" className="font-medium text-sm cursor-pointer">Public Form</label>
              </div>
              
              {/* Advanced settings toggle */}
              <button 
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <SlidersHorizontal className="h-4 w-4" /> Advanced Settings
                </span>
                <span className="text-xs text-slate-500">{showAdvanced ? 'Hide' : 'Show'}</span>
              </button>
              
              {showAdvanced && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Brand color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    className="h-10 w-12 p-1 bg-transparent border border-slate-200 dark:border-slate-700 rounded"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                  />
                  <input 
                    className="input flex-1" 
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
              <div>
                <label className="label">Max submissions</label>
                <input 
                  type="number"
                  className="input"
                  value={maxSubmissions}
                  min={0}
                  onChange={(e) => setMaxSubmissions(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Unlimited"
                />
              </div>
              <div>
                <label className="label">Start date</label>
                <input 
                  type="datetime-local"
                  className="input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="label">End date</label>
                <input 
                  type="datetime-local"
                  className="input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Thank you message</label>
                <input 
                  className="input"
                  value={thankYouMessage}
                  onChange={(e) => setThankYouMessage(e.target.value)}
                  placeholder="Thanks for submitting! We'll get back to you soon."
                  maxLength={160}
                />
              </div>
              <div>
                <label className="label">Redirect URL (optional)</label>
                <input 
                  className="input"
                  type="url"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  placeholder="https://example.com/thank-you"
                />
              </div>
              <div>
                <label className="label">Language</label>
                <select className="input" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">Webhook URL</label>
                <input 
                  className="input"
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-service.com/webhooks/form"
                />
              </div>
              <div>
                <label className="label">Form Password (optional)</label>
                <input 
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set a password to restrict access"
                />
                <p className="text-xs muted mt-1">Leave blank to keep public without password. Clear to remove on update.</p>
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <input 
                  id="captcha"
                  type="checkbox"
                  className="rounded"
                  checked={enableCaptcha}
                  onChange={(e) => setEnableCaptcha(e.target.checked)}
                />
                <label htmlFor="captcha" className="text-sm">Enable CAPTCHA</label>
              </div>
            </div>
          )}
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Add Fields</h2>
          <div className="flex flex-wrap gap-3 mb-2">
            <button 
              onClick={() => addField('text')} 
              className="btn-outline inline-flex items-center gap-2"
            >
              <Type className="h-4 w-4" />
              Text
            </button>
            <button 
              onClick={() => addField('textarea')} 
              className="btn-outline inline-flex items-center gap-2"
            >
              <AlignLeft className="h-4 w-4" />
              Long Text
            </button>
            <button 
              onClick={() => addField('radio')} 
              className="btn-outline inline-flex items-center gap-2"
            >
              <ListOrdered className="h-4 w-4" />
              Choice
            </button>
            <button 
              onClick={() => addField('checkbox')} 
              className="btn-outline inline-flex items-center gap-2"
            >
              <CheckSquare className="h-4 w-4" />
              Checkbox
            </button>
            <button 
              onClick={() => addField('number')} 
              className="btn-outline inline-flex items-center gap-2"
            >
              <Hash className="h-4 w-4" />
              Number
            </button>
            <button 
              onClick={() => addField('email')} 
              className="btn-outline inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((f, i) => (
              <div key={i} className="card p-4 space-y-3 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <input 
                      className="input" 
                      value={f.label} 
                      onChange={(e) => updateField(i, { label: e.target.value })}
                      placeholder="Field label"
                      maxLength={60}
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
                        <option value="email">Email</option>
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
                {/* Constraints */}
                {(f.type === 'text' || f.type === 'textarea' || f.type === 'email') && (
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="label text-xs">Min length</label>
                      <input 
                        type="number"
                        className="input"
                        value={f.minLength ?? ''}
                        min={0}
                        onChange={(e) => updateField(i, { minLength: e.target.value === '' ? null : Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Max length</label>
                      <input 
                        type="number"
                        className="input"
                        value={f.maxLength ?? ''}
                        min={0}
                        onChange={(e) => updateField(i, { maxLength: e.target.value === '' ? null : Number(e.target.value) })}
                        placeholder="Unlimited"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="label text-xs">Regex pattern</label>
                      <input 
                        className="input"
                        value={f.pattern ?? ''}
                        onChange={(e) => updateField(i, { pattern: e.target.value || null })}
                        placeholder="^\\w+@example\\.com$ (for email domain)"
                      />
                    </div>
                  </div>
                )}
                {f.type === 'number' && (
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="label text-xs">Min value</label>
                      <input 
                        type="number"
                        className="input"
                        value={f.minValue ?? ''}
                        onChange={(e) => updateField(i, { minValue: e.target.value === '' ? null : Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Max value</label>
                      <input 
                        type="number"
                        className="input"
                        value={f.maxValue ?? ''}
                        onChange={(e) => updateField(i, { maxValue: e.target.value === '' ? null : Number(e.target.value) })}
                        placeholder="Unlimited"
                      />
                    </div>
                  </div>
                )}
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
                        maxLength={40}
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
        </div>

        <div className="flex gap-4 mt-4">
          <button onClick={save} className="btn btn-primary inline-flex items-center gap-2 text-base px-6 py-2.5">
            <Save className="h-5 w-5" />
            Save Form
          </button>
          <button 
            onClick={() => r.push('/forms')} 
            className="btn-outline text-base px-6 py-2.5"
          >
            Cancel
          </button>
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
                      {f.type === 'email' && (
                        <input 
                          type="email" 
                          className="input" 
                          placeholder="you@example.com" 
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
      </div>
      {/* Close container */}
      </div>
    </main>
  );
}
