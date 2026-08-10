/**
 * Single source of truth for NAP data (name, address, phone) and the
 * business's canonical presence on other platforms.
 *
 * Local SEO depends on these values being byte-identical wherever they
 * appear — website, Google Business Profile, directories. Import from here
 * instead of re-typing them into JSON-LD blocks.
 */

export const BUSINESS = {
  name: 'SKIN einfach schön',
  legalName: 'SKIN einfach schön - Kosmetikstudio Osnabrück',
  telephone: '+4917655132650',
  email: 'info@skin-einfachschoen.de',
  address: {
    street: 'Lotter Straße 33',
    postalCode: '49078',
    city: 'Osnabrück',
    country: 'DE',
  },
  geo: {
    latitude: 52.27218,
    longitude: 8.02672,
  },
  /** Google Business Profile — powers the map pack and the knowledge panel. */
  googleBusinessUrl: 'https://share.google/Oprx3yBlCRSAmhvFg',
  /** Verified profiles, used for schema.org sameAs entity reconciliation. */
  sameAs: [
    'https://www.instagram.com/skin_einfach_schoen/',
    'https://www.facebook.com/skineinfachschoen/?locale=de_DE',
    'https://www.youtube.com/@SkinEinfachSch%C3%B6n',
  ],
} as const;

/** Towns the studio draws customers from; mirrors the /stadt landing pages. */
export const AREA_SERVED = [
  'Osnabrück',
  'Georgsmarienhütte',
  'Wallenhorst',
  'Belm',
  'Lotte',
  'Hasbergen',
  'Hagen am Teutoburger Wald',
  'Bissendorf',
  'Ibbenbüren',
  'Melle',
] as const;
