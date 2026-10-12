import React from 'react';
import { AlertTriangle, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/4917655132650';
const INSTAGRAM_DM_URL = 'https://ig.me/m/skin_einfach_schoen';

const buttonClass =
  'inline-flex items-center gap-1.5 md:gap-2 border border-pure-white/70 px-3 py-1.5 md:px-4 md:py-2 font-display text-[10px] font-bold uppercase tracking-widest hover:bg-pure-white hover:text-primary transition-colors';

// Site-wide hint: ZO products with 0.5–1 % retinol can no longer be sold in Germany from 2027.
export const RetinolNotice: React.FC = () => (
  <div className="bg-primary text-pure-white border-b border-primary-container">
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-3 md:py-4 flex items-center gap-3 md:gap-6">
      <img
        src="/images/retinol-hinweis.jpg"
        alt="ZO Skin Health Retinol-Produkte im Regal"
        className="w-14 h-20 md:w-28 md:h-36 shrink-0 object-cover object-[50%_30%] rounded border border-pure-white/30"
      />
      <div className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
        {/* Short copy on phones so the notice doesn't push the page content down */}
        <p className="md:hidden font-sans text-xs leading-snug">
          <strong className="font-display uppercase tracking-wider">Nur solange der Vorrat reicht:</strong>{' '}
          Retinol 0,5–1&nbsp;% ist ab 2027 in Deutschland nicht mehr erhältlich – jetzt reservieren.
        </p>
        <p className="hidden md:block font-sans text-sm leading-relaxed">
          <span className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wider text-xs mr-2">
            <AlertTriangle className="w-4 h-4 text-primary-fixed" aria-hidden="true" />
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
