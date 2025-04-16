import js from '@eslint/js'
import react from 'eslint-plugin-react'
import jest from 'eslint-plugin-jest'
import globals from 'globals'

export default [
  {
    ignores: [
      '**/webpack.config.js', // be explicit — see point below
      'node_modules/',
      'dist/'
    ]
  },
  js.configs.recommended,
  {
    plugins: {
      react,
      jest
    },
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...jest.environments.globals.globals,
        window: 'readonly',
        document: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'error',
      'react/prop-types': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name=\'require\']',
          message: 'Use import instead of require.'
        },
        {
          selector: 'MemberExpression[object.name=\'module\'][property.name=\'exports\']',
          message: 'Use ESM export syntax instead of module.exports.'
        },
        {
          selector: 'Identifier[name=\'__dirname\']',
          message: 'Use import.meta.url and URL for __dirname alternative in ESM.'
        },
        {
          selector: 'Identifier[name=\'__filename\']',
          message: 'Use import.meta.url and URL for __filename alternative in ESM.'
        }
      ]
    }
  }
]