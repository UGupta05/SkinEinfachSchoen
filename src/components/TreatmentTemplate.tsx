import React from 'react';
import { Check, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from './ScrollReveal';


export interface TreatmentTemplateProps {
  readonly title: string;
  readonly category: string;
  readonly description: React.ReactNode;
  readonly points: readonly string[];
  readonly duration?: string;
  readonly price?: string;
  readonly image: string;
  readonly imageAspectRatio?: 'portrait' | 'landscape';
}

export const TreatmentTemplate: React.FC<TreatmentTemplateProps> = ({
  title,
  category,
  description,
  points,
  duration,
  price,
  image,
  imageAspectRatio
}) => {
  const isLandscape = imageAspectRatio === 'landscape';

  return (
    <>
      <section className="bg-cream">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-12 pb-16 md:pt-16 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ScrollReveal variant="fade-in-up" immediate className="lg:col-span-7 space-y-6">
            <span className="eyebrow text-sky-accent">{category}</span>
            <h1 className="font-display text-4xl md:text-[3.25rem] md:leading-[1.08] text-primary">{title}</h1>
            <div className="font-sans text-base md:text-lg text-tertiary leading-relaxed">{description}</div>

            {(duration || price) && (
              <ul className="flex flex-wrap gap-3 pt-1">
                {duration && (
                  <li className="inline-flex items-center gap-2 rounded-full bg-pure-white border border-outline-variant/60 px-4 py-2 font-sans text-sm text-on-surface-variant">
                    <Clock className="w-4 h-4 text-sky-accent" aria-hidden="true" />
                    <span><span className="sr-only">Behandlungsdauer: </span>{duration}</span>
                  </li>
                )}
                {price && (
                  <li className="inline-flex items-center gap-2 rounded-full bg-pure-white border border-outline-variant/60 px-4 py-2 font-sans text-sm text-on-surface-variant whitespace-nowrap">
                    <Tag className="w-4 h-4 text-sky-accent" aria-hidden="true" />
                    <span><span className="sr-only">Preis: </span>{price}</span>
                  </li>
                )}
              </ul>
            )}

            <div className="flex flex-wrap gap-3 pt-3">
              <Link href="/terminbuchung" className="btn bg-primary text-pure-white medical-glow hover:bg-secondary">
                Termin buchen
              </Link>
              <Link href="/leistungen" className="btn border border-primary/40 text-primary hover:bg-primary/5">
                Alle Leistungen
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-in" immediate className="lg:col-span-5">
            <div
              className={`relative overflow-hidden mx-auto medical-glow ${
                isLandscape ? 'rounded-3xl aspect-[4/3]' : 'arch aspect-[4/5] max-w-[340px] lg:max-w-[420px]'
              }`}
            >
              <Image alt={title} src={image} fill priority sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {points.length > 0 && (
        <section className="bg-sand/60">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 md:py-14">
            <h2 className="font-display text-2xl md:text-3xl text-primary mb-6">Ihre Vorteile</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {points.map((pt) => (
                <li key={pt} className="flex items-center gap-3 rounded-2xl bg-pure-white px-5 py-4 font-sans text-[15px] text-on-surface-variant">
                  <span className="w-7 h-7 rounded-full bg-sand flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-sky-accent" aria-hidden="true" />
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};
