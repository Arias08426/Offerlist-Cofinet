/**
 * Google Sheets Configuration
 * URLs for loading coffee data directly from Google Sheets API
 */

export const GOOGLE_SHEETS_CONFIG = {
  // USA (default/fallback)
  USA: "https://sheets.googleapis.com/v4/spreadsheets/1aTj1OGlV6xDv7WF6PrfB42cj0H7EOG7UG5eRYujaLuo/values/Hoja%201?key=AIzaSyDTKhJZiXOQ9UOh4Yvlm7VRM3-2VGi_WLM",
  // UK
  UK: "https://sheets.googleapis.com/v4/spreadsheets/1aTj1OGlV6xDv7WF6PrfB42cj0H7EOG7UG5eRYujaLuo/values/UK?key=AIzaSyDTKhJZiXOQ9UOh4Yvlm7VRM3-2VGi_WLM",
  // CANADA
  CANADA: "https://sheets.googleapis.com/v4/spreadsheets/1aTj1OGlV6xDv7WF6PrfB42cj0H7EOG7UG5eRYujaLuo/values/CANADA?key=AIzaSyDTKhJZiXOQ9UOh4Yvlm7VRM3-2VGi_WLM",
};

/**
 * Expected CSV/Sheets columns:
 * - producer: Name of the coffee producer
 * - farm: Farm name (optional)
 * - origin: Country of origin
 * - varietal: Coffee varietal
 * - process: Processing method (WASHED, NATURAL, HONEY, etc.)
 * - score: Cupping score (0-100)
 * - flavor_profile: Flavor description
 * - bags: Number of bags available
 * - kg_per_bag: Kilos per bag
 * - price: Price per unit
 * - currency: Currency code (USD, AUD, EUR, etc.)
 * - category: Product category (microlots, exotics, upcoming-coffee, regional, regional-plus, single-estate)
 * - country: Destination country for filtering (optional)
 */
