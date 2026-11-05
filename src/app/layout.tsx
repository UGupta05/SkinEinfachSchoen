import React from 'react';
import type { Metadata } from 'next';
import '../index.css';
import { Layout } from '../components/Layout';
import { SITE_URL } from '../config/site';
import { THEME_LIST, TREATMENT_LIST, themePath, treatmentPath } from '../content';

const TREATMENT_LINKS = TREATMENT_LIST.map((t) => ({ name: t.name, path: treatmentPath(t.slug) }));
const THEME_LINKS = THEME_LIST.map((t) => ({ name: t.name, path: themePath(t.slug) }));

export const metadata: Metadata = {
  // Resolves every relative canonical/OG URL against the canonical www origin.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kosmetikstudio Osnabrück | SKIN einfach schön',
    template: '%s | SKIN einfach schön'
  },
  description: 'Kosmetikstudio in Osnabrück für Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung und ZO Skin Health. Mit VISIA® Hautanalyse. Jetzt Termin buchen.',
  // Controls the preview card when a link is shared on WhatsApp, Instagram,
  // Facebook or LinkedIn. Child pages inherit this and override title/description
  // via their own metadata export.
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'SKIN einfach schön',
    title: 'Kosmetikstudio Osnabrück | SKIN einfach schön',
    description: 'Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung und ZO Skin Health in Osnabrück.',
    url: '/',
    images: [
      {
        url: '/images/home/home_hero_new_3.jpg',
        width: 1024,
        height: 576,
        alt: 'Behandlungsraum von SKIN einfach schön in Osnabrück',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kosmetikstudio Osnabrück | SKIN einfach schön',
    description: 'Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung und ZO Skin Health in Osnabrück.',
    images: ['/images/home/home_hero_new_3.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=10', type: 'image/png' },
      { url: '/favicon.ico?v=10' },
      { url: '/favicon.svg?v=10', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.png?v=10',
    apple: '/favicon.png?v=10',
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class
    // before React hydrates.
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Marks the document as JS-enabled before first paint so scroll
            animations can hide not-yet-revealed content without hiding it
            from crawlers or visitors without JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="icon" href="/favicon.png?v=10" type="image/png" />
        <link rel="icon" href="/favicon.ico?v=10" />
        <link rel="icon" href="/favicon.svg?v=10" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png?v=10" />
      </head>
      <body>
        <Layout treatmentLinks={TREATMENT_LINKS} themeLinks={THEME_LINKS}>{children}</Layout>
      </body>
    </html>
  );
}
