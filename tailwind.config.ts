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
          DEFAULT: "var(--light-blue)",
        },
        gray: {
          DEFAULT: "var(--gray)",
        },
        "light-gray": {
          DEFAULT: "var(--light-gray)",
        },
        "darker-gray": {
          DEFAULT: "var(--darker-gray)",
        },
        black: {
          DEFAULT: "var(--black)",
        },
        "mid-gray": {
          DEFAULT: "var(--mid-gray)",
        },
      },
      borderWidth: {
        "1": "1px",
      },
    },
  },
} satisfies Config;

export default config;
