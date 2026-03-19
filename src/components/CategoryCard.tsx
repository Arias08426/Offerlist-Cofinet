"use client";

import Link from "next/link";
import { Leaf, Gem, Clock, Map, Star, Home, Coffee } from "lucide-react";
import { CategoryDefinition } from "@/lib/types";

interface Props {
  category: CategoryDefinition;
  count: number;
}

const ICONS: Record<string, React.ElementType> = {
  microlots: Leaf,
  exotics: Gem,
  "upcoming-coffee": Clock,
  regional: Map,
  "regional-plus": Star,
  "single-estate": Home,
};

import React from "react";

export default function CategoryCard({ category, count }: Props) {
  const Icon = ICONS[category.slug] ?? Coffee;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: category.color }}
    >
      <div className="p-6 h-full flex flex-col justify-between min-h-[160px]">
        {/* Icon + count */}
        <div className="flex items-start justify-between">
          <Icon className="w-7 h-7 text-white/80" strokeWidth={1.5} />
          {count > 0 && (
            <span className="text-xs font-semibold bg-white/20 text-white rounded-full px-2 py-0.5">
              {count} lot{count !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Label */}
        <div>
          <h3 className="text-white font-bold text-xl leading-tight mt-4">
            {category.label}
          </h3>
          <p className="text-white/70 text-xs mt-1">{category.tagline}</p>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}
