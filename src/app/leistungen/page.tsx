import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';

export default function LeistungenOverviewPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-margin-mobile md:px-gutter py-12 lg:py-16 bg-soft-shell overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <ScrollReveal variant="fade-in-left" className="flex-1 space-y-6">
            <span className="font-display text-xs font-bold text-primary uppercase tracking-widest block">
              Wissenschaft trifft Ästhetik
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">
              Leistungsportfolio
            </h1>
            <p className="font-sans text-base text-tertiary leading-relaxed">
              Entdecken Sie unsere hochspezialisierten Behandlungen, die modernste medizinische Technik mit exklusiver Pflege vereinen. Für eine Haut, die nicht nur schön aussieht, sondern gesund strahlt.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-in-right" className="flex-1 w-full h-[250px] md:h-[350px] relative">
            <img
              alt="Klinik Interieur"
              className="w-full h-full object-cover shadow-lg rounded-sm"
              src="/images/team/praxis_new.jpg"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-margin-mobile md:px-gutter py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          
          {/* Service 1: IPL */}
          <ScrollReveal variant="fade-in-up" delay={0} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="IPL Treatment"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/ipl_new.jpg"
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
              href="/leistungen/ipl"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Service 2: Visia 3D */}
          <ScrollReveal variant="fade-in-up" delay={150} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="Visia 3D"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/visia_new.jpg"
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
              href="/leistungen/visia"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Service 3: JetPeel */}
          <ScrollReveal variant="fade-in-up" delay={0} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="JetPeel Treatment"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/jetpeel_new.jpg"
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
              href="/leistungen/jetpeel"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Service 4: Microneedling */}
          <ScrollReveal variant="fade-in-up" delay={150} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="MRF Microneedling"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/microneedling_new.jpg"
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
              href="/leistungen/microneedling"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Service 5: Microneedling / Dermaneedling */}
          <ScrollReveal variant="fade-in-up" delay={0} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="Microneedling / Dermaneedling"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/dermaneedling_new.jpg"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Hauterneuerung
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              Microneedling / Dermaneedling
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Klassisches Microneedling (Dermaneedling) zur gezielten Behandlung von Fältchen, Narben, Pigmentflecken und Porenverfeinerung.
            </p>
            <Link
              href="/leistungen/dermaneedling"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Service 6: Meso BB Glow */}
          <ScrollReveal variant="fade-in-up" delay={150} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="Meso BB Glow"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/meso_bb_glow_new.jpg"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Teint &amp; Glow
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              Meso BB Glow
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Seidiges Hautbild und ein ebenmäßiger Teint ganz ohne tägliches Make-up. Kaschiert Augenringe und Rötungen.
            </p>
            <Link
              href="/leistungen/meso-bb-glow"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Service 7: Klassische Kosmetik */}
          <ScrollReveal variant="fade-in-up" delay={0} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="Klassische Kosmetik"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/klassische_kosmetik_new.jpg"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Gesichtspflege
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              Klassische Kosmetik
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Individuelle Gesichtsbehandlungen für Reinigung, Entspannung und langanhaltende Pflege.
            </p>
            <Link
              href="/leistungen/klassische-kosmetik"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

          {/* Service 8: Fruchtsäure & TCA Peeling */}
          <ScrollReveal variant="fade-in-up" delay={150} className="group">
            <div className="overflow-hidden mb-6 aspect-[3/2] rounded-lg">
              <img
                alt="Fruchtsäure Peeling"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="/images/treatments/peeling_new.jpg"
              />
            </div>
            <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-wider">
              Hauterneuerung
            </span>
            <h2 className="font-display text-xl font-bold text-primary mt-2">
              Fruchtsäure &amp; TCA Peeling
            </h2>
            <p className="font-sans text-sm text-tertiary mt-4 leading-relaxed">
              Medizinisch kontrollierte AHA, BHA &amp; TCA Peelings für ein verfeinertes Hautbild, gemilderte Fältchen und reinere Poren.
            </p>
            <Link
              href="/leistungen/fruchtsaeure-peeling"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-pure-white py-section-padding-sm text-center">
        <ScrollReveal variant="blur-in" className="max-w-2xl mx-auto space-y-6 px-margin-mobile">
          <h2 className="font-display text-3xl font-bold">Bereit für Ihr Strahlen?</h2>
          <p className="font-sans text-base opacity-90 leading-relaxed">
            Buchen Sie Ihr unverbindliches Beratungsgespräch inklusive Visia 3D Hautanalyse.
          </p>
          <div className="pt-4">
            <Link
              href="/terminbuchung"
              className="bg-pure-white text-primary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all inline-block medical-glow duration-300"
            >
              Termin online anfragen
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
