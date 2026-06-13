'use client';

import RosaEnvelope from './RosaEnvelope';
import type { InviteData, InviteStyle } from './InvitationTemplate';

const AR = 'var(--font-ar-display), serif';
const AR_BODY = 'var(--font-ar-body), serif';
const FR = 'var(--font-fr-display), Georgia, serif';
const FR_BODY = 'var(--font-fr-body), Georgia, serif';

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const DAYS_AR = ['أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];

const MONTHS_FR = [
  'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
  'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE',
];
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const TEXT = {
  fr: {
    saveTheDate: 'SAVE THE DATE',
    startingAt: (t: string) => `À PARTIR DE ${t.toUpperCase()}`,
    localisation: 'LOCALISATION',
    rsvpTitle: 'JE CONFIRME\nMA PRÉSENCE',
    rsvpBtn: 'CLIQUEZ\nICI',
  },
  ar: {
    saveTheDate: 'احفظ حضوركم',
    startingAt: (t: string) => `ابتداءً من ${t}`,
    localisation: 'الموقع',
    rsvpTitle: 'أؤكد\nحضوري',
    rsvpBtn: 'اضغط\nهنا',
  },
};

type Scheme = {
  bg: string;
  cream: string;
  dim: string;
  dark: string;
  accent: string;
  envelopeUp: string;
  envelopeDown: string;
};

const SCHEMES: Record<string, Scheme> = {
  burgundy: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #6b1228 0%, #4a0c1c 40%, #2a0510 100%)',
    cream: '#f5e8ec',
    dim: '#d4a0b0',
    dark: '#4a0c1c',
    accent: '#f5e8ec',
    envelopeUp: '/templates/rosa/upburgundyrosa.webp',
    envelopeDown: '/templates/rosa/downburgundyrosa.webp',
  },
  blue: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #0d3578 0%, #072b60 40%, #020f28 100%)',
    cream: '#e8eef8',
    dim: '#8ca4c8',
    dark: '#072b60',
    accent: '#e8eef8',
    envelopeUp: '/templates/rosa/upbluerosa.webp',
    envelopeDown: '/templates/rosa/downbluerosa.webp',
  },
  purple: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #3b0764 0%, #2d0a52 40%, #150328 100%)',
    cream: '#f3e5f5',
    dim: '#c8a8d8',
    dark: '#2d0a52',
    accent: '#f3e5f5',
    envelopeUp: '/templates/rosa/upburgundyrosa.webp',
    envelopeDown: '/templates/rosa/downburgundyrosa.webp',
  },
  gold: {
    bg: 'radial-gradient(ellipse 140% 100% at 50% 30%, #6b4a00 0%, #4a3200 40%, #2a1e00 100%)',
    cream: '#f9f1e0',
    dim: '#c8a870',
    dark: '#4a3200',
    accent: '#f9f1e0',
    envelopeUp: '/templates/rosa/upgoldrosa.png',
    envelopeDown: '/templates/rosa/downgoldrosa.png',
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

function FlowerDivider({ color }: { color: string }) {
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

export default function RosaTemplate({
  data,
  style,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  const isAr = locale === 'ar';
  const SERIF = isAr ? AR_BODY : FR_BODY;
  const DISPLAY = isAr ? AR : FR;
  const DAYS = isAr ? DAYS_AR : DAYS_FR;
  const t = TEXT[locale];

  const colorId = (style.colorId && SCHEMES[style.colorId]) ? style.colorId : 'burgundy';
  const scheme = SCHEMES[colorId];
  const { bg: BG, cream: CREAM, dim: DIM, dark: DARK } = scheme;

  const lang = isAr ? 'AR' : 'FR';
  const heroImage = `/templates/rosa/TMP004${lang}1${colorId.toUpperCase()}.png`;
  const closingImage = `/templates/rosa/TMP004${lang}2${colorId.toUpperCase()}.png`;

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
      <RosaEnvelope upSrc={scheme.envelopeUp} downSrc={scheme.envelopeDown} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt="Save the date"
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
        <div
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1"
          style={{ animation: 'scroll-reveal 0.5s ease 2s both, scroll-hint 1.6s ease-in-out 2.5s infinite' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: CREAM }} aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: CREAM, opacity: 0.5 }} className="-mt-4" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Page content ─────────────────────────────────────────────────── */}
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
                    <td key={j} style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '15px', textAlign: 'center', padding: '10px 0', position: 'relative', color: DARK }}>
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

        {/* Localisation */}
        <h2 style={{ fontFamily: DISPLAY, fontWeight: isAr ? 400 : 600, letterSpacing: isAr ? '0.01em' : '0.04em', textAlign: 'center', lineHeight: 1.1, fontSize: 'clamp(30px, 8.5vw, 34px)', marginTop: '60px' }}>
          {t.localisation}
        </h2>
        <iframe
          style={{ width: '100%', maxWidth: '380px', display: 'block', margin: '28px auto 0', borderRadius: '4px', boxShadow: '0 14px 40px rgba(0,0,0,0.4)', border: 'none' }}
          title="Localisation"
          height="240"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
        />
        {(data.venue || data.city) && (
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '16px', textAlign: 'center', marginTop: '18px', color: DIM, lineHeight: 1.3, letterSpacing: '0.04em' }}>
            {data.venue && data.venue.toUpperCase()}
            {data.venue && data.city && <br />}
            {data.city && data.city.toUpperCase()}
          </p>
        )}

        {/* RSVP */}
        <h2 style={{ fontFamily: DISPLAY, fontWeight: isAr ? 400 : 700, fontSize: 'clamp(28px, 8vw, 34px)', textAlign: 'center', lineHeight: 1.12, letterSpacing: isAr ? '0.01em' : '0.02em', marginTop: '70px' }}>
          {t.rsvpTitle.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <a
            style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '17px', letterSpacing: isAr ? '0.01em' : '0.04em', textAlign: 'center', lineHeight: 1.15, color: DARK, background: CREAM, textDecoration: 'underline', textUnderlineOffset: '3px', padding: '22px 46px', borderRadius: '2px', boxShadow: '0 8px 22px rgba(0,0,0,0.35)', display: 'inline-block' }}
            href={data.rsvpPhone ? `tel:${data.rsvpPhone}` : '#rsvp'}
          >
            {t.rsvpBtn.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </a>
        </div>

        {/* Closing image */}
        <div style={{ marginTop: '70px', maxWidth: '420px', margin: '70px auto 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={closingImage}
            alt="Closing"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

      </main>
    </div>
  );
}
