import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { THEMES, THEME_SLUGS, isThemeSlug, themePath } from '../../content';
import { ThemeDetail } from '../../components/content/ThemeDetail';
import { JsonLd } from '../../components/JsonLd';
import { breadcrumbSchema, faqSchema } from '../../lib/schema';

// Skin-concern landing pages live at the root (/hautstraffung, …). Only the
// slugs below exist; anything else 404s instead of rendering this route.
export const dynamicParams = false;

interface Props {
  readonly params: Promise<{ readonly thema: string }>;
}

export function generateStaticParams() {
  return THEME_SLUGS.map((thema) => ({ thema }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { thema } = await params;
  if (!isThemeSlug(thema)) return {};
  const page = THEMES[thema];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: themePath(thema) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: themePath(thema),
      images: [{ url: page.image.src, width: page.image.width, height: page.image.height, alt: page.image.alt }],
    },
  };
}

export default async function ThemeRoute({ params }: Props) {
  const { thema } = await params;
  if (!isThemeSlug(thema)) notFound();
  const page = THEMES[thema];
  const breadcrumbs = [
    { name: 'Startseite', path: '/' },
    { name: page.name, path: themePath(thema) },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), ...(page.faqs.length > 0 ? [faqSchema(page.faqs)] : [])]} />
      <ThemeDetail page={page} breadcrumbs={breadcrumbs} />
    </>
  );
}
