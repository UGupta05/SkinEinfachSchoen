export interface TreatmentDetails {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly duration: string;
  readonly price: string;
  readonly image: string;
  readonly imageAspectRatio?: 'portrait' | 'landscape';
}

export const TREATMENT_DETAILS: Record<string, TreatmentDetails> = {
  "jetpeel": {
    title: "JetPeel™ Technologie",
    category: "High-Tech Hydration & Tiefenreinigung",
    description: "Das originale JetPeel™-Verfahren schleust Wirkstoffe wie Vitamine und Hyaluronsäure schmerzfrei und berührungsfrei tief in die Haut ein. Durch Überschallgeschwindigkeit entsteht ein feiner Aerosolstrahl, der abgestorbene Hautschüppchen sanft entfernt und die Zellen porentief mit Feuchtigkeit und Nährstoffen versorgt. Sofort sichtbarer Glow und Frischeeffekt.",
    points: [
      "Nadelfreie & schmerzfreie Behandlung",
      "Tiefenwirksame Feuchtigkeitsversorgung",
      "Ideal bei Fältchen & müder Haut",
      "Keine Ausfallzeiten (Sofort-Effekt)",
      "Lymphdrainage & Tiefenreinigung",
      "Regt Mikrozirkulation & Kollagenbildung an"
    ],
    duration: "ca. 60 - 90 Minuten",
    price: "99,- €",
    image: "/images/treatments/jetpeel_new.jpg",
    imageAspectRatio: "portrait"
  },
  "ipl": {
    title: "IPL Haarentfernung & Hautverjüngung",
    category: "Lichttherapie",
    description: "Unsere modernste IPL-Technologie (Intense Pulsed Light) bietet eine schonende, langanhaltende und sichere Lösung zur Reduzierung unerwünschter Haare im Gesicht und am Körper. Gleichzeitig eignet sich IPL hervorragend zur Verjüngung des Hautbildes, Reduzierung von Altersflecken, Couperose und vergrößerten Poren.",
    points: [
      "Dauerhafte Haarentfernung",
      "Schmerzarme & hautschonende Lichtblitze",
      "Gleichmäßige Reduktion von Pigmentflecken",
      "Behandlung von Couperose & Rötungen",
      "Individuell einstellbare Wellenlängen",
      "Klinisch erprobte Sicherheit"
    ],
    duration: "ca. 30 - 75 Minuten",
    price: "49,- €",
    image: "/images/treatments/ipl_new.jpg",
    imageAspectRatio: "portrait"
  },
  "meso-bb-glow": {
    title: "Meso BB Glow",
    category: "Teint & Glow",
    description: "Die Meso BB Glow Behandlung verleiht Ihrer Haut einen ebenmäßigen, strahlenden Teint ganz ohne tägliches Make-up. Durch ein sanftes Microneedling-Verfahren werden natürliche, feuchtigkeitsspendende Wirkstoffe zusammen mit feinsten Farbpigmenten oberflächlich in die Haut eingearbeitet. Unregelmäßigkeiten, Rötungen und Augenringe werden optisch kaschiert.",
    points: [
      "Ebenmäßiger Teint & seidiges Hautbild",
      "Kaschiert Augenringe & Rötungen",
      "Feuchtigkeits-Kick & langanhaltender Glow",
      "Schmerzfreies Einarbeiten von Pigmenten",
      "Porenverfeinernd & glättend",
      "Sofortiger No-Make-Up-Look"
    ],
    duration: "ca. 60 Minuten",
    price: "79,- €",
    image: "/images/treatments/meso_bb_glow_new.jpg",
    imageAspectRatio: "portrait"
  },
  "microneedling": {
    title: "Radiofrequenz Microneedling (MRF)",
    category: "Hautstraffung",
    description: "Das Radiofrequenz-Microneedling (MRF) gilt als die absolute High-Tech-Waffe gegen Falten, Konturverlust und Aknenarben. Sterile vergoldete Mikronadeln dringen präzise in die tiefe Dermis ein und geben an der Nadelspitze einen gezielten Wärmeimpuls ab. Dadurch zieht sich das Gewebe sofort zusammen (Shrinking-Effekt) und setzt den stärksten natürlichen Selbstheilungs- und Kollagenbildungsprozess in Gang.",
    points: [
      "Maximaler Anti-Aging Straffungseffekt",
      "Linderung von Aknenarben & Dehnungsstreifen",
      "Porenverfeinerung & verbesserte Spannkraft",
      "Präzise computergesteuerte Eindringtiefe",
      "Kombination aus Nadelreiz & Wärmeenergie",
      "Langanhaltende Resultate über Monate"
    ],
    duration: "ca. 75 - 90 Minuten",
    price: "149,- €",
    image: "/images/treatments/microneedling_new.jpg",
    imageAspectRatio: "portrait"
  },
  "dermaneedling": {
    title: "Microneedling / Dermaneedling",
    category: "Hauterneuerung",
    description: "Klassisches Microneedling (Dermaneedling) zur gezielten Behandlung von Fältchen, Narben, Pigmentflecken und Porenverfeinerung. Durch feinste Nadelpunktionen wird die hauteigene Kollagen- und Elastinsynthese angeregt, wodurch sterile Wirkstoffe tief in die Zellen eingeschleust werden.",
    points: [
      "Schonende Hauterneuerung & Regeneration",
      "Porenverfeinernd & Teint-verfeinernd",
      "Regt Kollagen- & Elastinproduktion an",
      "Effektive Einschleusung von Wirkstoffen",
      "Reduziert feine Fältchen & Aknenarben",
      "Sichtbar verfeinertes, strafferes Hautbild"
    ],
    duration: "ca. 60 Minuten",
    price: "99,- €",
    image: "/images/treatments/dermaneedling_new.jpg",
    imageAspectRatio: "portrait"
  },
  "klassische-kosmetik": {
    title: "Klassische Kosmetik & Gesichtspflege",
    category: "Gesichtsbehandlungen",
    description: "Gönnen Sie Ihrer Haut eine Auszeit. Unsere klassischen Gesichtsbehandlungen richten sich exakt nach Ihrem aktuellen Hautbedürfnis. Jedes Treatment beinhaltet eine gründliche Hautreinigung, sanftes Peeling, intensives Ausreinigen, eine entspannende Gesichtsmassage und eine pflegende Abschlusspflege.",
    points: [
      "Individuelle Hautreinigung",
      "Erholungs- & Wellness-Effekt",
      "Befreit die Haut von Unreinheiten",
      "Hochwertige Masken & Wirkstoffe",
      "Entspannende Nacken- & Gesichtsmassage",
      "Für jeden Hauttyp geeignet"
    ],
    duration: "ca. 60 - 90 Minuten",
    price: "59,- €",
    image: "/images/treatments/klassische_kosmetik_new.jpg",
    imageAspectRatio: "portrait"
  },
  "fruchtsaeure-peeling": {
    title: "Fruchtsäure Peeling (AHA)",
    category: "Hauterneuerung",
    description: "Medizinisch kontrollierte Fruchtsäure-Peelings (AHA / BHA) helfen der Haut, sich schneller zu regenerieren und verhornte Zellen abzustoßen. Die Behandlung verfeinert die Poren, mildert Pigmentstörungen, regt die Kollagenproduktion an und reduziert Fältchen sowie Unreinheiten spürbar. Für einen strahlenden Teint.",
    points: [
      "Effektive Porenverfeinerung",
      "Mildert Pigment- & Altersflecken",
      "Glättet feine Linien & Fältchen",
      "Unterstützt die Zellerneuerung",
      "Reduziert Unreinheiten & Akne-Herde",
      "Verleiht einen frischen Glow"
    ],
    duration: "ca. 45 - 60 Minuten",
    price: "69,- €",
    image: "/images/treatments/peeling_new.jpg",
    imageAspectRatio: "portrait"
  },
  "visia": {
    title: "VISIA® 3D Hautanalyse",
    category: "Diagnose & Hautanalyse",
    description: "Mit der computergestützten VISIA® 3D-Hautanalyse blicken wir tief unter Ihre Hautoberfläche. Das System erfasst Flecken, Falten, Poren, UV-Schäden, rote Bereiche und bakterielle Rückstände. Auf dieser präzisen Basis erstellen wir Ihren maßgeschneiderten Behandlungs- und Heimpflegeplan – wissenschaftlich fundiert.",
    points: [
      "Detaillierte Erfassung von UV-Schäden",
      "Poren- & Faltenanalyse in 3D",
      "Messung der bakteriellen Belastung",
      "Wissenschaftliche Grundlage für Heimpflege",
      "Visualisierung von Fortschritten",
      "Absolut schmerzfreie & schnelle Analyse"
    ],
    duration: "ca. 30 Minuten",
    price: "29,- €",
    image: "/images/treatments/visia_new.jpg",
    imageAspectRatio: "landscape"
  }
};
