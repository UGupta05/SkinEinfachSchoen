import { SITE_URL, absoluteUrl } from '../config/site';
import { BUSINESS, AREA_SERVED } from '../config/business';
import type { FaqEntry } from '../content/types';

/**
 * schema.org JSON-LD builders. Every page references the same salon entity
 * via its @id so Google can tie services, FAQs and breadcrumbs to one
 * business.
 */

export const SALON_ID = `${SITE_URL}/#salon`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: BUSINESS.address.street,
  addressLocality: BUSINESS.address.city,
  postalCode: BUSINESS.address.postalCode,
  addressCountry: BUSINESS.address.country,
};

/** Compact reference used as `provider` on service pages. */
export const salonReference = {
  '@type': 'BeautySalon',
  '@id': SALON_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  telephone: BUSINESS.telephone,
  address: postalAddress,
};

/** Full entity, emitted once on the homepage. */
export function salonSchema() {
  return {
    '@context': 'https://schema.org',
    ...salonReference,
    image: absoluteUrl('/images/home/logo.png'),
    logo: absoluteUrl('/images/home/logo.png'),
    description:
      'Kosmetikstudio in Osnabrück für Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung mit Diodenlaser, Alexandritlaser und IPL sowie ZO Skin Health.',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: BUSINESS.googleBusinessUrl,
    sameAs: BUSINESS.sameAs,
    areaServed: AREA_SERVED.map((name) => ({ '@type': 'City', name })),
    email: BUSINESS.email,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    // Mirrors src/config/openingHours.ts — keep both in sync.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };
}

/** Parses "ab 259,- €" / "79,- €" into a number, or undefined. */
function parsePrice(price: string): number | undefined {
  const match = price.match(/(\d+(?:[.,]\d+)?)/);
  return match ? Number(match[1].replace(',', '.')) : undefined;
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  image: string;
  price?: string;
}) {
  const amount = input.price ? parsePrice(input.price) : undefined;
  const isFromPrice = input.price?.trim().toLowerCase().startsWith('ab') ?? false;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image),
    provider: salonReference,
    areaServed: { '@type': 'City', name: BUSINESS.address.city },
    ...(amount !== undefined && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        // "ab 259 €" is a starting price, not a fixed one.
        ...(isFromPrice
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: amount, priceCurrency: 'EUR' } }
          : { price: amount }),
      },
    }),
  };
}

export function faqSchema(faqs: readonly FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
