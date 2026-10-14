# AGENTS.md: sdk-js (@availity/* API clients and utilities)

Nx monorepo of non-visual packages: `@availity/api-axios`, `@availity/authorizations-axios`, `@availity/upload-core`, `@availity/yup`, `@availity/message-core`, `@availity/env-var`, and others. Used by both `element` and `availity-react`, and by most frontend apps.

## Branches

- Default and PR target: `master` (see `.github/workflows/pr-build.yml`).
- The local clone may be on a feature branch (for example `feature/typescript-rewrite-cloud-resources`). **Published behavior is what is on `origin/master` and npm.** Read `origin/master` before answering "what does the SDK do".
- Never push to `master`. Work on a branch named `feature/<short-description>` or `fix/<short-description>`.

## Environment

- Node `^22 || ^24` (`.nvmrc` is 22).
- Yarn 4 (`packageManager: yarn@4.17.0`). Do not use npm or yarn 1.
- Install with `yarn install --immutable`. Do not hand-edit `yarn.lock`.
- ESM-only packages.

## Commands

| Task                           | Command                                            |
| ------------------------------ | -------------------------------------------------- |
| Build packages (no docs)       | `yarn build:packages`                              |
| Build everything               | `yarn build`                                       |
| Build changed only             | `yarn build:affected`                              |
| Lint                           | `yarn lint` (changed only: `yarn lint:affected`)   |
| Type check                     | `yarn typecheck`                                   |
| Test                           | `yarn test` (changed only: `yarn test:affected`)   |
| Test, single run with coverage | `yarn test:ci`                                     |
| Format check                   | `yarn format:check` (fix with `yarn format:write`) |
| Docs dev server                | `yarn start`                                       |

Before you say a change is done, run `yarn lint:affected`, `yarn typecheck`, and `yarn test:affected`, then `yarn build:affected`.

## Commits and releases

- Conventional commits enforced by `commitlint.config.js`. If you give a scope, it must be an Nx project name (`config-nx-scopes` enforces this through `scope-enum`). A scope is optional. The header length limit is not enforced: `header-max-length` is disabled.
- The type drives version bumps. `!` or `BREAKING CHANGE:` forces a major. Consumers pin these versions, so treat a major as a breaking change for every app that uses the package.
- Releases run through `nx affected --target version`. Do not run `publish`, `publish:dry-run`, or `version:dry-run` against real registries without a human.
- `deploy:docs` pushes to `gh-pages`. Do not run it locally unless asked.

## Do not

- Do not edit `*-core` packages to add HTTP-client-specific code. Put that in the `*-axios` packages.
- Do not change the public exports of a published package without a conventional-commit type that reflects it.

## Gotchas

- A TypeScript rewrite is in flight on a feature branch. Do not mix its structure into `master` work.
- `yarn clean` also deletes `node_modules`. Use it only when you intend a full reinstall.
