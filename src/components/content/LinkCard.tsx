import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Card whose link text is the target page's name (descriptive anchor text). */
export function LinkCard({ href, title, text }: { readonly href: string; readonly title: string; readonly text: string }) {
  return (
    <Link
      href={href}
      className="group block bg-pure-white p-6 rounded-2xl border border-outline-variant/50 hover:border-primary/25 hover-glow transition-all duration-300 h-full"
    >
      <span className="font-display text-xl text-primary flex items-center justify-between gap-3">
        {title}
        <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
      <span className="block font-sans text-sm text-tertiary mt-2 leading-relaxed">{text}</span>
    </Link>
  );
}
