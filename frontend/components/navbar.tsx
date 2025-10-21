'use client';
import Link from 'next/link';
import { FileText, Menu, X } from 'lucide-react';
import UserMenu from './user-menu';
import ThemeToggle from './theme-toggle';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-lg sm:text-xl hover:text-[color:var(--brand-600)] transition-colors flex-shrink-0"
          >
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-[color:var(--brand-600)]" />
            <span className="hidden xs:inline">Lcore Forms</span>
            <span className="xs:hidden">Lcore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/features" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-500)] transition-colors"
            >
              Features
            </Link>
            <Link 
              href="/forms" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-500)] transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/integrations" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-500)] transition-colors"
            >
              Integrations
            </Link>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* Mobile Menu Button + Theme + User */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <UserMenu />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-1">
            <Link
              href="/features"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/forms"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/integrations"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Integrations
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
