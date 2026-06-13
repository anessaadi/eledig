import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run on everything except API routes, Next internals, the /i invitation
  // pages (not localized) and files with an extension.
  matcher: ['/((?!api|_next|_vercel|i/|.*\\..*).*)'],
};
