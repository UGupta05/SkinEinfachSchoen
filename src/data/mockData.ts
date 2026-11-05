export interface ProductItem {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly priceFormatted: string;
  readonly image: string;
  readonly description: string;
  readonly rating: number;
  readonly bestseller?: boolean;
}

export const PRODUCTS: readonly ProductItem[] = [
  {
    id: "cleansing-gel",
    name: "Deep Cleansing Gel",
    category: "Reinigung",
    price: 34.00,
    priceFormatted: "34,00 €",
    image: "/images/products/cleanse_gel.png",
    description: "Porentiefe Reinigung mit Hyaluronsäure für ein klares Hautbild.",
    rating: 4,
    bestseller: true
  },
  {
    id: "vitamin-c",
    name: "Vitamin C Booster",
    category: "Anti-Aging",
    price: 68.00,
    priceFormatted: "68,00 €",
    image: "/images/products/vitamin_c.png",
    description: "Hochkonzentriertes Serum für einen strahlenden Teint und Zellschutz.",
    rating: 5
  },
  {
    id: "sun-guard",
    name: "Sun Guard SPF 50+",
    category: "Sonnenschutz",
    price: 42.00,
    priceFormatted: "42,00 €",
    image: "/images/products/sun_guard.png",
    description: "Ultraleichter Schutz vor UVA/UVB Strahlen ohne Weißeleffekt.",
    rating: 4
  },
  {
    id: "sanitize-gel",
    name: "Sanitize+ Care Gel",
    category: "Hygiene",
    price: 12.50,
    priceFormatted: "12,50 €",
    image: "/images/products/sanitize_gel.png",
    description: "Hautschonende Desinfektion mit rückfettenden Inhaltsstoffen.",
    rating: 3
  }
];

