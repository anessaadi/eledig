'use client';

import type { ReactNode } from 'react';
import KabyleEnvelope from './KabyleEnvelope';
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

const S = {
  pageBg: 'linear-gradient(180deg, #fdf8ef 0%, #ede0c8 100%)',
  envelopeUp: '/templates/kabyle/upbeige.webp',
  envelopeDown: '/templates/kabyle/downbeige.webp',
  accent: '#8b5e3c',
  accentLight: '#c9965a',
  text: '#3d2810',
  dim: '#7a4f2a',
  bannerBg: '#3d1e08',
  bannerText: '#f0e0c5',
  btnText: '#1e0e05',
};

function KabyleDivider({ color }: { color: string }) {
  return (
    <svg width="220" height="24" viewBox="0 0 220 24" aria-hidden="true">
      <line x1="0" y1="12" x2="84" y2="12" stroke={color} strokeWidth="0.8" opacity="0.55" />
      <line x1="136" y1="12" x2="220" y2="12" stroke={color} strokeWidth="0.8" opacity="0.55" />
      {/* centre large diamond */}
      <path d="M100,4 L110,12 L100,20 L90,12 Z" fill={color} opacity="0.7" />
      {/* flanking small diamonds */}
      <path d="M88,8 L94,12 L88,16 L82,12 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.45" />
      <path d="M132,8 L138,12 L132,16 L126,12 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

function KabyleFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '34px 26px' }}>
      <svg
        viewBox="0 0 320 180"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="8" y="8" width="304" height="164" rx="0" ry="0"
          fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        {/* corner cross ornaments */}
        {([[8, 8], [312, 8], [8, 172], [312, 172]] as [number, number][]).map(([cx, cy], i) => (
          <g key={i}>
            <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke={color} strokeWidth="1.5" opacity="0.65" />
            <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke={color} strokeWidth="1.5" opacity="0.65" />
          </g>
        ))}
        {/* top/bottom centre diamonds */}
        <path d="M155,5 L160,0 L165,5 L160,10 Z" fill={color} opacity="0.5" />
        <path d="M155,175 L160,180 L165,175 L160,170 Z" fill={color} opacity="0.5" />
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default function KabyleTemplate({
  data,
  style,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  const isAr = locale === 'ar';
  const heroImage = `/templates/kabyle/TMP008${isAr ? 'AR' : 'FR'}BEIGE.png`;
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
    <div dir={dir} style={{ background: S.pageBg, color: S.text, fontFamily: bodyFont }}>
      <KabyleEnvelope upSrc={S.envelopeUp} downSrc={S.envelopeDown} />

      {/* Hero */}
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
          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(32px, 9vw, 42px)', fontStyle: isAr ? 'normal' : 'italic', color: S.text, lineHeight: 1.1 }}>
            {isAr ? 'احفظ التاريخ' : 'Save The Date'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <KabyleDivider color={S.accent} />
          </div>
        </div>

        <div style={{ marginTop: '32px', background: S.bannerBg, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 'clamp(17px, 4.8vw, 22px)', letterSpacing: '0.12em', color: S.bannerText }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
          {data.time && (
            <p style={{ fontFamily: FR_BODY, fontSize: '12px', letterSpacing: '0.15em', color: S.bannerText, marginTop: '7px', opacity: 0.8 }}>
              {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <KabyleDivider color={S.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: S.text, lineHeight: 1.1 }}>
          {isAr ? 'الموقع' : 'Localisation'}
        </h2>

        <iframe
          style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '24px auto 0', borderRadius: '4px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
          title="Localisation" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
        />

        {(data.venue || data.city) && (
          <p style={{ fontFamily: bodyFont, fontSize: '14px', textAlign: 'center', marginTop: '16px', color: S.dim, letterSpacing: '0.05em', lineHeight: 1.45 }}>
            {data.venue && <span style={{ fontWeight: 600 }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <KabyleDivider color={S.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(24px, 7vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', lineHeight: 1.2, color: S.text }}>
          {isAr ? 'أؤكد حضوري' : <>Je confirme <br /> ma présence</>}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <a
            href={data.rsvpPhone ? `tel:${data.rsvpPhone}` : '#rsvp'}
            style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', letterSpacing: '0.06em', textAlign: 'center', color: S.btnText, background: `linear-gradient(135deg, ${S.accentLight} 0%, ${S.accent} 100%)`, textDecoration: 'none', padding: '20px 48px', borderRadius: '2px', boxShadow: '0 6px 20px rgba(0,0,0,0.18)', display: 'inline-block', lineHeight: 1.35 }}
          >
            {isAr ? 'اضغط هنا' : <>Cliquez<br />ici</>}
          </a>
        </div>

        {data.message && (
          <div style={{ marginTop: '64px' }}>
            <KabyleFrame color={S.accent}>
              <p style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '15px', textAlign: 'center', lineHeight: 1.75, color: S.text }}>
                {data.message}
              </p>
            </KabyleFrame>
          </div>
        )}

      </main>
    </div>
  );
}
