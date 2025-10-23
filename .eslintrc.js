
module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react", "jest"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "off",
      "single"
    ],
    "semi": [
      "off",
      "never"
    ],
    "no-unused-vars": [
      "off",
      { "argsIgnorePattern": "next" }
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": "off",
    "react/prop-types": 0
  },
  // Use Node.js environment for server/config files (CommonJS)
  "overrides": [
    {
      "files": [
        "app.js",
        ".eslintrc.js",
        "*.config.js",
        "**/*.config.js"
      ],
      "env": {
        "node": true
      },
      "parserOptions": {
        // CommonJS files are scripts, not ES modules
        "sourceType": "script"
      }
    }
  ]
}
