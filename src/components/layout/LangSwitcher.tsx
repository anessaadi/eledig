'use client';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

export default function LangSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const current = (params?.locale as string) ?? 'fr';
  const other = current === 'fr' ? 'ar' : 'fr';

  return (
    <button
      onClick={() => router.replace(pathname, { locale: other })}
      className="text-sm uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
      aria-label="Switch language"
    >
      {other === 'ar' ? 'العربية' : 'Français'}
    </button>
  );
}
