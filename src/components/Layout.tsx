"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RetinolNotice } from './RetinolNotice';
import { SiteHeader } from './SiteHeader';

export interface FooterLink {
  readonly name: string;
  readonly path: string;
}

interface LayoutProps {
  readonly children: React.ReactNode;
  /** Passed in from the server root layout so page copy stays out of the client bundle. */
  readonly treatmentLinks: readonly FooterLink[];
  readonly themeLinks: readonly FooterLink[];
}

const footerLinkClass = 'font-sans text-sm text-tertiary hover:text-primary transition-colors';

function FooterColumn({ title, links }: { readonly title: string; readonly links: readonly FooterLink[] }) {
  return (
    <div>
      <h4 className="font-sans text-xs font-semibold text-primary uppercase tracking-[0.16em] mb-6">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link href={link.path} className={footerLinkClass}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Layout: React.FC<LayoutProps> = ({ children, treatmentLinks, themeLinks }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary/20">
      <SiteHeader treatmentLinks={treatmentLinks} themeLinks={themeLinks} />

      {/* Main Page Area */}
      <main key={pathname} className="flex-1 pt-20 animate-page-entrance">
        <RetinolNotice />
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-section-padding-sm bg-sand border-t border-outline-variant/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div>
            <h3 className="font-display text-lg text-primary mb-4 font-medium">SKIN</h3>
            <p className="font-sans text-sm text-tertiary mb-6">
              Medical Kosmetik &amp; Ästhetik auf höchstem Niveau.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/skin_einfach_schoen/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-pure-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/skineinfachschoen/?locale=de_DE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-pure-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@SkinEinfachSch%C3%B6n"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-pure-white transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          <FooterColumn title="Behandlungen" links={treatmentLinks} />
          <FooterColumn title="Hautanliegen" links={themeLinks} />

          <div>
            <h4 className="font-sans text-xs font-semibold text-primary uppercase tracking-[0.16em] mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/leistungen" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Leistungen</Link>
              </li>
              <li>
                <Link href="/preise" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Preise</Link>
              </li>
              <li>
                <Link href="/medical-kosmetik-zo" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Medical Kosmetik ZO</Link>
              </li>
              <li>
                <Link href="/orthomolekulare-medizin" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Orthomolekulare Medizin</Link>
              </li>
              <li>
                <Link href="/team" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Team</Link>
              </li>
              <li>
                <Link href="/kontakt" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Kontakt</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold text-primary uppercase tracking-[0.16em] mb-6">Rechtliches</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/impressum" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Datenschutz</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold text-primary uppercase tracking-[0.16em] mb-6">Kontakt</h4>
            <p className="font-sans text-sm text-tertiary mb-2">Lotter Straße 33</p>
            <p className="font-sans text-sm text-tertiary mb-6">49078 Osnabrück</p>
            <a
              href="mailto:info@skin-einfachschoen.de"
              className="font-sans text-sm text-primary font-bold block mb-2 underline decoration-sky-accent underline-offset-4"
            >
              info@skin-einfachschoen.de
            </a>
            <a href="tel:+4917655132650" className="font-sans text-sm text-tertiary hover:text-primary transition-colors block">+49 (0) 176 55132650</a>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-16 pt-8 border-t border-outline-variant/10 text-center">
          <p className="font-sans text-[10px] text-tertiary uppercase tracking-wider">
            © 2026 SKIN einfach schön GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};
