import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { TerminAntwortClient } from './TerminAntwortClient';

export const metadata: Metadata = {
  title: 'Terminstatus | SKIN einfach schön',
  robots: 'noindex, nofollow',
};

export default function TerminAntwortPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[75vh] flex items-center justify-center">
        <p className="text-sm font-display font-bold uppercase tracking-wider text-primary">Terminstatus wird geladen...</p>
      </div>
    }>
      <TerminAntwortClient />
    </Suspense>
  );
}
