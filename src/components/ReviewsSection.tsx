import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { getReviews } from '../lib/googleReviews';

const formatRating = (rating: number) => rating.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Homepage testimonials: best Google reviews, or curated fallback. */
export async function ReviewsSection() {
  const data = await getReviews();

  return (
    <section className="py-section-padding-lg bg-pure-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <ScrollReveal variant="blur-in" className="max-w-xl">
            <span className="font-display text-xs font-bold tracking-widest text-sky-accent uppercase mb-4 block">
              Stimmen
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Was unsere Kundinnen und Kunden sagen</h2>
          </ScrollReveal>
          {data.rating !== undefined && data.count !== undefined && (
            <p className="font-sans text-sm text-tertiary flex items-center gap-2">
              <Star className="w-5 h-5 text-sky-accent fill-current" aria-hidden="true" />
              <span>
                <strong className="text-primary">{formatRating(data.rating)} von 5</strong> bei {data.count} Bewertungen auf Google
              </span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {data.reviews.map((r, idx) => {
            const highlighted = idx === 1;
            return (
              <ScrollReveal
                key={`${r.author}-${idx}`}
                variant="fade-in-up"
                delay={idx * 150}
                className={`p-10 medical-glow rounded-lg flex flex-col justify-between transition-transform duration-500 hover:scale-[1.02] ${
                  highlighted ? 'bg-primary text-pure-white' : 'bg-soft-shell text-primary'
                }`}
              >
                <figure className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex gap-1 mb-6 text-sky-accent" aria-label={`${r.rating} von 5 Sternen`}>
                      {Array.from({ length: r.rating }, (_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className={`font-sans text-base italic mb-8 leading-relaxed whitespace-pre-line ${highlighted ? 'text-pure-white' : 'text-primary'}`}>
                      „{r.text}“
                    </blockquote>
                  </div>
                  <figcaption className="mt-4 border-t border-outline-variant/10 pt-4">
                    <p className={`font-display text-xs font-bold uppercase tracking-wider ${highlighted ? 'text-pure-white' : 'text-primary'}`}>
                      {r.authorUrl ? (
                        <a href={r.authorUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">
                          {r.author}
                        </a>
                      ) : (
                        r.author
                      )}
                    </p>
                    <p className={`text-[10px] font-display font-bold uppercase tracking-widest mt-1 ${highlighted ? 'text-primary-fixed-dim' : 'text-tertiary'}`}>
                      {data.source === 'google' ? `Google-Rezension${r.when ? ` · ${r.when}` : ''}` : r.when}
                    </p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href={data.allReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-primary hover:text-sky-accent transition-colors"
          >
            Alle Rezensionen auf Google ansehen
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
          {data.source === 'google' && (
            <p className="font-sans text-[11px] text-tertiary mt-3">Bewertungen von Google, regelmäßig aktualisiert.</p>
          )}
        </div>
      </div>
    </section>
  );
}
