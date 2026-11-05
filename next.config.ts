import type { NextConfig } from 'next';

/**
 * Permanent redirects for URLs Google still has from earlier versions of the
 * site. Every entry here was seen in Search Console; sending them to the
 * closest current page keeps their rankings and links instead of 404ing.
 */
const LEGACY_REDIRECTS: ReadonlyArray<readonly [source: string, destination: string]> = [
  // First Next.js version exposed treatments at the root.
  ['/jetpeel', '/leistungen/jetpeel'],
  ['/ipl', '/leistungen/ipl'],
  ['/meso-bb-glow', '/leistungen/meso-bb-glow'],
  ['/microneedling', '/leistungen/microneedling'],
  ['/dermaneedling', '/leistungen/microneedling'],
  ['/fruchtsaeure-peeling', '/leistungen/fruchtsaeure-peeling'],
  ['/visia', '/leistungen/visia'],
  // Classic microneedling now lives at /leistungen/microneedling.
  ['/leistungen/dermaneedling', '/leistungen/microneedling'],

  // Old WordPress site.
  ['/jetpeel-2', '/leistungen/jetpeel'],
  ['/fruchtsaeure', '/leistungen/fruchtsaeure-peeling'],
  ['/hautanalyse', '/leistungen/visia'],
  ['/ipl-haarentfernung-in-osnabrueck-fuer-langanhaltend-glatte-haut', '/dauerhafte-haarentfernung'],
  ['/medical-cosmetik-zo-skin-health', '/medical-kosmetik-zo'],
  ['/klassische-kosmetik-gesichtspflege-in-osnabrueck', '/leistungen/gesichtsreinigung'],
  ['/kontakt-zu-skin-einfachschoen-in-osnabrueck', '/kontakt'],
  ['/team-member/:name', '/team'],
  ['/wp-content/uploads/:path*', '/preise'],
  // Discontinued or merged services: closest overview page.
  ['/kosmetische-zahn-bleaching', '/leistungen'],
  ['/brow-lifting', '/leistungen'],
  ['/brow-lift', '/leistungen'],
  ['/wimpernlifting', '/leistungen'],
  ['/apparative-kosmetik', '/leistungen'],
  ['/aktuelle-angebote', '/leistungen'],
  ['/kosmetik', '/leistungen'],
  ['/maennerpflege-in-osnabrueck', '/leistungen'],
  ['/faq', '/'],
  ['/blog', '/'],

  // Removed city landing pages (near-duplicate content).
  ['/stadt/:city/dermaneedling', '/leistungen/microneedling'],
  ['/stadt/:city/:treatment', '/leistungen/:treatment'],
  ['/stadt/:city', '/'],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
