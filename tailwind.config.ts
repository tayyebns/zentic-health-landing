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
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        phone: "28px",
      },
      boxShadow: {
        phone: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
