import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';

export default async function HowItWorks() {
  const t = await getTranslations('how');
  const steps = ['1', '2', '3', '4', '5'] as const;
  return (
    <section id="comment" className="bg-sand py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <h2 className="display text-3xl text-ink md:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-muted">{t('subtitle')}</p>
          <div className="divider-gold mx-auto mt-6 w-24" />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 0.08}>
              <div className="card-lux h-full rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-gold text-gold display text-xl">
                  {s}
                </div>
                <h3 className="display text-lg text-ink">{t(`steps.${s}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">{t(`steps.${s}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
