# sdk-js

> Javascript SDK for Availity

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&label=license)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/dev/Availity/sdk-js.svg?style=flat-square)](https://david-dm.org/Availity/sdk-js)
[![Build](https://img.shields.io/travis/Availity/sdk-js.svg?style=flat-square&label=build)](https://travis-ci.org/Availity/sdk-js)

## Supported Browsers

*   Internet Explorer 11 and newer
*   Google Chrome
*   Mozilla Firefox

## Documentation

*   [api-core](packages/api-core/README.md) - Base API definitions used by [api-axios](packages/api-axios/README.md) and [api-angular](api-angular/README.md) for the Availity REST API.
    *   [AvUser](packages/api-core/src/resources/README.md#avuser)
    *   [AvRegions](packages/api-core/src/resources/README.md#avregions)
    *   [AvPermissions](packages/api-core/src/resources/README.md#avpermissions)
    *   [AvUserPermissions](packages/api-core/src/resources/README.md#avuserpermissions)
    *   [AvNavigation](packages/api-core/src/resources/README.md#avnavigation)
    *   [AvSpaces](packages/api-core/src/resources/README.md#avspaces)
    *   [AvOrganizations](packages/api-core/src/resources/README.md#avorganizations)
    *   [AvProviders](packages/api-core/src/resources/README.md#avproviders)
    *   [AvLogMessage](packages/api-core/src/resources/README.md#avlogmessage)
    *   [AvProxy](packages/api-core/src/resources/README.md#avproxy)
*   [api-axios](packages/api-axios/README.md) - A package wrapping [@av/api-core](../api-core/README.md) with [axios](https://github.com/axios/axios) and native ES6 Promise.
*   [api-angular](packages/api-angular/README.md) - A package wrapping [@av/api-core](../api-core/README.md) with Angular `$http`.
*   [localalstorage-core](packages/localstorage-core/README.md) - Wraps localStorage with utility functions.
*   [message-core](packages/message-core/README.md) - Wraps postMessage function with helper functions and security checks.
*   [upload-core](packages/message-core/README.md) - > Wrapper for tus-js-client

## Contribute

*   Run `npm install`
*   Commits should use the [Angular Commit Format](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type). Scope should one of packages under `./packages/`. If a commit applys to multiple packages, leave out the scope.
*   Release versions with Semantic version and `npm run release`. The version is determined by analyzing the commit messaging. To use a custom version, run `npm run release <VERSION>`.

## License

[MIT](./LICENSE)
