import { getTranslations } from 'next-intl/server';
import ReactDOM from 'react-dom';
import { findInvitation } from '@/lib/db';
import { getEnvelopeImageUrls } from '@/lib/envelopePreloads';
import EnvelopeReveal from '@/components/invitation/EnvelopeReveal';
import InvitationTemplate from '@/components/invitation/templates/InvitationTemplate';
import InvitationLoader from '@/components/invitation/InvitationLoader';
import Expired from './not-found';

// Always rendered on demand so expiry is checked at request time.
export const dynamic = 'force-dynamic';

export default async function LiveInvitation({ params: { slug } }: { params: { slug: string } }) {
  const inv = await findInvitation(slug);

  // Not found, expired, or disabled -> show the expired/not-found screen.
  if (!inv || new Date(inv.expiresAt) < new Date() || inv.active === false) {
    return <Expired />;
  }

  // Preload the envelope panel images so they arrive before the hero image.
  // ReactDOM.preload injects <link rel="preload" fetchpriority="high"> into the
  // HTML <head> during SSR, giving the browser maximum lead time to fetch them.
  for (const src of getEnvelopeImageUrls(inv.variant, inv.colorId)) {
    (ReactDOM as unknown as { preload: (href: string, opts: { as: string; fetchPriority: string }) => void })
      .preload(src, { as: 'image', fetchPriority: 'high' });
  }

  const envelopeUrls = getEnvelopeImageUrls(inv.variant, inv.colorId);

  const template = (
    <InvitationLoader bg={inv.bg} accent={inv.accent} waitFor={envelopeUrls}>
      <InvitationTemplate
        locale={inv.locale}
        data={inv.data}
        style={{ variant: inv.variant, bg: inv.bg, ink: inv.ink, accent: inv.accent, colorId: inv.colorId }}
        customImages={inv.images}
      />
    </InvitationLoader>
  );

  // These variants have their own built-in envelope animation — skip the generic wrapper.
  if (inv.variant === 'royal-bordeaux' || inv.variant === 'islamic' || inv.variant === 'rosa' || inv.variant === 'elegance' || inv.variant === 'jardin' || inv.variant === 'kabyle' || inv.variant === 'golden' || inv.variant === 'gala' || inv.variant === 'mariage' || inv.variant === 'galaxy') return template;

  const t = await getTranslations({ locale: inv.locale, namespace: 'invitation' });

  return (
    <EnvelopeReveal openLabel={t('open')} bg={inv.bg} accent={inv.accent} ink={inv.ink}>
      {template}
    </EnvelopeReveal>
  );
}
