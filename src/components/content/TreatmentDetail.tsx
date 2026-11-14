import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Clock, Tag } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { ContentSections } from './ContentSections';
import { FaqList } from './FaqList';
import { ImageLinkCard } from './ImageLinkCard';
import { LinkCard } from './LinkCard';
import { CtaBand } from './CtaBand';
import { THEMES, TREATMENTS, themePath, treatmentPath, type TreatmentPage } from '../../content';

export function TreatmentDetail({ page, breadcrumbs }: { readonly page: TreatmentPage; readonly breadcrumbs: readonly Crumb[] }) {
  const isLandscape = page.image.width > page.image.height;

  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
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

              {(page.duration || page.price) && (
                <ul className="flex flex-wrap gap-3 pt-1">
                  {page.duration && (
                    <li className="inline-flex items-center gap-2 rounded-full bg-pure-white border border-outline-variant/60 px-4 py-2 font-sans text-sm text-on-surface-variant">
                      <Clock className="w-4 h-4 text-sky-accent" aria-hidden="true" />
                      <span><span className="sr-only">Behandlungsdauer: </span>{page.duration}</span>
                    </li>
                  )}
                  {page.price && (
                    <li className="inline-flex items-center gap-2 rounded-full bg-pure-white border border-outline-variant/60 px-4 py-2 font-sans text-sm text-on-surface-variant whitespace-nowrap">
                      <Tag className="w-4 h-4 text-sky-accent" aria-hidden="true" />
                      <span><span className="sr-only">Preis: </span>{page.price}</span>
                    </li>
                  )}
                </ul>
              )}

              <div className="flex flex-wrap gap-3 pt-3">
                <Link href="/terminbuchung" className="btn bg-primary text-pure-white medical-glow hover:bg-secondary">
                  Termin buchen
                </Link>
                <Link href="/preise" className="btn border border-primary/40 text-primary hover:bg-primary/5">
                  Alle Preise
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className={`relative overflow-hidden mx-auto medical-glow ${
                  isLandscape ? 'rounded-3xl aspect-[4/3]' : 'arch aspect-[4/5] max-w-[340px] lg:max-w-[420px]'
                }`}
              >
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

      {/* Benefits */}
      {page.benefits.length > 0 && (
        <section className="bg-sand/60">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 md:py-14">
            <h2 className="font-display text-2xl md:text-3xl text-primary mb-6">Ihre Vorteile</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {page.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 rounded-2xl bg-pure-white px-5 py-4 font-sans text-[15px] text-on-surface-variant">
                  <span className="w-7 h-7 rounded-full bg-sand flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-sky-accent" aria-hidden="true" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Long-form content */}
      <div className="bg-cream">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter py-16 md:py-20">
          <ContentSections sections={page.sections} />
        </div>
      </div>

      {page.relatedTreatments.length > 0 && (
        <section className="bg-sand/60 py-16 md:py-20">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-10">Verwandte Behandlungen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {page.relatedTreatments.map((slug, i) => (
                <ScrollReveal key={slug} variant="fade-in-up" delay={i * 70}>
                  <ImageLinkCard
                    href={treatmentPath(slug)}
                    title={TREATMENTS[slug].name}
                    text={TREATMENTS[slug].teaser}
                    image={TREATMENTS[slug].image}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.relatedThemes.length > 0 && (
        <section className="bg-cream pt-16 md:pt-20">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-8">Passende Hautanliegen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.relatedThemes.map((slug) => (
                <LinkCard key={slug} href={themePath(slug)} title={THEMES[slug].name} text={THEMES[slug].teaser} />
              ))}
            </div>
          </div>
        </section>
      )}

      {page.faqs.length > 0 && (
        <section className="bg-cream">
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter py-16 md:py-20">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-8">Häufige Fragen zu {page.name}</h2>
            <FaqList items={page.faqs} />
          </div>
        </section>
      )}

      <CtaBand
        title={`${page.name} in Osnabrück`}
        text="Buchen Sie Ihren Termin online oder lassen Sie sich zuerst beraten. Wir nehmen uns Zeit für Ihre Haut und Ihre Fragen."
      />
    </>
  );
}
