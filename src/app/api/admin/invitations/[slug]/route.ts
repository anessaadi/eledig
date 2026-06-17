import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { getRequestSession } from '@/lib/admin-auth';
import { toggleActive, deleteInvitation, findInvitation, updateInvitation } from '@/lib/db';

type Params = { params: { slug: string } };

function deny() {
  return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
}

async function resolveMapUrl(url: string): Promise<string> {
  if (!url) return url;
  if (url.includes('/maps/embed') || (url.includes('@') && url.includes('google.com/maps'))) return url;
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
    const finalUrl = res.url;
    if (finalUrl.includes('@') || finalUrl.includes('?q=')) return finalUrl;
  } catch {}
  return url;
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!getRequestSession(req)) return deny();
  const b = await req.json();

  const existing = await findInvitation(params.slug);
  if (!existing) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });

  let resolvedMapUrl: string | undefined = existing.data.mapUrl;
  let mapLinkUrl: string | undefined    = existing.data.mapLinkUrl;
  if (b.mapUrl !== undefined) {
    if (!b.mapUrl) {
      resolvedMapUrl = undefined;
      mapLinkUrl     = undefined;
    } else {
      resolvedMapUrl = await resolveMapUrl(String(b.mapUrl));
      mapLinkUrl     = String(b.mapUrl);
    }
  }

  const updated = await updateInvitation(params.slug, {
    locale:   b.locale   === 'ar' || b.locale   === 'fr' ? b.locale   : undefined,
    colorId:  b.colorId  !== undefined ? String(b.colorId)  : undefined,
    bg:       b.bg       !== undefined ? String(b.bg)       : undefined,
    ink:      b.ink      !== undefined ? String(b.ink)      : undefined,
    accent:   b.accent   !== undefined ? String(b.accent)   : undefined,
    images:   b.images   !== undefined ? b.images           : undefined,
    data: {
      bride:     b.bride     !== undefined ? String(b.bride)     : existing.data.bride,
      groom:     b.groom     !== undefined ? String(b.groom)     : existing.data.groom,
      date:      b.date      !== undefined ? new Date(String(b.date)).toISOString() : existing.data.date,
      time:      b.time      !== undefined ? String(b.time)      : existing.data.time,
      venue:     b.venue     !== undefined ? String(b.venue)     : existing.data.venue,
      city:      b.city      !== undefined ? String(b.city)      : existing.data.city,
      rsvpPhone: b.rsvpPhone !== undefined ? (b.rsvpPhone || undefined) : existing.data.rsvpPhone,
      mapUrl:    resolvedMapUrl,
      mapLinkUrl,
      programme: Array.isArray(b.programme) ? b.programme : existing.data.programme,
    },
  });

  if (!updated) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!getRequestSession(req)) return deny();
  const active = await toggleActive(params.slug);
  if (active === null) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
  return NextResponse.json({ active });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!getRequestSession(req)) return deny();
  const removed = await deleteInvitation(params.slug);
  if (!removed) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
  const urls = Object.values(removed.images ?? {}).filter(Boolean);
  if (urls.length > 0) {
    await del(urls).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
