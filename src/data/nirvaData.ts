export type BottleSizeId = "250ml" | "500ml" | "750ml" | "1L";

export type PaperFinishId =
  | "rough-cotton"
  | "velvet-matte"
  | "embossed-linen"
  | "foil-parchment";

export type GalleryThemeId =
  | "raw-monolith"
  | "botanical-etch"
  | "heritage-arch"
  | "gilded-minimal"
  | "editorial-grid";

export type QrStyleId =
  | "minimal-frame"
  | "organic-dot"
  | "architectural-crest"
  | "monogram-seal";

export type VenueCategory =
  | "All"
  | "Cafes"
  | "Hotels"
  | "Offices"
  | "Colleges"
  | "Events";

export interface BottleSpec {
  id: BottleSizeId;
  volume: string;
  editionName: string;
  heightMm: number;
  diameterMm: number;
  visualScale: number; // proportional height factor in SVG showcase
  idealVenues: string;
  venueTags: string[];
  labelDimensions: string;
  capFinishes: string[];
  tastingNote: string;
  casePack: string;
}

export interface PaperFinish {
  id: PaperFinishId;
  name: string;
  weight: string;
  tactileDescription: string;
  cssClass: string;
  sheenHint: string;
}

export interface GalleryTheme {
  id: GalleryThemeId;
  name: string;
  subtitle: string;
  bgHex: string;
  textHex: string;
  accentHex: string;
  borderHex: string;
  isDark: boolean;
  defaultSublabel: string;
}

export interface QrStyleOption {
  id: QrStyleId;
  name: string;
  description: string;
}

export interface LabelAnatomyHotspot {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specDetail: string;
  position: { x: string; y: string };
}

export interface CollaborationSpace {
  id: string;
  name: string;
  category: Exclude<VenueCategory, "All">;
  city: string;
  bottleUsed: BottleSizeId;
  finishUsed: string;
  editionNote: string;
  year: string;
}

export const BOTTLE_SPECS: BottleSpec[] = [
  {
    id: "250ml",
    volume: "250 ml",
    editionName: "The Atelier Pour",
    heightMm: 168,
    diameterMm: 56,
    visualScale: 0.68,
    idealVenues: "Specialty Cafes, Espresso Bars & Executive Conferences",
    venueTags: ["Cafes", "Conferences", "Gallery Openings"],
    labelDimensions: "145 × 68 mm",
    capFinishes: ["Brushed Champagne", "Obsidian Matte", "Raw Aluminum"],
    tastingNote:
      "Sized to sit effortlessly beside a cortado saucer or conference folio without crowding the table.",
    casePack: "24 vessels per archival case",
  },
  {
    id: "500ml",
    volume: "500 ml",
    editionName: "The Everyday Signature",
    heightMm: 214,
    diameterMm: 66,
    visualScale: 0.82,
    idealVenues: "Corporate Offices, Universities, Studios & Curated Events",
    venueTags: ["Offices", "Colleges", "Events"],
    labelDimensions: "178 × 92 mm",
    capFinishes: ["Obsidian Matte", "Brushed Champagne", "Satin Pewter"],
    tastingNote:
      "Our most versatile architectural silhouette—balanced proportions for daily desk rituals and campus keynotes.",
    casePack: "20 vessels per archival case",
  },
  {
    id: "750ml",
    volume: "750 ml",
    editionName: "The Table Reserve",
    heightMm: 262,
    diameterMm: 76,
    visualScale: 0.92,
    idealVenues: "Fine Dining, Sommelier Pairings & Boutique Hotels",
    venueTags: ["Hotels", "Fine Dining", "Tasting Rooms"],
    labelDimensions: "210 × 108 mm",
    capFinishes: ["Brushed Champagne", "Polished Obsidian", "Knurled Brass"],
    tastingNote:
      "Sommelier-proportioned vessel designed to command the center of a candlelit dining table or guestroom credenza.",
    casePack: "12 vessels per archival case",
  },
  {
    id: "1L",
    volume: "1000 ml",
    editionName: "The Residence Carafe",
    heightMm: 296,
    diameterMm: 84,
    visualScale: 1.0,
    idealVenues: "Luxury Suites, Boardrooms & VIP Banquet Tables",
    venueTags: ["Luxury Suites", "VIP Tables", "Private Lounges"],
    labelDimensions: "232 × 124 mm",
    capFinishes: ["Brushed Champagne", "Knurled Brass", "Deep Obsidian"],
    tastingNote:
      "Generous, sculptural stature with expansive label real estate for multi-paragraph estate narratives.",
    casePack: "12 vessels per archival case",
  },
];

export const PAPER_FINISHES: PaperFinish[] = [
  {
    id: "rough-cotton",
    name: "Rough Uncoated Cotton",
    weight: "120 GSM",
    tactileDescription:
      "Mould-made organic cotton fibers with perceptible tooth and dry, gallery-grade warmth.",
    cssClass: "finish-cotton",
    sheenHint: "Matte · Organic Grain",
  },
  {
    id: "velvet-matte",
    name: "Velvet Matte Waterproof",
    weight: "135 GSM",
    tactileDescription:
      "Mineral-sealed soft-touch stock engineered for chilled ice-bucket service with zero glare.",
    cssClass: "finish-velvet",
    sheenHint: "Zero-Glare · Chilled Safe",
  },
  {
    id: "embossed-linen",
    name: "Embossed Linen Weave",
    weight: "130 GSM",
    tactileDescription:
      "Fine architectural cross-hatch texture pressed to catch oblique dining room light.",
    cssClass: "finish-linen",
    sheenHint: "Cross-Hatch · Tactile",
  },
  {
    id: "foil-parchment",
    name: "Foil-Accented Parchment",
    weight: "140 GSM",
    tactileDescription:
      "Warm alabaster parchment finished with a micro-debossed Brushed Champagne Gold hairline.",
    cssClass: "finish-parchment",
    sheenHint: "Champagne Foil Border",
  },
];

export const GALLERY_THEMES: GalleryTheme[] = [
  {
    id: "raw-monolith",
    name: "Raw Monolith",
    subtitle: "Obsidian stock · Champagne rule",
    bgHex: "#121211",
    textHex: "#F5F2EB",
    accentHex: "#B89B6A",
    borderHex: "#B89B6A",
    isDark: true,
    defaultSublabel: "PRIVATE EDITION · MINERAL STILL",
  },
  {
    id: "botanical-etch",
    name: "Botanical Etch",
    subtitle: "Warm alabaster · Fine line flora",
    bgHex: "#F5F2EB",
    textHex: "#141413",
    accentHex: "#7A7467",
    borderHex: "#C8C2B8",
    isDark: false,
    defaultSublabel: "BOTANICAL RESERVE · SPRING WATER",
  },
  {
    id: "heritage-arch",
    name: "Heritage Arch",
    subtitle: "Muted stone · Architectural portal",
    bgHex: "#E8E2D6",
    textHex: "#0E0E0E",
    accentHex: "#9A7E50",
    borderHex: "#0E0E0E",
    isDark: false,
    defaultSublabel: "HOUSE POUR · EST. MMXXVI",
  },
  {
    id: "gilded-minimal",
    name: "Gilded Minimal",
    subtitle: "Ivory silk · Champagne crest",
    bgHex: "#FAF8F4",
    textHex: "#1A1815",
    accentHex: "#B89B6A",
    borderHex: "#B89B6A",
    isDark: false,
    defaultSublabel: "CURATED TABLE SELECTION",
  },
  {
    id: "editorial-grid",
    name: "Editorial Grid",
    subtitle: "Charcoal slate · Swiss rules",
    bgHex: "#1C1B19",
    textHex: "#EFECE4",
    accentHex: "#C8C2B8",
    borderHex: "#5C5852",
    isDark: true,
    defaultSublabel: "ATELIER SERIES · PH 7.4",
  },
];

export const QR_STYLE_OPTIONS: QrStyleOption[] = [
  {
    id: "minimal-frame",
    name: "Minimal Frame",
    description: "1px architectural border with crisp square modules",
  },
  {
    id: "organic-dot",
    name: "Organic Dot",
    description: "Micro-droplet matrix evoking spring mineralization",
  },
  {
    id: "architectural-crest",
    name: "Architectural Crest",
    description: "Chamfered registration corners with champagne crosshairs",
  },
  {
    id: "monogram-seal",
    name: "Monogram Seal",
    description: "Circular atelier stamp uniting Nirva mark & QR",
  },
];

export const LABEL_ANATOMY_HOTSPOTS: LabelAnatomyHotspot[] = [
  {
    id: "identity-canvas",
    number: "01",
    title: "Client Identity Canvas",
    subtitle: "Primary Brand Surface",
    description:
      "A generous, uninterrupted front plane dedicated exclusively to your crest, wordmark, or commissioned artwork. Printed at 2400 DPI archival resolution with optional micro-foil debossing.",
    specDetail: "72% front-facing visual hierarchy · Custom Pantone & Foil ready",
    position: { x: "32%", y: "42%" },
  },
  {
    id: "story-column",
    number: "02",
    title: "The Story Column",
    subtitle: "Micro-Editorial Provenance",
    description:
      "A calibrated 38mm vertical typographic column reserved for the narrative of your space—whether detailing a roastery's origin, a hotel's architectural heritage, or an exhibition manifesto.",
    specDetail: "6.5pt archival serif setting · Up to 220 characters",
    position: { x: "72%", y: "34%" },
  },
  {
    id: "nirva-qr",
    number: "03",
    title: "The Nirva Mark & Theme-Matched QR",
    subtitle: "Discreet Co-Brand Signature",
    description:
      "Positioned tastefully in the lower perimeter, Nirva's miniature mark pairs with a bespoke-styled QR code tinted to match your paper and ink—inviting guests to discover the craft behind every pour.",
    specDetail: "Links to nirva.atelier · 4 custom matrix geometries",
    position: { x: "76%", y: "74%" },
  },
];

export const COLLABORATIONS: CollaborationSpace[] = [
  {
    id: "kanso-espresso",
    name: "Kanso Espresso Bar",
    category: "Cafes",
    city: "Kyoto · Mumbai",
    bottleUsed: "250ml",
    finishUsed: "Rough Uncoated Cotton",
    editionNote: "Paired alongside single-origin pour-overs with a raw stone ink label.",
    year: "2026",
  },
  {
    id: "caldwell-house",
    name: "The Caldwell House",
    category: "Hotels",
    city: "London",
    bottleUsed: "750ml",
    finishUsed: "Foil-Accented Parchment",
    editionNote: "Bedside & dining reserve featuring room-history notes in the Story Column.",
    year: "2026",
  },
  {
    id: "atelier-vance",
    name: "Atelier Vance Architects",
    category: "Offices",
    city: "Zurich",
    bottleUsed: "500ml",
    finishUsed: "Embossed Linen Weave",
    editionNote: "Swiss-grid monochrome edition crafted for client material reviews.",
    year: "2025",
  },
  {
    id: "ashford-design",
    name: "Ashford School of Design",
    category: "Colleges",
    city: "New Haven",
    bottleUsed: "500ml",
    finishUsed: "Velvet Matte Waterproof",
    editionNote: "Commencement & visiting-lecture series printed in archival obsidian.",
    year: "2026",
  },
  {
    id: "palazzo-salon",
    name: "Palazzo Contarini Salon",
    category: "Events",
    city: "Venice",
    bottleUsed: "1L",
    finishUsed: "Foil-Accented Parchment",
    editionNote: "Numbered VIP dinner edition with gilded seal QR linking to evening programme.",
    year: "2026",
  },
  {
    id: "sable-grain",
    name: "Sable & Grain Roastery",
    category: "Cafes",
    city: "Melbourne",
    bottleUsed: "250ml",
    finishUsed: "Velvet Matte Waterproof",
    editionNote: "Zero-glare black label engineered for chilled espresso-tonic pairings.",
    year: "2025",
  },
];
