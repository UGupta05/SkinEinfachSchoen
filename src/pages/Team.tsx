import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.medical-glow');
    animatedElements.forEach((el) => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Hero Section */}
      <section className="relative py-section-padding-lg overflow-hidden bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="font-label-caps text-label-caps text-slate-muted">UNSER TEAM</span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              Das Herz von SKIN einfach schön
            </h1>
            <p className="font-body-lg text-body-lg text-tertiary max-w-lg">
              Lernen Sie die Menschen kennen, die Ihre Haut verstehen. Sofia und Isabel vereinen medizinisches Fachwissen mit einer Leidenschaft für natürliche Ästhetik.
            </p>
            <div className="pt-4">
              <a
                className="inline-flex items-center gap-2 font-button-text text-button-text border border-slate-muted text-slate-muted px-8 py-4 uppercase hover:bg-soft-shell transition-colors"
                href="#experten"
              >
                Unsere Experten entdecken{' '}
                <span className="material-symbols-outlined">arrow_downward</span>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-soft-shell overflow-hidden">
              <img
                alt="Sofia Khaliq-Natawan und Isabel Duwendag in der Praxis"
                className="w-full h-full object-cover"
                src="/images/team/team_hero.png"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-pure-white p-8 medical-glow hidden md:block max-w-xs">
              <p className="font-body-md text-body-md text-primary italic">
                "Schönheit ist das Strahlen, das von innen kommt, wenn man sich in seiner Haut wohlfühlt."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-section-padding-lg bg-soft-shell" id="experten">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Ihre Experten für Hautgesundheit
            </h2>
            <div className="w-20 h-1 bg-sky-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Sofia Khaliq-Natawan */}
            <div className="group">
              <div className="bg-pure-white medical-glow overflow-hidden transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    alt="Sofia Khaliq-Natawan"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="/images/team/sofia.jpg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-sky-accent/10 text-slate-muted px-4 py-1 rounded-full font-label-caps text-[10px] tracking-widest">
                      INHABERIN &amp; EXPERTIN
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary">
                      Sofia Khaliq-Natawan
                    </h3>
                    <p className="text-slate-muted font-label-caps text-xs mt-1">
                      PTA | Pharmazieökonomin | Dermo-Fach-PTA
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-label-caps text-primary border-b border-outline-variant/30 pb-1">
                      Über mich
                    </h4>
                    <p className="font-body-md text-body-md text-tertiary">
                      Perfektion liegt mir im Blut! Ich lege großen Wert auf Qualität, Wissen und Vertrauen. Mit meiner langjährigen Erfahrung in dermatologischen Praxen und Apotheken habe ich SKiN einfach schön gegründet, um medizinisches Fachwissen mit Ästhetik zu vereinen.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-label-caps text-primary border-b border-outline-variant/30 pb-1">
                      Vita Highlights
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Studium zur Pharmazieökonomin in Schmalkalden (2013-2014)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Betriebsleitung Skinsurfer (2013-2015)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Weiterbildung IPL &amp; Dermo-Fach-PTA (Düsseldorf)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Expertenwissen in Lasertherapie &amp; optischer Strahlung</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Isabel Duwendag */}
            <div className="group">
              <div className="bg-pure-white medical-glow overflow-hidden transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    alt="Isabel Duwendag"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="/images/team/isabel.jpg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-sky-accent/10 text-slate-muted px-4 py-1 rounded-full font-label-caps text-[10px] tracking-widest">
                      MEDICAL COSMETICIAN
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary">
                      Isabel Duwendag
                    </h3>
                    <p className="text-slate-muted font-label-caps text-xs mt-1">
                      Medizinische Kosmetikerin
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-label-caps text-primary border-b border-outline-variant/30 pb-1">
                      Über mich
                    </h4>
                    <p className="font-body-md text-body-md text-tertiary">
                      Isabel bringt eine beeindruckende internationale Expertise in unser Team ein. Mit Stationen in London und Hamburg sowie langjähriger Erfahrung in dermatologischen Praxen ist sie unsere Spezialistin für anspruchsvolle medizinische Behandlungen.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-label-caps text-primary border-b border-outline-variant/30 pb-1">
                      Vita Highlights
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Medizinische Kosmetikerin bei SKIN einfach schön (seit 2023)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Derma-Kosmetikerin in Dermatologischen Praxen, Münster (2015-2023)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Leitung Kosmetikabteilung bei Marlies Möller, Hamburg (2009-2014)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-tertiary">
                        <span className="material-symbols-outlined text-sky-accent text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Beauty Therapist im Athenaeum Hotel Spa, London</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Bento Grid */}
      <section className="py-section-padding-lg bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-primary p-12 text-pure-white flex flex-col justify-center">
              <span className="font-label-caps text-label-caps text-primary-fixed mb-4">
                UNSERE PHILOSOPHIE
              </span>
              <h2 className="font-headline-md text-headline-md mb-6">
                Wissenschaft trifft auf Wohlbefinden
              </h2>
              <p className="font-body-lg text-body-lg opacity-90 max-w-xl">
                Wir glauben nicht an Standardlösungen. Jede Haut erzählt eine eigene Geschichte. Deshalb nehmen wir uns Zeit für eine ausführliche Anamnese, bevor wir Ihren individuellen Behandlungsplan erstellen.
              </p>
            </div>
            <div className="bg-soft-shell p-12 flex flex-col items-center text-center justify-center medical-glow">
              <span className="material-symbols-outlined text-5xl text-sky-accent mb-4">
                biotech
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                Modernste Technik
              </h3>
              <p className="font-body-md text-body-md text-tertiary">
                Effektive Ergebnisse durch innovative Verfahren.
              </p>
            </div>
            <div className="bg-soft-shell p-12 flex flex-col items-center text-center justify-center medical-glow">
              <span className="material-symbols-outlined text-5xl text-sky-accent mb-4">
                favorite
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                Herzlichkeit
              </h3>
              <p className="font-body-md text-body-md text-tertiary">
                Empathische Beratung in entspannter Atmosphäre.
              </p>
            </div>
            <div className="md:col-span-2 relative min-h-[300px] overflow-hidden">
              <img
                alt="Detail einer modernen Praxis"
                className="absolute inset-0 w-full h-full object-cover"
                src="/images/team/praxis.png"
              />
              <div className="absolute inset-0 bg-primary/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section-padding-lg bg-soft-shell">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-slate-muted block mb-2">
              ERFAHRUNGEN
            </span>
            <h2 className="font-headline-md text-headline-md text-primary">
              Was unsere Kunden sagen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-pure-white p-8 medical-glow relative">
              <span className="material-symbols-outlined text-sky-accent/20 text-6xl absolute top-4 right-4">
                format_quote
              </span>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-muted/10">
                  <img
                    alt="Elena S."
                    className="w-full h-full object-cover"
                    src="/images/team/avatar_elena.png"
                  />
                </div>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary">Elena S.</h4>
                  <div className="flex text-sky-accent text-[12px]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-body-md text-body-md text-tertiary">
                "Sofia hat meine Haut komplett verändert. Die Beratung war so ehrlich und kompetent, wie ich es noch nie erlebt habe. Ich fühle mich hier bestens aufgehoben."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-pure-white p-8 medical-glow relative">
              <span className="material-symbols-outlined text-sky-accent/20 text-6xl absolute top-4 right-4">
                format_quote
              </span>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-muted/10">
                  <img
                    alt="Martina R."
                    className="w-full h-full object-cover"
                    src="/images/team/avatar_martina.png"
                  />
                </div>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary">Martina R.</h4>
                  <div className="flex text-sky-accent text-[12px]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-body-md text-body-md text-tertiary">
                "Die Atmosphäre im Studio ist pure Entspannung. Isabel ist ein absoluter Profi und hat ein unglaubliches Gespür für die Bedürfnisse meiner Haut."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-pure-white p-8 medical-glow relative">
              <span className="material-symbols-outlined text-sky-accent/20 text-6xl absolute top-4 right-4">
                format_quote
              </span>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-muted/10">
                  <img
                    alt="Julian M."
                    className="w-full h-full object-cover"
                    src="/images/team/avatar_julian.png"
                  />
                </div>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary">Julian M.</h4>
                  <div className="flex text-sky-accent text-[12px]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-body-md text-body-md text-tertiary">
                "Auch als Mann fühlt man sich hier sehr gut beraten. Kein unnötiger Schnickschnack, sondern klare Analysen und Behandlungen, die wirklich funktionieren."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-padding-lg bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center border-y border-outline-variant/10 py-20">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
            Bereit für Ihre Haut-Reise?
          </h2>
          <p className="font-body-lg text-body-lg text-tertiary max-w-2xl mx-auto mb-10">
            Buchen Sie jetzt Ihr Beratungsgespräch bei Sofia oder Isabel und lassen Sie uns gemeinsam das Beste aus Ihrer Haut herausholen.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/terminbuchung"
              className="bg-slate-muted text-pure-white px-10 py-4 font-button-text text-button-text uppercase hover:opacity-90 transition-opacity text-center animate-duration-150 active:scale-95 transition-transform"
            >
              Termin online buchen
            </Link>
            <Link
              to="/kontakt"
              className="border border-slate-muted text-slate-muted px-10 py-4 font-button-text text-button-text uppercase hover:bg-soft-shell transition-colors text-center active:scale-95 transition-transform"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
