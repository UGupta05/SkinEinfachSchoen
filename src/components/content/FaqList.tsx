import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqEntry } from '../../content/types';

/**
 * FAQ built on native <details>, so answers are in the HTML, work without
 * JavaScript and match the FAQPage structured data on the same page.
 */
export function FaqList({ items }: { readonly items: readonly FaqEntry[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group bg-soft-shell/40 rounded-xl border border-outline-variant/10 overflow-hidden"
        >
          <summary className="cursor-pointer list-none py-5 px-6 flex justify-between items-center gap-4 text-left hover:bg-soft-shell/60 transition-colors [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-sm md:text-base font-bold text-primary">{item.question}</h3>
            <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="p-6 font-sans text-sm text-tertiary leading-relaxed bg-pure-white border-t border-outline-variant/5">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
