import React from 'react';
import { Metadata } from 'next';
import { TreatmentTemplate } from '../../components/TreatmentTemplate';

export const metadata: Metadata = {
  title: 'Orthomolekulare Medizin | SKIN einfach schön Kosmetikstudio Osnabrück',
  description: 'Zellgesundheit und Nährstofftherapie für Ihre Haut. Datenbasierte Diagnostik, Laborwerte-Analyse und maßgeschneiderte Nährstoff-Cocktails für sichtbare Regeneration.',
};

export default function OrthomolekulareMedizinPage() {
  const schemaDescription = "Zellgesundheit und Nährstofftherapie für Ihre Haut. Datenbasierte Diagnostik, Laborwerte-Analyse und maßgeschneiderte Nährstoff-Cocktails für sichtbare Regeneration.";

  const description = (
    <div className="space-y-6">
      <p className="font-semibold text-primary text-lg">
        Unser Ansatz: Totale Personalisierung statt Gießkannenprinzip.
      </p>
      <p className="text-tertiary">
        Weil jede Haut so individuell ist wie ihr genetischer Code, machen wir keine Kompromisse:
      </p>
      
      <div className="space-y-6 pt-2">
        <div className="border-l-2 border-sky-accent pl-4 py-1">
          <h3 className="font-display font-bold text-primary text-base">
            Daten & Diagnostik
          </h3>
          <p className="mt-2 text-tertiary text-sm leading-relaxed">
            Basis jeder Behandlung ist eine fundierte Diagnostik. Über eine computergestützte Hautanalyse und die Auswertung eurer Laborwerte ermitteln wir präzise den aktuellen Nährstoff- und Zellstatus eurer Haut.
          </p>
        </div>
        
        <div className="border-l-2 border-sky-accent pl-4 py-1">
          <h3 className="font-display font-bold text-primary text-base">
            Zellwissenschaft (Cellular Science)
          </h3>
          <p className="mt-2 text-tertiary text-sm leading-relaxed">
            Auf Basis dieser exakten Daten stellen wir euren maßgeschneiderten Nährstoff-Cocktail zusammen. Eure Haut erhält exakt die Moleküle, die sie benötigt, um sich selbst zu regenerieren, Barrieren zu stärken und von innen heraus zu strahlen.
          </p>
        </div>
      </div>
      
      <p className="font-medium text-primary border-t border-outline-variant/10 pt-4 mt-4 leading-relaxed">
        Wissenschaftlich fundiert, präzise dosiert und perfekt auf euch abgestimmt. Für ein Hautgefühl, das man nicht nur sieht, sondern spürt.
      </p>
    </div>
  );

  const details = {
    title: "Orthomolekulare Medizin",
    category: "Zellgesundheit & Nährstoffe",
    description: description,
    points: [
      "Totale Personalisierung statt Gießkannenprinzip",
      "Daten & Diagnostik: Fundierte Diagnostik & Hautanalyse",
      "Präzise Ermittlung von Nährstoff- & Zellstatus",
      "Auswertung individueller Laborwerte",
      "Zellwissenschaft: Nährstoff-Cocktails",
      "Wissenschaftlich fundiert & perfekt abgestimmt"
    ],
    image: "/images/treatments/orthomolekulare_medizin.jpg",
    imageAspectRatio: "landscape" as const
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
      <TreatmentTemplate {...details} />
    </>
  );
}
