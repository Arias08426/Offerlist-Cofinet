"use client";

function scoreColor(score: number): string {
  if (score >= 90) return { bg: "#3a5a40", text: "#fff" } as unknown as string;
  if (score >= 87) return { bg: "#5a7a40", text: "#fff" } as unknown as string;
  if (score >= 85) return { bg: "#7a9a50", text: "#fff" } as unknown as string;
  return { bg: "#9aaa60", text: "#fff" } as unknown as string;
}

export default function ScoreBadge({ score }: { score: number | string }) {
  const num = typeof score === "number" ? score : parseFloat(String(score));
  const isValid = !isNaN(num);

  let bg = "#3a5a40";
  let text = "#fff";
  if (isValid) {
    if (num >= 90) { bg = "#2e4d2e"; text = "#fff"; }
    else if (num >= 87) { bg = "#3a5a40"; text = "#fff"; }
    else if (num >= 85) { bg = "#4a7a50"; text = "#fff"; }
    else { bg = "#6a9a60"; text = "#fff"; }
  }

  return (
    <span
      className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shadow"
      style={{ backgroundColor: bg, color: text }}
    >
      {isValid ? num : score}
    </span>
  );
}
