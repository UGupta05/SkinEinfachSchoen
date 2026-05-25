import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { OPENING_HOURS } from '../config/openingHours';
import { 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  Shield, 
  Calendar, 
  Users, 
  Clock,
  Smile,
  Droplet,
  User,
  Activity,
  Wind,
  ShieldCheck,
  TrendingUp,
  Zap,
  Target,
  Search,
  Layers,
  Sparkle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface BookingService {
  id: string;
  name: string;
  categoryTag: string;
  categoryChip: string;
  price: string;
  priceVal: number;
  duration: string;
  description: string;
  notBookableOnline?: boolean;
}

const CATEGORIES = [
  "Alle",
  "Kosmetische Behandlungen",
  "Fruchtsäure & Peelings",
  "IPL Pakete (Mann)",
  "Microneedling",
  "JetPeel",
  "ZO Skin Health",
  "Radiofrequenz Straffung",
  "Lifting",
  "Gesichtsstraffung (IPL/Laser)",
  "Fraktionierte RF / Needling",
  "Hautanalyse",
  "IPL Pakete (Frauen)",
  "IPL Haarentfernung",
  "Zusatzbehandlungen"
];

const CATEGORY_GROUPS = [
  {
    name: "Übersicht",
    categories: ["Alle"]
  },
  {
    name: "Kosmetik & Hautpflege",
    categories: [
      "Kosmetische Behandlungen",
      "Fruchtsäure & Peelings",
      "ZO Skin Health",
      "JetPeel",
      "Hautanalyse",
      "Zusatzbehandlungen"
    ]
  },
  {
    name: "Anti-Aging & Straffung",
    categories: [
      "Microneedling",
      "Radiofrequenz Straffung",
      "Lifting",
      "Fraktionierte RF / Needling",
      "Gesichtsstraffung (IPL/Laser)"
    ]
  },
  {
    name: "Dauerhafte Haarentfernung",
    categories: [
      "IPL Haarentfernung",
      "IPL Pakete (Frauen)",
      "IPL Pakete (Mann)"
    ]
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Alle":
      return <Layers className="w-4 h-4" />;
    case "Kosmetische Behandlungen":
      return <Smile className="w-4 h-4" />;
    case "Fruchtsäure & Peelings":
      return <Droplet className="w-4 h-4" />;
    case "IPL Pakete (Mann)":
      return <User className="w-4 h-4" />;
    case "Microneedling":
      return <Activity className="w-4 h-4" />;
    case "JetPeel":
      return <Wind className="w-4 h-4" />;
    case "ZO Skin Health":
      return <ShieldCheck className="w-4 h-4" />;
    case "Radiofrequenz Straffung":
      return <Zap className="w-4 h-4" />;
    case "Lifting":
      return <TrendingUp className="w-4 h-4" />;
    case "Gesichtsstraffung (IPL/Laser)":
      return <Target className="w-4 h-4" />;
    case "Fraktionierte RF / Needling":
      return <Activity className="w-4 h-4" />;
    case "Hautanalyse":
      return <Search className="w-4 h-4" />;
    case "IPL Pakete (Frauen)":
      return <User className="w-4 h-4 text-pink-500/80" />;
    case "IPL Haarentfernung":
      return <Sparkle className="w-4 h-4" />;
    case "Zusatzbehandlungen":
      return <Sparkles className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

const BOOKING_SERVICES: BookingService[] = [
  {
    id: "reinigungsbehandlung_inklusive_microdermabrasion_0",
    name: "Reinigungsbehandlung inklusive Microdermabrasion",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "80 €",
    priceVal: 80,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen."
  },
  {
    id: "augenbrauenkorrektur_1",
    name: "Augenbrauenkorrektur",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen.",
    notBookableOnline: true
  },
  {
    id: "augenbrauen_wimpern_färben_2",
    name: "Augenbrauen & Wimpern färben",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen.",
    notBookableOnline: true
  },
  {
    id: "wimpern_färben_3",
    name: "Wimpern färben",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen."
  },
  {
    id: "microdermabrasion_als_zuschlag_zu_einer_behandlung_4",
    name: "Microdermabrasion als Zuschlag zu einer Behandlung",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "15 €",
    priceVal: 15,
    duration: "5 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen."
  },
  {
    id: "warmwachs_5",
    name: "Warmwachs",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "ab 10 €",
    priceVal: 10,
    duration: "10 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen.",
    notBookableOnline: true
  },
  {
    id: "reinigungsbehandlung_milien_entfernung_inklusive_beruhigungsmaske_6",
    name: "Reinigungsbehandlung / Milien-Entfernung inklusive Beruhigungsmaske",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "80 €",
    priceVal: 80,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen."
  },
  {
    id: "valentinstags_angebot_für_den_ganzen_februar_zo_skin_health_glow_up_peel_7",
    name: "Valentinstags Angebot für den ganzen Februar Zo Skin Health glow up Peel",
    categoryTag: "Kosmetische Behandlungen",
    categoryChip: "Kosmetische Behandlungen",
    price: "89 €",
    priceVal: 89,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Kosmetische Behandlungen."
  },
  {
    id: "fruchtsäure_behandlung_bei_akne_große_poren_narben_8",
    name: "Fruchtsäure-Behandlung bei Akne / große Poren / Narben",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "99 €",
    priceVal: 99,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_behandlung_anti_aging_9",
    name: "Fruchtsäure-Behandlung Anti Aging",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "125 €",
    priceVal: 125,
    duration: "40 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_behandlung_bei_pigmentflecken_10",
    name: "Fruchtsäure-Behandlung bei Pigmentflecken",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "125 €",
    priceVal: 125,
    duration: "40 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_behandlung_mit_tca_gesicht_11",
    name: "Fruchtsäure-Behandlung mit TCA Gesicht",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "229 €",
    priceVal: 229,
    duration: "40 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_behandlung_mit_tca_gesicht_hals_dekolleté_12",
    name: "Fruchtsäure-Behandlung mit TCA Gesicht & Hals& Dekolleté",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "229 €",
    priceVal: 229,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_behandlung_mit_phentca_gesicht_13",
    name: "Fruchtsäure-Behandlung mit PhenTCA Gesicht",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "229 €",
    priceVal: 229,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_behandlung_mit_phen_tca_gesicht_hals_dekolleté_14",
    name: "Fruchtsäure-Behandlung mit Phen TCA Gesicht & Hals& Dekolleté",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "450 €",
    priceVal: 450,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_to_go_für_mehr_glow_15",
    name: "Fruchtsäure to go für mehr Glow",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "125 €",
    priceVal: 125,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "fruchtsäure_bei_augenschatten_16",
    name: "Fruchtsäure bei Augenschatten",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "89 €",
    priceVal: 89,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "waxing_17",
    name: "Waxing",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "ab 10 €",
    priceVal: 10,
    duration: "10 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings.",
    notBookableOnline: true
  },
  {
    id: "zo_skin_health_glow_up_stimulate_peeling_18",
    name: "Zo Skin Health Glow Up Stimulate Peeling",
    categoryTag: "Fruchtsäure / chemisches Peeling",
    categoryChip: "Fruchtsäure & Peelings",
    price: "125 €",
    priceVal: 125,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Fruchtsäure & Peelings."
  },
  {
    id: "ipl_paket_1_mann_rücken_schulter_nacken_19",
    name: "IPL Paket 1 Mann: Rücken Schulter & Nacken",
    categoryTag: "IPL Dauerhafte Haarentfernung Pakete Mann",
    categoryChip: "IPL Pakete (Mann)",
    price: "313 €",
    priceVal: 313,
    duration: "40 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Mann)."
  },
  {
    id: "ipl_paket_2_mann_rücken_schulter_nacken_oberarme_20",
    name: "IPL Paket 2 Mann: Rücken Schulter, Nacken & Oberarme",
    categoryTag: "IPL Dauerhafte Haarentfernung Pakete Mann",
    categoryChip: "IPL Pakete (Mann)",
    price: "338 €",
    priceVal: 338,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Mann)."
  },
  {
    id: "ipl_paket_3_mann_rücken_schulter_nacken_brust_21",
    name: "IPL Paket 3 Mann: Rücken Schulter, Nacken & Brust",
    categoryTag: "IPL Dauerhafte Haarentfernung Pakete Mann",
    categoryChip: "IPL Pakete (Mann)",
    price: "412 €",
    priceVal: 412,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Mann)."
  },
  {
    id: "ipl_paket_4_mann_arme_und_achseln_22",
    name: "IPL Paket 4 Mann: Arme und Achseln",
    categoryTag: "IPL Dauerhafte Haarentfernung Pakete Mann",
    categoryChip: "IPL Pakete (Mann)",
    price: "160 €",
    priceVal: 160,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Mann)."
  },
  {
    id: "ipl_paket_5_mann_rücken_schulter_nacken_achseln_oberarme_brust_bauch_23",
    name: "IPL Paket 5 Mann: Rücken Schulter, Nacken, Achseln, Oberarme, Brust, Bauch",
    categoryTag: "IPL Dauerhafte Haarentfernung Pakete Mann",
    categoryChip: "IPL Pakete (Mann)",
    price: "499 €",
    priceVal: 499,
    duration: "1 Std. 10 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Mann)."
  },
  {
    id: "ipl_paket_6_mann_rücken_schulter_brust_24",
    name: "IPL Paket 6 Mann: Rücken Schulter, Brust",
    categoryTag: "IPL Dauerhafte Haarentfernung Pakete Mann",
    categoryChip: "IPL Pakete (Mann)",
    price: "285 €",
    priceVal: 285,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Mann)."
  },
  {
    id: "ipl_nacken_rücken_25",
    name: "IPL Nacken Rücken",
    categoryTag: "IPL Dauerhafte Haarentfernung Pakete Mann",
    categoryChip: "IPL Pakete (Mann)",
    price: "199 €",
    priceVal: 199,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Mann)."
  },
  {
    id: "needling_behandlung_narben_26",
    name: "Needling Behandlung Narben",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "von 100 € bis 220 €",
    priceVal: 100,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "needling_behandlung_27",
    name: "Needling Behandlung",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "225 €",
    priceVal: 225,
    duration: "40 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "needling_behandlung_gesicht_und_hals_28",
    name: "Needling Behandlung Gesicht und Hals",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "255 €",
    priceVal: 255,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "needling_behandlung_gesicht_und_hals_und_dekolleté_29",
    name: "Needling Behandlung Gesicht und Hals und Dekolleté",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "299 €",
    priceVal: 299,
    duration: "1 Std. 10 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "microneedling_u_radiofrequenz_mrf_gesicht_30",
    name: "Microneedling u. Radiofrequenz MRF Gesicht",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "255 €",
    priceVal: 255,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "microneedling_u_radiofrequenz_mrf_gesicht_hals_31",
    name: "Microneedling u. Radiofrequenz MRF Gesicht& Hals",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "299 €",
    priceVal: 299,
    duration: "1 Std. 10 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "microneedling_u_radiofrequenz_mrf_gesicht_hals_dekolleté_32",
    name: "Microneedling u. Radiofrequenz MRF Gesicht &Hals& Dekolleté",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "349 €",
    priceVal: 349,
    duration: "1 Std. 20 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "märz_angebot_mrf_radiofrequenz_needling_jetpeel_33",
    name: "März Angebot MRF (Radiofrequenz / needling + jetpeel",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "369 €",
    priceVal: 369,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "aufschlag_exosomen_34",
    name: "Aufschlag Exosomen",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "5 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "needling_jetpeel_kombi_angebot_35",
    name: "Needling Jetpeel Kombi Angebot",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "299 €",
    priceVal: 299,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "needling_jetpeel_kombi_mit_atx_36",
    name: "Needling Jetpeel Kombi mit ATX",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "280 €",
    priceVal: 280,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "needling_hals_dekollete_37",
    name: "Needling Hals Dekollete",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "270 €",
    priceVal: 270,
    duration: "40 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "biostimulator_polynukl_exosomen_12_f_hyaloron_needling_38",
    name: "Biostimulator Polynukl.+Exosomen+12 F Hyaloron Needling",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "299 €",
    priceVal: 299,
    duration: "50 Min.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "biostimulator_polynukl_exosomen_12_f_hyaloron_needling_jetpeel_kombi_39",
    name: "Biostimulator Polynukl.+Exosomen+12 F Hyaloron Needling Jetpeel Kombi",
    categoryTag: "Microneedling",
    categoryChip: "Microneedling",
    price: "349 €",
    priceVal: 349,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Microneedling."
  },
  {
    id: "jetpeel_gesichtsbehandlung_40",
    name: "Jetpeel Gesichtsbehandlung",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "170 €",
    priceVal: 170,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_gesicht_hals_41",
    name: "Jetpeel Gesicht& Hals",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "199 €",
    priceVal: 199,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_gesicht_hals_dekolete_42",
    name: "Jetpeel Gesicht&Hals&Dekolete",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "225 €",
    priceVal: 225,
    duration: "1 Std. 10 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_mensworld_43",
    name: "Jetpeel Mensworld",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "170 €",
    priceVal: 170,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_eyebrowlift_44",
    name: "Jetpeel Eyebrowlift",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "99 €",
    priceVal: 99,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_lipvolume_45",
    name: "Jetpeel Lipvolume",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "99 €",
    priceVal: 99,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_hand_46",
    name: "Jetpeel Hand",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "129 €",
    priceVal: 129,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_vorteilspaket_3_behandlungen_47",
    name: "Jetpeel Vorteilspaket 3 Behandlungen",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "483,30 €",
    priceVal: 483.3,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_vorteilspaket_5_behandlungen_48",
    name: "Jetpeel Vorteilspaket 5 Behandlungen",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "760,75 €",
    priceVal: 760.75,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_vorteilspaket_7_behandlungen_49",
    name: "Jetpeel Vorteilspaket 7 Behandlungen",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "1065,05 €",
    priceVal: 1065.05,
    duration: "45 Min.",
    description: "+Zusatzdienstleistung"
  },
  {
    id: "angebot_juli_jetpeel_needling_50",
    name: "Angebot Juli Jetpeel + Needling",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "289 €",
    priceVal: 289,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_to_go_51",
    name: "Jetpeel to go",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "80 €",
    priceVal: 80,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_hals_52",
    name: "Jetpeel Hals",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "50 €",
    priceVal: 50,
    duration: "10 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "jetpeel_mit_atx_botoxersatz_53",
    name: "Jetpeel mit ATX Botoxersatz",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "190 €",
    priceVal: 190,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "biostimulator_polynukl_exosomen_12_f_hyaloron_needling_jetpeel_kombination_54",
    name: "Biostimulator Polynukl.+Exosomen+12 F Hyaloron Needling Jetpeel Kombination",
    categoryTag: "Jetpeel",
    categoryChip: "JetPeel",
    price: "349 €",
    priceVal: 349,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie JetPeel."
  },
  {
    id: "dr_obagi_zo_skin_3_step_peel_inklusive_heimpflege_55",
    name: "Dr. Obagi Zo Skin 3 Step Peel inklusive Heimpflege",
    categoryTag: "Dr Obagi Zo Skin Health",
    categoryChip: "ZO Skin Health",
    price: "330 €",
    priceVal: 330,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie ZO Skin Health.",
    notBookableOnline: true
  },
  {
    id: "bauch_56",
    name: "Bauch",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "130 €",
    priceVal: 130,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "rücken_57",
    name: "Rücken",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "99 €",
    priceVal: 99,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "oberschenkel_vorne_58",
    name: "Oberschenkel vorne",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "99 €",
    priceVal: 99,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "oberschenkel_hinten_59",
    name: "Oberschenkel hinten",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "99 €",
    priceVal: 99,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "gesicht_hals_60",
    name: "Gesicht & Hals",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "130 €",
    priceVal: 130,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "arme_61",
    name: "Arme",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "130 €",
    priceVal: 130,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "mrf_auge_62",
    name: "MRF Auge",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "150 €",
    priceVal: 150,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "rf_hals_63",
    name: "RF Hals",
    categoryTag: "Radiofrequenzbehandlungen zur Straffung",
    categoryChip: "Radiofrequenz Straffung",
    price: "89 €",
    priceVal: 89,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Radiofrequenz Straffung."
  },
  {
    id: "lashlifting_64",
    name: "Lashlifting",
    categoryTag: "Lifting",
    categoryChip: "Lifting",
    price: "69 €",
    priceVal: 69,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Lifting."
  },
  {
    id: "lashlifting_inklusive_färben_65",
    name: "Lashlifting inklusive Färben",
    categoryTag: "Lifting",
    categoryChip: "Lifting",
    price: "75 €",
    priceVal: 75,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Lifting."
  },
  {
    id: "browlifting_66",
    name: "Browlifting",
    categoryTag: "Lifting",
    categoryChip: "Lifting",
    price: "69 €",
    priceVal: 69,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie Lifting."
  },
  {
    id: "browlifting_inklusive_färben_67",
    name: "Browlifting inklusive Färben",
    categoryTag: "Lifting",
    categoryChip: "Lifting",
    price: "75 €",
    priceVal: 75,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Lifting."
  },
  {
    id: "lash_browlifting_kombi_68",
    name: "Lash - Browlifting kombi",
    categoryTag: "Lifting",
    categoryChip: "Lifting",
    price: "120 €",
    priceVal: 120,
    duration: "1 Std. 10 Min.",
    description: "Individuelle Behandlung der Kategorie Lifting."
  },
  {
    id: "altersflecken_handrücken_pro_hand_69",
    name: "Altersflecken Handrücken ( pro Hand )",
    categoryTag: "Lifting",
    categoryChip: "Lifting",
    price: "60 €",
    priceVal: 60,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Lifting."
  },
  {
    id: "gesichtsbereich_kleine_stellen_70",
    name: "Gesichtsbereich kleine Stellen",
    categoryTag: "Gesichtsstraffung mit IPL / Laser",
    categoryChip: "Gesichtsstraffung (IPL/Laser)",
    price: "99 €",
    priceVal: 99,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie Gesichtsstraffung (IPL/Laser)."
  },
  {
    id: "nasolabial_71",
    name: "Nasolabial",
    categoryTag: "Gesichtsstraffung mit IPL / Laser",
    categoryChip: "Gesichtsstraffung (IPL/Laser)",
    price: "59 €",
    priceVal: 59,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Gesichtsstraffung (IPL/Laser)."
  },
  {
    id: "gesicht_komplett_72",
    name: "Gesicht komplett",
    categoryTag: "Gesichtsstraffung mit IPL / Laser",
    categoryChip: "Gesichtsstraffung (IPL/Laser)",
    price: "150 €",
    priceVal: 150,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie Gesichtsstraffung (IPL/Laser)."
  },
  {
    id: "sr_kinn_wangen_73",
    name: "SR Kinn & Wangen",
    categoryTag: "Gesichtsstraffung mit IPL / Laser",
    categoryChip: "Gesichtsstraffung (IPL/Laser)",
    price: "130 €",
    priceVal: 130,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Gesichtsstraffung (IPL/Laser)."
  },
  {
    id: "altersflecken_hand_oder_gesicht_74",
    name: "Altersflecken Hand oder Gesicht",
    categoryTag: "Gesichtsstraffung mit IPL / Laser",
    categoryChip: "Gesichtsstraffung (IPL/Laser)",
    price: "von 45 € bis 90 €",
    priceVal: 45,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie Gesichtsstraffung (IPL/Laser)."
  },
  {
    id: "radiofrequenz_needling_gesicht_75",
    name: "Radiofrequenz / Needling Gesicht",
    categoryTag: "Fraktionierte Radiofrequenz / Needling",
    categoryChip: "Fraktionierte RF / Needling",
    price: "259 €",
    priceVal: 259,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Fraktionierte RF / Needling."
  },
  {
    id: "radiofrequenz_needling_gesicht_hals_76",
    name: "Radiofrequenz / Needling Gesicht & Hals",
    categoryTag: "Fraktionierte Radiofrequenz / Needling",
    categoryChip: "Fraktionierte RF / Needling",
    price: "279 €",
    priceVal: 279,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Fraktionierte RF / Needling."
  },
  {
    id: "radiofrequenz_needling_gesicht_hals_dekolleté_77",
    name: "Radiofrequenz / Needling Gesicht & Hals & Dekolleté",
    categoryTag: "Fraktionierte Radiofrequenz / Needling",
    categoryChip: "Fraktionierte RF / Needling",
    price: "310 €",
    priceVal: 310,
    duration: "1 Std. 10 Min.",
    description: "Individuelle Behandlung der Kategorie Fraktionierte RF / Needling."
  },
  {
    id: "mrf_bauch_78",
    name: "MRF Bauch",
    categoryTag: "Fraktionierte Radiofrequenz / Needling",
    categoryChip: "Fraktionierte RF / Needling",
    price: "250 €",
    priceVal: 250,
    duration: "25 Min.",
    description: "Individuelle Behandlung der Kategorie Fraktionierte RF / Needling."
  },
  {
    id: "radiofrequenz_needling_mit_jetpeel_angebot_jubiläum_79",
    name: "Radiofrequenz needling mit Jetpeel Angebot Jubiläum",
    categoryTag: "Fraktionierte Radiofrequenz / Needling",
    categoryChip: "Fraktionierte RF / Needling",
    price: "380 €",
    priceVal: 380,
    duration: "1 Std.",
    description: "Individuelle Behandlung der Kategorie Fraktionierte RF / Needling."
  },
  {
    id: "biostimulator_polynukl_exosomen_12_f_hyaloron_radiofrequenz_needling_jetpeel_kombination_80",
    name: "Biostimulator Polynukl.+Exosomen+12 F Hyaloron Radiofrequenz/Needling Jetpeel Kombination",
    categoryTag: "Fraktionierte Radiofrequenz / Needling",
    categoryChip: "Fraktionierte RF / Needling",
    price: "379 €",
    priceVal: 379,
    duration: "1 Std. 30 Min.",
    description: "Individuelle Behandlung der Kategorie Fraktionierte RF / Needling."
  },
  {
    id: "3_d_visia_hautanalyse_ohne_behandlung_81",
    name: "3 D Visia Hautanalyse ohne Behandlung",
    categoryTag: "Hautanalyse",
    categoryChip: "Hautanalyse",
    price: "79 €",
    priceVal: 79,
    duration: "45 Min.",
    description: "Individuelle Behandlung der Kategorie Hautanalyse."
  },
  {
    id: "kurze_haut_oder_produkt_beratung_keine_behandlung_82",
    name: "Kurze Haut oder Produkt Beratung keine Behandlung",
    categoryTag: "Hautanalyse",
    categoryChip: "Hautanalyse",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie Hautanalyse."
  },
  {
    id: "kurze_beratung_und_individuelle_behandlung_83",
    name: "Kurze Beratung und individuelle Behandlung",
    categoryTag: "Hautanalyse",
    categoryChip: "Hautanalyse",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "1 Std. 15 Min.",
    description: "Individuelle Behandlung der Kategorie Hautanalyse."
  },
  {
    id: "ipl_paket_2_unterschenkel_bikini_leiste_und_achsel_84",
    name: "IPL Paket 2: Unterschenkel, Bikini Leiste und Achsel",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "255 €",
    priceVal: 255,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_paket_3_rücken_schulter_nacken_85",
    name: "IPL Paket: 3 Rücken, Schulter Nacken",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "210 €",
    priceVal: 210,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_paket_4_bikini_leiste_und_achsel_86",
    name: "IPL Paket 4 Bikini Leiste und Achsel",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "125 €",
    priceVal: 125,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_paket_5_rücken_schulter_nacken_bauch_87",
    name: "IPL Paket 5 Rücken, Schulter, Nacken, Bauch",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "300 €",
    priceVal: 300,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_paket_6_arme_achseln_88",
    name: "IPL Paket 6 Arme & Achseln",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "160 €",
    priceVal: 160,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_paket_7_bikini_leiste_achseln_89",
    name: "IPL Paket 7 Bikini (Leiste) & Achseln",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "125 €",
    priceVal: 125,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_paket_8_bikini_intim_komplett_achseln_90",
    name: "IPL Paket 8 Bikini ( Intim komplett ) & Achseln",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "172 €",
    priceVal: 172,
    duration: "20 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_paket_1_91",
    name: "IPL Paket 1",
    categoryTag: "IPL Pakete für Frauen",
    categoryChip: "IPL Pakete (Frauen)",
    price: "315 €",
    priceVal: 315,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Pakete (Frauen)."
  },
  {
    id: "ipl_dauerhafte_haarentfernung_beratung_92",
    name: "IPL Dauerhafte Haarentfernung Beratung",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_dauerhafte_haarentfernung_gesichtsbereich_93",
    name: "IPL Dauerhafte Haarentfernung Gesichtsbereich",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "82 €",
    priceVal: 82,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_dauerhafte_haarentfernung_oberlippe_94",
    name: "IPL Dauerhafte Haarentfernung Oberlippe",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "42 €",
    priceVal: 42,
    duration: "10 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_dauerhafte_haarentfernung_beine_95",
    name: "IPL Dauerhafte Haarentfernung Beine",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "270 €",
    priceVal: 270,
    duration: "30 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_dauerhafte_haarentfernung_bikini_intim_komplett_96",
    name: "IPL Dauerhafte Haarentfernung Bikini / Intim komplett",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "110 €",
    priceVal: 110,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_kinn_97",
    name: "IPL Kinn",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "56 €",
    priceVal: 56,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_hals_98",
    name: "IPL Hals",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "67 €",
    priceVal: 67,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_achsel_99",
    name: "IPL Achsel",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "72 €",
    priceVal: 72,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_arme_komplett_100",
    name: "IPL Arme komplett",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "135 €",
    priceVal: 135,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_medialinie_101",
    name: "IPL Medialinie",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "55 €",
    priceVal: 55,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_bauch_102",
    name: "IPL Bauch",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "89 €",
    priceVal: 89,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_bikini_komplett_103",
    name: "IPL Bikini komplett",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "110 €",
    priceVal: 110,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_bikini_leiste_104",
    name: "IPL Bikini Leiste",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "72 €",
    priceVal: 72,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_nacken_105",
    name: "IPL Nacken",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "59 €",
    priceVal: 59,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_unterschenkel_106",
    name: "IPL Unterschenkel",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "150 €",
    priceVal: 150,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_oberschenkel_107",
    name: "IPL Oberschenkel",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "165 €",
    priceVal: 165,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_um_die_brustwarze_108",
    name: "IPL um die Brustwarze",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "59 €",
    priceVal: 59,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_brust_mann_109",
    name: "IPL Brust Mann",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "110 €",
    priceVal: 110,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_unterarme_110",
    name: "IPL Unterarme",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "130 €",
    priceVal: 130,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_gesäß_111",
    name: "IPL Gesäß",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "115 €",
    priceVal: 115,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "untere_gesichtshälfte_112",
    name: "Untere Gesichtshälfte",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "100 €",
    priceVal: 100,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_rücken_frau_113",
    name: "IPL Rücken Frau",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "199 €",
    priceVal: 199,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "ipl_gesicht_und_hals_114",
    name: "IPL Gesicht und Hals",
    categoryTag: "Dauerhafte Haarentfernung",
    categoryChip: "IPL Haarentfernung",
    price: "110 €",
    priceVal: 110,
    duration: "15 Min.",
    description: "Individuelle Behandlung der Kategorie IPL Haarentfernung."
  },
  {
    id: "exosomen_1_ampulle_115",
    name: "Exosomen 1 Ampulle",
    categoryTag: "Zusätzlich zu der Behandlung",
    categoryChip: "Zusatzbehandlungen",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "5 Min.",
    description: "Individuelle Behandlung der Kategorie Zusatzbehandlungen."
  },
  {
    id: "nctf_ampulle_116",
    name: "NCTF Ampulle",
    categoryTag: "Zusätzlich zu der Behandlung",
    categoryChip: "Zusatzbehandlungen",
    price: "Auf Anfrage",
    priceVal: 0,
    duration: "5 Min.",
    description: "Individuelle Behandlung der Kategorie Zusatzbehandlungen."
  },
  {
    id: "microdermabrasion_117",
    name: "Microdermabrasion",
    categoryTag: "Zusätzlich zu der Behandlung",
    categoryChip: "Zusatzbehandlungen",
    price: "15 €",
    priceVal: 15,
    duration: "5 Min.",
    description: "Individuelle Behandlung der Kategorie Zusatzbehandlungen."
  }
];


// Helper to generate the next 12 booking dates (excluding closed days based on config)
const generateAvailableDates = () => {
  const dates = [];
  const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  
  let count = 0;
  let offset = 1; // start tomorrow
  
  while (count < 12) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    
    const dayOfWeekNum = d.getDay();
    const isClosed = OPENING_HOURS[dayOfWeekNum]?.isClosed;
    
    if (!isClosed) {
      dates.push({
        dayName: daysOfWeek[dayOfWeekNum],
        dayNum: d.getDate(),
        monthName: months[d.getMonth()],
        fullString: `${daysOfWeek[dayOfWeekNum]}, ${d.getDate()}. ${months[d.getMonth()]}`,
        year: d.getFullYear(),
        dateObj: d
      });
      count++;
    }
    offset++;
  }
  return dates;
};

// Helper to parse treatment duration (e.g., "1 Std. 10 Min.", "45 Min.") to minutes
const parseDurationToMinutes = (durationStr: string): number => {
  if (!durationStr) return 30; // fallback default
  
  let totalMinutes = 0;
  
  const hourMatch = durationStr.match(/(\d+)\s*Std/);
  if (hourMatch) {
    totalMinutes += parseInt(hourMatch[1], 10) * 60;
  }
  
  const minMatch = durationStr.match(/(\d+)\s*Min/);
  if (minMatch) {
    totalMinutes += parseInt(minMatch[1], 10);
  } else if (!hourMatch) {
    const numberMatch = durationStr.match(/(\d+)/);
    if (numberMatch) {
      totalMinutes += parseInt(numberMatch[1], 10);
    }
  }
  
  return totalMinutes || 30;
};

// Helper to generate dynamic slot list in 24h format based on opening hours and duration
const getAvailableSlotsForDate = (dateObj: Date, durationStr: string): string[] => {
  const dayOfWeekNum = dateObj.getDay();
  const config = OPENING_HOURS[dayOfWeekNum];
  
  if (!config || config.isClosed) {
    return [];
  }
  
  // Parse hours and minutes from start/end configuration
  const [startH, startM] = config.start.split(':').map(Number);
  const [endH, endM] = config.end.split(':').map(Number);
  
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  
  const treatmentDuration = parseDurationToMinutes(durationStr);
  const slots: string[] = [];
  
  // Generate slots in 30-minute intervals
  for (let mins = startMinutes; mins < endMinutes; mins += 30) {
    if (mins + treatmentDuration <= endMinutes) {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  
  return slots;
};



// Helper to check if two slot intervals overlap
const slotOverlaps = (t1: string, d1: number, t2: string, d2: number): boolean => {
  const [h1, m1] = t1.replace(' Uhr', '').split(':').map(Number);
  const [h2, m2] = t2.replace(' Uhr', '').split(':').map(Number);
  const start1 = h1 * 60 + m1;
  const end1 = start1 + d1;
  const start2 = h2 * 60 + m2;
  const end2 = start2 + d2;
  return start1 < end2 && start2 < end1;
};

interface DBAppointment {
  id: string;
  date: string;
  time: string;
  duration: string;
  expert: string;
  status: string;
}

// Helper to check if a slot is available based on selected expert preference and refined concurrency rules
const isSlotAvailable = (
  dateStr: string,
  slotTimeStr: string,
  treatmentDurationMin: number,
  selectedExpert: string,
  appointmentsList: DBAppointment[]
): boolean => {
  // Find all appointments on this date that overlap with our slot
  const overlappingApps = appointmentsList.filter(app => {
    if (app.date !== dateStr || app.status === 'cancelled') {
      return false;
    }
    if (!app.time) return false;
    const appDuration = parseDurationToMinutes(app.duration);
    return slotOverlaps(slotTimeStr, treatmentDurationMin, app.time, appDuration);
  });

  // Rule 1: If there are already 2 or more overlapping appointments, the slot is fully booked for everyone.
  if (overlappingApps.length >= 2) {
    return false;
  }

  // Rule 2: If there is exactly 1 overlapping appointment
  if (overlappingApps.length === 1) {
    const bookedExpert = overlappingApps[0].expert;
    if (selectedExpert === 'Sofia') {
      // Sofia is only available if the booked appointment is NOT for Sofia
      return bookedExpert !== 'Sofia';
    } else if (selectedExpert === 'Isabel') {
      // Isabel is only available if the booked appointment is NOT for Isabel
      return bookedExpert !== 'Isabel';
    } else {
      // "Keine Präferenz": since there is only 1 booking, one of the two experts must be free!
      return true;
    }
  }

  // Rule 3: If there are 0 overlapping appointments, the slot is available for everyone.
  return true;
};


export const Terminbuchung: React.FC = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Übersicht": true,
    "Kosmetik & Hautpflege": true,
    "Anti-Aging & Straffung": false,
    "Dauerhafte Haarentfernung": false,
  });

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const activeGroup = CATEGORY_GROUPS.find(g => g.categories.includes(cat));
    if (activeGroup) {
      setExpandedGroups(prev => ({
        ...prev,
        [activeGroup.name]: true
      }));
    }
  };
  
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedExpert, setSelectedExpert] = useState<string>('Keine Präferenz');
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  
  const [booked, setBooked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [availableDates] = useState(generateAvailableDates);
  
  const [existingAppointments, setExistingAppointments] = useState<DBAppointment[]>([]);
  const [refreshCounter, setRefreshCounter] = useState<number>(0);

  // Fetch all existing bookings for our 12 available dates to check therapist availability
  useEffect(() => {
    const fetchExistingAppointments = async () => {
      try {
        const dateStrings = availableDates.map(d => d.fullString);
        const { data, error } = await supabase
          .from('appointments')
          .select('id, date, time, duration, expert, status')
          .in('date', dateStrings)
          .neq('status', 'cancelled');

        if (error) throw error;
        setExistingAppointments(data || []);
      } catch (err) {
        console.error('Error fetching existing appointments:', err);
      }
    };

    fetchExistingAppointments();
  }, [availableDates, refreshCounter]);

  const selectedDateObj = availableDates.find(d => d.fullString === selectedDate)?.dateObj;
  const treatmentDurationMinutes = selectedService ? parseDurationToMinutes(selectedService.duration) : 30;

  const rawSlots = (selectedDateObj && selectedService)
    ? getAvailableSlotsForDate(selectedDateObj, selectedService.duration)
    : [];

  // Filter slots dynamically based on existing therapist bookings
  const availableSlots = rawSlots.filter(timeSlot => 
    isSlotAvailable(selectedDate, timeSlot, treatmentDurationMinutes, selectedExpert, existingAppointments)
  );

  const morningSlots = availableSlots.filter(s => {
    const hours = parseInt(s.split(':')[0], 10);
    return hours < 12;
  });
  const afternoonSlots = availableSlots.filter(s => {
    const hours = parseInt(s.split(':')[0], 10);
    return hours >= 12 && hours < 17;
  });
  const eveningSlots = availableSlots.filter(s => {
    const hours = parseInt(s.split(':')[0], 10);
    return hours >= 17;
  });

  const selectService = (service: BookingService | null) => {
    setSelectedService(service);
    setSelectedTime('');
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  // Pre-select service if passed via state or query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get('service') || searchParams.get('treatment') || location.state?.selectedServiceId;
    if (serviceId) {
      const found = BOOKING_SERVICES.find(s => s.id === serviceId);
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        selectService(found);
      }
    }
  }, [location]);

  // Force step to 1 if selected service cannot be booked online
  useEffect(() => {
    if (selectedService?.notBookableOnline && currentStep > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentStep(1);
    }
  }, [selectedService, currentStep]);

  const handleClearSelection = () => {
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setCurrentStep(1);
  };

  const handleResetBooking = () => {
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedExpert('Keine Präferenz');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setConsent(false);
    setBooked(false);
    setCurrentStep(1);
    setRefreshCounter(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && selectedDate && selectedTime && name && email && consent) {
      setLoading(true);
      setErrorMsg(null);
      
      const assignedExpert = 'Keine Präferenz';

      try {
        const { error } = await supabase.from('appointments').insert([{
          service_id: selectedService.id,
          service_name: selectedService.name,
          category: selectedService.categoryTag,
          price: selectedService.price,
          duration: selectedService.duration,
          date: selectedDate,
          time: selectedTime,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          notes: notes,
          status: 'pending',
          expert: assignedExpert
        }]);

        if (error) throw error;
        setRefreshCounter(prev => prev + 1);
        setBooked(true);
      } catch (err) {
        const error = err as Error;
        console.error('Error submitting booking:', error);
        setErrorMsg(error.message || 'Ein Fehler ist aufgetreten bei der Buchung. Bitte versuchen Sie es erneut.');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredServices = selectedCategory === "Alle"
    ? BOOKING_SERVICES
    : BOOKING_SERVICES.filter(s => s.categoryChip === selectedCategory);

  if (booked) {
    return (
      <div className="py-16 bg-pure-white min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto px-margin-mobile md:px-gutter w-full">
          <div className="bg-soft-shell border border-outline-variant/15 p-8 md:p-12 text-center space-y-6 medical-glow rounded-2xl max-w-xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">Anfrage erhalten!</h2>
            <p className="font-sans text-base text-tertiary leading-relaxed">
              Vielen Dank für Ihre Anfrage, <strong className="text-primary">{name}</strong>. Wir senden Ihnen eine Bestätigungs-E-Mail an <strong className="text-primary">{email}</strong> zu, sobald Ihr Wunschtermin bestätigt wurde.
            </p>
            <div className="bg-pure-white p-6 rounded-xl text-left text-sm space-y-3 border border-outline-variant/10 shadow-sm">
              <p className="text-primary font-display text-xs font-bold uppercase tracking-widest border-b border-outline-variant/5 pb-2">
                Ihre Buchungsdetails:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-outline text-xs">Behandlung:</span>
                <span className="col-span-2 text-onyx-text font-bold font-display text-xs">{selectedService?.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-outline text-xs">Kategorie:</span>
                <span className="col-span-2 text-onyx-text font-semibold text-xs">{selectedService?.categoryTag}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-outline text-xs">Datum:</span>
                <span className="col-span-2 text-onyx-text font-semibold text-xs">{selectedDate}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-outline text-xs">Uhrzeit:</span>
                <span className="col-span-2 text-onyx-text font-semibold text-xs">{selectedTime}</span>
              </div>

              {phone && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-outline text-xs">Telefon:</span>
                  <span className="col-span-2 text-onyx-text font-semibold text-xs">{phone}</span>
                </div>
              )}
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleResetBooking}
                className="bg-primary text-pure-white px-8 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all inline-block shadow-sm"
              >
                Neuen Termin buchen
              </button>
              <Link
                to="/"
                className="bg-pure-white text-primary border border-outline-variant/20 px-8 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider hover:bg-soft-shell transition-all inline-block shadow-sm text-center"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-sans antialiased py-16">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        
        {/* Booking Header & Stepper */}
        <div className="mb-16 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Ihr Termin bei SKiN
          </h1>
          <p className="text-tertiary font-sans text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Wählen Sie Ihre gewünschte Behandlung und finden Sie einen passenden Zeitpunkt für Ihre Auszeit.
          </p>
          
          <div className="mt-12 flex justify-center items-center gap-2 md:gap-8">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => currentStep > 1 && setCurrentStep(1)}
              disabled={currentStep === 1}
              className="flex flex-col items-center gap-2 group focus:outline-none disabled:cursor-default"
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold font-display transition-all ${
                currentStep === 1
                  ? 'border-primary text-primary bg-primary/5 ring-4 ring-primary/10'
                  : selectedService
                    ? 'border-primary bg-primary text-pure-white cursor-pointer hover:opacity-80'
                    : 'border-outline-variant text-outline'
              }`}>
                {selectedService && currentStep > 1 ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  "1"
                )}
              </div>
              <span className={`font-display text-[10px] uppercase font-bold tracking-widest transition-colors ${
                currentStep === 1 ? 'text-primary' : 'text-outline'
              }`}>
                Behandlung
              </span>
            </button>

            <div className={`w-8 md:w-16 h-px transition-colors ${
              selectedService ? 'bg-primary' : 'bg-outline-variant/30'
            }`} />

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => currentStep > 2 && selectedService && setCurrentStep(2)}
              disabled={currentStep === 2 || !selectedService}
              className="flex flex-col items-center gap-2 group focus:outline-none disabled:cursor-default"
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold font-display transition-all ${
                currentStep === 2
                  ? 'border-primary text-primary bg-primary/5 ring-4 ring-primary/10'
                  : selectedDate && selectedTime && currentStep > 2
                    ? 'border-primary bg-primary text-pure-white cursor-pointer hover:opacity-80'
                    : 'border-outline-variant text-outline'
              }`}>
                {selectedDate && selectedTime && currentStep > 2 ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  "2"
                )}
              </div>
              <span className={`font-display text-[10px] uppercase font-bold tracking-widest transition-colors ${
                currentStep === 2 ? 'text-primary' : 'text-outline'
              }`}>
                Zeitpunkt
              </span>
            </button>

            <div className={`w-8 md:w-16 h-px transition-colors ${
              selectedDate && selectedTime ? 'bg-primary' : 'bg-outline-variant/30'
            }`} />

            {/* Step 3 */}
            <button
              type="button"
              disabled={currentStep === 3 || !selectedService || !selectedDate || !selectedTime}
              className="flex flex-col items-center gap-2 group focus:outline-none disabled:cursor-default"
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold font-display transition-all ${
                currentStep === 3
                  ? 'border-primary text-primary bg-primary/5 ring-4 ring-primary/10'
                  : 'border-outline-variant text-outline'
              }`}>
                3
              </div>
              <span className={`font-display text-[10px] uppercase font-bold tracking-widest transition-colors ${
                currentStep === 3 ? 'text-primary' : 'text-outline'
              }`}>
                Daten
              </span>
            </button>
          </div>
        </div>

        {/* Main Booking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area: Step Contents */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STEP 1: TREATMENT SELECTION */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  
                  {/* Categories Navigation Sidebar (Desktop: Vertical Sidebar, Mobile: Horizontal Scroll) */}
                  <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-28 space-y-6 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2">
                    {/* Desktop Header */}
                    <div className="hidden lg:block pb-4 border-b border-outline-variant/10">
                      <h3 className="font-display text-xs font-bold uppercase tracking-wider text-primary">Kategorien</h3>
                      <p className="text-[11px] text-tertiary mt-1">Wählen Sie einen Bereich aus</p>
                    </div>

                    {/* Desktop View: Grouped Menu */}
                    <div className="hidden lg:block space-y-6">
                      {CATEGORY_GROUPS.map((group) => {
                        const isExpanded = !!expandedGroups[group.name];
                        return (
                          <div key={group.name} className="space-y-2 border-b border-outline-variant/5 pb-3 last:border-b-0 last:pb-0">
                            <button
                              type="button"
                              onClick={() => toggleGroup(group.name)}
                              className="w-full flex items-center justify-between text-[10px] font-display font-bold uppercase tracking-widest text-slate-muted/80 hover:text-primary transition-colors text-left px-2 py-1 select-none"
                            >
                              <span>{group.name}</span>
                              {isExpanded ? (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-muted/80" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-muted/80" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="space-y-1 mt-1 transition-all duration-300">
                                {group.categories.map((cat) => {
                                  const isActive = selectedCategory === cat;
                                  const serviceCount = cat === "Alle" 
                                    ? BOOKING_SERVICES.length 
                                    : BOOKING_SERVICES.filter(s => s.categoryChip === cat).length;

                                  return (
                                    <button
                                      key={cat}
                                      type="button"
                                      onClick={() => handleCategorySelect(cat)}
                                      className={`w-full text-left px-3 py-2 rounded-xl font-sans text-xs font-medium transition-all duration-200 flex items-center justify-between group border ${
                                        isActive
                                          ? 'bg-primary text-pure-white border-primary shadow-sm font-semibold'
                                          : 'bg-transparent text-onyx-text border-transparent hover:bg-sky-accent/5 hover:text-primary'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className={`transition-colors shrink-0 ${
                                          isActive ? 'text-pure-white' : 'text-slate-muted group-hover:text-primary'
                                        }`}>
                                          {getCategoryIcon(cat)}
                                        </span>
                                        <span className="truncate">{cat}</span>
                                      </div>
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 font-display ${
                                        isActive
                                          ? 'bg-pure-white/25 text-pure-white'
                                          : 'bg-sky-accent/10 text-slate-muted group-hover:bg-primary/10 group-hover:text-primary'
                                      }`}>
                                        {serviceCount}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile & Tablet View: Collapsible Filter Dropdown */}
                    <div className="lg:hidden w-full relative mb-6">
                      <div className="text-xs font-display font-bold uppercase tracking-wider text-slate-muted mb-2 px-1">
                        Kategorie filtern:
                      </div>
                      <button
                        type="button"
                        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                        className="w-full flex items-center justify-between bg-pure-white border border-outline-variant/15 p-4 rounded-xl text-sm font-display font-bold text-primary transition-all shadow-sm focus:outline-none"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sky-accent">{getCategoryIcon(selectedCategory)}</span>
                          <span>{selectedCategory}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-muted transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {mobileFilterOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-pure-white border border-outline-variant/15 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto p-2 space-y-1">
                          {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat;
                            const serviceCount = cat === "Alle" 
                              ? BOOKING_SERVICES.length 
                              : BOOKING_SERVICES.filter(s => s.categoryChip === cat).length;
                            
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  handleCategorySelect(cat);
                                  setMobileFilterOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg font-sans text-xs font-semibold transition-all flex items-center justify-between ${
                                  isActive
                                    ? 'bg-primary text-pure-white font-bold'
                                    : 'bg-transparent text-onyx-text hover:bg-sky-accent/5'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={isActive ? 'text-pure-white' : 'text-slate-muted'}>
                                    {getCategoryIcon(cat)}
                                  </span>
                                  <span>{cat}</span>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                  isActive ? 'bg-pure-white/20 text-pure-white' : 'bg-sky-accent/10 text-slate-muted'
                                }`}>
                                  {serviceCount}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Services Column */}
                  <div className="flex-1 w-full space-y-6">
                    {/* Header showing Selected Category and Count */}
                    <div className="pb-3 border-b border-outline-variant/10 flex justify-between items-center">
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                        {selectedCategory}
                      </h3>
                      <span className="text-xs text-tertiary">
                        {filteredServices.length} {filteredServices.length === 1 ? 'Behandlung' : 'Behandlungen'} gefunden
                      </span>
                    </div>

                    {filteredServices.length === 0 ? (
                      <div className="bg-pure-white border border-outline-variant/10 rounded-2xl p-12 text-center medical-glow">
                        <Sparkles className="w-10 h-10 text-outline/30 mx-auto mb-3" />
                        <p className="text-tertiary text-sm">
                          Keine Behandlungen in dieser Kategorie gefunden. Bitte wählen Sie eine andere Kategorie.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredServices.map((service) => {
                          const isSelected = selectedService?.id === service.id;
                          return (
                            <div
                              key={service.id}
                              onClick={() => selectService(service)}
                              className={`bg-pure-white medical-glow p-6 border group cursor-pointer hover:border-primary/30 transition-all rounded-2xl ${
                                isSelected
                                  ? 'border-primary ring-2 ring-primary bg-primary/[0.02]'
                                  : 'border-outline-variant/10'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-wrap gap-2">
                                  <span className="bg-sky-accent/10 text-slate-muted px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest rounded-md">
                                    {service.categoryTag}
                                  </span>
                                  {service.notBookableOnline && (
                                    <span className="bg-error/10 text-error px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest rounded-md">
                                      Online nicht buchbar
                                    </span>
                                  )}
                                </div>
                                <span className="text-primary font-bold whitespace-nowrap ml-4 shrink-0">{service.price}</span>
                              </div>
                              <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors text-onyx-text">
                                {service.name}
                              </h3>
                              <p className="text-tertiary text-sm mb-6 line-clamp-2 leading-relaxed">
                                {service.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-outline text-xs flex items-center gap-1.5 font-sans">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{service.duration}</span>
                                </span>
                                <button
                                  type="button"
                                  className={`font-display text-xs font-bold uppercase flex items-center gap-1.5 group/btn ${
                                    service.notBookableOnline 
                                      ? 'text-error' 
                                      : 'text-primary'
                                  }`}
                                >
                                  <span>
                                    {service.notBookableOnline 
                                      ? 'Nur telefonisch' 
                                      : isSelected 
                                        ? 'Ausgewählt' 
                                        : 'Auswählen'
                                    }
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {selectedService && !selectedService.notBookableOnline && (
                      <div className="lg:hidden mt-6">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="w-full bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <span>Weiter zum Zeitpunkt</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info Bento */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-6 border-t border-outline-variant/10">
                  <div className="bg-soft-shell p-6 border border-outline-variant/10 rounded-2xl flex flex-col items-start">
                    <Shield className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-display text-[11px] font-bold mb-2 uppercase tracking-widest text-primary">Medizinische Qualität</h4>
                    <p className="text-[13px] text-tertiary leading-relaxed">Alle Behandlungen werden unter höchsten klinischen Standards in Osnabrück durchgeführt.</p>
                  </div>
                  <div className="bg-soft-shell p-6 border border-outline-variant/10 rounded-2xl flex flex-col items-start">
                    <Calendar className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-display text-[11px] font-bold mb-2 uppercase tracking-widest text-primary">Termintreue</h4>
                    <p className="text-[13px] text-tertiary leading-relaxed">Wir reservieren exklusiv Zeit für Sie. Absagen bitte bis 24 Stunden vorher.</p>
                  </div>
                  <div className="bg-soft-shell p-6 border border-outline-variant/10 rounded-2xl flex flex-col items-start">
                    <Users className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-display text-[11px] font-bold mb-2 uppercase tracking-widest text-primary">Expertenteam</h4>
                    <p className="text-[13px] text-tertiary leading-relaxed">Sofia Khaliq-Natawan und Team beraten Sie individuell zu Ihrer Haut.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME SELECTION */}
            {currentStep === 2 && (
              <div className="bg-pure-white border border-outline-variant/10 p-8 rounded-2xl medical-glow space-y-8">
                
                <div>
                  <h3 className="font-display text-lg font-bold text-primary mb-2">Datum auswählen</h3>
                  <p className="text-sm text-tertiary mb-4">Bitte wählen Sie Ihren Wunschtag aus:</p>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {availableDates.map((d) => {
                      const isSelected = selectedDate === d.fullString;
                      return (
                        <button
                          key={d.fullString}
                          type="button"
                          onClick={() => selectDate(d.fullString)}
                          className={`p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary medical-glow'
                              : 'border-outline-variant/10 bg-pure-white text-on-surface hover:border-primary/30 hover:bg-soft-shell'
                          }`}
                        >
                          <span className="text-[10px] font-display font-bold uppercase tracking-wider opacity-60">{d.dayName}</span>
                          <span className="text-xl font-bold font-display my-1">{d.dayNum}</span>
                          <span className="text-[10px] font-sans opacity-70">{d.monthName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Time Slot Picker Grid */}
                <div className="pt-6 border-t border-outline-variant/10">
                  <h3 className="font-display text-lg font-bold text-primary mb-2">Uhrzeit auswählen</h3>
                  
                  {!selectedDate ? (
                    <div className="bg-soft-shell/50 border border-outline-variant/10 rounded-xl p-6 text-center">
                      <Calendar className="w-8 h-8 text-outline/40 mx-auto mb-2 animate-pulse" />
                      <p className="text-tertiary text-sm">
                        Bitte wählen Sie zuerst oben ein Datum aus.
                      </p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="bg-rose-500/[0.02] border border-rose-500/10 rounded-xl p-6 text-center">
                      <Clock className="w-8 h-8 text-rose-500/40 mx-auto mb-2" />
                      <p className="text-tertiary text-sm leading-relaxed">
                        An diesem Tag sind online keine freien Termine für die gewählte Behandlung verfügbar.<br />
                        Bitte wählen Sie ein anderes Datum oder kontaktieren Sie uns telefonisch.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Morning */}
                      {morningSlots.length > 0 && (
                        <div>
                          <h4 className="text-[11px] font-display font-bold uppercase tracking-widest text-slate-muted mb-3">Vormittag</h4>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {morningSlots.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 text-center transition-all font-sans text-xs font-semibold rounded-lg border active:scale-95 ${
                                    isSelected
                                      ? 'bg-primary text-pure-white border-primary font-bold shadow-sm'
                                      : 'bg-pure-white text-tertiary border-outline-variant/10 hover:border-primary/30 hover:bg-soft-shell'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Afternoon */}
                      {afternoonSlots.length > 0 && (
                        <div>
                          <h4 className="text-[11px] font-display font-bold uppercase tracking-widest text-slate-muted mb-3">Nachmittag</h4>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {afternoonSlots.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 text-center transition-all font-sans text-xs font-semibold rounded-lg border active:scale-95 ${
                                    isSelected
                                      ? 'bg-primary text-pure-white border-primary font-bold shadow-sm'
                                      : 'bg-pure-white text-tertiary border-outline-variant/10 hover:border-primary/30 hover:bg-soft-shell'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Evening */}
                      {eveningSlots.length > 0 && (
                        <div>
                          <h4 className="text-[11px] font-display font-bold uppercase tracking-widest text-slate-muted mb-3">Abend</h4>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {eveningSlots.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 text-center transition-all font-sans text-xs font-semibold rounded-lg border active:scale-95 ${
                                    isSelected
                                      ? 'bg-primary text-pure-white border-primary font-bold shadow-sm'
                                      : 'bg-pure-white text-tertiary border-outline-variant/10 hover:border-primary/30 hover:bg-soft-shell'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {selectedDate && selectedTime && (
                  <div className="lg:hidden pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="w-full bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Weiter zu Ihren Daten</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Back button */}
                <div className="pt-4 flex justify-between items-center border-t border-outline-variant/10 mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-primary hover:underline text-sm font-display font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>Zurück zur Behandlung</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PERSONAL DATA FORM */}
            {currentStep === 3 && (
              <div className="bg-pure-white border border-outline-variant/10 p-8 rounded-2xl medical-glow space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-primary mb-2">Ihre Kontaktdaten</h3>
                  <p className="text-sm text-tertiary mb-6">Bitte füllen Sie das Formular aus, um Ihre Terminanfrage abzuschließen.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-xs font-display font-bold uppercase tracking-wider text-primary mb-2">
                      Name, Vorname *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="z.B. Max Mustermann"
                      className="w-full bg-pure-white border border-outline-variant/10 p-4 rounded-xl text-sm text-onyx-text placeholder:text-outline/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="block text-xs font-display font-bold uppercase tracking-wider text-primary mb-2">
                      E-Mail-Adresse *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="z.B. max@beispiel.de"
                      className="w-full bg-pure-white border border-outline-variant/10 p-4 rounded-xl text-sm text-onyx-text placeholder:text-outline/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-xs font-display font-bold uppercase tracking-wider text-primary mb-2">
                      Telefonnummer (optional)
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="z.B. 0170 1234567"
                      className="w-full bg-pure-white border border-outline-variant/10 p-4 rounded-xl text-sm text-onyx-text placeholder:text-outline/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-notes" className="block text-xs font-display font-bold uppercase tracking-wider text-primary mb-2">
                      Besondere Anmerkungen oder Wünsche (optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="z.B. Besonderheiten Ihrer Haut, Allergien oder Wünsche..."
                      className="w-full bg-pure-white border border-outline-variant/10 p-4 rounded-xl text-sm text-onyx-text placeholder:text-outline/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      id="booking-consent"
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-5 h-5 rounded border-outline-variant/20 text-primary focus:ring-primary mt-0.5 accent-primary cursor-pointer animate-none"
                    />
                    <label htmlFor="booking-consent" className="text-xs text-tertiary leading-relaxed cursor-pointer select-none">
                      Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden. Sie können diese Einwilligung jederzeit widerrufen. *
                    </label>
                  </div>
                  
                  {errorMsg && (
                    <div className="bg-error/10 border border-error/20 p-4 rounded-xl text-error text-xs leading-relaxed font-sans mt-4">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div className="lg:hidden pt-4">
                    <button
                      type="button"
                      disabled={!name || !email || !consent || loading}
                      onClick={handleSubmit}
                      className="w-full bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-slate-muted/20 disabled:text-outline disabled:cursor-not-allowed disabled:transform-none shadow-sm flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Wird gebucht...</span>
                      ) : (
                        <>
                          <span>Termin buchen</span>
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Back button */}
                <div className="pt-4 flex justify-between items-center border-t border-outline-variant/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-primary hover:underline text-sm font-display font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>Zurück zum Zeitpunkt</span>
                  </button>
                  <span className="text-xs text-outline italic">* Pflichtfelder</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Booking Summary */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-pure-white medical-glow border border-outline-variant/10 rounded-2xl overflow-hidden">
              <div className="p-6 bg-primary/5 border-b border-outline-variant/10">
                <h2 className="font-display text-lg font-bold text-primary">Ihre Auswahl</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {!selectedService ? (
                  // Empty State
                  <div className="text-center py-10">
                    <Sparkles className="w-12 h-12 text-outline/30 mx-auto mb-4 animate-pulse" />
                    <p className="text-outline text-sm italic leading-relaxed">
                      Wählen Sie links eine Behandlung aus, um fortzufahren.
                    </p>
                  </div>
                ) : (
                  // Selected State
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-display text-sm font-bold text-onyx-text leading-snug">{selectedService.name}</h4>
                        <p className="text-xs text-outline mt-1">{selectedService.categoryTag} • {selectedService.duration}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearSelection}
                        className="text-error hover:bg-error/10 p-1.5 rounded-full transition-all flex items-center justify-center shrink-0"
                        title="Auswahl zurücksetzen"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-6 border-t border-outline-variant/10 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-tertiary">Behandlung:</span>
                        <span className="font-semibold text-onyx-text whitespace-nowrap ml-4 shrink-0">{selectedService.price}</span>
                      </div>

                      {/* If step >= 2, show date / time info */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-tertiary">Datum:</span>
                        <span className="font-semibold text-onyx-text">
                          {selectedDate || (
                            <span className="text-outline/60 italic text-xs font-normal">Ausstehend</span>
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-tertiary">Uhrzeit:</span>
                        <span className="font-semibold text-onyx-text">
                          {selectedTime || (
                            <span className="text-outline/60 italic text-xs font-normal">Ausstehend</span>
                          )}
                        </span>
                      </div>



                      <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center text-primary font-bold text-lg">
                        <span>Gesamt</span>
                        <span className="whitespace-nowrap ml-4 shrink-0">
                          {(() => {
                            const p = selectedService.price.toLowerCase();
                            if (p === 'auf anfrage' || selectedService.priceVal === 0) {
                              return 'Auf Anfrage';
                            }
                            if (p.startsWith('ab')) {
                              return `ab ${selectedService.priceVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
                            }
                            if (p.startsWith('von')) {
                              return selectedService.price;
                            }
                            return `${selectedService.priceVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4 hidden lg:block">
                  {selectedService && selectedService.notBookableOnline && (
                    <div className="bg-error/5 border border-error/20 p-4 rounded-xl space-y-2 text-left">
                      <p className="text-xs font-semibold text-error uppercase tracking-wider">
                        Online nicht buchbar
                      </p>
                      <p className="text-xs text-tertiary leading-relaxed font-sans">
                        Diese Dienstleistung kann online nicht gebucht werden. Bitte vereinbaren Sie Ihren Termin telefonisch unter:
                      </p>
                      <a
                        href="tel:+4954147054971"
                        className="block text-center bg-error text-pure-white font-display text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg hover:opacity-90 transition-all shadow-sm"
                      >
                        0541 / 47 05 49 71
                      </a>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <button
                      type="button"
                      disabled={!selectedService || selectedService.notBookableOnline}
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-slate-muted/20 disabled:text-outline disabled:cursor-not-allowed disabled:transform-none shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>Weiter zum Zeitpunkt</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {currentStep === 2 && (
                    <button
                      type="button"
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setCurrentStep(3)}
                      className="w-full bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-slate-muted/20 disabled:text-outline disabled:cursor-not-allowed disabled:transform-none shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>Weiter zu Ihren Daten</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {currentStep === 3 && (
                    <button
                      type="button"
                      disabled={!name || !email || !consent || loading}
                      onClick={handleSubmit}
                      className="w-full bg-primary text-pure-white font-display text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-slate-muted/20 disabled:text-outline disabled:cursor-not-allowed disabled:transform-none shadow-sm flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Wird gebucht...</span>
                      ) : (
                        <>
                          <span>Termin buchen</span>
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Mobile & Tablet view action buttons (separate warning block visible on mobile if not bookable) */}
                {selectedService && selectedService.notBookableOnline && (
                  <div className="lg:hidden bg-error/5 border border-error/20 p-4 rounded-xl space-y-2 text-left mt-4">
                    <p className="text-xs font-semibold text-error uppercase tracking-wider">
                      Online nicht buchbar
                    </p>
                    <p className="text-xs text-tertiary leading-relaxed font-sans">
                      Diese Dienstleistung kann online nicht gebucht werden. Bitte vereinbaren Sie Ihren Termin telefonisch unter:
                    </p>
                    <a
                      href="tel:+4954147054971"
                      className="block text-center bg-error text-pure-white font-display text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg hover:opacity-90 transition-all shadow-sm"
                    >
                      0541 / 47 05 49 71
                    </a>
                  </div>
                )}

                <p className="text-[10px] text-center text-outline uppercase tracking-wider">
                  Sichere Verschlüsselung Ihrer Daten
                </p>
              </div>

              {/* Decorative Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  alt="Klinik Innenansicht"
                  className="w-full h-full object-cover"
                  src="/images/terminbuchung/clinic_interior.png"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-pure-white font-display text-xs font-bold px-4 py-2 bg-onyx-text/40 backdrop-blur-sm rounded-lg uppercase tracking-wider">
                    Wir freuen uns auf Sie
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Help */}
            <div className="text-center">
              <p className="text-xs text-outline mb-1 font-sans">Fragen zur Buchung?</p>
              <a
                className="text-primary font-bold hover:underline transition-all font-display text-sm tracking-wide"
                href="tel:+4954147054971"
              >
                0541 / 47 05 49 71
              </a>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};
