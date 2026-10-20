import { TESTIMONIALS } from '../data/mockData';

/**
 * Reviews from the studio's Google Business Profile via the Places API (New).
 *
 * Fetched on the server and cached for a few hours, so visitors' browsers never
 * talk to Google (no consent needed). Reviewer photos are deliberately not
 * used: they are hosted on googleusercontent.com and would leak visitor IPs.
 *
 * Without GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID, or when the API fails, the
 * curated testimonials from mockData are shown instead.
 */

export interface Review {
  readonly author: string;
  /** Google profile of the reviewer (required attribution), if known. */
  readonly authorUrl?: string;
  readonly rating: number;
  readonly text: string;
  /** e.g. "vor 2 Monaten". */
  readonly when?: string;
}

export interface ReviewData {
  readonly source: 'google' | 'fallback';
  readonly reviews: readonly Review[];
  /** Average rating and total count from Google, when available. */
  readonly rating?: number;
  readonly count?: number;
  /** Opens the review tab of the Google Business Profile. */
  readonly allReviewsUrl: string;
}

interface PlacesReview {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
}

interface PlacesResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
}

/**
 * Pages showing reviews must export the same value as `revalidate`, so they
 * keep regenerating even when a request fails outright. Short enough that a
 * cached error response doesn't linger; 4 calls a day stay well inside the
 * Places API free tier.
 */
export const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 6;
const MAX_REVIEWS = 3;
/** Very short reviews ("Top!") make weak testimonials. */
const MIN_TEXT_LENGTH = 80;

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/SKIN+einfach+sch%C3%B6n/@52.2743486,8.0410559,17z/data=!4m8!3m7!1s0x47ba966380c5d64d:0x2280d52723c3b036!8m2!3d52.2743486!4d8.0410559!9m1!1b1';

function fallback(): ReviewData {
  return {
    source: 'fallback',
    reviews: TESTIMONIALS.map((t) => ({ author: t.name, rating: t.rating, text: t.text, when: t.role })),
    allReviewsUrl: GOOGLE_REVIEWS_URL,
  };
}

/** Picks the strongest reviews: 5 stars first, then 4, longer texts first. */
export function selectBestReviews(reviews: readonly PlacesReview[]): Review[] {
  return reviews
    .map((r) => ({
      author: r.authorAttribution?.displayName?.trim() ?? '',
      authorUrl: r.authorAttribution?.uri,
      rating: r.rating ?? 0,
      // Prefer the original German text over Google's machine translation.
      text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
      when: r.relativePublishTimeDescription,
    }))
    .filter((r) => r.author && r.rating >= 4 && r.text.length >= MIN_TEXT_LENGTH)
    .sort((a, b) => b.rating - a.rating || b.text.length - a.text.length)
    .slice(0, MAX_REVIEWS);
}

export async function getReviews(): Promise<ReviewData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return fallback();

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=de`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
        next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) {
      console.error(`Google Places API responded ${res.status}`);
      return fallback();
    }
    const data = (await res.json()) as PlacesResponse;
    const reviews = selectBestReviews(data.reviews ?? []);
    if (reviews.length === 0) return fallback();

    return {
      source: 'google',
      reviews,
      rating: data.rating,
      count: data.userRatingCount,
      allReviewsUrl: GOOGLE_REVIEWS_URL,
    };
  } catch (err) {
    console.error('Google Places API request failed', err);
    return fallback();
  }
}
