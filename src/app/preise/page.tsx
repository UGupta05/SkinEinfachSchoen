import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand } from '../../components/content/CtaBand';
import { THEMES, TREATMENT_LIST, treatmentPath } from '../../content';
import { JsonLd } from '../../components/JsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { Breadcrumbs } from '../../components/content/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Preise Kosmetikstudio Osnabrück',
  description:
    'Preisübersicht von SKIN einfach schön in Osnabrück: JetPeel, Radiofrequenz-Microneedling, IPL, Peelings, VISIA® Hautanalyse und mehr. Jetzt Termin buchen.',
  alternates: { canonical: '/preise' },
};

const EXTRA_ROWS = [
  { name: 'Medical Kosmetik ZO® Skin Health', href: '/medical-kosmetik-zo', duration: undefined, price: 'ab 125,- €' },
  { name: 'Orthomolekulare Medizin', href: '/orthomolekulare-medizin', duration: undefined, price: undefined },
] as const;

const breadcrumbs = [
  { name: 'Startseite', path: '/' },
  { name: 'Preise', path: '/preise' },
];

export default function PreisePage() {
  const rows = [
    ...TREATMENT_LIST.map((t) => ({ name: t.name, href: treatmentPath(t.slug), duration: t.duration, price: t.price })),
    ...EXTRA_ROWS,
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <section className="max-w-4xl mx-auto px-margin-mobile md:px-gutter py-10 md:py-14">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight mt-8">
          Preise unserer Behandlungen in Osnabrück
        </h1>
        <p className="font-sans text-base text-tertiary leading-relaxed mt-6">
          Hier finden Sie die Einstiegspreise unserer Behandlungen. Der genaue Preis hängt von der Behandlungszone, der
          Dauer und Ihrem Hautbild ab. Bei Behandlungen ohne Preisangabe erstellen wir Ihnen nach dem Beratungsgespräch ein
          persönliches Angebot. Für die {THEMES['dauerhafte-haarentfernung'].name} richtet sich der Preis nach Methode und
          Körperzone.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30">
                <th scope="col" className="py-3 pr-4 font-display text-xs font-bold uppercase tracking-wider text-primary">Behandlung</th>
                <th scope="col" className="py-3 pr-4 font-display text-xs font-bold uppercase tracking-wider text-primary">Dauer</th>
                <th scope="col" className="py-3 font-display text-xs font-bold uppercase tracking-wider text-primary text-right">Preis</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.href} className="border-b border-outline-variant/10">
                  <td className="py-4 pr-4 font-sans text-sm">
                    <Link href={r.href} className="text-primary font-semibold hover:underline">{r.name}</Link>
                  </td>
                  <td className="py-4 pr-4 font-sans text-sm text-tertiary">{r.duration ?? '–'}</td>
                  <td className="py-4 font-sans text-sm text-tertiary text-right whitespace-nowrap">{r.price ?? 'auf Anfrage'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-sans text-xs text-tertiary mt-6">Alle Preise in Euro inklusive gesetzlicher Mehrwertsteuer.</p>
      </section>

      <CtaBand
        title="Ihr persönliches Angebot"
        text="Im Beratungsgespräch klären wir, welche Behandlung zu Ihrer Haut passt und was sie in Ihrem Fall kostet."
      />
    </>
  );
}
