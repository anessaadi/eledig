'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Model } from '@/data/models';

function ExternalLinkIcon() {
  return (
    <svg
      className="inline-block h-3 w-3 ml-1 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

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

  const product = {
    name:        model.name[locale],
    description: model.description[locale],
    price:       model.price.toLocaleString('fr-FR'),
    currency:    locale === 'ar' ? 'دج' : 'DZD',
    features:    locale === 'ar'
      ? ['رابط شخصي', 'التوصيل خلال 24 ساعة', 'دعم واتساب']
      : ['Lien personnalisé', 'Livraison sous 24h', 'Support WhatsApp'],
    languages:   model.languages.map((l) => (l === 'fr' ? 'Français' : 'العربية')),
    colors:      model.colors,
    demoFrHref:  `/fr/demo/${model.slug}?lang=fr&color=${selectedId}`,
    demoArHref:  `/ar/demo/${model.slug}?lang=ar&color=${selectedId}`,
    hasAr:       model.languages.includes('ar'),
    image:       model.productNum
      ? `/productpics/template ${model.productNum} ${selectedId}.webp`
      : (model.image ?? '/logo.webp'),
  };

  return (
    <>
      {/* Extra bottom padding so the sticky CTA never covers content */}
      <div className="mt-8 max-w-lg mx-auto pb-28">

        {/* ── Block A: Hero ── */}
        <section>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-sand">
            <Image
              key={selectedId}
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Color picker */}
          <div className="mt-4 flex justify-center gap-3">
            {product.colors.map((c) => (
              <button
                key={c.id}
                title={c.label[locale]}
                onClick={() => setSelectedId(c.id)}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  c.id === selectedId ? 'border-ink scale-110' : 'border-transparent'
                }`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </section>

        {/* ── Block B: Info ── */}
        <section className="mt-8">
          <h1 className="display text-4xl text-ink">{product.name}</h1>
          <p className="mt-3 leading-relaxed text-muted">{product.description}</p>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-2">
            <span className="display text-5xl font-bold text-ink">{product.price}</span>
            <span className="text-lg font-semibold text-muted">{product.currency}</span>
          </div>

          {/* Language pills */}
          <div className="mt-4 flex gap-2">
            {product.languages.map((l) => (
              <span
                key={l}
                className="rounded-full border border-line px-4 py-1.5 text-xs uppercase tracking-wider text-ink"
              >
                {l}
              </span>
            ))}
          </div>
        </section>

        {/* ── Block C: Value / Features ── */}
        <section className="mt-8 rounded-2xl border border-line p-5">
          <ul className="space-y-3">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-ink">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Block D: Demo buttons ── */}
        <section className="mt-8">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted mb-4">
            Voir la démo &mdash; نموذج الدعوة
          </p>
          <div className="space-y-3">
            <a
              href={product.demoFrHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full rounded-2xl border border-line px-5 py-4 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <span className="text-sm font-medium">Version française</span>
              <span className="text-xs text-muted">Voir en FR <ExternalLinkIcon /></span>
            </a>

            {product.hasAr && (
              <a
                href={product.demoArHref}
                target="_blank"
                rel="noreferrer"
                dir="rtl"
                className="flex items-center justify-between w-full rounded-2xl border border-line px-5 py-4 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <span className="text-sm font-medium">النسخة العربية</span>
                <span className="text-xs text-muted"><ExternalLinkIcon /> مشاهدة</span>
              </a>
            )}
          </div>
        </section>
      </div>

      {/* ── Sticky CTA: Order button ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm px-4 py-3"
        style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}
      >
        <a
          href={labels.orderHref}
          className="flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          {labels.order}
        </a>
      </div>
    </>
  );
}
