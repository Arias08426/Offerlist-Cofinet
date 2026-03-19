"use client";

import { ProcessType } from "@/lib/types";

const PROCESS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  WASHED: { bg: "#d4edda", text: "#3a5a40", label: "WASHED" },
  NATURAL: { bg: "#fff3cd", text: "#7a5a00", label: "NATURAL" },
  HONEY: { bg: "#fde8d0", text: "#7a3a00", label: "HONEY" },
  "EF2 NATURAL": { bg: "#ede0ff", text: "#5a2a8a", label: "EF2 NATURAL" },
  EF2: { bg: "#ede0ff", text: "#5a2a8a", label: "EF2" },
};

export default function ProcessBadge({ process }: { process: ProcessType }) {
  const key = String(process).toUpperCase().trim();
  const style = PROCESS_STYLES[key] ?? {
    bg: "#e8e8e8",
    text: "#444",
    label: key,
  };

  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}
