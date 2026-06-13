import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import '../../globals.css';
import { routing } from '@/i18n/routing';
import { playfair, cormorant, zain, elMessiri, komediaBlack } from '@/app/fonts';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PreviewLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as 'fr' | 'ar')) notFound();
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontVars = `${playfair.variable} ${cormorant.variable} ${zain.variable} ${elMessiri.variable} ${komediaBlack.variable}`;
  const localeClass = locale === 'ar' ? 'locale-ar' : 'locale-fr';

  return (
    <html lang={locale} dir={dir} className={`${fontVars} ${localeClass}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
