"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminPath) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminPath]);

  useEffect(() => {
    if (isAdminPath) return;
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [pathname, isAdminPath]);

  if (isAdminPath) {
    return <div className="min-h-screen bg-background text-on-surface font-sans">{children}</div>;
  }

  const navLinks = [
    { name: 'Leistungen', path: '/leistungen' },
    { name: 'Medical Kosmetik ZO', path: '/medical-kosmetik-zo' },
    { name: 'Orthomolekulare Medizin', path: '/orthomolekulare-medizin' },
    { name: 'Team', path: '/team' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary/20">
      {/* Header / Top Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 border-b ${scrolled
            ? 'bg-pure-white/95 backdrop-blur-md shadow-md border-outline-variant/20'
            : 'bg-pure-white/90 backdrop-blur-sm shadow-sm border-outline-variant/15'
          }`}
      >
        <nav className="flex justify-between items-center h-full px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
          <Link href="/" className="flex items-center">
            <img
              src="/images/home/logo.png"
              alt="SKIN einfach schön"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary nav-link-underline ${isActive
                      ? 'text-primary active'
                      : 'text-tertiary'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">


            <Link
              href="/terminbuchung"
              className="hidden md:block bg-slate-muted text-pure-white px-6 py-3 font-display text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
            >
              Terminbuchung
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-45 bg-pure-white md:hidden flex flex-col p-8 transition-transform duration-300">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-lg font-bold uppercase tracking-wider text-primary border-b border-outline-variant/10 pb-2"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/terminbuchung"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-pure-white py-4 text-center font-display text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all"
            >
              Terminbuchung
            </Link>
          </nav>
        </div>
      )}

      {/* Main Page Area */}
      <main key={pathname} className="flex-1 pt-20 animate-page-entrance">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-section-padding-sm bg-soft-shell border-t border-outline-variant/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div>
            <h3 className="font-display text-lg text-primary mb-4 font-bold uppercase tracking-wider">SKIN</h3>
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

          <div>
            <h4 className="font-display text-xs font-bold text-primary uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/leistungen" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Leistungen</Link>
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
            <h4 className="font-display text-xs font-bold text-primary uppercase tracking-widest mb-6">Rechtliches</h4>
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
            <h4 className="font-display text-xs font-bold text-primary uppercase tracking-widest mb-6">Kontakt</h4>
            <p className="font-sans text-sm text-tertiary mb-2">Lotter Straße 33</p>
            <p className="font-sans text-sm text-tertiary mb-6">49078 Osnabrück</p>
            <a
              href="mailto:info@skin-einfachschoen.de"
              className="font-sans text-sm text-primary font-bold block mb-2 underline decoration-sky-accent underline-offset-4"
            >
              info@skin-einfachschoen.de
            </a>
            <p className="font-sans text-sm text-tertiary">+49 (0) 541 123 45 67</p>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-16 pt-8 border-t border-outline-variant/10 text-center">
          <p className="font-display text-[10px] text-tertiary uppercase tracking-wider">
            © 2026 SKIN einfach schön GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};
