"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Welche kosmetischen Behandlungen bieten Sie in Osnabrück an?",
    answer: "Wir bieten ein breites Spektrum an hocheffektiven Gesichtsbehandlungen an, darunter das innovative JetPeel, Radiofrequenz-Microneedling (MRF), dauerhafte IPL-Haarentfernung, Meso BB Glow für einen ebenmäßigen Teint, klassische Kosmetikanwendungen sowie die wissenschaftlich fundierte Orthomolekulare Medizin."
  },
  {
    question: "Warum ist eine professionelle Hautanalyse vor einer Behandlung sinnvoll?",
    answer: "Mit unserer computergestützten VISIA® 3D Hautanalyse blicken wir tief unter Ihre Hautoberfläche, um Flecken, Falten, UV-Schäden und Poren präzise zu analysieren. Nur auf Basis dieser exakten Daten können wir eine maßgeschneiderte Behandlung und Heimpflege zusammenstellen, die genau Ihren Bedürfnissen entspricht."
  },
  {
    question: "Wie funktioniert die Orthomolekulare Medizin für die Haut?",
    answer: "Die Orthomolekulare Medizin setzt auf totale Personalisierung statt des Gießkannenprinzips. Auf Basis Ihrer individuellen Laborwerte und einer fundierten Diagnostik stellen wir einen maßgeschneiderten Nährstoff-Cocktail zusammen. Dadurch erhält Ihre Haut exakt die Moleküle, die sie zur Regeneration und Barrieredezimierung benötigt."
  },
  {
    question: "Wie kann ich online einen Termin in Ihrem Studio buchen?",
    answer: "Sie können Ihren Wunschtermin ganz einfach und bequem rund um die Uhr online über unsere integrierte Terminbuchung auswählen. Klicken Sie dazu einfach auf einen der 'Termin buchen'-Buttons auf unserer Website."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <ScrollReveal
            key={idx}
            variant="fade-in-up"
            delay={idx * 100}
            className="bg-soft-shell/40 rounded-xl border border-outline-variant/10 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleItem(idx)}
              className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-soft-shell/60 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-display text-sm md:text-base font-bold text-primary">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-60 border-t border-outline-variant/5' : 'max-h-0'
              }`}
            >
              <div className="p-6 font-sans text-sm text-tertiary leading-relaxed bg-pure-white">
                {item.answer}
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
