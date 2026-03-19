"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { CoffeeEntry } from "@/lib/types";
import { SAMPLE_DATA } from "@/lib/sampleData";
import { loadCoffeeFromGoogleSheets } from "@/lib/googleSheets";
import { GOOGLE_SHEETS_CONFIG } from "@/lib/googleSheetsConfig";

interface DataContextValue {
  entries: CoffeeEntry[];
  selectedCountry: string;
  availableCountries: string[];
  setSelectedCountry: (c: string) => void;
}

const OFFICES = ["USA", "CANADA", "UK"];

const DataContext = createContext<DataContextValue>({
  entries: SAMPLE_DATA,
  selectedCountry: OFFICES[0],
  availableCountries: OFFICES,
  setSelectedCountry: () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState(OFFICES[0]);
  const [entries, setEntries] = useState<CoffeeEntry[]>(SAMPLE_DATA);

  // Load data from regional Google Sheets
  useEffect(() => {
    const loadAllRegionalData = async () => {
      try {
        // Load data from UK and CANADA
        const canadaData = await loadCoffeeFromGoogleSheets(GOOGLE_SHEETS_CONFIG.CANADA);
        const ukData = await loadCoffeeFromGoogleSheets(GOOGLE_SHEETS_CONFIG.UK);

        const canadaWithCountry = canadaData.map(e => ({ ...e, country: "CANADA" }));
        const ukWithCountry = ukData.map(e => ({ ...e, country: "UK" }));

        const usaData = SAMPLE_DATA.filter(e => e.country === "USA" || !e.country).map(e => ({ ...e, country: "USA" }));

        // Merge all data
        const mergedData = [...usaData, ...canadaWithCountry, ...ukWithCountry];
        
        // Only update if we have data
        if (mergedData.length > 0) {
          setEntries(mergedData);
        }
      } catch (error) {
        console.error("Error loading data from Google Sheets:", error);
        // Keep SAMPLE_DATA as fallback
      }
    };

    loadAllRegionalData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        entries,
        selectedCountry,
        availableCountries: OFFICES,
        setSelectedCountry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
