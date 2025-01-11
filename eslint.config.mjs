import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
  {
    files: ["app/**/*.{ts,tsx}"],
    ignores: [".next/**/*"],
  },
];

export default eslintConfig;
