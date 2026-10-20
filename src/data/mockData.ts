export interface TestimonialItem {
  readonly name: string;
  readonly role: string;
  readonly text: string;
  readonly rating: number;
  readonly avatar: string;
}

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    name: "Laura Schmitt",
    role: "Verifizierte Google-Rezension",
    text: "Sofia ist einfach fantastisch! Ich bin seit über zwei Jahren regelmäßige Kundin und meine Haut hat sich komplett verändert. Nach einer sehr professionellen Hautanalyse haben wir mit dem Microneedling und einer abgestimmten Heimpflege begonnen. Meine Rötungen sind fast vollständig verschwunden und das Hautbild wirkt viel frischer und straffer. Sofia nimmt sich immer unglaublich viel Zeit, erklärt jeden Schritt und berät extrem kompetent, ohne einem etwas aufzudrängen. Die ruhige und herzliche Atmosphäre im Studio ist jedes Mal wie ein kleiner Kurzurlaub. Absolute Herzensempfehlung!",
    rating: 5,
    avatar: "/images/team/avatar_elena.png"
  },
  {
    name: "Michael Peters",
    role: "Verifizierte Google-Rezension",
    text: "Ich war zur dauerhaften Haarentfernung bei SKIN einfach schön. Von der ersten ausführlichen Beratung bis zur eigentlichen Behandlung war alles absolut erstklassig. Das Studio ist super modern, extrem sauber und geschmackvoll eingerichtet. Die IPL-Behandlung war absolut schmerzfrei und die Ergebnisse nach nur wenigen Sitzungen sind verblüffend gut. Man merkt sofort, dass hier mit High-End-Geräten und absoluter Fachkompetenz gearbeitet wird. Wer Wert auf Professionalität, Ehrlichkeit und perfekte Ergebnisse legt, ist bei Sofia in den besten Händen!",
    rating: 5,
    avatar: "/images/team/avatar_martina.png"
  },
  {
    name: "Julia Wagner",
    role: "Verifizierte Google-Rezension",
    text: "Mein absolutes Highlight ist die JetPeel-Behandlung bei SKIN einfach schön. Meine feuchtigkeitsarme Haut sieht danach immer sofort prall, erholt und super frisch aus. Die Wirkstoffe werden spürbar tief in die Haut geschleust, ganz ohne Nadeln oder Schmerzen. Sofia berät mit einer so sympathischen, ruhigen Art, dass man sich sofort wohlfühlt. Sie schaut sich die Haut vor jeder Sitzung genau an und passt die Seren individuell an das aktuelle Hautbedürfnis an. Ich gehe jedes Mal tiefenentspannt und mit einem tollen Glow nach Hause. Einfach exzellent!",
    rating: 5,
    avatar: "/images/team/avatar_julian.png"
  }
];

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

