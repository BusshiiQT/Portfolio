// eslint.config.js — ESLint 9 flat config without rushstack/next preset
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // ⬇️ put this FIRST so it applies globally
  {
    ignores: [
      "next-env.d.ts",   // ignore Next's generated types file
      ".next/**",
      "node_modules/**",
      ".vercel/**",
      "out/**",
    ],
  },

  // Base JS recommendations
  {
    ...js.configs.recommended,
    files: ["**/*.{js,jsx}"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
  },

  // TypeScript (and TSX/JSX) rules
  ...tseslint.config({
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-undef": "off",
    },
  }),

  // React automatic runtime niceties
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
];
