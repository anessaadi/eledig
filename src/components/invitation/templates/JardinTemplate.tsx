'use client';

import React from 'react';
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
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
  'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
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
  { time: '20:00', label: 'حفل الرقص' },
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

type Scheme = {
  pageBg: string; envelopeLeft: string; envelopeRight: string;
  accent: string; accentLight: string; text: string; dim: string;
  bannerBg: string; bannerText: string; btnText: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    pageBg: '#ffffff',
    envelopeLeft: '/templates/jardin/left003burgundy.png', envelopeRight: '/templates/jardin/right002burgundy.png',
    accent: '#9b1410', accentLight: '#f5b0b0',
    text: '#1a0404', dim: '#6a3030',
    bannerBg: '#9b1410', bannerText: '#ffffff', btnText: '#ffffff',
  },
  blue: {
    pageBg: '#ffffff',
    envelopeLeft: '/templates/jardin/left003blue.png', envelopeRight: '/templates/jardin/right002blue.png',
    accent: '#2f109b', accentLight: '#c0b0ff',
    text: '#0a0520', dim: '#4a3580',
    bannerBg: '#2f109b', bannerText: '#ffffff', btnText: '#ffffff',
  },
  purple: {
    pageBg: '#ffffff',
    envelopeLeft: '/templates/jardin/left003purple.png', envelopeRight: '/templates/jardin/right002purple.png',
    accent: '#891e8c', accentLight: '#f5b0f8',
    text: '#180a18', dim: '#5a2a5c',
    bannerBg: '#891e8c', bannerText: '#ffffff', btnText: '#ffffff',
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
  const formattedDate = `${day} ${monthLabel} ${year}`;
  const tl = TEXT_LABELS[locale];
  const programme = isAr ? PROGRAMME_AR : PROGRAMME_FR;
  const DAYS = isAr ? DAYS_AR : DAYS_FR;
  const { weeks, highlight } = buildCalendar(data.date);
  const calMonthLabel = isAr ? `${MONTHS_AR[month]} ${year}` : `${MONTHS_FR[month]} ${year}`;
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
            {isAr ? 'احفظ التاريخ' : 'Retenez la Date'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <LeafDivider color={s.accent} />
          </div>
        </div>

        {/* Calendar */}
        <p style={{ fontFamily: bodyFont, fontStyle: isAr ? 'normal' : 'italic', fontSize: '17px', letterSpacing: '0.16em', textAlign: 'center', marginTop: '24px', color: s.dim }}>
          {calMonthLabel}
        </p>
        <table style={{ width: '100%', maxWidth: '360px', margin: '16px auto 0', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', paddingBottom: '12px', textAlign: 'center', color: s.dim }}>
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
                    <td key={di} style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '15px', textAlign: 'center', padding: '10px 0', position: 'relative', color: '#ffffff' }}>
                      <Flower color={s.accent} />
                      <span style={{ position: 'relative', zIndex: 10 }}>{d}</span>
                    </td>
                  ) : (
                    <td key={di} style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: '15px', textAlign: 'center', padding: '10px 0', color: s.dim }}>
                      {d && <span>{d}</span>}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

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

        {/* Programme */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <LeafDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 7.5vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: s.text, fontWeight: isAr ? 400 : 700, lineHeight: 1.1 }}>
          {tl.programme}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: 'max-content 10px max-content', alignItems: 'start' }} dir={dir}>
            {programme.map((item, i) => (
              <React.Fragment key={i}>
                <span style={{ fontFamily: bodyFont, fontSize: '16px', color: s.dim, textAlign: isAr ? 'left' : 'right', paddingInlineEnd: '12px', paddingTop: '2px' }}>
                  {item.time}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.accent, flexShrink: 0, marginTop: '4px' }} />
                  {i < programme.length - 1 && (
                    <div style={{ width: '2px', flexGrow: 1, minHeight: '32px', background: `linear-gradient(to bottom, ${s.accent}, ${s.accent}33)` }} />
                  )}
                </div>
                <span style={{ fontFamily: bodyFont, fontSize: '20px', color: s.text, paddingInlineStart: '12px', paddingBottom: '20px', lineHeight: 1.3 }}>
                  {item.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Résumé */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
          <LeafDivider color={s.accent} />
        </div>
        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 7.5vw, 34px)', fontStyle: isAr ? 'normal' : 'italic', textAlign: 'center', marginTop: '14px', color: s.text, fontWeight: isAr ? 400 : 700, lineHeight: 1.1 }}>
          {tl.resumeTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
          <div style={{ background: s.bannerBg, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: s.accentLight, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.dateLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: s.bannerText }}>{formattedDate}</p>
          </div>
          <div style={{ background: s.bannerBg, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: s.accentLight, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.timeLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: s.bannerText }}>{data.time || '—'}</p>
          </div>
          <div style={{ background: s.bannerBg, borderRadius: '4px', padding: '18px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '12px', letterSpacing: '0.1em', color: s.accentLight, textTransform: 'uppercase', marginBottom: '6px' }}>{tl.venueLabel}</p>
            <p style={{ fontFamily: bodyFont, fontSize: '18px', fontWeight: 600, color: s.bannerText }}>
              {[data.venue, data.city].filter(Boolean).join(' — ') || '—'}
            </p>
          </div>
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
