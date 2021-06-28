# sdk-js

> Javascript SDK for Availity

## [Documentation](https://availity.github.io/sdk-js/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=MIT)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/dev/Availity/sdk-js.svg?style=for-the-badge)](https://david-dm.org/Availity/sdk-js)
[![Build](https://img.shields.io/circleci/build/github/Availity/sdk-js?style=for-the-badge)](https://circleci.com/gh/Availity/sdk-js)

## Supported Browsers

-   Mozilla Firefox
-   Google Chrome
-   Microsoft Edge
-   Internet Explorer 11 and newer (Internet Explorer will no longer be supported starting August 21st, 2021)
    -   **NOTE:** The latest versions of packages in this repository no longer support IE 11 by default. If you still need support for IE 11, you need to either:
        -   Use [`@availity/workflow` at version `8.5.0`](https://github.com/Availity/availity-workflow/blob/master/packages/workflow/CHANGELOG.md#850-2021-04-07) or greater. This will transpile _all_ your code and add polyfills needed for IE 11 support.
        -   If you are not using `@availity/workflow`, or cannot upgrade to at least `8.5.0`, then you will need to import the package's compiled code from its `/lib` folder.

## License

[MIT](./LICENSE)

## [Contributing](.github/CONTRIBUTING.md)
