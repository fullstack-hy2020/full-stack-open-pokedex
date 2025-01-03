module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // Ensures React-specific linting
    // "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "test"],
  parserOptions: {
    ecmaVersion: 2020, // Enables modern JavaScript features
    sourceType: "module", // Specifies ES6 modules
    ecmaFeatures: {
      jsx: true, // Enables JSX parsing for React
    },
  },
  plugins: ["react", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    indent: ["error", 2],
    "linebreak-style": 0,
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};
