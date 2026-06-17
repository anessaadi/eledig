'use client';
import { useState } from 'react';
import Image from 'next/image';
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

  const imgFor = (colorId: string) =>
    model.productNum
      ? `/productpics/template ${model.productNum} ${colorId}.webp`
      : (model.image ?? '/logo.webp');

  // Put selected color first, then the rest
  const orderedColors = [
    model.colors.find((c) => c.id === selectedId)!,
    ...model.colors.filter((c) => c.id !== selectedId),
  ].slice(0, 3);

  return (
    <div className="mt-8 max-w-lg mx-auto">
      {/* 3-image gallery */}
      {orderedColors.length === 1 ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-sand">
          <Image
            src={imgFor(orderedColors[0].id)}
            alt={model.name[locale]}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="flex gap-2 h-[420px]">
          {/* Main large image */}
          <div
            className="relative flex-[2] overflow-hidden rounded-3xl bg-sand cursor-pointer"
            onClick={() => setSelectedId(orderedColors[0].id)}
          >
            <Image
              key={orderedColors[0].id}
              src={imgFor(orderedColors[0].id)}
              alt={orderedColors[0].label[locale]}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Side smaller images */}
          <div className="flex flex-col gap-2 flex-1">
            {orderedColors.slice(1, 3).map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className="relative flex-1 overflow-hidden rounded-2xl bg-sand cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={imgFor(c.id)}
                  alt={c.label[locale]}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Color dots */}
      <div className="mt-4 flex justify-center gap-3">
        {model.colors.map((c) => (
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

      {/* Name & description */}
      <div className="mt-6">
        <h1 className="display text-4xl text-ink">{model.name[locale]}</h1>
        <p className="mt-3 leading-relaxed text-muted">{model.description[locale]}</p>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">{labels.languages}</p>
        <div className="mt-2 flex gap-2">
          {model.languages.map((l) => (
            <span
              key={l}
              className="rounded-full border border-line px-4 py-1.5 text-xs uppercase tracking-wider text-ink"
            >
              {l === 'fr' ? 'Français' : 'العربية'}
            </span>
          ))}
        </div>
      </div>

      {/* Price box */}
      <div className="mt-6 rounded-2xl border border-line p-5 flex gap-4 justify-between items-start">
        <div>
          <p className="display text-5xl text-ink">{model.price.toLocaleString('fr-FR')}</p>
          <p className="mt-1 text-sm text-muted font-medium">DZD</p>
        </div>
        <ul className="text-sm text-muted space-y-1.5 text-right">
          {locale === 'ar' ? (
            <>
              <li>✓ رابط شخصي</li>
              <li>✓ التوصيل خلال 24 ساعة</li>
              <li>✓ دعم واتساب</li>
            </>
          ) : (
            <>
              <li>✓ Lien personnalisé</li>
              <li>✓ Livraison sous 24h</li>
              <li>✓ Support WhatsApp</li>
            </>
          )}
        </ul>
      </div>

      {/* Demo buttons */}
      <div className="mt-8">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted mb-4">
          Voir la démo &mdash; نموذج الدعوة
        </p>
        <div className="space-y-3">
          <a
            href={`/fr/demo/${model.slug}?lang=fr&color=${selectedId}`}
            className="flex items-center justify-between w-full rounded-2xl border border-line px-5 py-4 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <span className="text-sm font-medium">Version française</span>
            <span className="text-xs text-muted">Voir en FR →</span>
          </a>
          {model.languages.includes('ar') && (
            <a
              href={`/ar/demo/${model.slug}?lang=ar&color=${selectedId}`}
              className="flex items-center justify-between w-full rounded-2xl border border-line px-5 py-4 text-ink transition-colors hover:border-accent hover:text-accent"
              dir="rtl"
            >
              <span className="text-sm font-medium">النسخة العربية</span>
              <span className="text-xs text-muted">← مشاهدة</span>
            </a>
          )}
        </div>
      </div>

      {/* Order button */}
      <div className="mt-6 mb-10">
        <ButtonLink href={labels.orderHref} variant="solid" className="w-full justify-center">
          {labels.order}
        </ButtonLink>
      </div>
    </div>
  );
}
