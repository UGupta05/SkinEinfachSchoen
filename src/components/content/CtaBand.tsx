import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/** Closing call to action: light card with copy on one side and a studio photo on the other. */
export function CtaBand({ title, text }: { readonly title: string; readonly text: string }) {
  return (
    <section className="bg-cream px-margin-mobile md:px-gutter py-16 md:py-20">
      <div className="max-w-container-max mx-auto rounded-3xl bg-sand overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-span-7 px-6 py-12 md:px-14 md:py-16 space-y-5">
          <span className="eyebrow text-sky-accent">Persönliche Beratung</span>
          <h2 className="font-display text-3xl md:text-4xl text-primary">{title}</h2>
          <p className="font-sans text-base md:text-lg text-tertiary leading-relaxed max-w-xl">{text}</p>
          <div className="pt-3 flex flex-wrap gap-3">
            <Link href="/terminbuchung" className="btn bg-primary text-pure-white medical-glow hover:bg-secondary">
              Termin online buchen
            </Link>
            <Link href="/kontakt" className="btn border border-primary/40 text-primary hover:bg-primary/5">
              Beratung anfragen
            </Link>
          </div>
        </div>
        <div className="hidden md:block md:col-span-5 self-stretch relative min-h-[320px]">
          <Image
            src="/images/studio/beratung.jpg"
            alt="Persönliche Beratung im Studio SKIN einfach schön in Osnabrück"
            fill
            sizes="40vw"
            className="object-cover object-[50%_15%]"
          />
        </div>
      </div>
    </section>
  );
}
