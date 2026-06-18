import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MODELS } from '@/data/models';
import ModelCard from '@/components/models/ModelCard';
import Reveal from '@/components/ui/Reveal';

export default async function ModelesPage({ params: { locale } }: { params: { locale: 'fr' | 'ar' } }) {
  setRequestLocale(locale);
  const t = await getTranslations('models');
  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-16">
      <Reveal className="text-center">
        <h1 className="display text-4xl text-ink md:text-5xl">{t('title')}</h1>
        <p className="mt-3 text-muted">{t('subtitle')}</p>
        <div className="divider-gold mx-auto mt-6 w-24" />
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {MODELS.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.06}>
            <ModelCard model={m} locale={locale} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
