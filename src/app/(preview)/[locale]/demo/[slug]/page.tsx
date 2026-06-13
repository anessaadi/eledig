import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { MODELS, getModel } from '@/data/models';
import EnvelopeReveal from '@/components/invitation/EnvelopeReveal';
import InvitationTemplate from '@/components/invitation/templates/InvitationTemplate';

export function generateStaticParams() {
  return MODELS.map((m) => ({ slug: m.slug }));
}

// Sample data so people can preview the experience.
const SAMPLE = {
  fr: { bride: 'Amel', groom: 'Yanis', venue: 'Salle Les Jardins', city: 'Tlemcen',
        message: "C'est avec joie que nous vous invitons à partager ce moment unique.",
        time: '19h00', rsvpPhone: '+213000000000' },
  ar: { bride: 'أمل', groom: 'يانيس', venue: 'قاعة الحدائق', city: 'تلمسان',
        message: 'يسعدنا أن ندعوكم لمشاركتنا هذه اللحظة المميزة.',
        time: '19:00', rsvpPhone: '+213000000000' },
};

export default async function DemoPage({
  params: { locale, slug },
  searchParams,
}: {
  params: { locale: 'fr' | 'ar'; slug: string };
  searchParams: { lang?: string; color?: string };
}) {
  unstable_setRequestLocale(locale);
  const model = getModel(slug);
  if (!model) notFound();

  const demoLang = (searchParams.lang === 'ar' ? 'ar' : searchParams.lang === 'fr' ? 'fr' : locale) as 'fr' | 'ar';
  const t = await getTranslations({ locale: demoLang, namespace: 'demo' });
  const color = (searchParams.color ? model.colors.find((c) => c.id === searchParams.color) : null) ?? model.colors[0];
  const s = SAMPLE[demoLang];

  const inviteDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString();
  const templateEl = (
    <InvitationTemplate
      locale={demoLang}
      data={{ ...s, date: inviteDate }}
      style={{ variant: model.variant, bg: color.bg, ink: color.ink, accent: color.hex, colorId: color.id }}
    />
  );

  // These variants have their own built-in envelope animation.
  if (model.variant === 'royal-bordeaux' || model.variant === 'islamic' || model.variant === 'rosa' || model.variant === 'elegance' || model.variant === 'jardin' || model.variant === 'kabyle' || model.variant === 'golden' || model.variant === 'gala' || model.variant === 'mariage' || model.variant === 'galaxy') return templateEl;

  return (
    <EnvelopeReveal openLabel={t('open')} bg={color.bg} accent={color.hex} ink={color.ink}>
      <div className="relative">
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-black/30 px-4 py-1 text-xs uppercase tracking-widest text-white">
          {t('badge')}
        </div>
        {templateEl}
      </div>
    </EnvelopeReveal>
  );
}
