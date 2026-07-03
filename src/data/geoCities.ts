export interface GeoCity {
  readonly slug: string;
  readonly name: string;
  readonly distanceKm: string;
  readonly durationMin: string;
  readonly routeHighlight: string;
  readonly introText: string;
  readonly neighborhoodInfo: string;
}

export const GEO_CITIES: Record<string, GeoCity> = {
  "osnabrueck": {
    slug: "osnabrueck",
    name: "Osnabrück",
    distanceKm: "0",
    durationMin: "0",
    routeHighlight: "im Herzen von Osnabrück an der Lotter Straße",
    introText: "Als Ihr führendes Kosmetikstudio direkt in Osnabrück bieten wir Ihnen maßgeschneiderte High-Tech-Behandlungen wie JetPeel™, Radiofrequenz-Microneedling und medizinisch fundierte Kosmetik.",
    neighborhoodInfo: "Unser Studio liegt verkehrsgünstig an der Lotter Straße 33 in Osnabrück, nahe dem Westerberg. Kundenparkplätze stehen Ihnen direkt im Hof kostenlos zur Verfügung."
  },
  "georgsmarienhuette": {
    slug: "georgsmarienhuette",
    name: "Georgsmarienhütte",
    distanceKm: "10",
    durationMin: "12",
    routeHighlight: "über die B51 Richtung Osnabrück-Zentrum / Westerberg",
    introText: "Viele Kundinnen und Kunden aus Georgsmarienhütte schätzen die kurze Anreise von nur 12 Minuten für unsere exklusiven Behandlungen wie JetPeel™ und medizinisches Microneedling.",
    neighborhoodInfo: "Über die B51 erreichen Sie die Lotter Straße in Osnabrück in nur rund 12 Minuten. Parken Sie bequem und kostenfrei direkt auf unserem Hof während Ihres Termins."
  },
  "wallenhorst": {
    slug: "wallenhorst",
    name: "Wallenhorst",
    distanceKm: "12",
    durationMin: "15",
    routeHighlight: "über die B68 oder A1 Richtung Osnabrück-Westerberg",
    introText: "Aus Wallenhorst erreichen Sie unser Kosmetikstudio in Osnabrück in nur 15 Minuten. Profitieren Sie von modernster VISIA® 3D Hautanalyse und High-Tech Anti-Aging.",
    neighborhoodInfo: "Fahren Sie einfach über die B68 oder A1 nach Osnabrück-Westerberg. Die Lotter Straße 33 ist aus Wallenhorst schnell und direkt erreichbar. Parkplätze im Hof sind für Sie reserviert."
  },
  "belm": {
    slug: "belm",
    name: "Belm",
    distanceKm: "9",
    durationMin: "11",
    routeHighlight: "über die B51 / Bremer Straße Richtung Westerberg",
    introText: "Aus Belm sind Sie in nur 11 Minuten in unserem Kosmetikstudio an der Lotter Straße. Erleben Sie spürbare Hautbildverbesserung durch exklusive ZO Skin Health Treatments.",
    neighborhoodInfo: "Nehmen Sie die B51 oder Bremer Straße direkt nach Osnabrück. Unser Studio liegt unweit des Zentrums am Westerberg. Kostenfreie Parkplätze finden Sie direkt auf dem Hof."
  },
  "lotte": {
    slug: "lotte",
    name: "Lotte",
    distanceKm: "11",
    durationMin: "14",
    routeHighlight: "über die L501 direkt auf die Lotter Straße",
    introText: "Aus Lotte führt der Weg direkt zu uns: Über die L501 gelangen Sie ohne Umwege direkt auf die Lotter Straße zu SKIN einfach schön. Ihr Partner für dauerhafte IPL Haarentfernung.",
    neighborhoodInfo: "Die L501 verbindet Lotte direkt mit der Lotter Straße in Osnabrück. Nach nur 14 Minuten Fahrtzeit parken Sie kostenfrei direkt hinter unserem Studio auf dem Hof."
  },
  "hasbergen": {
    slug: "hasbergen",
    name: "Hasbergen",
    distanceKm: "8",
    durationMin: "10",
    routeHighlight: "über die Rheiner Landstraße Richtung Westerberg",
    introText: "Hautgesundheit ganz in Ihrer Nähe: Aus Hasbergen erreichen Sie uns über die Rheiner Landstraße in nur 10 Minuten Fahrtzeit. Wir bieten Ihnen professionelle Fruchtsäurepeelings & Lifting.",
    neighborhoodInfo: "Von Hasbergen aus fahren Sie über die Rheiner Landstraße direkt nach Osnabrück-Westerberg. Unser Kosmetikstudio liegt verkehrsgünstig mit eigenen Hof-Parkplätzen."
  },
  "hagen": {
    slug: "hagen",
    name: "Hagen a.T.W.",
    distanceKm: "13",
    durationMin: "18",
    routeHighlight: "über die Hagener Straße und Lotter Straße",
    introText: "Kosmetische Behandlungen auf höchstem Niveau für Kundinnen und Kunden aus Hagen a.T.W. In nur 18 Minuten sind Sie bei uns für Ihr individuelles JetPeel™-Erlebnis.",
    neighborhoodInfo: "Die Anfahrt aus Hagen a.T.W. über die Hagener Straße führt Sie direkt zu uns nach Osnabrück. Parkplätze stehen Ihnen während der Behandlung im Hof kostenlos zur Verfügung."
  },
  "bissendorf": {
    slug: "bissendorf",
    name: "Bissendorf",
    distanceKm: "14",
    durationMin: "15",
    routeHighlight: "über die A30 Ausfahrt Osnabrück-Hellern / Westerberg",
    introText: "Erreichen Sie uns aus Bissendorf über die A30 in nur 15 Minuten. Gönnen Sie Ihrer Haut das Beste mit modernsten Radiofrequenz-Behandlungen und medizinischer Kosmetik.",
    neighborhoodInfo: "Über die A30 fahren Sie schnell nach Osnabrück. Nehmen Sie die Ausfahrt Hellern Richtung Westerberg zur Lotter Straße 33. Kostenfreie Parkmöglichkeiten gibt es im Hof."
  },
  "ibbenbueren": {
    slug: "ibbenbueren",
    name: "Ibbenbüren",
    distanceKm: "29",
    durationMin: "25",
    routeHighlight: "über die A30 Richtung Osnabrück / Ausfahrt Hellern",
    introText: "Für erstklassige Kosmetik und Hautdiagnostik lohnt sich der Weg aus Ibbenbüren: Über die A30 sind Sie in 25 Minuten direkt bei SKIN einfach schön für Ihre VISIA® 3D Analyse.",
    neighborhoodInfo: "Die schnelle Anbindung über die A30 macht die Anreise aus Ibbenbüren unkompliziert. Eigene Patientenparkplätze direkt auf dem Hof sorgen für stressfreies Ankommen."
  },
  "melle": {
    slug: "melle",
    name: "Melle",
    distanceKm: "27",
    durationMin: "22",
    routeHighlight: "über die A30 Richtung Osnabrück / Ausfahrt Hellern",
    introText: "Effektives Anti-Aging und dauerhafte Haarentfernung für Kundinnen und Kunden aus Melle. Nur 22 Minuten Fahrtzeit trennen Sie von Ihrer persönlichen Hauterneuerung.",
    neighborhoodInfo: "Melle ist über die A30 direkt an Osnabrück angebunden. Unser Kosmetikstudio befindet sich zentrumsnahe an der Lotter Straße. Parken Sie kostenfrei direkt am Studio im Hof."
  }
};
