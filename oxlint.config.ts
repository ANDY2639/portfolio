import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "import", "jsx-a11y", "unicorn"],
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  rules: {
    "react/jsx-key": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/exhaustive-deps": "warn",
    "typescript/no-explicit-any": "warn",
    "typescript/no-unused-vars": "error",
    "import/no-cycle": "warn",
    "import/no-unassigned-import": "off", // Allow CSS imports
    "jsx-a11y/alt-text": "warn",
  },
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "19.2",
    },
  },
  options: {
    typeAware: true,
  },
  ignorePatterns: ["dist/**", "node_modules/**"],
  overrides: [
    {
      files: ["vite.config.ts", "*.config.ts"],
      env: {
        node: true,
      },
    },
  ],
});
