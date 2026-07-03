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
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-in-up',
  delay = 0,
  duration,
  threshold = 0.05,
  className = '',
  once = true,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [once, threshold]);

  const animationClass = isIntersecting ? `animate-${variant}` : 'opacity-0';

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
