'use client';
import Link from 'next/link';
import { FileText, Menu, X, Home, LayoutDashboard, BarChart3, Sparkles, Layers, BookOpen, Puzzle, HelpCircle } from 'lucide-react';
import UserMenu from './user-menu';
import ThemeToggle from './theme-toggle';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/forms', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/features', label: 'Features', icon: Sparkles },
    { href: '/forms/templates', label: 'Templates', icon: Layers },
    { href: '/integrations', label: 'Integrations', icon: Puzzle },
    { href: '/features/guide', label: 'Guide', icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-lg sm:text-xl hover:text-[color:var(--brand-600)] transition-colors flex-shrink-0"
          >
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-[color:var(--brand-600)]" />
            <span className="hidden sm:inline">Lcore Forms</span>
            <span className="sm:hidden">Lcore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[color:var(--brand-600)] dark:hover:text-[color:var(--brand-500)] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* Mobile Menu Button + Theme + User */}
          <div className="flex lg:hidden items-center gap-2">
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
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
