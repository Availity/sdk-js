import { defineProject } from 'vitest/config';
import { alias } from '../../vitest.aliases.ts';

export default defineProject({
  resolve: { alias },
  test: {
    name: 'authorizations-core',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,js}'],
  },
});
