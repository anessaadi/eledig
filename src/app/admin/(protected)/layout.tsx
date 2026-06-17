import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/admin-auth';
import '../../globals.css';

export const metadata = {
  title: 'Admin — Élégance Digitale',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const ok = await getServerSession();
  if (!ok) redirect('/admin/login');

  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-950 text-gray-100">
        <nav className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Élégance Digitale
            </span>
            <a href="/admin/dashboard"
               className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
              Dashboard
            </a>
            <a href="/admin/new"
               className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
              + Nouvelle invitation
            </a>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </nav>
        <main className="mx-auto max-w-7xl p-6">{children}</main>
      </body>
    </html>
  );
}
