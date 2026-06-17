import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export const COOKIE_NAME = 'admin_session';
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function sign(timestamp: string): string {
  return createHmac('sha256', process.env.ADMIN_SECRET ?? 'fallback-dev-secret')
    .update(timestamp)
    .digest('hex');
}

export function createSessionToken(): string {
  const ts = Date.now().toString();
  return `${ts}.${sign(ts)}`;
}

export function verifySessionToken(token: string): boolean {
  const dot = token.indexOf('.');
  if (dot === -1) return false;
  const ts = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  const expected = sign(ts);
  try {
    if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  const age = Date.now() - parseInt(ts, 10);
  return age >= 0 && age < MAX_AGE_MS;
}

export async function getServerSession(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export function getRequestSession(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
