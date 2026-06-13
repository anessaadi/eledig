// Simple file-backed store so the project runs end-to-end with ZERO external
// setup. Good for local development and a single long-running server.
//
// IMPORTANT for production on serverless (Vercel): the filesystem is read-only
// / ephemeral, so swap this file for a real database (see README -> Supabase).
// Keep the same exported function signatures and nothing else needs to change.

import { promises as fs } from 'fs';
import path from 'path';

export type Invitation = {
  slug: string;
  variant: 'jardin' | 'royal-bordeaux' | 'islamic' | 'rosa' | 'elegance' | 'kabyle' | 'golden' | 'gala' | 'mariage' | 'galaxy';
  colorId: string;
  bg: string;
  ink: string;
  accent: string;
  locale: 'fr' | 'ar';
  data: {
    bride: string;
    groom: string;
    date: string;   // ISO date
    time: string;
    venue: string;
    city: string;
    message: string;
    rsvpPhone: string;
  };
  weddingDate: string; // ISO date
  expiresAt: string;   // ISO datetime
  createdAt: string;   // ISO datetime
};

const FILE = path.join(process.cwd(), 'data', 'invitations.json');

async function readAll(): Promise<Invitation[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    return JSON.parse(raw) as Invitation[];
  } catch {
    return [];
  }
}

async function writeAll(list: Invitation[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), 'utf8');
}

export async function insertInvitation(inv: Invitation) {
  const list = await readAll();
  list.push(inv);
  await writeAll(list);
}

export async function findInvitation(slug: string) {
  const list = await readAll();
  return list.find((i) => i.slug === slug) ?? null;
}

export async function deleteExpired(now = new Date()) {
  const list = await readAll();
  const kept = list.filter((i) => new Date(i.expiresAt) >= now);
  const removed = list.length - kept.length;
  if (removed > 0) await writeAll(kept);
  return removed;
}
