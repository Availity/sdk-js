# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [8.0.2](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@8.0.1...@availity/authorizations-axios@8.0.2) (2024-10-04)

### Dependency Updates

* `@availity/api-axios` updated to version `8.0.1`


## [8.0.1](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@8.0.0...@availity/authorizations-axios@8.0.1) (2024-09-19)

### Dependency Updates

* `@availity/api-axios` updated to version `8.0.0`


# [8.0.0](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@7.0.5...@availity/authorizations-axios@8.0.0) (2024-07-29)

### Dependency Updates

* `@availity/api-axios` updated to version `7.0.5`
* `@availity/authorizations-core` updated to version `7.0.5`

### chore

* **authorizations-axios:** upgrade to node 18 and 20 ([94bc681](https://github.com/Availity/sdk-js/commit/94bc68125441e50e7794a7d22ca6d8d8829b04aa))


### BREAKING CHANGES

* **authorizations-axios:** drop support for node 14 and 16



## [7.0.5](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@7.0.4...@availity/authorizations-axios@7.0.5) (2024-07-29)

### Dependency Updates

* `@availity/api-axios` updated to version `7.0.4`
* `@availity/authorizations-core` updated to version `7.0.4`


## [7.0.4](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@7.0.3...@availity/authorizations-axios@7.0.4) (2024-05-30)

### Dependency Updates

* `api-axios` updated to version `7.0.3`
* `authorizations-core` updated to version `7.0.3`


## [7.0.3](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@7.0.2...@availity/authorizations-axios@7.0.3) (2024-02-20)



## [7.0.2](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@7.0.1...@availity/authorizations-axios@7.0.2) (2024-02-19)



## [7.0.1](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@7.0.0...@availity/authorizations-axios@7.0.1) (2023-08-23)



# 1.0.0 (2023-08-23)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))
* add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96c1ad7b3b9b752d9376b88d9b91daabca6))
* **api-axios:** use merge-options-es5 instead of merge-options ([993ccc6](https://github.com/Availity/sdk-js/commit/993ccc6ff8db97b6e1d66454c93e7a33dfe95aee))
* **authorizations-axios:** swap avPermissionsApi for avUserPermissionsApi ([d6e86ad](https://github.com/Availity/sdk-js/commit/d6e86ad9c46c01e1a887a4f625d40f5fdff88584))
* fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f486e49eb969320edfbfab422d47abe4ab1))
* update babel and jest configs, rename tests ([c80e194](https://github.com/Availity/sdk-js/commit/c80e1947f0c3cb28c3c7db842c82f381622d72e7))


### chore

* **api-core:** core, angular, axios api naming consistency ([f129fad](https://github.com/Availity/sdk-js/commit/f129fad36f4e4d8c81fd0b4989811846dd245ee3))
* **authorizations-axios:** bump axios to v1 ([7f994b1](https://github.com/Availity/sdk-js/commit/7f994b1d7b85a6f446b09e31fbcbe2d59e8747e6))


### Code Refactoring

* **localstorage-core:** converted class to function ([9f1fdf0](https://github.com/Availity/sdk-js/commit/9f1fdf07e388cabbbc1da9ebd4016d6ba5dace8f))


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### BREAKING CHANGES

* **authorizations-axios:** axios version 1.4.0 or greater is required
* Drop Internet Explorer support
* **localstorage-core:** Class is now a Function and doesn't require to be instantiated.
* upgrades other packages that are using old package-locks
* **api-core:** export naming conventions have been refactored to match for each implementation (angular/axios). Constructors are prefixed with 'Av', implementations are prefixed with 'av', and Apis are postfixed with 'Api'.



# [7.0.0](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@6.0.3...@availity/authorizations-axios@7.0.0) (2023-06-14)


### chore

* **authorizations-axios:** bump axios to v1 ([7f994b1](https://github.com/Availity/sdk-js/commit/7f994b1d7b85a6f446b09e31fbcbe2d59e8747e6))


### BREAKING CHANGES

* **authorizations-axios:** axios version 1.4.0 or greater is required



## [6.0.3](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@6.0.2...@availity/authorizations-axios@6.0.3) (2022-06-15)



## [6.0.2](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@6.0.1...@availity/authorizations-axios@6.0.2) (2022-05-24)



## [6.0.1](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@6.0.0...@availity/authorizations-axios@6.0.1) (2022-04-28)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))



# [6.0.0](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.55...@availity/authorizations-axios@6.0.0) (2022-04-28)


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### BREAKING CHANGES

* Drop Internet Explorer support



## [5.0.55](https://github.com/availity/sdk-js/compare/@availity/authorizations-axios@5.0.53...@availity/authorizations-axios@5.0.55) (2022-02-22)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.54](https://github.com/availity/sdk-js/compare/@availity/authorizations-axios@5.0.53...@availity/authorizations-axios@5.0.54) (2022-01-19)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.53 (2021-12-21)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.52](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.51...@availity/authorizations-axios@5.0.52) (2021-10-29)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.51](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.50...@availity/authorizations-axios@5.0.51) (2021-10-22)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.50 (2021-10-20)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.49 (2021-10-19)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.48](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.47...@availity/authorizations-axios@5.0.48) (2021-09-30)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.47](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.46...@availity/authorizations-axios@5.0.47) (2021-09-30)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.46](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.45...@availity/authorizations-axios@5.0.46) (2021-09-28)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.45 (2021-09-16)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.44](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.43...@availity/authorizations-axios@5.0.44) (2021-05-25)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.43](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.42...@availity/authorizations-axios@5.0.43) (2021-05-20)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.42](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.41...@availity/authorizations-axios@5.0.42) (2021-05-17)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.41 (2021-04-01)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.40 (2020-12-16)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.39](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.38...@availity/authorizations-axios@5.0.39) (2020-08-24)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.38](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.37...@availity/authorizations-axios@5.0.38) (2020-07-08)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.37](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.36...@availity/authorizations-axios@5.0.37) (2020-06-22)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.36](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.35...@availity/authorizations-axios@5.0.36) (2020-06-15)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.35](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.34...@availity/authorizations-axios@5.0.35) (2020-06-08)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.34](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.33...@availity/authorizations-axios@5.0.34) (2020-06-04)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.33](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.32...@availity/authorizations-axios@5.0.33) (2020-06-04)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.32 (2020-06-04)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.31 (2020-06-03)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.30](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.29...@availity/authorizations-axios@5.0.30) (2020-05-11)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.29 (2020-05-01)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.28 (2020-04-30)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.27 (2020-04-22)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.26 (2020-04-08)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.25 (2020-04-06)

**Note:** Version bump only for package @availity/authorizations-axios





## 5.0.24 (2020-04-06)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.23](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.22...@availity/authorizations-axios@5.0.23) (2020-03-25)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.22](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.21...@availity/authorizations-axios@5.0.22) (2020-03-06)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.21](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.20...@availity/authorizations-axios@5.0.21) (2020-03-04)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.20](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.19...@availity/authorizations-axios@5.0.20) (2020-03-02)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.19](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.18...@availity/authorizations-axios@5.0.19) (2020-02-18)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.18](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.15...@availity/authorizations-axios@5.0.18) (2020-02-13)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.17](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.16...@availity/authorizations-axios@5.0.17) (2020-02-13)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.16](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.14...@availity/authorizations-axios@5.0.16) (2020-02-13)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.15](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.13...@availity/authorizations-axios@5.0.15) (2020-02-13)


### Bug Fixes

* update babel and jest configs, rename tests ([c80e194](https://github.com/Availity/sdk-js/commit/c80e1947f0c3cb28c3c7db842c82f381622d72e7))





## [5.0.14](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.13...@availity/authorizations-axios@5.0.14) (2020-02-13)


### Bug Fixes

* update babel and jest configs, rename tests ([c80e194](https://github.com/Availity/sdk-js/commit/c80e1947f0c3cb28c3c7db842c82f381622d72e7))





## [5.0.13](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.10...@availity/authorizations-axios@5.0.13) (2020-02-13)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.12](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.11...@availity/authorizations-axios@5.0.12) (2020-02-13)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.11](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.10...@availity/authorizations-axios@5.0.11) (2020-02-13)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.10](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.9...@availity/authorizations-axios@5.0.10) (2020-02-12)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.9](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.8...@availity/authorizations-axios@5.0.9) (2020-01-28)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.8](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.7...@availity/authorizations-axios@5.0.8) (2020-01-23)

**Note:** Version bump only for package @availity/authorizations-axios





## [5.0.7](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.6...@availity/authorizations-axios@5.0.7) (2020-01-14)

**Note:** Version bump only for package @availity/authorizations-axios

## [5.0.6](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.5...@availity/authorizations-axios@5.0.6) (2020-01-06)

**Note:** Version bump only for package @availity/authorizations-axios

## [5.0.5](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.4...@availity/authorizations-axios@5.0.5) (2020-01-03)

**Note:** Version bump only for package @availity/authorizations-axios

## [5.0.4](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.3...@availity/authorizations-axios@5.0.4) (2020-01-03)

**Note:** Version bump only for package @availity/authorizations-axios

## [5.0.3](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.2...@availity/authorizations-axios@5.0.3) (2019-12-03)

**Note:** Version bump only for package @availity/authorizations-axios

## [5.0.2](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.1...@availity/authorizations-axios@5.0.2) (2019-12-02)

**Note:** Version bump only for package @availity/authorizations-axios

## [5.0.1](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@5.0.0...@availity/authorizations-axios@5.0.1) (2019-11-05)

**Note:** Version bump only for package @availity/authorizations-axios

# [5.0.0](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.14...@availity/authorizations-axios@5.0.0) (2019-10-21)

### Code Refactoring

-   **localstorage-core:** converted class to function ([9f1fdf0](https://github.com/Availity/sdk-js/commit/9f1fdf0))

### BREAKING CHANGES

-   **localstorage-core:** Class is now a Function and doesn't require to be instantiated.

## [4.0.14](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.13...@availity/authorizations-axios@4.0.14) (2019-09-27)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.13](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.12...@availity/authorizations-axios@4.0.13) (2019-09-22)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.12](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.10...@availity/authorizations-axios@4.0.12) (2019-08-01)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.11](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.10...@availity/authorizations-axios@4.0.11) (2019-08-01)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.10](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.9...@availity/authorizations-axios@4.0.10) (2019-06-21)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.9](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.8...@availity/authorizations-axios@4.0.9) (2019-06-14)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.8](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.7...@availity/authorizations-axios@4.0.8) (2019-05-31)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.7](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.6...@availity/authorizations-axios@4.0.7) (2019-04-29)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.6](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.5...@availity/authorizations-axios@4.0.6) (2019-04-26)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.5](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.4...@availity/authorizations-axios@4.0.5) (2019-04-25)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.4](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.3...@availity/authorizations-axios@4.0.4) (2019-04-25)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.3](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.2...@availity/authorizations-axios@4.0.3) (2019-04-23)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.2](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.1...@availity/authorizations-axios@4.0.2) (2019-04-17)

**Note:** Version bump only for package @availity/authorizations-axios

## [4.0.1](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@4.0.0...@availity/authorizations-axios@4.0.1) (2019-04-17)

**Note:** Version bump only for package @availity/authorizations-axios

# [4.0.0](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@3.0.4...@availity/authorizations-axios@4.0.0) (2019-03-18)

### Bug Fixes

-   add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96))
-   fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f4))
-   **authorizations-axios:** swap avPermissionsApi for avUserPermissionsApi ([d6e86ad](https://github.com/Availity/sdk-js/commit/d6e86ad))

### BREAKING CHANGES

-   upgrades other packages that are using old package-locks

# [3.1.0](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@3.0.4...@availity/authorizations-axios@3.1.0) (2019-03-04)

### Bug Fixes

-   add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96))
-   fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f4))

### BREAKING CHANGES

-   upgrades other packages that are using old package-locks

## [3.0.4](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@3.0.3...@availity/authorizations-axios@3.0.4) (2019-02-12)

**Note:** Version bump only for package @availity/authorizations-axios

## [3.0.3](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@3.0.2...@availity/authorizations-axios@3.0.3) (2019-02-12)

**Note:** Version bump only for package @availity/authorizations-axios

## [3.0.2](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@3.0.1...@availity/authorizations-axios@3.0.2) (2019-02-12)

**Note:** Version bump only for package @availity/authorizations-axios

<a name="3.0.1"></a>

## [3.0.1](https://github.com/Availity/sdk-js/compare/@availity/authorizations-axios@3.0.0...@availity/authorizations-axios@3.0.1) (2018-11-20)

**Note:** Version bump only for package @availity/authorizations-axios

<a name="3.0.0"></a>

# 3.0.0 (2018-11-20)

### Bug Fixes

-   **api-axios:** use merge-options-es5 instead of merge-options ([993ccc6](https://github.com/Availity/sdk-js/commit/993ccc6))

<a name="3.0.0"></a>

# 3.0.0 (2018-09-06)

<a name="2.6.0"></a>

# 2.6.0 (2018-08-23)

<a name="2.5.0"></a>

# 2.5.0 (2018-08-20)

<a name="2.4.8"></a>

## 2.4.8 (2018-08-06)

<a name="2.4.7"></a>

## 2.4.7 (2018-08-02)

<a name="2.4.6"></a>

## 2.4.6 (2018-08-02)

<a name="2.4.0"></a>

# 2.4.0 (2018-07-12)

<a name="2.3.3"></a>

## 2.3.3 (2018-07-12)

<a name="2.2.0"></a>

# 2.2.0 (2018-06-29)

<a name="2.1.2"></a>

## 2.1.2 (2018-06-13)

<a name="2.1.1"></a>

## 2.1.1 (2018-05-25)

<a name="2.1.0"></a>

# 2.1.0 (2018-05-24)

<a name="2.0.3"></a>

## 2.0.3 (2018-05-10)

<a name="2.0.2"></a>

## 2.0.2 (2018-05-04)

<a name="2.0.1"></a>

## 2.0.1 (2018-05-04)

<a name="2.0.0"></a>

# 2.0.0 (2018-05-04)

### Chores

-   **api-core:** core, angular, axios api naming consistency ([f129fad](https://github.com/Availity/sdk-js/commit/f129fad))

### BREAKING CHANGES

-   **api-core:** export naming conventions have been refactored to match for each implementation (angular/axios). Constructors are prefixed with 'Av', implementations are prefixed with 'av', and Apis are postfixed with 'Api'.

<a name="1.4.0"></a>

# 1.4.0 (2018-04-17)

<a name="1.2.0"></a>

# 1.2.0 (2018-04-12)

<a name="1.1.1"></a>

## 1.1.1 (2018-03-28)

<a name="1.0.1"></a>

## 1.0.1 (2018-03-26)

<a name="1.0.0-alpha.17"></a>

# 1.0.0-alpha.17 (2018-01-18)

<a name="1.0.0-alpha.16"></a>

# 1.0.0-alpha.16 (2018-01-17)

<a name="1.0.0-alpha.15"></a>

# 1.0.0-alpha.15 (2018-01-12)

<a name="1.0.0-alpha.14"></a>

# 1.0.0-alpha.14 (2018-01-11)

<a name="1.0.0-alpha.13"></a>

# 1.0.0-alpha.13 (2018-01-10)

<a name="1.0.0-alpha.12"></a>

# 1.0.0-alpha.12 (2018-01-09)

<a name="1.0.0-alpha.11"></a>

# 1.0.0-alpha.11 (2018-01-06)

<a name="1.0.0-alpha.10"></a>

# 1.0.0-alpha.10 (2018-01-04)

<a name="1.0.0-alpha.9"></a>

# 1.0.0-alpha.9 (2018-01-03)

<a name="1.0.0-alpha.8"></a>

# 1.0.0-alpha.8 (2018-01-03)

<a name="1.0.0-alpha.7"></a>

# 1.0.0-alpha.7 (2018-01-03)

<a name="1.0.0-alpha.6"></a>

# 1.0.0-alpha.6 (2017-12-20)

<a name="1.0.0-alpha.5"></a>

# 1.0.0-alpha.5 (2017-12-20)

<a name="1.0.0-alpha.4"></a>

# 1.0.0-alpha.4 (2017-12-20)

<a name="1.0.0-alpha.3"></a>

# 1.0.0-alpha.3 (2017-12-19)

<a name="1.0.0-alpha.2"></a>

# 1.0.0-alpha.2 (2017-12-19)

<a name="1.0.0-alpha.1"></a>

# 1.0.0-alpha.1 (2017-12-19)

<a name="1.0.0-alpha.0"></a>

# 1.0.0-alpha.0 (2017-12-05)
