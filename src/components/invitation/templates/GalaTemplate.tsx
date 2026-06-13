'use client';

import type { ReactNode } from 'react';
import GalaEnvelope from './GalaEnvelope';
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
  pageBg: string; envelopeUp: string; envelopeDown: string;
  accent: string; accentLight: string; text: string; dim: string;
  bannerBg: string; bannerText: string; btnText: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    pageBg: 'linear-gradient(180deg, #f9f5f6 0%, #eedfe2 100%)',
    envelopeUp: '/templates/gala/up001.webp', envelopeDown: '/templates/gala/down001.webp',
    accent: '#700e1f', accentLight: '#c07080',
    text: '#1a0508', dim: '#7a3040',
    bannerBg: '#180408', bannerText: '#f0d0d5', btnText: '#100205',
  },
  blue: {
    pageBg: 'linear-gradient(180deg, #f2f4f9 0%, #dce2f4 100%)',
    envelopeUp: '/templates/gala/blueup001.webp', envelopeDown: '/templates/gala/bluedown001.webp',
    accent: '#0d2d6b', accentLight: '#7090d0',
    text: '#050d20', dim: '#304878',
    bannerBg: '#04081a', bannerText: '#c0d0f0', btnText: '#020408',
  },
  green: {
    pageBg: 'linear-gradient(180deg, #f2f9f4 0%, #d8eedc 100%)',
    envelopeUp: '/templates/gala/up001.webp', envelopeDown: '/templates/gala/down001.webp',
    accent: '#1a5c24', accentLight: '#6aaa74',
    text: '#081808', dim: '#2a5a32',
    bannerBg: '#060e08', bannerText: '#b0e0b8', btnText: '#030608',
  },
  purple: {
    pageBg: 'linear-gradient(180deg, #f5f0fa 0%, #e4d8f2 100%)',
    envelopeUp: '/templates/gala/up001.webp', envelopeDown: '/templates/gala/down001.webp',
    accent: '#4a1070', accentLight: '#9060c0',
    text: '#0e081a', dim: '#3a1860',
    bannerBg: '#080412', bannerText: '#c0a0e8', btnText: '#040208',
  },
};

function GalaDivider({ color }: { color: string }) {
  return (
    <svg width="220" height="20" viewBox="0 0 220 20" aria-hidden="true">
      <line x1="0" y1="10" x2="86" y2="10" stroke={color} strokeWidth="0.7" opacity="0.5" />
      <line x1="0" y1="12" x2="86" y2="12" stroke={color} strokeWidth="0.4" opacity="0.3" />
      <line x1="134" y1="10" x2="220" y2="10" stroke={color} strokeWidth="0.7" opacity="0.5" />
      <line x1="134" y1="12" x2="220" y2="12" stroke={color} strokeWidth="0.4" opacity="0.3" />
      {/* centre diamond */}
      <path d="M103,11 L110,4 L117,11 L110,18 Z" fill={color} opacity="0.75" />
      <path d="M99,11 L110,2 L121,11 L110,20 Z" fill="none" stroke={color} strokeWidth="0.7" opacity="0.35" />
    </svg>
  );
}

function GalaFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '34px 26px' }}>
      <svg viewBox="0 0 320 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" aria-hidden="true">
        <rect x="8" y="8" width="304" height="164" rx="1" ry="1" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        <rect x="14" y="14" width="292" height="152" rx="1" ry="1" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
        {/* corner diamonds */}
        {([[8, 8], [312, 8], [8, 172], [312, 172]] as [number, number][]).map(([cx, cy], i) => (
          <path key={i} d={`M${cx},${cy - 7} L${cx + 7},${cy} L${cx},${cy + 7} L${cx - 7},${cy} Z`}
            fill={color} opacity="0.6" />
        ))}
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default function GalaTemplate({
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
  const heroImage = `/templates/gala/TMP006${lang}${colorId.toUpperCase()}.png`;
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
      <GalaEnvelope upSrc={s.envelopeUp} downSrc={s.envelopeDown} />

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
            <GalaDivider color={s.accent} />
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
          <GalaDivider color={s.accent} />
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
          <GalaDivider color={s.accent} />
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
            <GalaFrame color={s.accent}>
              <p style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', textAlign: 'center', lineHeight: 1.75, color: s.text }}>
                {data.message}
              </p>
            </GalaFrame>
          </div>
        )}

      </main>
    </div>
  );
}
