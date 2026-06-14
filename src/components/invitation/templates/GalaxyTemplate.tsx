'use client';

import type { ReactNode } from 'react';
import GalaxyEnvelope from './GalaxyEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const FR = 'var(--font-fr-display), Georgia, serif';
const FR_BODY = 'var(--font-fr-body), Georgia, serif';
const AR = 'var(--font-ar-display), serif';
const AR_BODY = 'var(--font-ar-body), serif';

// Hue rotation per color variant (applied to video wrapper only)
// Values match Photoshop Hue/Saturation adjustment (Saturation untouched)
const HUE: Record<string, number> = {
  burgundy:   0,   // original
  violet:   -74,   // Photoshop Hue -74
  navy:    -137,   // Photoshop Hue -137
};

type Scheme = {
  pageBg: string;
  accent: string;
  accentLight: string;
  text: string;
  dim: string;
  bannerBg: string;
  bannerText: string;
  btnText: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    pageBg:      'linear-gradient(180deg, #200810 0%, #100408 100%)',
    accent:      '#c05070',
    accentLight: '#e090a8',
    text:        '#f5e8ea',
    dim:         '#a06878',
    bannerBg:    '#200810',
    bannerText:  '#e8c0c8',
    btnText:     '#0a0205',
  },
  violet: {
    pageBg:      'linear-gradient(180deg, #1f1038 0%, #170d2c 100%)',
    accent:      '#9b5fc0',
    accentLight: '#c090e0',
    text:        '#f0eaff',
    dim:         '#9070a8',
    bannerBg:    '#0e0820',
    bannerText:  '#d8c0f0',
    btnText:     '#050210',
  },
  navy: {
    pageBg:      'linear-gradient(180deg, #0d1a30 0%, #081123 100%)',
    accent:      '#4080c8',
    accentLight: '#80b0e0',
    text:        '#e8f0f8',
    dim:         '#6090b8',
    bannerBg:    '#050e1a',
    bannerText:  '#b0d0f0',
    btnText:     '#020810',
  },
};

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

function StarDivider({ color }: { color: string }) {
  return (
    <svg width="220" height="22" viewBox="0 0 220 22" aria-hidden="true">
      <line x1="0" y1="11" x2="88" y2="11" stroke={color} strokeWidth="0.7" opacity="0.5" />
      <line x1="132" y1="11" x2="220" y2="11" stroke={color} strokeWidth="0.7" opacity="0.5" />
      {/* 5-point star centre */}
      <polygon
        points="110,4 112,9 117,9 113,12 115,17 110,14 105,17 107,12 103,9 108,9"
        fill={color} opacity="0.85"
      />
      {/* small dots */}
      <circle cx="95" cy="11" r="1.5" fill={color} opacity="0.5" />
      <circle cx="125" cy="11" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function GalaxyFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '34px 26px' }}>
      <svg
        viewBox="0 0 320 180"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="8" y="8" width="304" height="164" rx="2" ry="2"
          fill="none" stroke={color} strokeWidth="1.4" opacity="0.6" />
        {/* corner stars */}
        {([[8, 8], [312, 8], [8, 172], [312, 172]] as [number, number][]).map(([cx, cy], i) => (
          <polygon key={i}
            points={`${cx},${cy - 6} ${cx + 2},${cy - 2} ${cx + 6},${cy - 2} ${cx + 3},${cy + 1} ${cx + 4},${cy + 6} ${cx},${cy + 3} ${cx - 4},${cy + 6} ${cx - 3},${cy + 1} ${cx - 6},${cy - 2} ${cx - 2},${cy - 2}`}
            fill={color} opacity="0.6"
          />
        ))}
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default function GalaxyTemplate({
  data,
  style,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  const isAr = locale === 'ar';
  const colorId = style.colorId ?? 'burgundy';
  const hue = HUE[colorId] ?? 0;
  const s = SCHEMES[colorId] ?? SCHEMES.burgundy;
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
    <div dir={dir} style={{ background: s.pageBg, color: s.text, fontFamily: bodyFont }}>
      <GalaxyEnvelope />

      {/* ── Hero — rotated horizontal video ─────────────────────────────── */}
      <div style={{ position: 'relative', height: '100dvh', width: '100%', overflow: 'hidden' }}>

        {/* Wrapper is rotated; video fills wrapper. After rotation the visual
            dimensions become 100vw × 100vh, turning landscape into portrait. */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vh',
          height: '100vw',
          transform: 'translate(-50%, -50%) rotate(90deg)',
          overflow: 'hidden',
          ...(hue !== 0 && { filter: `hue-rotate(${hue}deg)` }),
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src="/templates/galaxy/galaxyvideo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Text overlay image (covers full screen, no rotation) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/templates/galaxy/textoverlay.webp"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1"
          style={{ animation: 'scroll-reveal 0.5s ease 2s both, scroll-hint 1.6s ease-in-out 2.5s infinite' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: s.accentLight }} aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: s.accentLight, opacity: 0.5 }} className="-mt-4" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Second image — locale + color aware ─────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/templates/galaxy/TMP003${isAr ? 'AR' : 'FR'}2${colorId.toUpperCase()}.png`}
        alt=""
        style={{ width: '100%', maxWidth: '420px', display: 'block', margin: '40px auto 0', borderRadius: '4px', padding: '0 48px', boxSizing: 'border-box' }}
      />

      {/* ── Page content (dark theme) ─────────────────────────────────────── */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Save The Date */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(32px, 9vw, 42px)', fontStyle: isAr ? 'normal' : 'italic', color: s.text, lineHeight: 1.1 }}>
            {isAr ? 'احفظ التاريخ' : 'Save The Date'}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <StarDivider color={s.accent} />
          </div>
        </div>

        {/* Date / time banner */}
        <div style={{ marginTop: '32px', background: s.bannerBg, borderRadius: '3px', padding: '20px 24px', textAlign: 'center', border: `1px solid ${s.accent}22` }}>
          <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 'clamp(17px, 4.8vw, 22px)', letterSpacing: '0.12em', color: s.bannerText }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
          {data.time && (
            <p style={{ fontFamily: FR_BODY, fontSize: '12px', letterSpacing: '0.15em', color: s.bannerText, marginTop: '7px', opacity: 0.7 }}>
              {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        {/* Localisation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <StarDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: s.text, lineHeight: 1.1 }}>
          {isAr ? 'الموقع' : 'Localisation'}
        </h2>

        <iframe
          style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '24px auto 0', borderRadius: '4px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          title="Localisation" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
        />

        {(data.venue || data.city) && (
          <p style={{ fontFamily: bodyFont, fontSize: '14px', textAlign: 'center', marginTop: '16px', color: s.dim, letterSpacing: '0.05em', lineHeight: 1.45 }}>
            {data.venue && <span style={{ fontWeight: 600, color: s.text }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        {/* RSVP */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <StarDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(24px, 7vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', lineHeight: 1.2, color: s.text }}>
          {isAr ? 'أؤكد حضوري' : <>Je confirme <br /> ma présence</>}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <a
            href={data.rsvpPhone ? `tel:${data.rsvpPhone}` : '#rsvp'}
            style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', letterSpacing: '0.06em', textAlign: 'center', color: s.btnText, background: `linear-gradient(135deg, ${s.accentLight} 0%, ${s.accent} 100%)`, textDecoration: 'none', padding: '20px 48px', borderRadius: '2px', boxShadow: `0 6px 24px ${s.accent}66`, display: 'inline-block', lineHeight: 1.35 }}
          >
            {isAr ? 'اضغط هنا' : <>Cliquez<br />ici</>}
          </a>
        </div>


      </main>

      {/* Closing image — full width */}
      <div style={{ marginTop: '70px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/templates/galaxy/TMP003${isAr ? 'AR' : 'FR'}3${colorId.toUpperCase()}.png`}
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}
