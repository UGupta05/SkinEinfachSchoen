import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TREATMENTS, TREATMENT_SLUGS, isTreatmentSlug, treatmentPath } from '../../../content';
import { TreatmentDetail } from '../../../components/content/TreatmentDetail';
import { JsonLd } from '../../../components/JsonLd';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../../../lib/schema';

interface Props {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return TREATMENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isTreatmentSlug(slug)) return {};
  const page = TREATMENTS[slug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: treatmentPath(slug) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: treatmentPath(slug),
      images: [{ url: page.image.src, width: page.image.width, height: page.image.height, alt: page.image.alt }],
    },
  };
}

export default async function TreatmentRoute({ params }: Props) {
  const { slug } = await params;
  if (!isTreatmentSlug(slug)) notFound();
  const page = TREATMENTS[slug];
  const path = treatmentPath(slug);
  const breadcrumbs = [
    { name: 'Startseite', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: page.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: page.name, description: page.teaser, path, image: page.image.src, price: page.price }),
          breadcrumbSchema(breadcrumbs),
          ...(page.faqs.length > 0 ? [faqSchema(page.faqs)] : []),
        ]}
      />
      <TreatmentDetail page={page} breadcrumbs={breadcrumbs} />
    </>
  );
}
