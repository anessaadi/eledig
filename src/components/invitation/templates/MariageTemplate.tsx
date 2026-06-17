'use client';

import React, { useRef, useEffect } from 'react';
import { MapBlock } from '../MapBlock';
import type { ReactNode } from 'react';
import MariageEnvelope from './MariageEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const FR = 'var(--font-fr-display), Georgia, serif';
const FR_BODY = 'var(--font-fr-body), Georgia, serif';
const AR = 'var(--font-ar-display), serif';
const AR_NAMES = 'var(--font-aref-ruqaa), serif';
const AR_BODY = 'var(--font-ar-body), serif';

const GOLD = '#c9a055';
const GOLD_LIGHT = '#e8d098';
const PAGE_BG = '#fafafa';
const TEXT = '#111111';
const DIM = '#555555';
const BANNER_BG = '#111111';
const BANNER_TEXT = '#c9a055';
const BTN_TEXT = '#0a0a0a';

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'يناير', 'فيفري', 'مارس', 'أبريل', 'ماي', 'جوان',
  'جويلية', 'آوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const DAYS_AR = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const PROGRAMME_FR = [
  { time: '18h00', label: 'Cérémonie de Nikah' },
  { time: '19h00', label: 'Dîner & Fête' },
  { time: '20h00', label: 'Soirée dansante' },
];
const PROGRAMME_AR = [
  { time: '18:00', label: 'مراسم النكاح' },
  { time: '19:00', label: 'العشاء والاحتفال' },
  { time: '20:00', label: 'رقص جماعي' },
];
const TEXT_LABELS = {
  fr: { programme: 'Programme', resumeTitle: 'Résumé', dateLabel: 'Date', venueLabel: 'Lieu', timeLabel: 'Heure' },
  ar: { programme: 'البرنامج', resumeTitle: 'ملخص', dateLabel: 'التاريخ', venueLabel: 'المكان', timeLabel: 'التوقيت' },
};

function buildCalendar(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth();
  const highlight = d.getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const flat: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) flat.push(null);
  for (let i = 1; i <= daysInMonth; i++) flat.push(i);
  while (flat.length % 7 !== 0) flat.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < flat.length; i += 7) weeks.push(flat.slice(i, i + 7));
  return { weeks, highlight };
}

function GoldDivider({ light = false }: { light?: boolean }) {
  const c = light ? '#e8d098' : GOLD;
  return (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 632.31 32.02"
      fill={c} aria-hidden="true"
      style={{ width: '100%', maxWidth: '260px', height: 'auto', opacity: 0.85 }}>
      <path d="M290.6,729.6,80.54,725.55,290.86,721l56.77,2.51v2.86Z" transform="translate(-80.54 -709.3)"/>
      <path d="M502.78,721l210.06,4.06L502.52,729.6l-56.77-2.5v-2.87Z" transform="translate(-80.54 -709.3)"/>
      <path d="M396.69,741.32c-3-8.1-8.09-13.69-15.88-16,7.63-3.22,13-8.46,15.88-16,2.11,7.52,7.8,12.58,15.88,16C405.53,727.13,400.38,732.77,396.69,741.32Z" transform="translate(-80.54 -709.3)"/>
      <path d="M364.22,733.62c-1.56-4.2-4.2-7.11-8.24-8.31a14.26,14.26,0,0,0,8.24-8.32c1.1,3.91,4,6.54,8.24,8.32C368.81,726.25,366.14,729.18,364.22,733.62Z" transform="translate(-80.54 -709.3)"/>
      <path d="M429.16,733.62c-1.57-4.2-4.2-7.11-8.24-8.31a14.26,14.26,0,0,0,8.24-8.32c1.1,3.91,4,6.54,8.24,8.32C433.74,726.25,431.07,729.18,429.16,733.62Z" transform="translate(-80.54 -709.3)"/>
    </svg>
  );
}


function GoldFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', padding: '36px 28px' }}>
      <svg
        viewBox="0 0 320 180"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="6" y="6" width="308" height="168" rx="1" ry="1"
          fill="none" stroke={GOLD} strokeWidth="1.6" opacity="0.7" />
        <rect x="13" y="13" width="294" height="154" rx="1" ry="1"
          fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        {([[6, 6], [314, 6], [6, 174], [314, 174]] as [number, number][]).map(([cx, cy], i) => (
          <path key={i}
            d={`M${cx},${cy - 8} L${cx + 8},${cy} L${cx},${cy + 8} L${cx - 8},${cy} Z`}
            fill={GOLD} opacity="0.7"
          />
        ))}
        <path d="M153,4 L160,0 L167,4 L160,10 Z" fill={GOLD} opacity="0.55" />
        <path d="M153,176 L160,180 L167,176 L160,170 Z" fill={GOLD} opacity="0.55" />
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Flower({ color }: { color: string }) {
  return (
    <svg
      style={{ position: 'absolute', top: '3px', left: '50%', transform: 'translateX(-50%)', width: '42px', height: '42px', zIndex: 0, color }}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="50" cy="26" rx="15" ry="24" transform={`rotate(${deg} 50 50)`} />
        ))}
      </g>
    </svg>
  );
}

export default function MariageTemplate({
  data,
  locale,
  customImages,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
  customImages?: Record<string, string>;
}) {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const displayFont = isAr ? AR : FR;
  const bodyFont = isAr ? AR_BODY : FR_BODY;

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const d = new Date(data.date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const monthLabel = isAr ? MONTHS_AR[month] : MONTHS_FR[month];
  const formattedDate = `${day} ${monthLabel} ${year}`;
  const tl = TEXT_LABELS[locale];
  const programme = data.programme?.length ? data.programme : (isAr ? PROGRAMME_AR : PROGRAMME_FR);
  const DAYS = isAr ? DAYS_AR : DAYS_FR;
  const { weeks, highlight } = buildCalendar(data.date);
  const calMonthLabel = isAr ? `${MONTHS_AR[month]} ${year}` : `${MONTHS_FR[month]} ${year}`;

  const mapQuery = encodeURIComponent(
    [data.venue, data.city].filter(Boolean).join(', ') || 'Casablanca, Morocco'
  );

  return (
    <div dir={dir} style={{ background: PAGE_BG, color: TEXT, fontFamily: bodyFont }}>
      <MariageEnvelope />

      {/* -- Hero — full viewport video ------------------------------------- */}
      <div style={{ position: 'relative', height: '100dvh', width: '100%', overflow: 'hidden' }}>
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/templates/mariage/weddingvideo.mp4" type="video/mp4" />
        </video>

        {/* Black overlay 70% */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.70)' }} />

        {/* Decorative text overlay image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src="/templates/mariage/textoverlay.webp"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        /> */}

        {/* Wedding info on top */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: isAr ? AR_NAMES : displayFont,
            fontSize: isAr ? 'clamp(64px, 19vw, 100px)' : 'clamp(64px, 18vw, 96px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: '#ffffff',
            lineHeight: 1.1,
          }}>
            {data.bride}
          </h1>

          <span style={{
            fontFamily: FR,
            fontSize: 'clamp(36px, 9vw, 52px)',
            fontStyle: 'italic',
            color: GOLD,
            display: 'block',
            marginTop: isAr ? '16px' : '6px',
            letterSpacing: '0.08em',
          }}>
            &amp;
          </span>

          <h1 style={{
            fontFamily: isAr ? AR_NAMES : displayFont,
            fontSize: isAr ? 'clamp(64px, 19vw, 100px)' : 'clamp(64px, 18vw, 96px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: '#ffffff',
            marginTop: isAr ? '16px' : '6px',
            lineHeight: 1.1,
          }}>
            {data.groom}
          </h1>

          <p style={{
            fontFamily: bodyFont,
            fontSize: isAr ? '24px' : '17px',
            letterSpacing: '0.18em',
            color: GOLD,
            marginTop: isAr ? '80px' : '18px',
          }}>
            {`${day} ${monthLabel} ${year}`}
          </p>

          {isAr && (
            <>
              <p style={{ fontFamily: bodyFont, fontSize: '17px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.65)', marginTop: '14px' }}>
                ??? ??????
              </p>
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animation: 'scroll-reveal 0.5s ease 1s both, scroll-hint 1.6s ease-in-out 1.5s infinite' }}
        >
          <div className="flex flex-col items-center gap-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: GOLD }} aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: GOLD, opacity: 0.5 }} className="-mt-4" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* -- Page content --------------------------------------------------- */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 72px' }}>

        {/* Save The Date */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <h2 style={{
            fontFamily: displayFont,
            fontSize: 'clamp(30px, 9vw, 40px)',
            fontStyle: isAr ? 'normal' : 'italic',
            color: TEXT,
            lineHeight: 1.1,
          }}>
            {isAr ? 'احفظ التاريخ' : 'Retenez la Date'}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <GoldDivider />
          </div>
        </div>

        {/* Calendar */}
        <p style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '17px', letterSpacing: '0.16em', textAlign: 'center', marginTop: '24px', color: DIM }}>
          {calMonthLabel}
        </p>
        <table style={{ width: '100%', maxWidth: '360px', margin: '16px auto 0', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', paddingBottom: '12px', textAlign: 'center', color: DIM }}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((d, di) =>
                  d === highlight ? (
                    <td key={di} style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '15px', textAlign: 'center', padding: '10px 0', position: 'relative', color: '#111111' }}>
                      <Flower color={GOLD} />
                      <span style={{ position: 'relative', zIndex: 10 }}>{d}</span>
                    </td>
                  ) : (
                    <td key={di} style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: '15px', textAlign: 'center', padding: '10px 0', color: DIM }}>
                      {d && <span>{d}</span>}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Date / time banner */}
        <div style={{ marginTop: '32px', background: BANNER_BG, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 'clamp(17px, 4.8vw, 22px)', letterSpacing: '0.12em', color: BANNER_TEXT }}>
            {`${day} ${monthLabel} ${year}`}
          </p>
          {data.time && (
            <p style={{ fontFamily: FR_BODY, fontSize: '12px', letterSpacing: '0.15em', color: '#fff', marginTop: '7px', opacity: 0.7 }}>
              {isAr ? `اعتبارا من ${data.time}` : `À PARTIR DE ${data.time.toUpperCase()}`}
            </p>
          )}
        </div>

        {/* Localisation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <GoldDivider />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 8vw, 36px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: TEXT, lineHeight: 1.1 }}>
          {isAr ? 'الموقع' : 'Localisation'}
        </h2>
        <MapBlock mapUrl={data.mapUrl} mapLinkUrl={data.mapLinkUrl} />

        {(data.venue || data.city) && (
          <p style={{ fontFamily: bodyFont, fontSize: '14px', textAlign: 'center', marginTop: '16px', color: DIM, letterSpacing: '0.05em', lineHeight: 1.45 }}>
            {data.venue && <span style={{ fontWeight: 600 }}>{data.venue}</span>}
            {data.venue && data.city && <br />}
            {data.city}
          </p>
        )}

        {/* Programme */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <GoldDivider />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 7.5vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: TEXT, fontWeight: isAr ? 400 : 700, lineHeight: 1.1 }}>
          {tl.programme}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'max-content 10px max-content', alignItems: 'start' }} dir={dir}>
            {programme.map((item, i) => (
              <React.Fragment key={i}>
                <span style={{ fontFamily: bodyFont, fontSize: '16px', color: DIM, textAlign: isAr ? 'left' : 'right', paddingInlineEnd: '12px', paddingTop: '2px' }}>
                  {item.time}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: GOLD, flexShrink: 0, marginTop: '4px' }} />
                  {i < programme.length - 1 && (
                    <div style={{ width: '2px', flexGrow: 1, minHeight: '32px', background: `linear-gradient(to bottom, ${GOLD}, ${GOLD}33)` }} />
                  )}
                </div>
                <span style={{ fontFamily: bodyFont, fontSize: '20px', color: TEXT, paddingInlineStart: '12px', paddingBottom: '20px', lineHeight: 1.3 }}>
                  {item.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Résumé */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <GoldDivider />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 7.5vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: TEXT, fontWeight: isAr ? 400 : 700, lineHeight: 1.1 }}>
          {tl.resumeTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
          <div style={{ background: BANNER_BG, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: GOLD_LIGHT, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.dateLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: BANNER_TEXT }}>{formattedDate}</p>
          </div>
          <div style={{ background: BANNER_BG, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: GOLD_LIGHT, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.timeLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: BANNER_TEXT }}>{data.time || '—'}</p>
          </div>
          <div style={{ background: BANNER_BG, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: GOLD_LIGHT, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.venueLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: BANNER_TEXT }}>
              {[data.venue, data.city].filter(Boolean).join(' — ') || '—'}
            </p>
          </div>
        </div>

      </main>

      {/* Closing image — full width */}
      <div style={{ marginTop: '70px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={customImages?.bottomImage ?? (isAr ? '/templates/mariage/mariagebottom2ar.webp' : '/templates/mariage/mariagebottom.webp')} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
}
