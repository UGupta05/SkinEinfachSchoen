import { MetadataRoute } from 'next';
import { GEO_CITIES } from '../data/geoCities';
import { TREATMENT_DETAILS } from '../data/treatmentDetails';
import { SITE_URL } from '../config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  
  // Base Pages
  const staticPages = [
    '',
    '/leistungen',
    '/medical-kosmetik-zo',
    '/orthomolekulare-medizin',
    '/team',
    '/kontakt',
    '/terminbuchung',
    '/shop',
    // /impressum and /datenschutz are intentionally omitted: both are
    // noindex, and listing noindex URLs in the sitemap is a mixed signal.
  ].map((route) => ({
    // Homepage must be listed as the canonical '/' form, not a bare origin.
    url: route === '' ? `${baseUrl}/` : `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Treatment Slugs
  const treatmentPages = Object.keys(TREATMENT_DETAILS).map((slug) => ({
    url: `${baseUrl}/leistungen/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Localized City Pages
  const cityPages = Object.keys(GEO_CITIES).map((city) => ({
    url: `${baseUrl}/stadt/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Localized City + Treatment Pages
  const cityTreatmentPages: MetadataRoute.Sitemap = [];
  Object.keys(GEO_CITIES).forEach((city) => {
    Object.keys(TREATMENT_DETAILS).forEach((treatment) => {
      cityTreatmentPages.push({
        url: `${baseUrl}/stadt/${city}/${treatment}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    });
  });

  return [...staticPages, ...treatmentPages, ...cityPages, ...cityTreatmentPages];
}
