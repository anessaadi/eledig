/**
 * Compress all template images to WebP.
 * Run once: node scripts/compress-images.mjs
 * Originals are kept as-is; WebP copies are written alongside them.
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const QUALITY = 82; // good balance of size vs quality

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let saved = 0;
let count = 0;

for await (const file of walk(PUBLIC)) {
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

  const outFile = join(dirname(file), basename(file, ext) + '.webp');
  const before = (await stat(file)).size;

  await sharp(file)
    .webp({ quality: QUALITY })
    .toFile(outFile);

  const after = (await stat(outFile)).size;
  const pct = Math.round((1 - after / before) * 100);
  const kb = (n) => Math.round(n / 1024) + ' KB';
  console.log(`✓ ${basename(file)} → ${basename(outFile)}  ${kb(before)} → ${kb(after)}  (−${pct}%)`);
  saved += before - after;
  count++;
}

console.log(`\nDone. ${count} files, saved ${Math.round(saved / 1024 / 1024 * 10) / 10} MB total.`);
