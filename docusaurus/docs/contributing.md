---
title: Contributing
---

This is a monorepo managed using [lerna](https://github.com/lerna/lerna) in independent mode (each packages is versioned and published individually).

Install [lerna](https://github.com/lerna/lerna) globally with the following command

```bash
yarn global add lerna
```

## Installing

We use [yarn](https://yarnpkg.com/lang/en/) workspaces for developing. If you don't have [yarn](https://yarnpkg.com/lang/en/) you can install it by running
`npm install -g yarn`. Otherwise you can run the below to install all the dependencies.

```bash
yarn install
```

All subsequent installs should be quick after the first initial one.

## Adding a New Package

1. Use `plop` to generate new package

```bash
yarn new
```

2. Add link to new package in README

## Running

```bash
yarn start
```

### Commits

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should be one of the un-prefixed package names under ./packages/. If a commit applies to multiple packages, leave out the scope.

Example

```bash
git commit -m "feat(api-axios): added new feature"
```

### Releasing

Make sure when you publish that there are no spooky things going on with the version bumps. Lerna will auto detect the changes up to the last commit and auto bump all the required packages accordingly.

```bash
lerna publish
```

### Canary Relases

You can alternatively run a canary release that will not impact the current `latest` tag version and can be used to test out changes.

```bash
lerna publish -c
```
