export interface TreatmentItem {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly icon: string;
  readonly link: string;
  readonly description: string;
}

export interface TestimonialItem {
  readonly name: string;
  readonly role: string;
  readonly text: string;
  readonly rating: number;
  readonly avatar: string;
}

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly desc: string;
  readonly image: string;
}

export const TREATMENTS: readonly TreatmentItem[] = [
  {
    id: "ipl",
    name: "Intense Pulsed Light (IPL)",
    category: "Anti-Aging & Haarentfernung",
    icon: "light_mode",
    link: "/leistungen/ipl",
    description: "Präzise Lichttechnologie zur dauerhaften Haarentfernung und Hautverjüngung. Wirkt effektiv gegen Pigmentflecken und vaskuläre Veränderungen."
  },
  {
    id: "visia",
    name: "Visia 3D Hautanalyse",
    category: "Hautanalyse",
    icon: "3d_rotation",
    link: "/leistungen/visia",
    description: "Blicken Sie unter die Oberfläche. Unsere computergestützte Analyse macht Poren, Falten und Sonnenschäden sichtbar, um Ihre Behandlung exakt zu planen."
  },
  {
    id: "jetpeel",
    name: "JetPeel Treatment",
    category: "High-Tech Hydration & Tiefenreinigung",
    icon: "water_drop",
    link: "/leistungen/jetpeel",
    description: "Nadelfreie Einschleusung von Wirkstoffen mittels Hochgeschwindigkeit. Reinigt porentief und hydratisiert die Haut in tiefsten Schichten."
  },
  {
    id: "mrf",
    name: "MRF Microneedling",
    category: "Straffung & Anti-Aging",
    icon: "grid_view",
    link: "/leistungen/microneedling",
    description: "Die ultimative Anti-Aging Waffe. Kombiniert Microneedling mit Radiofrequenz-Energie für maximale Kollagenstimulation und Hautstraffung."
  },
  {
    id: "brow",
    name: "Brow Lift",
    category: "Augen & Brauen",
    icon: "flare",
    link: "/leistungen/brow-lift",
    description: "Perfekt geformte Brauen für einen wachen, frischen Blick – langanhaltend und natürlich."
  },
  {
    id: "wimpern",
    name: "Wimpernlifting",
    category: "Augen & Wimpern",
    icon: "visibility",
    link: "/leistungen/wimpernlifting",
    description: "Professional Eyelash Extension und Lifting für atemberaubende Augenblicke jeden Tag."
  },
  {
    id: "meso",
    name: "Meso BB Glow",
    category: "Teint & Glow",
    icon: "brush",
    link: "/leistungen/meso-bb-glow",
    description: "Seidiges Hautbild und ein ebenmäßiger Teint ganz ohne tägliches Make-up."
  },
  {
    id: "kosmetik",
    name: "Klassische Kosmetik",
    category: "Gesichtspflege",
    icon: "face",
    link: "/leistungen/klassische-kosmetik",
    description: "Individuelle Gesichtsbehandlungen für Reinigung, Entspannung und langanhaltende Pflege."
  },
  {
    id: "saeure",
    name: "Fruchtsäure Peeling",
    category: "Hauterneuerung",
    icon: "science",
    link: "/leistungen/fruchtsaeure-peeling",
    description: "Medizinisch kontrollierte Peelings für ein verfeinertes Hautbild, gemilderte Fältchen und reinere Poren."
  }
];

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    name: "Sarah M.",
    role: "PREMIUM KUNDIN",
    text: "Die Hautanalyse war eine Offenbarung. Endlich verstehe ich, was meine Haut wirklich braucht. Die Ergebnisse sind nach 3 Behandlungen schon sichtbar.",
    rating: 5,
    avatar: "/images/team/avatar_elena.png"
  },
  {
    name: "Elena R.",
    role: "MEDICAL KOSMETIK ABONNENTIN",
    text: "Ein Ort der Ruhe und Professionalität. Das Team von SKiN ist fachlich unschlagbar und menschlich wunderbar herzlich.",
    rating: 5,
    avatar: "/images/team/avatar_martina.png"
  },
  {
    name: "Thomas K.",
    role: "STAMMKUNDE",
    text: "Besonders die Laserbehandlungen haben bei mir Wunder gewirkt. Alles wird genau erklärt, man fühlt sich sicher und bestens aufgehoben.",
    rating: 5,
    avatar: "/images/team/avatar_julian.png"
  }
];

export const TEAM: readonly TeamMember[] = [
  {
    name: "Alexandra Becker",
    role: "Gründerin & Fachkosmetikerin",
    desc: "Spezialistin für medizinische Kosmetik und apparative Anti-Aging Verfahren mit über 15 Jahren Erfahrung.",
    image: "/images/team/avatar_elena.png"
  },
  {
    name: "Dr. med. Christian Schulze",
    role: "Dermatologischer Berater",
    desc: "Unterstützt unser Team bei medizinischen Fragen und der Entwicklung individueller Wirkstofftherapien.",
    image: "/images/team/avatar_julian.png"
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

