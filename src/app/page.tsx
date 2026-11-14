import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { FaqAccordion } from '../components/FaqAccordion';
import { JsonLd } from '../components/JsonLd';
import { LinkCard } from '../components/content/LinkCard';
import { ImageLinkCard } from '../components/content/ImageLinkCard';
import { ReviewsSection } from '../components/ReviewsSection';
import { YouTubeFacade } from '../components/YouTubeFacade';
import { salonSchema } from '../lib/schema';
import { THEMES, THEME_LIST, TREATMENTS, themePath, treatmentPath } from '../content';
import { GOOGLE_RATING } from '../data/reviews';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

// Names and teasers come from the content registry; the homepage uses its own
// people-free photos (devices, products) instead of the treatment-page portraits.
const img = (src: string, alt: string) => ({ src, alt, width: 800, height: 1000 });

const FEATURED_TREATMENTS = [
  {
    href: treatmentPath('radiofrequenz-microneedling'),
    title: TREATMENTS['radiofrequenz-microneedling'].name,
    text: TREATMENTS['radiofrequenz-microneedling'].teaser,
    image: img('/images/studio/geraet-lapio.jpg', 'Touchscreen des LapiO-Geräts für Radiofrequenz-Microneedling im Studio SKIN einfach schön'),
  },
  {
    href: treatmentPath('jetpeel'),
    title: TREATMENTS.jetpeel.name,
    text: TREATMENTS.jetpeel.teaser,
    image: img('/images/studio/geraet-jetpeel.jpg', 'JetPeel-Gerät: Serum wird vor der Behandlung in das Handstück gefüllt'),
  },
  {
    href: themePath('dauerhafte-haarentfernung'),
    title: THEMES['dauerhafte-haarentfernung'].name,
    text: THEMES['dauerhafte-haarentfernung'].teaser,
    image: img('/images/studio/geraet-haarentfernung.jpg', 'Display des Geräts zur dauerhaften Haarentfernung mit Einstellungen für Hauttyp und Energie'),
  },
  {
    href: treatmentPath('fruchtsaeure-peeling'),
    title: TREATMENTS['fruchtsaeure-peeling'].name,
    text: TREATMENTS['fruchtsaeure-peeling'].teaser,
    image: {
      ...img('/images/studio/produkte-peeling.jpg', 'Peeling-Lösungen, Glasschale und Pinsel vorbereitet für ein chemisches Peeling'),
      width: 750,
    },
  },
];

const VIDEOS = [
  {
    id: 'W5CCNDCyFuw',
    eyebrow: 'Über uns',
    title: 'Wir sind SKIN einfach schön! Lerne uns kennen',
    text: 'Willkommen in unserem Kosmetikstudio in Osnabrück. Lernen Sie unser Team und unsere Philosophie für wissenschaftlich fundierte Hautpflege kennen. Wir begleiten Sie auf Ihrem Weg zu einer gesunden, strahlenden Haut, mit modernen Technologien und persönlicher Betreuung in Wohlfühlatmosphäre.',
    cta: { href: '/team', label: 'Unser Team kennenlernen' },
  },
  {
    id: 'OLpqOJyt7I8',
    eyebrow: 'Hautgesundheit',
    title: 'Wie sich die Haut positiv verändert',
    text: 'Schöne Haut braucht Zeit. In diesem Video erklären wir, wie sich Ihre Haut durch gezielte, regelmäßige Behandlungen, von sanftem Microneedling bis zur regenerativen Wirkstoffkosmetik, über die Jahre positiv verändert.',
    cta: { href: '/terminbuchung', label: 'Beratungstermin buchen' },
  },
  {
    id: 'Qc7Ay8-dTiY',
    eyebrow: 'Behandlung im Fokus',
    title: 'Ablauf der dauerhaften Haarentfernung',
    text: 'Lästige Haare langfristig und schonend entfernen: Im Video zeigen wir Schritt für Schritt, wie die dauerhafte Haarentfernung in unserem Studio in Osnabrück abläuft, von der Beratung über den Schutz der Haut bis zum glatten Ergebnis. Wir arbeiten mit Diodenlaser, Alexandritlaser und IPL und wählen die Methode passend zu Ihrem Haut- und Haartyp.',
    cta: { href: '/dauerhafte-haarentfernung', label: 'Zur dauerhaften Haarentfernung' },
  },
] as const;

const formatRating = (rating: number) => rating.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <JsonLd data={salonSchema()} />

      {/* Hero: full-bleed studio photo, oversized wordmark, compact copy block */}
      <section className="relative isolate overflow-hidden bg-onyx-text text-cream min-h-[600px] h-[calc(100svh-11rem)] max-h-[900px]">
        <Image
          alt="Empfangslounge von SKIN einfach schön in Osnabrück mit Holzwand, Chesterfield-Sofa und Pampasgras"
          src="/images/studio/hero-lounge.jpg"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_55%] -z-10"
        />
        {/* Warm shading keeps the light type readable on every part of the photo. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1f1813]/65 via-[#1f1813]/20 to-[#1f1813]/85" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1f1813]/55 via-[#1f1813]/15 to-transparent" aria-hidden="true" />
        {/* On phones the copy block sits over the busy middle of the photo. */}
        <div className="absolute inset-0 -z-10 bg-[#1f1813]/35 md:hidden" aria-hidden="true" />
        {/* The bright shop windows on the right need extra shading. */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_left,rgba(31,24,19,0.8)_0%,rgba(31,24,19,0.55)_28%,transparent_55%)]" aria-hidden="true" />

        <div className="max-w-container-max mx-auto h-full px-margin-mobile md:px-gutter pt-8 md:pt-12 pb-6 flex flex-col">
          <ScrollReveal variant="fade-in-up" immediate>
            <p className="font-display text-cream leading-[0.9] tracking-[-0.03em] text-[clamp(3.2rem,11.5vw,10rem)]" aria-hidden="true">
              SKIN
              <br />
              einfach schön
            </p>
          </ScrollReveal>

          <div className="mt-auto grid grid-cols-1 md:grid-cols-12 gap-6">
            <ScrollReveal variant="fade-in-up" delay={120} immediate className="md:col-start-7 lg:col-start-8 md:col-span-6 lg:col-span-5">
              <h1 className="font-display text-2xl md:text-[2rem] leading-tight text-cream">
                Ihr Kosmetikstudio in Osnabrück für eine gesunde, schöne Haut
              </h1>
              <p className="font-sans text-base text-cream/80 leading-relaxed mt-4">
                Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung und medizinische Kosmetik. Jede Behandlung beginnt mit einer gründlichen Hautanalyse und ehrlicher Beratung.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/terminbuchung" className="btn bg-cream text-primary hover:bg-pure-white">
                  Beratungstermin buchen
                </Link>
                <Link href="/leistungen" className="btn border border-cream/50 text-cream hover:bg-cream/10">
                  Behandlung finden
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-8 pt-4 border-t border-cream/20 flex items-center justify-between gap-4 font-sans text-xs text-cream/75">
            <span className="flex items-center gap-2">
              <span className="flex text-gold" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
              {formatRating(GOOGLE_RATING.rating)} aus {GOOGLE_RATING.count} Google-Bewertungen
            </span>
            <span className="hidden sm:inline uppercase tracking-[0.18em]">Kosmetikstudio · Lotter Straße 33 · Osnabrück</span>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-section-padding-sm md:py-section-padding-lg bg-sand/60">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <ScrollReveal variant="fade-in-up" className="md:col-span-6 md:order-2 space-y-6">
            <span className="eyebrow text-sky-accent">Unsere Haltung</span>
            <h2 className="font-display text-3xl md:text-[2.75rem] md:leading-tight text-primary">
              Zeit für Ihre Haut
            </h2>
            <p className="font-sans text-base md:text-lg text-tertiary leading-relaxed">
              Jede Haut ist einzigartig. Deshalb beginnt Ihr Weg bei uns mit einer gründlichen Hautanalyse und einem ehrlichen Gespräch. Erst dann entscheiden wir gemeinsam, welche Behandlung und welche Pflege wirklich zu Ihnen passen.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                'Hautanalyse und persönliche Beratung vor jeder Behandlung',
                'Moderne Geräte, etwa für Radiofrequenz-Microneedling und JetPeel',
                'Wirkstoffkosmetik von ZO® Skin Health für zu Hause',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-base text-on-surface-variant">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-sky-accent shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-in-up" delay={100} className="md:col-span-6 md:order-1 grid grid-cols-2 gap-4 md:gap-5">
            <div className="aspect-[3/4] overflow-hidden arch-3-4 mt-12">
              <Image
                alt="Behandlungsraum mit Liege und Regal voller ZO® Skin Health Produkte bei SKIN einfach schön"
                src="/images/studio/raum-2.jpg"
                width={750}
                height={1000}
                sizes="(min-width: 768px) 300px, 45vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                alt="Holzregale mit Pflegeprodukten vor dunkler Wand im Behandlungsraum von SKIN einfach schön"
                src="/images/studio/raum-1.jpg"
                width={800}
                height={1000}
                sizes="(min-width: 768px) 300px, 45vw"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured treatments */}
      <section className="py-section-padding-sm md:py-section-padding-lg bg-cream">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="fade-in-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="eyebrow text-sky-accent mb-4">Unsere Leistungen</span>
              <h2 className="font-display text-3xl md:text-[2.75rem] md:leading-tight text-primary">
                Behandlungen, die wir besonders lieben
              </h2>
            </div>
            <Link href="/leistungen" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:text-sky-accent transition-colors">
              Alle Behandlungen ansehen <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_TREATMENTS.map((t, i) => (
              <ScrollReveal key={t.href} variant="fade-in-up" delay={i * 70}>
                <ImageLinkCard href={t.href} title={t.title} text={t.text} image={t.image} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skin concerns: internal links to the theme landing pages */}
      <section className="py-section-padding-sm md:py-section-padding-lg bg-sand/60">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="fade-in-up" className="text-center mb-12 max-w-2xl mx-auto">
            <span className="eyebrow text-sky-accent mb-4">Ihr Hautanliegen</span>
            <h2 className="font-display text-3xl md:text-[2.75rem] md:leading-tight text-primary">
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

      {/* Videos */}
      <section className="py-section-padding-sm md:py-section-padding-lg bg-cream">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="fade-in-up" className="text-center mb-14 max-w-2xl mx-auto">
            <span className="eyebrow text-sky-accent mb-4">Erfahrungen &amp; Einblicke</span>
            <h2 className="font-display text-3xl md:text-[2.75rem] md:leading-tight text-primary">
              Lernen Sie uns und unsere Behandlungen kennen
            </h2>
          </ScrollReveal>

          <div className="space-y-16 md:space-y-24">
            {VIDEOS.map((v, i) => (
              <div key={v.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                <ScrollReveal variant="fade-in-up" className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-video rounded-3xl overflow-hidden medical-glow">
                    <YouTubeFacade videoId={v.id} title={v.title} />
                  </div>
                </ScrollReveal>
                <ScrollReveal variant="fade-in-up" delay={80} className={`lg:col-span-5 space-y-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="eyebrow text-sky-accent">{v.eyebrow}</span>
                  <h3 className="font-display text-2xl md:text-3xl text-primary leading-tight">{v.title}</h3>
                  <p className="font-sans text-base text-tertiary leading-relaxed">{v.text}</p>
                  <Link href={v.cta.href} className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:text-sky-accent transition-colors">
                    {v.cta.label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* FAQ */}
      <section className="py-section-padding-sm md:py-section-padding-lg bg-cream">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="fade-in-up" className="text-center mb-12 max-w-xl mx-auto">
            <span className="eyebrow text-sky-accent mb-4">Fragen &amp; Antworten</span>
            <h2 className="font-display text-3xl md:text-[2.75rem] md:leading-tight text-primary">
              Häufig gestellte Fragen
            </h2>
          </ScrollReveal>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="px-margin-mobile md:px-gutter pb-section-padding-sm md:pb-section-padding-lg bg-cream">
        <ScrollReveal
          variant="fade-in-up"
          className="max-w-container-max mx-auto rounded-3xl bg-primary text-pure-white px-6 py-14 md:px-16 md:py-20 text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl text-pure-white">Lernen wir uns kennen</h2>
          <p className="font-sans text-lg text-pure-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            Im Erstgespräch schauen wir uns Ihre Haut in Ruhe an, auf Wunsch mit Hautanalyse, und besprechen, was ihr wirklich guttut.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link href="/terminbuchung" className="btn bg-pure-white text-primary hover:bg-cream">
              Online Termin wählen
            </Link>
            <Link href="/kontakt" className="btn border border-pure-white/50 text-pure-white hover:bg-pure-white/10">
              Kontakt aufnehmen
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
