import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { createSessionToken, COOKIE_NAME } from '@/lib/admin-auth';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String(body.password ?? '');
  const expected = process.env.ADMIN_PASSWORD ?? '';

  let match = false;
  try {
    match = timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    match = false;
  }

  if (!match) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  const token = createSessionToken();
  const isProd = process.env.NODE_ENV === 'production';
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 86400,
    secure: isProd,
  });
  return res;
}
