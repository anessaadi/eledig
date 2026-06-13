import { NextResponse } from 'next/server';
import { deleteExpired } from '@/lib/db';

// Called daily by Vercel Cron (see vercel.json). Protected by CRON_SECRET.
export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const removed = await deleteExpired();
  return NextResponse.json({ ok: true, removed });
}
