import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { FaqAccordion } from '../components/FaqAccordion';
import { JsonLd } from '../components/JsonLd';
import { LinkCard } from '../components/content/LinkCard';
import { ReviewsSection } from '../components/ReviewsSection';
import { YouTubeFacade } from '../components/YouTubeFacade';
import { salonSchema } from '../lib/schema';
import { THEME_LIST, themePath } from '../content';

// Keep in sync with REVIEWS_REVALIDATE_SECONDS in src/lib/googleReviews.ts
// (segment config must be a literal).
export const revalidate = 21600;

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <JsonLd data={salonSchema()} />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Behandlungsraum von SKIN einfach schön in Osnabrück"
            src="/images/home/home_hero_new_3.jpg"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full">
          <div className="max-w-2xl">
            <ScrollReveal variant="fade-in-up" delay={100} immediate>
              <h1 
                className="font-display text-4xl md:text-5xl font-bold text-background mb-6 leading-tight"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)' }}
              >
                Ihr Kosmetikstudio in Osnabrück für gesunde, schöne Haut
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-in-up" delay={250} immediate>
              <p 
                className="font-sans text-lg text-background mb-10 leading-relaxed"
                style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)' }}
              >
                Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung und medizinische Kosmetik an der Lotter Straße. Jede Behandlung beginnt bei uns mit einer gründlichen Hautanalyse und ehrlicher Beratung.
              </p>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-in-up" delay={400} immediate>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/leistungen"
                  className="bg-background text-primary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:bg-background/90 hover:scale-[1.02] active:scale-95 transition-all text-center rounded-full duration-300"
                >
                  Behandlung finden
                </Link>
                <Link
                  href="/terminbuchung"
                  className="bg-background border border-primary text-primary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-background/90 hover:scale-[1.02] active:scale-95 transition-all text-center rounded-full duration-300"
                >
                  Beratungstermin
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Video-Einblicke & Routinen */}
      <section className="py-section-padding-lg bg-soft-shell border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="blur-in" className="text-center mb-16">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Erfahrungen &amp; Einblicke
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Lernen Sie uns und unsere Behandlungen kennen
            </h2>
          </ScrollReveal>

          <div className="space-y-20">
            {/* Video 1: Wir sind Skineinfachschoen! Lerne uns kennen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal variant="fade-in-left" className="lg:col-span-6">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10 transition-transform duration-500 hover:scale-[1.01]">
                  <YouTubeFacade videoId="W5CCNDCyFuw" title="Wir sind SKIN einfach schön! Lerne uns kennen" />
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-in-right" className="lg:col-span-6 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Über Uns
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Wir sind SKIN einfach schön! Lerne uns kennen
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Willkommen in unserem Kosmetikinstitut in Osnabrück. Lernen Sie unser Team und unsere Philosophie für wissenschaftlich fundierte Hautpflege kennen. Wir begleiten Sie auf Ihrem Weg zu einer gesunden, strahlenden Haut – mit modernsten Technologien und individueller Betreuung in Wohlfühlatmosphäre.
                </p>
                <Link
                  href="/team"
                  className="inline-block bg-primary text-pure-white px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                >
                  Unser Team treffen
                </Link>
              </ScrollReveal>
            </div>

            {/* Video 2: Wie sich die Haut positiv verändert */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal variant="fade-in-right" className="lg:col-span-6 lg:order-2">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10 transition-transform duration-500 hover:scale-[1.01]">
                  <YouTubeFacade videoId="OLpqOJyt7I8" title="Wie sich die Haut positiv verändert" />
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-in-left" className="lg:col-span-6 lg:order-1 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Hautgesundheit
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Wie sich die Haut positiv verändert
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Hautgesundheit ist eine langfristige Reise. In diesem Video erklären wir, wie sich Ihre Haut durch gezielte, kontinuierliche Behandlungen (von sanftem Microneedling bis hin zur regenerativen Wirkstoffkosmetik) über die Jahre hinweg positiv verändert. Kontinuität und eine fundierte Hautanalyse sind der Schlüssel zur dauerhaften Schönheit.
                </p>
                <Link
                  href="/terminbuchung"
                  className="inline-block border border-primary text-primary px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest hover:bg-primary/5 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                >
                  Beratungstermin buchen
                </Link>
              </ScrollReveal>
            </div>

            {/* Video 3: So läuft die dauerhafte Haarentfernung bei uns ab SKIN einfachschoen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal variant="fade-in-left" className="lg:col-span-6">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10 transition-transform duration-500 hover:scale-[1.01]">
                  <YouTubeFacade videoId="Qc7Ay8-dTiY" title="Ablauf der dauerhaften Haarentfernung" />
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-in-right" className="lg:col-span-6 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Behandlung im Fokus
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Ablauf der dauerhaften Haarentfernung
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Lästige Haare langfristig und schonend reduzieren: Im Video zeigen wir Schritt für Schritt, wie die dauerhafte Haarentfernung in unserem Studio in Osnabrück abläuft, von der Beratung über den Schutz der Haut bis zum glatten Ergebnis. Wir arbeiten mit Diodenlaser, Alexandritlaser und IPL und wählen die Methode passend zu Ihrem Haut- und Haartyp.
                </p>
                <Link
                  href="/dauerhafte-haarentfernung"
                  className="inline-block bg-primary text-pure-white px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                >
                  Zur dauerhaften Haarentfernung
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-section-padding-lg bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <ScrollReveal variant="fade-in-left" className="md:col-span-5 space-y-6">
              <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                Expertise
              </span>
              <h2 className="font-display text-3xl font-bold text-primary leading-tight">
                Beratungskompetenz &amp; Ästhetische Exzellenz
              </h2>
              <p className="font-sans text-base text-tertiary leading-relaxed">
                Jede Haut ist einzigartig. Deshalb beginnt Ihre Reise bei uns mit einer fundierten computergestützten Hautanalyse. Basierend auf medizinischen Fakten entwickeln wir Ihren individuellen Pflegeplan.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-sans text-base text-primary">
                  <ShieldCheck className="w-5 h-5 text-sky-accent shrink-0" />
                  <span>Staatlich geprüfte Fachkosmetikerinnen</span>
                </li>
                <li className="flex items-center gap-3 font-sans text-base text-primary">
                  <Sparkles className="w-5 h-5 text-sky-accent shrink-0" />
                  <span>High-End Medical Beauty Equipment</span>
                </li>
                <li className="flex items-center gap-3 font-sans text-base text-primary">
                  <CheckCircle2 className="w-5 h-5 text-sky-accent shrink-0" />
                  <span>Nachhaltige &amp; wirksame Wirkstoffkosmetik</span>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal variant="fade-in-right" className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    alt="Gesichtsbehandlung bei SKIN einfach schön"
                    src="/images/home/treatment_closeup_new.jpg"
                    width={576}
                    height={1024}
                    sizes="(min-width: 768px) 320px, 45vw"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="bg-soft-shell p-8 medical-glow transition-transform duration-500 hover:scale-[1.02]">
                  <h3 className="font-display text-3xl font-bold text-primary mb-2">98%</h3>
                  <p className="font-display text-2xs font-bold text-tertiary uppercase tracking-wider">
                    Zufriedene Kunden
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-primary text-pure-white p-8 medical-glow transition-transform duration-500 hover:scale-[1.02]">
                  <h3 className="font-display text-3xl font-bold mb-2">15+</h3>
                  <p className="font-display text-2xs font-bold uppercase tracking-wider">
                    Jahre Erfahrung
                  </p>
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    alt="Beratung im Studio von SKIN einfach schön"
                    src="/images/home/consultation_team.jpg"
                    width={695}
                    height={1024}
                    sizes="(min-width: 768px) 320px, 45vw"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-section-padding-lg bg-soft-shell">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="blur-in" className="text-center mb-16">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Unsere Leistungen
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Präzision für Ihre Haut
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter">
            {/* Bento Card 1: Anti Aging */}
            <ScrollReveal variant="fade-in-up" delay={0} className="md:col-span-2 md:row-span-2 relative group overflow-hidden medical-glow rounded-lg min-h-[400px]">
              <Image
                alt="Radiofrequenz-Microneedling bei SKIN einfach schön in Osnabrück"
                src="/images/home/mrf_microneedling.jpg"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-text/80 via-onyx-text/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block px-3 py-1 bg-sky-accent/20 text-pure-white font-display text-[10px] font-bold mb-4 backdrop-blur-sm rounded-full tracking-wider uppercase">
                  Core Treatment
                </span>
                <h3 className="font-display text-2xl font-bold text-pure-white mb-4">
                  Radiofrequenz-Microneedling (MRF)
                </h3>
                <p className="font-sans text-sm text-pure-white/80 mb-6">
                  Microneedling kombiniert mit Radiofrequenz-Wärme: für straffere Haut, feinere Poren und ein glatteres Hautbild bei Falten und Aknenarben.
                </p>
                <Link
                  href="/leistungen/radiofrequenz-microneedling"
                  className="text-pure-white font-display text-xs font-bold flex items-center gap-2 group/link uppercase tracking-wider"
                >
                  Zum Radiofrequenz-Microneedling <span className="transition-transform group-hover/link:translate-x-2">→</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Bento Card 2: Problemhaut */}
            <ScrollReveal variant="fade-in-up" delay={150} className="md:col-span-2 bg-pure-white p-8 flex flex-col justify-between border border-outline-variant/10 medical-glow rounded-lg transition-transform duration-500 hover:scale-[1.02]">
              <div>
                <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">
                  Unreine Haut &amp; Akne
                </h3>
                <p className="font-sans text-sm text-tertiary">
                  Gesichtsreinigung, Peelings und ZO Skin Health für ein klareres Hautbild, abgestimmt auf Ihre Haut.
                </p>
              </div>
              <Link
                href="/akne-behandlung"
                className="text-primary font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-70 mt-6"
              >
                Zur Akne-Behandlung <span>+</span>
              </Link>
            </ScrollReveal>

            {/* Bento Card 3: JetPeel Technology */}
            <ScrollReveal variant="fade-in-up" delay={300} className="md:col-span-2 bg-primary text-pure-white p-8 flex flex-col justify-between medical-glow rounded-lg transition-transform duration-500 hover:scale-[1.02]">
              <div>
                <Sparkles className="text-sky-accent w-8 h-8 mb-6" />
                <h3 className="font-display text-lg font-bold mb-3">
                  JetPeel
                </h3>
                <p className="font-sans text-xs opacity-85">
                  Nadelfreie Tiefenreinigung und Feuchtigkeit mit einem feinen Hochdruckstrahl, für sofortigen Glow ohne Ausfallzeit.
                </p>
              </div>
              <Link
                href="/leistungen/jetpeel"
                className="font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-80 mt-4 text-sky-accent"
              >
                Zum JetPeel <span>↗</span>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Skin concerns: internal links to the theme landing pages */}
      <section className="py-section-padding-lg bg-pure-white border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="blur-in" className="text-center mb-12">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Ihr Hautanliegen
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Wobei können wir Ihnen helfen?
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEME_LIST.map((t) => (
              <LinkCard key={t.slug} href={themePath(t.slug)} title={t.name} text={t.teaser} />
            ))}
            <LinkCard
              href="/leistungen"
              title="Alle Behandlungen"
              text="Die komplette Übersicht unserer Behandlungen mit Dauer und Preisen."
            />
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* FAQ Section */}
      <section className="py-section-padding-lg bg-soft-shell/20 border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <ScrollReveal variant="blur-in" className="max-w-xl mx-auto">
              <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
                Fragen & Antworten
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                Häufig gestellte Fragen (FAQ)
              </h2>
              <div className="w-16 h-1 bg-sky-accent mx-auto"></div>
            </ScrollReveal>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-padding-lg relative overflow-hidden bg-slate-muted">
        <ScrollReveal variant="blur-in" className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-pure-white mb-8">
            Bereit für Ihre Hautveränderung?
          </h2>
          <p className="font-sans text-lg text-pure-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Buchen Sie jetzt Ihr Erstgespräch inklusive professioneller Hautanalyse und starten Sie Ihre individuelle Reise zu einer gesünderen Ausstrahlung.
          </p>
          <div className="flex justify-center">
            <Link
              href="/terminbuchung"
              className="bg-pure-white text-primary px-12 py-5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:scale-105 active:scale-95 transition-all duration-300 text-center"
            >
              Online Termin wählen
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
