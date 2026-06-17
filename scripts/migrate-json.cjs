// One-time migration: imports data/invitations.json → PostgreSQL (Neon)
// Run with:  node scripts/migrate-json.cjs

const fs   = require('fs');
const path = require('path');
const { Pool } = require('pg');

// ---------- load DATABASE_URL from .env.local ----------
const envPath = path.join(__dirname, '..', '.env.local');
const envText = fs.readFileSync(envPath, 'utf-8');
const match   = envText.match(/^DATABASE_URL=(.+)$/m);
if (!match) { console.error('DATABASE_URL not found in .env.local'); process.exit(1); }
const rawUrl  = match[1].trim();
// Strip channel_binding — not supported by node-postgres
const dbUrl   = rawUrl.replace(/([?&])channel_binding=[^&]*/g, '$1').replace(/[?&]$/, '');

// ---------- read JSON file ----------
const jsonPath = path.join(__dirname, '..', 'data', 'invitations.json');
if (!fs.existsSync(jsonPath)) { console.error('data/invitations.json not found'); process.exit(1); }
const invitations = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

async function run() {
  // Ensure table exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS invitations (
      slug         TEXT PRIMARY KEY,
      variant      TEXT NOT NULL,
      color_id     TEXT NOT NULL,
      bg           TEXT NOT NULL,
      ink          TEXT NOT NULL,
      accent       TEXT NOT NULL,
      locale       TEXT NOT NULL,
      active       BOOLEAN NOT NULL DEFAULT TRUE,
      images       JSONB NOT NULL DEFAULT '{}',
      data         JSONB NOT NULL,
      wedding_date TEXT NOT NULL,
      expires_at   TEXT NOT NULL,
      created_at   TEXT NOT NULL
    )
  `);

  let ok = 0, skip = 0, fail = 0;
  for (const inv of invitations) {
    try {
      const res = await pool.query(
        `INSERT INTO invitations
           (slug, variant, color_id, bg, ink, accent, locale, active, images, data, wedding_date, expires_at, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         ON CONFLICT (slug) DO NOTHING`,
        [
          inv.slug, inv.variant, inv.colorId, inv.bg, inv.ink, inv.accent,
          inv.locale, inv.active,
          JSON.stringify(inv.images), JSON.stringify(inv.data),
          inv.weddingDate, inv.expiresAt, inv.createdAt,
        ]
      );
      if (res.rowCount > 0) {
        console.log(`  imported  ${inv.slug}  (${inv.data.bride} & ${inv.data.groom})`);
        ok++;
      } else {
        console.log(`  skipped   ${inv.slug}  (already in DB)`);
        skip++;
      }
    } catch (err) {
      console.error(`  FAILED    ${inv.slug}  →`, err.message);
      fail++;
    }
  }

  await pool.end();
  console.log(`\nDone — imported: ${ok}, skipped: ${skip}, failed: ${fail}`);
}

run().catch(err => { console.error(err); process.exit(1); });
