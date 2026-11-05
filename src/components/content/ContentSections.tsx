import React from 'react';
import type { ContentSection } from '../../content/types';

export function ContentSections({ sections }: { readonly sections: readonly ContentSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary leading-tight">
            {section.heading}
          </h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="font-sans text-base text-tertiary leading-relaxed">{p}</p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="space-y-2 pt-1">
              {section.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 font-sans text-base text-tertiary leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-accent shrink-0 mt-2.5" aria-hidden="true"></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
