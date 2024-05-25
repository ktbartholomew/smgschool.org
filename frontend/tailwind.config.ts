import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": {
          DEFAULT: "#c52026",
          "600": "#AF1D21",
          "700": "#8C171B",
        },
        "brand-secondary": {
          DEFAULT: "#F0B67F",
        },
        "brand-tertiary": {
          DEFAULT: "#C7EFCF",
        },
      },
      dropShadow: {
        "lg-strong": " 0 4px 8px rgb(0 0 0 / 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
