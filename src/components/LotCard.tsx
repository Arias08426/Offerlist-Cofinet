"use client";

import { CoffeeEntry } from "@/lib/types";
import { Award, Factory, User, Package, MapPin, MessageCircle, Sprout, X, Info } from "lucide-react";

const DEFAULT_OFFICES = ["USA", "CANADA", "EUROPE", "UK", "SINGAPORE", "AUSTRALIA"];

type OfficeAvailability = {
  office: string;
  kg: number;
};

function parseNumber(value: number | string): number {
  const parsed = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseKgPerBag(value: number | string): number {
  const match = String(value).match(/\d+(?:\.\d+)?/);
  if (!match) return 0;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : 0;
}

function processLabel(process: string): string {
  const key = process.toUpperCase().trim();
  if (key === "WASHED") return "Lavado";
  if (key === "NATURAL") return "Natural";
  if (key === "HONEY") return "Honey";
  if (key === "EF2" || key === "EF2 NATURAL") return "EF2";
  return process;
}

function stockState(kg: number): { label: string; className: string } {
  if (kg <= 0) {
    return {
      label: "Agotado",
      className: "bg-slate-100 text-slate-500",
    };
  }

  if (kg < 70) {
    return {
      label: "Pocas Unidades",
      className: "bg-[#f5e6e3] text-[#8c5047]",
    };
  }

  return {
    label: "Disponible",
    className: "bg-[#e1efeb] text-[#2c6558]",
  };
}

function buildWhatsappUrl(entry: CoffeeEntry, office: string): string {
  const msg = `Hola Cofinet, quiero consultar disponibilidad del lote ${entry.producer} para ${office}.`;
  return `https://wa.me/573001112233?text=${encodeURIComponent(msg)}`;
}

function buildOfficeAvailability(totalKg: number, offices: string[]): OfficeAvailability[] {
  const base = offices.length > 0 ? offices : DEFAULT_OFFICES;
  const weights = [0.3, 0.2, 0.16, 0.14, 0.1, 0.1];

  const distribution = base.map((office, index) => {
    const ratio = weights[index] ?? 0.08;
    return {
      office,
      kg: Math.max(0, Math.round(totalKg * ratio)),
    };
  });

  // Keep one office explicitly at zero to mirror the "Sin stock" behavior from the reference.
  if (distribution.length >= 5) {
    distribution[4].kg = 0;
  }

  return distribution;
}

function totalKg(entry: CoffeeEntry): number {
  return Math.round(parseNumber(entry.bags) * parseKgPerBag(entry.kgPerBag));
}

type LotCardProps = {
  entry: CoffeeEntry;
  categoryColor: string;
  selectedCountry: string;
  onOpenDetails: (entry: CoffeeEntry) => void;
};

export function LotCard({ entry, categoryColor, selectedCountry, onOpenDetails }: LotCardProps) {
  const availableKg = totalKg(entry);
  const availability = stockState(availableKg);
  const score = parseNumber(entry.score);

  return (
    <article className="rounded-2xl border border-black/5 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <header
        className="rounded-t-2xl px-5 py-4 text-white"
        style={{
          background: `linear-gradient(135deg, ${categoryColor}, #1f7f77)`,
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight">{entry.producer}</h3>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-white/85">
              <MapPin className="h-3.5 w-3.5" /> {entry.origin}
            </p>
          </div>
          <button
            onClick={() => onOpenDetails(entry)}
            className="rounded-full bg-white/15 p-2 text-white/90 transition hover:bg-white/25"
            aria-label={`Ver detalles de ${entry.producer}`}
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-stone-100 px-4 py-1.5 text-base font-semibold text-slate-700">
            {processLabel(String(entry.process))}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#b8794f]/15 px-3 py-1.5 text-lg font-bold text-[#b8794f]">
            <Award className="h-4 w-4" /> {score} pts
          </span>
        </div>

        <div className="rounded-xl bg-stone-100/85 p-3">
          <p className="text-sm text-slate-500">Stock Disponible</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-3xl font-black tracking-tight text-slate-900">{availableKg} kg</p>
            <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${availability.className}`}>
              {availability.label}
            </span>
          </div>
        </div>

        <button
          onClick={() => onOpenDetails(entry)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-[#ece4db] px-4 py-3 text-lg font-semibold text-slate-800 transition hover:bg-[#e6dccc]"
        >
          <Info className="h-5 w-5" /> Ver Detalles Completos
        </button>

        <a
          href={buildWhatsappUrl(entry, selectedCountry)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#b8794f] px-4 py-3 text-lg font-semibold text-white transition hover:bg-[#a66f49]"
        >
          <MessageCircle className="h-5 w-5" /> Consultar via WhatsApp
        </a>
      </div>
    </article>
  );
}

type LotDetailsModalProps = {
  entry: CoffeeEntry;
  categoryColor: string;
  onClose: () => void;
  availableCountries: string[];
};

export function LotDetailsModal({ entry, categoryColor, onClose, availableCountries }: LotDetailsModalProps) {
  const score = parseNumber(entry.score);
  const offices = availableCountries;
  const availabilityRows = buildOfficeAvailability(totalKg(entry), offices);

  const bgUrl = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200";

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6" 
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Image Area */}
        <div 
          className="relative h-48 shrink-0 sm:h-56"
          style={{ 
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            aria-label="Cerrar detalles"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 flex items-center gap-3">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#14342b] shadow-sm">
              {processLabel(String(entry.process))}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-[#b8794f] px-4 py-1.5 text-sm font-bold text-white shadow-sm">
              <Award className="h-4 w-4" /> {score} pts
            </span>
          </div>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex w-full flex-col overflow-y-auto">
          <div className="p-6 sm:p-8">
            {/* Title & Location */}
            <h2 className="font-display text-3xl font-bold text-[#14342b] sm:text-4xl">
              {entry.producer}
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-lg text-slate-500">
              <MapPin className="h-5 w-5" /> {entry.farm ? `${entry.farm}, ` : ''}{entry.origin}
            </p>

            {/* Highlighted Description */}
            <div className="mt-6 rounded-xl bg-[#f8f6f2] p-5 text-lg leading-relaxed text-[#3a4f4b]">
              El proceso {processLabel(String(entry.process)).toLowerCase()} aporta un perfil excepcional y único durante el secado y fermentación. Este lote exclusivo de {entry.origin} combina tradición familiar con técnicas innovadoras de procesamiento para alcanzar {score} puntos.
            </div>

            {/* Perfil de Sabor */}
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold text-[#14342b]">Perfil de Sabor</h3>
              <p className="mt-2 text-lg italic text-slate-600">
                {entry.flavorProfile}
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1 rounded-xl bg-[#fbfaf8] p-4 border border-black/5">
                <span className="flex items-center gap-2 text-sm text-slate-400">
                  <User className="h-4 w-4" /> Productor
                </span>
                <span className="font-semibold text-[#14342b] text-lg">{entry.producer}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-[#fbfaf8] p-4 border border-black/5">
                <span className="flex items-center gap-2 text-sm text-slate-400">
                  <Factory className="h-4 w-4" /> Finca
                </span>
                <span className="font-semibold text-[#14342b] text-lg">{entry.farm || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-[#fbfaf8] p-4 border border-black/5">
                <span className="flex items-center gap-2 text-sm text-slate-400">
                  <Sprout className="h-4 w-4" /> Variedad
                </span>
                <span className="font-semibold text-[#14342b] text-lg">{entry.varietal}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-[#fbfaf8] p-4 border border-black/5">
                <span className="flex items-center gap-2 text-sm text-slate-400">
                  <Package className="h-4 w-4" /> Empaque
                </span>
                <span className="font-semibold text-[#14342b] text-lg">{entry.bags}x {entry.kgPerBag}kg</span>
              </div>
            </div>

            {/* Disponibilidad por Oficina */}
            <div className="mt-10 mb-2">
              <h3 className="mb-5 font-display text-2xl font-bold text-[#14342b]">
                Disponibilidad por Oficina
              </h3>
              <div className="space-y-3">
                {availabilityRows.map((row) => {
                  const state = stockState(row.kg);
                  const disabled = row.kg <= 0;

                  return (
                    <div
                      key={row.office}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-[#fbfaf8] p-4 border border-black/5"
                    >
                      <div>
                        <p className="font-bold text-[#14342b] text-lg uppercase tracking-wide">{row.office}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-slate-500">{row.kg} kg</span>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${state.className}`}>
                            {state.label}
                          </span>
                        </div>
                      </div>

                      <a
                        href={buildWhatsappUrl(entry, row.office)}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-center gap-2 rounded-[10px] px-6 py-2.5 font-bold transition-all w-full sm:w-auto ${
                          disabled
                            ? "pointer-events-none bg-slate-200 text-slate-500"
                            : "bg-[#b8794f] text-white hover:bg-[#a56b43]"
                        }`}
                      >
                        <MessageCircle className="h-5 w-5" /> WhatsApp
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
