'use client';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  FileSpreadsheet, 
  FileJson,
  Mail,
  Database,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <main className="container py-12">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-12 text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[color:var(--brand-100)] to-[color:var(--brand-200)] dark:from-[color:var(--brand-900)] dark:to-[color:var(--brand-800)] mb-4">
          <Zap className="h-8 w-8 text-[color:var(--brand-600)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Seamless{' '}
          <span className="bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-400)] bg-clip-text text-transparent">
            Integrations
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Connect your forms with your favorite tools and export data in multiple formats
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-100">
          <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 w-fit mb-6">
            <FileSpreadsheet className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">CSV Export</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Export all your form responses to CSV format. Perfect for Excel, Google Sheets, and data analysis.
          </p>
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>One-click export</span>
          </div>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-200">
          <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 w-fit mb-6">
            <FileJson className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">JSON Export</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Download data in JSON format for easy integration with your applications and APIs.
          </p>
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Developer friendly</span>
          </div>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-300">
          <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-900/30 w-fit mb-6">
            <Mail className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Email Notifications</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Get instant email alerts when someone submits your form. Never miss a response.
          </p>
          <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Real-time alerts</span>
          </div>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-400">
          <div className="p-4 rounded-xl bg-amber-100 dark:bg-amber-900/30 w-fit mb-6">
            <Database className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Database Storage</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            All responses securely stored in PostgreSQL database with automatic backups.
          </p>
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Secure & reliable</span>
          </div>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-500">
          <div className="p-4 rounded-xl bg-teal-100 dark:bg-teal-900/30 w-fit mb-6">
            <Download className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Bulk Download</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Download all responses from multiple forms at once. Save time with batch operations.
          </p>
          <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Batch processing</span>
          </div>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-600">
          <div className="p-4 rounded-xl bg-pink-100 dark:bg-pink-900/30 w-fit mb-6">
            <Zap className="h-8 w-8 text-pink-600 dark:text-pink-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">API Access</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Full REST API access to programmatically manage forms and retrieve responses.
          </p>
          <div className="flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Coming soon</span>
          </div>
        </div>
      </div>

      <div className="card p-12 bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-500)] text-white text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Export Your Data Anytime</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Your data belongs to you. Export it in any format, whenever you need it.
        </p>
        <Link href="/register" className="btn bg-white text-[color:var(--brand-600)] hover:bg-slate-100 text-lg px-8 py-4 font-bold">
          Get Started Now
        </Link>
      </div>
    </main>
  );
}
