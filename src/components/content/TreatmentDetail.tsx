import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { ContentSections } from './ContentSections';
import { FaqList } from './FaqList';
import { LinkCard } from './LinkCard';
import { CtaBand } from './CtaBand';
import { THEMES, TREATMENTS, themePath, treatmentPath, type TreatmentPage } from '../../content';

export function TreatmentDetail({ page, breadcrumbs }: { readonly page: TreatmentPage; readonly breadcrumbs: readonly Crumb[] }) {
  const isLandscape = page.image.width > page.image.height;

  return (
    <>
      <div className="py-10 md:py-14 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <span className="font-display text-xs font-bold text-sky-accent uppercase tracking-widest block">
              {page.eyebrow}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">
              {page.h1}
            </h1>
            <div className="space-y-4">
              {page.intro.map((p, i) => (
                <p key={i} className="font-sans text-base text-tertiary leading-relaxed">{p}</p>
              ))}
            </div>

            {(page.duration || page.price) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {page.duration && (
                  <div className="bg-soft-shell p-5 rounded-lg border border-outline-variant/10 flex items-center gap-4">
                    <Clock className="w-7 h-7 text-primary shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-primary">Behandlungsdauer</p>
                      <p className="font-sans text-sm text-tertiary mt-1">{page.duration}</p>
                    </div>
                  </div>
                )}
                {page.price && (
                  <div className="bg-soft-shell p-5 rounded-lg border border-outline-variant/10 flex items-center gap-4">
                    <Tag className="w-7 h-7 text-primary shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-primary">Preis</p>
                      <p className="font-sans text-sm text-tertiary mt-1 whitespace-nowrap">{page.price}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4 pt-4">
              <h2 className="font-display text-lg font-bold text-primary">Ihre Vorteile</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {page.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 font-sans text-sm text-tertiary">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-accent shrink-0" aria-hidden="true"></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                href="/terminbuchung"
                className="bg-primary text-pure-white px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all text-center medical-glow"
              >
                Termin buchen
              </Link>
              <Link
                href="/preise"
                className="border border-outline text-tertiary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-soft-shell transition-all text-center"
              >
                Alle Preise
              </Link>
            </div>
          </div>

          <div
            className={`lg:col-span-5 w-full overflow-hidden rounded-lg shadow-lg order-1 lg:order-2 ${
              isLandscape ? '' : 'mx-auto max-w-[320px] lg:max-w-[340px]'
            }`}
          >
            <Image
              src={page.image.src}
              alt={page.image.alt}
              width={page.image.width}
              height={page.image.height}
              priority
              sizes="(min-width: 1024px) 400px, 90vw"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter pb-16">
        <ContentSections sections={page.sections} />
      </div>

      {(page.relatedThemes.length > 0 || page.relatedTreatments.length > 0) && (
        <section className="bg-soft-shell/40 border-y border-outline-variant/10 py-16">
          <div className="max-w-5xl mx-auto px-margin-mobile md:px-gutter space-y-12">
            {page.relatedThemes.length > 0 && (
              <ScrollReveal variant="fade-in-up">
                <h2 className="font-display text-2xl font-bold text-primary mb-6">Passende Hautanliegen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {page.relatedThemes.map((slug) => (
                    <LinkCard key={slug} href={themePath(slug)} title={THEMES[slug].name} text={THEMES[slug].teaser} />
                  ))}
                </div>
              </ScrollReveal>
            )}
            {page.relatedTreatments.length > 0 && (
              <ScrollReveal variant="fade-in-up">
                <h2 className="font-display text-2xl font-bold text-primary mb-6">Verwandte Behandlungen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {page.relatedTreatments.map((slug) => (
                    <LinkCard key={slug} href={treatmentPath(slug)} title={TREATMENTS[slug].name} text={TREATMENTS[slug].teaser} />
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {page.faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-margin-mobile md:px-gutter py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8">
            Häufige Fragen zu {page.name}
          </h2>
          <FaqList items={page.faqs} />
        </section>
      )}

      <CtaBand
        title={`${page.name} in Osnabrück`}
        text="Buchen Sie Ihren Termin online oder lassen Sie sich zuerst beraten. Wir nehmen uns Zeit für Ihre Haut und Ihre Fragen."
      />
    </>
  );
}
