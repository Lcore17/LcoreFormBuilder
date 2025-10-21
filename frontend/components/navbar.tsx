'use client';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import UserMenu from './user-menu';
import ThemeToggle from './theme-toggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-[color:var(--brand-600)] transition-colors">
            <FileText className="h-6 w-6 text-[color:var(--brand-600)]" />
            <span>Lcore Forms</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/features" className="hidden md:inline-flex text-sm font-medium hover:text-[color:var(--brand-600)] transition-colors">
              Features
            </Link>
            <Link href="/forms" className="hidden md:inline-flex text-sm font-medium hover:text-[color:var(--brand-600)] transition-colors">
              Dashboard
            </Link>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
