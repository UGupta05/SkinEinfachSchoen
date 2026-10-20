import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { ContentSections } from './ContentSections';
import { FaqList } from './FaqList';
import { CtaBand } from './CtaBand';
import { resolveTreatmentLink, type ThemePage } from '../../content';

export function ThemeDetail({ page, breadcrumbs }: { readonly page: ThemePage; readonly breadcrumbs: readonly Crumb[] }) {
  return (
    <>
      <section className="bg-soft-shell overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-10 md:py-14">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-8">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-display text-xs font-bold text-sky-accent uppercase tracking-widest block">
                {page.eyebrow}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">{page.h1}</h1>
              <div className="space-y-4">
                {page.intro.map((p, i) => (
                  <p key={i} className="font-sans text-base text-tertiary leading-relaxed">{p}</p>
                ))}
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/terminbuchung"
                  className="bg-primary text-pure-white px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all text-center medical-glow"
                >
                  Beratungstermin buchen
                </Link>
                <a
                  href="#behandlungen"
                  className="border border-outline text-tertiary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-pure-white transition-all text-center"
                >
                  Behandlungen ansehen
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 w-full overflow-hidden rounded-lg shadow-lg mx-auto max-w-[340px]">
              <Image
                src={page.image.src}
                alt={page.image.alt}
                width={page.image.width}
                height={page.image.height}
                priority
                sizes="(min-width: 1024px) 340px, 90vw"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="behandlungen" className="max-w-5xl mx-auto px-margin-mobile md:px-gutter py-16 scroll-mt-24">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8">
          Passende Behandlungen: {page.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {page.treatments.map((t, i) => {
            const link = resolveTreatmentLink(t.slug);
            return (
              <ScrollReveal key={t.slug} variant="fade-in-up" delay={i * 80}>
                <Link
                  href={link.href}
                  className="group block bg-soft-shell p-6 rounded-lg border border-outline-variant/10 hover:border-primary/30 hover:shadow-md transition-all h-full"
                >
                  <span className="font-display text-base font-bold text-primary flex items-center justify-between gap-3">
                    {link.name}
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="block font-sans text-sm text-tertiary mt-2 leading-relaxed">{t.reason}</span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter pb-16">
        <ContentSections sections={page.sections} />
      </div>

      {page.faqs.length > 0 && (
        <section className="bg-soft-shell/40 border-t border-outline-variant/10">
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-gutter py-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8">
              Häufige Fragen: {page.name}
            </h2>
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
