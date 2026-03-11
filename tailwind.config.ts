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
          red: "#E4002B",
          "red-dark": "#C8102E",
          black: "#000000",
          "gray-dark": "#333333",
          gray: "#666666",
          "gray-light": "#F5F5F5",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
