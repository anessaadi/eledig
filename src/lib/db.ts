import fs from 'fs';
import path from 'path';

const DATA_DIR  = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'invitations.json');

export type Invitation = {
  slug: string;
  variant: 'jardin' | 'royal-bordeaux' | 'islamic' | 'rosa' | 'elegance' | 'kabyle' | 'golden' | 'gala' | 'mariage' | 'galaxy';
  colorId: string;
  bg: string;
  ink: string;
  accent: string;
  locale: 'fr' | 'ar';
  active: boolean;
  images: Record<string, string>;
  data: {
    bride: string;
    groom: string;
    date: string;
    time?: string;
    venue?: string;
    city?: string;
    message?: string;
    rsvpPhone?: string;
    mapUrl?: string;
    mapLinkUrl?: string;
    programme?: Array<{ time: string; label: string }>;
  };
  weddingDate: string;
  expiresAt: string;
  createdAt: string;
};

function readAll(): Invitation[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Invitation[];
  } catch {
    return [];
  }
}

function writeAll(list: Invitation[]): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

export async function insertInvitation(inv: Invitation): Promise<void> {
  const list = readAll();
  list.push(inv);
  writeAll(list);
}

export async function findInvitation(slug: string): Promise<Invitation | null> {
  return readAll().find(i => i.slug === slug) ?? null;
}

export async function listAll(): Promise<Invitation[]> {
  return readAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function toggleActive(slug: string): Promise<boolean | null> {
  const list = readAll();
  const inv  = list.find(i => i.slug === slug);
  if (!inv) return null;
  inv.active = !inv.active;
  writeAll(list);
  return inv.active;
}

export async function deleteInvitation(slug: string): Promise<Invitation | null> {
  const list    = readAll();
  const idx     = list.findIndex(i => i.slug === slug);
  if (idx === -1) return null;
  const [removed] = list.splice(idx, 1);
  writeAll(list);
  return removed;
}

export async function updateInvitation(
  slug: string,
  patch: {
    data?: Invitation['data'];
    images?: Record<string, string>;
    locale?: 'fr' | 'ar';
    colorId?: string;
    bg?: string;
    ink?: string;
    accent?: string;
  }
): Promise<Invitation | null> {
  const list = readAll();
  const inv  = list.find(i => i.slug === slug);
  if (!inv) return null;
  if (patch.data    !== undefined) inv.data    = patch.data;
  if (patch.images  !== undefined) inv.images  = patch.images;
  if (patch.locale  !== undefined) inv.locale  = patch.locale;
  if (patch.colorId !== undefined) inv.colorId = patch.colorId;
  if (patch.bg      !== undefined) inv.bg      = patch.bg;
  if (patch.ink     !== undefined) inv.ink     = patch.ink;
  if (patch.accent  !== undefined) inv.accent  = patch.accent;
  writeAll(list);
  return inv;
}

export async function deleteExpired(now = new Date()): Promise<number> {
  const list    = readAll();
  const before  = list.length;
  const kept    = list.filter(i => new Date(i.expiresAt) >= now);
  writeAll(kept);
  return before - kept.length;
}
