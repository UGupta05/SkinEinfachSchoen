import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Leistungen', path: '/leistungen' },
    { name: 'Medical Kosmetik ZO', path: '/medical-kosmetik-zo' },
    { name: 'Team', path: '/team' },
    { name: 'Kontakt', path: '/kontakt' },
    { name: 'Online-Shop', path: '/shop' }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary/20">
      {/* Header / Top Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-pure-white/95 backdrop-blur-md shadow-md border-outline-variant/20'
            : 'bg-pure-white/90 backdrop-blur-sm shadow-sm border-outline-variant/15'
        }`}
      >
        <nav className="flex justify-between items-center h-full px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
          <Link to="/" className="font-display text-primary tracking-tighter text-2xl font-bold">
            SKIN
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-tertiary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/shop" className="text-primary hover:opacity-80 transition-opacity">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            </Link>
            
            <Link
              to="/terminbuchung"
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
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-lg font-bold uppercase tracking-wider text-primary border-b border-outline-variant/10 pb-2"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/terminbuchung"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-pure-white py-4 text-center font-display text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all"
            >
              Terminbuchung
            </Link>
          </nav>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1 pt-20">
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
              <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-pure-white transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-pure-white transition-all" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold text-primary uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/leistungen" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Leistungen</Link>
              </li>
              <li>
                <Link to="/medical-kosmetik-zo" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Medical Kosmetik ZO</Link>
              </li>
              <li>
                <Link to="/team" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Team</Link>
              </li>
              <li>
                <Link to="/kontakt" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Kontakt</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold text-primary uppercase tracking-widest mb-6">Rechtliches</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Impressum</a>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Datenschutz</a>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">AGB</a>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-tertiary hover:text-primary transition-colors">Widerruf</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold text-primary uppercase tracking-widest mb-6">Kontakt</h4>
            <p className="font-sans text-sm text-tertiary mb-2">Musterstraße 123</p>
            <p className="font-sans text-sm text-tertiary mb-6">49074 Osnabrück</p>
            <a
              href="mailto:info@skin-einfach-schoen.de"
              className="font-sans text-sm text-primary font-bold block mb-2 underline decoration-sky-accent underline-offset-4"
            >
              info@skin-einfach-schoen.de
            </a>
            <p className="font-sans text-sm text-tertiary">+49 (0) 541 1234567</p>
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
