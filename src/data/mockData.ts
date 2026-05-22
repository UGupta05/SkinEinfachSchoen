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
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI7k4a0k-0AIV49QX8oK4ISg4WMPv14WGf8cPQRTiKLEuzQfh-eqTakWlUi90zX1vXcKhikSGMUTRDLjXX68XzDHnfPVpd3B0lY4aT7_n2epvx-ID44m0xPv_diRKmW7VZLsSV5LLrmjTn5g40airfL3AzdR3HAnCfrycA0R1-zrvXFg_Qy5O8hAwJBEA9zmi2jUlaDJ6mVn2Jel87Nkd_Dt4Ehk37DhzEkRaWi2XLP0XYbejxVQyUg4uKp9SR5ISYCJ671Zfc4nQ"
  },
  {
    name: "Elena R.",
    role: "MEDICAL KOSMETIK ABONNENTIN",
    text: "Ein Ort der Ruhe und Professionalität. Das Team von SKiN ist fachlich unschlagbar und menschlich wunderbar herzlich.",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtk6NgjXPJU1_m4xOblWJg_RaO9P7TXXZSxX-pCy8KEIl2HWfVP1Jlp28_QsXDS4XQ-dsrV299I5TVyBApRcgi5BuLpoGiZx0Xjkp-1b6KoIP675Z2ZPAhydpMBNsMZjnmtCFPR3E8Z4c0pMwyTaD-yWpzB1GquB4qCUq3YGy-rcMxs-Z21Vdgh9EwaLJC8IeiIieYO6v3teGJv5jQhRjmIARtXc_JuasxDP2nZe2SolEwbAhYBTVgodeX7RQPpHVhSSnLmm4sHVA"
  },
  {
    name: "Thomas K.",
    role: "STAMMKUNDE",
    text: "Besonders die Laserbehandlungen haben bei mir Wunder gewirkt. Alles wird genau erklärt, man fühlt sich sicher und bestens aufgehoben.",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC44AXzaq2tE_oRfaKtaWj_AXCDUIgZ72Lro7vMydyV7tgY8slA00L0iSoDAWm0xZeQKyvh-9eZrYJKDn9jfqY-Ghcjww3hs81umdApO03deZkf70EMruYOz_8Tbsjyekfe2Bn-ci-DLW7RHrW8DLAWbjxe0f0TTo_XednWVNkFJuyQkyrtq_PA9T776en0QZexxXEgVQWprVm19nouH9RskUtxDe0_GskSniY5tI7e1D__yZB5GrV865bAfuGy_IN84bBXTR5OwM8"
  }
];

export const TEAM: readonly TeamMember[] = [
  {
    name: "Alexandra Becker",
    role: "Gründerin & Fachkosmetikerin",
    desc: "Spezialistin für medizinische Kosmetik und apparative Anti-Aging Verfahren mit über 15 Jahren Erfahrung.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uiMbeh8UHsokz-vTTyjbgnfdYWw_C0YYGKJVK35KlL9_PXJqfHRMZVN37XMnzz8iktFFbw7PENoh20AoE-216KV9f6VesvpAncMLaikTyEZGTZbatk_jxMGWExXYw12zOoyhlqS9iqdesqX6C10hyZfWdw-GnSfQrwiTR8OWRjOBcmZrBJ63YwO85tT_OQAIxuO11peX70OzuJEFZVSFkn7BvK15DNO5pzZzyLockOVxuXYelW8Jq0tuA"
  },
  {
    name: "Dr. med. Christian Schulze",
    role: "Dermatologischer Berater",
    desc: "Unterstützt unser Team bei medizinischen Fragen und der Entwicklung individueller Wirkstofftherapien.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uihCk7nr_2PTWcfk6oZneljS_GVVKaxyv2w_F1cHmQxKmlZxS28y4Gjj9wQsgeJ6bkZ3izO-fk02LmAcyVmqIYfBaKcpEeQTvSJVNoNGPqzpvczcEEaG6LtqkukPbYUfMxOJGR2l2xW6UIp38vebSDP9vot43d2Yo2pHPyZMn8KvdyUNRexIUBHO8Ba7g2IBlKf0g9TEUsHqnhZkoGbWtzFJYz18pnfwFMBep4Oqdwo5e_836JVhfxm7w"
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdAQGhNZiCxslTzEvKkProZNTwrAUT1XC99feQWGm-WPvYYoDZm-xpBuXcvToNyatDSslOqPD9SmEGkejImAujRlPsIUxj-aK20NYXTJvI5hgox2FfnBXNRatKIz-GPsLoxvCkYToEpwsE3dkHGX4FgWdMY0dXeFxgAjqAiTUE5QplT82piPiPZnidBFfhXOw_-Ww64aZPU7d3dzbaeOmXm7W3zOgGo6kHBbkMErMIGcQJOkyULauMaTtKGr72NSG8rT3XcR_TKkw",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6yBDjYAHvc36pmZxzxVVvnvq9UfTDOJPFx4MUvnj6llUk3BrdIemQA3AxUiOyPgD9IOsNRwBPlUd6GVu-C0iDY2UW9b-nEUIUfo67bbFCcdNF9DrtB5fZ093kTSD_zPL86TsGwvETS4HBxu0ouDRdj8qVhIoSSSAfOyjNgHjHMXzhFMCjKA2zvj-kSEXaj-LOow87bNKA_c8EKRdkD7cpGK2em_OvuBMllhJHDnSXYI8Dy-pkZW60CdU0f1vu-VZuzfd8eq4JK-U",
    description: "Hochkonzentriertes Serum für einen strahlenden Teint und Zellschutz.",
    rating: 5
  },
  {
    id: "sun-guard",
    name: "Sun Guard SPF 50+",
    category: "Sonnenschutz",
    price: 42.00,
    priceFormatted: "42,00 €",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdjCy9fjSdyCMiZg8OZejIYyHQ4rUYgH6VVt45UN4gqhsZDmSnl-r0V0ZIVv5fmyXlw-qaighGNPF9IaonGfOQ2nMvoQniuPdd0l2FnUZCJMxZY3nV7ApQlPzybsiAigMcmCdKcSaibyFU5DxsJQ6CyRnh40470hsxMSovcpMhtpYukEoX0KfPaDReA-G_eInYwSovM_6iLJQJfLnPgNGzFawuHnyduMeIqopsh_vpkJxAXsRUSEeTCfhPdjpAx3FdrQ0L-VxwSwc",
    description: "Ultraleichter Schutz vor UVA/UVB Strahlen ohne Weißeleffekt.",
    rating: 4
  },
  {
    id: "sanitize-gel",
    name: "Sanitize+ Care Gel",
    category: "Hygiene",
    price: 12.50,
    priceFormatted: "12,50 €",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgAEXvBDKzQygy2bgUPNaF4s-kMm_qQoi5Erzy5qlXN3jURzszyHaFAVvgEzs4asLI-F4s8rL1fMIHxLeqAK4uTtnRd1IP5BqlDDHNxvVxsDckD-b-x0oOKJVwjxpAM3o21vzKJYB4g973Da9UX3noOlcygtWvrIELtcGphHRB2dloz8cZ9jMFTkkGtqRGWBwk_Xp5JQu_31SkST0HYMsekL1tc8XalonRRt1VsfC5odKp1-60E2V-fBfitgQQHBuLzraTWLsrPmc",
    description: "Hautschonende Desinfektion mit rückfettenden Inhaltsstoffen.",
    rating: 3
  }
];

