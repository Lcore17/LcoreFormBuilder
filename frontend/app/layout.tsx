import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Lcore Form Builder - Create Dynamic Forms',
  description: 'Build, customize, and manage forms with ease. Powerful form builder with real-time preview.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
