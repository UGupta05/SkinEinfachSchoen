import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { CtaBand } from '../../components/content/CtaBand';
import { THEMES, TREATMENTS, treatmentPath, type TreatmentSlug } from '../../content';
import { JsonLd } from '../../components/JsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { Breadcrumbs } from '../../components/content/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Preise Kosmetikstudio Osnabrück',
  description:
    'Preisübersicht von SKIN einfach schön in Osnabrück: JetPeel, Radiofrequenz-Microneedling, IPL, Peelings, VISIA® Hautanalyse und mehr. Jetzt Termin buchen.',
  alternates: { canonical: '/preise' },
};

interface PriceRow {
  readonly name: string;
  readonly href: string;
  readonly duration?: string;
  readonly price?: string;
}

const treatmentRow = (slug: TreatmentSlug): PriceRow => {
  const t = TREATMENTS[slug];
  return { name: t.name, href: treatmentPath(slug), duration: t.duration, price: t.price };
};

const GROUPS: ReadonlyArray<{ readonly title: string; readonly intro: string; readonly rows: readonly PriceRow[] }> = [
  {
    title: 'Gesicht & Hautbild',
    intro: 'Behandlungen für Hauterneuerung, Straffung und ein klares, frisches Hautbild.',
    rows: (['radiofrequenz-microneedling', 'microneedling', 'jetpeel', 'meso-bb-glow', 'fruchtsaeure-peeling', 'gesichtsreinigung'] as const).map(treatmentRow),
  },
  {
    title: THEMES['dauerhafte-haarentfernung'].name,
    intro: 'Der Preis richtet sich nach Methode und Körperzone. Wir nennen ihn Ihnen in der Beratung.',
    rows: (['diodenlaser', 'alexandritlaser', 'ipl'] as const).map(treatmentRow),
  },
  {
    title: 'Hautanalyse & Pflege',
    intro: 'Die Grundlage für jede Behandlung und die passende Pflege für zu Hause.',
    rows: [
      treatmentRow('visia'),
      { name: 'Medical Kosmetik ZO® Skin Health', href: '/medical-kosmetik-zo', price: 'ab 125,- €' },
      { name: 'Orthomolekulare Medizin', href: '/orthomolekulare-medizin' },
    ],
  },
];

const breadcrumbs = [
  { name: 'Startseite', path: '/' },
  { name: 'Preise', path: '/preise' },
];

export default function PreisePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <section className="bg-cream">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-8 pb-12 md:pt-10 md:pb-16">
          <Breadcrumbs items={breadcrumbs} />
          <div className="max-w-3xl mt-8 space-y-6">
            <span className="eyebrow text-sky-accent">Preisübersicht</span>
            <h1 className="font-display text-4xl md:text-[3.25rem] md:leading-[1.08] text-primary">
              Preise unserer Behandlungen in Osnabrück
            </h1>
            <p className="font-sans text-base md:text-lg text-tertiary leading-relaxed">
              Hier finden Sie die Einstiegspreise unserer Behandlungen. Der genaue Preis hängt von der Behandlungszone, der
              Dauer und Ihrem Hautbild ab. Bei Behandlungen ohne Preisangabe erstellen wir Ihnen nach dem Beratungsgespräch
              ein persönliches Angebot.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-cream pb-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-6">
          {GROUPS.map((group) => (
            <section key={group.title} className="rounded-3xl bg-sand/70 p-5 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2 className="font-display text-2xl md:text-3xl text-primary">{group.title}</h2>
                  <p className="font-sans text-[15px] text-tertiary leading-relaxed mt-3">{group.intro}</p>
                </div>
                <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.rows.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group flex flex-col justify-between h-full rounded-2xl bg-pure-white p-5 md:p-6 border border-transparent hover:border-primary/20 hover:shadow-[0_12px_32px_-16px_rgba(94,72,50,0.3)] transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-xl text-primary leading-snug">{r.name}</h3>
                          <ArrowRight className="w-4 h-4 mt-1.5 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </div>
                        <div className="flex items-end justify-between gap-3 mt-6">
                          <span className="inline-flex items-center gap-1.5 font-sans text-sm text-tertiary">
                            {r.duration && (
                              <>
                                <Clock className="w-4 h-4 text-sky-accent" aria-hidden="true" />
                                {r.duration}
                              </>
                            )}
                          </span>
                          <span className={`whitespace-nowrap ${r.price ? 'font-display text-2xl text-on-surface' : 'font-sans text-sm text-tertiary'}`}>
                            {r.price ?? 'auf Anfrage'}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
          <p className="font-sans text-sm text-tertiary pt-2">Alle Preise in Euro inklusive gesetzlicher Mehrwertsteuer.</p>
        </div>
      </div>

      <CtaBand
        title="Ihr persönliches Angebot"
        text="Im Beratungsgespräch klären wir, welche Behandlung zu Ihrer Haut passt und was sie in Ihrem Fall kostet."
      />
    </>
  );
}
