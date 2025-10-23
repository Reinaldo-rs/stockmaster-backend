import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": ["error"],
    },
    ignores: ["node_modules", "dist", "coverage"],
  },
  prettier,
]);
