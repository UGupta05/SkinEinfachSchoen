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
          className="group bg-pure-white rounded-2xl border border-outline-variant/50 overflow-hidden"
        >
          <summary className="cursor-pointer list-none py-5 px-6 flex justify-between items-center gap-4 text-left hover:bg-cream transition-colors [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-base font-medium text-on-surface">{item.question}</h3>
            <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="px-6 pb-6 font-sans text-[15px] text-tertiary leading-relaxed bg-pure-white">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
