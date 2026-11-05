/**
 * Google reviews shown on the homepage and team page, copied by hand from the
 * studio's Google Business Profile (no API, no request to Google from the
 * site). Update the list and GOOGLE_RATING together when refreshing.
 *
 * Names are shortened to first name + initial.
 */

export interface Review {
  readonly author: string;
  readonly rating: number;
  readonly text: string;
  /** Year the review was posted (Google only shows relative dates). */
  readonly date: string;
}

export const GOOGLE_RATING = {
  rating: 5.0,
  count: 120,
  asOf: 'Oktober 2026',
} as const;

/** Opens the studio's profile on Google Maps. */
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/SKiN+Einfach+Schoen+GmbH/@52.2745401,8.0308096,17z/data=!3m1!4b1!4m6!3m5!1s0x47b9e5941a52e0d5:0xe88bc61246f7667!8m2!3d52.2745401!4d8.0308096!16s%2Fg%2F11bxjqstqj';

export const REVIEWS: readonly Review[] = [
  {
    author: 'Devleta Z.',
    rating: 5,
    date: '2026',
    text: 'Ich hatte einen Termin zur Laser-Haarentfernung und bin sehr zufrieden. Die Behandlung war angenehm, professionell und wurde ausführlich erklärt. Besonders hervorheben möchte ich Sophia – sie ist sehr freundlich, kompetent und sorgt dafür, dass man sich sofort wohlfühlt. Klare Empfehlung!',
  },
  {
    author: 'Sarah B.',
    rating: 5,
    date: '2026',
    text: 'Ich fühle mich bei Skin einfach schön, immer super gut aufgehoben. Alle sind total lieb und ich merke, dass die Behandlung meiner Haut wirklich helfen. besonders das Fruchtsäure Peeling und das Jet Peel unterstützen meine zu Akne und Rosacea neigende Haut sehr. Ich hab mich seit dem ersten Termin gut betreut und kompetent beraten gefühlt. Kann es nur weiterempfehlen 😊',
  },
  {
    author: 'Çağla A.',
    rating: 5,
    date: '2026',
    text: 'Schon nach den ersten drei Sitzungen bin ich begeistert - das Ergebnis spart mir enorm viel Zeit im Alltag! Nach längerer Recherche zum Thema dauerhafte Haarentfernung habe ich mich für SKIN Einfach schön entschieden und diese Wahl nie bereut. Da ich sehr dunkles und kräftiges Haar habe, musste ich mich früher alle drei bis vier Tage rasieren. Bereits nach drei Sitzungen ist der Unterschied deutlich sichtbar - ich rasiere mich jetzt nur noch alle vier Wochen kurz vor dem Lasertermin. Ich bin absolut zufrieden und empfehle die Behandlung bei Sofia definitiv weiter!',
  },
];
