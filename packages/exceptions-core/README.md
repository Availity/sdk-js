# @availity/exceptions-core

> A package to catch errors in apps and log a formatted stack trace.

[![Version](https://img.shields.io/npm/v/@availity/exceptions-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-core)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/exceptions-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-core)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/exceptions-core?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/exceptions-core/package.json)

## Install

### NPM

```bash
npm install @availity/exceptions-core stacktrace-js
```

### Yarn

```bash
yarn add @availity/exceptions-core stacktrace-js
```

> `stacktrace-js` is a required peer dependency.

## Usage

This is the base class used by `@availity/exceptions-axios`. Most consumers should use that package instead.

```js
import AvExceptions from '@availity/exceptions-core';

// Create instance with a logging function
const exceptions = new AvExceptions((message) => {
  // Send the error message to your logging endpoint
  return myLogApi.post(message);
});

// Configure
exceptions.enabled(true);
exceptions.appId('my-app');
exceptions.repeatTime(5000); // ms between duplicate error logs

// Manually submit an error
exceptions.submitError(new Error('Something went wrong'));
```

The class automatically listens for uncaught `window` errors and logs them using the provided log function.

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/exceptions)
