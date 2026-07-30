import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        graphite: "#17181b",
        charcoal: "#232428",
        steel: "#4a4d55",
        mist: "#9ca0aa",
        paper: "#f4f4f2",
        gold: {
          DEFAULT: "#b9924a",
          light: "#d4b374",
          dark: "#8f6f34",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #b9924a, transparent)",
        "steel-radial":
          "radial-gradient(120% 120% at 50% 0%, #232428 0%, #0a0a0b 60%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(185,146,74,0.35)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
