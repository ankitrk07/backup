import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        void: "#050508",
        space: {
          950: "#08090F",
          900: "#0D101A",
          850: "#121624",
          800: "#181D2F",
          700: "#222A42",
          600: "#323D5F",
          500: "#4B5B8A",
          400: "#7588B8",
          300: "#A4B4DE",
          200: "#CBD5F1",
          100: "#E8EDFB",
        },
        acid: {
          DEFAULT: "#CCFF00",
          hover: "#B5E300",
          muted: "rgba(204, 255, 0, 0.15)",
          glow: "rgba(204, 255, 0, 0.4)",
        },
        cosmic: {
          purple: "#8B5CF6",
          "purple-glow": "rgba(139, 92, 246, 0.4)",
          cyan: "#00F0FF",
          "cyan-glow": "rgba(0, 240, 255, 0.4)",
          crimson: "#FF0055",
          "crimson-glow": "rgba(255, 0, 85, 0.4)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        widest: "0.25em",
        ultra: "0.35em",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        full: "9999px",
      },
      boxShadow: {
        acid: "0 0 25px -3px rgba(204, 255, 0, 0.35)",
        "acid-lg": "0 0 45px 0px rgba(204, 255, 0, 0.45)",
        purple: "0 0 25px -3px rgba(139, 92, 246, 0.4)",
        cyan: "0 0 25px -3px rgba(0, 240, 255, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(204,255,0,0.6))" },
          "50%": { opacity: "0.7", filter: "drop-shadow(0 0 5px rgba(204,255,0,0.2))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "marquee-reverse": "marquee-reverse 22s linear infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        radar: "radar 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
