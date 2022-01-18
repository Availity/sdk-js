## Contributing

This monorepo is managed using [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces#search). Lerna is set to use independent mode, which allows for each package to have its own version.

## Installing

This repository requires `node@^12.0.0`.

Ensure [yarn](https://yarnpkg.com/lang/en/) is installed

```bash
npm install -g yarn
```

Clone the repository

```bash
git https://github.com/Availity/sdk-js.git
cd sdk-js
```

Install the dependencies

```bash
yarn install
```

The first install might take a while. All subsequent installs should proceed more quickly.

## Running

We develop a [documentation site](https://availity.github.io/sdk-js/) with [docusaurus](https://docusaurus.io/). You can run it locally with the following command

```bash
yarn start
```

## Adding a New Package

There is a script available to scaffold a new package with the required files.

```bash
yarn new
```

## Committing

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). The scope should be the un-prefixed name of the package under [./packages/](../packages/). If a commit applies to multiple packages, leave out the scope.

For example, here is what the commit message would like when fixing a null-checking error in the `api-axios` package:

```bash
git commit -m "fix(api-axios): check for null before doing the action"
```

The commit messages in this repository are important for two main reasons. 1) The `type` (feat, fix, build, etc) is used to determine how to bump the version when publishing. 2) The commits with types `feat` and `fix` will show up in the `CHANGELOG.md` for the given package.

## Releasing

The packages in this repository are published to the `npm` registry. We have GitHub actions setup to version and deploy the package automatically when the code is merged into `master`. All you need to do to have your code published is open a PR, and have the code merged.

The command that handles this process is:

```bash
yarn publish
```

### Canary Relases

You can alternatively run a canary release that will not impact the current `latest` tag version in `npm`. This version can then be used to test your changes.

After your changes are committed, run this command:

```bash
yarn publish:canary
```

> This will only work if you are a member of the Availity organization in NPM. Otherwise, use [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link) or [yarn link](https://classic.yarnpkg.com/en/docs/cli/link)
