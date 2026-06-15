# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [3.1.1](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@3.1.0...@availity/dinosaurdocs@3.1.1) (2026-06-15)



# [3.1.0](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@3.0.0...@availity/dinosaurdocs@3.1.0) (2026-06-12)


### Features

* migrate to ESLint 9 flat config ([7126be7](https://github.com/Availity/sdk-js/commit/7126be7cdda8ebd9343e70374fd660763f87e079))



# [3.0.0](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@2.0.1...@availity/dinosaurdocs@3.0.0) (2026-06-08)


### Bug Fixes

* resolve lint errors, type errors, and add typecheck script ([a08d393](https://github.com/Availity/sdk-js/commit/a08d3934497934bdcdf2f7a19d9d3c9479186c41))


* feat!: migrate to ESM and drop Node 20 support ([a665467](https://github.com/Availity/sdk-js/commit/a6654672c2e96adb325d100a6dfdb7b5baf16bcd))


### BREAKING CHANGES

* All packages now use ESM as the primary module format.
CJS is still available via the `require` condition in package exports.

- Add `"type": "module"` to all packages
- Swap export paths: `.js` is now ESM, `.cjs` is now CJS
- Drop Node 20 from engines (now requires ^22.0.0 || ^24.0.0)
- Rename config files from .js to .cjs (jest, prettier, commitlint, etc.)
- Upgrade yarn to ^4, jest to 30.4.x, typescript to 5.9.3, undici to ^8
- Add `sideEffects: false` to all packages for better tree-shaking



## [2.0.1](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@2.0.0...@availity/dinosaurdocs@2.0.1) (2026-01-23)



# [2.0.0](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@1.2.5...@availity/dinosaurdocs@2.0.0) (2025-11-10)


### Code Refactoring

* **api-axios, api-core:** remove slotmachine ([1fa331b](https://github.com/Availity/sdk-js/commit/1fa331bbf415daf60d61e9bfa057eb0295d0d52e))


### BREAKING CHANGES

* **api-axios, api-core:** avSlotmachineApi was removed



## [1.2.5](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@1.2.4...@availity/dinosaurdocs@1.2.5) (2025-10-06)



## [1.2.4](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@1.2.3...@availity/dinosaurdocs@1.2.4) (2025-07-24)



## [1.2.3](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@1.2.2...@availity/dinosaurdocs@1.2.3) (2025-04-09)



## [1.2.2](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@1.2.1...@availity/dinosaurdocs@1.2.2) (2025-02-10)



## [1.2.1](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@1.2.0...@availity/dinosaurdocs@1.2.1) (2024-10-04)



# [1.2.0](https://github.com/Availity/sdk-js/compare/@availity/dinosaurdocs@1.1.5...@availity/dinosaurdocs@1.2.0) (2024-07-29)


### Features

* **docusaurus:** upgrade docusaurus to v2 ([537a5c3](https://github.com/Availity/sdk-js/commit/537a5c3f50cc0566535344604fbac4cd59d4552c))



## [0.2.8](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.7...@availity/docusaurus@0.2.8) (2024-05-15)



## [0.2.7](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.6...@availity/docusaurus@0.2.7) (2024-03-07)



## [0.2.6](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.5...@availity/docusaurus@0.2.6) (2024-02-26)



## [0.2.5](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.4...@availity/docusaurus@0.2.5) (2024-02-23)



## [0.2.4](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.3...@availity/docusaurus@0.2.4) (2024-02-19)



## [0.2.3](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.2...@availity/docusaurus@0.2.3) (2023-09-22)



## [0.2.2](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.1...@availity/docusaurus@0.2.2) (2023-08-23)



# 0.1.0 (2023-08-23)


### Bug Fixes

* **dinosaurdocs:** fixes broken code block highlighting ([ca094ba](https://github.com/Availity/sdk-js/commit/ca094ba85defb5ccc572c43814bfe545a4b7af64))
* **upload-core:** adds max amount of retries to av scan polling ([5175754](https://github.com/Availity/sdk-js/commit/51757544e361bdad926d1ce0495e5766c56e1ba3))


### Features

* **docs:** add docusaurus docs ([13a88c2](https://github.com/Availity/sdk-js/commit/13a88c215da1bbd1c8346f89d4842de88fa68df5))
* **docusaurus:** upgrade docusaurus to v2 ([537a5c3](https://github.com/Availity/sdk-js/commit/537a5c3f50cc0566535344604fbac4cd59d4552c))
* **upload-core:** fixed prop to this.  Added a test and fixed another test.. ([207df80](https://github.com/Availity/sdk-js/commit/207df80faff7e61a2529b53e4f306baa5c08b551))



## [0.2.1](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.2.0...@availity/docusaurus@0.2.1) (2023-04-28)



# [0.2.0](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.1.4...@availity/docusaurus@0.2.0) (2022-12-02)


### Features

* **docusaurus:** upgrade docusaurus to v2 ([537a5c3](https://github.com/Availity/sdk-js/commit/537a5c3f50cc0566535344604fbac4cd59d4552c))



## [0.1.4](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.1.3...@availity/docusaurus@0.1.4) (2022-06-23)



## [0.1.3](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.1.2...@availity/docusaurus@0.1.3) (2022-06-15)



## [0.1.2](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.1.1...@availity/docusaurus@0.1.2) (2022-06-13)



## [0.1.1](https://github.com/Availity/sdk-js/compare/@availity/docusaurus@0.1.0...@availity/docusaurus@0.1.1) (2022-06-01)



# 0.1.0 (2022-05-24)


### Bug Fixes

* **dinosaurdocs:** fixes broken code block highlighting ([ca094ba](https://github.com/Availity/sdk-js/commit/ca094ba85defb5ccc572c43814bfe545a4b7af64))
* **upload-core:** adds max amount of retries to av scan polling ([5175754](https://github.com/Availity/sdk-js/commit/51757544e361bdad926d1ce0495e5766c56e1ba3))


### Features

* **docs:** add docusaurus docs ([13a88c2](https://github.com/Availity/sdk-js/commit/13a88c215da1bbd1c8346f89d4842de88fa68df5))
* **upload-core:** fixed prop to this.  Added a test and fixed another test.. ([207df80](https://github.com/Availity/sdk-js/commit/207df80faff7e61a2529b53e4f306baa5c08b551))



## 1.1.5 (2022-03-23)

**Note:** Version bump only for package @availity/dinosaurdocs





## 1.1.4 (2022-02-17)

**Note:** Version bump only for package @availity/dinosaurdocs





## 1.1.3 (2021-12-21)

**Note:** Version bump only for package @availity/dinosaurdocs





## 1.1.2 (2021-10-19)

**Note:** Version bump only for package @availity/dinosaurdocs





## 1.1.1 (2021-09-16)

**Note:** Version bump only for package @availity/dinosaurdocs





# 1.1.0 (2021-01-04)


### Bug Fixes

* **dinosaurdocs:** fixes broken code block highlighting ([ca094ba](https://github.com/Availity/sdk-js/commit/ca094ba85defb5ccc572c43814bfe545a4b7af64))


### Features

* **docs:** add docusaurus docs ([13a88c2](https://github.com/Availity/sdk-js/commit/13a88c215da1bbd1c8346f89d4842de88fa68df5))
