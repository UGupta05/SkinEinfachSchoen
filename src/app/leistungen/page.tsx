import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { LinkCard } from '../../components/content/LinkCard';
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
      <section className="px-margin-mobile md:px-gutter py-12 lg:py-16 bg-soft-shell overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <ScrollReveal variant="fade-in-left" immediate className="flex-1 space-y-6">
            <span className="font-display text-xs font-bold text-primary uppercase tracking-widest block">
              Kosmetikstudio in Osnabrück
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">
              Unsere Behandlungen
            </h1>
            <p className="font-sans text-base text-tertiary leading-relaxed">
              Von Radiofrequenz-Microneedling über JetPeel bis zur dauerhaften Haarentfernung mit Diodenlaser,
              Alexandritlaser oder IPL: Hier finden Sie alle Behandlungen unseres Studios an der Lotter Straße in
              Osnabrück. Sie wissen noch nicht, was zu Ihrer Haut passt? Dann starten Sie mit Ihrem Hautanliegen weiter
              unten oder mit einer VISIA® 3D-Hautanalyse.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-in-right" immediate className="flex-1 w-full relative">
            <Image
              alt="Behandlungsraum von SKIN einfach schön in Osnabrück"
              src="/images/team/praxis_new.jpg"
              width={1024}
              height={576}
              priority
              sizes="(min-width: 768px) 480px, 90vw"
              className="w-full h-auto object-contain shadow-lg rounded-sm"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="px-margin-mobile md:px-gutter py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-10">Behandlungen von A bis Z</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {TREATMENT_LIST.map((t, i) => (
            <ScrollReveal key={t.slug} variant="fade-in-up" delay={(i % 2) * 150} className="group">
              <Link href={treatmentPath(t.slug)} className="block">
                <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg relative">
                  <Image
                    alt={t.image.alt}
                    src={t.image.src}
                    fill
                    sizes="(min-width: 768px) 460px, 90vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">{t.eyebrow}</span>
                <h3 className="font-display text-xl font-bold text-primary mt-2">{t.name}</h3>
                <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">{t.teaser}</p>
                <span className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
                  Zu {t.name} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-soft-shell/40 border-y border-outline-variant/10 py-16">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-gutter space-y-12">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">Behandlung nach Hautanliegen</h2>
            <p className="font-sans text-base text-tertiary mb-8">
              Sie suchen eine Lösung für ein bestimmtes Anliegen? Hier sehen Sie, welche Behandlungen dafür in Frage kommen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {THEME_LIST.map((t) => (
                <LinkCard key={t.slug} href={themePath(t.slug)} title={t.name} text={t.teaser} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8">Wirkstoffkosmetik &amp; Zellgesundheit</h2>
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
        title="Bereit für Ihr Strahlen?"
        text="Buchen Sie Ihr Beratungsgespräch, auf Wunsch inklusive VISIA® 3D-Hautanalyse. Die aktuellen Preise finden Sie in unserer Preisübersicht."
      />
    </>
  );
}
