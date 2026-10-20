/**
 * Towns around Osnabrück the studio draws customers from, with approximate
 * driving distance and time to Lotter Straße 33. Shown on /kontakt; the names
 * mirror AREA_SERVED in src/config/business.ts.
 */
export interface NearbyTown {
  readonly name: string;
  readonly distanceKm: number;
  readonly durationMin: number;
}

export const NEARBY_TOWNS: readonly NearbyTown[] = [
  { name: 'Hasbergen', distanceKm: 8, durationMin: 10 },
  { name: 'Belm', distanceKm: 9, durationMin: 11 },
  { name: 'Georgsmarienhütte', distanceKm: 10, durationMin: 12 },
  { name: 'Lotte', distanceKm: 11, durationMin: 14 },
  { name: 'Wallenhorst', distanceKm: 12, durationMin: 15 },
  { name: 'Hagen a.T.W.', distanceKm: 13, durationMin: 18 },
  { name: 'Bissendorf', distanceKm: 14, durationMin: 15 },
  { name: 'Melle', distanceKm: 27, durationMin: 22 },
  { name: 'Ibbenbüren', distanceKm: 29, durationMin: 25 },
];
