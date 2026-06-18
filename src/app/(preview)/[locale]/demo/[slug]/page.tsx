import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ReactDOM from 'react-dom';
import { MODELS, getModel } from '@/data/models';
import { getEnvelopeImageUrls } from '@/lib/envelopePreloads';
import EnvelopeReveal from '@/components/invitation/EnvelopeReveal';
import InvitationTemplate from '@/components/invitation/templates/InvitationTemplate';
import InvitationLoader from '@/components/invitation/InvitationLoader';

export function generateStaticParams() {
  return MODELS.map((m) => ({ slug: m.slug }));
}

// Sample data so people can preview the experience.
const SAMPLE = {
  fr: {
    bride: 'Amel', groom: 'Yanis', venue: 'Salle Des Fêtes Afrah', city: 'Tlemcen',
    message: "C'est avec joie que nous vous invitons à partager ce moment unique.",
    time: '10:00', rsvpPhone: '+213000000000',
    mapUrl: 'https://maps.app.goo.gl/TzSydGsCSKUuQ8Mu6',
    programme: [
      { time: '10h00', label: 'Début de la soirée' },
      { time: '12h00', label: 'Le Dîner' },
      { time: '14h00', label: 'Le Cortège' },
      { time: '20h00', label: 'Clôture de la soirée' },
    ],
  },
  ar: {
    bride: 'أمل', groom: 'يانيس', venue: 'قاعة الأفراح', city: 'تلمسان',
    message: 'يسعدنا أن ندعوكم لمشاركتنا هذه اللحظة المميزة.',
    time: '10:00', rsvpPhone: '+213000000000',
    mapUrl: 'https://maps.app.goo.gl/TzSydGsCSKUuQ8Mu6',
    programme: [
      { time: '10h00', label: 'بداية الحفلة' },
      { time: '12h00', label: 'الأكل' },
      { time: '14h00', label: 'الكورتاج' },
      { time: '20h00', label: 'نهاية الحفلة' },
    ],
  },
};

export default async function DemoPage({
  params: { locale, slug },
  searchParams,
}: {
  params: { locale: 'fr' | 'ar'; slug: string };
  searchParams: { lang?: string; color?: string };
}) {
  setRequestLocale(locale);
  const model = getModel(slug);
  if (!model) notFound();

  const demoLang = (searchParams.lang === 'ar' ? 'ar' : searchParams.lang === 'fr' ? 'fr' : locale) as 'fr' | 'ar';
  const t = await getTranslations({ locale: demoLang, namespace: 'demo' });
  const color = (searchParams.color ? model.colors.find((c) => c.id === searchParams.color) : null) ?? model.colors[0];
  const s = SAMPLE[demoLang];

  for (const src of getEnvelopeImageUrls(model.variant, color.id)) {
    (ReactDOM as unknown as { preload: (href: string, opts: { as: string; fetchPriority: string }) => void })
      .preload(src, { as: 'image', fetchPriority: 'high' });
  }

  const DATE_OVERRIDES: Record<string, string> = {
    'islamic-or': '2026-08-03',
    'rosa': '2026-08-06',
    'elegance': '2026-08-05',
    'kabyle': '2026-07-25',
    'golden': '2026-08-27',
  };
  const inviteDate = DATE_OVERRIDES[slug] ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString();
  const envelopeUrls = getEnvelopeImageUrls(model.variant, color.id);

  const templateEl = (
    <InvitationLoader bg={color.bg} accent={color.hex} waitFor={envelopeUrls}>
      <InvitationTemplate
        locale={demoLang}
        data={{ ...s, date: inviteDate }}
        style={{ variant: model.variant, bg: color.bg, ink: color.ink, accent: color.hex, colorId: color.id }}
      />
    </InvitationLoader>
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
