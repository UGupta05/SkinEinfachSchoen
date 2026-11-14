import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ScrollReveal } from '../../components/ScrollReveal';
import { LinkCard } from '../../components/content/LinkCard';
import { ImageLinkCard } from '../../components/content/ImageLinkCard';
import { CtaBand } from '../../components/content/CtaBand';
import { THEME_LIST, TREATMENT_LIST, themePath, treatmentPath } from '../../content';

export const metadata: Metadata = {
  title: 'Behandlungen & Leistungen in Osnabrück',
  description:
    'Alle Behandlungen in Osnabrück: Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung, Peelings, Hautanalyse und mehr. Jetzt Termin buchen.',
  alternates: { canonical: '/leistungen' },
};

export default function LeistungenOverviewPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-12 pb-14 md:pt-16 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ScrollReveal variant="fade-in-up" immediate className="lg:col-span-7 space-y-6">
            <span className="eyebrow text-sky-accent">Kosmetikstudio in Osnabrück</span>
            <h1 className="font-display text-4xl md:text-6xl md:leading-[1.05] text-primary">Unsere Behandlungen</h1>
            <p className="font-sans text-base md:text-lg text-tertiary leading-relaxed">
              Von Radiofrequenz-Microneedling über JetPeel bis zur dauerhaften Haarentfernung mit Diodenlaser,
              Alexandritlaser oder IPL: Hier finden Sie alle Behandlungen unseres Studios an der Lotter Straße in
              Osnabrück. Sie wissen noch nicht, was zu Ihrer Haut passt? Dann starten Sie mit Ihrem Hautanliegen weiter
              unten oder mit einer VISIA® 3D-Hautanalyse.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-in" immediate className="lg:col-span-5">
            <div className="relative arch aspect-[4/5] overflow-hidden mx-auto max-w-[340px] lg:max-w-[400px] medical-glow">
              <Image
                alt="Kosmetikerin von SKIN einfach schön lächelt während einer Gesichtsbehandlung im Studio in Osnabrück"
                src="/images/studio/hero-behandlung.jpg"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 90vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-sand/60 py-16 md:py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">Behandlungen von A bis Z</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {TREATMENT_LIST.map((t, i) => (
              <ScrollReveal key={t.slug} variant="fade-in-up" delay={(i % 4) * 60}>
                <ImageLinkCard href={treatmentPath(t.slug)} title={t.name} text={t.teaser} image={t.image} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-16">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-3">Behandlung nach Hautanliegen</h2>
            <p className="font-sans text-base text-tertiary mb-8">
              Sie suchen eine Lösung für ein bestimmtes Anliegen? Hier sehen Sie, welche Behandlungen dafür in Frage kommen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {THEME_LIST.map((t) => (
                <LinkCard key={t.slug} href={themePath(t.slug)} title={t.name} text={t.teaser} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-8">Wirkstoffkosmetik &amp; Zellgesundheit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LinkCard
                href="/medical-kosmetik-zo"
                title="Medical Kosmetik ZO® Skin Health"
                text="Wirkstoffkosmetik nach Dr. Zein Obagi für Pigmentunregelmäßigkeiten, unreine Haut und vorzeitige Hautalterung."
              />
              <LinkCard
                href="/orthomolekulare-medizin"
                title="Orthomolekulare Medizin"
                text="Nährstoffanalyse und individuell abgestimmte Mikronährstoffe als Unterstützung für Ihre Haut von innen."
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Welche Behandlung passt zu Ihnen?"
        text="Buchen Sie Ihr Beratungsgespräch, auf Wunsch inklusive VISIA® 3D-Hautanalyse. Die aktuellen Preise finden Sie in unserer Preisübersicht."
      />
    </>
  );
}
