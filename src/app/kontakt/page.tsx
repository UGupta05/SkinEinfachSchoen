import React from 'react';
import { Metadata } from 'next';
import { KontaktClient } from './KontaktClient';

export const metadata: Metadata = {
  title: 'Kontakt & Anfahrt | SKIN einfach schön Kosmetikstudio Osnabrück',
  description: 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Kontaktieren Sie uns per Formular, E-Mail oder rufen Sie uns in Osnabrück an.',
};

export default function KontaktPage() {
  return <KontaktClient />;
}
