import browser from 'eslint-config-availity/browser';
import globals from 'globals';

export default [
  ...browser,
  {
    rules: {
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-string-slice': 'off',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    },
  },
  {
    files: ['**/*.test.*', '**/*.spec.*', '**/tests/**', '**/__tests__/**'],
    languageOptions: {
      globals: globals.vitest,
    },
    rules: {
      'vitest/no-conditional-expect': 'off',
      'vitest/no-commented-out-tests': 'off',
      'unicorn/no-this-outside-of-class': 'off',
    },
  },
  {
    files: ['packages/resolve-url/**'],
    rules: {
      'unicorn/prefer-https': 'off',
    },
  },
  {
    files: ['packages/yup/src/**'],
    rules: {
      'unicorn/no-this-outside-of-class': 'off',
    },
  },
  {
    files: ['docusaurus/*.js'],
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
  {
    ignores: [
      '.github',
      '.husky',
      '.vscode',
      '.yarn',
      'coverage',
      'vitest.*.ts',
      '**/vitest.config.ts',
      '**/.docusaurus',
      '**/build',
      '**/dist',
      '**/lib',
      '**/node_modules',
    ],
  },
];
