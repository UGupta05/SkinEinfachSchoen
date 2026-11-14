"use client";

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { BUSINESS } from '../config/business';

export interface NavLink {
  readonly name: string;
  readonly path: string;
}

const PAGE_LINKS: readonly NavLink[] = [
  { name: 'Medical Kosmetik ZO', path: '/medical-kosmetik-zo' },
  { name: 'Orthomolekulare Medizin', path: '/orthomolekulare-medizin' },
  { name: 'Team', path: '/team' },
  { name: 'Kontakt', path: '/kontakt' },
];

const number = (i: number) => String(i + 1).padStart(2, '0');

/**
 * Site header. Desktop: "Leistungen" opens a mega menu (intro, numbered
 * treatments, skin concerns, featured card). Phones: a full-screen menu with
 * the treatments in an expandable list.
 */
export function SiteHeader({
  treatmentLinks,
  themeLinks,
}: {
  readonly treatmentLinks: readonly NavLink[];
  readonly themeLinks: readonly NavLink[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const megaId = useId();
  const mobileId = useId();

  const isServicesActive =
    pathname.startsWith('/leistungen') || themeLinks.some((t) => t.path === pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Every navigation closes both menus.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileTreatmentsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (megaOpen) triggerRef.current?.focus();
      setMegaOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [megaOpen, mobileOpen]);

  // The full-screen menu owns scrolling while it is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  // A short delay lets the pointer travel from the trigger into the panel.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const linkClass = (active: boolean) =>
    `font-sans text-[15px] font-medium transition-colors hover:text-primary nav-link-underline ${
      active ? 'text-primary active' : 'text-tertiary'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 border-b ${
          scrolled || megaOpen || mobileOpen
            ? 'bg-cream/95 backdrop-blur-md border-outline-variant/50'
            : 'bg-cream/90 backdrop-blur-sm border-transparent'
        } ${scrolled && !megaOpen ? 'medical-glow' : ''}`}
      >
        <nav aria-label="Hauptnavigation" className="flex justify-between items-center h-full px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
          <Link href="/" className="flex items-center">
            <img src="/images/home/logo.png" alt="SKIN einfach schön" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-7">
            <li onMouseEnter={openMega} onMouseLeave={scheduleClose}>
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onClick={() => (megaOpen ? setMegaOpen(false) : openMega())}
                className={`inline-flex items-center gap-1 ${linkClass(isServicesActive)}`}
              >
                Leistungen
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {/* Mega menu: positioned against the fixed header, but a DOM child of the trigger's <li> so hovering it keeps it open. */}
              <div
                id={megaId}
                hidden={!megaOpen}
                className="absolute left-0 right-0 top-full bg-cream border-b border-outline-variant/50 shadow-[0_24px_48px_-24px_rgba(94,72,50,0.35)]"
              >
                <div className="max-w-container-max mx-auto px-gutter py-10 grid grid-cols-12 gap-10">
                  <div className="col-span-3 space-y-4">
                    <span className="eyebrow text-sky-accent">Behandlungen</span>
                    <p className="font-display text-3xl text-primary leading-tight">Was dürfen wir für Ihre Haut tun?</p>
                    <p className="font-sans text-sm text-tertiary leading-relaxed">
                      Moderne Behandlungen und ehrliche Beratung in unserem Studio an der Lotter Straße.
                    </p>
                    <Link href="/leistungen" className="btn bg-primary text-pure-white hover:bg-secondary">
                      Alle Behandlungen
                    </Link>
                  </div>

                  <div className="col-span-4">
                    <p className="eyebrow text-tertiary mb-4">Leistungen</p>
                    <ol className="grid grid-cols-2 gap-x-6">
                      {treatmentLinks.map((t, i) => (
                        <li key={t.path}>
                          <Link
                            href={t.path}
                            aria-current={pathname === t.path ? 'page' : undefined}
                            className={`group flex items-baseline gap-3 py-2 border-b border-outline-variant/40 font-sans text-[15px] transition-colors hover:text-primary ${
                              pathname === t.path ? 'text-primary font-medium' : 'text-on-surface-variant'
                            }`}
                          >
                            <span className="font-sans text-xs text-sky-accent tabular-nums">{number(i)}</span>
                            <span>{t.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="col-span-2">
                    <p className="eyebrow text-tertiary mb-4">Hautanliegen</p>
                    <ul>
                      {themeLinks.map((t) => (
                        <li key={t.path}>
                          <Link
                            href={t.path}
                            aria-current={pathname === t.path ? 'page' : undefined}
                            className={`block py-2 font-sans text-[15px] transition-colors hover:text-primary ${
                              pathname === t.path ? 'text-primary font-medium' : 'text-on-surface-variant'
                            }`}
                          >
                            {t.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/leistungen/visia" className="col-span-3 group block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand">
                      <Image
                        src="/images/studio/raum-2.jpg"
                        alt="Behandlungsraum von SKIN einfach schön mit Liege und ZO® Skin Health Produkten"
                        fill
                        sizes="300px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="font-display text-xl text-primary mt-4">Nicht sicher, was passt?</p>
                    <p className="font-sans text-sm text-tertiary mt-1 inline-flex items-center gap-1.5">
                      Starten Sie mit der VISIA® Hautanalyse
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </p>
                  </Link>
                </div>
              </div>
            </li>
            {PAGE_LINKS.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className={linkClass(pathname === link.path)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/terminbuchung" className="btn hidden md:inline-flex bg-primary text-pure-white hover:bg-secondary">
              Terminbuchung
            </Link>
            <button
              type="button"
              onClick={() => {
                // On a treatment or skin-concern page, show the treatment list right away.
                if (!mobileOpen) setMobileTreatmentsOpen(isServicesActive);
                setMobileOpen(!mobileOpen);
              }}
              className="md:hidden text-primary p-1 -mr-1"
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu on phones */}
      <div
        id={mobileId}
        hidden={!mobileOpen}
        className="fixed inset-0 top-20 z-40 bg-cream overflow-y-auto md:hidden"
      >
        <nav aria-label="Mobile Navigation" className="px-margin-mobile pt-6 pb-10 flex flex-col min-h-full">
          <ul className="border-t border-outline-variant/60">
            <li className="border-b border-outline-variant/60">
              <button
                type="button"
                onClick={() => setMobileTreatmentsOpen((open) => !open)}
                aria-expanded={mobileTreatmentsOpen}
                className="w-full flex items-center justify-between py-4 font-display text-3xl text-primary text-left"
              >
                Leistungen
                <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {mobileTreatmentsOpen && (
                <div className="pb-5">
                  <ol>
                    {treatmentLinks.map((t, i) => (
                      <li key={t.path}>
                        <Link
                          href={t.path}
                          aria-current={pathname === t.path ? 'page' : undefined}
                          className={`flex items-baseline gap-3 py-2.5 font-sans text-base ${
                            pathname === t.path ? 'text-primary font-medium' : 'text-on-surface-variant'
                          }`}
                        >
                          <span className="text-xs text-sky-accent tabular-nums">{number(i)}</span>
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ol>
                  <Link href="/leistungen" className="inline-flex items-center gap-2 mt-3 font-sans text-sm font-medium text-primary">
                    Alle Behandlungen &amp; Hautanliegen <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </li>
            {PAGE_LINKS.map((link) => (
              <li key={link.path} className="border-b border-outline-variant/60">
                <Link
                  href={link.path}
                  aria-current={pathname === link.path ? 'page' : undefined}
                  className="block py-4 font-display text-3xl text-primary"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/terminbuchung" className="btn bg-primary text-pure-white hover:bg-secondary mt-8 w-full">
            Termin online buchen
          </Link>

          <div className="mt-auto pt-10 grid grid-cols-2 gap-4 font-sans text-sm text-tertiary">
            <div>
              <p className="eyebrow text-sky-accent mb-2">Adresse</p>
              <p>{BUSINESS.address.street}</p>
              <p>
                {BUSINESS.address.postalCode} {BUSINESS.address.city}
              </p>
            </div>
            <div>
              <p className="eyebrow text-sky-accent mb-2">Kontakt</p>
              <a href={`tel:${BUSINESS.telephone}`} className="block hover:text-primary">
                0176 55132650
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="block hover:text-primary break-all">
                {BUSINESS.email}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
