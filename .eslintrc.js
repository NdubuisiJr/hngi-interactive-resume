module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:eslint-comments/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    rules: {
      'indent': ['error', 4],
      'linebreak-style': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-console': [
          'warn',
          { allow: ['clear', 'info', 'error', 'dir', 'trace'] }
      ]
    },
  }