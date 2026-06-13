# L'élégance digitale — site de faire-part de mariage digitaux

Bilingual (Français / العربية) Next.js 14 site for selling and generating digital
wedding invitations. Marketing pages are fully static (fast); each generated
invitation lives behind a private, unguessable link that auto-expires.

## What's inside

- **Landing** (`/fr`, `/ar`): hero, 4 featured models, "comment ça marche" (5 steps), two options (Classique / Sur-mesure), footer.
- **Modèles** (`/fr/modeles`): full catalog grid.
- **Product page** (`/fr/modeles/[slug]`): colors, languages, price, demo buttons, "Commander sur WhatsApp".
- **Demo** (`/fr/demo/[slug]?lang=fr|ar`): envelope-opening animation + sample invitation.
- **Admin** (`/fr/admin`): password login + form that generates a real invitation link.
- **Live invitation** (`/i/[slug]`): the generated page with a **random, non-guessable** URL. No details in the URL → nothing to tamper with. Auto-expires.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # then edit the values
npm run dev                          # http://localhost:3000  (redirects to /fr)
```

### Environment variables (`.env.local`)

| Variable | What it is |
|---|---|
| `ADMIN_PASSWORD` | password to log into `/fr/admin` |
| `ADMIN_SECRET` | long random string, signs the admin cookie |
| `CRON_SECRET` | secret the cleanup cron must send |
| `NEXT_PUBLIC_SITE_URL` | your site URL (used to build invitation links) |
| `NEXT_PUBLIC_WHATSAPP` | your WhatsApp number, digits only (e.g. `213xxxxxxxxx`) |

## How the secure invitation system works

1. You log into `/fr/admin` and fill the form (model, color, language, couple, date, venue, message, and **how many days after the wedding** the link should die).
2. The server creates a row keyed by a random ~16-char slug (`crypto.randomBytes`) and returns `…/i/<slug>`.
3. Visitors open `/i/<slug>`. The server looks the slug up, checks it hasn't expired, and renders the invitation. The wedding details **never appear in the URL** and the browser only receives the final rendered page — so a guest can't copy a link, edit parameters, and make their own free invitation.
4. Expiry is checked at request time *and* a daily cron deletes expired rows.

## Where the data is stored

For zero-setup local development, invitations are saved to `data/invitations.json`
via `src/lib/db.ts`. This is perfect on your own machine / a single always-on server.

> **Production note (important):** on serverless hosts like Vercel the filesystem
> is not persistent, so you must swap `src/lib/db.ts` for a real database. The file
> exposes four functions — `insertInvitation`, `findInvitation`, `deleteExpired`
> (and the `Invitation` type). Reimplement those against Supabase/Postgres and
> nothing else changes. Suggested table:
>
> ```sql
> create table invitations (
>   slug text primary key, variant text, color_id text, bg text, ink text,
>   accent text, locale text, data jsonb, wedding_date date,
>   expires_at timestamptz, created_at timestamptz default now()
> );
> create index on invitations (expires_at);
> ```

## Auto-deletion (cron)

`vercel.json` schedules `GET /api/cron/cleanup` daily at 03:00. The route requires
`Authorization: Bearer <CRON_SECRET>` and deletes every expired invitation. With
Supabase you can instead use `pg_cron`:

```sql
select cron.schedule('cleanup', '0 3 * * *',
  $$ delete from invitations where expires_at < now() $$);
```

## Performance notes

- Marketing, models, product and demo pages are statically generated → instant, CDN-cached.
- Only `/i/[slug]` is dynamic (it must read the database).
- Fonts are self-hosted via `next/font` (no layout shift). The four fonts are
  fetched from Google Fonts **at build time** — make sure your build machine has
  internet (any normal machine / Vercel does).
- Add real template images later via `next/image`; host them on a CDN (Supabase
  Storage / Vercel Blob) and add the host to `next.config.mjs → images.remotePatterns`.

## Customizing

- **Models / prices / colors:** `src/data/models.ts`
- **Text (FR/AR):** `messages/fr.json`, `messages/ar.json`
- **Brand colors:** `src/app/globals.css` (`:root` variables)
- **WhatsApp / socials:** `src/config/site.ts` + `.env.local`
- **Invitation design:** `src/components/invitation/templates/InvitationTemplate.tsx`
- **Opening animation:** `src/components/invitation/EnvelopeReveal.tsx`

## Notes on RTL

The Arabic layout flips automatically because the code uses Tailwind *logical*
utilities (`ms-`, `me-`, `ps-`, `pe-`, `text-start`) and `dir="rtl"` is set on
`<html>` for the `ar` locale. Avoid `ml-`/`mr-`/`text-left` if you add styles.
