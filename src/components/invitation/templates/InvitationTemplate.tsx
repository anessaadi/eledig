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
  message: string;
  rsvpPhone: string;
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
export default async function InvitationTemplate({
  data,
  style,
  locale,
}: {
  data: InviteData;
  style: InviteStyle;
  locale: 'fr' | 'ar';
}) {
  if (style.variant === 'royal-bordeaux') {
    return <RoyalBordeauxTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'islamic') {
    return <IslamicTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'rosa') {
    return <RosaTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'elegance') {
    return <EleganceTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'jardin') {
    return <JardinTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'kabyle') {
    return <KabyleTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'golden') {
    return <GoldenTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'gala') {
    return <GalaTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'mariage') {
    return <MariageTemplate data={data} style={style} locale={locale} />;
  }

  if (style.variant === 'galaxy') {
    return <GalaxyTemplate data={data} style={style} locale={locale} />;
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

        {data.message && (
          <p className="mt-10 max-w-md text-base italic" style={{ opacity: 0.85 }}>
            “{data.message}”
          </p>
        )}

        {data.rsvpPhone && (
          <a href={`tel:${data.rsvpPhone}`}
             className="mt-10 inline-block rounded-full border px-7 py-3 text-sm uppercase tracking-[0.25em]"
             style={{ borderColor: style.accent, color: style.ink }}>
            {t('rsvp')}
          </a>
        )}
      </div>
    </div>
  );
}
