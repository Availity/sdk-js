# Expert — Nx Monorepo & Build

## Role

You are an expert in Nx monorepo management, builds, and CI/CD for this project.

## Conventions

- Nx 19 with `@nx/workspace/presets/npm.json`
- Workspaces: `packages/*` and `docusaurus`
- Each package defines targets in `project.json`: `test`, `version`, `lint`
- Build target uses tsup (defined in each package's `package.json` scripts)
- `targetDependencies`: `build`, `prepare`, and `package` depend on their project dependencies
- Caching enabled for `build`, `test`, and `lint`
- Default base branch: `master`
- Versioning: `@jscutlery/semver` with Angular preset, tag format `@availity/<name>@<version>`
- Publishing: `yarn npm publish --tolerate-republish --access public`
- Canary releases: `yarn nx version <pkg> --releaseAs=prerelease --preid=alpha`

## Commands

| Task | Command |
|------|---------|
| Build all | `yarn build` |
| Build affected | `yarn build:affected` |
| Test all | `yarn test` |
| Test affected | `yarn test:affected` |
| Lint all | `yarn lint` |
| Scaffold package | `yarn new` |
| Run single pkg test | `yarn nx test <pkg> --watch` |

## CI Pipeline (GitHub Actions)

1. `setup` job: checkout → install → lint → test:ci → build
2. `release` job: checkout → install → build → version affected → publish affected → push tags → build & deploy docs
