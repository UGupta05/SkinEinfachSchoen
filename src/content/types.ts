/**
 * Content model for treatment pages (/leistungen/<slug>) and skin-concern
 * pages (/<slug>). Each page lives in its own file under ./treatments or
 * ./themes and is registered in ./index.ts.
 */

export const TREATMENT_SLUGS = [
  'radiofrequenz-microneedling',
  'microneedling',
  'jetpeel',
  'ipl',
  'diodenlaser',
  'alexandritlaser',
  'gesichtsreinigung',
  'meso-bb-glow',
  'fruchtsaeure-peeling',
  'visia',
] as const;

export const THEME_SLUGS = [
  'dauerhafte-haarentfernung',
  'hautstraffung',
  'faltenbehandlung',
  'porenverkleinerung',
  'pigmentflecken',
  'narbenbehandlung',
  'akne-behandlung',
] as const;

export type TreatmentSlug = (typeof TREATMENT_SLUGS)[number];
export type ThemeSlug = (typeof THEME_SLUGS)[number];

export interface ContentSection {
  /** Rendered as <h2>. Phrase it the way people search or ask. */
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

export interface FaqEntry {
  readonly question: string;
  /** Plain text, 1–4 sentences. Also emitted as FAQPage structured data. */
  readonly answer: string;
}

export interface PageImage {
  /** Root-relative path below /public. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

interface BasePage {
  /** Short label for navigation, cards and breadcrumbs. */
  readonly name: string;
  readonly h1: string;
  /** <title> without the brand suffix; the root layout appends " | SKIN einfach schön". Max 45 characters. */
  readonly metaTitle: string;
  /** 130–155 characters, mentions Osnabrück, ends with a reason to click. */
  readonly metaDescription: string;
  /** Small uppercase label above the H1. */
  readonly eyebrow: string;
  /** 1–2 sentences for overview cards and link teasers. */
  readonly teaser: string;
  /** Opening paragraphs below the H1. */
  readonly intro: readonly string[];
  readonly sections: readonly ContentSection[];
  readonly faqs: readonly FaqEntry[];
  readonly image: PageImage;
  /** ISO date of the last substantive content change; feeds the sitemap. */
  readonly updatedAt: string;
}

export interface TreatmentPage extends BasePage {
  readonly slug: TreatmentSlug;
  /** Short list shown as "Ihre Vorteile". */
  readonly benefits: readonly string[];
  /** Only values confirmed by the studio. Leave undefined when unknown. */
  readonly duration?: string;
  readonly price?: string;
  readonly relatedThemes: readonly ThemeSlug[];
  readonly relatedTreatments: readonly TreatmentSlug[];
}

export interface ThemeTreatmentLink {
  /** A treatment slug, or 'medical-kosmetik-zo' for the ZO Skin Health page. */
  readonly slug: TreatmentSlug | 'medical-kosmetik-zo';
  /** One or two sentences: why this treatment helps with this concern. */
  readonly reason: string;
}

export interface ThemePage extends BasePage {
  readonly slug: ThemeSlug;
  /** Treatments that address this concern, most relevant first. */
  readonly treatments: readonly ThemeTreatmentLink[];
}
