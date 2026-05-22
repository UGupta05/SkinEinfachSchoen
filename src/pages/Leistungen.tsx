import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { TREATMENTS } from '../data/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star } from 'lucide-react';

export const Leistungen: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-72 bg-soft-shell border-r border-slate-muted/15 py-6 overflow-y-auto hidden lg:block">
        <div className="px-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <Link to="/leistungen" className="hover:opacity-85 transition-opacity">
                <h3 className="font-display text-sm font-bold text-primary leading-none">Leistungen</h3>
              </Link>
              <p className="text-[10px] text-tertiary uppercase tracking-wider mt-1">Exzellenz in Ästhetik</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col">
          {TREATMENTS.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `flex items-center py-3 gap-3 transition-all font-display text-xs font-bold uppercase tracking-wider border-l-4 ${
                  isActive
                    ? 'bg-surface-container text-primary border-primary pl-5 pr-6'
                    : 'text-tertiary hover:bg-surface-container hover:text-primary border-transparent pl-5 pr-6'
                }`
              }
            >
              <span className="w-2 h-2 rounded-full bg-sky-accent shrink-0"></span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 bg-pure-white min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export const LeistungenOverview: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="px-margin-mobile md:px-gutter py-12 lg:py-16 bg-soft-shell overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <span className="font-display text-xs font-bold text-primary uppercase tracking-widest block">
              Wissenschaft trifft Ästhetik
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">
              Leistungsportfolio
            </h1>
            <p className="font-sans text-base text-tertiary leading-relaxed">
              Entdecken Sie unsere hochspezialisierten Behandlungen, die modernste medizinische Technik mit exklusiver Pflege vereinen. Für eine Haut, die nicht nur schön aussieht, sondern gesund strahlt.
            </p>
          </div>
          <div className="flex-1 w-full h-[250px] md:h-[350px] relative">
            <img
              alt="Klinik Interieur"
              className="w-full h-full object-cover shadow-lg rounded-sm"
              src="/images/team/praxis.png"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-margin-mobile md:px-gutter py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          
          {/* Service 1: IPL */}
          <div className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="IPL Treatment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/images/treatments/ipl.png"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Anti-Aging &amp; Haarentfernung
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              Intense Pulsed Light (IPL)
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Präzise Lichttechnologie zur dauerhaften Haarentfernung und Hautverjüngung. Wirkt effektiv gegen Pigmentflecken und vaskuläre Veränderungen.
            </p>
            <Link
              to="/leistungen/ipl"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          {/* Service 2: Visia 3D */}
          <div className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="Visia 3D"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/images/treatments/visia.png"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Hautanalyse
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              Visia 3D Hautanalyse
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Blicken Sie unter die Oberfläche. Unsere computergestützte Analyse macht Poren, Falten und Sonnenschäden sichtbar, um Ihre Behandlung exakt zu planen.
            </p>
            <Link
              to="/leistungen/visia"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          {/* Service 3: JetPeel */}
          <div className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="JetPeel Treatment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/images/treatments/jetpeel.png"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Tiefenreinigung
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              JetPeel Treatment
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Nadelfreie Einschleusung von Wirkstoffen mittels Hochgeschwindigkeit. Reinigt porentief und hydratisiert die Haut in tiefsten Schichten.
            </p>
            <Link
              to="/leistungen/jetpeel"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          {/* Service 4: Microneedling */}
          <div className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="MRF Microneedling"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/images/treatments/microneedling.png"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Straffung
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              MRF Microneedling
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Die ultimative Anti-Aging Waffe. Kombiniert Microneedling mit Radiofrequenz-Energie für maximale Kollagenstimulation und Hautstraffung.
            </p>
            <Link
              to="/leistungen/microneedling"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* Grid of auxiliary treatments */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="medical-glow bg-pure-white p-8 border border-slate-muted/10 rounded-lg">
            <Heart className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-display text-lg font-bold text-primary mb-2">Brow Lift</h3>
            <p className="font-sans text-sm text-tertiary">
              Perfekt geformte Brauen für einen wachen, frischen Blick – langanhaltend und natürlich.
            </p>
            <Link to="/leistungen/brow-lift" className="mt-4 text-xs font-display font-bold uppercase text-primary inline-block tracking-wider">
              Details →
            </Link>
          </div>
          
          <div className="medical-glow bg-pure-white p-8 border border-slate-muted/10 rounded-lg">
            <Star className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-display text-lg font-bold text-primary mb-2">Wimpernlifting</h3>
            <p className="font-sans text-sm text-tertiary">
              Professional Eyelash Extension und Lifting für atemberaubende Augenblicke jeden Tag.
            </p>
            <Link to="/leistungen/wimpernlifting" className="mt-4 text-xs font-display font-bold uppercase text-primary inline-block tracking-wider">
              Details →
            </Link>
          </div>

          <div className="medical-glow bg-pure-white p-8 border border-slate-muted/10 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-display text-lg font-bold text-primary mb-2">Meso BB Glow</h3>
            <p className="font-sans text-sm text-tertiary">
              Seidiges Hautbild und ein ebenmäßiger Teint ganz ohne tägliches Make-up.
            </p>
            <Link to="/leistungen/meso-bb-glow" className="mt-4 text-xs font-display font-bold uppercase text-primary inline-block tracking-wider">
              Details →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-pure-white py-section-padding-sm text-center">
        <div className="max-w-2xl mx-auto space-y-6 px-margin-mobile">
          <h2 className="font-display text-3xl font-bold">Bereit für Ihr Strahlen?</h2>
          <p className="font-sans text-base opacity-90 leading-relaxed">
            Buchen Sie Ihr unverbindliches Beratungsgespräch inklusive Visia 3D Hautanalyse.
          </p>
          <div className="pt-4">
            <Link
              to="/terminbuchung"
              className="bg-pure-white text-primary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-opacity-95 transition-all inline-block medical-glow"
            >
              Termin online anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
