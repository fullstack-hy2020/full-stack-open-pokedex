// eslint-disable-next-line no-undef
module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest'
  ],
  'rules': {
    'indent': [
      'warn',
      2
    ],
    'linebreak-style': [
      'warn',
      'unix'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'warn', 'always'
    ],
    'arrow-spacing': [
      'warn', { 'before': true, 'after': true }
    ],
    'no-console': 'warn',
    'react/prop-types': 0
  },
  'settings': {
    react: {
      version: 'detect'
    }
  }
}
