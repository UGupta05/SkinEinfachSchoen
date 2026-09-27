import { createHmac, timingSafeEqual } from 'crypto';

// Minimum time a human needs to fill the form, and how long a form token stays valid
const MIN_FILL_MS = 4 * 1000;
const MAX_TOKEN_AGE_MS = 3 * 60 * 60 * 1000;

const ALLOWED_BETREFF = ['Beratungstermin', 'Frage zu Leistungen', 'Produktanfrage', 'Sonstiges'];

function getSecret(): string {
  const secret = process.env.CONTACT_FORM_SECRET || process.env.RESEND_API_KEY;
  if (!secret) throw new Error('CONTACT_FORM_SECRET is not configured');
  return secret;
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

/** Issues a signed token carrying the time the form was loaded. */
export function createFormToken(): string {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

function verifyFormToken(token: unknown): string | null {
  if (typeof token !== 'string') return 'missing token';
  const [issuedAt, signature] = token.split('.');
  if (!issuedAt || !signature) return 'malformed token';

  const expected = Buffer.from(sign(issuedAt), 'hex');
  const given = Buffer.from(signature, 'hex');
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return 'invalid signature';

  const age = Date.now() - Number(issuedAt);
  if (!Number.isFinite(age) || age < MIN_FILL_MS) return 'submitted too fast';
  if (age > MAX_TOKEN_AGE_MS) return 'token expired';
  return null;
}

const URL_PATTERN = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(ru|xyz|top|click|online|site|shop|biz|info)\b)/gi;
const CYRILLIC_OR_CJK = /[Ѐ-ӿ぀-ヿ一-鿿]/;
const SPAM_PHRASES = [
  /\bseo\b/i, /\bbacklinks?\b/i, /\bcrypto|bitcoin|forex\b/i, /\bcasino\b/i, /\bviagra|cialis\b/i,
  /\bguest post/i, /\bweb ?design (services|agency)\b/i, /\brank(ing)? (your|on) google\b/i,
  /\blead generation\b/i, /\bmarketing (services|agency)\b/i, /\bunsubscribe\b/i,
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ContactPayload {
  vorname?: unknown;
  nachname?: unknown;
  email?: unknown;
  telefon?: unknown;
  betreff?: unknown;
  nachricht?: unknown;
  privacy?: unknown;
  website?: unknown; // honeypot
  formToken?: unknown;
}

/** Returns a reason string if the submission looks like spam, otherwise null. */
export function detectSpam(p: ContactPayload): string | null {
  // Honeypot: invisible to humans, bots fill every field
  if (typeof p.website === 'string' && p.website.trim() !== '') return 'honeypot filled';

  const tokenError = verifyFormToken(p.formToken);
  if (tokenError) return tokenError;

  if (p.privacy !== true) return 'privacy not accepted';
  if (typeof p.betreff !== 'string' || !ALLOWED_BETREFF.includes(p.betreff)) return 'unknown betreff';

  const vorname = String(p.vorname ?? '');
  const nachname = String(p.nachname ?? '');
  const nachricht = String(p.nachricht ?? '');
  const telefon = String(p.telefon ?? '');

  if (vorname.length > 60 || nachname.length > 60 || telefon.length > 40 || nachricht.length > 5000) {
    return 'field too long';
  }
  if (/[<>]|https?:|www\./i.test(vorname + nachname)) return 'url or markup in name';
  if (vorname.trim().toLowerCase() === nachname.trim().toLowerCase()) return 'identical first and last name';
  if (telefon && !/^[\d\s+()/.-]*$/.test(telefon)) return 'invalid phone';

  const urlCount = (nachricht.match(URL_PATTERN) || []).length;
  if (urlCount > 0) return 'links in message';
  if (CYRILLIC_OR_CJK.test(nachricht + vorname + nachname)) return 'foreign script';
  if (SPAM_PHRASES.some((re) => re.test(nachricht))) return 'spam phrase';

  return null;
}

export function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length <= 254 && EMAIL_PATTERN.test(email);
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
