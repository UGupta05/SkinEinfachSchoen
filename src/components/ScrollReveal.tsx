"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  readonly children: React.ReactNode;
  readonly variant?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'blur-in';
  readonly delay?: number; // in ms
  readonly duration?: number; // in ms
  readonly threshold?: number;
  readonly className?: string;
  readonly once?: boolean;
  /**
   * Start the animation on first paint instead of waiting for hydration and
   * the IntersectionObserver. Use for above-the-fold content (hero, H1) so it
   * doesn't delay Largest Contentful Paint.
   */
  readonly immediate?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-in-up',
  delay = 0,
  duration,
  threshold = 0.05,
  className = '',
  once = true,
  immediate = false,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(immediate);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) return;
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold, immediate]);

  // 'reveal-pending' only hides content once the inline script in the root
  // layout has marked the document as JS-enabled, so crawlers and visitors
  // without JavaScript always see the content.
  const animationClass = isIntersecting ? `animate-${variant}` : 'reveal-pending';

  const style: React.CSSProperties = {
    animationDelay: `${delay}ms`,
  };

  if (duration !== undefined) {
    style.animationDuration = `${duration}ms`;
  }

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
