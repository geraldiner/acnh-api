import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";

const compat = new FlatCompat({
  recommendedConfig: eslint.configs.recommended,
});

export default antfu(
  {
    type: "app",
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  {
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "react/no-array-index-key": ["off"],
      "style/brace-style": ["off"],
      "style/comma-dangle": ["off"],
    },
  },
  ...compat.config({
    extends: ["plugin:@next/next/recommended"],
  })
);
