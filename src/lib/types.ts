export type ProcessType = "WASHED" | "NATURAL" | "HONEY" | "EF2 NATURAL" | "EF2" | string;

export type CategorySlug =
  | "microlots"
  | "exotics"
  | "upcoming-coffee"
  | "regional"
  | "regional-plus"
  | "single-estate";

export interface CoffeeEntry {
  producer: string;
  farm?: string;
  origin: string;
  varietal: string;
  process: ProcessType;
  score: number | string;
  flavorProfile: string;
  bags: number | string;
  kgPerBag: number | string;
  price: number | string;
  currency: string;
  category: CategorySlug;
  country?: string; // destination country for filtering
}

export interface CategoryDefinition {
  slug: CategorySlug;
  label: string;
  tagline: string;
  color: string;
  bgClass: string;
  headerBg: string;
  textColor: string;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: "microlots",
    label: "Microlots",
    tagline: "Small batches, big character",
    color: "#3a5a40",
    bgClass: "bg-[#3a5a40]",
    headerBg: "#3a5a40",
    textColor: "text-white",
  },
  {
    slug: "exotics",
    label: "Exotics",
    tagline: "Rare & extraordinary origins",
    color: "#6b3a5a",
    bgClass: "bg-[#6b3a5a]",
    headerBg: "#6b3a5a",
    textColor: "text-white",
  },
  {
    slug: "upcoming-coffee",
    label: "Upcoming Coffee",
    tagline: "Arriving soon — reserve now",
    color: "#1e3a5a",
    bgClass: "bg-[#1e3a5a]",
    headerBg: "#1e3a5a",
    textColor: "text-white",
  },
  {
    slug: "regional",
    label: "Regional",
    tagline: "Distinct terroir, consistent quality",
    color: "#5a3a2c",
    bgClass: "bg-[#5a3a2c]",
    headerBg: "#5a3a2c",
    textColor: "text-white",
  },
  {
    slug: "regional-plus",
    label: "Regional Plus",
    tagline: "Premium regional selections",
    color: "#7a4a1e",
    bgClass: "bg-[#7a4a1e]",
    headerBg: "#7a4a1e",
    textColor: "text-white",
  },
  {
    slug: "single-estate",
    label: "Single Estate",
    tagline: "Farm-to-roaster traceability",
    color: "#2c3a5a",
    bgClass: "bg-[#2c3a5a]",
    headerBg: "#2c3a5a",
    textColor: "text-white",
  },
];
