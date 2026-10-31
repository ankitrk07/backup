import type { Config } from "tailwindcss";

// Colours are CSS-variable channels (see globals.css) so opacity utilities
// like bg-accent/20 work and the whole theme can be re-skinned in one place.
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        bg: withAlpha("--c-bg"),
        surface: withAlpha("--c-surface"),
        raised: withAlpha("--c-raised"),
        line: withAlpha("--c-line"),
        fg: withAlpha("--c-fg"),
        muted: withAlpha("--c-muted"),
        subtle: withAlpha("--c-subtle"),
        accent: {
          DEFAULT: withAlpha("--c-accent"),
          fg: withAlpha("--c-accent-fg"),
        },
        violet: {
          DEFAULT: withAlpha("--c-violet"),
          soft: withAlpha("--c-violet-soft"),
        },
        planet: withAlpha("--c-planet"),
        danger: withAlpha("--c-danger"),
        success: withAlpha("--c-success"),
        warning: withAlpha("--c-warning"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Haettenschweiler", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3.25rem, 13vw, 8rem)",
          { lineHeight: "0.9", letterSpacing: "0.005em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 9vw, 5rem)",
          { lineHeight: "0.92", letterSpacing: "0.005em" },
        ],
        "display-md": [
          "clamp(2rem, 6vw, 3.25rem)",
          { lineHeight: "0.95", letterSpacing: "0.01em" },
        ],
        "display-sm": ["clamp(1.5rem, 4vw, 2rem)", { lineHeight: "1", letterSpacing: "0.01em" }],
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.18em" }],
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.625rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 32px -12px rgb(0 0 0 / 0.6)",
        "glow-accent":
          "0 0 0 1px rgb(var(--c-accent) / 0.35), 0 10px 40px -10px rgb(var(--c-accent) / 0.45)",
        "glow-violet":
          "0 0 0 1px rgb(var(--c-violet-soft) / 0.35), 0 10px 40px -10px rgb(var(--c-violet) / 0.55)",
        drawer: "-24px 0 64px -16px rgb(0 0 0 / 0.7)",
        sheet: "0 -16px 48px -12px rgb(0 0 0 / 0.7)",
      },
      spacing: {
        header: "var(--header-h)",
        announce: "var(--announce-h)",
        tap: "2.75rem",
      },
      minHeight: { tap: "2.75rem" },
      minWidth: { tap: "2.75rem" },
      zIndex: {
        header: "40",
        sticky: "45",
        drawer: "60",
        modal: "70",
        toast: "80",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 30s) linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.25s var(--ease-out) both",
        "fade-up": "fade-up 0.5s var(--ease-out) both",
        "scale-in": "scale-in 0.2s var(--ease-out) both",
        "slide-in-right": "slide-in-right 0.35s var(--ease-out) both",
        "slide-in-up": "slide-in-up 0.35s var(--ease-out) both",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;