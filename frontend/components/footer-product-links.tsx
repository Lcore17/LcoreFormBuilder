'use client';
import Link from 'next/link';

export default function FooterProductLinks() {
  return (
    <div>
      <h3 className="font-semibold mb-4">Product</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="/features" className="muted hover:text-[color:var(--brand-600)] transition-colors">Features</Link></li>
        <li><Link href="/forms/templates" className="muted hover:text-[color:var(--brand-600)] transition-colors">Templates</Link></li>
        <li><Link href="/integrations" className="muted hover:text-[color:var(--brand-600)] transition-colors">Integrations</Link></li>
        <li><Link href="/analytics" className="muted hover:text-[color:var(--brand-600)] transition-colors">Analytics</Link></li>
      </ul>
    </div>
  );
}
