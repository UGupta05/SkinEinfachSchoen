import React from 'react';
import type { Metadata } from 'next';
import '../index.css';
import { Layout } from '../components/Layout';
import { SITE_URL } from '../config/site';

export const metadata: Metadata = {
  // Resolves every relative canonical/OG URL against the canonical www origin.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SKIN einfach schön | Kosmetik & Ästhetik Osnabrück',
    template: '%s | SKIN einfach schön'
  },
  description: 'Ihr Kosmetikstudio in Osnabrück für medizinische Kosmetik, JetPeel, IPL Haarentfernung, Microneedling & ZO Skin Health. Wissenschaftliche Präzision für Ihre Haut.',
  keywords: ['Kosmetikstudio', 'Osnabrück', 'JetPeel', 'IPL Haarentfernung', 'Microneedling', 'Dermaneedling', 'ZO Skin Health', 'Hautanalyse', 'Orthomolekulare Medizin', 'Zellgesundheit'],
  // Controls the preview card when a link is shared on WhatsApp, Instagram,
  // Facebook or LinkedIn. Child pages inherit this and override title/description
  // via their own metadata export.
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'SKIN einfach schön',
    title: 'SKIN einfach schön | Kosmetik & Ästhetik Osnabrück',
    description: 'Ihr Kosmetikstudio in Osnabrück für medizinische Kosmetik, JetPeel, IPL Haarentfernung, Microneedling & ZO Skin Health.',
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
    title: 'SKIN einfach schön | Kosmetik & Ästhetik Osnabrück',
    description: 'Ihr Kosmetikstudio in Osnabrück für medizinische Kosmetik, JetPeel, IPL Haarentfernung, Microneedling & ZO Skin Health.',
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
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.png?v=10" type="image/png" />
        <link rel="icon" href="/favicon.ico?v=10" />
        <link rel="icon" href="/favicon.svg?v=10" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png?v=10" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
