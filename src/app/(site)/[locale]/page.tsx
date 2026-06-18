import { setRequestLocale } from 'next-intl/server';
import ModelsPreview from '@/components/sections/ModelsPreview';
import HowItWorks from '@/components/sections/HowItWorks';
import Options from '@/components/sections/Options';

export default function LandingPage({ params: { locale } }: { params: { locale: 'fr' | 'ar' } }) {
  setRequestLocale(locale);
  return (
    <>
      <ModelsPreview locale={locale} />
      <HowItWorks />
      <Options />
    </>
  );
}
