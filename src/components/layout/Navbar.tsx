import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LangSwitcher from './LangSwitcher';

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations('nav');
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="L'Élégance Digitale" width={42} height={42}
                 className="rounded-md" priority />
          <span className="display hidden text-lg text-accent sm:inline text-[#550309]">L&apos;Élégance Digitale</span>
        </Link>
        <div className="flex items-center gap-7">
          <Link href="/modeles" className="text-sm uppercase tracking-[0.12em] text-ink/80 transition-colors hover:text-accent">
            {t('models')}
          </Link>
          <Link href="/#comment" className="text-sm uppercase tracking-[0.12em] text-ink/80 transition-colors hover:text-accent">
            {t('how')}
          </Link>
          <LangSwitcher />
        </div>
      </nav>
    </header>
  );
}
