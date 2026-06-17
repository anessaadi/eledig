'use client';

import { useState, useRef } from 'react';
import { MODELS } from '@/data/models';
import type { Model } from '@/data/models';

type Step = 1 | 2 | 3 | 4 | 5;

type ProgrammeItem = { time: string; label: string };

type State = {
  step: Step;
  model: Model | null;
  colorId: string;
  locale: 'fr' | 'ar';
  bride: string;
  groom: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  rsvpPhone: string;
  mapUrl: string;
  programme: ProgrammeItem[];
  deleteAfterDays: number;
  imageFiles: Record<string, File>;
  imagePreviews: Record<string, string>;
  resultUrl: string;
  submitting: boolean;
  error: string;
};

const DEFAULT_PROGRAMME: Record<'fr' | 'ar', ProgrammeItem[]> = {
  fr: [
    { time: '10h00', label: 'Début de la soirée' },
    { time: '12h00', label: 'Le Dîner' },
    { time: '14h00', label: 'Le Cortège' },
    { time: '20h00', label: 'Clôture de la soirée' },
  ],
  ar: [
    { time: '10h00', label: 'بداية الحفلة' },
    { time: '12h00', label: 'الأكل' },
    { time: '14h00', label: 'الكورتاج' },
    { time: '20h00', label: 'نهاية الحفلة' },
  ],
};

const INIT: State = {
  step: 1,
  model: null,
  colorId: '',
  locale: 'fr',
  bride: '',
  groom: '',
  date: '',
  time: '',
  venue: '',
  city: '',
  rsvpPhone: '',
  mapUrl: '',
  programme: DEFAULT_PROGRAMME.fr.map((p) => ({ ...p })),
  deleteAfterDays: 7,
  imageFiles: {},
  imagePreviews: {},
  resultUrl: '',
  submitting: false,
  error: '',
};

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i + 1 <= step ? 'bg-gray-400' : 'bg-gray-800'
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-2 shrink-0">{step} / {total}</span>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">{children}</label>;
}

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:border-gray-500 focus:outline-none transition-colors text-sm ${className}`}
    />
  );
}

function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:border-gray-500 focus:outline-none transition-colors text-sm resize-none ${className}`}
    />
  );
}

function NextBtn({ onClick, disabled, children }: { onClick?: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg bg-gray-700 px-6 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-600 disabled:opacity-40 transition-colors"
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-gray-700 px-6 py-2.5 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
    >
      ← Retour
    </button>
  );
}

export default function NewInvitationPage() {
  const [s, setS] = useState<State>(INIT);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function set(patch: Partial<State>) {
    setS((prev) => ({ ...prev, ...patch }));
  }

  // Step 1: pick template
  function pickModel(model: Model) {
    const color = model.colors[0];
    set({ model, colorId: color.id, step: 2 });
  }

  // Step 4 → submit
  async function handleSubmit() {
    if (!s.model) return;
    set({ submitting: true, error: '' });

    try {
      // Upload images
      const images: Record<string, string> = {};
      for (const [slot, file] of Object.entries(s.imageFiles)) {
        const form = new FormData();
        form.append('file', file);
        form.append('slot', slot);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
        if (!res.ok) throw new Error(`Échec upload ${slot}`);
        const { url } = await res.json();
        images[slot] = url;
      }

      // Create invitation
      const res = await fetch('/api/admin/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelSlug: s.model.slug,
          colorId: s.colorId,
          locale: s.locale,
          bride: s.bride,
          groom: s.groom,
          date: s.date,
          time: s.time,
          venue: s.venue,
          city: s.city,
          rsvpPhone: s.rsvpPhone,
          mapUrl: s.mapUrl || undefined,
          programme: s.programme.some((p) => p.label.trim()) ? s.programme.filter((p) => p.label.trim()) : undefined,
          deleteAfterDays: s.deleteAfterDays,
          images,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Erreur serveur');
      }

      const { url } = await res.json();
      set({ resultUrl: url, step: 5, submitting: false });
    } catch (err) {
      set({ error: (err as Error).message, submitting: false });
    }
  }

  function handleFileChange(slot: string, file: File | null) {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    set({
      imageFiles: { ...s.imageFiles, [slot]: file },
      imagePreviews: { ...s.imagePreviews, [slot]: preview },
    });
  }

  const slots = s.model?.imageSlots ?? [];
  const hasImages = slots.length > 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-light tracking-wide text-gray-100">Nouvelle invitation</h1>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8">
        <StepIndicator step={s.step} total={hasImages || s.step >= 4 ? 5 : 4} />

        {/* ── Step 1: Template ── */}
        {s.step === 1 && (
          <div>
            <h2 className="text-lg font-light text-gray-200 mb-6">Choisir un modèle</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {MODELS.map((model) => (
                <button
                  key={model.slug}
                  type="button"
                  onClick={() => pickModel(model)}
                  className="rounded-xl border border-gray-800 overflow-hidden text-left hover:border-gray-600 transition-colors group"
                >
                  {model.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={model.image}
                      alt={model.name.fr}
                      className="w-full aspect-[3/4] object-cover group-hover:opacity-90 transition-opacity"
                    />
                  )}
                  <div className="px-3 py-2.5 bg-gray-900">
                    <p className="text-sm font-medium text-gray-200">{model.name.fr}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{model.colors.length} couleur{model.colors.length > 1 ? 's' : ''}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Color + Language ── */}
        {s.step === 2 && s.model && (
          <div>
            <h2 className="text-lg font-light text-gray-200 mb-6">Couleur & langue — {s.model.name.fr}</h2>

            <div className="mb-6">
              <Label>Couleur</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                {s.model.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => set({ colorId: color.id })}
                    className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                      s.colorId === color.id
                        ? 'border-gray-400 text-gray-100'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <span
                      className="inline-block w-3.5 h-3.5 rounded-full ring-1 ring-white/10"
                      style={{ background: color.hex }}
                    />
                    {color.label.fr}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <Label>Langue</Label>
              <div className="flex gap-3 mt-2">
                {s.model.languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => set({ locale: lang })}
                    className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors ${
                      s.locale === lang
                        ? 'border-gray-400 text-gray-100 bg-gray-800'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {lang === 'fr' ? 'Français' : 'عربي'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <BackBtn onClick={() => set({ step: 1 })} />
              <NextBtn onClick={() => set({ step: 3, programme: DEFAULT_PROGRAMME[s.locale].map((p) => ({ ...p })) })}>Suivant →</NextBtn>
            </div>
          </div>
        )}

        {/* ── Step 3: Couple data ── */}
        {s.step === 3 && (
          <div>
            <h2 className="text-lg font-light text-gray-200 mb-6">Informations du couple</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Prénom de la mariée</Label>
                <Input value={s.bride} onChange={(e) => set({ bride: e.target.value })} placeholder="Amira" />
              </div>
              <div>
                <Label>Prénom du marié</Label>
                <Input value={s.groom} onChange={(e) => set({ groom: e.target.value })} placeholder="Karim" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Date du mariage</Label>
                <Input type="date" value={s.date} onChange={(e) => set({ date: e.target.value })} />
              </div>
              <div>
                <Label>Heure</Label>
                <Input type="time" value={s.time} onChange={(e) => set({ time: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Salle / Lieu</Label>
                <Input value={s.venue} onChange={(e) => set({ venue: e.target.value })} placeholder="Salle Les Jardins" />
              </div>
              <div>
                <Label>Ville</Label>
                <Input value={s.city} onChange={(e) => set({ city: e.target.value })} placeholder="Tlemcen" />
              </div>
            </div>

            <div className="mb-4">
              <Label>Lien de localisation Google Maps (optionnel)</Label>
              <Input
                value={s.mapUrl}
                onChange={(e) => set({ mapUrl: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="text-xs text-gray-600 mt-1">Tout lien Google Maps accepté (lien court, lien de partage…) — la carte sera convertie automatiquement.</p>

            </div>

            <div className="mb-4">
              <Label>Programme</Label>
              <div className="flex flex-col gap-2 mt-2">
                {s.programme.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <div className="w-24 shrink-0">
                      <Input
                        value={item.time}
                        onChange={(e) => {
                          const prog = s.programme.map((p, j) => j === i ? { ...p, time: e.target.value } : p);
                          set({ programme: prog });
                        }}
                        placeholder="18h00"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        value={item.label}
                        onChange={(e) => {
                          const prog = s.programme.map((p, j) => j === i ? { ...p, label: e.target.value } : p);
                          set({ programme: prog });
                        }}
                        placeholder={`Étape ${i + 1} (ex: Cérémonie de Nikah)`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => set({ programme: s.programme.filter((_, j) => j !== i) })}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-500 hover:border-red-800 hover:text-red-400 transition-colors text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => set({ programme: [...s.programme, { time: '', label: '' }] })}
                className="mt-2 rounded-lg border border-dashed border-gray-700 px-4 py-2 text-xs text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors"
              >
                + Ajouter une étape
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <Label>WhatsApp du client</Label>
                <Input value={s.rsvpPhone} onChange={(e) => set({ rsvpPhone: e.target.value })} placeholder="+213 555 000 000" />
              </div>
              <div>
                <Label>Supprimer après (jours post-mariage)</Label>
                <Input
                  type="number"
                  min={1}
                  max={365}
                  value={s.deleteAfterDays}
                  onChange={(e) => set({ deleteAfterDays: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <BackBtn onClick={() => set({ step: 2 })} />
              <NextBtn
                onClick={() => hasImages ? set({ step: 4 }) : handleSubmit()}
                disabled={!s.bride || !s.groom || !s.date || s.submitting}
              >
                {s.submitting ? 'Création en cours…' : hasImages ? 'Suivant →' : 'Créer l\'invitation'}
              </NextBtn>
            </div>
          </div>
        )}

        {/* ── Step 4: Images ── */}
        {s.step === 4 && hasImages && (
          <div>
            <h2 className="text-lg font-light text-gray-200 mb-2">Images personnalisées</h2>
            <p className="text-sm text-gray-500 mb-6">Toutes les images sont optionnelles — le modèle utilise ses images par défaut si non renseignées.</p>

            <div className="flex flex-col gap-6 mb-8">
              {slots.map((slot) => (
                <div key={slot.key}>
                  <Label>{slot.label}</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => fileRefs.current[slot.key]?.click()}
                      className="rounded-lg border border-dashed border-gray-700 px-5 py-3 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {s.imageFiles[slot.key] ? '↺ Changer' : '+ Choisir un fichier'}
                    </button>
                    <input
                      ref={(el) => { fileRefs.current[slot.key] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(slot.key, e.target.files?.[0] ?? null)}
                    />
                    {s.imagePreviews[slot.key] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={s.imagePreviews[slot.key]}
                        alt={slot.label}
                        className="h-16 w-16 rounded-lg object-cover border border-gray-700"
                      />
                    )}
                    {s.imageFiles[slot.key] && (
                      <span className="text-xs text-gray-500 truncate max-w-[140px]">
                        {s.imageFiles[slot.key].name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {s.error && <p className="text-sm text-red-400 mb-4">{s.error}</p>}

            <div className="flex gap-3">
              <BackBtn onClick={() => set({ step: 3 })} />
              <NextBtn onClick={handleSubmit} disabled={s.submitting}>
                {s.submitting ? 'Création en cours…' : 'Créer l\'invitation'}
              </NextBtn>
            </div>
          </div>
        )}

        {/* ── Step 5: Success ── */}
        {s.step === 5 && s.resultUrl && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-900/30 border border-green-800 mb-6">
              <span className="text-2xl text-green-400">✓</span>
            </div>
            <h2 className="text-xl font-light text-gray-100 mb-2">Invitation créée !</h2>
            <p className="text-sm text-gray-500 mb-6">Partagez ce lien avec le couple.</p>

            <div className="flex items-center gap-2 rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 mb-6">
              <span className="flex-1 text-sm text-gray-300 truncate text-left">{s.resultUrl}</span>
              <CopyButton text={s.resultUrl} />
            </div>

            <div className="flex gap-3 justify-center">
              <a
                href={s.resultUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
              >
                Voir l'invitation ↗
              </a>
              <button
                type="button"
                onClick={() => setS(INIT)}
                className="rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-600 transition-colors"
              >
                Créer une autre
              </button>
              <a
                href="/admin/dashboard"
                className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
              >
                Dashboard
              </a>
            </div>
          </div>
        )}

        {/* Step 3 → direct submit (no images) */}
        {s.step === 3 && !hasImages && s.error && (
          <p className="text-sm text-red-400 mt-4">{s.error}</p>
        )}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="shrink-0 rounded px-3 py-1 text-xs border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
    >
      {copied ? '✓ Copié' : 'Copier'}
    </button>
  );
}
