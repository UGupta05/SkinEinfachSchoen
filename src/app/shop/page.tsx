import React from 'react';
import { Metadata } from 'next';
import { ShopClient } from './ShopClient';

export const metadata: Metadata = {
  title: 'Hautpflege-Shop',
  description: 'Entdecken Sie unsere kuratierte Auswahl an medizinischen Kosmetikprodukten und exklusiven Heimpflege-Artikeln für ein dauerhaft strahlendes Hautbild.',
  alternates: {
    canonical: '/shop',
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
