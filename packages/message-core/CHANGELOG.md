# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [8.0.0](https://github.com/Availity/sdk-js/compare/@availity/message-core@7.0.5...@availity/message-core@8.0.0) (2025-05-14)


### chore

* drop support for node 18 and add support for node 22 ([1e3dcc3](https://github.com/Availity/sdk-js/commit/1e3dcc3311021edc5691b1383aa393ebebe1d9db))


### BREAKING CHANGES

* drop support for node 18



## [7.0.5](https://github.com/Availity/sdk-js/compare/@availity/message-core@7.0.4...@availity/message-core@7.0.5) (2025-03-14)



## [7.0.4](https://github.com/Availity/sdk-js/compare/@availity/message-core@7.0.3...@availity/message-core@7.0.4) (2025-03-13)



## [7.0.3](https://github.com/Availity/sdk-js/compare/@availity/message-core@7.0.2...@availity/message-core@7.0.3) (2025-03-10)



## [7.0.2](https://github.com/Availity/sdk-js/compare/@availity/message-core@7.0.1...@availity/message-core@7.0.2) (2025-02-18)



## [7.0.1](https://github.com/Availity/sdk-js/compare/@availity/message-core@7.0.0...@availity/message-core@7.0.1) (2024-08-14)


### Bug Fixes

* **message-core:** add essentials rewrite ([a27f843](https://github.com/Availity/sdk-js/commit/a27f843d7594cac19b5b529b85051b81783c727b))



# [7.0.0](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.1.4...@availity/message-core@7.0.0) (2024-07-29)


### chore

* **message-core:** upgrade to node 18 and 20 ([fde93e0](https://github.com/Availity/sdk-js/commit/fde93e0c6075d68c965ec3bfdbef9d7af7963408))


### BREAKING CHANGES

* **message-core:** drop support for node 14 and 16



## [6.1.4](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.1.3...@availity/message-core@6.1.4) (2024-07-29)



## [6.1.3](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.1.2...@availity/message-core@6.1.3) (2024-05-30)



## [6.1.2](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.1.1...@availity/message-core@6.1.2) (2024-02-19)



## [6.1.1](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.1.0...@availity/message-core@6.1.1) (2023-08-23)



# 1.0.0 (2023-08-23)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))
* **message-core:** export instance over class ([0841d09](https://github.com/Availity/sdk-js/commit/0841d09a96abca731e69b62dfdff1e19635851c1))
* **message-core:** fix return type for AvMessage.subscribe ([a3c3a62](https://github.com/Availity/sdk-js/commit/a3c3a62a811706847561abe7d24ee4c6671ce392))


### Code Refactoring

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** eslint fixes ([00e3395](https://github.com/Availity/sdk-js/commit/00e339595962501c96acf2895650f104d4c49809))
* **message-core:** AvMessage ([4d2d0be](https://github.com/Availity/sdk-js/commit/4d2d0be517e249305a2ad3727415e70840ce42a1))


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### Features

* **message-core:** add ignoreSameWindow boolean option ([a4dc725](https://github.com/Availity/sdk-js/commit/a4dc725e6047a862317741842feb16904a7d4933))
* **message-core:** add unsubscribe ([dd6b5eb](https://github.com/Availity/sdk-js/commit/dd6b5eb00d1abac40c8ddefdb56ffb25177c21a4))
* **message-core:** subscriber functionality ([343b09d](https://github.com/Availity/sdk-js/commit/343b09dcc01c35981f8a823aca7b8fc645f006aa))
* **message-core:** unsusbscribeAll fn ([3a66ff8](https://github.com/Availity/sdk-js/commit/3a66ff888aef590824494ad28766a8b3de4ec669))


### BREAKING CHANGES

* Drop Internet Explorer support
* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** .filter()[0] replaced with .find(), .forEach() replaced with for...of
* **message-core:** Remove message-angular to use subscribers from core



# [6.1.0](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.0.3...@availity/message-core@6.1.0) (2022-06-23)


### Features

* **message-core:** add ignoreSameWindow boolean option ([a4dc725](https://github.com/Availity/sdk-js/commit/a4dc725e6047a862317741842feb16904a7d4933))



## [6.0.3](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.0.2...@availity/message-core@6.0.3) (2022-06-15)



## [6.0.2](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.0.1...@availity/message-core@6.0.2) (2022-05-24)



## [6.0.1](https://github.com/Availity/sdk-js/compare/@availity/message-core@6.0.0...@availity/message-core@6.0.1) (2022-04-28)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))



# [6.0.0](https://github.com/Availity/sdk-js/compare/@availity/message-core@5.0.5...@availity/message-core@6.0.0) (2022-04-28)


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### BREAKING CHANGES

* Drop Internet Explorer support



## 5.0.5 (2022-03-13)


### Bug Fixes

* **message-core:** fix return type for AvMessage.subscribe ([a3c3a62](https://github.com/availity/sdk-js/commit/a3c3a62a811706847561abe7d24ee4c6671ce392))





## 5.0.4 (2021-12-21)

**Note:** Version bump only for package @availity/message-core





## 5.0.3 (2021-11-09)


### Bug Fixes

* **message-core:** export instance over class ([0841d09](https://github.com/Availity/sdk-js/commit/0841d09a96abca731e69b62dfdff1e19635851c1))





## [5.0.2](https://github.com/Availity/sdk-js/compare/@availity/message-core@5.0.1...@availity/message-core@5.0.2) (2021-10-29)

**Note:** Version bump only for package @availity/message-core





## 5.0.1 (2021-10-22)

**Note:** Version bump only for package @availity/message-core





# 5.0.0 (2021-05-17)


### Code Refactoring

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** eslint fixes ([00e3395](https://github.com/Availity/sdk-js/commit/00e339595962501c96acf2895650f104d4c49809))


### BREAKING CHANGES

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** .filter()[0] replaced with .find(), .forEach() replaced with for...of





## 4.0.20 (2020-06-22)

**Note:** Version bump only for package @availity/message-core





## 4.0.19 (2020-05-01)

**Note:** Version bump only for package @availity/message-core





## 4.0.18 (2020-04-30)

**Note:** Version bump only for package @availity/message-core





## 4.0.17 (2020-04-22)

**Note:** Version bump only for package @availity/message-core





## 4.0.16 (2020-04-08)

**Note:** Version bump only for package @availity/message-core





## 4.0.15 (2020-04-06)

**Note:** Version bump only for package @availity/message-core





## 4.0.14 (2020-04-06)

**Note:** Version bump only for package @availity/message-core





## [4.0.13](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.10...@availity/message-core@4.0.13) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.12](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.11...@availity/message-core@4.0.12) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.11](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.9...@availity/message-core@4.0.11) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.10](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.8...@availity/message-core@4.0.10) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.9](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.8...@availity/message-core@4.0.9) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.8](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.5...@availity/message-core@4.0.8) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.7](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.6...@availity/message-core@4.0.7) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.6](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.5...@availity/message-core@4.0.6) (2020-02-13)

**Note:** Version bump only for package @availity/message-core





## [4.0.5](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.4...@availity/message-core@4.0.5) (2020-01-03)

**Note:** Version bump only for package @availity/message-core

## [4.0.4](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.3...@availity/message-core@4.0.4) (2020-01-03)

**Note:** Version bump only for package @availity/message-core

## [4.0.3](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.2...@availity/message-core@4.0.3) (2019-10-29)

**Note:** Version bump only for package @availity/message-core

## [4.0.2](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.1...@availity/message-core@4.0.2) (2019-04-23)

**Note:** Version bump only for package @availity/message-core

## [4.0.1](https://github.com/Availity/sdk-js/compare/@availity/message-core@4.0.0...@availity/message-core@4.0.1) (2019-02-12)

**Note:** Version bump only for package @availity/message-core

# 4.0.0 (2019-02-12)

# 3.0.0 (2018-09-06)

### Code Refactoring

-   **message-core:** AvMessage ([4d2d0be](https://github.com/Availity/sdk-js/commit/4d2d0be))

### Features

-   **message-core:** add unsubscribe ([dd6b5eb](https://github.com/Availity/sdk-js/commit/dd6b5eb))
-   **message-core:** subscriber functionality ([343b09d](https://github.com/Availity/sdk-js/commit/343b09d))
-   **message-core:** unsusbscribeAll fn ([3a66ff8](https://github.com/Availity/sdk-js/commit/3a66ff8))

### BREAKING CHANGES

-   **message-core:** Remove message-angular to use subscribers from core

## 1.0.1 (2018-03-26)

# 1.0.0-alpha.17 (2018-01-18)

# 1.0.0-alpha.16 (2018-01-17)

# 1.0.0-alpha.15 (2018-01-12)

# 1.0.0-alpha.14 (2018-01-11)

# 1.0.0-alpha.13 (2018-01-10)

# 1.0.0-alpha.12 (2018-01-09)

# 1.0.0-alpha.11 (2018-01-06)

# 1.0.0-alpha.10 (2018-01-04)

# 1.0.0-alpha.9 (2018-01-03)

# 1.0.0-alpha.8 (2018-01-03)

# 1.0.0-alpha.7 (2018-01-03)

# 1.0.0-alpha.6 (2017-12-20)

# 1.0.0-alpha.5 (2017-12-20)

# 1.0.0-alpha.4 (2017-12-20)

# 1.0.0-alpha.3 (2017-12-19)

# 1.0.0-alpha.2 (2017-12-19)

# 1.0.0-alpha.1 (2017-12-19)

# 1.0.0-alpha.0 (2017-12-05)

<a name="3.0.0"></a>

# 3.0.0 (2018-11-20)

<a name="3.0.0"></a>

# 3.0.0 (2018-09-06)

### Code Refactoring

-   **message-core:** AvMessage ([4d2d0be](https://github.com/Availity/sdk-js/commit/4d2d0be))

### Features

-   **message-core:** add unsubscribe ([dd6b5eb](https://github.com/Availity/sdk-js/commit/dd6b5eb))
-   **message-core:** subscriber functionality ([343b09d](https://github.com/Availity/sdk-js/commit/343b09d))
-   **message-core:** unsusbscribeAll fn ([3a66ff8](https://github.com/Availity/sdk-js/commit/3a66ff8))

### BREAKING CHANGES

-   **message-core:** Remove message-angular to use subscribers from core

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
