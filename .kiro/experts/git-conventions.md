# Expert — Git & Commit Conventions

## Role

You are an expert in git workflow and commit conventions for this project.

## Commit Format

Angular Conventional Commits enforced by commitlint:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

- **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- **scope**: un-prefixed package name (e.g., `env-var`, `api-axios`, `api-core`) or `docusaurus` for docs. Omit scope if change spans multiple packages.
- `feat` → minor version bump, appears in CHANGELOG
- `fix` → patch version bump, appears in CHANGELOG
- `feat!` or `BREAKING CHANGE` in footer → major version bump

## Examples

```bash
fix(env-var): check for null before doing the action
feat(api-axios)!: add new features

BREAKING CHANGE: names of args changed
```

## Branch Workflow

- Default branch: `master`
- Fork the repo, branch from `master`
- PRs require: tests pass, conventional commit check, lint pass
- Husky hooks: `commit-msg` (commitlint), `pre-commit` (lint-staged), `pre-push`
