'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const MAP_EMBED_SRC =
  'https://maps.google.com/maps?q=Lotter%20Stra%C3%9Fe%2033,%2049078%20Osnabr%C3%BCck&t=&z=15&ie=UTF8&iwloc=&output=embed';

interface ConsentMapProps {
  /** Extra classes for the iframe once loaded (e.g. grayscale treatment). */
  readonly iframeClassName?: string;
}

/**
 * Google Maps embed behind an explicit opt-in ("Zwei-Klick-Lösung").
 *
 * Loading the Maps iframe transmits the visitor's IP to Google and sets
 * third-party cookies, which under GDPR requires prior consent. Rendering a
 * placeholder until the user clicks keeps the site consent-free — no cookie
 * banner needed — and avoids the third-party request on first paint.
 */
export function ConsentMap({ iframeClassName = '' }: ConsentMapProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="SKIN Osnabrück Standort"
        src={MAP_EMBED_SRC}
        className={`w-full h-full border-0 ${iframeClassName}`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 bg-surface-container px-6 text-center">
      <MapPin className="w-8 h-8 text-primary" aria-hidden="true" />
      <div className="space-y-2 max-w-sm">
        <p className="font-display text-sm font-bold text-on-surface uppercase tracking-widest">
          Karte anzeigen
        </p>
        <p className="font-sans text-xs text-tertiary leading-relaxed">
          Beim Laden der Karte werden Daten an Google übertragen. Weitere
          Informationen finden Sie in unserer{' '}
          <a href="/datenschutz" className="text-primary underline hover:no-underline">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest px-6 py-3 rounded hover:opacity-90 transition-opacity"
      >
        Karte laden
      </button>
      <a
        href="https://maps.google.com/?q=Lotter+Strasse+33,+49078+Osnabrueck"
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-xs text-tertiary underline hover:text-primary transition-colors"
      >
        Oder direkt in Google Maps öffnen
      </a>
    </div>
  );
}
