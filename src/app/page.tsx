import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { FaqAccordion } from '../components/FaqAccordion';
import { JsonLd } from '../components/JsonLd';
import { LinkCard } from '../components/content/LinkCard';
import { ReviewsSection } from '../components/ReviewsSection';
import { YouTubeFacade } from '../components/YouTubeFacade';
import { salonSchema } from '../lib/schema';
import { THEME_LIST, themePath } from '../content';
import { GOOGLE_RATING } from '../data/reviews';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const FEATURED_TREATMENTS = [
  {
    href: '/leistungen/radiofrequenz-microneedling',
    title: 'Radiofrequenz-Microneedling',
    text: 'Feine Nadeln und Radiofrequenz-Wärme für straffere Haut, feinere Poren und ein glatteres Hautbild.',
    image: { src: '/images/home/mrf_microneedling.jpg', width: 1024, height: 576, alt: 'Radiofrequenz-Microneedling bei SKIN einfach schön in Osnabrück' },
  },
  {
    href: '/leistungen/jetpeel',
    title: 'JetPeel',
    text: 'Nadelfreie Tiefenreinigung mit hochwertigen Seren als feiner Sprühnebel, für sofortigen Glow ohne Ausfallzeit.',
    image: { src: '/images/treatments/jetpeel_new.jpg', width: 576, height: 1024, alt: 'JetPeel-Behandlung im Studio SKIN einfach schön' },
  },
  {
    href: '/dauerhafte-haarentfernung',
    title: 'Dauerhafte Haarentfernung',
    text: 'Mit Diodenlaser, Alexandritlaser oder IPL, passend zu Ihrem Haut- und Haartyp.',
    image: { src: '/images/treatments/ipl_new1.jpg', width: 576, height: 1024, alt: 'Dauerhafte Haarentfernung im Studio SKIN einfach schön in Osnabrück' },
  },
  {
    href: '/leistungen/microneedling',
    title: 'Microneedling',
    text: 'Regt die hauteigene Erneuerung an, bei feinen Linien, Narben und unebener Hautstruktur.',
    image: { src: '/images/treatments/microneedling_new.jpg', width: 576, height: 1024, alt: 'Microneedling-Behandlung im Studio SKIN einfach schön' },
  },
] as const;

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

      {/* Hero */}
      <section className="relative bg-cream">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-10 pb-16 md:pt-20 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <ScrollReveal variant="fade-in-up" immediate>
              <span className="eyebrow text-sky-accent mb-5">Lotter Straße 33 · Osnabrück</span>
              <h1 className="font-display text-[2.6rem] leading-[1.08] md:text-6xl md:leading-[1.05] text-primary">
                Ihr Kosmetikstudio in Osnabrück für eine gesunde, schöne Haut
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="fade-in-up" delay={120} immediate>
              <p className="font-sans text-lg text-tertiary leading-relaxed mt-6 max-w-xl">
                Radiofrequenz-Microneedling, JetPeel, dauerhafte Haarentfernung und medizinische Kosmetik an der Lotter Straße. Jede Behandlung beginnt bei uns mit einer gründlichen Hautanalyse und ehrlicher Beratung.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-in-up" delay={220} immediate>
              <div className="flex flex-wrap gap-3 mt-9">
                <Link href="/terminbuchung" className="btn bg-primary text-pure-white medical-glow hover:bg-secondary">
                  Beratungstermin buchen
                </Link>
                <Link href="/leistungen" className="btn border border-primary/40 text-primary hover:bg-primary/5">
                  Behandlung finden
                </Link>
              </div>
              <p className="flex items-center gap-2 mt-8 font-sans text-sm text-tertiary">
                <span className="flex text-sky-accent" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-on-surface">{formatRating(GOOGLE_RATING.rating)}</strong> aus {GOOGLE_RATING.count} Google-Bewertungen
                </span>
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fade-in" immediate className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[520px] aspect-[4/5] arch overflow-hidden medical-glow">
              <Image
                alt="Behandlungsraum von SKIN einfach schön in Osnabrück"
                src="/images/home/home_hero_new_3.jpg"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 left-0 lg:-left-6 bg-pure-white rounded-2xl px-6 py-5 medical-glow max-w-[260px]">
              <p className="font-display text-lg text-primary leading-snug">Persönliche Beratung</p>
              <p className="font-sans text-sm text-tertiary mt-1">auf Wunsch mit VISIA® 3D-Hautanalyse</p>
            </div>
          </ScrollReveal>
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
                alt="Gesichtsbehandlung bei SKIN einfach schön"
                src="/images/home/treatment_closeup_new.jpg"
                width={576}
                height={1024}
                sizes="(min-width: 768px) 300px, 45vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                alt="Beratung im Studio von SKIN einfach schön"
                src="/images/home/consultation_team.jpg"
                width={695}
                height={1024}
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
                <Link href={t.href} className="group block h-full">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                    <Image
                      alt={t.image.alt}
                      src={t.image.src}
                      width={t.image.width}
                      height={t.image.height}
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="font-display text-2xl text-primary mt-5">{t.title}</h3>
                  <p className="font-sans text-sm text-tertiary leading-relaxed mt-2">{t.text}</p>
                  <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary mt-3">
                    Mehr erfahren
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
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
