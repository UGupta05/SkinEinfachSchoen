import React from 'react';
import { AlertTriangle, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/4917655132650';
const INSTAGRAM_DM_URL = 'https://ig.me/m/skin_einfach_schoen';

const buttonClass =
  'inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-primary/30 bg-pure-white/60 px-3 py-1.5 md:px-4 md:py-2 font-sans text-xs font-medium text-primary hover:bg-primary hover:text-pure-white hover:border-primary transition-colors';

// Site-wide hint: ZO products with 0.5–1 % retinol can no longer be sold in Germany from 2027.
export const RetinolNotice: React.FC = () => (
  <div className="bg-sand text-on-surface-variant border-b border-outline-variant/60">
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-3 flex items-center gap-3 md:gap-5">
      <img
        src="/images/retinol-hinweis.jpg"
        alt="ZO Skin Health Retinol-Produkte im Regal"
        className="w-12 h-16 md:w-20 md:h-24 shrink-0 object-cover object-[50%_30%] rounded-lg"
      />
      <div className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
        {/* Short copy on phones so the notice doesn't push the page content down */}
        <p className="md:hidden font-sans text-xs leading-snug">
          <strong className="font-semibold text-on-surface">Nur solange der Vorrat reicht:</strong>{' '}
          Retinol 0,5–1&nbsp;% ist ab 2027 in Deutschland nicht mehr erhältlich – jetzt reservieren.
        </p>
        <p className="hidden md:block font-sans text-sm leading-relaxed">
          <span className="inline-flex items-center gap-2 font-semibold text-on-surface mr-1">
            <AlertTriangle className="w-4 h-4 text-sky-accent" aria-hidden="true" />
            Nur solange der Vorrat reicht:
          </span>
          Retinol-Produkte mit 0,5–1&nbsp;% Retinol dürfen ab 2027 in Deutschland nicht mehr verkauft werden.
          Wir haben rechtzeitig vorbestellt – sichern Sie sich jetzt Ihren Vorrat bei uns im Studio.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={buttonClass}>
            <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Per </span>WhatsApp<span className="hidden sm:inline"> reservieren</span>
          </a>
          <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className={buttonClass}>
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="hidden sm:inline">Per </span>Instagram<span className="hidden sm:inline"> reservieren</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);
