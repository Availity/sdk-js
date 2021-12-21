# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 7.0.7 (2021-12-21)

**Note:** Version bump only for package @availity/api-core





## [7.0.6](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.5...@availity/api-core@7.0.6) (2021-10-29)

**Note:** Version bump only for package @availity/api-core





## 7.0.5 (2021-10-22)


### Bug Fixes

* **api-core:** disable lint rule ([b506cdc](https://github.com/Availity/sdk-js/commit/b506cdc47dd90d8dd9941eeb1a4d7efcae2d03ec))





## 7.0.4 (2021-09-30)


### Bug Fixes

* **api-core:** fix organizations resources check ([28644b6](https://github.com/Availity/sdk-js/commit/28644b6431ba22df265225386e09aaec53f5a9e1))





## 7.0.3 (2021-09-16)

**Note:** Version bump only for package @availity/api-core





## [7.0.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.1...@availity/api-core@7.0.2) (2021-05-25)


### Bug Fixes

* **api-core:** all should append individual items ([1bf476e](https://github.com/Availity/sdk-js/commit/1bf476e4125355bc45fbbd8895c7affc48c13bdc))
* **api-core:** use flat for lint ([dcabbdf](https://github.com/Availity/sdk-js/commit/dcabbdf97e9fd9d8cba101af31a0a22e9e704f64))
* **api-core:** use flat for lint with spread ([56b4cd9](https://github.com/Availity/sdk-js/commit/56b4cd979edc0af07b9a00682d999ae234bc9c95))





## [7.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@7.0.0...@availity/api-core@7.0.1) (2021-05-20)


### Bug Fixes

* **api-core:** fix flattenObject import ([8c4375e](https://github.com/Availity/sdk-js/commit/8c4375eae85ae3d70f5c16d5c5691a746bc1d38b))





# [7.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.6...@availity/api-core@7.0.0) (2021-05-17)


### Code Refactoring

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** eslint fixes ([00e3395](https://github.com/Availity/sdk-js/commit/00e339595962501c96acf2895650f104d4c49809))


### BREAKING CHANGES

* **analytics-core,api-core,authorizations-core,message-core,native-form,upload-core:** .filter()[0] replaced with .find(), .forEach() replaced with for...of





## 6.6.6 (2021-04-01)


### Bug Fixes

* **api-core:** pass region param to axi-user-permissions call if additionalPostGetArgs ([3a41740](https://github.com/Availity/sdk-js/commit/3a41740f0b241e112cef64643985c49908ed3578))
* **api-core:** use correct region param for permissions call inside organizations ([724cc65](https://github.com/Availity/sdk-js/commit/724cc657bfc594ec10ed085003094a2dfac4b41d))





## 6.6.5 (2020-12-16)


### Bug Fixes

* **api-core:** fix clientId ([ed46ad4](https://github.com/Availity/sdk-js/commit/ed46ad490b3c026025c0b46a350507da2cc256cd))





## [6.6.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.3...@availity/api-core@6.6.4) (2020-08-24)


### Bug Fixes

* **api-core:** filesDelivery polling issue ([8e5f451](https://github.com/Availity/sdk-js/commit/8e5f4512e98537c5d8c530e97e51986b8debf16e))





## [6.6.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.2...@availity/api-core@6.6.3) (2020-07-08)


### Bug Fixes

* **api-core:** fix filteredOrgs arePermissionsEqual check ([c934bcc](https://github.com/Availity/sdk-js/commit/c934bcce302f42c34e71f551504f4828b596c157))





## [6.6.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.1...@availity/api-core@6.6.2) (2020-06-22)

**Note:** Version bump only for package @availity/api-core





## [6.6.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.6.0...@availity/api-core@6.6.1) (2020-06-15)


### Bug Fixes

* **api-core:** adds @availity/env-var as dependency ([4160e21](https://github.com/Availity/sdk-js/commit/4160e21e68376f62749c8690ca4babbc8ac76a99))





# [6.6.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.5.2...@availity/api-core@6.6.0) (2020-06-08)


### Bug Fixes

* **api-core:** fix org filtering when permission/resource not returned ([7b08f09](https://github.com/Availity/sdk-js/commit/7b08f09fcb7545818a6d3aaacf9c6eabb3969ba7))
* **api-core:** organization filtering fix for resource OR ([cb16c6a](https://github.com/Availity/sdk-js/commit/cb16c6a36fbf7d653c9ff70a0555981001c21606))
* **api-core:** organization permissions fix equal check, allow number ([6fc93c1](https://github.com/Availity/sdk-js/commit/6fc93c114523350cad0d37d8167b5047707c33a9))


### Features

* **api-core:** add permission AND/OR logic to organization filter ([90acf02](https://github.com/Availity/sdk-js/commit/90acf029028413c9fb98443d136abb795295eb5c))





## [6.5.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.5.1...@availity/api-core@6.5.2) (2020-06-04)


### Bug Fixes

* **api-core:** remove incorrect limit for axiUserPermissions in orgFilter ([edbddbf](https://github.com/Availity/sdk-js/commit/edbddbf2c7181d6ab634fc9fb5f0967d1d92d02b))





## [6.5.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.5.0...@availity/api-core@6.5.1) (2020-06-04)


### Bug Fixes

* **api-core:** filteredOrgs not sending region to axiUserPerms ([3706a72](https://github.com/Availity/sdk-js/commit/3706a7274ac4cd67271e9088d6fa8b8392c49c83))





# 6.5.0 (2020-06-04)


### Features

* **api-core:** route api calls to on-prem when called from cloud apps ([94fa9df](https://github.com/Availity/sdk-js/commit/94fa9dff730e514fd21abe0910d460e7958e9a94))





# 6.4.0 (2020-06-03)


### Bug Fixes

* **api-core:** fix org filtering when permission/resource not returned ([7b08f09](https://github.com/Availity/sdk-js/commit/7b08f09fcb7545818a6d3aaacf9c6eabb3969ba7))
* **api-core:** organization filtering fix for resource OR ([cb16c6a](https://github.com/Availity/sdk-js/commit/cb16c6a36fbf7d653c9ff70a0555981001c21606))
* **api-core:** organization permissions fix equal check, allow number ([6fc93c1](https://github.com/Availity/sdk-js/commit/6fc93c114523350cad0d37d8167b5047707c33a9))


### Features

* **api-core:** add permission AND/OR logic to organization filter ([90acf02](https://github.com/Availity/sdk-js/commit/90acf029028413c9fb98443d136abb795295eb5c))





# [6.3.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.2.6...@availity/api-core@6.3.0) (2020-05-11)


### Features

* **api-core:** add support for filtering organizations by permission and resource ([b607943](https://github.com/Availity/sdk-js/commit/b607943c9908d7d684013ec18678a1c05b9f1baf))





## 6.2.6 (2020-05-01)

**Note:** Version bump only for package @availity/api-core





## 6.2.5 (2020-04-30)

**Note:** Version bump only for package @availity/api-core





## 6.2.4 (2020-04-22)

**Note:** Version bump only for package @availity/api-core





## 6.2.3 (2020-04-08)

**Note:** Version bump only for package @availity/api-core





## 6.2.2 (2020-04-06)

**Note:** Version bump only for package @availity/api-core





## 6.2.1 (2020-04-06)

**Note:** Version bump only for package @availity/api-core





# [6.2.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.16...@availity/api-core@6.2.0) (2020-03-25)


### Features

* **api-core:** added tests for new patch method, see issue [#225](https://github.com/Availity/sdk-js/issues/225) ([5498a78](https://github.com/Availity/sdk-js/commit/5498a78f3e63567e40eb1b6bb1e035c3f70c124b))
* **api-core:** proposed support for patch method, see issue [#225](https://github.com/Availity/sdk-js/issues/225) ([2ff4085](https://github.com/Availity/sdk-js/commit/2ff40857dd9d36b383278f4c4743e45de511ddee))





## [6.1.16](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.15...@availity/api-core@6.1.16) (2020-03-06)

**Note:** Version bump only for package @availity/api-core





## [6.1.15](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.14...@availity/api-core@6.1.15) (2020-03-04)

**Note:** Version bump only for package @availity/api-core





## [6.1.14](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.13...@availity/api-core@6.1.14) (2020-03-02)

**Note:** Version bump only for package @availity/api-core





## [6.1.13](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.12...@availity/api-core@6.1.13) (2020-02-18)


### Performance Improvements

* **api-core:** use userId if it exists in call to getRegions ([e94de9e](https://github.com/Availity/sdk-js/commit/e94de9eb3f4d04247ba6bc1f76ce3deb4341e609))





## [6.1.12](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.9...@availity/api-core@6.1.12) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.11](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.10...@availity/api-core@6.1.11) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.10](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.8...@availity/api-core@6.1.10) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.9](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.7...@availity/api-core@6.1.9) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.8](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.7...@availity/api-core@6.1.8) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.7](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.4...@availity/api-core@6.1.7) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.6](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.5...@availity/api-core@6.1.6) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.5](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.4...@availity/api-core@6.1.5) (2020-02-13)

**Note:** Version bump only for package @availity/api-core





## [6.1.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.3...@availity/api-core@6.1.4) (2020-02-12)

**Note:** Version bump only for package @availity/api-core





## [6.1.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.2...@availity/api-core@6.1.3) (2020-01-28)

**Note:** Version bump only for package @availity/api-core





## [6.1.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.1...@availity/api-core@6.1.2) (2020-01-23)

**Note:** Version bump only for package @availity/api-core





## [6.1.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.1.0...@availity/api-core@6.1.1) (2020-01-14)

### Bug Fixes

-   **api-core:** fixed error trying to call toString on undefined ([0792f85](https://github.com/Availity/sdk-js/commit/0792f85))
-   **api-core:** updated handling of falsey values ([b810189](https://github.com/Availity/sdk-js/commit/b810189))
-   **api-core:** updated test suite name ([b0a75c6](https://github.com/Availity/sdk-js/commit/b0a75c6))

# [6.1.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.5...@availity/api-core@6.1.0) (2020-01-06)

### Features

-   **api-core:** add beacon support to log messages ([9350765](https://github.com/Availity/sdk-js/commit/9350765))

## [6.0.5](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.4...@availity/api-core@6.0.5) (2020-01-03)

**Note:** Version bump only for package @availity/api-core

## [6.0.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.3...@availity/api-core@6.0.4) (2020-01-03)

**Note:** Version bump only for package @availity/api-core

## [6.0.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.2...@availity/api-core@6.0.3) (2019-12-03)

### Performance Improvements

-   **api-core:** use userId if it exists in get,set application settings ([6cdd059](https://github.com/Availity/sdk-js/commit/6cdd059))

## [6.0.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.1...@availity/api-core@6.0.2) (2019-12-02)

### Performance Improvements

-   **api-core:** use userId from params if it exists in getOrganizations ([5e5225f](https://github.com/Availity/sdk-js/commit/5e5225f))

## [6.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@6.0.0...@availity/api-core@6.0.1) (2019-11-05)

### Bug Fixes

-   **api-core:** do not use config url when resolving location header ([199536f](https://github.com/Availity/sdk-js/commit/199536f))

# [6.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.4.1...@availity/api-core@6.0.0) (2019-10-21)

### Code Refactoring

-   **localstorage-core:** converted class to function ([9f1fdf0](https://github.com/Availity/sdk-js/commit/9f1fdf0))

### BREAKING CHANGES

-   **localstorage-core:** Class is now a Function and doesn't require to be instantiated.

## [5.4.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.4.0...@availity/api-core@5.4.1) (2019-09-27)

**Note:** Version bump only for package @availity/api-core

# [5.4.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.2.1...@availity/api-core@5.4.0) (2019-08-01)

### Features

-   **api-core:** add webQL resource ([67b9797](https://github.com/Availity/sdk-js/commit/67b9797))

# [5.3.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.2.1...@availity/api-core@5.3.0) (2019-08-01)

### Features

-   **api-core:** add webQL resource ([67b9797](https://github.com/Availity/sdk-js/commit/67b9797))

## [5.2.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.2.0...@availity/api-core@5.2.1) (2019-06-21)

### Bug Fixes

-   **api-core:** fix namespace of slotmachine resource ([3c3af84](https://github.com/Availity/sdk-js/commit/3c3af84))

# [5.2.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.6...@availity/api-core@5.2.0) (2019-06-14)

### Features

-   **api-core:** add codes resource ([4ea7ba4](https://github.com/Availity/sdk-js/commit/4ea7ba4))

## [5.1.6](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.5...@availity/api-core@5.1.6) (2019-05-31)

### Bug Fixes

-   **api-core:** graceful exit when polling ([9708eff](https://github.com/Availity/sdk-js/commit/9708eff))

## [5.1.5](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.4...@availity/api-core@5.1.5) (2019-04-29)

**Note:** Version bump only for package @availity/api-core

## [5.1.4](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.3...@availity/api-core@5.1.4) (2019-04-26)

**Note:** Version bump only for package @availity/api-core

## [5.1.3](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.2...@availity/api-core@5.1.3) (2019-04-25)

**Note:** Version bump only for package @availity/api-core

## [5.1.2](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.1...@availity/api-core@5.1.2) (2019-04-25)

**Note:** Version bump only for package @availity/api-core

## [5.1.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.1.0...@availity/api-core@5.1.1) (2019-04-23)

### Bug Fixes

-   **api-core:** relative location header ([2ac4c5f](https://github.com/Availity/sdk-js/commit/2ac4c5f)), closes [#77](https://github.com/Availity/sdk-js/issues/77)
-   **api-core:** resolve relative url from request url ([8e6abbb](https://github.com/Availity/sdk-js/commit/8e6abbb)), closes [#77](https://github.com/Availity/sdk-js/issues/77)

# [5.1.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.0.1...@availity/api-core@5.1.0) (2019-04-17)

### Features

-   **analytics-core:** added dma logging service ([68aee41](https://github.com/Availity/sdk-js/commit/68aee41))

## [5.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@5.0.0...@availity/api-core@5.0.1) (2019-04-17)

**Note:** Version bump only for package @availity/api-core

# [5.0.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@4.0.1...@availity/api-core@5.0.0) (2019-03-18)

### Bug Fixes

-   **dl-core:** fixed dev dep ([15d572a](https://github.com/Availity/sdk-js/commit/15d572a))
-   add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96))
-   fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f4))

### Features

-   **api-core:** add ability to send in variables in AvSlotMachine.query ([f83e00b](https://github.com/Availity/sdk-js/commit/f83e00b))

### BREAKING CHANGES

-   upgrades other packages that are using old package-locks

# [4.1.0](https://github.com/Availity/sdk-js/compare/@availity/api-core@4.0.1...@availity/api-core@4.1.0) (2019-03-04)

### Bug Fixes

-   **dl-core:** fixed dev dep ([15d572a](https://github.com/Availity/sdk-js/commit/15d572a))
-   add lerna ignore for package-locks ([3217d96](https://github.com/Availity/sdk-js/commit/3217d96))
-   fixed package-lock issues boiling down to this repo ([8c896f4](https://github.com/Availity/sdk-js/commit/8c896f4))

### Features

-   **api-core:** add ability to send in variables in AvSlotMachine.query ([f83e00b](https://github.com/Availity/sdk-js/commit/f83e00b))

### BREAKING CHANGES

-   upgrades other packages that are using old package-locks

## [4.0.1](https://github.com/Availity/sdk-js/compare/@availity/api-core@4.0.0...@availity/api-core@4.0.1) (2019-02-12)

**Note:** Version bump only for package @availity/api-core

# 4.0.0 (2019-02-12)

### Bug Fixes

-   **api-core:** Allow array for permissions ([#67](https://github.com/Availity/sdk-js/issues/67)) ([98adf76](https://github.com/Availity/sdk-js/commit/98adf76))
-   **api-core:** http should throw errors ([#83](https://github.com/Availity/sdk-js/issues/83)) ([868aa8f](https://github.com/Availity/sdk-js/commit/868aa8f))
-   **api-core:** rename error object ([460fc9d](https://github.com/Availity/sdk-js/commit/460fc9d))
-   **api-core:** return error from async/await ([06c35fe](https://github.com/Availity/sdk-js/commit/06c35fe))
-   **api-core:** reverted changelog/canary changes ([0f775ea](https://github.com/Availity/sdk-js/commit/0f775ea))
-   **api-core:** typo fix ([f543296](https://github.com/Availity/sdk-js/commit/f543296))

### Features

-   **api-core:** add example response for file delivery ([edc4df5](https://github.com/Availity/sdk-js/commit/edc4df5))
-   **api-core:** add file upload delivery batch api ([eff0a3c](https://github.com/Availity/sdk-js/commit/eff0a3c))
-   **api-core:** added graphql resource for slotmachine ([356a686](https://github.com/Availity/sdk-js/commit/356a686))
-   **api-core:** added new resource for disclaimers ([b7de72e](https://github.com/Availity/sdk-js/commit/b7de72e))

### BREAKING CHANGES

-   **api-core:** The httpp error is no longer caught by api-core. Also, the error object is no longer manipulated. Developers must handle the http error by catching the error when using async/await or by leveraging the error callback in the promise chain. The callback `afterResponse` is not called when and error is thrown from http call.
-   **api-core:** The query to the API has been changed. To get the previous behavior, supply a custom paramSerializer.

# 2.6.0 (2018-08-23)

### Features

-   **api-core:** helper function for settings api ([4d405a7](https://github.com/Availity/sdk-js/commit/4d405a7))
-   **api-core:** helper function for settings api ([#64](https://github.com/Availity/sdk-js/issues/64)) ([f247235](https://github.com/Availity/sdk-js/commit/f247235))

# 2.5.0 (2018-08-20)

## 2.4.8 (2018-08-06)

### Bug Fixes

-   **api-core:** spread args for aliases ([5c7516b](https://github.com/Availity/sdk-js/commit/5c7516b))

## 2.4.7 (2018-08-02)

### Bug Fixes

-   **api-core:** check for lowercase location as well ([4a4a9a0](https://github.com/Availity/sdk-js/commit/4a4a9a0))

## 2.4.6 (2018-08-02)

### Bug Fixes

-   **analytics-core:** fix non-click events ([fce9b26](https://github.com/Availity/sdk-js/commit/fce9b26))

# 2.4.0 (2018-07-12)

# 2.2.0 (2018-06-29)

### Bug Fixes

-   **api-core:** format postGet payload to standard ([5b885cf](https://github.com/Availity/sdk-js/commit/5b885cf))

## 2.1.2 (2018-06-13)

### Bug Fixes

-   **api-core:** attempts count not increasing ([2e414a3](https://github.com/Availity/sdk-js/commit/2e414a3))

## 2.1.1 (2018-05-25)

### Bug Fixes

-   **api-core:** fix usage of Promise ([8fb3de8](https://github.com/Availity/sdk-js/commit/8fb3de8))

# 2.1.0 (2018-05-24)

### Features

-   **api-core:** add all method to get all the data from all of the pages ([114519d](https://github.com/Availity/sdk-js/commit/114519d))

## 2.0.3 (2018-05-10)

### Bug Fixes

-   **api-core:** allow id to be in the config ([55b55af](https://github.com/Availity/sdk-js/commit/55b55af))

## 2.0.1 (2018-05-04)

### Bug Fixes

-   **api-core:** get id out of arguments ([3e525c2](https://github.com/Availity/sdk-js/commit/3e525c2))

# 2.0.0 (2018-05-04)

### Bug Fixes

-   **api-core:** avSpaces - throw error when no spaceId given ([7c47280](https://github.com/Availity/sdk-js/commit/7c47280))

# 1.4.0 (2018-04-17)

# 1.2.0 (2018-04-12)

### Features

-   **api-core:** refactor polling for extending MS ([04c1474](https://github.com/Availity/sdk-js/commit/04c1474))

## 1.1.1 (2018-03-28)

## 1.0.1 (2018-03-26)

### Bug Fixes

-   **api-core:** avFiles error handling ([3dd5392](https://github.com/Availity/sdk-js/commit/3dd5392))

# 1.0.0-alpha.17 (2018-01-18)

# 1.0.0-alpha.16 (2018-01-17)

# 1.0.0-alpha.15 (2018-01-12)

# 1.0.0-alpha.14 (2018-01-11)

# 1.0.0-alpha.13 (2018-01-10)

### Features

-   **api-core:** add helper function adds name attribute to providers collection ([3b24341](https://github.com/Availity/sdk-js/commit/3b24341))

# 1.0.0-alpha.12 (2018-01-09)

# 1.0.0-alpha.11 (2018-01-06)

### Bug Fixes

-   **api-core:** resources incorrectly handling config ([9a5de1c](https://github.com/Availity/sdk-js/commit/9a5de1c))

### Code Refactoring

-   **api-core:** pass config object to core classes ([d7b859c](https://github.com/Availity/sdk-js/commit/d7b859c))

### BREAKING CHANGES

-   **api-core:** Options to core classes are being passed in as config object instead of parameters.

# 1.0.0-alpha.10 (2018-01-04)

### Bug Fixes

-   **api-core:** remove/delete should not assume data payloads ([e45a9f6](https://github.com/Availity/sdk-js/commit/e45a9f6))

### BREAKING CHANGES

-   **api-core:** previously remove/delete would assume that data was being passed in the body of the request if the first param of the message signature was NOT a string or number. Now, the method assumes a config object is passed in instead of data. This allows the developers to pass in params or data as they see fit.

# 1.0.0-alpha.9 (2018-01-03)

### Bug Fixes

-   **api-core:** provides api param not properly merged with defaults ([5f53e3d](https://github.com/Availity/sdk-js/commit/5f53e3d))

# 1.0.0-alpha.8 (2018-01-03)

# 1.0.0-alpha.7 (2018-01-03)

### Bug Fixes

-   **api-core:** use get instead of query for space name ([84dd26a](https://github.com/Availity/sdk-js/commit/84dd26a))

# 1.0.0-alpha.6 (2017-12-20)

# 1.0.0-alpha.5 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for notifcations api ([acafc97](https://github.com/Availity/sdk-js/commit/acafc97))

# 1.0.0-alpha.4 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for pdf api ([9f4af1c](https://github.com/Availity/sdk-js/commit/9f4af1c))

# 1.0.0-alpha.3 (2017-12-19)

### Bug Fixes

-   **api-core:** user.me() should return user object ([715c616](https://github.com/Availity/sdk-js/commit/715c616))

# 1.0.0-alpha.2 (2017-12-19)

# 1.0.0-alpha.1 (2017-12-19)

### Bug Fixes

-   **api-core:** remove default after\* response transformations ([6f17d3a](https://github.com/Availity/sdk-js/commit/6f17d3a))

### BREAKING CHANGES

-   **api-core:** The core API classes no longer apply after\* transformations on the response. Previously, only the collection data was being returned when making API calls which made it difficult to react to the metadata around the response (e.g. pagination). Developers will have to unwrap the response manually.

Example response callback:

```
onResponse(response) {
  response && response.data && response.data.user|| {};
}
```

# 1.0.0-alpha.0 (2017-12-05)

### Features

-   **api-core:** add post and delete as synonyms for create and update ([0150680](https://github.com/Availity/sdk-js/commit/0150680))
-   **api-core:** add spaces helper methods ([72de394](https://github.com/Availity/sdk-js/commit/72de394))
-   **api-core, api-angular api-react:** add pdf api ([b84a16f](https://github.com/Availity/sdk-js/commit/b84a16f))


      <a name="3.0.0"></a>

# 3.0.0 (2018-11-20)

### Bug Fixes

-   **api-core:** Allow array for permissions ([#67](https://github.com/Availity/sdk-js/issues/67)) ([98adf76](https://github.com/Availity/sdk-js/commit/98adf76))
-   **api-core:** typo fix ([f543296](https://github.com/Availity/sdk-js/commit/f543296))

### Features

-   **api-core:** add example response for file delivery ([edc4df5](https://github.com/Availity/sdk-js/commit/edc4df5))
-   **api-core:** add file upload delivery batch api ([eff0a3c](https://github.com/Availity/sdk-js/commit/eff0a3c))

### BREAKING CHANGES

-   **api-core:** The query to the API has been changed. To get the previous behavior, supply a custom paramSerializer.

<a name="2.6.0"></a>

# 2.6.0 (2018-08-23)

### Features

-   **api-core:** helper function for settings api ([4d405a7](https://github.com/Availity/sdk-js/commit/4d405a7))
-   **api-core:** helper function for settings api ([#64](https://github.com/Availity/sdk-js/issues/64)) ([f247235](https://github.com/Availity/sdk-js/commit/f247235))

<a name="2.5.0"></a>

# 2.5.0 (2018-08-20)

<a name="2.4.8"></a>

## 2.4.8 (2018-08-06)

### Bug Fixes

-   **api-core:** spread args for aliases ([5c7516b](https://github.com/Availity/sdk-js/commit/5c7516b))

<a name="2.4.7"></a>

## 2.4.7 (2018-08-02)

### Bug Fixes

-   **api-core:** check for lowercase location as well ([4a4a9a0](https://github.com/Availity/sdk-js/commit/4a4a9a0))

<a name="2.4.6"></a>

## 2.4.6 (2018-08-02)

### Bug Fixes

-   **analytics-core:** fix non-click events ([fce9b26](https://github.com/Availity/sdk-js/commit/fce9b26))

<a name="2.4.0"></a>

# 2.4.0 (2018-07-12)

<a name="2.3.3"></a>

## 2.3.3 (2018-07-12)

<a name="2.2.0"></a>

# 2.2.0 (2018-06-29)

### Bug Fixes

-   **api-core:** format postGet payload to standard ([5b885cf](https://github.com/Availity/sdk-js/commit/5b885cf))

<a name="2.1.2"></a>

## 2.1.2 (2018-06-13)

### Bug Fixes

-   **api-core:** attempts count not increasing ([2e414a3](https://github.com/Availity/sdk-js/commit/2e414a3))

<a name="2.1.1"></a>

## 2.1.1 (2018-05-25)

### Bug Fixes

-   **api-core:** fix usage of Promise ([8fb3de8](https://github.com/Availity/sdk-js/commit/8fb3de8))

<a name="2.1.0"></a>

# 2.1.0 (2018-05-24)

### Features

-   **api-core:** add all method to get all the data from all of the pages ([114519d](https://github.com/Availity/sdk-js/commit/114519d))

<a name="2.0.3"></a>

## 2.0.3 (2018-05-10)

### Bug Fixes

-   **api-core:** allow id to be in the config ([55b55af](https://github.com/Availity/sdk-js/commit/55b55af))

<a name="2.0.1"></a>

## 2.0.1 (2018-05-04)

### Bug Fixes

-   **api-core:** get id out of arguments ([3e525c2](https://github.com/Availity/sdk-js/commit/3e525c2))

<a name="2.0.0"></a>

# 2.0.0 (2018-05-04)

### Bug Fixes

-   **api-core:** avSpaces - throw error when no spaceId given ([7c47280](https://github.com/Availity/sdk-js/commit/7c47280))

<a name="1.4.0"></a>

# 1.4.0 (2018-04-17)

<a name="1.2.0"></a>

# 1.2.0 (2018-04-12)

### Features

-   **api-core:** refactor polling for extending MS ([04c1474](https://github.com/Availity/sdk-js/commit/04c1474))

<a name="1.1.1"></a>

## 1.1.1 (2018-03-28)

<a name="1.0.1"></a>

## 1.0.1 (2018-03-26)

### Bug Fixes

-   **api-core:** avFiles error handling ([3dd5392](https://github.com/Availity/sdk-js/commit/3dd5392))

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

### Features

-   **api-core:** add helper function adds name attribute to providers collection ([3b24341](https://github.com/Availity/sdk-js/commit/3b24341))

<a name="1.0.0-alpha.12"></a>

# 1.0.0-alpha.12 (2018-01-09)

<a name="1.0.0-alpha.11"></a>

# 1.0.0-alpha.11 (2018-01-06)

### Bug Fixes

-   **api-core:** resources incorrectly handling config ([9a5de1c](https://github.com/Availity/sdk-js/commit/9a5de1c))

### Code Refactoring

-   **api-core:** pass config object to core classes ([d7b859c](https://github.com/Availity/sdk-js/commit/d7b859c))

### BREAKING CHANGES

-   **api-core:** Options to core classes are being passed in as config object instead of parameters.

<a name="1.0.0-alpha.10"></a>

# 1.0.0-alpha.10 (2018-01-04)

### Bug Fixes

-   **api-core:** remove/delete should not assume data payloads ([e45a9f6](https://github.com/Availity/sdk-js/commit/e45a9f6))

### BREAKING CHANGES

-   **api-core:** previously remove/delete would assume that data was being passed in the body of the request if the first param of the message signature was NOT a string or number. Now, the method assumes a config object is passed in instead of data. This allows the developers to pass in params or data as they see fit.

<a name="1.0.0-alpha.9"></a>

# 1.0.0-alpha.9 (2018-01-03)

### Bug Fixes

-   **api-core:** provides api param not properly merged with defaults ([5f53e3d](https://github.com/Availity/sdk-js/commit/5f53e3d))

<a name="1.0.0-alpha.8"></a>

# 1.0.0-alpha.8 (2018-01-03)

<a name="1.0.0-alpha.7"></a>

# 1.0.0-alpha.7 (2018-01-03)

### Bug Fixes

-   **api-core:** use get instead of query for space name ([84dd26a](https://github.com/Availity/sdk-js/commit/84dd26a))

<a name="1.0.0-alpha.6"></a>

# 1.0.0-alpha.6 (2017-12-20)

<a name="1.0.0-alpha.5"></a>

# 1.0.0-alpha.5 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for notifcations api ([acafc97](https://github.com/Availity/sdk-js/commit/acafc97))

<a name="1.0.0-alpha.4"></a>

# 1.0.0-alpha.4 (2017-12-20)

### Bug Fixes

-   **api-core:** wrong url for pdf api ([9f4af1c](https://github.com/Availity/sdk-js/commit/9f4af1c))

<a name="1.0.0-alpha.3"></a>

# 1.0.0-alpha.3 (2017-12-19)

### Bug Fixes

-   **api-core:** user.me() should return user object ([715c616](https://github.com/Availity/sdk-js/commit/715c616))

<a name="1.0.0-alpha.2"></a>

# 1.0.0-alpha.2 (2017-12-19)

<a name="1.0.0-alpha.1"></a>

# 1.0.0-alpha.1 (2017-12-19)

### Bug Fixes

-   **api-core:** remove default after\* response transformations ([6f17d3a](https://github.com/Availity/sdk-js/commit/6f17d3a))

### BREAKING CHANGES

-   **api-core:** The core API classes no longer apply after\* transformations on the response. Previously, only the collection data was being returned when making API calls which made it difficult to react to the metadata around the response (e.g. pagination). Developers will have to unwrap the response manually.

Example response callback:

```
onResponse(response) {
response && response.data && response.data.user|| {};
}
```

<a name="1.0.0-alpha.0"></a>

# 1.0.0-alpha.0 (2017-12-05)

### Features

-   **api-core:** add post and delete as synonyms for create and update ([0150680](https://github.com/Availity/sdk-js/commit/0150680))
-   **api-core:** add spaces helper methods ([72de394](https://github.com/Availity/sdk-js/commit/72de394))
-   **api-core, api-angular api-react:** add pdf api ([b84a16f](https://github.com/Availity/sdk-js/commit/b84a16f))
