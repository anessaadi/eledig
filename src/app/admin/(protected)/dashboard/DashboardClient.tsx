'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Invitation } from '@/lib/db';

const VARIANT_LABELS: Record<string, string> = {
  'jardin':         'Jardin',
  'galaxy':         'Galaxy',
  'mariage':        'Mariage',
  'kabyle':         'Kabyle',
  'golden':         'Golden',
  'gala':           'Gala',
  'royal-bordeaux': 'Dentelle',
  'rosa':           'Rosa',
  'elegance':       'Élégance',
  'islamic':        'Islamique',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function DashboardClient({
  invitations,
  siteUrl,
}: {
  invitations: Invitation[];
  siteUrl: string;
}) {
  const router = useRouter();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleToggle(slug: string) {
    setLoadingSlug(slug);
    await fetch(`/api/admin/invitations/${slug}`, { method: 'PATCH' });
    router.refresh();
    setLoadingSlug(null);
  }

  async function handleDelete(slug: string, names: string) {
    if (!window.confirm(`Supprimer l'invitation de ${names} ? Cette action est irréversible.`)) return;
    setLoadingSlug(slug);
    await fetch(`/api/admin/invitations/${slug}`, { method: 'DELETE' });
    router.refresh();
    setLoadingSlug(null);
  }

  async function handleCopy(slug: string) {
    const url = `${siteUrl}/i/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  }

  if (invitations.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-16 text-center">
        <p className="text-gray-500 text-sm">Aucune invitation générée.</p>
        <a href="/admin/new" className="mt-4 inline-block text-sm text-gray-400 hover:text-white underline underline-offset-2">
          Créer la première
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900/60">
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Couple</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">WhatsApp</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Modèle</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Langue</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Couleur</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Créée</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Expire</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Statut</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-500 font-medium">Lien</th>
            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-500 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => {
            const names = `${inv.data.bride} & ${inv.data.groom}`;
            const busy = loadingSlug === inv.slug;
            const isExpired = new Date(inv.expiresAt) < new Date();
            return (
              <tr key={inv.slug} className="border-b border-gray-800/60 hover:bg-gray-900/40 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-200">{names}</td>
                <td className="px-4 py-3">
                  {inv.data.rsvpPhone ? (
                    <a
                      href={`https://wa.me/${inv.data.rsvpPhone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-green-400 hover:text-green-300 transition-colors"
                    >
                      {inv.data.rsvpPhone}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-700">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-400">{VARIANT_LABELS[inv.variant] ?? inv.variant}</td>
                <td className="px-4 py-3">
                  <span className="text-xs uppercase tracking-wider text-gray-400">{inv.locale}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ background: inv.accent }}
                    />
                    <span className="text-gray-400 text-xs">{inv.colorId}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{fmt(inv.createdAt)}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  <span className={isExpired ? 'text-red-400' : ''}>{fmt(inv.expiresAt)}</span>
                </td>
                <td className="px-4 py-3">
                  {isExpired ? (
                    <span className="rounded-full bg-red-900/30 text-red-400 px-2.5 py-1 text-xs">Expiré</span>
                  ) : inv.active ? (
                    <span className="rounded-full bg-green-900/30 text-green-400 px-2.5 py-1 text-xs">Actif</span>
                  ) : (
                    <span className="rounded-full bg-gray-800 text-gray-500 px-2.5 py-1 text-xs">Inactif</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleCopy(inv.slug)}
                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                    title={`${siteUrl}/i/${inv.slug}`}
                  >
                    {copied === inv.slug ? (
                      <span className="text-green-400">✓ Copié</span>
                    ) : (
                      <span>Copier le lien</span>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/admin/edit/${inv.slug}`}
                      className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                    >
                      Modifier
                    </a>
                    <button
                      onClick={() => handleToggle(inv.slug)}
                      disabled={busy || isExpired}
                      className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-40 transition-colors"
                    >
                      {busy ? '…' : inv.active ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      onClick={() => handleDelete(inv.slug, names)}
                      disabled={busy}
                      className="rounded px-3 py-1 text-xs border border-red-900/50 text-red-400 hover:bg-red-900/20 disabled:opacity-40 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
