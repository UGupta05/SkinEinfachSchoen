"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar Navigation */}
      {/* Sticky rather than fixed, so it starts below the site-wide notice
          above the page content instead of covering it. */}
      <aside className="hidden lg:block sticky top-20 self-start shrink-0 h-[calc(100vh-80px)] w-72 bg-soft-shell border-r border-slate-muted/15 py-6 overflow-y-auto">
        <div className="px-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <Link href="/leistungen" className="hover:opacity-85 transition-opacity">
                <span className="font-display text-sm font-bold text-primary leading-none block">Leistungen</span>
              </Link>
              <p className="text-[10px] text-tertiary uppercase tracking-wider mt-1">Exzellenz in Ästhetik</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-3 gap-3 transition-all font-display text-xs font-bold uppercase tracking-wider border-l-4 ${
                  isActive
                    ? 'bg-surface-container text-primary border-primary pl-5 pr-6'
                    : 'text-tertiary hover:bg-surface-container hover:text-primary border-transparent pl-5 pr-6'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-accent shrink-0"></span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Navigation Chip Bar */}
      <div className="lg:hidden sticky top-20 z-40 bg-pure-white/95 backdrop-blur-md border-b border-outline-variant/10 py-4 shadow-sm w-full">
        <div className="flex items-center gap-2 overflow-x-auto px-margin-mobile no-scrollbar w-full">
          <Link
            href="/leistungen"
            className={`px-4 py-2 rounded-full font-display text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
              pathname === '/leistungen'
                ? 'bg-primary text-pure-white'
                : 'bg-sky-accent/10 text-primary hover:bg-sky-accent/20'
            }`}
          >
            Übersicht
          </Link>
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full font-display text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                  isActive
                    ? 'bg-primary text-pure-white'
                    : 'bg-sky-accent/10 text-primary hover:bg-sky-accent/20'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 bg-pure-white min-h-screen">
        {children}
      </div>
    </div>
  );
}
