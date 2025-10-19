import Link from 'next/link';
import { CheckCircle2, BarChart3, Eye, Share2, ShieldCheck, Zap, FileText, PenTool, Sparkles, Users, Clock, Globe, Lock, Palette, Download, ArrowLeft } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <main className="container py-12 space-y-10">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] mb-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--brand-50)] dark:bg-[color:var(--brand-900)] text-[color:var(--brand-700)] dark:text-[color:var(--brand-300)] text-xs font-semibold">
          <Sparkles className="h-4 w-4" />
          Product Features
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Everything you need to build forms</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Build, customize, share, and analyze forms with our modern form builder. Fast, secure, and delightful.
        </p>
        <div>
          <Link href="/features/guide" className="text-sm text-[color:var(--brand-600)] hover:underline">See the full Advanced Features Guide</Link>
        </div>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[color:var(--brand-100)] to-[color:var(--brand-200)] dark:from-[color:var(--brand-900)] dark:to-[color:var(--brand-800)] w-fit">
            <PenTool className="h-8 w-8 text-[color:var(--brand-700)] dark:text-[color:var(--brand-300)]"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Drag & Drop Builder</h3>
          <p className="text-base muted leading-relaxed">Quickly add and arrange fields with a clean, intuitive interface.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 w-fit">
            <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Live Preview</h3>
          <p className="text-base muted leading-relaxed">See changes in real-time as you build your form.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 w-fit">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Validation</h3>
          <p className="text-base muted leading-relaxed">Mark fields as required and guide users to complete forms correctly.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 w-fit">
            <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Real-time Updates</h3>
          <p className="text-base muted leading-relaxed">Your edits are reflected instantly in the live preview.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 w-fit">
            <Share2 className="h-8 w-8 text-purple-600 dark:text-purple-400"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Easy Sharing</h3>
          <p className="text-base muted leading-relaxed">Share your form via public links. Toggle privacy as needed.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 w-fit">
            <Download className="h-8 w-8 text-teal-600 dark:text-teal-400"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Data Export</h3>
          <p className="text-base muted leading-relaxed">Export responses to CSV or JSON for analysis or integration.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/20 w-fit">
            <ShieldCheck className="h-8 w-8 text-rose-600 dark:text-rose-400"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Secure & Private</h3>
          <p className="text-base muted leading-relaxed">JWT authentication and secure cookies keep your data protected.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900/30 dark:to-slate-800/20 w-fit">
            <Palette className="h-8 w-8 text-slate-600 dark:text-slate-300"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Beautiful UI</h3>
          <p className="text-base muted leading-relaxed">A polished, accessible design with light and dark themes.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-sky-800/20 w-fit">
            <Globe className="h-8 w-8 text-sky-600 dark:text-sky-400"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Public Forms</h3>
          <p className="text-base muted leading-relaxed">Make forms public for easy distribution, or keep them private.</p>
        </div>
      </section>

      <div className="card p-8 text-center bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-500)] text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to build?</h2>
        <p className="opacity-90 mb-5">Jump into the dashboard and create your first form in seconds.</p>
        <div className="flex justify-center gap-3">
          <Link href="/forms/new" className="btn btn-light inline-flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Create Form
          </Link>
          <Link href="/forms" className="btn btn-outline-light">Go to Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
