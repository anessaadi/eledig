import React from 'react';
import { MapBlock } from '../MapBlock';
import Image from 'next/image';
import RoyalBordeauxEnvelope from './RoyalBordeauxEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const DAYS_AR = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'يناير', 'فيفري', 'مارس', 'أبريل', 'ماي', 'جوان',
  'جويلية', 'آوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const SERIF_FR = 'var(--font-fr-body), Georgia, serif';
const DISPLAY_FR = 'var(--font-fr-display), "Times New Roman", serif';
const SERIF_AR = 'var(--font-ar-body), serif';
const DISPLAY_AR = 'var(--font-ar-display), serif';

const PROGRAMME_FR = [
  { time: '12h00', label: 'Début des festivités' },
  { time: '14h00', label: 'Déjeuner' },
  { time: '17h00', label: 'Cortège nuptial' },
  { time: '19h00', label: 'Début de soirée' },
];
const PROGRAMME_AR = [
  { time: '12h00', label: 'مراسم النكاح' },
  { time: '14h00', label: '?????' },
  { time: '17h00', label: '??????' },
  { time: '19h00', label: 'مراسم النكاح' },
];

const TEXT = {
  fr: {
    saveTheDate: 'RETENEZ LA DATE',
    startingAt: (t: string) => `À PARTIR DE ${t.toUpperCase()}`,
    programme: 'LE PROGRAMME',
    localisation: 'LOCALISATION',
    resumeTitle: 'EN BREF',
    resumeDate: 'DATE',
    resumeTime: 'HEURE',
    resumePlace: 'LIEU',
  },
  ar: {
    saveTheDate: '???? ???????',
    startingAt: (t: string) => `??????? ?? ${t}`,
    programme: 'البرنامج',
    localisation: '??????',
    resumeTitle: 'ملخص',
    resumeDate: '???????',
    resumeTime: '???????',
    resumePlace: '??????',
  },
};

type Scheme = {
  bg: string; cream: string; dim: string; dark: string;
  envelopeDown: string; envelopeUp: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #480b0b 0%, #370707 40%, #1e0303 100%)',
    cream: '#f3ece1', dim: '#d8c6c9', dark: '#370707',
    envelopeDown: '/templates/royal-bordeaux/down001.webp',
    envelopeUp:   '/templates/royal-bordeaux/up001.webp',
  },
  blue: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #0d3578 0%, #072b60 40%, #020f28 100%)',
    cream: '#e8eef8', dim: '#8ca4c8', dark: '#072b60',
    envelopeDown: '/templates/royal-bordeaux/down001.webp',
    envelopeUp:   '/templates/royal-bordeaux/blueup001.webp',
  },
  green: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #0a3d1f 0%, #072b15 40%, #031409 100%)',
    cream: '#e8f5e9', dim: '#a8c8a8', dark: '#072b15',
    envelopeDown: '/templates/royal-bordeaux/down001.webp',
    envelopeUp:   '/templates/royal-bordeaux/upgreen001.webp',
  },
  purple: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #3b0764 0%, #2d0a52 40%, #150328 100%)',
    cream: '#f3e5f5', dim: '#c8a8d8', dark: '#2d0a52',
    envelopeDown: '/templates/royal-bordeaux/down001.webp',
    envelopeUp:   '/templates/royal-bordeaux/uppurple001.webp',
  },
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
  return { weeks, highlight, month, year, day: highlight };
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

export default function RoyalBordeauxTemplate({
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
  const SERIF = isAr ? SERIF_AR : SERIF_FR;
  const DISPLAY = isAr ? DISPLAY_AR : DISPLAY_FR;
  const DAYS = isAr ? DAYS_AR : DAYS_FR;
  const t = TEXT[locale];

  const colorId = (style.colorId && SCHEMES[style.colorId]) ? style.colorId : 'burgundy';
  const scheme = SCHEMES[colorId];
  const { bg: BG, cream: CREAM, dim: DIM, dark: BURGUNDY } = scheme;
  const lang = isAr ? 'AR' : 'FR';
  const heroImage = `/templates/royal-bordeaux/TMP001${lang}1${colorId.toUpperCase()}.webp`;
  const closingImage = `/templates/royal-bordeaux/TMP001${lang}2${colorId.toUpperCase()}.webp`;

  const { weeks, highlight, month, year, day } = buildCalendar(data.date);
  const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
  const monthLabel = isAr ? `${MONTHS_AR[month]} ${year}` : `${MONTHS_FR[month]} ${year}`;
  const mapQuery = encodeURIComponent(
    [data.venue, data.city].filter(Boolean).join(', ') || 'Casablanca, Morocco'
  );

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-fixed"
      style={{ background: BG, color: CREAM, fontFamily: SERIF }}
    >
      <RoyalBordeauxEnvelope downSrc={scheme.envelopeDown} upSrc={scheme.envelopeUp} />

      {/* Hero — full viewport height, image shrinks to 90% */}
      <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
        <Image
          src={customImages?.heroImage ?? heroImage}
          alt="Save the date"
          width={390}
          height={844}
          className="w-full h-auto"
          style={{ animation: 'shrink-in 2s ease-in-out 1.5s both' }}
          priority
          sizes="100vw"
        />
        {/* Scroll indicator — appears after envelope (1.5s) + shrink (2s) = 3.5s */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ animation: 'scroll-reveal 0.5s ease 3.5s both, scroll-hint 1.6s ease-in-out 4s infinite' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: CREAM }} aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: CREAM, opacity: 0.5 }} className="-mt-4" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Page content */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 24px 64px' }}>

        {/* Save the date */}
        <h1 style={{ fontFamily: DISPLAY, fontWeight: isAr ? 400 : 600, letterSpacing: isAr ? '0.01em' : '0.04em', textAlign: 'center', lineHeight: 1.1, fontSize: '34px', marginTop: '56px' }}>
          {t.saveTheDate}
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '19px', letterSpacing: '0.18em', textAlign: 'center', marginTop: '14px', color: DIM }}>
          {monthLabel}
        </p>

        {/* Calendar */}
        <table style={{ width: '100%', maxWidth: '360px', margin: '30px auto 0', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', paddingBottom: '14px', textAlign: 'center' }}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((d, j) =>
                  d === highlight ? (
                    <td key={j} style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '15px', textAlign: 'center', padding: '10px 0', position: 'relative', color: BURGUNDY }}>
                      <Flower color={CREAM} />
                      <span style={{ position: 'relative', zIndex: 10 }}>{d}</span>
                    </td>
                  ) : (
                    <td key={j} style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '15px', textAlign: 'center', padding: '10px 0', color: DIM }}>
                      {d && <span>{d}</span>}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(36px, 10vw, 44px)', textAlign: 'center', marginTop: '40px', letterSpacing: '0.02em' }}>
          {formattedDate}
        </p>
        {data.time && (
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '13px', letterSpacing: isAr ? '0.01em' : '0.12em', textAlign: 'center', marginTop: '14px', color: DIM }}>
            {t.startingAt(data.time)}
          </p>
        )}

        {/* Programme */}
        <h2 style={{ fontFamily: DISPLAY, fontWeight: isAr ? 400 : 600, letterSpacing: isAr ? '0.01em' : '0.04em', textAlign: 'center', lineHeight: 1.1, fontSize: 'clamp(30px, 8.5vw, 34px)', marginTop: '60px' }}>
          {t.programme}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'max-content 10px max-content', alignItems: 'center' }}>
            {(isAr ? PROGRAMME_AR : PROGRAMME_FR).map((item, i) => {
              const isLast = i === (isAr ? PROGRAMME_AR : PROGRAMME_FR).length - 1;
              return (
                <React.Fragment key={i}>
                  {/* col1 — visually LEFT in LTR, visually RIGHT in RTL */}
                  <div style={{ textAlign: isAr ? 'left' : 'right', paddingInlineEnd: '16px', paddingBottom: isLast ? 0 : '32px' }}>
                    <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', color: CREAM }}>{item.time}</p>
                  </div>
                  <div style={{
                    alignSelf: 'stretch',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: isLast ? 0 : '32px',
                    background: `linear-gradient(to right, transparent calc(50% - 0.5px), ${CREAM}44 calc(50% - 0.5px), ${CREAM}44 calc(50% + 0.5px), transparent calc(50% + 0.5px))`,
                  }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: CREAM, flexShrink: 0, position: 'relative', zIndex: 1 }} />
                  </div>
                  {/* col3 — visually RIGHT in LTR, visually LEFT in RTL */}
                  <div style={{ textAlign: isAr ? 'right' : 'left', paddingInlineStart: '16px', paddingBottom: isLast ? 0 : '32px' }}>
                    <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '16px', color: DIM, lineHeight: 1.3 }}>{item.label}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Localisation */}
        <h2 style={{ fontFamily: DISPLAY, fontWeight: isAr ? 400 : 600, letterSpacing: isAr ? '0.01em' : '0.04em', textAlign: 'center', lineHeight: 1.1, fontSize: 'clamp(30px, 8.5vw, 34px)', marginTop: '60px' }}>
          {t.localisation}
        </h2>
        <MapBlock mapUrl={data.mapUrl} mapLinkUrl={data.mapLinkUrl} />
        {(data.venue || data.city) && (
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '16px', textAlign: 'center', marginTop: '18px', color: DIM, lineHeight: 1.3, letterSpacing: '0.04em' }}>
            {data.venue && data.venue.toUpperCase()}
            {data.venue && data.city && <br />}
            {data.city && data.city.toUpperCase()}
          </p>
        )}

        {/* Résumé */}
        <h2 style={{ fontFamily: DISPLAY, fontWeight: isAr ? 400 : 600, letterSpacing: isAr ? '0.01em' : '0.04em', textAlign: 'center', lineHeight: 1.1, fontSize: 'clamp(30px, 8.5vw, 34px)', marginTop: '60px' }}>
          {t.resumeTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
          {/* Date card */}
          <div style={{ border: `1px solid ${CREAM}33`, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: DIM }}>
              {t.resumeDate}
            </p>
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '18px', color: CREAM, letterSpacing: '0.04em', marginTop: '8px' }}>
              {formattedDate}
            </p>
          </div>
          {/* Time card */}
          {data.time && (
            <div style={{ border: `1px solid ${CREAM}33`, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: DIM }}>
                {t.resumeTime}
              </p>
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '18px', color: CREAM, letterSpacing: '0.04em', marginTop: '8px' }}>
                {data.time}
              </p>
            </div>
          )}
          {/* Place card */}
          {(data.venue || data.city) && (
            <div style={{ border: `1px solid ${CREAM}33`, borderRadius: '3px', padding: '20px 24px', textAlign: 'center' }}>
              <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', color: DIM }}>
                {t.resumePlace}
              </p>
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '18px', color: CREAM, letterSpacing: '0.04em', lineHeight: 1.35, marginTop: '8px' }}>
                {data.venue && data.venue}
                {data.venue && data.city && <br />}
                {data.city && data.city}
              </p>
            </div>
          )}
        </div>

        {/* Closing image */}
        <div style={{ marginTop: '70px', maxWidth: '420px', margin: '70px auto 0' }}>
          <Image
            src={customImages?.closingImage ?? closingImage}
            alt="Closing"
            width={420}
            height={600}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

      </main>
    </div>
  );
}
