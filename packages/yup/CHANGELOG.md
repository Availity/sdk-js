# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [5.1.5](https://github.com/Availity/sdk-js/compare/@availity/yup@5.1.4...@availity/yup@5.1.5) (2024-02-26)



## [5.1.4](https://github.com/Availity/sdk-js/compare/@availity/yup@5.1.3...@availity/yup@5.1.4) (2024-02-19)



## [5.1.3](https://github.com/Availity/sdk-js/compare/@availity/yup@5.1.2...@availity/yup@5.1.3) (2023-08-23)



# 1.0.0 (2023-08-23)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))
* **yup:** avDate fix for edge case invalid date length ([55f8b78](https://github.com/Availity/sdk-js/commit/55f8b781595a1f5aa610d63da53c4ffe3c7710e4))
* **yup:** avDate fix handles undefined correctly now ([85d25b7](https://github.com/Availity/sdk-js/commit/85d25b751b340273de8396abc310e5a27934376c))
* **yup:** avDate.typeError should not display for empty fields ([8bf47fb](https://github.com/Availity/sdk-js/commit/8bf47fb3a64f5b956b8ce0d4b27dbac46e08c864))
* **yup:** conditional logic fix ([3679957](https://github.com/Availity/sdk-js/commit/36799574f86674e1a41228c10bfba8d303958e02))
* **yup:** fix issue with exports not being found if yup and @availity/yup not imported in right order ([fa24f1d](https://github.com/Availity/sdk-js/commit/fa24f1d6f43bcf1371ca7b0613cacc2f3a0d3b01))
* **yup:** fixed bug in daterange causing to validate improperly ([5e90f3e](https://github.com/Availity/sdk-js/commit/5e90f3e8cd25c8aaebfbbf4b03868c3f1e77ecbe))
* **yup:** fixes duplicate name key preventing some validation tests for running, changes wording of validation messages ([ef144eb](https://github.com/Availity/sdk-js/commit/ef144eb972f821dc2c180ee74e7f9b5a0ae019bc))
* **yup:** fixes start date before end date logic ([6cc0ff7](https://github.com/Availity/sdk-js/commit/6cc0ff736358bc5aaf738a84d8abb258e85f57f4))
* **yup:** fixes type resolution bug where internal yup.date was no longer being overridden ([01ba375](https://github.com/Availity/sdk-js/commit/01ba3752455b98ebd701d5cfddeb4ab79af3c1a3))
* **yup:** fixes unhandled error for when value === undefined in avDate().between() validation ([d779f59](https://github.com/Availity/sdk-js/commit/d779f591cadeba3184faec13034e7b12a66d697a))
* **yup:** package change for major version update ([9ad040f](https://github.com/Availity/sdk-js/commit/9ad040ff7a4f7cbe7d5fdd37932d953287db805c)), closes [/github.com/jquense/yup/blob/375f1b9ed41f5043e123ea87a01a2dfe333c3927/CHANGELOG.md#0320-2020-12-03](https://github.com//github.com/jquense/yup/blob/375f1b9ed41f5043e123ea87a01a2dfe333c3927/CHANGELOG.md/issues/0320-2020-12-03)
* **yup:** refactor typeError, use _typeCheck ([24cea5e](https://github.com/Availity/sdk-js/commit/24cea5e2140d72ecec169dfde9fd94eb18956e66))


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### Features

* add npi method ([b1ac1a2](https://github.com/Availity/sdk-js/commit/b1ac1a258b32a74d7cce409304660a08089ddc46))
* **yup:** add phone validation schema ([98c3e29](https://github.com/Availity/sdk-js/commit/98c3e2968efe5f852872fda72839bda28dc7e38c))
* **yup:** add type definitions for phone schema ([319ca88](https://github.com/Availity/sdk-js/commit/319ca884a9fdd400c3983f751199263487dda8f6))
* **yup:** added yup validation library methods ([690f0c7](https://github.com/Availity/sdk-js/commit/690f0c7940748025a0d2c935fd4b8cbf81b29c28))
* **yup:** allow custom type error message for dateRange ([cc36cde](https://github.com/Availity/sdk-js/commit/cc36cde7d403f9787343fcecbf1d0fd9d8ac6bf7))
* **yup:** convert to ts and fix undefined class property ([f5a3a4f](https://github.com/Availity/sdk-js/commit/f5a3a4f944a0ae281e0eaabf3b6a38659a2acc71))
* **yup:** support inclusivity option ([94b1283](https://github.com/Availity/sdk-js/commit/94b1283c29e00f0db49ea58ae62d1cf16beef678))
* **yup:** switch to lodash from merge-options-es5 ([06456c9](https://github.com/Availity/sdk-js/commit/06456c90ac6ef7523c4ed0d2e4dc9af8c4a6dee5))
* **yup:** unit test for inclusivity ([25bf64b](https://github.com/Availity/sdk-js/commit/25bf64bd1fbd9b03ff609d8b8614ce40b7a4f4be))
* **yup:** update how accepted formats are handled for dates ([91006e5](https://github.com/Availity/sdk-js/commit/91006e564766e2bb66cdabc24dd2cdd69bc8b150))


### BREAKING CHANGES

* Drop Internet Explorer support
* **yup:** the version of yup this package requires contains breaking changes from 0.32.0 onward
* **yup:** avDate and dateRange should now be imported directly from @availity/yup, eliminating the need for a 'magic' import from moment.js that depends on import order
* **yup:** Fixes TypeError: Cannot set property date of #<Object> by renaming 'date' and 'DateSchema' to 'avDa
te' and 'AvDateSchema'.



## [5.1.2](https://github.com/Availity/sdk-js/compare/@availity/yup@5.1.1...@availity/yup@5.1.2) (2022-06-15)



## [5.1.1](https://github.com/Availity/sdk-js/compare/@availity/yup@5.1.0...@availity/yup@5.1.1) (2022-05-24)



# [5.1.0](https://github.com/Availity/sdk-js/compare/@availity/yup@5.0.1...@availity/yup@5.1.0) (2022-05-20)


### Features

* **yup:** update how accepted formats are handled for dates ([91006e5](https://github.com/Availity/sdk-js/commit/91006e564766e2bb66cdabc24dd2cdd69bc8b150))



## [5.0.1](https://github.com/Availity/sdk-js/compare/@availity/yup@5.0.0...@availity/yup@5.0.1) (2022-04-28)


### Bug Fixes

* add browser field for output ([0ce7170](https://github.com/Availity/sdk-js/commit/0ce717075a82675b8707e4db0cc07cd4af370f3d))



# [5.0.0](https://github.com/Availity/sdk-js/compare/@availity/yup@4.2.0...@availity/yup@5.0.0) (2022-04-28)


* build!: switch from lerna to nx and compile to esm with tsup ([c586085](https://github.com/Availity/sdk-js/commit/c5860856ca96b743a0653d335ea00f0889132f7f))


### BREAKING CHANGES

* Drop Internet Explorer support



# 4.2.0 (2021-12-21)


### Bug Fixes

* **yup:** conditional logic fix ([3679957](https://github.com/Availity/sdk-js/commit/36799574f86674e1a41228c10bfba8d303958e02))


### Features

* **yup:** convert to ts and fix undefined class property ([f5a3a4f](https://github.com/Availity/sdk-js/commit/f5a3a4f944a0ae281e0eaabf3b6a38659a2acc71))





# 4.1.0 (2021-11-18)


### Features

* **yup:** allow custom type error message for dateRange ([cc36cde](https://github.com/Availity/sdk-js/commit/cc36cde7d403f9787343fcecbf1d0fd9d8ac6bf7))





# 4.0.0 (2021-11-02)


### Bug Fixes

* **yup:** package change for major version update ([9ad040f](https://github.com/Availity/sdk-js/commit/9ad040ff7a4f7cbe7d5fdd37932d953287db805c)), closes [/github.com/jquense/yup/blob/375f1b9ed41f5043e123ea87a01a2dfe333c3927/CHANGELOG.md#0320-2020-12-03](https://github.com//github.com/jquense/yup/blob/375f1b9ed41f5043e123ea87a01a2dfe333c3927/CHANGELOG.md/issues/0320-2020-12-03)


### BREAKING CHANGES

* **yup:** the version of yup this package requires contains breaking changes from 0.32.0 onward





## [3.2.1](https://github.com/Availity/sdk-js/compare/@availity/yup@3.2.0...@availity/yup@3.2.1) (2021-10-29)


### Bug Fixes

* **yup:** fixes start date before end date logic ([6cc0ff7](https://github.com/Availity/sdk-js/commit/6cc0ff736358bc5aaf738a84d8abb258e85f57f4))





# 3.2.0 (2021-10-22)


### Features

* **yup:** switch to lodash from merge-options-es5 ([06456c9](https://github.com/Availity/sdk-js/commit/06456c90ac6ef7523c4ed0d2e4dc9af8c4a6dee5))





## [3.1.1](https://github.com/Availity/sdk-js/compare/@availity/yup@3.1.0...@availity/yup@3.1.1) (2021-06-16)


### Bug Fixes

* **yup:** refactor typeError, use _typeCheck ([24cea5e](https://github.com/Availity/sdk-js/commit/24cea5e2140d72ecec169dfde9fd94eb18956e66))





# [3.1.0](https://github.com/Availity/sdk-js/compare/@availity/yup@3.0.11...@availity/yup@3.1.0) (2021-06-11)


### Features

* **yup:** support inclusivity option ([94b1283](https://github.com/Availity/sdk-js/commit/94b1283c29e00f0db49ea58ae62d1cf16beef678))
* **yup:** unit test for inclusivity ([25bf64b](https://github.com/Availity/sdk-js/commit/25bf64bd1fbd9b03ff609d8b8614ce40b7a4f4be))





## 3.0.11 (2021-05-25)

**Note:** Version bump only for package @availity/yup





## [3.0.10](https://github.com/Availity/sdk-js/compare/@availity/yup@3.0.9...@availity/yup@3.0.10) (2021-05-17)

**Note:** Version bump only for package @availity/yup





## 3.0.9 (2021-05-14)


### Bug Fixes

* **yup:** avDate.typeError should not display for empty fields ([8bf47fb](https://github.com/Availity/sdk-js/commit/8bf47fb3a64f5b956b8ce0d4b27dbac46e08c864))





## 3.0.8 (2020-10-06)


### Bug Fixes

* **yup:** avDate fix for edge case invalid date length ([55f8b78](https://github.com/Availity/sdk-js/commit/55f8b781595a1f5aa610d63da53c4ffe3c7710e4))
* **yup:** avDate fix handles undefined correctly now ([85d25b7](https://github.com/Availity/sdk-js/commit/85d25b751b340273de8396abc310e5a27934376c))





## 3.0.7 (2020-06-22)

**Note:** Version bump only for package @availity/yup





## 3.0.6 (2020-05-01)

**Note:** Version bump only for package @availity/yup





## 3.0.5 (2020-04-30)

**Note:** Version bump only for package @availity/yup





## 3.0.4 (2020-04-22)

**Note:** Version bump only for package @availity/yup





## 3.0.3 (2020-04-08)

**Note:** Version bump only for package @availity/yup





## 3.0.2 (2020-04-06)

**Note:** Version bump only for package @availity/yup





## 3.0.1 (2020-04-06)

**Note:** Version bump only for package @availity/yup





# [3.0.0](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.10...@availity/yup@3.0.0) (2020-04-06)


### Bug Fixes

* **yup:** fix issue with exports not being found if yup and @availity/yup not imported in right order ([fa24f1d](https://github.com/Availity/sdk-js/commit/fa24f1d6f43bcf1371ca7b0613cacc2f3a0d3b01))


### BREAKING CHANGES

* **yup:** avDate and dateRange should now be imported directly from @availity/yup, eliminating the need for a 'magic' import from moment.js that depends on import order





## [2.0.10](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.9...@availity/yup@2.0.10) (2020-03-17)


### Bug Fixes

* **yup:** fixes duplicate name key preventing some validation tests for running, changes wording of validation messages ([ef144eb](https://github.com/Availity/sdk-js/commit/ef144eb972f821dc2c180ee74e7f9b5a0ae019bc))
* **yup:** fixes unhandled error for when value === undefined in avDate().between() validation ([d779f59](https://github.com/Availity/sdk-js/commit/d779f591cadeba3184faec13034e7b12a66d697a))





## [2.0.9](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.8...@availity/yup@2.0.9) (2020-02-28)

**Note:** Version bump only for package @availity/yup





## [2.0.8](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.5...@availity/yup@2.0.8) (2020-02-13)

**Note:** Version bump only for package @availity/yup





## [2.0.7](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.6...@availity/yup@2.0.7) (2020-02-13)

**Note:** Version bump only for package @availity/yup





## [2.0.6](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.4...@availity/yup@2.0.6) (2020-02-13)

**Note:** Version bump only for package @availity/yup





## [2.0.5](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.3...@availity/yup@2.0.5) (2020-02-13)

**Note:** Version bump only for package @availity/yup





## [2.0.4](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.3...@availity/yup@2.0.4) (2020-02-13)

**Note:** Version bump only for package @availity/yup





## [2.0.3](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.0...@availity/yup@2.0.3) (2020-02-13)

**Note:** Version bump only for package @availity/yup





## [2.0.2](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.1...@availity/yup@2.0.2) (2020-02-13)

**Note:** Version bump only for package @availity/yup





## [2.0.1](https://github.com/Availity/sdk-js/compare/@availity/yup@2.0.0...@availity/yup@2.0.1) (2020-02-13)

**Note:** Version bump only for package @availity/yup





# [2.0.0](https://github.com/Availity/sdk-js/compare/@availity/yup@1.3.4...@availity/yup@2.0.0) (2020-02-12)


### Bug Fixes

* **yup:** fixes type resolution bug where internal yup.date was no longer being overridden ([01ba375](https://github.com/Availity/sdk-js/commit/01ba3752455b98ebd701d5cfddeb4ab79af3c1a3))


### BREAKING CHANGES

* **yup:** Fixes TypeError: Cannot set property date of #<Object> by renaming 'date' and 'DateSchema' to 'avDa
te' and 'AvDateSchema'.





## [1.3.4](https://github.com/Availity/sdk-js/compare/@availity/yup@1.3.3...@availity/yup@1.3.4) (2020-01-23)

**Note:** Version bump only for package @availity/yup





## [1.3.3](https://github.com/Availity/sdk-js/compare/@availity/yup@1.3.2...@availity/yup@1.3.3) (2020-01-03)

**Note:** Version bump only for package @availity/yup

## [1.3.2](https://github.com/Availity/sdk-js/compare/@availity/yup@1.3.1...@availity/yup@1.3.2) (2020-01-03)

**Note:** Version bump only for package @availity/yup

## [1.3.1](https://github.com/Availity/sdk-js/compare/@availity/yup@1.3.0...@availity/yup@1.3.1) (2019-11-08)

**Note:** Version bump only for package @availity/yup

# [1.3.0](https://github.com/Availity/sdk-js/compare/@availity/yup@1.2.0...@availity/yup@1.3.0) (2019-09-13)

### Features

-   **yup:** add type definitions for phone schema ([319ca88](https://github.com/Availity/sdk-js/commit/319ca88))

# [1.2.0](https://github.com/Availity/sdk-js/compare/@availity/yup@1.1.1...@availity/yup@1.2.0) (2019-09-13)

### Features

-   **yup:** add phone validation schema ([98c3e29](https://github.com/Availity/sdk-js/commit/98c3e29))

## [1.1.1](https://github.com/Availity/sdk-js/compare/@availity/yup@1.1.0...@availity/yup@1.1.1) (2019-08-19)

### Bug Fixes

-   **yup:** fixed bug in daterange causing to validate improperly ([5e90f3e](https://github.com/Availity/sdk-js/commit/5e90f3e))

# 1.1.0 (2019-08-12)

### Features

-   **yup:** added yup validation library methods ([690f0c7](https://github.com/Availity/sdk-js/commit/690f0c7))
-   add npi method ([b1ac1a2](https://github.com/Availity/sdk-js/commit/b1ac1a2))
