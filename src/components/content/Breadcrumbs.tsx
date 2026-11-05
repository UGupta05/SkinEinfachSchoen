import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  readonly name: string;
  readonly path: string;
}

/** Visible breadcrumb trail; pair with breadcrumbSchema() for structured data. */
export function Breadcrumbs({ items }: { readonly items: readonly Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen" className="font-sans text-xs text-tertiary">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-primary font-semibold">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-primary transition-colors">{item.name}</Link>
                  <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
