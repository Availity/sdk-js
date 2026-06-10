# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [2.0.2](https://github.com/availity/sdk-js/compare/@availity/user-activity-broadcaster@2.0.1...@availity/user-activity-broadcaster@2.0.2) (2026-06-09)



## [2.0.1](https://github.com/availity/sdk-js/compare/@availity/user-activity-broadcaster@2.0.0...@availity/user-activity-broadcaster@2.0.1) (2026-06-09)



# [2.0.0](https://github.com/availity/sdk-js/compare/@availity/user-activity-broadcaster@1.1.0...@availity/user-activity-broadcaster@2.0.0) (2026-06-08)


### Bug Fixes

* correct project.json coverage path and add missing trackDeps ([d4c3a7f](https://github.com/availity/sdk-js/commit/d4c3a7f20aed1af994353edbff2303437a00d748))
* resolve lint errors, type errors, and add typecheck script ([a08d393](https://github.com/availity/sdk-js/commit/a08d3934497934bdcdf2f7a19d9d3c9479186c41))
* standardize package.json metadata across all packages ([cd03f11](https://github.com/availity/sdk-js/commit/cd03f113a6cb3bdc5ae47737f792165f95a82b2e))


* feat!: migrate to ESM and drop Node 20 support ([a665467](https://github.com/availity/sdk-js/commit/a6654672c2e96adb325d100a6dfdb7b5baf16bcd))


### BREAKING CHANGES

* All packages now use ESM as the primary module format.
CJS is still available via the `require` condition in package exports.

- Add `"type": "module"` to all packages
- Swap export paths: `.js` is now ESM, `.cjs` is now CJS
- Drop Node 20 from engines (now requires ^22.0.0 || ^24.0.0)
- Rename config files from .js to .cjs (jest, prettier, commitlint, etc.)
- Upgrade yarn to ^4, jest to 30.4.x, typescript to 5.9.3, undici to ^8
- Add `sideEffects: false` to all packages for better tree-shaking



# [1.1.0](https://github.com/Availity/sdk-js/compare/@availity/user-activity-broadcaster@1.0.0...@availity/user-activity-broadcaster@1.1.0) (2026-05-27)


### Features

* add node 24 support ([5e735d6](https://github.com/Availity/sdk-js/commit/5e735d6957dcf455e41b3017dc34250dfe07055e))



# [1.0.0](https://github.com/Availity/sdk-js/compare/@availity/user-activity-broadcaster@0.2.2...@availity/user-activity-broadcaster@1.0.0) (2025-05-14)


### chore

* drop support for node 18 and add support for node 22 ([1e3dcc3](https://github.com/Availity/sdk-js/commit/1e3dcc3311021edc5691b1383aa393ebebe1d9db))


### BREAKING CHANGES

* drop support for node 18



## [0.2.2](https://github.com/Availity/sdk-js/compare/@availity/user-activity-broadcaster@0.2.1...@availity/user-activity-broadcaster@0.2.2) (2025-03-14)



## [0.2.1](https://github.com/Availity/sdk-js/compare/@availity/user-activity-broadcaster@0.2.0...@availity/user-activity-broadcaster@0.2.1) (2025-03-10)



# [0.2.0](https://github.com/Availity/sdk-js/compare/@availity/user-activity-broadcaster@0.1.0...@availity/user-activity-broadcaster@0.2.0) (2024-10-23)


### Features

* **user-activity-broadcaster:** fixing default package main path EB-719 ([eaa6952](https://github.com/Availity/sdk-js/commit/eaa6952e889129c2f3e633359791dd3c902baf4f))



# 0.1.0 (2024-10-23)


### Features

* **user-activity-broadcaster:** adding changelog file EB-719 ([1607004](https://github.com/Availity/sdk-js/commit/16070049522d8db8401d71f7d5d074dc0bc213c4))
* **user-activity-broadcaster:** adding ignore because we're not using typescript EB-719 ([b66e9b8](https://github.com/Availity/sdk-js/commit/b66e9b87c2dcd305cd1ccbba5980e7550cc1bd70))
* **user-activity-broadcaster:** adding package EB-719 ([1213b58](https://github.com/Availity/sdk-js/commit/1213b58c37fcec8f5f6298e6e66103150a9db61e))
* **user-activity-broadcaster:** fixing commit message EB-719 ([be9d03e](https://github.com/Availity/sdk-js/commit/be9d03ebcd1efd352eed7c1da46a3addf53b8fc8))



# 0.1.0-alpha.0 (2024-10-22)


### Features

* **user-activity-broadcaster:** adding changelog file EB-719 ([1607004](https://github.com/Availity/sdk-js/commit/16070049522d8db8401d71f7d5d074dc0bc213c4))
* **user-activity-broadcaster:** adding ignore because we're not using typescript EB-719 ([b66e9b8](https://github.com/Availity/sdk-js/commit/b66e9b87c2dcd305cd1ccbba5980e7550cc1bd70))
* **user-activity-broadcaster:** adding package EB-719 ([1213b58](https://github.com/Availity/sdk-js/commit/1213b58c37fcec8f5f6298e6e66103150a9db61e))



# 0.1.0-alpha.0 (2024-10-22)


### Features

* **user-activity-broadcaster:** adding changelog file EB-719 ([1607004](https://github.com/Availity/sdk-js/commit/16070049522d8db8401d71f7d5d074dc0bc213c4))
* **user-activity-broadcaster:** adding ignore because we're not using typescript EB-719 ([b66e9b8](https://github.com/Availity/sdk-js/commit/b66e9b87c2dcd305cd1ccbba5980e7550cc1bd70))
* **user-activity-broadcaster:** adding package EB-719 ([1213b58](https://github.com/Availity/sdk-js/commit/1213b58c37fcec8f5f6298e6e66103150a9db61e))
