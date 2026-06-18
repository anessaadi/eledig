import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { getRequestSession } from '@/lib/admin-auth';
import { listAll, insertInvitation, type Invitation } from '@/lib/db';
import { getModel } from '@/data/models';
import { site } from '@/config/site';

function deny() {
  return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!getRequestSession(req)) return deny();
  const all = await listAll();
  return NextResponse.json(all);
}

async function resolveMapUrl(url: string): Promise<string> {
  if (!url) return url;
  if (url.includes('/maps/embed') || url.includes('output=embed')) return url;
  if (url.includes('@') && url.includes('google.com/maps')) return url;
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
    const finalUrl = res.url;
    if (finalUrl.includes('@') || finalUrl.includes('?q=')) return finalUrl;
    const placeMatch = finalUrl.match(/\/maps\/place\/([^/?]+)/);
    if (placeMatch) return `https://maps.google.com/maps?q=${placeMatch[1]}&output=embed`;
  } catch {}
  return url;
}

export async function POST(req: NextRequest) {
  if (!getRequestSession(req)) return deny();

  const b = await req.json();
  const model = getModel(String(b.modelSlug));
  if (!model) return NextResponse.json({ error: 'Modèle introuvable' }, { status: 400 });

  const color = model.colors.find((c) => c.id === b.colorId) ?? model.colors[0];

  if (!b.bride || !b.groom || !b.date) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
  }

  const weddingDate = new Date(b.date);
  const expires = new Date(weddingDate);
  expires.setDate(expires.getDate() + Math.max(1, Number(b.deleteAfterDays) || 7));

  const inv: Invitation = {
    slug: randomBytes(12).toString('base64url'),
    variant: model.variant,
    colorId: color.id,
    bg: color.bg,
    ink: color.ink,
    accent: color.hex,
    locale: b.locale === 'ar' ? 'ar' : 'fr',
    active: true,
    images: (b.images && typeof b.images === 'object') ? b.images : {},
    data: {
      bride:     String(b.bride),
      groom:     String(b.groom),
      date:      weddingDate.toISOString(),
      time:      b.time?.trim() || undefined,
      venue:     b.venue?.trim() || undefined,
      city:      b.city?.trim() || undefined,
      rsvpPhone: b.rsvpPhone?.trim() || undefined,
      mapUrl:    b.mapUrl?.trim() ? await resolveMapUrl(String(b.mapUrl)) : undefined,
      mapLinkUrl: b.mapUrl?.trim() || undefined,
      programme: Array.isArray(b.programme) ? b.programme : undefined,
    },
    weddingDate: weddingDate.toISOString(),
    expiresAt:   expires.toISOString(),
    createdAt:   new Date().toISOString(),
  };

  await insertInvitation(inv);
  return NextResponse.json({ url: `${site.url}/i/${inv.slug}`, slug: inv.slug });
}
