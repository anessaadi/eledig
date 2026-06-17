import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { site } from '@/config/site';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col items-center gap-5 text-center">
          <Image src="/logo.webp" alt="L'élégance digitale" width={60} height={60} className="rounded-lg" />
          <p className="display text-2xl text-accent">L&apos;élégance digitale</p>
          <p className="max-w-md text-muted">{t('tagline')}</p>
          <div className="divider-gold w-40" />
          <div className="flex gap-7 text-sm uppercase tracking-[0.12em] text-muted">
            <a href="https://www.instagram.com/boutique.wardi" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">Instagram</a>
          </div>
          <p className="mt-4 text-xs text-muted/80">
            © {year} L&apos;élégance digitale. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
