# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [4.0.2](https://github.com/availity/sdk-js/compare/@availity/dockyard@4.0.1...@availity/dockyard@4.0.2) (2026-06-09)



## [4.0.1](https://github.com/availity/sdk-js/compare/@availity/dockyard@4.0.0...@availity/dockyard@4.0.1) (2026-06-09)



# [4.0.0](https://github.com/availity/sdk-js/compare/@availity/dockyard@3.1.0...@availity/dockyard@4.0.0) (2026-06-08)


### Bug Fixes

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



# [3.1.0](https://github.com/availity/sdk-js/compare/@availity/dockyard@3.0.1...@availity/dockyard@3.1.0) (2026-05-27)


### Features

* add node 24 support ([5e735d6](https://github.com/availity/sdk-js/commit/5e735d6957dcf455e41b3017dc34250dfe07055e))



## [3.0.1](https://github.com/availity/sdk-js/compare/@availity/dockyard@3.0.0...@availity/dockyard@3.0.1) (2026-02-09)



# [3.0.0](https://github.com/Availity/sdk-js/compare/@availity/dockyard@2.0.2...@availity/dockyard@3.0.0) (2025-05-14)


### chore

* drop support for node 18 and add support for node 22 ([1e3dcc3](https://github.com/Availity/sdk-js/commit/1e3dcc3311021edc5691b1383aa393ebebe1d9db))


### BREAKING CHANGES

* drop support for node 18



## [2.0.2](https://github.com/Availity/sdk-js/compare/@availity/dockyard@2.0.1...@availity/dockyard@2.0.2) (2025-03-14)



## [2.0.1](https://github.com/Availity/sdk-js/compare/@availity/dockyard@2.0.0...@availity/dockyard@2.0.1) (2025-03-10)



# [2.0.0](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.7...@availity/dockyard@2.0.0) (2024-07-29)


### chore

* **dockyard:** upgrade to node 18 and 20 ([7a0d4da](https://github.com/Availity/sdk-js/commit/7a0d4daa7a1e1880049e2076893e4ff7b13571ba))


### BREAKING CHANGES

* **dockyard:** drop support for node 14 and 16



## [1.0.7](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.6...@availity/dockyard@1.0.7) (2024-07-29)



## [1.0.6](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.5...@availity/dockyard@1.0.6) (2024-05-30)



## [1.0.5](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.4...@availity/dockyard@1.0.5) (2024-02-19)



## [1.0.4](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.3...@availity/dockyard@1.0.4) (2023-08-23)



# 1.0.0 (2023-08-23)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))
* **dockyard:** deep object definitions ([f4a699b](https://github.com/Availity/sdk-js/commit/f4a699bba8afa9aa88ed791a99a34671aa354b35))
* **dockyard:** handle undefined required subfields ([38095a9](https://github.com/Availity/sdk-js/commit/38095a95fd64da862045a215b99d4297a0076506))
* **dockyard:** support includeTypes ([f30f064](https://github.com/Availity/sdk-js/commit/f30f0647387a5d137b86e3fb00b6d5eb7e34c02f))
* **dockyard:** top-level fields that do not have subFields ([0851c0b](https://github.com/Availity/sdk-js/commit/0851c0be17b1928833a62247cdd78d02406aac2b))


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### Features

* **dockyard:** convert yup schema to friendly docs object ([ac4726d](https://github.com/Availity/sdk-js/commit/ac4726dbde353e03410960e220337c313df6e15e))


### BREAKING CHANGES

* Drop Internet Explorer support



## [1.0.3](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.2...@availity/dockyard@1.0.3) (2022-06-15)



## [1.0.2](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.1...@availity/dockyard@1.0.2) (2022-05-24)



## [1.0.1](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.0...@availity/dockyard@1.0.1) (2022-04-28)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))



# [1.0.0](https://github.com/Availity/sdk-js/compare/@availity/dockyard@1.0.0-alpha.3...@availity/dockyard@1.0.0) (2022-04-28)


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### BREAKING CHANGES

* Drop Internet Explorer support



# 1.0.0-alpha.3 (2021-12-21)

**Note:** Version bump only for package @availity/dockyard





# 1.0.0-alpha.2 (2021-11-02)


### Bug Fixes

* **dockyard:** handle undefined required subfields ([38095a9](https://github.com/Availity/sdk-js/commit/38095a95fd64da862045a215b99d4297a0076506))





# 1.0.0-alpha.1 (2021-10-29)


### Bug Fixes

* **dockyard:** deep object definitions ([f4a699b](https://github.com/Availity/sdk-js/commit/f4a699bba8afa9aa88ed791a99a34671aa354b35))
* **dockyard:** support includeTypes ([f30f064](https://github.com/Availity/sdk-js/commit/f30f0647387a5d137b86e3fb00b6d5eb7e34c02f))
* **dockyard:** top-level fields that do not have subFields ([0851c0b](https://github.com/Availity/sdk-js/commit/0851c0be17b1928833a62247cdd78d02406aac2b))


### Features

* **dockyard:** convert yup schema to friendly docs object ([ac4726d](https://github.com/Availity/sdk-js/commit/ac4726dbde353e03410960e220337c313df6e15e))
