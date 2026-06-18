'use client';

import React, { useRef, useEffect } from 'react';
import GalaxyEnvelope from './GalaxyEnvelope';
import { MapBlock } from '../MapBlock';
import type { InviteData, InviteStyle } from './InvitationTemplate';
import { useInvitationReady } from '@/components/invitation/InvitationReadyContext';

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
  dark: string;
  accent: string;
  accentLight: string;
  text: string;
  dim: string;
  bannerBg: string;
  bannerText: string;
  btnBg: string;
  btnText: string;
  envelopeUp: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    pageBg:          'linear-gradient(180deg, #200810 0%, #100408 100%)',
    dark:            '#100408',
    accent:          '#c05070',
    accentLight:     '#e090a8',
    text:          '#f5e8ea',
    dim:           '#c898a8',
    bannerBg:      '#200810',
    bannerText:    '#eec8d0',
    btnBg:         '#7A1020',
    btnText:       '#F7F0EA',
    envelopeUp:    '/templates/galaxy/up001.webp',
  },
  violet: {
    pageBg:      'linear-gradient(180deg, #1f1038 0%, #170d2c 100%)',
    dark:        '#170d2c',
    accent:      '#9b5fc0',
    accentLight: '#c090e0',
    text:        '#f0eaff',
    dim:         '#9070a8',
    bannerBg:    '#0e0820',
    bannerText:  '#d8c0f0',
    btnBg:       '#3D0A60',
    btnText:     '#F0E8FF',
    envelopeUp:  '/templates/galaxy/uppurple001.webp',
  },
  navy: {
    pageBg:      'linear-gradient(180deg, #0d1a30 0%, #081123 100%)',
    dark:        '#081123',
    accent:      '#4080c8',
    accentLight: '#80b0e0',
    text:        '#e8f0f8',
    dim:         '#6090b8',
    bannerBg:    '#050e1a',
    bannerText:  '#b0d0f0',
    btnBg:       '#0A1840',
    btnText:     '#E8F0FF',
    envelopeUp:  '/templates/galaxy/upnavy001.webp',
  },
};

const PROGRAMME_FR = [
  { time: '12h00', label: 'Début des festivités' },
  { time: '14h00', label: 'Déjeuner' },
  { time: '17h00', label: 'Cortège nuptial' },
  { time: '19h00', label: 'Début de soirée' },
];
const PROGRAMME_AR = [
  { time: '12h00', label: 'بداية الحفلة' },
  { time: '14h00', label: 'الأكل' },
  { time: '17h00', label: 'كورتاج' },
  { time: '19h00', label: 'بداية الحفلة' },
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
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
  'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
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


export default function GalaxyTemplate({
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
  const colorId = style.colorId ?? 'burgundy';
  const hue = HUE[colorId] ?? 0;
  const s = SCHEMES[colorId] ?? SCHEMES.burgundy;

  const ready = useInvitationReady();
  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   const v = videoRef.current;
  //   if (!v) return;
  //   v.muted = true;
  //   v.setAttribute('muted', '');
  //   v.setAttribute('playsinline', '');
  //   v.setAttribute('webkit-playsinline', '');
  //   const tryPlay = () => v.play().catch(() => {});
  //   v.addEventListener('loadedmetadata', tryPlay, { once: true });
  //   v.load();
  //   return () => v.removeEventListener('loadedmetadata', tryPlay);
  // }, []);

  // Retry when the loading overlay is gone — iOS blocks play() on covered elements
  // useEffect(() => {
  //   if (!ready) return;
  //   videoRef.current?.play().catch(() => {});
  // }, [ready]);
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

  return (
    <div dir={dir} style={{ background: s.pageBg, color: s.text, fontFamily: bodyFont }}>
      <GalaxyEnvelope upSrc={customImages?.envelopeUp ?? s.envelopeUp} />

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
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source src="/templates/galaxy/galaxyvideo.webm" type="video/webm" />
        </video>
        </div>

        {/* Text overlay image (covers full screen, no rotation) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={customImages?.image1 ?? `/templates/galaxy/tmp003${isAr ? 'AR' : 'FR'}1textoverlay.webp`}
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ animation: 'scroll-reveal 0.5s ease 2s both, scroll-hint 1.6s ease-in-out 2.5s infinite' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: s.accentLight }} aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: s.accentLight, opacity: 0.5 }} className="-mt-4" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Galaxy → page transition */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px', background: `linear-gradient(to bottom, transparent, ${s.dark})`, pointerEvents: 'none' }} />
      </div>

      {/* ── Second image — locale + color aware ─────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={customImages?.image2 ?? `/templates/galaxy/TMP003${isAr ? 'AR' : 'FR'}2${colorId.toUpperCase()}.webp`}
        alt=""
        style={{ width: '100%', maxWidth: '420px', display: 'block', margin: '40px auto 0', borderRadius: '4px', padding: '0 48px', boxSizing: 'border-box' }}
      />

      {/* ── Page content (dark theme) ─────────────────────────────────────── */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Save The Date */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(32px, 9vw, 42px)', fontStyle: isAr ? 'normal' : 'italic', color: s.text, lineHeight: 1.1 }}>
            {isAr ? 'احفظ التاريخ' : 'Retenez la Date'}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <StarDivider color={s.accent} />
          </div>
        </div>

        {/* Date / time banner */}
        <div style={{ marginTop: '32px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', padding: '20px 24px', textAlign: 'center', border: `1px solid ${s.accent}55` }}>
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

        {(data.venue || data.city) && (
          <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.07)', border: `1px solid ${s.accent}44`, borderRadius: '4px', padding: '28px 24px', textAlign: 'center' }}>
            {data.venue && (
              <p style={{ fontFamily: displayFont, fontSize: 'clamp(16px, 4.5vw, 20px)', fontStyle: isAr ? 'normal' : 'italic', color: s.text, marginBottom: '6px', lineHeight: 1.2 }}>
                {data.venue}
              </p>
            )}
            {data.city && (
              <p style={{ fontFamily: bodyFont, fontSize: '11px', letterSpacing: '0.18em', color: s.dim }}>
                {data.city.toUpperCase()}
              </p>
            )}
          </div>
        )}

        <MapBlock mapUrl={data.mapUrl} mapLinkUrl={data.mapLinkUrl} />

        {/* Programme */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <StarDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: s.text, lineHeight: 1.1 }}>
          {tl.programme}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'max-content 10px max-content', alignItems: 'center' }}>
            {programme.map((item, i) => {
              const isLast = i === programme.length - 1;
              return (
                <React.Fragment key={i}>
                  <div style={{ textAlign: isAr ? 'left' : 'right', paddingInlineEnd: '16px', paddingBottom: isLast ? 0 : '32px' }}>
                    <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', color: s.text }}>{item.time}</p>
                  </div>
                  <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: isLast ? 0 : '32px', background: `linear-gradient(to right, transparent calc(50% - 0.5px), ${s.accent}44 calc(50% - 0.5px), ${s.accent}44 calc(50% + 0.5px), transparent calc(50% + 0.5px))` }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.accent, flexShrink: 0, position: 'relative', zIndex: 1 }} />
                  </div>
                  <div style={{ textAlign: isAr ? 'right' : 'left', paddingInlineStart: '16px', paddingBottom: isLast ? 0 : '32px' }}>
                    <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '16px', color: s.dim, lineHeight: 1.3 }}>{item.label}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Résumé */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <StarDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: s.text, lineHeight: 1.1 }}>
          {tl.resumeTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
          <div style={{ border: `1px solid ${s.accent}33`, borderRadius: '3px', padding: '20px 24px', textAlign: 'center', background: 'rgba(255,255,255,0.07)' }}>
            <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: s.dim }}>{tl.resumeDate}</p>
            <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '18px', color: s.text, letterSpacing: '0.04em', marginTop: '8px' }}>{formattedDate}</p>
          </div>
          {data.time && (
            <div style={{ border: `1px solid ${s.accent}33`, borderRadius: '3px', padding: '20px 24px', textAlign: 'center', background: 'rgba(255,255,255,0.07)' }}>
              <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: s.dim }}>{tl.resumeTime}</p>
              <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '18px', color: s.text, letterSpacing: '0.04em', marginTop: '8px' }}>{data.time}</p>
            </div>
          )}
          {(data.venue || data.city) && (
            <div style={{ border: `1px solid ${s.accent}33`, borderRadius: '3px', padding: '20px 24px', textAlign: 'center', background: 'rgba(255,255,255,0.07)' }}>
              <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: s.dim }}>{tl.resumePlace}</p>
              <p style={{ fontFamily: bodyFont, fontStyle: 'italic', fontSize: '18px', color: s.text, letterSpacing: '0.04em', lineHeight: 1.35, marginTop: '8px' }}>
                {data.venue && data.venue}
                {data.venue && data.city && <br />}
                {data.city && data.city}
              </p>
            </div>
          )}
        </div>

      </main>

      {/* Closing image — full width */}
      <div style={{ marginTop: '70px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={customImages?.image3 ?? `/templates/galaxy/TMP003${isAr ? 'AR' : 'FR'}3${colorId.toUpperCase()}.webp`}
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}
