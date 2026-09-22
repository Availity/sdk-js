import { defineConfig } from 'vitest/config';
import { alias } from './vitest.aliases.ts';

export default defineConfig({
  resolve: { alias },
  test: {
    projects: ['packages/*/vitest.config.ts'],
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,js}'],
    coverage: {
      provider: 'v8',
      reporter: ['json-summary'],
      exclude: [
        // Test files
        '**/*.test.{ts,js}',
        '**/*.spec.{ts,js}',
        '**/tests/**',
        '**/__tests__/**',
        // Mock and fixture files
        '**/mocks/**',
        '**/__mocks__/**',
        '**/fixtures/**',
        // Test setup files
        '**/setup.{ts,js}',
        '**/setupTests.{ts,js}',
        // Build output and tooling
        '**/dist/**',
        '**/node_modules/**',
        '**/coverage/**',
      ],
    },
  },
});
