import { CoffeeEntry } from "./types";

export interface GoogleSheetsRow {
  [key: string]: string | number;
}

/**
 * Fetch data from Google Sheets API
 * @param sheetUrl Full Google Sheets API URL with API key
 * @returns Array of rows from the sheet
 */
export async function fetchGoogleSheets(
  sheetUrl: string
): Promise<GoogleSheetsRow[]> {
  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }
    const data = await response.json();

    // Extract rows from the API response
    const rows = data.values || [];
    if (rows.length === 0) {
      return [];
    }

    // First row is headers
    const headers = rows[0];
    const dataRows = rows.slice(1);

    // Convert array of arrays to array of objects
    return dataRows.map((row: any[]) => {
      const obj: GoogleSheetsRow = {};
      headers.forEach((header: string, index: number) => {
        obj[header.toLowerCase().trim()] = row[index] || "";
      });
      return obj;
    });
  } catch (error) {
    console.error("Error fetching Google Sheets:", error);
    throw error;
  }
}

/**
 * Transform Google Sheets row to CoffeeEntry format
 * Handles multiple column formats (standard coffee format or custom format)
 */
export function transformGoogleSheetsToCoffeeEntry(
  row: GoogleSheetsRow
): CoffeeEntry | null {
  try {
    // Try DB Dump format (like from UK and CANADA)
    const sku = String(row.sku || row["sku"] || "").trim();
    const productName = String(row.productname || row["productname"] || "").trim();
    
    if (sku && productName) {
      const origin = String(row.origin || row["origin"] || "").trim();
      const variety = String(row.variety || row["variety"] || "").trim();
      const process = String(row.process || row["process"] || "WASHED").trim();
      
      const priceStr = String(row.priceperkg || row["priceperkg"] || "0").replace(",", ".");
      const price = parseFloat(priceStr) || 0;
      
      const bagSizeStr = String(row.bagsize || row["bagsize"] || "35");
      const kgPerBag = parseFloat(bagSizeStr) || 35;
      
      const lotStatus = String(row.lotstatus || row["lotstatus"] || "").toLowerCase();
      const productClass = String(row.productclass || row["productclass"] || "").toUpperCase();
      
      // Determine bags available
      let bags = 0;
      if (lotStatus === "expected") {
        const kgAvailable = parseFloat(String(row.kg_expected_available || "0"));
        bags = Math.round(kgAvailable / kgPerBag);
      } else {
        const kgAvailable = parseFloat(String(row.kg_physical_available || "0"));
        bags = Math.round(kgAvailable / kgPerBag);
      }
      
      // Map category
      let category = "regional" as any;
      if (lotStatus === "expected") {
        category = "upcoming-coffee";
      } else {
        if (productClass === "MICROLOTS") category = "microlots";
        else if (productClass === "EXPERIMENTALS") category = "exotics";
        else if (productClass === "REGIONALS_PLUS" || productClass === "RESERVE_PROGRAMS") category = "regional-plus";
        else if (productClass === "SINGLE_ESTATE") category = "single-estate";
        else category = "regional";
      }
      
      return {
        producer: productName,
        farm: undefined,
        origin,
        varietal: variety,
        process,
        score: "85", // Default unless provided somewhere
        flavorProfile: String(row.providername || row["providername"] || "Not specified"),
        bags: bags > 0 ? bags : 1, // Fallback to 1 if parsed as 0 but active
        kgPerBag,
        price,
        currency: "USD",
        category,
        country: String(row.office || row["office"] || "Unknown").trim().toUpperCase()
      };
    }

    // Try standard format first
    const producer = String(row.producer || row["producer"] || "").trim();
    const origin = String(row.origin || row["origin"] || "").trim();
    const varietal = String(row.varietal || row["varietal"] || "").trim();

    // If we have standard columns, use them
    if (producer && origin && varietal) {
      const process = String(row.process || row["process"] || "WASHED").trim();
      const category = String(
        row.category || row["category"] || "regional"
      ).trim() as any;
      const currency = String(row.currency || row["currency"] || "USD").trim();

      const entry: CoffeeEntry = {
        producer,
        farm: String(row.farm || row["farm"] || "").trim() || undefined,
        origin,
        varietal,
        process,
        score: row.score || row["score"] || "85",
        flavorProfile:
          String(row.flavor_profile || row["flavor_profile"] || "").trim() ||
          "Not specified",
        bags: row.bags || row["bags"] || "1",
        kgPerBag: row.kg_per_bag || row["kg_per_bag"] || "20",
        price: row.price || row["price"] || "0",
        currency,
        category,
        country: String(row.country || row["country"] || "USA").trim() || "USA",
      };

      return entry;
    }

    // Fallback: try flexible format (Oficina, Tipo de café, etc.)
    const oficina = String(row.oficina || row["oficina"] || "").trim();
    const tipoCafe = String(row["tipo de café"] || row["tipo_de_café"] || row.cafetype || "").trim();
    const gramosPerBag = String(row["gramos por bolsa"] || row["gramos_por_bolsa"] || "500").trim();
    const cantidad = String(row["cantidad disponible"] || row["cantidad_disponible"] || row.cantidad || "0").trim();

    if (!oficina && !tipoCafe) {
      return null; // Skip if no data found
    }

    const entry: CoffeeEntry = {
      producer: tipoCafe || "Unknown Coffee",
      farm: undefined,
      origin: oficina || "Colombia",
      varietal: tipoCafe.split(" ").slice(-1)[0] || "Arabica",
      process: "WASHED",
      score: "85",
      flavorProfile: `${tipoCafe} from ${oficina}`,
      bags: cantidad,
      kgPerBag: parseInt(gramosPerBag) / 1000 || 0.5, // Convert grams to kg
      price: "0",
      currency: "USD",
      category: "regional",
      country: "COLOMBIA",
    };

    return entry;
  } catch (error) {
    console.error("Error transforming row:", row, error);
    return null;
  }
}

/**
 * Fetch and transform Google Sheets data to CoffeeEntry format
 * @param sheetUrl Full Google Sheets API URL with API key
 * @returns Array of CoffeeEntry objects
 */
export async function loadCoffeeFromGoogleSheets(
  sheetUrl: string
): Promise<CoffeeEntry[]> {
  const rows = await fetchGoogleSheets(sheetUrl);
  const entries = rows
    .map(transformGoogleSheetsToCoffeeEntry)
    .filter((entry): entry is CoffeeEntry => entry !== null);

  return entries;
}
