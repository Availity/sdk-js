import { defineProject } from 'vitest/config';
import { alias } from '../../vitest.aliases.ts';

export default defineProject({
  resolve: { alias },
  test: {
    name: 'native-form',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,js}'],
    environmentOptions: { jsdom: { url: 'http://localhost' } },
    setupFiles: ['src/tests/setup.ts'],
  },
});
