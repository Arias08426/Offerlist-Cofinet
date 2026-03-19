import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Segoe UI", "sans-serif"],
      },
      colors: {
        cofinet: {
          green: "#3a5a40",
          "green-light": "#5a7a5f",
          gold: "#b5933a",
          cream: "#f5f0e8",
          dark: "#1a1a1a",
          text: "#2c2c2c",
        },
        category: {
          microlots: "#3a5a40",
          exotics: "#6b3a5a",
          upcoming: "#2c4a6b",
          regional: "#5a3a2c",
          "regional-plus": "#6b4a2c",
          "single-estate": "#2c3a5a",
        },
        process: {
          washed: "#4a9e6b",
          natural: "#d4a444",
          honey: "#e8873a",
          ef2: "#8e6bbf",
        },
      },
    },
  },
  plugins: [],
};
export default config;
