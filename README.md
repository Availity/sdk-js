# sdk-js

> Javascript SDK for Availity

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=MIT)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/dev/Availity/sdk-js.svg?style=for-the-badge)](https://david-dm.org/Availity/sdk-js)
[![Build](https://img.shields.io/travis/Availity/sdk-js.svg?style=for-the-badge&label=build)](https://travis-ci.org/Availity/sdk-js)

## Supported Browsers

-   Internet Explorer 11 and newer
-   Google Chrome
-   Mozilla Firefox

## Documentation

-   [analytics-angular](packages/analytics-core/README.md) - Analytics core logic and auto-tracking.
-   [api-core](packages/api-core/README.md) - Base API definitions used by [api-axios](packages/api-axios/README.md) and [api-angular](api-angular/README.md) for the Availity REST API.
-   [api-axios](packages/api-axios/README.md) - A package wrapping [@av/api-core](../api-core/README.md) with [axios](https://github.com/axios/axios) and native ES6 Promise.
-   [api-angular](packages/api-angular/README.md) - A package wrapping [@av/api-core](../api-core/README.md) with Angular `$http`.
-   [localalstorage-core](packages/localstorage-core/README.md) - Wraps localStorage with utility functions.
-   [message-core](packages/message-core/README.md) - Wraps postMessage function with helper functions and security checks.
-   [upload-core](packages/upload-core/README.md) - > Wrapper for tus-js-client
-   [dl-core](packages/dl-core/README.md) - > Wrapper for js-file-download

## Contributing

`skd-js` is a monorepo managed using [lerna](https://github.com/lerna/lerna) in independent mode (each packages is versioned and published individually).

-   Run `npm install`
-   Commits should use the [Angular Commit Format](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type). Scope should one of un-prefixed name of the packages under `./packages/`. If a commit applies to multiple packages, leave out the scope.
-   Release and publish using  `npm run release`. The version is determined by analyzing the commit messages.

> Preview how lerna will version the packages by running:

```shell
npx lerna version --no-git-tag-version --no-push
```

> Determine why lerna choose a semver version for the packages by running:

```shell
npx lerna version --no-git-tag-version --no-push --loglevel silly
```

## License

[MIT](./LICENSE)
