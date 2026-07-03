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
  keywords: ['Kosmetikstudio', 'Osnabrück', 'JetPeel', 'IPL Haarentfernung', 'Microneedling', 'ZO Skin Health', 'Wimpernlifting', 'Brow Lift', 'Hautanalyse'],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
