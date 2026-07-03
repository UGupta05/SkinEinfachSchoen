import React from 'react';
import { Metadata } from 'next';
import { TreatmentTemplate } from '../../components/TreatmentTemplate';

export const metadata: Metadata = {
  title: 'Medical Kosmetik ZO® Skin Health | Kosmetikstudio Osnabrück',
  description: 'Therapeutische Wirkstoffkosmetik von Dr. Zein Obagi in Osnabrück. Hochwirksam bei Pigmentstörungen, Akne, Rosacea & für nachhaltige Hautgesundheit.',
};

export default function MedicalKosmetikZOPage() {
  const details = {
    title: "Medical Kosmetik ZO® Skin Health",
    category: "Medizinische Kosmetik",
    description: "ZO® Skin Health wurde von dem weltbekannten Dermatologen Dr. Zein Obagi entwickelt. Das therapeutische Pflegekonzept setzt auf hochkonzentriertes Retinol, Wachstumsfaktoren und Antioxidantien, um gesunde Hautzellen aufzubauen und hartnäckige Hautprobleme wie Hyperpigmentierung, Akne und Rosacea effektiv zu behandeln.",
    points: [
      "Therapeutische Wirkstoffkosmetik von Dr. Obagi",
      "Hochwirksam gegen Pigmentstörungen & Melasma",
      "Bekämpft effektiv Akne & Rosacea",
      "Stärkt die natürliche Hautbarriere nachhaltig",
      "Starke Zellerneuerung durch med. Retinol",
      "Klinisch bewiesene Resultate"
    ],
    duration: "ca. 75 - 90 Minuten",
    price: "119,- €",
    image: "/images/treatments/zo_skin_health.png"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": details.title,
    "serviceType": details.category,
    "description": details.description,
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
    },
    "offers": {
      "@type": "Offer",
      "price": details.price.replace(/[^\d]/g, ''),
      "priceCurrency": "EUR",
      "description": `Behandlung: ${details.title}`
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
