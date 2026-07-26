import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "zentic-purple": "#9485D4",
        "zentic-purple-dark": "#7B6ABF",
        "zentic-purple-light": "#EDEAF6",
        "zentic-bg": "#F3F1F8",
        "zentic-backdrop": "#E0DCE8",
        "zentic-ink": "#171633",
        "zentic-ink-soft": "#54506E",
        "zentic-line": "#E3E0EC",
        "zentic-deep": "#3B2D8A",

        // Design-system tokens (marketing site redesign) — additive, do not
        // repurpose the zentic-* keys above, which the in-app demo still uses.
        "ds-primary": "#272665",
        "ds-accent": "#9485D4",
        "ds-accent-soft": "#EDEAF9",
        "ds-primary-tint": "#EAE9F3",
        "ds-secondary-bg": "#F1F0F9",
        "ds-bg": "#FAFAFC",
        "ds-surface": "#FFFFFF",
        "ds-border": "#EEEEF4",
        "ds-ink": "#1A1A2E",
        "ds-ink-secondary": "#6B7280",
        "ds-ink-tertiary": "#9CA3AF",
        "ds-success": "#16A34A",
        "ds-success-tint": "#E8F6ED",
        "ds-warning": "#D97706",
        "ds-warning-tint": "#FBF1E6",
        "ds-alert": "#DC2626",
        "ds-alert-tint": "#FCEAEA",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        "public-sans": ["var(--font-public-sans)", "system-ui", "sans-serif"],
        ds: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        phone: "28px",
        "ds-sm": "8px",
        "ds-md": "12px",
        "ds-lg": "16px",
        "ds-xl": "20px",
      },
      boxShadow: {
        phone: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10)",
        "ds-card": "0 1px 2px rgba(39, 38, 101, 0.04)",
      },
      fontSize: {
        "ds-h1": ["24px", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "700" }],
        "ds-h2": ["20px", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "700" }],
        "ds-stat": ["22px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "ds-title": ["17px", { lineHeight: "1.4", fontWeight: "600" }],
        "ds-body-lg": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "ds-body": ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        "ds-caption": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
export default config;
