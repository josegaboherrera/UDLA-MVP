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
        udla: {
          red: "#C8102E",
          "red-dark": "#A00D24",
          black: "#1D1D1B",
          "gray-dark": "#4A4A4A",
          gray: "#6B6B6B",
          "gray-light": "#F5F5F5",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
