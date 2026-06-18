'use client';

import React from 'react';
import { MapBlock } from '../MapBlock';
import type { ReactNode } from 'react';
import EleganceEnvelope from './EleganceEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const AR = 'var(--font-ar-display), serif';
const AR_BODY = 'var(--font-ar-body), serif';
const FR = 'var(--font-fr-display), Georgia, serif';
const FR_BODY = 'var(--font-fr-body), Georgia, serif';

const PROGRAMME_FR = [
  { time: '10h00', label: 'Début de la soirée' },
  { time: '12h00', label: 'Le Dîner' },
  { time: '14h00', label: 'Le Cortège' },
  { time: '20h00', label: 'Clôture de la soirée' },
];
const PROGRAMME_AR = [
  { time: '10h00', label: 'بداية الحفلة' },
  { time: '12h00', label: 'الأكل' },
  { time: '14h00', label: 'الكورتاج' },
  { time: '20h00', label: 'نهاية الحفلة' },
];

const TEXT_LABELS = {
  fr: { programme: 'LE PROGRAMME', resumeTitle: 'EN BREF', resumeDate: 'DATE', resumeTime: 'HEURE', resumePlace: 'LIEU' },
  ar: { programme: 'البرنامج', resumeTitle: 'ملخص', resumeDate: 'التاريخ', resumeTime: 'التوقيت', resumePlace: 'المكان' },
};

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'يناير', 'فيفري', 'مارس', 'أبريل', 'ماي', 'جوان',
  'جويلية', 'آوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
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
    envelopeLeft: '/templates/elegance/leftelegance001.webp',
    envelopeRight: '/templates/elegance/rightelegance001.webp',
    accent: '#9b1c3e', accentLight: '#e8a0b0',
    text: '#3d0f18', dim: '#8a4050',
    bannerBg: '#5c1222', bannerText: '#f5e0e4', btnText: '#f5e0e4', btnBg: 'linear-gradient(135deg, #5c2020 0%, #311211 100%)',
  },
  blue: {
    pageBg: 'linear-gradient(180deg, #eef2ff 0%, #d8e4f8 100%)',
    envelopeLeft: '/templates/elegance/leftelegance001.webp',
    envelopeRight: '/templates/elegance/rightelegance001.webp',
    accent: '#1a56db', accentLight: '#93b4f0',
    text: '#0f1e3d', dim: '#3a5090',
    bannerBg: '#122060', bannerText: '#bfd0f8', btnText: '#050d20',
  },
  green: {
    pageBg: 'linear-gradient(180deg, #f0f9f2 0%, #d8f0dc 100%)',
    envelopeLeft: '/templates/elegance/leftelegance001.webp',
    envelopeRight: '/templates/elegance/rightelegance001.webp',
    accent: '#2e7d32', accentLight: '#80c080',
    text: '#0f2a10', dim: '#3a6a3a',
    bannerBg: '#0a2010', bannerText: '#b0e0b0', btnText: '#040e05',
  },
  purple: {
    pageBg: 'linear-gradient(180deg, #f5f0fa 0%, #e8d8f4 100%)',
    envelopeLeft: '/templates/elegance/leftelegance001.webp',
    envelopeRight: '/templates/elegance/rightelegance001.webp',
    accent: '#7b1fa2', accentLight: '#c080e0',
    text: '#1a0a2a', dim: '#5a3a7a',
    bannerBg: '#120820', bannerText: '#d0b0f0', btnText: '#080410',
  },
};

// --- SVG helpers --------------------------------------------------------------

function IslamicDivider({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 632.31 32.02"
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

// --- Main component -----------------------------------------------------------

export default function EleganceTemplate({
  data,
  style,
  locale,
  customImages,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
  customImages?: Record<string, string>;
}) {
  const isAr = locale === 'ar';
  const colorId = (style.colorId && SCHEMES[style.colorId]) ? style.colorId : 'burgundy';
  const s = SCHEMES[colorId];
  const lang = isAr ? 'AR' : 'FR';
  const heroImage = `/templates/elegance/TMP005${lang}${colorId.toUpperCase()}.webp`;
  const closingImage = `/templates/elegance/TMP005${lang}2${colorId.toUpperCase()}.webp`;
  const dir = isAr ? 'rtl' : 'ltr';
  const displayFont = isAr ? AR : FR;
  const bodyFont = isAr ? AR_BODY : FR_BODY;

  const d = new Date(data.date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const monthLabel = isAr ? MONTHS_AR[month] : MONTHS_FR[month];

  const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
  const tl = TEXT_LABELS[locale];
  const programme = data.programme?.length ? data.programme : (isAr ? PROGRAMME_AR : PROGRAMME_FR);
  const mapQuery = encodeURIComponent(
    [data.venue, data.city].filter(Boolean).join(', ') || 'Casablanca, Morocco'
  );

  return (
    <div dir={dir} style={{ backgroundImage: 'url(/templates/elegance/backgroundelegance.webp)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', color: s.text, fontFamily: bodyFont }}>
      <EleganceEnvelope leftSrc={customImages?.envelopeLeft ?? s.envelopeLeft} rightSrc={customImages?.envelopeRight ?? s.envelopeRight} />

      {/* -- Hero ----------------------------------------------------------- */}
      <div className="relative w-full" style={{ margin: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={customImages?.heroImage ?? heroImage}
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
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: '#fff' }} className="-mt-4" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* -- Page content --------------------------------------------------- */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Save The Date */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h1 style={{
            fontFamily: displayFont,
            fontSize: 'clamp(32px, 9vw, 42px)',
            fontStyle: isAr ? 'normal' : 'italic',
            fontWeight: isAr ? 400 : 700,
            color: s.text,
            lineHeight: 1.1,
          }}>
            {isAr ? 'احفظ التاريخ' : 'Retenez la Date'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <IslamicDivider color={s.accent} />
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
              {isAr ? `اعتبارا من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        {/* Localisation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <IslamicDivider color={s.accent} />
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
        <MapBlock mapUrl={data.mapUrl} mapLinkUrl={data.mapLinkUrl} />

        {(data.venue || data.city) && (
          <p style={{
            fontFamily: bodyFont,
            fontSize: '18px',
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

        {/* Programme */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <IslamicDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', fontWeight: isAr ? 400 : 700, textAlign: 'center', marginTop: '14px', color: s.text, lineHeight: 1.1 }}>
          {tl.programme}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'max-content 10px max-content', alignItems: 'center' }}>
            {programme.map((item, i) => {
              const isLast = i === programme.length - 1;
              return (
                <React.Fragment key={i}>
                  <div style={{ textAlign: isAr ? 'left' : 'right', paddingInlineEnd: '16px', paddingBottom: isLast ? 0 : '32px' }}>
                    <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '16px', letterSpacing: '0.1em', color: s.text }}>{item.time}</p>
                  </div>
                  <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: isLast ? 0 : '32px', background: `linear-gradient(to right, transparent calc(50% - 0.5px), ${s.accent}44 calc(50% - 0.5px), ${s.accent}44 calc(50% + 0.5px), transparent calc(50% + 0.5px))` }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.accent, flexShrink: 0, position: 'relative', zIndex: 1 }} />
                  </div>
                  <div style={{ textAlign: isAr ? 'right' : 'left', paddingInlineStart: '16px', paddingBottom: isLast ? 0 : '32px' }}>
                    <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '20px', color: s.dim, lineHeight: 1.3 }}>{item.label}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* R�sum� */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <IslamicDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', fontWeight: isAr ? 400 : 700, textAlign: 'center', marginTop: '14px', color: s.text, lineHeight: 1.1 }}>
          {tl.resumeTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
          <div style={{ borderRadius: '3px', padding: '20px 24px', textAlign: 'center', background: s.bannerBg }}>
            <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: '#c9a055' }}>{tl.resumeDate}</p>
            <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '18px', color: s.bannerText, letterSpacing: '0.04em', marginTop: '8px' }}>{formattedDate}</p>
          </div>
          {data.time && (
            <div style={{ borderRadius: '3px', padding: '20px 24px', textAlign: 'center', background: s.bannerBg }}>
              <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: '#c9a055' }}>{tl.resumeTime}</p>
              <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '18px', color: s.bannerText, letterSpacing: '0.04em', marginTop: '8px' }}>{data.time}</p>
            </div>
          )}
          {(data.venue || data.city) && (
            <div style={{ borderRadius: '3px', padding: '20px 24px', textAlign: 'center', background: s.bannerBg }}>
              <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: '#c9a055' }}>{tl.resumePlace}</p>
              <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '18px', color: s.bannerText, letterSpacing: '0.04em', lineHeight: 1.35, marginTop: '8px' }}>
                {data.venue && data.venue}
                {data.venue && data.city && <br />}
                {data.city && data.city}
              </p>
            </div>
          )}
        </div>

      </main>

      {/* Closing image � full width like hero */}
      <div style={{ marginTop: '70px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={customImages?.closingImage ?? closingImage} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
}
