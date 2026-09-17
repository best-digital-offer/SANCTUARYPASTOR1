import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0f1a2b",
        ivory: "#faf6ee",
        cream: "#f3ead9",
        gold: "#c9a24b",
        royal: "#2b4a8b",
        sanctuary: {
          purple: "#4a3b6b",
          green: "#3f5d4a",
        },
      },
      fontFamily: {
        serif: ["Georgia", "'Iowan Old Style'", "serif"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        sunrise: "linear-gradient(135deg, #0f1a2b 0%, #2b4a8b 55%, #c9a24b 130%)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.015)" },
        },
        blink: {
          "0%, 96%, 100%": { transform: "scaleY(1)" },
          "98%": { transform: "scaleY(0.06)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(201,162,75,0.0)" },
          "50%": { boxShadow: "0 0 40px rgba(201,162,75,0.35)" },
        },
      },
      animation: {
        breathe: "breathe 6s ease-in-out infinite",
        blink: "blink 4.5s ease-in-out infinite",
        glow: "glow 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
