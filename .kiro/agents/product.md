# Product Context — Availity JavaScript SDK

## Overview

This is a monorepo (`@availity/sdk-js`) containing JavaScript/TypeScript SDK packages for the Availity Portal. Packages are independently versioned and published to npm under the `@availity` scope.

## Tech Stack

- **Runtime**: Node.js ^20 or ^22
- **Package Manager**: Yarn 3 (workspaces)
- **Build Orchestration**: Nx 19
- **Build Tool**: tsup (per-package)
- **Testing**: Jest 27 with ts-jest, jsdom environment
- **Linting**: ESLint via eslint-config-availity (browser preset)
- **Language**: TypeScript 5.5 and JavaScript (mixed — many packages use .js with .d.ts type declarations)
- **Commit Convention**: Angular Conventional Commits (enforced by commitlint)
- **Versioning**: @jscutlery/semver (automated from commit types)
- **CI/CD**: GitHub Actions → npm publish + GitHub Pages docs
- **Docs**: Docusaurus

## Monorepo Structure

```
packages/          # All SDK packages (each independently published)
docusaurus/        # Documentation site
plop-templates/    # Scaffolding templates for new packages/resources
scripts/           # CI/build helper scripts
.github/           # Workflows, PR template, contributing guide
```

## Key Conventions

- Packages live in `packages/<name>/` with `src/`, `package.json`, `project.json`, `jest.config.js`, `tsconfig.json`, and `tsconfig.spec.json`
- Packages export CJS + ESM via tsup with type declarations
- Tests are co-located in `src/` (e.g., `index.test.js`) or in `src/tests/`
- Commit messages must follow Angular format with package scope: `fix(env-var): description`
- `BREAKING CHANGE` in commit body triggers major version bump
- New packages are scaffolded via `yarn new` (plop)
- New API resources are scaffolded via plop's "api resource" generator
- The `master` branch is the default/release branch
