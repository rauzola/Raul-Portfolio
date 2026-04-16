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
        display: ["var(--font-syne)", "sans-serif"],
        "mono-ui": ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        /* Hero grid background drift */
        "grid-drift": {
          "0%":   { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-60px)" },
        },
        /* Gentle float for stat cards and divider diamonds */
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-8px)" },
        },
        /* Pulsing dot for "live" indicators */
        "live-pulse": {
          "0%, 100%": { opacity: "1",   transform: "scale(1)" },
          "50%":       { opacity: "0.4", transform: "scale(0.78)" },
        },
        /* Scroll indicator line */
        "scroll-line": {
          "0%":   { transform: "scaleY(0)",   transformOrigin: "top",    opacity: "1" },
          "48%":  { transform: "scaleY(1)",   transformOrigin: "top",    opacity: "1" },
          "50%":  { transform: "scaleY(1)",   transformOrigin: "bottom", opacity: "1" },
          "100%": { transform: "scaleY(0)",   transformOrigin: "bottom", opacity: "0" },
        },
      },
      animation: {
        "grid-drift":    "grid-drift 14s linear infinite",
        "float-gentle":  "float-gentle 3.4s ease-in-out infinite",
        "live-pulse":    "live-pulse 1.9s ease-in-out infinite",
        "scroll-line":   "scroll-line 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
