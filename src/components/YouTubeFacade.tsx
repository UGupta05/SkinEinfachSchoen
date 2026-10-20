"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface YouTubeFacadeProps {
  readonly videoId: string;
  readonly title: string;
}

/**
 * Looks like the YouTube player but loads nothing from Google until the
 * visitor clicks play (GDPR: no IP transfer without an active decision).
 * The thumbnail is self-hosted under /images/videos/<id>.jpg.
 */
export function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group absolute inset-0 w-full h-full cursor-pointer"
      aria-label={`Video abspielen: ${title}`}
    >
      <Image
        src={`/images/videos/${videoId}.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover"
      />
      <span className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-4 pt-3 pb-8 text-left font-sans text-sm md:text-base text-white truncate">
        {title}
      </span>
      {/* YouTube-style play button */}
      <svg
        viewBox="0 0 68 48"
        className="absolute left-1/2 top-1/2 w-[68px] h-12 -translate-x-1/2 -translate-y-1/2 transition-opacity opacity-90 group-hover:opacity-100"
        aria-hidden="true"
      >
        <path
          d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
          className="fill-[#212121] group-hover:fill-[#f00] transition-colors"
          fillOpacity="0.8"
        />
        <path d="M45 24 27 14v20" fill="#fff" />
      </svg>
      <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 font-sans text-[10px] text-white/90">
        Beim Abspielen werden Daten an YouTube übertragen.
      </span>
    </button>
  );
}
