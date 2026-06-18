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

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function Field({ label, value, link, linkColor = 'blue' }: { label: string; value?: string | null; link?: string; linkColor?: 'blue' | 'green' }) {
  if (!value) return null;
  const colorClass = linkColor === 'green' ? 'text-green-400 hover:text-green-300' : 'text-blue-400 hover:text-blue-300';
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-0.5">{label}</p>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className={`text-xs ${colorClass} block truncate`} title={value}>{value}</a>
      ) : (
        <p className="text-xs text-gray-300 truncate" title={value}>{value}</p>
      )}
    </div>
  );
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
  const [showDetails, setShowDetails] = useState(false);

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
    <div className="flex flex-col gap-4">

      {/* Global toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowDetails(v => !v)}
          className="text-xs px-3 py-1.5 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          {showDetails ? 'Vue simplifiée' : 'Voir les détails'}
        </button>
      </div>

      {/* ── SIMPLE TABLE ── */}
      {!showDetails && (
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
                const invUrl = `${siteUrl}/i/${inv.slug}`;
                return (
                  <tr key={inv.slug} className="border-b border-gray-800/60 hover:bg-gray-900/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-200">{names}</td>
                    <td className="px-4 py-3">
                      {inv.data.rsvpPhone ? (
                        <a href={`https://wa.me/${inv.data.rsvpPhone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-xs text-green-400 hover:text-green-300">
                          {inv.data.rsvpPhone}
                        </a>
                      ) : <span className="text-xs text-gray-700">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{VARIANT_LABELS[inv.variant] ?? inv.variant}</td>
                    <td className="px-4 py-3"><span className="text-xs uppercase tracking-wider text-gray-400">{inv.locale}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full" style={{ background: inv.accent }} />
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
                      <button onClick={() => handleCopy(inv.slug)} className="text-xs text-gray-400 hover:text-white transition-colors" title={invUrl}>
                        {copied === inv.slug ? <span className="text-green-400">✓ Copié</span> : <span>Copier le lien</span>}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a href={invUrl} target="_blank" rel="noreferrer" className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">Voir</a>
                        <a href={`/admin/edit/${inv.slug}`} className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">Modifier</a>
                        <button onClick={() => handleToggle(inv.slug)} disabled={busy || isExpired} className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-40 transition-colors">
                          {busy ? '…' : inv.active ? 'Désactiver' : 'Activer'}
                        </button>
                        <button onClick={() => handleDelete(inv.slug, names)} disabled={busy} className="rounded px-3 py-1 text-xs border border-red-900/50 text-red-400 hover:bg-red-900/20 disabled:opacity-40 transition-colors">
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
      )}

      {/* ── DETAILED CARDS ── */}
      {showDetails && invitations.map((inv) => {
        const names = `${inv.data.bride} & ${inv.data.groom}`;
        const busy = loadingSlug === inv.slug;
        const isExpired = new Date(inv.expiresAt) < new Date();
        const invUrl = `${siteUrl}/i/${inv.slug}`;

        return (
          <div key={inv.slug} className="rounded-xl border border-gray-800 bg-gray-900/40 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-800/60">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-block w-3 h-3 rounded-full shrink-0" style={{ background: inv.accent }} />
                <h3 className="font-semibold text-gray-100 truncate">{names}</h3>
                <span className="text-xs text-gray-600 shrink-0">
                  {VARIANT_LABELS[inv.variant] ?? inv.variant} · {inv.locale.toUpperCase()} · {inv.colorId}
                </span>
              </div>
              <div className="shrink-0">
                {isExpired ? (
                  <span className="rounded-full bg-red-900/30 text-red-400 px-2.5 py-1 text-xs">Expiré</span>
                ) : inv.active ? (
                  <span className="rounded-full bg-green-900/30 text-green-400 px-2.5 py-1 text-xs">Actif</span>
                ) : (
                  <span className="rounded-full bg-gray-800 text-gray-500 px-2.5 py-1 text-xs">Inactif</span>
                )}
              </div>
            </div>

            {/* Data grid */}
            <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4">
              <Field label="Date du mariage" value={fmtDate(inv.data.date)} />
              <Field label="Heure" value={inv.data.time} />
              <Field label="Salle" value={inv.data.venue} />
              <Field label="Ville" value={inv.data.city} />
              <Field label="WhatsApp" value={inv.data.rsvpPhone} link={inv.data.rsvpPhone ? `https://wa.me/${inv.data.rsvpPhone.replace(/\D/g, '')}` : undefined} linkColor="green" />
              <Field label="Lien carte" value={inv.data.mapLinkUrl} link={inv.data.mapLinkUrl ?? undefined} />
              <Field label="Créée le" value={fmt(inv.createdAt)} />
              <Field label="Expire le" value={fmt(inv.expiresAt)} />
            </div>

            {/* Images */}
            {inv.images && Object.keys(inv.images).length > 0 && (
              <div className="px-5 pb-4">
                <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-2">Images uploadées</p>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(inv.images).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 group" title={url}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={key} className="w-14 h-14 object-cover rounded border border-gray-700 group-hover:border-gray-500 transition-colors" />
                      <span className="text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors max-w-[56px] truncate">{key}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-gray-800/60 bg-gray-900/30">
              <button onClick={() => handleCopy(inv.slug)} className="text-xs text-gray-400 hover:text-white transition-colors" title={invUrl}>
                {copied === inv.slug ? <span className="text-green-400">✓ Lien copié</span> : <span>Copier le lien</span>}
              </button>
              <div className="flex items-center gap-2">
                <a href={invUrl} target="_blank" rel="noreferrer" className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">Voir</a>
                <a href={`/admin/edit/${inv.slug}`} className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">Modifier</a>
                <button onClick={() => handleToggle(inv.slug)} disabled={busy || isExpired} className="rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-40 transition-colors">
                  {busy ? '…' : inv.active ? 'Désactiver' : 'Activer'}
                </button>
                <button onClick={() => handleDelete(inv.slug, names)} disabled={busy} className="rounded px-3 py-1 text-xs border border-red-900/50 text-red-400 hover:bg-red-900/20 disabled:opacity-40 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
