import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'ar'],
  defaultLocale: 'ar',
});

export type Locale = (typeof routing.locales)[number];
