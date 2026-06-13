'use client';

import type { ReactNode } from 'react';
import IslamicEnvelope from './IslamicEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const AR = 'var(--font-islamic-ar), var(--font-ar-display), serif';
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
  heroImage: string;
  secondImage?: string;
  dateBg?: string;
  dateBgText?: string;
  closingImage?: string;
  arImages?: { heroImage: string; secondImage?: string; closingImage?: string };
  envelopeLeft: string;
  envelopeRight: string;
  accent: string;
  accentLight: string;
  text: string;
  dim: string;
  bannerBg: string;
  bannerText: string;
  btnText: string;
};

const SCHEMES: Record<string, Scheme> = {
  gold: {
    pageBg: '#f9f1e6',
    heroImage: '/templates/islamic/TMP002FR1GOLD.png',
    secondImage: '/templates/islamic/TMP002FR2GOLD.png',
    dateBg: '/templates/islamic/TMP002DATEBACKGROUND.png',
    dateBgText: '#3d2b0a',
    closingImage: '/templates/islamic/TMP002FR3GOLD.png',
    arImages: {
      heroImage:    '/templates/islamic/TMP002AR1GOLD.png',
      secondImage:  '/templates/islamic/TMP002AR2GOLD.png',
      closingImage: '/templates/islamic/TMP002AR3GOLD.png',
    },
    envelopeLeft: '/templates/islamic/left002.webp',
    envelopeRight: '/templates/islamic/right002.webp',
    accent: '#c9a055',
    accentLight: '#ead898',
    text: '#3d2b0a',
    dim: '#8a6f40',
    bannerBg: '#2a1600',
    bannerText: '#e8d090',
    btnText: '#1e1000',
  },
  sky: {
    pageBg: 'linear-gradient(180deg, #e5ecf6 0%, #c8d8ee 100%)',
    heroImage: '/templates/islamic/TMP002FR1SKY.png',
    secondImage: '/templates/islamic/TMP002FR2SKY.png',
    dateBg: '/templates/islamic/TMP002DATEBACKGROUNDSKY.png',
    dateBgText: '#091e30',
    closingImage: '/templates/islamic/TMP002FR3BLUE.png',
    arImages: {
      heroImage:    '/templates/islamic/TMP002AR1BLUE.png',
      secondImage:  '/templates/islamic/TMP002AR2SKY.png',
      closingImage: '/templates/islamic/TMP002AR3BLUE.png',
    },
    envelopeLeft: '/templates/islamic/blueleft002.webp',
    envelopeRight: '/templates/islamic/blueright002.webp',
    accent: '#3a8aad',
    accentLight: '#90cce0',
    text: '#091e30',
    dim: '#2a6a8a',
    bannerBg: '#052040',
    bannerText: '#90cce0',
    btnText: '#03111e',
  },
  pink: {
    pageBg: 'linear-gradient(180deg, #fdf0f4 0%, #f5d0dc 100%)',
    heroImage: '/templates/islamic/TMP002FR1PINK.png',
    secondImage: '/templates/islamic/TMP002FR2PINK.png',
    dateBg: '/templates/islamic/TMP002DATEBACKGROUNDPINK.png',
    dateBgText: '#5a1028',
    closingImage: '/templates/islamic/TMP002FR3PINK.png',
    arImages: {
      heroImage:    '/templates/islamic/TMP002AR1PINK.png',
      secondImage:  '/templates/islamic/TMP002AR2PINK.png',
      closingImage: '/templates/islamic/TMP002AR3PINK.png',
    },
    envelopeLeft: '/templates/islamic/pinkleft002.png',
    envelopeRight: '/templates/islamic/pinkright002.png',
    accent: '#c06080',
    accentLight: '#f0b0c0',
    text: '#5a1028',
    dim: '#8a4058',
    bannerBg: '#3a0818',
    bannerText: '#f0b0c0',
    btnText: '#2a0010',
  },
};

// ─── SVG helpers ──────────────────────────────────────────────────────────────

function IslamicDecoration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 632.31 32.02" style={{ width: '180px', display: 'block' }} aria-hidden="true" fill={color}>
      <path d="M290.6,729.6,80.54,725.55,290.86,721l56.77,2.51v2.86Z" transform="translate(-80.54 -709.3)" />
      <path d="M502.78,721l210.06,4.06L502.52,729.6l-56.77-2.5v-2.87Z" transform="translate(-80.54 -709.3)" />
      <path d="M396.69,741.32c-3-8.1-8.09-13.69-15.88-16,7.63-3.22,13-8.46,15.88-16,2.11,7.52,7.8,12.58,15.88,16C405.53,727.13,400.38,732.77,396.69,741.32Z" transform="translate(-80.54 -709.3)" />
      <path d="M364.22,733.62c-1.56-4.2-4.2-7.11-8.24-8.31a14.26,14.26,0,0,0,8.24-8.32c1.1,3.91,4,6.54,8.24,8.32C368.81,726.25,366.14,729.18,364.22,733.62Z" transform="translate(-80.54 -709.3)" />
      <path d="M429.16,733.62c-1.57-4.2-4.2-7.11-8.24-8.31a14.26,14.26,0,0,0,8.24-8.32c1.1,3.91,4,6.54,8.24,8.32C433.74,726.25,431.07,729.18,429.16,733.62Z" transform="translate(-80.54 -709.3)" />
    </svg>
  );
}

function ArabesqueDivider({ color }: { color: string }) {
  return (
    <svg width="220" height="26" viewBox="0 0 220 26" aria-hidden="true">
      <line x1="0" y1="13" x2="80" y2="13" stroke={color} strokeWidth="0.8" opacity="0.65" />
      <line x1="140" y1="13" x2="220" y2="13" stroke={color} strokeWidth="0.8" opacity="0.65" />
      <path
        d="M88,13 Q93,4 98,13 Q103,22 108,13 Q113,4 118,13 Q123,22 128,13 Q133,4 132,13"
        fill="none" stroke={color} strokeWidth="1.3"
      />
      <circle cx="110" cy="13" r="3" fill={color} opacity="0.65" />
    </svg>
  );
}

function OrnateFrame({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '36px 28px' }}>
      <svg
        viewBox="0 0 320 190"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="10" y="10" width="300" height="170" rx="85" ry="48" fill="none" stroke={color} strokeWidth="1.6" opacity="0.65" />
        <rect x="18" y="18" width="284" height="154" rx="77" ry="42" fill="none" stroke={color} strokeWidth="0.7" opacity="0.35" />
        {([[10, 10], [310, 10], [10, 180], [310, 180]] as [number, number][]).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill={color} opacity="0.5" />
        ))}
        <circle cx="160" cy="7" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="160" cy="7" r="2" fill={color} opacity="0.5" />
        <circle cx="160" cy="183" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="160" cy="183" r="2" fill={color} opacity="0.5" />
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function IslamicTemplate({
  data,
  style,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  const isAr = locale === 'ar';
  const schemeKey = (style.colorId && SCHEMES[style.colorId]) ? style.colorId : 'gold';
  const s = SCHEMES[schemeKey];
  const images = (isAr && s.arImages) ? s.arImages : s;
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
      <IslamicEnvelope leftSrc={s.envelopeLeft} rightSrc={s.envelopeRight} />

      {/* ── Hero — full viewport height, width overflow hidden ───────────── */}
      <div className="relative h-dvh w-full overflow-hidden" style={{ margin: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.heroImage}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            height: '100%',
            width: 'auto',
            maxWidth: 'none',
            transform: 'translateX(-50%)',
          }}
        />
        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1"
          style={{ animation: 'scroll-reveal 0.5s ease 2s both, scroll-hint 1.6s ease-in-out 2.5s infinite' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: '#fff' }} aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: '#fff', opacity: 0.5 }} className="-mt-4" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Second image ─────────────────────────────────────────────────── */}
      {images.secondImage && (
        <div style={{ maxWidth: '480px', margin: '40px auto 0', padding: '0 24px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.secondImage} alt="" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} />
        </div>
      )}

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Save The Date */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h1
            style={{
              fontFamily: displayFont,
              fontSize: 'clamp(32px, 9vw, 42px)',
              fontStyle: isAr ? 'normal' : 'italic',
              color: s.text,
              lineHeight: 1.1,
            }}
          >
            {isAr ? 'احفظ التاريخ' : 'Save The Date'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <IslamicDecoration color={s.accent} />
          </div>
        </div>

        {/* Date / time banner */}
        {s.dateBg ? (
          <div style={{ marginTop: '32px', position: 'relative', textAlign: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.dateBg} alt="" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <p style={{ fontFamily: bodyFont, fontWeight: isAr ? 400 : 700, fontSize: 'clamp(20px, 6vw, 28px)', letterSpacing: '0.1em', color: s.dateBgText ?? s.text, margin: 0 }}>
                {`${day} ${monthLabel} ${year}`}
              </p>
              {data.time && (
                <p style={{ fontFamily: bodyFont, fontSize: 'clamp(14px, 4vw, 18px)', letterSpacing: '0.12em', color: s.dateBgText ?? s.text, margin: 0, opacity: 0.85 }}>
                  {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '32px', background: s.bannerBg, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontWeight: isAr ? 400 : 700, fontSize: 'clamp(20px, 6vw, 28px)', letterSpacing: '0.12em', color: s.bannerText, margin: 0 }}>
              {`${day} ${monthLabel} ${year}`}
            </p>
            {data.time && (
              <p style={{ fontFamily: FR_BODY, fontSize: 'clamp(14px, 4vw, 18px)', letterSpacing: '0.15em', color: s.bannerText, marginTop: '7px', opacity: 0.8 }}>
                {isAr ? `ابتداءً من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
              </p>
            )}
          </div>
        )}

        {/* Localisation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <IslamicDecoration color={s.accent} />
        </div>
        <h2
          style={{
            fontFamily: displayFont,
            fontSize: 'clamp(28px, 8vw, 36px)',
            fontStyle: isAr ? 'normal' : 'italic',
            textAlign: 'center',
            marginTop: '14px',
            color: s.text,
            lineHeight: 1.1,
          }}
        >
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
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: '14px',
              textAlign: 'center',
              marginTop: '16px',
              color: s.dim,
              letterSpacing: '0.05em',
              lineHeight: 1.45,
            }}
          >
            {data.venue && <span style={{ fontWeight: 600 }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        {/* RSVP */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <IslamicDecoration color={s.accent} />
        </div>
        <h2
          style={{
            fontFamily: displayFont,
            fontSize: 'clamp(24px, 7vw, 34px)',
            fontStyle: isAr ? 'normal' : 'italic',
            textAlign: 'center',
            marginTop: '14px',
            lineHeight: 1.2,
            color: s.text,
          }}
        >
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
              background: `linear-gradient(135deg, ${s.accentLight} 0%, ${s.accent} 100%)`,
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

        {/* Closing message */}
        {images.closingImage ? (
          <div style={{ marginTop: '64px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.closingImage} alt="" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} />
          </div>
        ) : data.message ? (
          <div style={{ marginTop: '64px' }}>
            <OrnateFrame color={s.accent}>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontStyle: isAr ? 'normal' : 'italic',
                  fontSize: '15px',
                  textAlign: 'center',
                  lineHeight: 1.75,
                  color: s.text,
                }}
              >
                {data.message}
              </p>
            </OrnateFrame>
          </div>
        ) : null}

      </main>
    </div>
  );
}
