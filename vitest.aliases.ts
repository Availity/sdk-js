import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const root = new URL('.', import.meta.url).pathname;
const tsconfig = JSON.parse(readFileSync(resolve(root, 'tsconfig.json'), 'utf-8'));

export const alias = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths as Record<string, string[]>).map(([key, [value]]) => [
    key,
    resolve(root, value),
  ])
);
