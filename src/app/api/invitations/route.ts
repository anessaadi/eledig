import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { insertInvitation, type Invitation } from '@/lib/db';
import { getModel } from '@/data/models';
import { site } from '@/config/site';

function makeSlug() {
  return randomBytes(12).toString('base64url');
}

export async function POST(req: Request) {
  const b = await req.json();
  const model = getModel(String(b.modelSlug));
  if (!model) return NextResponse.json({ error: 'bad model' }, { status: 400 });
  const color = model.colors.find((c) => c.id === b.colorId) ?? model.colors[0];

  if (!b.bride || !b.groom || !b.date) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  }

  const weddingDate = new Date(b.date);
  const expires = new Date(weddingDate);
  expires.setDate(expires.getDate() + Math.max(1, Number(b.deleteAfterDays) || 7));

  const inv: Invitation = {
    slug: makeSlug(),
    variant: model.variant,
    colorId: color.id,
    bg: color.bg,
    ink: color.ink,
    accent: color.hex,
    locale: b.locale === 'ar' ? 'ar' : 'fr',
    active: true,
    images: {},
    data: {
      bride: String(b.bride),
      groom: String(b.groom),
      date: weddingDate.toISOString(),
      time: String(b.time ?? ''),
      venue: String(b.venue ?? ''),
      city: String(b.city ?? ''),
      message: String(b.message ?? ''),
      rsvpPhone: String(b.rsvpPhone ?? ''),
    },
    weddingDate: weddingDate.toISOString(),
    expiresAt: expires.toISOString(),
    createdAt: new Date().toISOString(),
  };

  await insertInvitation(inv);
  return NextResponse.json({ url: `${site.url}/i/${inv.slug}` });
}
