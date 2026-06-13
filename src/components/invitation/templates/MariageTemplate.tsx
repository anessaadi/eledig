'use client';

import type { ReactNode } from 'react';
import MariageEnvelope from './MariageEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const FR = 'var(--font-fr-display), Georgia, serif';
const FR_BODY = 'var(--font-fr-body), Georgia, serif';
const AR = 'var(--font-ar-display), serif';
const AR_BODY = 'var(--font-ar-body), serif';

const GOLD = '#c9a055';
const GOLD_LIGHT = '#e8d098';
const PAGE_BG = '#fafafa';
const TEXT = '#111111';
const DIM = '#555555';
const BANNER_BG = '#111111';
const BANNER_TEXT = '#c9a055';
const BTN_TEXT = '#0a0a0a';

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

function GoldDivider({ light = false }: { light?: boolean }) {
  const c = light ? '#e8d098' : GOLD;
  return (
    <svg width="200" height="20" viewBox="0 0 200 20" aria-hidden="true">
      <line x1="0" y1="10" x2="76" y2="10" stroke={c} strokeWidth="0.8" opacity="0.7" />
      <line x1="124" y1="10" x2="200" y2="10" stroke={c} strokeWidth="0.8" opacity="0.7" />
      <path d="M84,10 L90,4 L96,10 L90,16 Z" fill={c} opacity="0.8" />
      <circle cx="100" cy="10" r="3.5" fill={c} opacity="0.9" />
      <path d="M104,10 L110,4 L116,10 L110,16 Z" fill={c} opacity="0.8" />
    </svg>
  );
}

function GoldFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '36px 28px' }}>
      <svg
        viewBox="0 0 320 180"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="6" y="6" width="308" height="168" rx="1" ry="1"
          fill="none" stroke={GOLD} strokeWidth="1.6" opacity="0.7" />
        <rect x="13" y="13" width="294" height="154" rx="1" ry="1"
          fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        {([[6, 6], [314, 6], [6, 174], [314, 174]] as [number, number][]).map(([cx, cy], i) => (
          <path key={i}
            d={`M${cx},${cy - 8} L${cx + 8},${cy} L${cx},${cy + 8} L${cx - 8},${cy} Z`}
            fill={GOLD} opacity="0.7"
          />
        ))}
        <path d="M153,4 L160,0 L167,4 L160,10 Z" fill={GOLD} opacity="0.55" />
        <path d="M153,176 L160,180 L167,176 L160,170 Z" fill={GOLD} opacity="0.55" />
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default function MariageTemplate({
  data,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const displayFont = isAr ? AR : FR;
  const bodyFont = isAr ? AR_BODY : FR_BODY;

  const d = new Date(data.date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const monthLabel = isAr ? MONTHS_AR[month] : MONTHS_FR[month];

  const mapQuery = encodeURIComponent(
    [data.venue, data.city].filter(Boolean).join(', ') || 'Casablanca, Morocco'
  );

  return (
    <div dir={dir} style={{ background: PAGE_BG, color: TEXT, fontFamily: bodyFont }}>
      <MariageEnvelope />

      {/* ── Hero — full viewport video ───────────────────────────────────── */}
      <div style={{ position: 'relative', height: '100dvh', width: '100%', overflow: 'hidden' }}>
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/templates/mariage/weddingvideo.mp4" type="video/mp4" />
        </video>

        {/* Black overlay 70% */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.70)' }} />

        {/* Decorative text overlay image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/templates/mariage/textoverlay.webp"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />

        {/* Wedding info on top */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 32px', textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: displayFont,
            fontSize: 'clamp(38px, 10vw, 56px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: '#ffffff',
            lineHeight: 1.05,
          }}>
            {data.bride}
          </h1>

          <span style={{
            fontFamily: displayFont,
            fontSize: 'clamp(22px, 5vw, 30px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: GOLD,
            display: 'block',
            marginTop: '6px',
            letterSpacing: '0.08em',
          }}>
            {isAr ? 'و' : '&'}
          </span>

          <h1 style={{
            fontFamily: displayFont,
            fontSize: 'clamp(38px, 10vw, 56px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: '#ffffff',
            marginTop: '6px',
            lineHeight: 1.05,
          }}>
            {data.groom}
          </h1>

          <p style={{
            fontFamily: bodyFont,
            fontSize: '13px',
            letterSpacing: '0.18em',
            color: GOLD,
            marginTop: '18px',
          }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animation: 'scroll-reveal 0.5s ease 1s both, scroll-hint 1.6s ease-in-out 1.5s infinite' }}
        >
          <div className="flex flex-col items-center gap-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: GOLD }} aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: GOLD, opacity: 0.5 }} className="-mt-4" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Save The Date */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h2 style={{
            fontFamily: displayFont,
            fontSize: 'clamp(30px, 9vw, 40px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: TEXT,
            lineHeight: 1.1,
          }}>
            {isAr ? 'احفظ التاريخ' : 'Save The Date'}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <GoldDivider />
          </div>
        </div>

        {/* Date / time banner */}
        <div style={{ marginTop: '32px', background: BANNER_BG, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 'clamp(17px, 4.8vw, 22px)', letterSpacing: '0.12em', color: BANNER_TEXT }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
          {data.time && (
            <p style={{ fontFamily: FR_BODY, fontSize: '12px', letterSpacing: '0.15em', color: '#fff', marginTop: '7px', opacity: 0.7 }}>
              {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        {/* Localisation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <GoldDivider />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: TEXT, lineHeight: 1.1 }}>
          {isAr ? 'الموقع' : 'Localisation'}
        </h2>

        <iframe
          style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '24px auto 0', borderRadius: '4px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
          title="Localisation" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
        />

        {(data.venue || data.city) && (
          <p style={{ fontFamily: bodyFont, fontSize: '14px', textAlign: 'center', marginTop: '16px', color: DIM, letterSpacing: '0.05em', lineHeight: 1.45 }}>
            {data.venue && <span style={{ fontWeight: 600 }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        {/* RSVP */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <GoldDivider />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(24px, 7vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', lineHeight: 1.2, color: TEXT }}>
          {isAr ? 'أؤكد حضوري' : <>Je confirme <br /> ma présence</>}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <a
            href={data.rsvpPhone ? `tel:${data.rsvpPhone}` : '#rsvp'}
            style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', letterSpacing: '0.06em', textAlign: 'center', color: BTN_TEXT, background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`, textDecoration: 'none', padding: '20px 48px', borderRadius: '2px', boxShadow: '0 6px 20px rgba(0,0,0,0.18)', display: 'inline-block', lineHeight: 1.35 }}
          >
            {isAr ? 'اضغط هنا' : <>Cliquez<br />ici</>}
          </a>
        </div>

        {/* Closing message */}
        {data.message && (
          <div style={{ marginTop: '64px' }}>
            <GoldFrame>
              <p style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', textAlign: 'center', lineHeight: 1.75, color: TEXT }}>
                {data.message}
              </p>
            </GoldFrame>
          </div>
        )}

      </main>
    </div>
  );
}
