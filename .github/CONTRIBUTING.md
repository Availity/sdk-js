## Contributing

This is a monorepo managed using [lerna](https://github.com/lerna/lerna) and [yarn](https://yarnpkg.com/lang/en/) workspaces. Lerna is set to use independent mode, which allows for each package to have its own version.

## Installing

We use [yarn](https://yarnpkg.com/lang/en/) workspaces for developing. If you don't have [yarn](https://yarnpkg.com/lang/en/) you can install it by running

```bash
npm install -g yarn
```

Once `yarn` is setup, then install the dependencies for the repo.

```bash
yarn install
```

> Your first install may seem slow, but all subsequent installs should be quick after the initial one.

## Running

We develop a [documentation site](https://availity.github.io/sdk-js/) with [docusaurus](https://docusaurus.io/). You can run the docs server locally with the following command

```bash
yarn start
```

## Adding a New Package

If you need to add a new package, then you can leverage the `plop` scripts that have been setup. This will allow you to quickly scaffold a new package

```bash
yarn new
```

## Committing

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should be the un-prefixed name of the package under [./packages/](../packages/). If a commit applies to multiple packages, leave out the scope.

The commit format and messages are important because they help the deploy process determine what type of version bump is needed.

## Releasing

The packages in this repository are published to the `npm` registry. We have GitHub actions setup to version and deploy the package automatically when the code is merged into `master`. All you need to do to have your code published is open a PR, and have the code merged.

The command that handles this process is:

```bash
yarn publish
```

### Canary Relases

You can alternatively run a canary release that will not impact the current `latest` tag version and can be used to test out changes.

Once your changes are committed then you can run this command to have a canary version released:

```bash
yarn publish:canary
```
