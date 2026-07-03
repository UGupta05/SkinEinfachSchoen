import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Star, Sparkles } from 'lucide-react';
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
              src="/images/team/praxis.png"
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
              href="/leistungen/microneedling"
              className="mt-6 font-display text-xs font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider"
            >
              Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </ScrollReveal>

        </div>

        {/* Grid of auxiliary treatments */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal variant="fade-in-up" delay={0} className="medical-glow bg-pure-white p-8 border border-slate-muted/10 rounded-lg transition-transform duration-500 hover:scale-[1.02]">
            <Heart className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-display text-lg font-bold text-primary mb-2">Brow Lift</h3>
            <p className="font-sans text-sm text-tertiary">
              Perfekt geformte Brauen für einen wachen, frischen Blick – langanhaltend und natürlich.
            </p>
            <Link href="/leistungen/brow-lift" className="mt-4 text-xs font-display font-bold uppercase text-primary inline-block tracking-wider">
              Details →
            </Link>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-in-up" delay={150} className="medical-glow bg-pure-white p-8 border border-slate-muted/10 rounded-lg transition-transform duration-500 hover:scale-[1.02]">
            <Star className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-display text-lg font-bold text-primary mb-2">Wimpernlifting</h3>
            <p className="font-sans text-sm text-tertiary">
              Professional Eyelash Extension und Lifting für atemberaubende Augenblicke jeden Tag.
            </p>
            <Link href="/leistungen/wimpernlifting" className="mt-4 text-xs font-display font-bold uppercase text-primary inline-block tracking-wider">
              Details →
            </Link>
          </ScrollReveal>

          <ScrollReveal variant="fade-in-up" delay={300} className="medical-glow bg-pure-white p-8 border border-slate-muted/10 rounded-lg transition-transform duration-500 hover:scale-[1.02]">
            <Sparkles className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-display text-lg font-bold text-primary mb-2">Meso BB Glow</h3>
            <p className="font-sans text-sm text-tertiary">
              Seidiges Hautbild und ein ebenmäßiger Teint ganz ohne tägliches Make-up.
            </p>
            <Link href="/leistungen/meso-bb-glow" className="mt-4 text-xs font-display font-bold uppercase text-primary inline-block tracking-wider">
              Details →
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
