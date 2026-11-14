import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export interface CardImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** Photo-led card: portrait image, serif title, short text and a "Mehr erfahren" cue. */
export function ImageLinkCard({
  href,
  title,
  text,
  image,
}: {
  readonly href: string;
  readonly title: string;
  readonly text: string;
  readonly image: CardImage;
}) {
  return (
    <Link href={href} className="group block h-full">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
        <Image
          alt={image.alt}
          src={image.src}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="font-display text-2xl text-primary mt-5">{title}</h3>
      <p className="font-sans text-sm text-tertiary leading-relaxed mt-2">{text}</p>
      <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary mt-3">
        Mehr erfahren
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
