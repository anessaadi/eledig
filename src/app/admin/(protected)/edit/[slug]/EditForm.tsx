'use client';

import { useState, useRef } from 'react';
import { MODELS } from '@/data/models';
import type { Invitation } from '@/lib/db';

type ProgrammeItem = { time: string; label: string };

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">
      {children}
    </label>
  );
}

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:border-gray-500 focus:outline-none transition-colors text-sm ${className}`}
    />
  );
}


function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-light text-gray-300 pb-2 border-b border-gray-800 mb-4">
      {children}
    </h2>
  );
}

export default function EditForm({ invitation }: { invitation: Invitation }) {
  const model = MODELS.find((m) => m.variant === invitation.variant) ?? null;
  const slots = model?.imageSlots ?? [];

  const [colorId, setColorId] = useState(invitation.colorId);
  const [bg,      setBg     ] = useState(invitation.bg);
  const [ink,     setInk    ] = useState(invitation.ink);
  const [accent,  setAccent ] = useState(invitation.accent);
  const [locale,  setLocale ] = useState<'fr' | 'ar'>(invitation.locale);

  const [bride,     setBride    ] = useState(invitation.data.bride);
  const [groom,     setGroom    ] = useState(invitation.data.groom);
  const [date,      setDate     ] = useState(invitation.data.date.split('T')[0]);
  const [time,      setTime     ] = useState(invitation.data.time     ?? '');
  const [venue,     setVenue    ] = useState(invitation.data.venue    ?? '');
  const [city,      setCity     ] = useState(invitation.data.city     ?? '');
  const [rsvpPhone, setRsvpPhone] = useState(invitation.data.rsvpPhone ?? '');
  const [mapUrl,    setMapUrl   ] = useState(
    invitation.data.mapLinkUrl ?? invitation.data.mapUrl ?? ''
  );
  const [programme, setProgramme] = useState<ProgrammeItem[]>(
    invitation.data.programme ?? []
  );

  const [imageFiles,    setImageFiles   ] = useState<Record<string, File>>({});
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    { ...invitation.images }
  );

  const [submitting, setSubmitting] = useState(false);
  const [error,      setError     ] = useState('');
  const [saved,      setSaved     ] = useState(false);

  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function pickColor(c: { id: string; hex: string; bg: string; ink: string }) {
    setColorId(c.id);
    setBg(c.bg);
    setInk(c.ink);
    setAccent(c.hex);
  }

  function handleFileChange(slot: string, file: File | null) {
    if (!file) return;
    setImageFiles((prev) => ({ ...prev, [slot]: file }));
    setImagePreviews((prev) => ({ ...prev, [slot]: URL.createObjectURL(file) }));
  }

  async function handleSave() {
    setSubmitting(true);
    setError('');
    setSaved(false);

    try {
      // Upload any new image files
      const images: Record<string, string> = { ...invitation.images };
      for (const [slot, file] of Object.entries(imageFiles)) {
        const form = new FormData();
        form.append('file', file);
        form.append('slot', slot);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
        if (!res.ok) throw new Error(`Échec upload ${slot}`);
        const { url } = await res.json();
        images[slot] = url;
      }

      const res = await fetch(`/api/admin/invitations/${invitation.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          colorId, bg, ink, accent, locale,
          bride, groom, date, time, venue, city, rsvpPhone,
          mapUrl: mapUrl || undefined,
          programme: programme.some((p) => p.label.trim())
            ? programme.filter((p) => p.label.trim())
            : undefined,
          images,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Erreur serveur');
      }

      setSaved(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8 space-y-8">

      {/* ── Colour & Language ── */}
      {model && (
        <div>
          <SectionTitle>Couleur &amp; Langue</SectionTitle>

          <div className="mb-4">
            <Label>Couleur</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {model.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => pickColor(c)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    colorId === c.id
                      ? 'border-gray-400 text-gray-100'
                      : 'border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full ring-1 ring-white/10"
                    style={{ background: c.hex }}
                  />
                  {c.label.fr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Langue</Label>
            <div className="flex gap-2 mt-2">
              {model.languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  className={`rounded-lg border px-5 py-2 text-sm transition-colors ${
                    locale === lang
                      ? 'border-gray-400 text-gray-100 bg-gray-800'
                      : 'border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {lang === 'fr' ? 'Français' : 'عربي'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Couple data ── */}
      <div>
        <SectionTitle>Informations du couple</SectionTitle>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Prénom de la mariée</Label>
            <Input value={bride} onChange={(e) => setBride(e.target.value)} placeholder="Amira" />
          </div>
          <div>
            <Label>Prénom du marié</Label>
            <Input value={groom} onChange={(e) => setGroom(e.target.value)} placeholder="Karim" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Date du mariage</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <Label>Heure</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Salle / Lieu</Label>
            <Input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Salle Les Jardins" />
          </div>
          <div>
            <Label>Ville</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Tlemcen" />
          </div>
        </div>

        <div className="mb-4">
          <Label>Lien Google Maps (optionnel)</Label>
          <Input
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            placeholder="https://maps.app.goo.gl/..."
          />
          <p className="text-xs text-gray-600 mt-1">
            Tout lien Google Maps accepté — la carte sera convertie automatiquement.
          </p>
        </div>

        <div className="mb-4">
          <Label>Programme</Label>
          <div className="flex flex-col gap-2 mt-2">
            {programme.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-24 shrink-0">
                  <Input
                    value={item.time}
                    onChange={(e) =>
                      setProgramme((prev) =>
                        prev.map((p, j) => (j === i ? { ...p, time: e.target.value } : p))
                      )
                    }
                    placeholder="18h00"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={item.label}
                    onChange={(e) =>
                      setProgramme((prev) =>
                        prev.map((p, j) => (j === i ? { ...p, label: e.target.value } : p))
                      )
                    }
                    placeholder={`Étape ${i + 1}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setProgramme((prev) => prev.filter((_, j) => j !== i))}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-500 hover:border-red-800 hover:text-red-400 transition-colors text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setProgramme((prev) => [...prev, { time: '', label: '' }])}
            className="mt-2 rounded-lg border border-dashed border-gray-700 px-4 py-2 text-xs text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors"
          >
            + Ajouter une étape
          </button>
        </div>

        <div>
          <Label>WhatsApp du client</Label>
          <Input
            value={rsvpPhone}
            onChange={(e) => setRsvpPhone(e.target.value)}
            placeholder="+213 555 000 000"
          />
        </div>
      </div>

      {/* ── Images ── */}
      {slots.length > 0 && (
        <div>
          <SectionTitle>Images</SectionTitle>
          <div className="flex flex-col gap-4">
            {slots.map((slot) => (
              <div key={slot.key}>
                <Label>{slot.label}</Label>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => fileRefs.current[slot.key]?.click()}
                    className="rounded-lg border border-dashed border-gray-700 px-5 py-3 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {imageFiles[slot.key]
                      ? '↺ Changer'
                      : imagePreviews[slot.key]
                      ? '↺ Remplacer'
                      : '+ Choisir'}
                  </button>
                  <input
                    ref={(el) => { fileRefs.current[slot.key] = el; }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(slot.key, e.target.files?.[0] ?? null)}
                  />
                  {imagePreviews[slot.key] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreviews[slot.key]}
                      alt={slot.label}
                      className="h-16 w-16 rounded-lg object-cover border border-gray-700"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Feedback ── */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && (
        <p className="text-sm text-green-400">✓ Invitation mise à jour avec succès.</p>
      )}

      {/* ── Actions ── */}
      <div className="flex gap-3 pt-2 flex-wrap">
        <a
          href="/admin/dashboard"
          className="rounded-lg border border-gray-700 px-6 py-2.5 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          ← Retour
        </a>
        <button
          type="button"
          onClick={handleSave}
          disabled={submitting || !bride || !groom || !date}
          className="rounded-lg bg-gray-700 px-6 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-600 disabled:opacity-40 transition-colors"
        >
          {submitting ? 'Enregistrement…' : 'Enregistrer les modifications'}
        </button>
        <a
          href={`/i/${invitation.slug}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-gray-700 px-6 py-2.5 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          Voir l'invitation ↗
        </a>
      </div>
    </div>
  );
}
