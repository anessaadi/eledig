import { unstable_setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import ModelsPreview from '@/components/sections/ModelsPreview';
import HowItWorks from '@/components/sections/HowItWorks';
import Options from '@/components/sections/Options';

export default function LandingPage({ params: { locale } }: { params: { locale: 'fr' | 'ar' } }) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Hero />
      <ModelsPreview locale={locale} />
      <HowItWorks />
      <Options />
    </>
  );
}
