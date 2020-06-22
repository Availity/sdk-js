# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
