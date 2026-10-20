import { MetadataRoute } from 'next';
import { SITE_URL } from '../config/site';
import { THEME_LIST, TREATMENT_LIST, themePath, treatmentPath } from '../content';

/**
 * Only content pages carry lastModified, taken from their updatedAt field.
 * Stamping every URL with the build time made Google ignore the value.
 * /impressum and /datenschutz are omitted: both are noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    '/',
    '/leistungen',
    '/preise',
    '/medical-kosmetik-zo',
    '/orthomolekulare-medizin',
    '/team',
    '/kontakt',
    '/terminbuchung',
    '/shop',
  ].map((path) => ({ url: `${SITE_URL}${path}` }));

  const themePages = THEME_LIST.map((page) => ({
    url: `${SITE_URL}${themePath(page.slug)}`,
    lastModified: new Date(page.updatedAt),
  }));

  const treatmentPages = TREATMENT_LIST.map((page) => ({
    url: `${SITE_URL}${treatmentPath(page.slug)}`,
    lastModified: new Date(page.updatedAt),
  }));

  return [...staticPages, ...themePages, ...treatmentPages];
}
