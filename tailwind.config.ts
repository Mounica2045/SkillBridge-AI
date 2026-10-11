import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060913",
          900: "#0B0F19",
          850: "#0F1626",
          800: "#141C2E",
          700: "#1E293B",
          600: "#334155",
        },
        violet: {
          950: "#13092B",
          900: "#1E123B",
          800: "#2E1B54",
          700: "#4C1D95",
          600: "#6D28D9",
          500: "#8B5CF6",
          400: "#A78BFA",
        },
        cyan: {
          500: "#06B6D4",
          400: "#22D3EE",
          300: "#67E8F9",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.18), rgba(6, 182, 212, 0.08) 40%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
