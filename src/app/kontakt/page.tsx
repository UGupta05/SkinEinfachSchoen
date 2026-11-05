import React from 'react';
import { Metadata } from 'next';
import { KontaktClient } from './KontaktClient';
import { NEARBY_TOWNS } from '../../data/nearbyTowns';

export const metadata: Metadata = {
  title: 'Kontakt & Anfahrt: Kosmetikstudio Osnabrück',
  description: 'Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Kontaktieren Sie uns per Formular, E-Mail oder rufen Sie uns in Osnabrück an.',
  alternates: {
    canonical: '/kontakt',
  },
};

export default function KontaktPage() {
  return (
    <>
      <KontaktClient />
      <section className="bg-soft-shell/40 border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">Anfahrt aus der Region</h2>
          <p className="font-sans text-base text-tertiary leading-relaxed max-w-3xl mb-8">
            Unser Studio liegt an der Lotter Straße 33 in Osnabrück, nahe dem Westerberg. Viele Kundinnen und Kunden kommen
            aus dem Osnabrücker Land und dem Tecklenburger Land zu uns. Kostenfreie Parkplätze finden Sie direkt im Hof
            hinter dem Studio.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NEARBY_TOWNS.map((town) => (
              <li
                key={town.name}
                className="bg-pure-white rounded-lg border border-outline-variant/10 px-5 py-4 flex items-baseline justify-between gap-4"
              >
                <span className="font-display text-sm font-bold text-primary">{town.name}</span>
                <span className="font-sans text-sm text-tertiary whitespace-nowrap">
                  ca. {town.distanceKm} km · rund {town.durationMin} Min.
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
