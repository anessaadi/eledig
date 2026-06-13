import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/Button';

export default async function Hero() {
  const t = await getTranslations('hero');
  return (
    <section className="hero-wash">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <div className="absolute inset-0 rounded-[2rem] border border-gold/50" />
          <div className="absolute inset-4 grid place-items-center rounded-[1.6rem] bg-ivory shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <Image src="/logo.png" alt="L'élégance digitale" width={210} height={210} priority />
          </div>
        </div>
        <div className="animate-fade-up">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-muted">{t('tagline')}</p>
          <h1 className="display text-4xl leading-tight text-ink md:text-6xl">{t('title')}</h1>
          <p className="mt-6 max-w-md text-lg text-muted">{t('description')}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/modeles" variant="solid">{t('ctaModels')}</ButtonLink>
            <ButtonLink href="#comment" variant="outline">{t('ctaHow')}</ButtonLink>
          </div>
        </div>
        
      </div>
    </section>
  );
}
