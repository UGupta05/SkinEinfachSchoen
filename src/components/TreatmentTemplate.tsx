import React from 'react';
import { Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface TreatmentTemplateProps {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly duration: string;
  readonly price: string;
  readonly image: string;
}

export const TreatmentTemplate: React.FC<TreatmentTemplateProps> = ({
  title,
  category,
  description,
  points,
  duration,
  price,
  image
}) => {
  return (
    <div className="py-12 md:py-16 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Info Column */}
        <div className="lg:col-span-7 space-y-6">
          <span className="font-display text-xs font-bold text-sky-accent uppercase tracking-widest block">
            {category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">
            {title}
          </h1>
          <p className="font-sans text-base text-tertiary leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="bg-soft-shell p-6 rounded-lg border border-outline-variant/10 flex items-center gap-4">
              <Clock className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-primary">Behandlungsdauer</h4>
                <p className="font-sans text-sm text-tertiary mt-1">{duration}</p>
              </div>
            </div>
            <div className="bg-soft-shell p-6 rounded-lg border border-outline-variant/10 flex items-center gap-4">
              <Shield className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-primary">Preis ab</h4>
                <p className="font-sans text-sm text-tertiary mt-1 whitespace-nowrap">{price}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="font-display text-lg font-bold text-primary">Ihre Vorteile</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {points.map((pt, i) => (
                <li key={i} className="flex items-center gap-2 font-sans text-sm text-tertiary">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-accent shrink-0"></span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 flex flex-wrap gap-4">
            <Link
              to="/terminbuchung"
              className="bg-primary text-pure-white px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all text-center medical-glow"
            >
              Termin Buchen
            </Link>
            <Link
              to="/leistungen"
              className="border border-outline text-tertiary px-10 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-soft-shell transition-all text-center"
            >
              Alle Leistungen
            </Link>
          </div>
        </div>

        {/* Image Column */}
        <div className="lg:col-span-5 w-full h-[350px] md:h-[450px] overflow-hidden rounded-lg shadow-lg">
          <img alt={title} className="w-full h-full object-cover" src={image} />
        </div>

      </div>
    </div>
  );
};
