import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Navigation } from 'lucide-react';
import { GEO_CITIES } from '../../../../data/geoCities';
import { TREATMENT_DETAILS } from '../../../../data/treatmentDetails';

interface Props {
  params: Promise<{
    city: string;
    treatment: string;
  }>;
}

export async function generateStaticParams() {
  const params: { city: string; treatment: string }[] = [];
  
  Object.keys(GEO_CITIES).forEach((cityKey) => {
    Object.keys(TREATMENT_DETAILS).forEach((treatmentKey) => {
      params.push({
        city: cityKey,
        treatment: treatmentKey,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, treatment } = await params;
  const cityData = GEO_CITIES[city];
  const treatmentData = TREATMENT_DETAILS[treatment];
  if (!cityData || !treatmentData) return {};

  return {
    title: `${treatmentData.title} ${cityData.name} | Kosmetikstudio SKIN`,
    description: `Suchen Sie eine professionelle Behandlung für ${treatmentData.title} in der Nähe von ${cityData.name}? Nur ${cityData.durationMin} Min. Fahrweg zu SKIN einfach schön in Osnabrück.`,
    alternates: {
      canonical: `https://skineinfachschoen.de/stadt/${city}/${treatment}`,
    }
  };
}

export default async function CityTreatmentLandingPage({ params }: Props) {
  const { city, treatment } = await params;
  const cityData = GEO_CITIES[city];
  const treatmentData = TREATMENT_DETAILS[treatment];

  if (!cityData || !treatmentData) {
    notFound();
  }

  // Schema.org Service with areaServed
  const schemaOrgJSON = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${treatmentData.title} - SKIN einfach schön`,
    "image": `https://skineinfachschoen.de${treatmentData.image}`,
    "description": treatmentData.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SKIN einfach schön - Kosmetikstudio Osnabrück",
      "telephone": "+4954147054971",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lotter Straße 33",
        "addressLocality": "Osnabrück",
        "postalCode": "49078",
        "addressCountry": "DE"
      }
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": cityData.name
      },
      {
        "@type": "AdministrativeArea",
        "name": "Osnabrück"
      }
    ],
    "offers": {
      "@type": "Offer",
      "price": treatmentData.price.replace(',- €', '').replace(' €', '').trim(),
      "priceCurrency": "EUR"
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSON) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-soft-shell py-4 border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex items-center gap-2 font-sans text-xs text-tertiary">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/stadt/${city}`} className="hover:text-primary transition-colors">{cityData.name}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-semibold">{treatmentData.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-24 border-b border-outline-variant/10 bg-pure-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="font-display text-2xs font-bold text-slate-muted mb-4 block uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" /> {treatmentData.category} für {cityData.name}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              {treatmentData.title} in der Nähe von <span className="text-secondary">{cityData.name}</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-tertiary mb-8 leading-relaxed">
              Sie wohnen in <strong>{cityData.name}</strong> und suchen eine professionelle Praxis für {treatmentData.title}? In unserem modern ausgestatteten Kosmetikstudio in Osnabrück (Lotter Straße 33) führen wir diese Behandlung auf medizinischem Niveau durch. Wir sind in nur <strong>{cityData.durationMin} Minuten</strong> {cityData.routeHighlight} zu erreichen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/terminbuchung"
                className="bg-primary text-pure-white px-8 py-4 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:opacity-95 active:scale-95 transition-all rounded shadow-md"
              >
                Termin online vereinbaren
              </Link>
              <a
                href="#anfahrt"
                className="border border-slate-muted text-slate-muted px-8 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-slate-muted/5 active:scale-95 transition-all text-center rounded"
              >
                Anfahrt &amp; Parken
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-[300px] md:h-[400px]">
            <img
              alt={`${treatmentData.title} nahe ${cityData.name}`}
              className="w-full h-full object-cover rounded-2xl medical-glow border border-outline-variant/15 shadow-lg"
              src={treatmentData.image}
            />
          </div>
        </div>
      </section>

      {/* Treatment Details adapted to local context */}
      <section className="py-24 bg-soft-shell/20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
                Über die Behandlung
              </h2>
              <p className="font-sans text-base text-tertiary leading-relaxed mb-8">
                {treatmentData.description}
              </p>
              
              <div className="bg-pure-white p-8 rounded-xl border border-outline-variant/10 shadow-sm space-y-4">
                <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider border-b border-outline-variant/10 pb-3">
                  Behandlungs-Highlights
                </h4>
                <ul className="space-y-3">
                  {treatmentData.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-tertiary">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-pure-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden p-8 md:p-10 space-y-8">
              <h3 className="font-display text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">
                Konditionen &amp; Details
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-display font-bold text-slate-muted uppercase tracking-widest mb-1">Dauer</p>
                  <p className="font-sans text-base text-primary font-semibold">{treatmentData.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] font-display font-bold text-slate-muted uppercase tracking-widest mb-1">Preis</p>
                  <p className="font-sans text-base text-primary font-semibold">{treatmentData.price}</p>
                </div>
              </div>

              <div className="border-t border-outline-variant/10 pt-8 space-y-4">
                <h4 className="font-display text-sm font-bold text-primary">Ihre Vorteile bei SKIN</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-tertiary">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Kostenfreie Parkplätze</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Nur {cityData.durationMin} Min. von {cityData.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Zertifiziertes Fachpersonal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Individuelle 3D Analyse</span>
                  </div>
                </div>
              </div>

              <Link
                href="/terminbuchung"
                className="block text-center bg-primary hover:opacity-95 text-pure-white font-display text-xs font-bold py-5 uppercase tracking-widest rounded transition-all shadow-md mt-6"
              >
                Termin online buchen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Map & Contact section */}
      <section id="anfahrt" className="py-24 bg-pure-white border-t border-outline-variant/10 scroll-mt-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-display text-2xs font-bold text-slate-muted uppercase tracking-widest mb-2 block">
                Schnell erreichbar
              </span>
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                Ihr Weg aus {cityData.name} zu SKIN
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
                title={`Anfahrt aus ${cityData.name} zu SKIN`}
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
