import { defineProject } from 'vitest/config';
import { alias } from '../../vitest.aliases.ts';

export default defineProject({
  resolve: { alias },
  test: {
    name: 'message-core',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,js}'],
    environmentOptions: { jsdom: { url: 'https://dev.local:9999' } },
  },
});
