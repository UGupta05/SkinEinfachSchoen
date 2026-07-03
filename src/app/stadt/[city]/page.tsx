import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, ArrowRight, ShieldCheck, Star, Sparkles, Navigation } from 'lucide-react';
import { GEO_CITIES } from '../../../data/geoCities';
import { TREATMENT_DETAILS } from '../../../data/treatmentDetails';
import { ScrollReveal } from '../../../components/ScrollReveal';

interface Props {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(GEO_CITIES).map((key) => ({
    city: key,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = GEO_CITIES[city];
  if (!cityData) return {};

  return {
    title: `Kosmetikstudio ${cityData.name} | SKIN einfach schön Kosmetik Osnabrück`,
    description: `Suchen Sie ein Kosmetikstudio nahe ${cityData.name}? SKIN einfach schön ist nur ${cityData.durationMin} Min. entfernt (Lotter Str. 33). JetPeel™, Microneedling, IPL & ZO Skin Health.`,
    alternates: {
      canonical: `https://skineinfachschoen.de/stadt/${city}`,
    }
  };
}

export default async function CityLandingPage({ params }: Props) {
  const { city } = await params;
  const cityData = GEO_CITIES[city];
  if (!cityData) {
    notFound();
  }

  // Schema.org LocalBusiness with areaServed
  const schemaOrgJSON = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "SKIN einfach schön - Kosmetikstudio Osnabrück",
    "image": "https://skineinfachschoen.de/images/treatments/jetpeel.png",
    "@id": "https://skineinfachschoen.de/#salon",
    "url": "https://skineinfachschoen.de",
    "telephone": "+4954147054971",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lotter Straße 33",
      "addressLocality": "Osnabrück",
      "postalCode": "49078",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.27218,
      "longitude": 8.02672
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "18:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": cityData.name
      },
      {
        "@type": "AdministrativeArea",
        "name": "Osnabrück"
      }
    ]
  };

  return (
    <div className="overflow-x-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSON) }}
      />

      {/* Hero Section */}
      <section className="relative bg-soft-shell py-20 md:py-28 border-b border-outline-variant/10 overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <span className="font-display text-xs font-bold text-slate-muted mb-4 block uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Regionale Hautpflege für {cityData.name}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Ihr Kosmetikstudio für <span className="text-secondary">{cityData.name}</span> &amp; Umgebung.
            </h1>
            <p className="font-sans text-lg text-tertiary max-w-2xl mb-8 leading-relaxed">
              {cityData.introText} Unser modern ausgestattetes Fachzentrum liegt in Osnabrück (Lotter Straße 33) – nur <strong className="text-primary">{cityData.durationMin} Minuten</strong> Fahrzeit von {cityData.name} entfernt.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/terminbuchung"
                className="bg-primary text-pure-white px-8 py-4 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:opacity-95 active:scale-95 transition-all rounded shadow-md"
              >
                Termin online buchen
              </Link>
              <a
                href="#anfahrt"
                className="border border-slate-muted text-slate-muted px-8 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-slate-muted/5 active:scale-95 transition-all text-center rounded flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" /> Anfahrt ansehen
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-[350px] md:h-[450px]">
            <div className="absolute inset-0 bg-primary-fixed-dim/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <img
              alt={`Kosmetikstudio SKIN nahe ${cityData.name}`}
              className="w-full h-full object-cover rounded-2xl medical-glow border border-pure-white/50 shadow-xl"
              src="/images/treatments/jetpeel.png"
            />
          </div>
        </div>
      </section>

      {/* Proximity / Value Prop Section */}
      <section className="py-24 bg-pure-white border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-soft-shell/40 p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <div>
                <Clock className="text-primary w-8 h-8 mb-6" />
                <h3 className="font-display text-lg font-bold mb-3 text-primary">Schnelle Anreise</h3>
                <p className="font-sans text-sm text-tertiary leading-relaxed">
                  Nur ca. <strong>{cityData.durationMin} Minuten</strong> Fahrzeit ({cityData.distanceKm} km) {cityData.routeHighlight}.
                </p>
              </div>
            </div>
            <div className="bg-soft-shell/40 p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <div>
                <MapPin className="text-primary w-8 h-8 mb-6" />
                <h3 className="font-display text-lg font-bold mb-3 text-primary">Kostenlose Parkplätze</h3>
                <p className="font-sans text-sm text-tertiary leading-relaxed">
                  Keine Parkplatzsuche in der Innenstadt. Stellen Sie Ihr Auto einfach direkt auf unseren reservierten Kundenparkplätzen im Hof ab.
                </p>
              </div>
            </div>
            <div className="bg-soft-shell/40 p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <div>
                <ShieldCheck className="text-primary w-8 h-8 mb-6" />
                <h3 className="font-display text-lg font-bold mb-3 text-primary">Premium Behandlungen</h3>
                <p className="font-sans text-sm text-tertiary leading-relaxed">
                  Medizinische Kosmetik, zertifizierte Wirkstoffe von ZO Skin Health, JetPeel™ Originalbehandlungen und professionelles Anti-Aging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Tailored Links) */}
      <section className="py-24 bg-soft-shell/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display text-xs font-bold text-slate-muted uppercase tracking-widest block mb-4">
              Unsere Behandlungen
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
              Premium Kosmetik &amp; High-Tech Treatments
            </h2>
            <p className="font-sans text-tertiary text-base leading-relaxed">
              Wählen Sie eine unserer hochwirksamen Behandlungen. Klicken Sie auf das jeweilige Treatment, um mehr Details für Ihren Besuch aus {cityData.name} zu erfahren:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(TREATMENT_DETAILS).map(([slug, detail]) => (
              <div
                key={slug}
                className="bg-pure-white rounded-xl overflow-hidden border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    alt={`${detail.title} nahe ${cityData.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={detail.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-display font-bold text-slate-muted uppercase tracking-widest block mb-2">
                      {detail.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                      {detail.title}
                    </h3>
                    <p className="font-sans text-sm text-tertiary leading-relaxed mb-6 line-clamp-3">
                      {detail.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10 mt-auto">
                    <span className="font-display text-sm font-bold text-primary">
                      ab {detail.price}
                    </span>
                    <Link
                      href={`/stadt/${city}/${slug}`}
                      className="text-primary hover:text-secondary text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      Mehr Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localized FAQ Section */}
      <section className="py-24 bg-pure-white">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">Häufig gestellte Fragen (FAQ)</h2>
            <p className="font-sans text-sm text-tertiary">Antworten für unsere Kunden aus {cityData.name}.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-soft-shell/30 p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-display text-base font-bold text-primary mb-2">Wo befindet sich das Kosmetikstudio SKIN genau?</h3>
              <p className="font-sans text-sm text-tertiary leading-relaxed">
                Sie finden uns in der Lotter Straße 33 in 49078 Osnabrück. Das Studio liegt sehr verkehrsgünstig und ist von {cityData.name} aus direkt erreichbar.
              </p>
            </div>
            <div className="bg-soft-shell/30 p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-display text-base font-bold text-primary mb-2">Wie lange fahre ich aus {cityData.name} zu Ihnen?</h3>
              <p className="font-sans text-sm text-tertiary leading-relaxed">
                Die Fahrzeit beträgt in der Regel nur etwa {cityData.durationMin} Minuten (ca. {cityData.distanceKm} km Anfahrtsweg). Die Anfahrt erfolgt am besten {cityData.routeHighlight}.
              </p>
            </div>
            <div className="bg-soft-shell/30 p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-display text-base font-bold text-primary mb-2">Gibt es Parkplätze vor Ort?</h3>
              <p className="font-sans text-sm text-tertiary leading-relaxed">
                Ja, für unsere Kundinnen und Kunden stehen kostenfreie, reservierte Parkplätze direkt bei uns auf dem Hof zur Verfügung. Sie müssen also keine Zeit für die Parkplatzsuche einplanen.
              </p>
            </div>
            <div className="bg-soft-shell/30 p-6 rounded-xl border border-outline-variant/10">
              <h3 className="font-display text-base font-bold text-primary mb-2">Kann ich meinen Termin online buchen?</h3>
              <p className="font-sans text-sm text-tertiary leading-relaxed">
                Ja, Sie können Ihren Wunschtermin ganz einfach und rund um die Uhr über unsere Online-Terminbuchung reservieren. Sie sehen dort alle freien Zeiten auf einen Blick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Contact section */}
      <section id="anfahrt" className="py-24 bg-soft-shell/50 border-t border-outline-variant/10 scroll-mt-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-widest mb-2 block">
                Ihr Weg zu uns
              </span>
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                Anschrift &amp; Anfahrt aus {cityData.name}
              </h2>
              <p className="font-sans text-base text-tertiary mb-8 leading-relaxed">
                {cityData.neighborhoodInfo}
              </p>
              
              <div className="space-y-4 font-sans text-sm text-tertiary">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Lotter Straße 33, 49078 Osnabrück</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>0541-47054971</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Mo - Do: 09:00 - 18:30 Uhr | Fr: 09:00 - 17:00 Uhr</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(cityData.name + ', Germany')}&destination=Lotter+Stra%C3%9Fe+33,+49078+Osnabr%C3%BCck`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:opacity-95 text-pure-white font-display text-xs font-bold py-4 px-8 uppercase tracking-widest transition-all rounded shadow-md inline-flex items-center gap-2"
                >
                  Route berechnen <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            
            <div className="h-[400px] bg-surface-container overflow-hidden rounded-xl border border-outline-variant/10 shadow-sm relative group">
              <iframe
                title={`Anfahrt aus ${cityData.name} zu SKIN einfach schön`}
                src="https://maps.google.com/maps?q=Lotter%20Stra%C3%9Fe%2033,%2049078%20Osnabr%C3%BCck&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
