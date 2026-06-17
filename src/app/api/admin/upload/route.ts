import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  if (!getRequestSession(req)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  const slot = form.get('slot') as string | null;

  if (!file) return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 });

  const raw = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(raw).webp({ quality: 88 }).toBuffer();
  const filename = `${Date.now()}-${slot ?? 'img'}.webp`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    const blob = await put(`invitations/${filename}`, webp, {
      access: 'public',
      contentType: 'image/webp',
    });
    return NextResponse.json({ url: blob.url });
  }

  // Local fallback: save to public/uploads/
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), webp);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
