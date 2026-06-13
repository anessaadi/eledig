import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { whatsappLink } from '@/config/site';

export default async function Options() {
  const t = await getTranslations('options');
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Reveal className="text-center">
        <h2 className="display text-3xl text-ink md:text-4xl">{t('title')}</h2>
        <div className="divider-gold mx-auto mt-6 w-24" />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="card-lux h-full rounded-3xl p-8 text-center">
            <h3 className="display text-2xl text-ink">{t('classic.title')}</h3>
            <p className="mt-4 text-muted">{t('classic.text')}</p>
            <div className="mt-7"><ButtonLink href="/modeles" variant="solid">{t('classic.cta')}</ButtonLink></div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl border border-gold/60 p-8 text-center"
               style={{ background: 'linear-gradient(180deg, #fffcf9 0%, #f7f2ea 100%)' }}>
            <h3 className="display text-2xl text-ink">{t('custom.title')}</h3>
            <p className="mt-4 text-muted">{t('custom.text')}</p>
            <div className="mt-7">
              <ButtonLink href={whatsappLink('Bonjour, je souhaite un faire-part sur-mesure')} variant="solid">
                {t('custom.cta')}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
