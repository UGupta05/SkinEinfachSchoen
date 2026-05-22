export interface OpeningHours {
  start: string; // "HH:MM" format (24h)
  end: string;   // "HH:MM" format (24h)
  isClosed?: boolean;
}

// 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
export const OPENING_HOURS: Record<number, OpeningHours> = {
  1: { start: "09:00", end: "18:30" }, // Monday
  2: { start: "09:00", end: "18:30" }, // Tuesday
  3: { start: "09:00", end: "18:30" }, // Wednesday
  4: { start: "09:00", end: "18:30" }, // Thursday
  5: { start: "09:00", end: "17:00" }, // Friday
  6: { start: "00:00", end: "00:00", isClosed: true }, // Saturday ("Nach Vereinbarung")
  0: { start: "00:00", end: "00:00", isClosed: true }, // Sunday
};
