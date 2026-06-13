'use client';
import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import type { Model } from '@/data/models';

export default function ProductDetail({
  model,
  locale,
  labels,
}: {
  model: Model;
  locale: 'fr' | 'ar';
  labels: {
    colors: string;
    languages: string;
    price: string;
    demoFr: string;
    demoAr: string;
    order: string;
    orderHref: string;
  };
}) {
  const [selectedId, setSelectedId] = useState(model.colors[0].id);
  const selected = model.colors.find((c) => c.id === selectedId) ?? model.colors[0];

  return (
    <div className="mt-8 grid gap-10 md:grid-cols-2">
      {/* Color preview cards */}
      <div className="grid grid-cols-2 gap-4">
        {model.colors.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`overflow-hidden rounded-2xl border-2 transition-all ${c.id === selectedId ? 'border-accent' : 'border-line'}`}
          >
            <div
              className="grid aspect-[4/5] place-items-center p-5 text-center"
              style={{ background: c.bg, color: c.ink }}
            >
              <div>
                <p className="display text-2xl">{model.name[locale]}</p>
                <div className="mx-auto my-2 h-px w-10" style={{ background: c.ink, opacity: 0.4 }} />
                <p className="text-[0.65rem] uppercase tracking-widest" style={{ opacity: 0.7 }}>
                  {c.label[locale]}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Details */}
      <div>
        <h1 className="display text-4xl text-ink md:text-5xl">{model.name[locale]}</h1>
        <p className="mt-5 leading-relaxed text-muted">{model.description[locale]}</p>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{labels.colors}</p>
            <div className="mt-2 flex gap-2">
              {model.colors.map((c) => (
                <button
                  key={c.id}
                  title={c.label[locale]}
                  onClick={() => setSelectedId(c.id)}
                  className={`h-6 w-6 rounded-full border-2 transition-all ${c.id === selectedId ? 'border-ink' : 'border-line'}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{labels.languages}</p>
            <div className="mt-2 flex gap-2">
              {model.languages.map((l) => (
                <span key={l} className="rounded-full border border-line px-3 py-1 text-xs uppercase text-muted">
                  {l === 'fr' ? 'FR' : 'العربية'}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{labels.price}</p>
            <p className="display mt-1 text-3xl text-ink">{model.price.toLocaleString('fr-FR')} DZD</p>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={`/demo/${model.slug}?lang=fr&color=${selectedId}`} variant="outline">
            {labels.demoFr}
          </ButtonLink>
          {model.languages.includes('ar') && (
            <ButtonLink href={`/demo/${model.slug}?lang=ar&color=${selectedId}`} variant="outline">
              {labels.demoAr}
            </ButtonLink>
          )}
        </div>
        <div className="mt-4">
          <ButtonLink href={labels.orderHref} variant="solid" className="w-full sm:w-auto">
            {labels.order}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
