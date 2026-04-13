import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core
        "primary-container": "#FF5C00",
        "primary": "#A73A00",
        "background": "#FAF9F6",
        "surface": "#FAF9F6",
        "on-background": "#1A1C1A",
        "on-surface": "#1A1C1A",
        // Surface hierarchy
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F4F3F1",
        "surface-container": "#EFEEEB",
        "surface-container-high": "#E9E8E5",
        "surface-container-highest": "#E3E2E0",
        "surface-dim": "#DBDAD7",
        "surface-bright": "#FAF9F6",
        // Text variants
        "on-surface-variant": "#5B4137",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#521800",
        // Borders
        "outline-variant": "#E4BEB1",
        "outline": "#8F7065",
        // Tertiary (blue)
        "tertiary": "#005BC0",
        "tertiary-container": "#4E90FF",
        // Inverse
        "inverse-surface": "#2F312F",
        "inverse-primary": "#FFB59A",
        "inverse-on-surface": "#F2F1EE",
        // Fixed tones
        "primary-fixed": "#FFDBCE",
        "primary-fixed-dim": "#FFB59A",
        // Error
        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        // Special
        "neon-cyan": "#00F3FF",
      },
      fontFamily: {
        "headline": ["Epilogue", "Noto Sans KR", "sans-serif"],
        "body": ["Plus Jakarta Sans", "Noto Sans KR", "sans-serif"],
        "label": ["Plus Jakarta Sans", "Noto Sans KR", "sans-serif"],
        "korean": ["Noto Sans KR", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      letterSpacing: {
        kerning: "-0.04em",
      },
    },
  },
  plugins: [],
};
export default config;
