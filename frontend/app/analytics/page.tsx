'use client';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  PieChart, 
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function AnalyticsPage() {
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
          <BarChart3 className="h-8 w-8 text-[color:var(--brand-600)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Powerful{' '}
          <span className="bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-400)] bg-clip-text text-transparent">
            Analytics
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Track, analyze, and optimize your forms with comprehensive insights and real-time data
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-100">
          <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 w-fit mb-6">
            <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Real-time Tracking</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Monitor form submissions as they happen. See live response counts, completion rates, and trends without refreshing.
          </p>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-200">
          <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-900/30 w-fit mb-6">
            <PieChart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Visual Reports</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Beautiful charts and graphs that make data easy to understand. Export reports for presentations and meetings.
          </p>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-300">
          <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 w-fit mb-6">
            <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">User Insights</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Understand your audience better. See demographic data, response patterns, and user behavior analytics.
          </p>
        </div>

        <div className="card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-400">
          <div className="p-4 rounded-xl bg-amber-100 dark:bg-amber-900/30 w-fit mb-6">
            <Calendar className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Historical Data</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Access complete history of all form responses. Compare performance across different time periods.
          </p>
        </div>
      </div>

      <div className="card p-12 bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-500)] text-white text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Key Metrics at a Glance</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3" />
            <div className="text-2xl font-bold">Total Forms</div>
            <p className="text-sm opacity-90 mt-2">Track all your active forms</p>
          </div>
          <div>
            <Clock className="h-12 w-12 mx-auto mb-3" />
            <div className="text-2xl font-bold">Response Time</div>
            <p className="text-sm opacity-90 mt-2">Average completion time</p>
          </div>
          <div>
            <TrendingUp className="h-12 w-12 mx-auto mb-3" />
            <div className="text-2xl font-bold">Conversion Rate</div>
            <p className="text-sm opacity-90 mt-2">Form completion percentage</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/register" className="btn btn-primary text-lg px-8 py-4">
          Start Tracking Now
        </Link>
      </div>
    </main>
  );
}
