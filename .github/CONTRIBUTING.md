## Contributing

This monorepo is managed using [yarn](https://yarnpkg.com/getting-started) and [nx](https://nx.dev/getting-started/intro). Each package is independently versioned and published to the `npm registry`.

## Installation

Ensure you are running version 14 or 16 of `node` and [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) is installed

```bash
node --version
npm install -g yarn
```

> We recommend using [nvm](https://github.com/nvm-sh/nvm#readme) or [fnm](https://github.com/Schniz/fnm#readme) to manage your installation of `node`.

Install the dependencies with `yarn`

```bash
yarn install
```

The first install might take a while. All subsequent installs should proceed more quickly.

## Commits

The commit messages in this repository are important for two main reasons:

1. The `type` (feat, fix, build, etc) is used to determine how to bump the version when publishing.

2. The commits with types `feat` and `fix` will show up in the `CHANGELOG.md` for the given package.

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should be one of the un-prefixed names of the packages under `./packages/` or `docusaurus` for the docs. If a commit applies to multiple packages, leave out the scope.

For example, here is what the commit message would like when fixing a null-checking error in the [icon](../packages/icon) package:

```bash
git commit -m "fix(env-var): check for null before doing the action"
```

In order to bump a package by a major version you must indicate a `BREAKING CHANGE` in the commit message. Read through the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) for more information

```bash
git commit -m "feat(api-axios)!: add new features

BREAKING CHANGE: names of args changed"
```

## Canary Releases

> You must have an npm account, and be a member of the Availity Organization for this process to succeed.

Canary Releases can be used to test changes without impacting the `latest` tag.

The first thing we need to do is create a new version to be tagged. Version bumps are generated off the latest commits to the package. You should commit any changes before running the version and publish commands.

Bump the version using a `preid`. The `preid` is the tag you want to use in order to identify the release. If you want to see what version will be created without actually making the changes, then add the `--dry-run` flag to the end.

```bash
# This will make changes to the package.json, changelog.md, and make a commit
yarn nx version env-var --releaseAs=prerelease --preid=alpha

# Dry run to make sure changes are correct
yarn nx version env-var --releaseAs=prerelease --preid=alpha --dry-run
```

Once you have a newly created version it will need to be published to the registry so you or others can use it. First login, and then run the publish command

```sh
# login
yarn npm login --publish

# publish
yarn nx publish:canary env-var
```
