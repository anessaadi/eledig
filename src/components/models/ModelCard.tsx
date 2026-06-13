import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Model } from '@/data/models';

export default async function ModelCard({ model, locale }: { model: Model; locale: 'fr' | 'ar' }) {
  const t = await getTranslations('models');
  const cover = model.colors[0];

  return (
    <article className="group overflow-hidden rounded-xl">
      {/* Thumbnail */}
      <Link href={`/modeles/${model.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          {model.image ? (
            <Image
              src={model.image}
              alt={model.name[locale]}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{ background: cover.bg }}
            />
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="px-1 pb-3 pt-3 text-center">
        {/* Name */}
        <h3 className="display text-base text-ink">{model.name[locale]}</h3>

        {/* Color swatches */}
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          {model.colors.map((c) => (
            <span
              key={c.id}
              title={c.label[locale]}
              className="h-3 w-3 rounded-full border border-line"
              style={{ background: c.hex }}
            />
          ))}
        </div>

        {/* Price + details link */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-accent">{model.price.toLocaleString()} DZD</span>
          <Link
            href={`/modeles/${model.slug}`}
            className="text-xs text-accent transition-opacity hover:opacity-70"
          >
            {t('viewDetails')} →
          </Link>
        </div>
      </div>
    </article>
  );
}