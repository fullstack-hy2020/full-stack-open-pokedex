module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true,
    "node": true
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
      "off",
      "error",
        2
      ],
      "no-unused-vars": [
        "off"
      ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "off",
      "single", 
      "double"
    ],
    "semi": [
      "off"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "off",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "react/prop-types": 0
  }
}
