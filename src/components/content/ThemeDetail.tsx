import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from '../ScrollReveal';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { ContentSections } from './ContentSections';
import { FaqList } from './FaqList';
import { ImageLinkCard } from './ImageLinkCard';
import { CtaBand } from './CtaBand';
import { resolveTreatmentLink, type ThemePage } from '../../content';

export function ThemeDetail({ page, breadcrumbs }: { readonly page: ThemePage; readonly breadcrumbs: readonly Crumb[] }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-8 pb-16 md:pt-10 md:pb-20">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-8">
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow text-sky-accent">{page.eyebrow}</span>
              <h1 className="font-display text-4xl md:text-[3.25rem] md:leading-[1.08] text-primary">{page.h1}</h1>
              <div className="space-y-4">
                {page.intro.map((p, i) => (
                  <p key={i} className="font-sans text-base md:text-lg text-tertiary leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="pt-3 flex flex-wrap gap-3">
                <Link href="/terminbuchung" className="btn bg-primary text-pure-white medical-glow hover:bg-secondary">
                  Beratungstermin buchen
                </Link>
                <a href="#behandlungen" className="btn border border-primary/40 text-primary hover:bg-primary/5">
                  Behandlungen ansehen
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative arch aspect-[4/5] overflow-hidden mx-auto max-w-[340px] lg:max-w-[420px] medical-glow">
                <Image
                  src={page.image.src}
                  alt={page.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matching treatments, photo-led */}
      <section id="behandlungen" className="bg-sand/60 py-16 md:py-20 scroll-mt-36">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">Passende Behandlungen: {page.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.treatments.map((t, i) => {
              const link = resolveTreatmentLink(t.slug);
              return (
                <ScrollReveal key={t.slug} variant="fade-in-up" delay={i * 70}>
                  <ImageLinkCard href={link.href} title={link.name} text={t.reason} image={link.image} />
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-cream">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter py-16 md:py-20">
          <ContentSections sections={page.sections} />
        </div>
      </div>

      {page.faqs.length > 0 && (
        <section className="bg-cream border-t border-outline-variant/40">
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter py-16 md:py-20">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-8">Häufige Fragen: {page.name}</h2>
            <FaqList items={page.faqs} />
          </div>
        </section>
      )}

      <CtaBand
        title="Persönliche Beratung in Osnabrück"
        text="Welche Behandlung zu Ihrer Haut passt, klären wir am besten gemeinsam, auf Wunsch mit VISIA® 3D-Hautanalyse."
      />
    </>
  );
}
