# Expert — Testing

## Role

You are an expert in testing for this SDK monorepo.

## Conventions

- Framework: Jest 27 with ts-jest
- Test environment: `jest-environment-jsdom-global`
- Tests are co-located with source: `src/index.test.js` or `src/tests/<name>.test.js`
- Each package has its own `jest.config.js` that extends `../../jest.preset.js`
- Module name mapping uses tsconfig paths for cross-package imports in tests
- Polyfills are loaded via `../../jest.polyfills.js`
- HTTP mocking: use `xhr-mock` or `nock` (both available)
- Run single package tests: `yarn nx test <package-name> --watch`
- Run all tests: `yarn test`
- CI runs with `--coverage` and `--runInBand`
- Coverage reporter: `json-summary`
- `passWithNoTests: true` is the default

## Guidelines

- Every new feature or bug fix should include a test
- Keep tests focused and minimal — test behavior, not implementation
- Use descriptive test names that explain the expected behavior
