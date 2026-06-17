import { getTranslations } from 'next-intl/server';
import RoyalBordeauxTemplate from './RoyalBordeauxTemplate';
import IslamicTemplate from './IslamicTemplate';
import RosaTemplate from './RosaTemplate';
import EleganceTemplate from './EleganceTemplate';
import JardinTemplate from './JardinTemplate';
import KabyleTemplate from './KabyleTemplate';
import GoldenTemplate from './GoldenTemplate';
import GalaTemplate from './GalaTemplate';
import MariageTemplate from './MariageTemplate';
import GalaxyTemplate from './GalaxyTemplate';

export type InviteData = {
  bride: string;
  groom: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  mapUrl?: string;
  mapLinkUrl?: string;
  programme?: Array<{ time: string; label: string }>;
};

export type InviteStyle = {
  variant: 'jardin' | 'royal-bordeaux' | 'islamic' | 'rosa' | 'elegance' | 'kabyle' | 'golden' | 'gala' | 'mariage' | 'galaxy';
  bg: string;
  ink: string;
  accent: string;
  colorId?: string;
};

function formatDate(iso: string, locale: 'fr' | 'ar') {
  try {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

// One template component, four visual variants driven by `style.variant`.
async function resolveShortMapUrl(url: string): Promise<{ mapUrl: string; mapLinkUrl: string }> {
  if (url.includes('/maps/embed') || /@-?\d+\.\d+,-?\d+\.\d+/.test(url)) return { mapUrl: url, mapLinkUrl: url };
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
    const finalUrl = res.url;
    if (/@-?\d+\.\d+,-?\d+\.\d+/.test(finalUrl)) return { mapUrl: finalUrl, mapLinkUrl: url };
  } catch {}
  return { mapUrl: url, mapLinkUrl: url };
}

export default async function InvitationTemplate({
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
  // Resolve short map links and preserve original URL for click navigation
  let resolvedData = data;
  if (data.mapUrl && !data.mapLinkUrl) {
    const { mapUrl, mapLinkUrl } = await resolveShortMapUrl(data.mapUrl);
    resolvedData = { ...data, mapUrl, mapLinkUrl };
  }

  if (style.variant === 'royal-bordeaux') {
    return <RoyalBordeauxTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'islamic') {
    return <IslamicTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'rosa') {
    return <RosaTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'elegance') {
    return <EleganceTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'jardin') {
    return <JardinTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'kabyle') {
    return <KabyleTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'golden') {
    return <GoldenTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'gala') {
    return <GalaTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'mariage') {
    return <MariageTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  if (style.variant === 'galaxy') {
    return <GalaxyTemplate data={resolvedData} style={style} locale={locale} customImages={customImages} />;
  }

  const t = await getTranslations('invitation');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const display = locale === 'ar' ? 'font-ar-display' : 'font-fr-display';
  const body = locale === 'ar' ? 'font-ar-body' : 'font-fr-body';

  const Flourish = () => (
    <svg width="120" height="20" viewBox="0 0 120 20" className="mx-auto my-6" aria-hidden>
      <path d="M2 10 H44 M118 10 H76" stroke={style.accent} strokeWidth="1" />
      <path d="M50 10 q5 -8 10 0 q5 8 10 0" fill="none" stroke={style.accent} strokeWidth="1.3" />
      <circle cx="60" cy="10" r="2" fill={style.accent} />
    </svg>
  );

  return (
    <div dir={dir} className={`${body} min-h-screen w-full px-6 py-16`}
         style={{ background: style.bg, color: style.ink }}>
      <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.4em]" style={{ opacity: 0.7 }}>
          {t('save')}
        </p>
        <Flourish />
        <p className={`${body} text-sm`} style={{ opacity: 0.85 }}>{t('youAreInvited')}</p>
        <h1 className={`${display} mt-6 text-5xl leading-tight md:text-6xl`}>{data.bride}</h1>
        <span className={`${display} my-3 text-3xl`} style={{ color: style.accent }}>{t('and')}</span>
        <h1 className={`${display} text-5xl leading-tight md:text-6xl`}>{data.groom}</h1>
        <Flourish />

        <div className="mt-4 grid gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ opacity: 0.6 }}>{t('when')}</p>
            <p className={`${display} mt-2 text-xl`}>{formatDate(data.date, locale)}</p>
            {data.time && <p className="mt-1 text-sm" style={{ opacity: 0.8 }}>{data.time}</p>}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ opacity: 0.6 }}>{t('where')}</p>
            <p className={`${display} mt-2 text-xl`}>{data.venue}</p>
            {data.city && <p className="mt-1 text-sm" style={{ opacity: 0.8 }}>{data.city}</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
