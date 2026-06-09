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
    },
  },
});
