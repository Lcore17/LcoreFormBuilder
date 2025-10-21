'use client';
import Link from 'next/link';
import { FileText, Mail, Github, Twitter } from 'lucide-react';
import FooterAccountLinks from './footer-account';
import FooterProductLinks from './footer-product-links';

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <FileText className="h-5 w-5 text-[color:var(--brand-600)]" />
              <span>Lcore Forms</span>
            </Link>
            <p className="text-sm muted">
              Build beautiful forms in minutes. Powerful, easy to use, and free to start.
            </p>
            <div className="flex gap-3">
              <a href="mailto:nikhiltandel2802@gmail.com" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://github.com/Lcore17" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/deltalcore" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <FooterProductLinks />

          {/* Account Links */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <FooterAccountLinks />
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="muted hover:text-[color:var(--brand-600)] transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="muted hover:text-[color:var(--brand-600)] transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center text-sm muted">
          <p>&copy; 2025 Lcore Forms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
