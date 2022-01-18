# Availity JavaScript SDK

> JavaScript SDK for designed for the Availity Portal

[![Build](https://img.shields.io/github/workflow/status/availity/sdk-js/Publish%20Release?style=for-the-badge)](https://github.com/Availity/sdk-js/actions/workflows/deploy.yml)
[![Coverage](https://img.shields.io/codecov/c/github/Availity/sdk-js?style=for-the-badge)](https://codecov.io/gh/Availity/sdk-js)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=MIT)](http://opensource.org/licenses/MIT)

## Documentation

Docs for each of the packages deployed in [sdk-js](https://github.com/Availity/sdk-js) can be found at [https://availity.github.io/](https://availity.github.io/sdk-js/)

## Supported Browsers

Packages in this repository are designed to work with the following browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

### Internet Explorer Support

Active support for Internet Explorer was dropped in August 2021. Some packages use `core-js` and `babel` to polyfill unsupported features, but this will be phased out over time.

If you still need support for IE 11, you need to either:

- Use [`@availity/workflow >=8.5.0 && <9.0.0`](https://github.com/Availity/availity-workflow/blob/master/packages/workflow/CHANGELOG.md#850-2021-04-07). This will transpile _all_ your code and add polyfills needed for IE 11 support.
- If you are not using `@availity/workflow`, or cannot upgrade to at least `8.5.0`, then you will need to import the package's compiled code from its `/lib` folder.

## Contributing

Check out our [contributing guide](.github/CONTRIBUTING.md) for more information on how to contribute.

## License

[MIT](./LICENSE)
