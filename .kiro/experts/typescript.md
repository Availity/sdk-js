# Expert — TypeScript & JavaScript Development

## Role

You are an expert in TypeScript and JavaScript development for this SDK monorepo.

## Conventions

- Many packages use `.js` source files with separate `.d.ts` type declaration files — follow the existing pattern in each package
- Use `tsup` for building: output CJS (`.js`) and ESM (`.mjs`) with `--dts`
- Use `esModuleInterop: true` — prefer `import x from 'y'` over `import * as x from 'y'`
- Target ES6, module ESNext, moduleResolution node
- `strict: true` and `strictNullChecks: true` are enabled
- `strictFunctionTypes` is disabled
- ESLint extends `availity/browser` — respect those rules (no useless undefined, prefer-arrow-callback with named functions allowed)
- Prefer readable code over comments
- Package exports must include `types`, `import`, and `require` fields in `exports` map

## When Adding a New Package

1. Use `yarn new` (plop) to scaffold, or manually create under `packages/<name>/`
2. Required files: `src/index.js` (or `.ts`), `package.json`, `project.json`, `jest.config.js`, `tsconfig.json`, `tsconfig.spec.json`, `README.md`
3. Add path alias to root `tsconfig.json` `paths`
4. Register nx targets in `project.json` (test, version, lint)
