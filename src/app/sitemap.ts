import { MetadataRoute } from 'next';
import { GEO_CITIES } from '../data/geoCities';
import { TREATMENT_DETAILS } from '../data/treatmentDetails';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skineinfachschoen.de';
  
  // Base Pages
  const staticPages = [
    '',
    '/leistungen',
    '/medical-kosmetik-zo',
    '/orthomolekulare-medizin',
    '/team',
    '/kontakt',
    '/terminbuchung',
    '/impressum',
    '/datenschutz'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
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
