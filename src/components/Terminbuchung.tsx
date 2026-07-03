"use client";

import React from 'react';

export const Terminbuchung: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_PLANITY_API_KEY || '-O6_yVEoetmNMQ3ly9xo';
  const iframeSrc = `/planity-widget.html?key=${encodeURIComponent(apiKey)}`;

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
            Buchen Sie Ihre Behandlung, kaufen Sie Gutscheine oder verwalten Sie Ihr Kundenkonto bequem online über unser Planity Buchungsportal.
          </p>
        </div>

        {/* Planity Widget Container */}
        <div className="max-w-5xl mx-auto bg-pure-white border border-outline-variant/10 rounded-2xl shadow-sm overflow-hidden medical-glow">
          <iframe 
            src={iframeSrc}
            className="w-full min-h-[750px] md:min-h-[850px] border-none"
            title="Planity Terminbuchung"
          />
        </div>
      </div>
    </div>
  );
};
