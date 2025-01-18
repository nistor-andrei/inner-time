import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--blue)",
        },
        secondary: {
          DEFAULT: "var(--green)",
        },
        "primary-dark": {
          DEFAULT: "var(--light-blue)",
        },
        "light-gray": {
          DEFAULT: "var(--light-gray)",
        },
      },
      borderWidth: {
        "1": "1px",
      },
    },
  },
} satisfies Config;

export default config;
