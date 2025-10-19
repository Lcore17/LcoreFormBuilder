"use client";
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { useAuthOptional } from '../lib/useAuthOptional';
import { CheckCircle2, BarChart3, Eye, Share2, ShieldCheck, Zap, FileText, PenTool, ArrowRight, Sparkles, Users, Clock, Globe, Lock, Palette, Download } from 'lucide-react';

export default function HomePage() {
  const { isChecking, isAuthenticated } = useAuthOptional();
  return (
    <main>
      {/* Hero Section */}
      <section className="container py-20 md:py-32 hero-gradient relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[color:var(--brand-200)] dark:bg-[color:var(--brand-900)] rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[color:var(--brand-300)] dark:bg-[color:var(--brand-800)] rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="badge text-xs bg-gradient-to-r from-[color:var(--brand-100)] to-[color:var(--brand-50)] dark:from-[color:var(--brand-900)] dark:to-[color:var(--brand-800)] border border-[color:var(--brand-200)] dark:border-[color:var(--brand-700)]">
                <Sparkles className="h-3 w-3 text-[color:var(--brand-600)]" />
                8 Professional Templates Included
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Build forms that{' '}
              <span className="bg-gradient-to-r from-[color:var(--brand-600)] via-[color:var(--brand-500)] to-[color:var(--brand-400)] bg-clip-text text-transparent animate-gradient">
                convert
              </span>
            </h1>
            
            <p className="text-xl muted max-w-lg leading-relaxed">
              Create stunning forms in minutes with our intuitive builder. Real-time preview, powerful analytics, and seamless sharing—all in one platform.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              {isChecking ? (
                <div className="btn btn-outline text-lg px-8 py-4 opacity-70 cursor-wait">Checking session…</div>
              ) : isAuthenticated ? (
                <>
                  <Link href="/forms" className="btn btn-primary text-lg px-8 py-4 shadow-lg shadow-[color:var(--brand-600)]/30 hover:shadow-xl hover:shadow-[color:var(--brand-600)]/40 group">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link href="/forms/new" className="btn btn-outline text-lg px-8 py-4">
                    Create Form
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register" className="btn btn-primary text-lg px-8 py-4 shadow-lg shadow-[color:var(--brand-600)]/30 hover:shadow-xl hover:shadow-[color:var(--brand-600)]/40 group">
                    Get Started Free
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link href="/login" className="btn btn-outline text-lg px-8 py-4">
                    Login
                  </Link>
                </>
              )}
              <Link href="#features" className="btn btn-outline text-lg px-8 py-4">
                Explore Features
              </Link>
            </div>
            
            <div className="flex items-center gap-10 pt-6 flex-wrap">
              <div className="animate-scale-in animation-delay-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-500)] bg-clip-text text-transparent">10k+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Forms Created</div>
              </div>
              <div className="animate-scale-in animation-delay-200">
                <div className="text-3xl font-bold bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-500)] bg-clip-text text-transparent">50k+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Responses</div>
              </div>
              <div className="animate-scale-in animation-delay-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-500)] bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in-up animation-delay-200">
            <div className="card p-8 bg-gradient-to-br from-white via-[color:var(--brand-50)] to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] border-2 border-[color:var(--brand-100)] dark:border-[color:var(--brand-900)]">
              {/* Preview Only Badge */}
              <div className="absolute top-4 right-4 animate-pulse-slow z-10">
                <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 font-medium">
                  <Eye className="h-3 w-3" />
                  Live Preview
                </span>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[color:var(--brand-400)] rounded-full opacity-10 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[color:var(--brand-600)] rounded-full opacity-10 blur-2xl"></div>
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center gap-4 pb-4 border-b-2 border-[color:var(--brand-200)] dark:border-[color:var(--brand-800)]">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-500)] shadow-lg">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xl text-slate-900 dark:text-white">Contact Us Today</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">We'd love to hear from you</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2 animate-slide-in-left animation-delay-100">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        disabled 
                        placeholder="John Doe"
                        className="w-full h-11 rounded-lg bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 px-4 text-sm transition-all duration-200 hover:border-[color:var(--brand-400)] focus:border-[color:var(--brand-500)] focus:ring-2 focus:ring-[color:var(--brand-200)]" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 animate-slide-in-left animation-delay-200">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="email" 
                        disabled 
                        placeholder="john@example.com"
                        className="w-full h-11 rounded-lg bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 px-4 text-sm transition-all duration-200 hover:border-[color:var(--brand-400)] focus:border-[color:var(--brand-500)] focus:ring-2 focus:ring-[color:var(--brand-200)]" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 animate-slide-in-left animation-delay-300">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      disabled 
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      className="w-full rounded-lg bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 px-4 py-3 text-sm resize-none transition-all duration-200 hover:border-[color:var(--brand-400)] focus:border-[color:var(--brand-500)] focus:ring-2 focus:ring-[color:var(--brand-200)]"
                    />
                  </div>
                  
                  <button 
                    disabled 
                    className="w-full h-12 rounded-lg bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-500)] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[color:var(--brand-600)]/30 cursor-not-allowed animate-slide-in-left animation-delay-400 hover:shadow-xl transition-all duration-300"
                    title="Sign up to create real forms!"
                  >
                    <PenTool className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <Lock className="h-3 w-3 text-slate-400" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Secured by Lcore Forms • Sign up to create your own
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="container pb-24 pt-16">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="badge text-sm">
              <Zap className="h-4 w-4 text-[color:var(--brand-600)]" />
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Everything you need in{' '}
            <span className="bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--brand-400)] bg-clip-text text-transparent">
              one place
            </span>
          </h2>
          <p className="text-xl muted max-w-3xl mx-auto leading-relaxed">
            Build professional forms with our complete toolkit. No coding required.
          </p>
        </div>
        
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-100 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Live Preview</h3>
              <p className="text-base muted leading-relaxed">
                Watch your form come to life in real-time. Every change you make is instantly reflected in the preview.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-200 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">8 Ready Templates</h3>
              <p className="text-base muted leading-relaxed">
                Start fast with pre-built templates for contact forms, surveys, registrations, and more.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-300 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <BarChart3 className="h-8 w-8 text-emerald-600 dark:text-emerald-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Analytics Dashboard</h3>
              <p className="text-base muted leading-relaxed">
                Track form performance with detailed analytics. See submissions, trends, and insights at a glance.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-400 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Download className="h-8 w-8 text-amber-600 dark:text-amber-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Export Data</h3>
              <p className="text-base muted leading-relaxed">
                Download responses in CSV or JSON format. Perfect for analysis, reporting, and integration.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-500 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Globe className="h-8 w-8 text-pink-600 dark:text-pink-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Share Anywhere</h3>
              <p className="text-base muted leading-relaxed">
                Generate unique links for each form. Share via email, social media, or embed on your website.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-600 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <ShieldCheck className="h-8 w-8 text-indigo-600 dark:text-indigo-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Secure & Private</h3>
              <p className="text-base muted leading-relaxed">
                Bank-level security with JWT authentication. Your data is encrypted and protected 24/7.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-100 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/30 dark:to-slate-700/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Palette className="h-8 w-8 text-slate-600 dark:text-slate-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Dark Mode</h3>
              <p className="text-base muted leading-relaxed">
                Beautiful dark mode included. Easy on the eyes, perfect for night work. Switches automatically.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-200 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Clock className="h-8 w-8 text-teal-600 dark:text-teal-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Real-time Updates</h3>
              <p className="text-base muted leading-relaxed">
                See responses as they come in. No refresh needed. Stay updated with instant notifications.
              </p>
            </div>
          </li>
          
          <li className="card p-8 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animation-delay-300 group border-2 border-transparent hover:border-[color:var(--brand-200)] dark:hover:border-[color:var(--brand-800)]">
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
              <CheckCircle2 className="h-8 w-8 text-orange-600 dark:text-orange-400"/>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Responsive Design</h3>
              <p className="text-base muted leading-relaxed">
                Perfect on any device. Mobile, tablet, or desktop—your forms look amazing everywhere.
              </p>
            </div>
          </li>
        </ul>
      </section>
      
      {/* CTA Section */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand-600)] via-[color:var(--brand-500)] to-[color:var(--brand-600)] animate-gradient"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          
          <div className="relative z-10 p-12 md:p-16 lg:p-20 text-center text-white">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6">
                <span className="badge bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium">
                  <Users className="h-4 w-4" />
                  Join 10,000+ users
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                Ready to build amazing forms?
              </h2>
              
              <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
                Start creating beautiful, professional forms in minutes. No credit card required.
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center">
                {isChecking ? (
                  <div className="btn bg-white/60 text-[color:var(--brand-700)] cursor-wait text-lg px-10 py-4 font-bold">Checking session…</div>
                ) : isAuthenticated ? (
                  <>
                    <Link href="/forms" className="btn bg-white text-[color:var(--brand-600)] hover:bg-slate-100 hover:scale-105 text-lg px-10 py-4 font-bold shadow-2xl group">
                      Go to Dashboard
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                    <Link href="/forms/new" className="btn border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 text-lg px-10 py-4 font-bold">
                      Create Form
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/register" className="btn bg-white text-[color:var(--brand-600)] hover:bg-slate-100 hover:scale-105 text-lg px-10 py-4 font-bold shadow-2xl group">
                      Start For Free
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                    <Link href="/login" className="btn border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 text-lg px-10 py-4 font-bold">
                      Login
                    </Link>
                  </>
                )}
                <Link href="/forms/templates" className="btn border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 text-lg px-10 py-4 font-bold">
                  View Templates
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-12 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
