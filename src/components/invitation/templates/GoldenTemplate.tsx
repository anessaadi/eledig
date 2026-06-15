'use client';

import type { ReactNode } from 'react';
import GoldenEnvelope from './GoldenEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const AR = 'var(--font-ar-display), serif';
const AR_BODY = 'var(--font-ar-body), serif';
const FR = 'var(--font-fr-display), Georgia, serif';
const FR_BODY = 'var(--font-fr-body), Georgia, serif';

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'جانفي', 'فيفري', 'مارس', 'افريل', 'ماي', 'جوان',
  'جويلية', 'اوت', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر',
];

type Scheme = {
  pageBg: string; envelopeLeft: string; envelopeRight: string;
  accent: string; accentLight: string; text: string; dim: string;
  bannerBg: string; bannerText: string; btnText: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    pageBg: 'linear-gradient(180deg, #fdf8ee 0%, #f0e4c0 100%)',
    envelopeLeft: '/templates/golden/left002.webp', envelopeRight: '/templates/golden/right002.webp',
    accent: '#c9a055', accentLight: '#e8d098',
    text: '#2a1800', dim: '#7a5a20',
    bannerBg: '#1e1000', bannerText: '#f0d898', btnText: '#0e0800',
  },
  blue: {
    pageBg: 'linear-gradient(180deg, #f0f4fc 0%, #d8e4f8 100%)',
    envelopeLeft: '/templates/golden/blueleft002.webp', envelopeRight: '/templates/golden/blueright002.webp',
    accent: '#1a56db', accentLight: '#93b4f0',
    text: '#0c1840', dim: '#3060a8',
    bannerBg: '#060e28', bannerText: '#b8d0f8', btnText: '#020608',
  },
  green: {
    pageBg: 'linear-gradient(180deg, #f0f8ee 0%, #d8f0d0 100%)',
    envelopeLeft: '/templates/golden/left002.webp', envelopeRight: '/templates/golden/right002.webp',
    accent: '#c9a055', accentLight: '#e8d098',
    text: '#0e2010', dim: '#2a5020',
    bannerBg: '#0a1808', bannerText: '#f0d898', btnText: '#050e04',
  },
  black: {
    pageBg: 'linear-gradient(180deg, #181818 0%, #0a0a0a 100%)',
    envelopeLeft: '/templates/golden/left002.webp', envelopeRight: '/templates/golden/right002.webp',
    accent: '#c9a055', accentLight: '#e8d098',
    text: '#f0e8d0', dim: '#a09070',
    bannerBg: '#050505', bannerText: '#e8d090', btnText: '#0a0802',
  },
};

function GoldenDivider({ color }: { color: string }) {
  return (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 632.31 32.02"
      fill={color} aria-hidden="true"
      style={{ width: '100%', maxWidth: '260px', height: 'auto', opacity: 0.85 }}>
      <path d="M290.6,729.6,80.54,725.55,290.86,721l56.77,2.51v2.86Z" transform="translate(-80.54 -709.3)"/>
      <path d="M502.78,721l210.06,4.06L502.52,729.6l-56.77-2.5v-2.87Z" transform="translate(-80.54 -709.3)"/>
      <path d="M396.69,741.32c-3-8.1-8.09-13.69-15.88-16,7.63-3.22,13-8.46,15.88-16,2.11,7.52,7.8,12.58,15.88,16C405.53,727.13,400.38,732.77,396.69,741.32Z" transform="translate(-80.54 -709.3)"/>
      <path d="M364.22,733.62c-1.56-4.2-4.2-7.11-8.24-8.31a14.26,14.26,0,0,0,8.24-8.32c1.1,3.91,4,6.54,8.24,8.32C368.81,726.25,366.14,729.18,364.22,733.62Z" transform="translate(-80.54 -709.3)"/>
      <path d="M429.16,733.62c-1.57-4.2-4.2-7.11-8.24-8.31a14.26,14.26,0,0,0,8.24-8.32c1.1,3.91,4,6.54,8.24,8.32C433.74,726.25,431.07,729.18,429.16,733.62Z" transform="translate(-80.54 -709.3)"/>
    </svg>
  );
}

function GoldenFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '34px 26px' }}>
      <svg viewBox="0 0 320 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" aria-hidden="true">
        <rect x="6" y="6" width="308" height="168" rx="4" ry="4" fill="none" stroke={color} strokeWidth="1.8" opacity="0.65" />
        <rect x="12" y="12" width="296" height="156" rx="2" ry="2" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
        {/* corner flourishes */}
        {([[6, 6], [314, 6], [6, 174], [314, 174]] as [number, number][]).map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill={color} opacity="0.6" />
            <circle cx={cx} cy={cy} r="7" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" />
          </g>
        ))}
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default function GoldenTemplate({
  data,
  style,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  const isAr = locale === 'ar';
  const colorId = (style.colorId && SCHEMES[style.colorId]) ? style.colorId : 'burgundy';
  const s = SCHEMES[colorId];
  const lang = isAr ? 'AR' : 'FR';
  const heroImage = `/templates/golden/TMP007${lang}${colorId.toUpperCase()}.png`;
  const closingImage = `/templates/golden/TMP007${lang}2${colorId.toUpperCase()}.png`;
  const dir = isAr ? 'rtl' : 'ltr';
  const displayFont = isAr ? AR : FR;
  const bodyFont = isAr ? AR_BODY : FR_BODY;

  const d = new Date(data.date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const monthLabel = isAr ? MONTHS_AR[month] : MONTHS_FR[month];
  const mapQuery = encodeURIComponent([data.venue, data.city].filter(Boolean).join(', ') || 'Casablanca, Morocco');

  return (
    <div dir={dir} style={{ background: s.pageBg, color: s.text, fontFamily: bodyFont }}>
      <GoldenEnvelope leftSrc={s.envelopeLeft} rightSrc={s.envelopeRight} />

      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(32px, 9vw, 42px)', fontStyle: isAr ? 'normal' : 'italic', color: s.text, lineHeight: 1.1 }}>
            {isAr ? 'احفظ التاريخ' : 'Save The Date'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <GoldenDivider color={s.accent} />
          </div>
        </div>

        <div style={{ marginTop: '32px', background: s.bannerBg, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 'clamp(17px, 4.8vw, 22px)', letterSpacing: '0.12em', color: s.bannerText }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
          {data.time && (
            <p style={{ fontFamily: FR_BODY, fontSize: '12px', letterSpacing: '0.15em', color: s.bannerText, marginTop: '7px', opacity: 0.8 }}>
              {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <GoldenDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: s.text, lineHeight: 1.1 }}>
          {isAr ? 'الموقع' : 'Localisation'}
        </h2>

        <iframe style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '24px auto 0', borderRadius: '4px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
          title="Localisation" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`} />

        {(data.venue || data.city) && (
          <p style={{ fontFamily: bodyFont, fontSize: '14px', textAlign: 'center', marginTop: '16px', color: s.dim, letterSpacing: '0.05em', lineHeight: 1.45 }}>
            {data.venue && <span style={{ fontWeight: 600 }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <GoldenDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(24px, 7vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', lineHeight: 1.2, color: s.text }}>
          {isAr ? 'أؤكد حضوري' : <>Je confirme <br /> ma présence</>}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <a href={data.rsvpPhone ? `tel:${data.rsvpPhone}` : '#rsvp'}
            style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', letterSpacing: '0.06em', textAlign: 'center', color: s.btnText, background: `linear-gradient(135deg, ${s.accentLight} 0%, ${s.accent} 100%)`, textDecoration: 'none', padding: '20px 48px', borderRadius: '2px', boxShadow: '0 6px 20px rgba(0,0,0,0.18)', display: 'inline-block', lineHeight: 1.35 }}>
            {isAr ? 'اضغط هنا' : <>Cliquez<br />ici</>}
          </a>
        </div>


      </main>

      {/* Closing image — full width */}
      <div style={{ marginTop: '70px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={closingImage} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
}
