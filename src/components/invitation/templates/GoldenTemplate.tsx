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
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
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
    <svg width="220" height="22" viewBox="0 0 220 22" aria-hidden="true">
      <line x1="0" y1="11" x2="82" y2="11" stroke={color} strokeWidth="0.8" opacity="0.55" />
      <line x1="138" y1="11" x2="220" y2="11" stroke={color} strokeWidth="0.8" opacity="0.55" />
      {/* ornate flourish */}
      <circle cx="110" cy="11" r="4" fill={color} opacity="0.75" />
      <circle cx="96" cy="11" r="2" fill={color} opacity="0.45" />
      <circle cx="124" cy="11" r="2" fill={color} opacity="0.45" />
      <path d="M88,11 Q94,4 100,11" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M120,11 Q126,4 132,11" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
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

      <div className="relative h-dvh w-full overflow-hidden" style={{ margin: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="" style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: 'auto', maxWidth: 'none', transform: 'translateX(-50%)' }} />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: 'scroll-reveal 0.5s ease 2s both, scroll-hint 1.6s ease-in-out 2.5s infinite' }}>
          <div className="flex flex-col items-center gap-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: '#fff' }} aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: '#fff', opacity: 0.5 }} className="-mt-4" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
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

        {data.message && (
          <div style={{ marginTop: '64px' }}>
            <GoldenFrame color={s.accent}>
              <p style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', textAlign: 'center', lineHeight: 1.75, color: s.text }}>
                {data.message}
              </p>
            </GoldenFrame>
          </div>
        )}

      </main>
    </div>
  );
}
