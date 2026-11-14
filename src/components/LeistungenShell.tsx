"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  readonly href: string;
  readonly name: string;
}

/**
 * Client-side part of the /leistungen layout (needs the pathname for the
 * active state). Receives only names and links so page copy stays out of the
 * client bundle.
 */
export function LeistungenShell({
  items,
  children,
}: {
  readonly items: readonly NavItem[];
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const links = [{ href: '/leistungen', name: 'Übersicht' }, ...items];

  return (
    <div className="min-h-screen bg-cream">
      {/* Treatment switcher: one row of pills on every screen size, sticky below the header. */}
      <div className="sticky top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-outline-variant/50">
        <nav aria-label="Behandlungen" className="max-w-container-max mx-auto flex items-center gap-2 overflow-x-auto px-margin-mobile md:px-gutter py-3 no-scrollbar">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors shrink-0 ${
                  isActive
                    ? 'bg-primary text-pure-white'
                    : 'text-tertiary hover:bg-sand hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {children}
    </div>
  );
}
