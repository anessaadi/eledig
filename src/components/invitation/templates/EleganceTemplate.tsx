'use client';

import type { ReactNode } from 'react';
import EleganceEnvelope from './EleganceEnvelope';
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
  pageBg: string;
  envelopeLeft: string;
  envelopeRight: string;
  accent: string;
  accentLight: string;
  text: string;
  dim: string;
  bannerBg: string;
  bannerText: string;
  btnText: string;
  btnBg?: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    pageBg: 'linear-gradient(180deg, #fdf0f2 0%, #f0d8dc 100%)',
    envelopeLeft: '/templates/elegance/leftburgundyelegance.webp',
    envelopeRight: '/templates/elegance/rightburgundyelegance.webp',
    accent: '#9b1c3e', accentLight: '#e8a0b0',
    text: '#3d0f18', dim: '#8a4050',
    bannerBg: '#5c1222', bannerText: '#f5e0e4', btnText: '#f5e0e4', btnBg: 'linear-gradient(135deg, #5c2020 0%, #311211 100%)',
  },
  blue: {
    pageBg: 'linear-gradient(180deg, #eef2ff 0%, #d8e4f8 100%)',
    envelopeLeft: '/templates/elegance/leftblueelegance.webp',
    envelopeRight: '/templates/elegance/rightblueelegance.webp',
    accent: '#1a56db', accentLight: '#93b4f0',
    text: '#0f1e3d', dim: '#3a5090',
    bannerBg: '#122060', bannerText: '#bfd0f8', btnText: '#050d20',
  },
  green: {
    pageBg: 'linear-gradient(180deg, #f0f9f2 0%, #d8f0dc 100%)',
    envelopeLeft: '/templates/elegance/leftblueelegance.webp',
    envelopeRight: '/templates/elegance/rightblueelegance.webp',
    accent: '#2e7d32', accentLight: '#80c080',
    text: '#0f2a10', dim: '#3a6a3a',
    bannerBg: '#0a2010', bannerText: '#b0e0b0', btnText: '#040e05',
  },
  purple: {
    pageBg: 'linear-gradient(180deg, #f5f0fa 0%, #e8d8f4 100%)',
    envelopeLeft: '/templates/elegance/leftburgundyelegance.webp',
    envelopeRight: '/templates/elegance/rightburgundyelegance.webp',
    accent: '#7b1fa2', accentLight: '#c080e0',
    text: '#1a0a2a', dim: '#5a3a7a',
    bannerBg: '#120820', bannerText: '#d0b0f0', btnText: '#080410',
  },
};

// ─── SVG helpers ──────────────────────────────────────────────────────────────

function EleganceDivider({ color }: { color: string }) {
  return (
    <svg width="200" height="24" viewBox="0 0 200 24" aria-hidden="true">
      <line x1="0" y1="12" x2="78" y2="12" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <line x1="122" y1="12" x2="200" y2="12" stroke={color} strokeWidth="0.8" opacity="0.6" />
      {[0, 72, 144, 216, 288].map((deg) => {
        const rx = 100 + Math.cos((deg * Math.PI) / 180) * 5;
        const ry = 12 + Math.sin((deg * Math.PI) / 180) * 5;
        return (
          <ellipse key={deg} cx={rx} cy={ry} rx={2.5} ry={4.5}
            transform={`rotate(${deg} ${rx} ${ry})`} fill={color} opacity={0.55} />
        );
      })}
      <circle cx="100" cy="12" r="2.5" fill={color} opacity={0.8} />
    </svg>
  );
}

function EleganceFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '34px 26px' }}>
      <svg
        viewBox="0 0 320 180"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="8" y="8" width="304" height="164" rx="2" ry="2"
          fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        <rect x="14" y="14" width="292" height="152" rx="2" ry="2"
          fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
        {/* Corner diamonds */}
        {([[8, 8], [312, 8], [8, 172], [312, 172]] as [number, number][]).map(([cx, cy], i) => (
          <path key={i}
            d={`M${cx},${cy - 6} L${cx + 6},${cy} L${cx},${cy + 6} L${cx - 6},${cy} Z`}
            fill={color} opacity={0.55}
          />
        ))}
        {/* Centre top/bottom ornaments */}
        <path d="M155,8 L160,2 L165,8" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
        <path d="M155,172 L160,178 L165,172" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function EleganceTemplate({
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
  const heroImage = `/templates/elegance/TMP005${lang}${colorId.toUpperCase()}.png`;
  const closingImage = `/templates/elegance/TMP005${lang}2${colorId.toUpperCase()}.png`;
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
    <div dir={dir} style={{ backgroundImage: 'url(/templates/elegance/backgroundelegance.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', color: s.text, fontFamily: bodyFont }}>
      <EleganceEnvelope leftSrc={s.envelopeLeft} rightSrc={s.envelopeRight} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ margin: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animation: 'scroll-reveal 0.5s ease 2s both, scroll-hint 1.6s ease-in-out 2.5s infinite' }}
        >
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

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Save The Date */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h1 style={{
            fontFamily: displayFont,
            fontSize: 'clamp(32px, 9vw, 42px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: s.text,
            lineHeight: 1.1,
          }}>
            {isAr ? 'احفظ التاريخ' : 'Save The Date'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <EleganceDivider color={s.accent} />
          </div>
        </div>

        {/* Date / time banner */}
        <div style={{
          marginTop: '32px',
          background: s.bannerBg,
          borderRadius: '3px',
          padding: '20px 24px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 'clamp(17px, 4.8vw, 22px)',
            letterSpacing: '0.12em',
            color: s.bannerText,
          }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
          {data.time && (
            <p style={{
              fontFamily: FR_BODY,
              fontSize: '12px',
              letterSpacing: '0.15em',
              color: s.bannerText,
              marginTop: '7px',
              opacity: 0.8,
            }}>
              {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        {/* Localisation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <EleganceDivider color={s.accent} />
        </div>
        <h2 style={{
          fontFamily: displayFont,
          fontSize: 'clamp(28px, 8vw, 36px)',
          fontStyle: isAr ? 'normal' : 'italic',
          textAlign: 'center',
          marginTop: '14px',
          color: s.text,
          lineHeight: 1.1,
        }}>
          {isAr ? 'الموقع' : 'Localisation'}
        </h2>

        <iframe
          style={{
            width: '100%',
            maxWidth: '380px',
            display: 'block',
            margin: '24px auto 0',
            borderRadius: '4px',
            border: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
          title="Localisation"
          height="220"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
        />

        {(data.venue || data.city) && (
          <p style={{
            fontFamily: bodyFont,
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '16px',
            color: s.dim,
            letterSpacing: '0.05em',
            lineHeight: 1.45,
          }}>
            {data.venue && <span style={{ fontWeight: 600 }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        {/* RSVP */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <EleganceDivider color={s.accent} />
        </div>
        <h2 style={{
          fontFamily: displayFont,
          fontSize: 'clamp(24px, 7vw, 34px)',
          fontStyle: isAr ? 'normal' : 'italic',
          textAlign: 'center',
          marginTop: '14px',
          lineHeight: 1.2,
          color: s.text,
        }}>
          {isAr ? 'أؤكد حضوري' : <>Je confirme <br /> ma présence</>}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <a
            href={data.rsvpPhone ? `tel:${data.rsvpPhone}` : '#rsvp'}
            style={{
              fontFamily: bodyFont,
              fontStyle: isAr ? 'normal' : 'italic',
              fontSize: '15px',
              letterSpacing: '0.06em',
              textAlign: 'center',
              color: s.btnText,
              background: s.btnBg ?? `linear-gradient(135deg, ${s.accentLight} 0%, ${s.accent} 100%)`,
              textDecoration: 'none',
              padding: '20px 48px',
              borderRadius: '2px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
              display: 'inline-block',
              lineHeight: 1.35,
            }}
          >
            {isAr ? 'اضغط هنا' : <>Cliquez<br />ici</>}
          </a>
        </div>


      </main>

      {/* Closing image — full width like hero */}
      <div style={{ marginTop: '70px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={closingImage} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
}
