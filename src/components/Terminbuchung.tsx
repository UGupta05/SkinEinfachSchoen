"use client";

import React, { useEffect, useRef } from 'react';

const NATIVIO_ORIGIN = 'https://getnativio.de';
const NATIVIO_BOOKING_URL = `${NATIVIO_ORIGIN}/skin-einfach-schoen/book?embed=1`;

export const Terminbuchung: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // The embedded booking page reports its content height so the iframe never needs its own scrollbar.
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== NATIVIO_ORIGIN || e.data?.type !== 'nativio:embed-height') return;
      const frame = iframeRef.current;
      if (!frame || frame.contentWindow !== e.source) return;

      const height = Math.ceil(Number(e.data.height) || 0);
      if (height <= 0) return;
      const previous = frame.offsetHeight;
      frame.style.height = `${height}px`;
      // When the next step is shorter and the frame's top has scrolled away, bring it back into view.
      if (height < previous && frame.getBoundingClientRect().bottom < 100) {
        frame.scrollIntoView({ block: 'start' });
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="bg-background text-on-surface font-sans antialiased pt-16 pb-28 lg:pb-16 min-h-[90vh]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Booking Header */}
        <div className="mb-12 text-center space-y-4">
          <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase">
            Online-Buchung
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary tracking-tight">
            Ihr Wunschtermin bei SKiN
          </h1>
          <p className="text-tertiary font-sans text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Wählen Sie Ihre Behandlung und buchen Sie Ihren Wunschtermin bequem online.
          </p>
        </div>

        {/* Nativio booking widget */}
        <div className="max-w-3xl mx-auto">
          <iframe
            ref={iframeRef}
            src={NATIVIO_BOOKING_URL}
            title="Termin buchen"
            loading="lazy"
            className="block w-full max-w-[720px] mx-auto border-0"
            style={{ height: 800 }}
          />
        </div>
      </div>
    </div>
  );
};
