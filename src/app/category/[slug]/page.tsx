"use client";

import { use, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Coffee } from "lucide-react";
import { useData } from "@/context/DataContext";
import { CATEGORIES, CoffeeEntry } from "@/lib/types";
import { LotCard, LotDetailsModal } from "@/components/LotCard";

interface Params {
  slug: string;
}

export default function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = use(params);
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const { entries, selectedCountry, availableCountries, setSelectedCountry } = useData();
  const [selectedProcess, setSelectedProcess] = useState("all");
  const [minimumScore, setMinimumScore] = useState(0);
  const [openEntry, setOpenEntry] = useState<CoffeeEntry | null>(null);

  const categoryEntries = useMemo(
    () => entries.filter((entry) => entry.category === slug),
    [entries, slug]
  );

  const filtered = useMemo(() => {
    return categoryEntries
      .filter((entry) => {
        const byCountry =
          !entry.country || entry.country === selectedCountry;
        const byProcess =
          selectedProcess === "all" || String(entry.process).toUpperCase() === selectedProcess;
        const score = Number(entry.score);
        const byScore = Number.isFinite(score) ? score >= minimumScore : minimumScore === 0;
        return byCountry && byProcess && byScore;
      })
      .sort((a, b) => Number(b.score) - Number(a.score));
  }, [categoryEntries, minimumScore, selectedCountry, selectedProcess]);

  const processOptions = useMemo(() => {
    const options = new Set<string>();
    categoryEntries.forEach((entry) => options.add(String(entry.process).toUpperCase()));
    return Array.from(options);
  }, [categoryEntries]);

  const currentIndex = CATEGORIES.findIndex((c) => c.slug === slug);
  const prevCat = CATEGORIES[currentIndex - 1];
  const nextCat = CATEGORIES[currentIndex + 1];
  const showCountryFilter = availableCountries.length > 1;

  const scoreOptions = [
    { label: "Todas", value: 0 },
    { label: "83+ pts", value: 83 },
    { label: "85+ pts", value: 85 },
    { label: "87+ pts", value: 87 },
  ];

  const processLabel = (value: string) => {
    if (value === "WASHED") return "Lavado";
    if (value === "NATURAL") return "Natural";
    if (value === "HONEY") return "Honey";
    if (value === "EF2" || value === "EF2 NATURAL") return "EF2";
    return value;
  };

  return (
    <div className="min-h-screen bg-[#f0ece7]">
      <section className="border-b border-black/10 bg-gradient-to-b from-white to-[#f9f8f6] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/"
            className="mb-6 inline-block text-xs font-semibold uppercase tracking-widest text-slate-400 transition hover:text-slate-600"
          >
            ← Volver a categorias
          </Link>

          <div className="mb-6 flex items-center justify-center gap-3">
            <div
              className="grid h-14 w-14 place-items-center rounded-2xl text-white"
              style={{ backgroundColor: category.color }}
            >
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-slate-800">Catálogo</p>
              <p className="text-sm text-slate-500">Café de Exportación</p>
            </div>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
            Inventario Disponible en Tiempo Real
          </h1>
          <p className="mt-2 text-base text-slate-500 sm:text-lg">
            Selecciona tu oficina mas cercana para ver existencias
          </p>

          {showCountryFilter && (
            <div className="mx-auto mt-4 max-w-md">
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(event) => setSelectedCountry(event.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-[#be7f57] bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:ring-2 focus:ring-[#be7f57]/25"
                >
                  {availableCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="sticky top-14 z-30 border-y border-black/5 bg-white/95 px-4 py-5 backdrop-blur sm:px-6">
        <div className="mx-auto max-w-7xl space-y-5">
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Proceso</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedProcess("all")}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  selectedProcess === "all"
                    ? "border-transparent bg-[#1f7f77] text-white shadow"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                Todos
              </button>
              {processOptions.map((process) => (
                <button
                  key={process}
                  onClick={() => setSelectedProcess(process)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    selectedProcess === process
                      ? "border-transparent bg-[#1f7f77] text-white shadow"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {processLabel(process)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Puntuacion Minima (SCA)</p>
            <div className="flex flex-wrap gap-2">
              {scoreOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setMinimumScore(option.value)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    minimumScore === option.value
                      ? "border-transparent bg-[#1f7f77] text-white shadow"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-3xl font-bold text-[#103448] sm:text-4xl">
              Mostrando {filtered.length} productos en la oficina de {selectedCountry}
            </h2>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              {prevCat && (
                <Link href={`/category/${prevCat.slug}`} className="transition hover:text-slate-700">
                  ← {prevCat.label}
                </Link>
              )}
              {nextCat && (
                <Link href={`/category/${nextCat.slug}`} className="transition hover:text-slate-700">
                  {nextCat.label} →
                </Link>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-12 text-center text-slate-500">
              No hay lotes que coincidan con los filtros seleccionados.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((entry, index) => (
                <LotCard
                  key={`${entry.producer}-${entry.origin}-${index}`}
                  entry={entry}
                  categoryColor={category.color}
                  selectedCountry={selectedCountry}
                  onOpenDetails={setOpenEntry}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {openEntry && (
        <LotDetailsModal
          entry={openEntry}
          categoryColor={category.color}
          onClose={() => setOpenEntry(null)}
          availableCountries={availableCountries}
        />
      )}
    </div>
  );
}
