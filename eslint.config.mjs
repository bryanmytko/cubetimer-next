import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    languageOptions: {
      globals: {
        NodeJS: "readonly",
        afterAll: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        describe: "readonly",
        expect: "readonly",
        it: "readonly",
        jest: "readonly",
      },
    },
    rules: {
      "no-console": ["error"],
      "comma-dangle": ["error", "always-multiline"],
      "no-async-promise-executor": ["error"],
      "no-case-declarations": ["error"],
      "no-console": ["warn"],
      "no-empty": ["error"],
      "no-empty-pattern": ["error"],
      "no-extra-boolean-cast": ["error"],
      "no-extra-semi": ["error"],
      "no-fallthrough": ["error"],
      "no-inner-declarations": ["error"],
      "no-mixed-spaces-and-tabs": ["error"],
      "no-prototype-builtins": ["error"],
      "no-undef": ["error"],
      "no-unsafe-optional-chaining": ["error"],
      "max-len": [
        "error",
        {
          code: 100,
          tabWidth: 2,
          comments: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      "prefer-const": ["error"],
      quotes: ["error", "double"],
      "react-hooks/exhaustive-deps": ["error"],
      semi: ["error", "always"],
      "@typescript-eslint/ban-ts-comment": ["error"],
      "@typescript-eslint/no-wrapper-object-types": ["error"],
      "@typescript-eslint/no-unsafe-function-type": ["error"],
      "@typescript-eslint/no-empty-object-type": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
      "@typescript-eslint/no-this-alias": ["error"],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowTernary: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-var-requires": ["error"],
    },
  },
];

export default eslintConfig;
