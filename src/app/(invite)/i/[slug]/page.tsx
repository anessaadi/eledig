import { getTranslations } from 'next-intl/server';
import { findInvitation } from '@/lib/db';
import EnvelopeReveal from '@/components/invitation/EnvelopeReveal';
import InvitationTemplate from '@/components/invitation/templates/InvitationTemplate';
import Expired from './not-found';

// Always rendered on demand so expiry is checked at request time.
export const dynamic = 'force-dynamic';

export default async function LiveInvitation({ params: { slug } }: { params: { slug: string } }) {
  const inv = await findInvitation(slug);

  // Not found OR expired -> show the expired/not-found screen.
  if (!inv || new Date(inv.expiresAt) < new Date()) {
    return <Expired />;
  }

  const template = (
    <InvitationTemplate
      locale={inv.locale}
      data={inv.data}
      style={{ variant: inv.variant, bg: inv.bg, ink: inv.ink, accent: inv.accent, colorId: inv.colorId }}
    />
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
