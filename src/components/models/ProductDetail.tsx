'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Model } from '@/data/models';

function ExternalLinkIcon() {
  return (
    <svg
      className="inline-block h-4 w-4 ml-2"
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
    name:       model.name[locale],
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

          <div className="mt-4 flex justify-center gap-3">
            {product.colors.map((c) => (
              <button
                key={c.id}
                title={c.label[locale]}
                onClick={() => setSelectedId(c.id)}
                className={`h-8 w-8 rounded-full border-2 transition-all ${
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

          <div className="mt-5 flex items-baseline gap-2">
            <span className="display text-5xl font-bold text-ink">{product.price}</span>
            <span className="text-lg font-semibold text-muted">{product.currency}</span>
          </div>
        </section>
        {/* ── Block D: Enhanced Demo Buttons ── */}
        <section className="mt-10">

          <div className="grid gap-3">
            <a
              href={product.demoFrHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full rounded-2xl bg-ink px-6 py-4 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="font-semibold">{locale === 'ar' ? 'شاهد النسخة الفرنسية' : 'Voir la version française'}</span>
              <ExternalLinkIcon />
            </a>

            {product.hasAr && (
              <a
                href={product.demoArHref}
                target="_blank"
                rel="noreferrer"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                className="flex items-center justify-between w-full rounded-2xl bg-accent px-6 py-4 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-semibold">{locale === 'ar' ? 'شاهد النسخة العربية' : 'Voir la version arabe'}</span>
                <ExternalLinkIcon />
              </a>
            )}
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

        
      </div>

      {/* ── Sticky CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm px-4 py-3"
        style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}
      >
        <a
          href={labels.orderHref}
          className="flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-white font-bold transition-all hover:brightness-110 active:scale-[0.99]"
          style={{ background: '#25D366' }}
        >
          <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.428a.5.5 0 00.612.612l5.565-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.5-5.25-1.373l-.377-.218-3.9 1.034 1.036-3.887-.224-.386A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          {labels.order}
        </a>
      </div>
    </>
  );
}