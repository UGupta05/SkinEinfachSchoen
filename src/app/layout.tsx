import React from 'react';
import type { Metadata } from 'next';
import '../index.css';
import { Layout } from '../components/Layout';

export const metadata: Metadata = {
  title: {
    default: 'SKIN einfach schön | Kosmetik & Ästhetik Osnabrück',
    template: '%s | SKIN einfach schön'
  },
  description: 'Ihr Kosmetikstudio in Osnabrück für medizinische Kosmetik, JetPeel, IPL Haarentfernung, Microneedling & ZO Skin Health. Wissenschaftliche Präzision für Ihre Haut.',
  keywords: ['Kosmetikstudio', 'Osnabrück', 'JetPeel', 'IPL Haarentfernung', 'Microneedling', 'Dermaneedling', 'ZO Skin Health', 'Hautanalyse', 'Orthomolekulare Medizin', 'Zellgesundheit'],
  icons: {
    icon: [
      { url: '/favicon.ico?v=3', sizes: 'any' },
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon.png?v=3', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: '/apple-icon.png?v=3',
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
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=3" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
