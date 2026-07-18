import React from 'react';
import { Metadata } from 'next';
import { TreatmentTemplate } from '../../components/TreatmentTemplate';

export const metadata: Metadata = {
  title: 'Medical Kosmetik ZO® Skin Health | Kosmetikstudio Osnabrück',
  description: 'Therapeutische Wirkstoffkosmetik von Dr. Zein Obagi in Osnabrück. Hochwirksam bei Pigmentstörungen, Akne, Rosacea & für nachhaltige Hautgesundheit.',
};

export default function MedicalKosmetikZOPage() {
  const schemaDescription = "Therapeutische Wirkstoffkosmetik von Dr. Zein Obagi in Osnabrück. Hochwirksam bei Pigmentstörungen, Akne, Rosacea & für nachhaltige Hautgesundheit.";

  const description = (
    <div className="space-y-6">
      <p className="font-semibold text-primary text-lg">
        ZO® Skin Health: Die Revolution der Hautgesundheit von Dr. Zein Obagi.
      </p>
      <p className="text-tertiary">
        Klassische Kosmetik pflegt oft nur die Oberfläche. Das Konzept von Dr. Zein Obagi geht tiefer: Es weckt die Hautzellen aus dem „Dornröschenschlaf“ und regt sie zur Selbstregeneration an. Durch hochkonzentriertes Retinol, Vitamine und Antioxidantien stellen wir die natürliche Balance und Strahlkraft Ihrer Haut wieder her.
      </p>
      
      <div className="space-y-6 pt-2">
        <div className="border-l-2 border-sky-accent pl-4 py-1">
          <h3 className="font-display font-bold text-primary text-base">
            Schritt 1: GSR™ – Getting Skin Ready
          </h3>
          <p className="mt-2 text-tertiary text-sm leading-relaxed">
            Die essenzielle Vorbereitung. Durch ein präzises Zusammenspiel aus Reinigung, mechanischem Peeling und Talgregulation wird die Haut tiefenwirksam geklärt. Nur so können die nachfolgenden Wirkstoffe optimal aufgenommen werden.
          </p>
        </div>
        
        <div className="border-l-2 border-sky-accent pl-4 py-1">
          <h3 className="font-display font-bold text-primary text-base">
            Schritt 2: Prevent & Correct (Therapie & Korrektur)
          </h3>
          <p className="mt-2 text-tertiary text-sm leading-relaxed">
            Gezielte Behandlung spezifischer Hautprobleme. Ob Hyperpigmentierung, hartnäckige Akne, Rötungen (Rosacea) oder vorzeitige Hautalterung – maßgeschneiderte Protokolle mit medizinisch dosierten Wirkstoffen reparieren die Hautbarriere.
          </p>
        </div>

        <div className="border-l-2 border-sky-accent pl-4 py-1">
          <h3 className="font-display font-bold text-primary text-base">
            Schritt 3: Triple-Spectrum Protection
          </h3>
          <p className="mt-2 text-tertiary text-sm leading-relaxed">
            Umfassender Schutz vor vorzeitiger Alterung. Die ZO® Sonnenschutzsysteme schützen nicht nur vor UVA- und UVB-Strahlen, sondern auch vor hochenergetischem blauem Licht (HEV) und Infrarotstrahlung (IR-A).
          </p>
        </div>
      </div>
      
      <p className="font-medium text-primary border-t border-outline-variant/10 pt-4 mt-4 leading-relaxed">
        Erleben Sie ein wissenschaftlich fundiertes Pflegekonzept, das die Hautqualität dauerhaft und sichtbar verbessert. Für eine gesunde, widerstandsfähige und strahlende Haut.
      </p>
    </div>
  );

  const details = {
    title: "Medical Kosmetik ZO® Skin Health",
    category: "Medizinische Kosmetik",
    description: description,
    points: [
      "Zelluläre Aktivierung statt reiner Oberflächenpflege",
      "GSR™: Tiefenreinigung & Talgregulation",
      "Hocheffektiv bei Pigmentstörungen & Melasma",
      "Korrektur von Akne, Rosacea & Rötungen",
      "Schutz vor HEV-Licht (Blue Light) & IR-A",
      "Medizinisch fundierte Wirkstoffe (hohe Retinol-Dosis)"
    ],
    image: "/images/treatments/zo_skin_health_new.jpg",
    imageAspectRatio: "portrait" as const
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": details.title,
    "serviceType": details.category,
    "description": schemaDescription,
    "provider": {
      "@type": "BeautySalon",
      "name": "SKIN einfach schön",
      "image": "https://skin-einfachschoen.de/images/home/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lotter Straße 33",
        "addressLocality": "Osnabrück",
        "postalCode": "49078",
        "addressCountry": "DE"
      },
      "telephone": "+4954147054971",
      "priceRange": "$$"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-8">
        <TreatmentTemplate {...details} />
      </div>
    </>
  );
}
