## Contributing

This monorepo is managed using [yarn](https://yarnpkg.com/getting-started) and [nx](https://nx.dev/getting-started/intro). Each package is independently versioned and published to the `npm registry`.

## Prerequisites

- **Node.js** 22 or 24 (see `engines` in package.json). We recommend [nvm](https://github.com/nvm-sh/nvm#readme) or [fnm](https://github.com/Schniz/fnm#readme) to manage your Node installation.
- **Yarn 4** — managed via [Corepack](https://yarnpkg.com/corepack), which ships with Node.js.

## Installation

Verify your Node version:

```bash
node --version
```

### Setting up Yarn

This repo uses Yarn 4 (defined in `packageManager` in package.json). You can set it up either way:

**Option A: Corepack (recommended)**

Corepack ships with Node.js and automatically uses the correct Yarn version:

```bash
corepack enable
```

**Option B: Direct install**

If you don't want to use corepack, install Yarn globally:

```bash
npm install -g yarn
```

### Installing dependencies

Install the dependencies with `yarn`. The first install might take a while. All subsequent installs should proceed more quickly.

```bash
yarn install
```

Now we run the `build` command to compile our code to be ready for local development.

```bash
yarn build
```

You are now ready to begin development in the repo!

## Contributor Workflow

Here is the step-by-step flow for contributing a change:

1. **Fork** the repository on GitHub and clone your fork locally.
2. **Install dependencies** (see above).
3. **Create a branch** off `master`:
   ```bash
   git checkout -b fix/your-change-description
   ```
4. **Make your changes** and add tests where applicable.
5. **Run tests and lint** to make sure everything passes:
   ```bash
   yarn test
   yarn lint
   ```
6. **Type-check** your changes:
   ```bash
   yarn typecheck
   ```
7. **Commit your changes** using the [Angular Commit Format](#commits) (enforced by commitlint).
8. **Push your branch** and open a pull request against `master`.

## Local Development

### Unit Tests

All new features should have a unit test added. The unit tests will run when you push your code. If you run the tests on your own the results will be cached. This means subsequent executions of `yarn test` will only run tests against code that has changed.

Run all tests:

```bash
yarn test
```

Run tests for a single package:

```bash
yarn nx test api-axios
```

Run tests in watch mode for a single package:

```bash
npx vitest --project=api-axios
```

Run all tests with coverage:

```bash
yarn test:coverage
```

### Type Checking

Run TypeScript type checking across the entire monorepo:

```bash
yarn typecheck
```

### Linting

This repo uses [eslint-config-availity](https://github.com/Availity/eslint-config-availity#readme) for linting. Make sure to have linting support in your IDE or run the linting script to make sure your code does not have any errors. You will not be able to commit your code if there are linting errors.

```bash
yarn lint
```

### Docs Site

To preview the documentation site locally:

```bash
yarn start
```

This starts the [Docusaurus](https://docusaurus.io/) dev server at `http://localhost:3000`.

### Adding/Removing a Dependency

Managing dependencies in a monorepo is similar to a single package repo. Use the `workspace` command from `yarn` to tell it which package to update.

Example — adding `qs` to the `api-core` package:

```bash
yarn workspace @availity/api-core add qs
```

### Adding a New Package

```bash
yarn new
```

This runs [plop](https://plopjs.com/) to scaffold a new package with the correct structure, configs, and boilerplate.

## Commits

The commit messages in this repository are important for two main reasons:

1. The `type` (feat, fix, build, etc) is used to determine how to bump the version when publishing.

2. The commits with types `feat` and `fix` will show up in the `CHANGELOG.md` for the given package.

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should be one of the un-prefixed names of the packages under `./packages/` or `docusaurus` for the docs. If a commit applies to multiple packages, leave out the scope.

### Commit Types

| Type       | Description                              | Triggers version bump? |
| ---------- | ---------------------------------------- | ---------------------- |
| `feat`     | A new feature                            | ✅ Yes — minor         |
| `fix`      | A bug fix                                | ✅ Yes — patch         |
| `perf`     | A performance improvement                | ✅ Yes — patch         |
| `revert`   | Reverts a previous commit                | ✅ Yes — patch         |
| `docs`     | Documentation only changes               | ❌ No                  |
| `chore`    | Maintenance tasks                        | ❌ No                  |
| `style`    | Code style changes (formatting, etc.)    | ❌ No                  |
| `refactor` | Code refactoring with no behavior change | ❌ No                  |
| `test`     | Adding or updating tests                 | ❌ No                  |
| `build`    | Build system or dependency updates       | ❌ No                  |
| `ci`       | CI configuration changes                 | ❌ No                  |

> **Note:** Commits with type `docs` do not trigger a version bump. This is handled automatically by the Angular preset used with `@jscutlery/semver`.

For example, here is what the commit message would look like when fixing a null-checking error in the env-var package:

```bash
git commit -m "fix(env-var): check for null before doing the action"
```

In order to bump a package by a major version you must indicate a `BREAKING CHANGE` in the commit message. Read through the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) for more information

```bash
git commit -m "feat(api-axios)!: add new features

BREAKING CHANGE: names of args changed"
```

Commit messages are enforced by [commitlint](https://commitlint.js.org/) via a git `commit-msg` hook. The hook runs automatically when you commit.

## Versioning and Publishing

Versioning is automated via [`@jscutlery/semver`](https://github.com/jscutlery/semver) with the Angular conventional-commits preset. On merge to `master`, CI automatically:

1. Determines affected packages using `nx affected`.
2. Bumps versions and generates changelogs.
3. Publishes changed packages to npm.
4. Opens a release PR with the version bump commits.

You can preview what will change without committing anything:

```bash
yarn publish:dry-run
```

## Canary Releases

> You must have an npm account and be a member of the Availity Organization for this process to succeed.

Canary releases can be used to test changes without impacting the `latest` tag.

First, bump the version using a `preid`. The `preid` is the tag you want to use to identify the release. Add `--dry-run` to preview without making changes.

```bash
# Bump the version (creates a commit and updates changelog)
yarn nx version env-var --releaseAs=prerelease --preid=alpha

# Dry run to preview what version will be created
yarn nx version env-var --releaseAs=prerelease --preid=alpha --dry-run
```

Once the new version has been committed, publish it to the registry:

```sh
# Login to npm (required once)
yarn npm login --publish

# Publish the canary version
yarn nx publish env-var
```
