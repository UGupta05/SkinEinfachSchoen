import React from 'react';
import Link from 'next/link';

export function CtaBand({ title, text }: { readonly title: string; readonly text: string }) {
  return (
    <section className="bg-primary text-pure-white py-section-padding-sm text-center">
      <div className="max-w-2xl mx-auto space-y-6 px-margin-mobile">
        <h2 className="font-display text-3xl font-bold">{title}</h2>
        <p className="font-sans text-base opacity-90 leading-relaxed">{text}</p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/terminbuchung"
            className="bg-pure-white text-primary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all inline-block medical-glow duration-300"
          >
            Termin online buchen
          </Link>
          <Link
            href="/kontakt"
            className="border border-pure-white/60 text-pure-white px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-pure-white/10 transition-all inline-block"
          >
            Beratung anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
