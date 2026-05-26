import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ShieldCheck, CheckCircle2, Trophy } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Home: React.FC = () => {
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
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <img
                alt="SKIN einfach schön Logo"
                className="h-28 md:h-36 object-contain"
                src="/images/home/logo.png"
              />
            </div>
            
            <h1 
              className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Wissenschaftliche Präzision für Ihre natürliche Schönheit.
            </h1>
            
            <p 
              className="font-sans text-lg text-tertiary mb-10 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              Wir kombinieren modernste medizinische Kosmetik mit einem ganzheitlichen Wohlfühlkonzept. Erleben Sie Hautpflege auf einem neuen Level an Exzellenz.
            </p>
            
            <div 
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                to="/leistungen"
                className="bg-primary text-pure-white px-10 py-4 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:opacity-95 transition-all text-center"
              >
                Behandlung finden
              </Link>
              <Link
                to="/terminbuchung"
                className="border border-primary text-primary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-all text-center"
              >
                Beratungstermin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-section-padding-lg bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-5 space-y-6">
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
            </div>

            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    alt="Facial treatment close-up"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src="/images/home/treatment_closeup.png"
                  />
                </div>
                <div className="bg-soft-shell p-8 medical-glow">
                  <h3 className="font-display text-3xl font-bold text-primary mb-2">98%</h3>
                  <p className="font-display text-2xs font-bold text-tertiary uppercase tracking-wider">
                    Zufriedene Kunden
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-primary text-pure-white p-8 medical-glow">
                  <h3 className="font-display text-3xl font-bold mb-2">15+</h3>
                  <p className="font-display text-2xs font-bold uppercase tracking-wider">
                    Jahre Erfahrung
                  </p>
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    alt="Modern medical clinic lobby"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src="/images/home/clinic_lobby.png"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-section-padding-lg bg-soft-shell">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Unsere Leistungen
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Präzision für Ihre Haut
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter">
            {/* Bento Card 1: Anti Aging */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden medical-glow rounded-lg min-h-[400px]">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
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
                  to="/leistungen"
                  className="text-pure-white font-display text-xs font-bold flex items-center gap-2 group/link uppercase tracking-wider"
                >
                  Details entdecken <span className="transition-transform group-hover/link:translate-x-2">→</span>
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Problemhaut */}
            <div className="md:col-span-2 bg-pure-white p-8 flex flex-col justify-between border border-outline-variant/10 medical-glow rounded-lg">
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
                to="/medical-kosmetik-zo"
                className="text-primary font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-70 mt-6"
              >
                Mehr erfahren <span>+</span>
              </Link>
            </div>

            {/* Bento Card 3: Manuelle Kosmetik */}
            <div className="bg-primary text-pure-white p-8 flex flex-col justify-between medical-glow rounded-lg">
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
                to="/leistungen/klassische-kosmetik"
                className="font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-80 mt-4 text-sky-accent"
              >
                Explore <span>↗</span>
              </Link>
            </div>

            {/* Bento Card 4: Home Care */}
            <div className="bg-pure-white p-8 flex flex-col justify-between border border-outline-variant/10 medical-glow rounded-lg">
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
                to="/shop"
                className="text-primary font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-75 mt-4"
              >
                Zum Shop <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Video-Einblicke & Routinen */}
      <section className="py-section-padding-lg bg-pure-white border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Erfahrungen &amp; Routinen
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Unsere Behandlungen im Video
            </h2>
          </div>

          <div className="space-y-20">
            {/* Video 1: JetPeel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/W5CCNDCyFuw"
                    title="Exklusive JetPeel Behandlungserfahrung"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="lg:col-span-6 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Erfahrungsbericht
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Exklusive JetPeel Behandlungserfahrung
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Erleben Sie die revolutionäre berührungslose JetPeel-Technologie. Unsere Kundin teilt ihre persönlichen Eindrücke während der Behandlung – von der tiefenwirksamen Porenreinigung bis zum sofort sichtbaren Glow-Effekt. Wissenschaftlich fundierte Kosmetik, die man fühlen und sehen kann.
                </p>
                <Link
                  to="/leistungen/jetpeel"
                  className="inline-block bg-primary text-pure-white px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:opacity-95 transition-all text-center"
                >
                  JetPeel entdecken
                </Link>
              </div>
            </div>

            {/* Video 2: Skin Change */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/OLpqOJyt7I8"
                    title="Wie sich die Haut positiv verändert"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="lg:col-span-6 lg:order-1 space-y-6">
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
                  to="/terminbuchung"
                  className="inline-block border border-primary text-primary px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-all text-center"
                >
                  Hautanalyse buchen
                </Link>
              </div>
            </div>

            {/* Video 3: Hand Care */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="relative aspect-video rounded-xl overflow-hidden medical-glow border border-outline-variant/10">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/Qc7Ay8-dTiY"
                    title="Elegante Handpflege &amp; Self-Care Rituale"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="lg:col-span-6 space-y-6">
                <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase block">
                  Pflegeroutinen
                </span>
                <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                  Elegante Handpflege &amp; Self-Care Rituale
                </h3>
                <p className="font-sans text-base text-tertiary leading-relaxed">
                  Verwöhnung bis in die Fingerspitzen. Entdecken Sie wertvolle Tipps für eine reichhaltige Handpflege-Routine, den Schutz vor UV-bedingter Hautalterung durch gezielten Sonnenschutz und die beruhigende Wirkung bewusster Self-Care. Denn elegante Hände spiegeln Ihre innere Ausstrahlung wider.
                </p>
                <Link
                  to="/shop"
                  className="inline-block bg-primary text-pure-white px-8 py-3.5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:opacity-95 transition-all text-center"
                >
                  Pflegeprodukte entdecken
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section-padding-lg bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
                Stimmen
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                Was unsere Kunden sagen
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name}
                className={`p-10 medical-glow rounded-lg ${
                  idx === 1 ? 'bg-primary text-pure-white' : 'bg-soft-shell text-primary'
                }`}
              >
                <div className="flex gap-1 mb-6 text-sky-accent">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <p className={`font-sans text-base italic mb-8 leading-relaxed ${idx === 1 ? 'text-pure-white' : 'text-primary'}`}>
                  "{t.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img alt={t.name} className="w-full h-full object-cover" src={t.avatar} />
                  </div>
                  <div>
                    <h4 className={`font-display text-xs font-bold uppercase tracking-wider ${idx === 1 ? 'text-pure-white' : 'text-primary'}`}>
                      {t.name}
                    </h4>
                    <p className={`text-[10px] font-display font-bold uppercase tracking-widest ${idx === 1 ? 'text-primary-fixed-dim' : 'text-tertiary'}`}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-padding-lg relative overflow-hidden bg-slate-muted">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-pure-white mb-8">
            Bereit für Ihre Hautveränderung?
          </h2>
          <p className="font-sans text-lg text-pure-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Buchen Sie jetzt Ihr Erstgespräch inklusive professioneller Hautanalyse und starten Sie Ihre individuelle Reise zu einer gesünderen Ausstrahlung.
          </p>
          <div className="flex justify-center">
            <Link
              to="/terminbuchung"
              className="bg-pure-white text-primary px-12 py-5 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:bg-opacity-90 transition-all text-center"
            >
              Online Termin wählen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
