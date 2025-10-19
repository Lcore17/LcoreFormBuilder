
import './globals.css';
import Link from 'next/link';
import ThemeToggle from '../components/theme-toggle';
import UserMenu from '../components/user-menu';
import { FileText, Github, Twitter, Mail, Sparkles, BarChart3, Shield, Zap } from 'lucide-react';
import FooterAccountLinks from '../components/footer-account';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Lcore Forms',
  description: 'Enterprise-grade form builder',
};


import { ToastProvider } from '../components/ui/toast';
import { useAuthOptional } from '../lib/useAuthOptional';

export default function RootLayout({ children }: { children: ReactNode }) {
  // Note: Root layout is a server component by default; we won't rely on hooks here for nav.
  const isAuthenticated = false;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <header className="sticky top-0 z-50 border-b bg-white/90 dark:bg-[#0b1020]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 transition-all duration-300 shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-xl text-slate-900 dark:text-white group">
              <span className="inline-flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-500)] shadow-lg shadow-[color:var(--brand-600)]/30">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-[color:var(--brand-600)] via-[color:var(--brand-500)] to-[color:var(--brand-600)] bg-clip-text text-transparent font-extrabold tracking-tight">
                  Lcore Forms
                </span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link 
                href="/" 
                className="text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:scale-105"
              >
                Home
              </Link>
              <Link 
                href="/forms" 
                className="text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:scale-105"
              >
                Dashboard
              </Link>
              <Link 
                href="/forms/templates" 
                className="text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:scale-105 inline-flex items-center gap-1"
              >
                <Sparkles className="h-4 w-4" />
                Templates
              </Link>
              {!isAuthenticated && (
                <>
                  <Link 
                    href="/analytics" 
                    className="text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:scale-105 inline-flex items-center gap-1"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </Link>
                  <Link 
                    href="/integrations" 
                    className="text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:scale-105 inline-flex items-center gap-1"
                  >
                    <Zap className="h-4 w-4" />
                    Integrations
                  </Link>
                </>
              )}
            </nav>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </header>

        <ToastProvider>
          <main className="min-h-[calc(100vh-10rem)]">{children}</main>
        </ToastProvider>

        <footer className="border-t bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900">
          <div className="container py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl mb-5 group">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-500)] shadow-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-[color:var(--brand-600)] via-[color:var(--brand-500)] to-[color:var(--brand-600)] bg-clip-text text-transparent font-extrabold">
                    Lcore Forms
                  </span>
                </Link>
                <p className="text-base text-slate-600 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
                  The modern form builder with live preview, 8 templates, analytics, and seamless sharing. Build forms that convert.
                </p>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/Lcore17" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl hover:bg-[color:var(--brand-100)] dark:hover:bg-[color:var(--brand-900)] transition-all duration-200 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                  <a 
                    href="https://twitter.com/deltalcore" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl hover:bg-[color:var(--brand-100)] dark:hover:bg-[color:var(--brand-900)] transition-all duration-200 hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                  <a 
                    href="mailto:nikhiltandel2802@gmail.com"
                    className="p-2.5 rounded-xl hover:bg-[color:var(--brand-100)] dark:hover:bg-[color:var(--brand-900)] transition-all duration-200 hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                </div>
              </div>
              
              {/* Product Links */}
              <div>
                <h3 className="font-bold text-sm mb-5 text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[color:var(--brand-600)]" />
                  Product
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/forms" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/forms/templates" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link href="/forms/new" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
                      Create Form
                    </Link>
                  </li>
                  <li>
                    <Link href="/features" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
                      Features
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h3 className="font-bold text-sm mb-5 text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[color:var(--brand-600)]" />
                  Resources
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:nikhiltandel2802@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-400)] transition-all duration-200 hover:translate-x-1 inline-block">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Account Links */}
              <div>
                <h3 className="font-bold text-sm mb-5 text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[color:var(--brand-600)]" />
                  Account
                </h3>
                <FooterAccountLinks />
              </div>
            </div>
            
            <div className="border-t-2 border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} <span className="font-semibold text-[color:var(--brand-600)]">Lcore Forms</span>. Crafted with ❤️ by Lcore
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                <Shield className="h-3 w-3" />
                <span>Secured & Protected</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
