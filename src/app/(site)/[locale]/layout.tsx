import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../../globals.css';
import { routing } from '@/i18n/routing';
import { playfair, cormorant, zain, elMessiri, komediaBlack, arefRuqaa } from '@/app/fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "L'élégance digitale — Faire-part de mariage digitaux",
  description: 'Faire-part de mariage digitaux, élégants et bilingues (français / arabe).',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as 'fr' | 'ar')) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontVars = `${playfair.variable} ${cormorant.variable} ${zain.variable} ${elMessiri.variable} ${komediaBlack.variable} ${arefRuqaa.variable}`;
  const localeClass = locale === 'ar' ? 'locale-ar' : 'locale-fr';

  return (
    <html lang={locale} dir={dir} className={`${fontVars} ${localeClass}`}>
      <body className="min-h-screen bg-cream text-ink site-layout">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
