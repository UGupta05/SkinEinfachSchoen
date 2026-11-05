import type { ThemePage, ThemeSlug, TreatmentPage, TreatmentSlug } from './types';
import { TREATMENT_SLUGS, THEME_SLUGS } from './types';

import { page as radiofrequenzMicroneedling } from './treatments/radiofrequenz-microneedling';
import { page as microneedling } from './treatments/microneedling';
import { page as jetpeel } from './treatments/jetpeel';
import { page as ipl } from './treatments/ipl';
import { page as diodenlaser } from './treatments/diodenlaser';
import { page as alexandritlaser } from './treatments/alexandritlaser';
import { page as gesichtsreinigung } from './treatments/gesichtsreinigung';
import { page as mesoBbGlow } from './treatments/meso-bb-glow';
import { page as fruchtsaeurePeeling } from './treatments/fruchtsaeure-peeling';
import { page as visia } from './treatments/visia';

import { page as dauerhafteHaarentfernung } from './themes/dauerhafte-haarentfernung';
import { page as hautstraffung } from './themes/hautstraffung';
import { page as faltenbehandlung } from './themes/faltenbehandlung';
import { page as porenverkleinerung } from './themes/porenverkleinerung';
import { page as pigmentflecken } from './themes/pigmentflecken';
import { page as narbenbehandlung } from './themes/narbenbehandlung';
import { page as akneBehandlung } from './themes/akne-behandlung';

export * from './types';

export const TREATMENTS: Record<TreatmentSlug, TreatmentPage> = {
  'radiofrequenz-microneedling': radiofrequenzMicroneedling,
  microneedling,
  jetpeel,
  ipl,
  diodenlaser,
  alexandritlaser,
  gesichtsreinigung,
  'meso-bb-glow': mesoBbGlow,
  'fruchtsaeure-peeling': fruchtsaeurePeeling,
  visia,
};

export const THEMES: Record<ThemeSlug, ThemePage> = {
  'dauerhafte-haarentfernung': dauerhafteHaarentfernung,
  hautstraffung,
  faltenbehandlung,
  porenverkleinerung,
  pigmentflecken,
  narbenbehandlung,
  'akne-behandlung': akneBehandlung,
};

/** Treatments in display order (navigation, overview, price list). */
export const TREATMENT_LIST: readonly TreatmentPage[] = TREATMENT_SLUGS.map((s) => TREATMENTS[s]);
export const THEME_LIST: readonly ThemePage[] = THEME_SLUGS.map((s) => THEMES[s]);

export function isTreatmentSlug(value: string): value is TreatmentSlug {
  return (TREATMENT_SLUGS as readonly string[]).includes(value);
}

export function isThemeSlug(value: string): value is ThemeSlug {
  return (THEME_SLUGS as readonly string[]).includes(value);
}

export const treatmentPath = (slug: TreatmentSlug) => `/leistungen/${slug}`;
export const themePath = (slug: ThemeSlug) => `/${slug}`;

/** Resolves a theme's treatment link, which may point at the ZO page. */
export function resolveTreatmentLink(slug: TreatmentSlug | 'medical-kosmetik-zo') {
  if (slug === 'medical-kosmetik-zo') {
    return { href: '/medical-kosmetik-zo', name: 'Medical Kosmetik ZO® Skin Health' };
  }
  return { href: treatmentPath(slug), name: TREATMENTS[slug].name };
}
