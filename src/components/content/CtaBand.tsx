import React from 'react';
import Link from 'next/link';

export function CtaBand({ title, text }: { readonly title: string; readonly text: string }) {
  return (
    <section className="bg-cream px-margin-mobile md:px-gutter py-section-padding-sm">
      <div className="max-w-container-max mx-auto rounded-3xl bg-primary text-pure-white text-center px-6 py-14 md:py-16 space-y-6">
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
        <p className="font-sans text-base md:text-lg text-pure-white/85 leading-relaxed max-w-2xl mx-auto">{text}</p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/terminbuchung"
            className="btn bg-pure-white text-primary medical-glow"
          >
            Termin online buchen
          </Link>
          <Link
            href="/kontakt"
            className="btn border border-pure-white/60 text-pure-white hover:bg-pure-white/10"
          >
            Beratung anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
