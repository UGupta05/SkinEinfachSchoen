/**
 * Canonical origin of the live site.
 *
 * The apex domain (skin-einfachschoen.de) issues a 308 redirect to the www
 * host, so www is the canonical form. Every canonical URL, sitemap entry and
 * JSON-LD reference must use this exact origin — pointing them at a
 * redirecting or non-existent host makes Google drop the pages from the index
 * ("Seite mit Weiterleitung").
 */
export const SITE_URL = 'https://www.skin-einfachschoen.de';

/** Builds an absolute URL from a root-relative path ('' or '/kontakt'). */
export function absoluteUrl(path = ''): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
