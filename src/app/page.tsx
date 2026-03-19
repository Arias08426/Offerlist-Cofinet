"use client";

import { useData } from "@/context/DataContext";
import { CATEGORIES } from "@/lib/types";
import CategoryCard from "@/components/CategoryCard";
import { ChevronDown, Coffee } from "lucide-react";

export default function HomePage() {
  const { entries, availableCountries, selectedCountry, setSelectedCountry } = useData();

  const countByCategory = (slug: string) =>
    entries.filter((e) => e.category === slug && e.country === selectedCountry).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Header Section */}
      <section className="mb-16 flex flex-col items-center text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#18362f] shadow-lg">
            <Coffee className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="font-display text-3xl font-bold text-[#14342b] sm:text-4xl">
              Catálogo
            </h1>
            <p className="text-[#647672]">Café de Exportación</p>
          </div>
        </div>

        <h2 className="mb-2 font-display text-2xl font-bold text-[#14342b]">
          Inventario Disponible en Tiempo Real
        </h2>
        <p className="mb-8 text-[#647672]">
          Selecciona tu oficina más cercana para ver existencias
        </p>

        <div className="relative w-full max-w-sm">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full appearance-none rounded-xl border-2 border-[#b8794f] bg-white px-5 py-3.5 pr-10 text-lg font-semibold text-[#14342b] shadow-sm focus:border-[#a56b43] focus:outline-none focus:ring-4 focus:ring-[#b8794f]/20 cursor-pointer"
          >
            {availableCountries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <ChevronDown className="h-5 w-5 text-[#b8794f]" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              count={countByCategory(cat.slug)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
