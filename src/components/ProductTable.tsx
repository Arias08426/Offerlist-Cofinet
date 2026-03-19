"use client";

import { CoffeeEntry } from "@/lib/types";
import ProcessBadge from "./ProcessBadge";
import ScoreBadge from "./ScoreBadge";

interface Props {
  entries: CoffeeEntry[];
  showOrigin?: boolean;
}

export default function ProductTable({ entries, showOrigin = true }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        No products found for this category.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-44">
              Producer
            </th>
            {showOrigin && (
              <th className="text-left py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-28">
                Origin
              </th>
            )}
            <th className="text-left py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-28">
              Varietal
            </th>
            <th className="text-left py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-28">
              Process
            </th>
            <th className="text-center py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-16">
              Score
            </th>
            <th className="text-left py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              Flavor Profile
            </th>
            <th className="text-center py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-14">
              Bags
            </th>
            <th className="text-center py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-16">
              KG/BAG
            </th>
            <th className="text-right py-2 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-20">
              $/KG
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-100 hover:bg-white/50 transition-colors"
            >
              {/* Producer */}
              <td className="py-3 px-3 align-top">
                <div className="font-semibold text-sm text-cofinet-dark leading-tight">
                  {entry.producer}
                </div>
                {entry.farm && (
                  <div className="text-xs text-gray-400 mt-0.5">{entry.farm}</div>
                )}
              </td>

              {/* Origin */}
              {showOrigin && (
                <td className="py-3 px-3 align-top">
                  <span className="text-sm text-gray-700">{entry.origin}</span>
                </td>
              )}

              {/* Varietal */}
              <td className="py-3 px-3 align-top">
                <span className="text-sm text-gray-700">{entry.varietal}</span>
              </td>

              {/* Process */}
              <td className="py-3 px-3 align-top">
                <ProcessBadge process={entry.process} />
              </td>

              {/* Score */}
              <td className="py-3 px-3 align-top text-center">
                <ScoreBadge score={entry.score} />
              </td>

              {/* Flavor Profile */}
              <td className="py-3 px-3 align-top">
                <span className="text-sm text-gray-600 italic">{entry.flavorProfile}</span>
              </td>

              {/* Bags */}
              <td className="py-3 px-3 align-top text-center">
                <span className="text-sm font-medium">{entry.bags}</span>
              </td>

              {/* KG/BAG */}
              <td className="py-3 px-3 align-top text-center">
                <span className="text-sm font-medium">{entry.kgPerBag}</span>
              </td>

              {/* Price */}
              <td className="py-3 px-3 align-top text-right">
                <div className="text-base font-bold text-[#3a8a3a]">
                  ${entry.price}
                </div>
                <div className="text-[10px] text-gray-400 uppercase">
                  {entry.currency || "AUD"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
