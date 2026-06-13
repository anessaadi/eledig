import { getTranslations } from 'next-intl/server';
import { MODELS } from '@/data/models';
import ModelCard from '@/components/models/ModelCard';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

export default async function ModelsPreview({ locale }: { locale: 'fr' | 'ar' }) {
  const t = await getTranslations('modelsPreview');
  const featured = MODELS.slice(0, 4);
  return (
    <section id="modeles" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal className="text-center">
        <h2 className="display text-3xl text-ink md:text-4xl">{t('title')}</h2>
        <p className="mt-3 text-muted">{t('subtitle')}</p>
        <div className="divider-gold mx-auto mt-6 w-24" />
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {featured.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.08}>
            <ModelCard model={m} locale={locale} />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <ButtonLink href="/modeles" variant="outline">{t('all')}</ButtonLink>
      </div>
    </section>
  );
}
