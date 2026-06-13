import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { MODELS, getModel } from '@/data/models';
import { Link } from '@/i18n/navigation';
import { whatsappLink } from '@/config/site';
import ProductDetail from '@/components/models/ProductDetail';

export function generateStaticParams() {
  return MODELS.map((m) => ({ slug: m.slug }));
}

export default async function ProductPage({
  params: { locale, slug },
}: {
  params: { locale: 'fr' | 'ar'; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const model = getModel(slug);
  if (!model) notFound();
  const t = await getTranslations('product');

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/modeles" className="text-sm uppercase tracking-widest text-accent hover:text-accent-hover">
        ← {t('back')}
      </Link>

      <ProductDetail
        model={model}
        locale={locale}
        labels={{
          colors: t('colors'),
          languages: t('languages'),
          price: t('price'),
          demoFr: t('demoFr'),
          demoAr: t('demoAr'),
          order: t('order'),
          orderHref: whatsappLink(`${t('orderMessage')} « ${model.name[locale]} »`),
        }}
      />
    </div>
  );
}
