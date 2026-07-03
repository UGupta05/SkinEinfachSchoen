import React from 'react';
import Link from 'next/link';
import { Sparkles, Star, ShieldCheck, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="SKIN Clinic Background"
            className="w-full h-full object-cover opacity-80"
            src="/images/home/home_hero.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pure-white via-pure-white/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full">
          <div className="max-w-2xl">
            <ScrollReveal variant="fade-in-up" delay={100}>
              <div className="mb-8">
                <img
                  alt="SKIN einfach schön Logo"
                  className="h-28 md:h-36 object-contain"
                  src="/images/home/logo.png"
                />
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-in-up" delay={250}>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                Wissenschaftliche Präzision für Ihre natürliche Schönheit.
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-in-up" delay={400}>
              <p className="font-sans text-lg text-tertiary mb-10 leading-relaxed">
                Wir kombinieren modernste medizinische Kosmetik mit einem ganzheitlichen Wohlfühlkonzept. Erleben Sie Hautpflege auf einem neuen Level an Exzellenz.
              </p>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-in-up" delay={550}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/leistungen"
                  className="bg-primary text-pure-white px-10 py-4 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:scale-[1.02] active:scale-95 transition-all text-center duration-300"
                >
                  Behandlung finden
                </Link>
                <Link
                  href="/terminbuchung"
                  className="border border-primary text-primary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-primary/5 hover:scale-[1.02] active:scale-95 transition-all text-center duration-300"
                >
                  Beratungstermin
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Video-Einblicke & Routinen */}
      <section className="py-section-padding-lg bg-soft-shell border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="blur-in" className="text-center mb-16">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Erfahrungen &amp; Einblicke
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Lernen Sie uns und unsere Behandlungen kennen
            </h2>
          </ScrollReveal>

          <div className="space-y-20">
            {/* Video 1: Wir sind Skineinfachschoen! Lerne uns kennen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal variant="fade-in-left" className="lg:col-span-6">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10 transition-transform duration-500 hover:scale-[1.01]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/W5CCNDCyFuw"
                    title="Wir sind SKIN einfach schön! Lerne uns kennen"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-in-right" className="lg:col-span-6 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Über Uns
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Wir sind SKIN einfach schön! Lerne uns kennen
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Willkommen in unserem Kosmetikinstitut in Osnabrück. Lernen Sie unser Team und unsere Philosophie für wissenschaftlich fundierte Hautpflege kennen. Wir begleiten Sie auf Ihrem Weg zu einer gesunden, strahlenden Haut – mit modernsten Technologien und individueller Betreuung in Wohlfühlatmosphäre.
                </p>
                <Link
                  href="/team"
                  className="inline-block bg-primary text-pure-white px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                >
                  Unser Team treffen
                </Link>
              </ScrollReveal>
            </div>

            {/* Video 2: Wie sich die Haut positiv verändert */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal variant="fade-in-right" className="lg:col-span-6 lg:order-2">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10 transition-transform duration-500 hover:scale-[1.01]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/OLpqOJyt7I8"
                    title="Wie sich die Haut positiv verändert"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-in-left" className="lg:col-span-6 lg:order-1 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Hautgesundheit
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Wie sich die Haut positiv verändert
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Hautgesundheit ist eine langfristige Reise. In diesem Video erklären wir, wie sich Ihre Haut durch gezielte, kontinuierliche Behandlungen (von sanftem Microneedling bis hin zur regenerativen Wirkstoffkosmetik) über die Jahre hinweg positiv verändert. Kontinuität und eine fundierte Hautanalyse sind der Schlüssel zur dauerhaften Schönheit.
                </p>
                <Link
                  href="/terminbuchung"
                  className="inline-block border border-primary text-primary px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest hover:bg-primary/5 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                >
                  Beratungstermin buchen
                </Link>
              </ScrollReveal>
            </div>

            {/* Video 3: So läuft die dauerhafte Haarentfernung bei uns ab SKIN einfachschoen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal variant="fade-in-left" className="lg:col-span-6">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10 transition-transform duration-500 hover:scale-[1.01]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/Qc7Ay8-dTiY"
                    title="Ablauf der dauerhaften Haarentfernung"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-in-right" className="lg:col-span-6 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Behandlung im Fokus
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Ablauf der dauerhaften Haarentfernung
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Störende Haare dauerhaft und schonend entfernen. Wir zeigen Ihnen Schritt für Schritt, wie eine professionelle Behandlung zur dauerhaften Haarentfernung mit modernster IPL-Technologie in unserem Studio abläuft – von der Beratung über den Schutz der Haut bis hin zum glatten Ergebnis. Schmerzfrei, sicher und effektiv.
                </p>
                <Link
                  href="/leistungen/ipl"
                  className="inline-block bg-primary text-pure-white px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                >
                  Haarentfernung entdecken
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-section-padding-lg bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <ScrollReveal variant="fade-in-left" className="md:col-span-5 space-y-6">
              <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                Expertise
              </span>
              <h2 className="font-display text-3xl font-bold text-primary leading-tight">
                Beratungskompetenz &amp; Ästhetische Exzellenz
              </h2>
              <p className="font-sans text-base text-tertiary leading-relaxed">
                Jede Haut ist einzigartig. Deshalb beginnt Ihre Reise bei uns mit einer fundierten computergestützten Hautanalyse. Basierend auf medizinischen Fakten entwickeln wir Ihren individuellen Pflegeplan.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-sans text-base text-primary">
                  <ShieldCheck className="w-5 h-5 text-sky-accent shrink-0" />
                  <span>Staatlich geprüfte Fachkosmetikerinnen</span>
                </li>
                <li className="flex items-center gap-3 font-sans text-base text-primary">
                  <Sparkles className="w-5 h-5 text-sky-accent shrink-0" />
                  <span>High-End Medical Beauty Equipment</span>
                </li>
                <li className="flex items-center gap-3 font-sans text-base text-primary">
                  <CheckCircle2 className="w-5 h-5 text-sky-accent shrink-0" />
                  <span>Nachhaltige &amp; wirksame Wirkstoffkosmetik</span>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal variant="fade-in-right" className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    alt="Facial treatment close-up"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    src="/images/home/treatment_closeup.png"
                  />
                </div>
                <div className="bg-soft-shell p-8 medical-glow transition-transform duration-500 hover:scale-[1.02]">
                  <h3 className="font-display text-3xl font-bold text-primary mb-2">98%</h3>
                  <p className="font-display text-2xs font-bold text-tertiary uppercase tracking-wider">
                    Zufriedene Kunden
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-primary text-pure-white p-8 medical-glow transition-transform duration-500 hover:scale-[1.02]">
                  <h3 className="font-display text-3xl font-bold mb-2">15+</h3>
                  <p className="font-display text-2xs font-bold uppercase tracking-wider">
                    Jahre Erfahrung
                  </p>
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    alt="Modern medical clinic lobby"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    src="/images/home/clinic_lobby.png"
                  />
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-section-padding-lg bg-soft-shell">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <ScrollReveal variant="blur-in" className="text-center mb-16">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Unsere Leistungen
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Präzision für Ihre Haut
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter">
            {/* Bento Card 1: Anti Aging */}
            <ScrollReveal variant="fade-in-up" delay={0} className="md:col-span-2 md:row-span-2 relative group overflow-hidden medical-glow rounded-lg min-h-[400px]">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Anti-Aging equipment"
                src="/images/home/anti_aging.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-text/80 via-onyx-text/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block px-3 py-1 bg-sky-accent/20 text-pure-white font-display text-[10px] font-bold mb-4 backdrop-blur-sm rounded-full tracking-wider uppercase">
                  Core Treatment
                </span>
                <h3 className="font-display text-2xl font-bold text-pure-white mb-4">
                  Anti-Aging &amp; Rejuvenation
                </h3>
                <p className="font-sans text-sm text-pure-white/80 mb-6">
                  Revolutionäre Methoden zur Zellaktivierung und Hautstraffung ohne operative Eingriffe.
                </p>
                <Link
                  href="/leistungen"
                  className="text-pure-white font-display text-xs font-bold flex items-center gap-2 group/link uppercase tracking-wider"
                >
                  Details entdecken <span className="transition-transform group-hover/link:translate-x-2">→</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Bento Card 2: Problemhaut */}
            <ScrollReveal variant="fade-in-up" delay={150} className="md:col-span-2 bg-pure-white p-8 flex flex-col justify-between border border-outline-variant/10 medical-glow rounded-lg transition-transform duration-500 hover:scale-[1.02]">
              <div>
                <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">
                  Problemhaut-Therapie
                </h3>
                <p className="font-sans text-sm text-tertiary">
                  Spezialbehandlungen für Akne, Rosacea und Couperose mit medizinisch fundierten Wirkstoffen.
                </p>
              </div>
              <Link
                href="/medical-kosmetik-zo"
                className="text-primary font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-70 mt-6"
              >
                Mehr erfahren <span>+</span>
              </Link>
            </ScrollReveal>

            {/* Bento Card 3: Manuelle Kosmetik */}
            <ScrollReveal variant="fade-in-up" delay={300} className="bg-primary text-pure-white p-8 flex flex-col justify-between medical-glow rounded-lg transition-transform duration-500 hover:scale-[1.02]">
              <div>
                <Sparkles className="text-sky-accent w-8 h-8 mb-6" />
                <h3 className="font-display text-lg font-bold mb-3">
                  Manuelle Kosmetik
                </h3>
                <p className="font-sans text-xs opacity-85">
                  Klassische Wellness-Behandlungen für Ihre Auszeit.
                </p>
              </div>
              <Link
                href="/leistungen/klassische-kosmetik"
                className="font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-80 mt-4 text-sky-accent"
              >
                Explore <span>↗</span>
              </Link>
            </ScrollReveal>

            {/* Bento Card 4: Home Care */}
            <ScrollReveal variant="fade-in-up" delay={450} className="bg-pure-white p-8 flex flex-col justify-between border border-outline-variant/10 medical-glow rounded-lg transition-transform duration-500 hover:scale-[1.02]">
              <div>
                <Trophy className="text-primary w-8 h-8 mb-6" />
                <h3 className="font-display text-lg font-bold text-primary mb-3">
                  Home Care
                </h3>
                <p className="font-sans text-xs text-tertiary">
                  Individuelle Produktberatung und High-End Heimpflege.
                </p>
              </div>
              <Link
                href="/shop"
                className="text-primary font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-75 mt-4"
              >
                Zum Shop <span>→</span>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section-padding-lg bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <ScrollReveal variant="blur-in" className="max-w-xl">
              <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
                Stimmen
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                Was unsere Kunden sagen
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {TESTIMONIALS.map((t, idx) => (
              <ScrollReveal
                key={t.name}
                variant="fade-in-up"
                delay={idx * 150}
                className={`p-10 medical-glow rounded-lg flex flex-col justify-between transition-transform duration-500 hover:scale-[1.02] ${
                  idx === 1 ? 'bg-primary text-pure-white' : 'bg-soft-shell text-primary'
                }`}
              >
                <div>
                  <div className="flex gap-1 mb-6 text-sky-accent">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  
                  <p className={`font-sans text-base italic mb-8 leading-relaxed ${idx === 1 ? 'text-pure-white' : 'text-primary'}`}>
                    "{t.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-4 border-t border-outline-variant/10 pt-4">
                  <div>
                    <h4 className={`font-display text-xs font-bold uppercase tracking-wider ${idx === 1 ? 'text-pure-white' : 'text-primary'}`}>
                      {t.name}
                    </h4>
                    <p className={`text-[10px] font-display font-bold uppercase tracking-widest mt-1 ${idx === 1 ? 'text-primary-fixed-dim' : 'text-tertiary'}`}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps/place/SKIN+einfach+sch%C3%B6n/@52.2743486,8.0410559,17z/data=!4m8!3m7!1s0x47ba966380c5d64d:0x2280d52723c3b036!8m2!3d52.2743486!4d8.0410559!9m1!1b1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-primary hover:text-sky-accent transition-colors"
            >
              Alle Rezensionen auf Google ansehen
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-padding-lg relative overflow-hidden bg-slate-muted">
        <ScrollReveal variant="blur-in" className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-pure-white mb-8">
            Bereit für Ihre Hautveränderung?
          </h2>
          <p className="font-sans text-lg text-pure-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Buchen Sie jetzt Ihr Erstgespräch inklusive professioneller Hautanalyse und starten Sie Ihre individuelle Reise zu einer gesünderen Ausstrahlung.
          </p>
          <div className="flex justify-center">
            <Link
              href="/terminbuchung"
              className="bg-pure-white text-primary px-12 py-5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:scale-105 active:scale-95 transition-all duration-300 text-center"
            >
              Online Termin wählen
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
