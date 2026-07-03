import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TREATMENT_DETAILS } from '../../../data/treatmentDetails';
import { TreatmentTemplate } from '../../../components/TreatmentTemplate';

interface Props {
  readonly params: Promise<{ readonly slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(TREATMENT_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const details = TREATMENT_DETAILS[slug];
  if (!details) {
    return {};
  }
  return {
    title: `${details.title} | Kosmetikstudio Osnabrück`,
    description: `${details.description.substring(0, 155)}...`,
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const details = TREATMENT_DETAILS[slug];
  if (!details) {
    notFound();
  }

  // Schema.org JSON-LD for AI and Search Engine Optimization
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
      "description": `Behandlung: ${details.title} (${details.duration})`
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
