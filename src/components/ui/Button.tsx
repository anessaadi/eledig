import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline' | 'ghost';

const styles: Record<Variant, string> = {
  // Filled burgundy — primary CTA
  solid: 'bg-accent text-white border border-accent hover:bg-accent-hover hover:border-accent-hover',
  // Gold hairline outline, burgundy text
  outline: 'bg-transparent text-accent border border-gold hover:bg-accent hover:text-white hover:border-accent',
  // Soft card-toned
  ghost: 'bg-ivory text-accent border border-line hover:bg-sand',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm tracking-[0.12em] uppercase transition-colors duration-300';

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const external = href.startsWith('http') || href.startsWith('#');
  if (external) {
    return <a href={href} className={`${base} ${styles[variant]} ${className}`}>{children}</a>;
  }
  return <Link href={href} className={`${base} ${styles[variant]} ${className}`}>{children}</Link>;
}
