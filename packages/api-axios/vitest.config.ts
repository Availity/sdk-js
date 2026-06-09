import { defineProject } from 'vitest/config';
import { alias } from '../../vitest.aliases.ts';

export default defineProject({
  resolve: { alias },
  test: {
    name: 'api-axios',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,js}'],
    environmentOptions: { jsdom: { url: 'http://localhost:8080' } },
  },
});
