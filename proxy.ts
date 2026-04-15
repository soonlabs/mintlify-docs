import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';

export default createI18nMiddleware(i18n);

export const config = {
  // Skip i18n routing for static assets and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.png|favicon.svg|logo|images|robots.txt|sitemap.xml).*)',
  ],
};
