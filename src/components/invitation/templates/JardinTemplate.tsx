'use client';

import type { ReactNode } from 'react';
import JardinEnvelope from './JardinEnvelope';
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
    pageBg: '#ffffff',
    envelopeLeft: '/templates/jardin/leftburgundy.webp', envelopeRight: '/templates/jardin/rightburgundy.webp',
    accent: '#9b1c3e', accentLight: '#e8a0b0',
    text: '#111111', dim: '#555555',
    bannerBg: '#5c1222', bannerText: '#f5e0e4', btnText: '#111111',
  },
  blue: {
    pageBg: '#ffffff',
    envelopeLeft: '/templates/jardin/leftblue.webp', envelopeRight: '/templates/jardin/rightblue.webp',
    accent: '#1a56db', accentLight: '#93b4f0',
    text: '#111111', dim: '#555555',
    bannerBg: '#122060', bannerText: '#bfd0f8', btnText: '#111111',
  },
  purple: {
    pageBg: '#ffffff',
    envelopeLeft: '/templates/jardin/leftburgundy.webp', envelopeRight: '/templates/jardin/rightburgundy.webp',
    accent: '#7b1fa2', accentLight: '#c080e0',
    text: '#111111', dim: '#555555',
    bannerBg: '#4a0870', bannerText: '#e0c0f0', btnText: '#111111',
  },
};

function LeafDivider({ color }: { color: string }) {
  return (
    <svg width="220" height="26" viewBox="0 0 220 26" aria-hidden="true">
      <line x1="0" y1="13" x2="80" y2="13" stroke={color} strokeWidth="0.8" opacity="0.55" />
      <line x1="140" y1="13" x2="220" y2="13" stroke={color} strokeWidth="0.8" opacity="0.55" />
      {/* left leaf */}
      <path d="M90,13 Q95,5 102,9 Q98,16 90,13 Z" fill={color} opacity="0.6" />
      {/* right leaf */}
      <path d="M130,13 Q125,5 118,9 Q122,16 130,13 Z" fill={color} opacity="0.6" />
      {/* centre stem + bud */}
      <line x1="110" y1="5" x2="110" y2="21" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <circle cx="110" cy="13" r="3" fill={color} opacity="0.75" />
    </svg>
  );
}

function JardinFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '34px 26px' }}>
      <svg viewBox="0 0 320 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" aria-hidden="true">
        <rect x="8" y="8" width="304" height="164" rx="16" ry="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        {/* leaf corner ornaments */}
        {([[8, 8], [312, 8], [8, 172], [312, 172]] as [number, number][]).map(([cx, cy], i) => {
          const sx = cx === 8 ? 1 : -1;
          const sy = cy === 8 ? 1 : -1;
          return (
            <g key={i}>
              <path d={`M${cx},${cy} Q${cx + sx * 10},${cy + sy * 4} ${cx + sx * 6},${cy + sy * 10}`} fill={color} opacity="0.4" />
              <circle cx={cx} cy={cy} r="2.5" fill={color} opacity="0.6" />
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default function JardinTemplate({
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
  const heroImage = `/templates/jardin/TMP009${lang}1${colorId.toUpperCase()}.png`;
  const closingImage = `/templates/jardin/TMP009${lang}2${colorId.toUpperCase()}.png`;
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
      <JardinEnvelope leftSrc={s.envelopeLeft} rightSrc={s.envelopeRight} />

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
            <LeafDivider color={s.accent} />
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
          <LeafDivider color={s.accent} />
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
          <LeafDivider color={s.accent} />
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

        {/* Closing image */}
        <div style={{ marginTop: '70px', maxWidth: '420px', margin: '70px auto 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={closingImage} alt="Closing" style={{ width: '100%', height: 'auto' }} />
        </div>

      </main>
    </div>
  );
}
