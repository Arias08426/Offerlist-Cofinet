"use client";

import Link from "next/link";
import { useData } from "@/context/DataContext";
import { Coffee } from "lucide-react";

export default function Header() {
  const { selectedCountry } = useData();

  return (
    <header className="sticky top-0 z-50 bg-[#18362f] border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Coffee className="w-7 h-7 text-white transition-colors hover:text-white/80" />
          <span className="hidden sm:block text-[10px] text-white/40 font-medium uppercase tracking-widest mt-0.5 border-l border-white/20 pl-2">
            Where Speciality Begins
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-xs bg-white/10 text-white rounded-full px-3 py-1 font-semibold flex items-center gap-1.5 shadow-sm">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
             Oficina: {selectedCountry}
          </div>
        </div>
      </div>
    </header>
  );
}
