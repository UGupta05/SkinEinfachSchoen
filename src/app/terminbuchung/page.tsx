import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { TerminbuchungPageClient } from './TerminbuchungPageClient';

export const metadata: Metadata = {
  title: 'Terminbuchung online | SKIN einfach schön Kosmetikstudio Osnabrück',
  description: 'Buchen Sie Ihren Wunschtermin für Kosmetikbehandlungen, JetPeel, IPL oder Hautanalyse bequem online. Wählen Sie Datum & Uhrzeit.',
};

export default function TerminbuchungPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[75vh] flex items-center justify-center">
        <p className="text-sm font-display font-bold uppercase tracking-wider text-primary">Terminbuchung wird geladen...</p>
      </div>
    }>
      <TerminbuchungPageClient />
    </Suspense>
  );
}
