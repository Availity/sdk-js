---
title: Error Logging
---

A package that catches errors in apps and logs a formatted stack trace.

[![Version](https://img.shields.io/npm/v/@availity/exceptions-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-core)

It can grab some information from global error events, or more data if using the `AvExceptions.submitError` function.

## Installation

### NPM

```bash
npm install @availity/exceptions-core
```

### Yarn

```bash
yarn add @availity/exceptions-core
```

## Configure

`AvExceptions` requires a logging function to call. And its recommended to have code in place to call `AvExceptions.submitError(error)` for better stack traces.

```js
import AvExceptions from '@availity/exceptions-core';

function exampleLogging(logMessage) {
  // send to api
}

const ExampleExceptions = new AvExceptions(exampleLogging);
```

### Log function

The log function will receive a message object with these keys:

- errorDate - a formatted date string
- errorName - the name from the error object.
- errorMessage - the message from the error object.
- errorStack - a formatted stack trace string
- appId - the defined appId or 'N/A'
- totalHits: how many times this error message has occurred since page load
- currentHits: how many times this error message has occurred since last log
- userAgent - browsers userAgent
- userLanguage - language value from browser
- referrer - document referrer
- host - current domain
- url
- appVersion

## Methods

### `submitError`

accepts an error object and submits it to be formatted and logged.

### `enabled`

if a value is passed in, sets class's enabled flag true/false based on value.

returns boolean enabled flag value.

if class is not enabled, it will not call the log function.

### `appId`

if a string or number value is passed in, sets appId value.

returns appId.

if no appId is defined, 'N/A' will be in the message object

### `repeatTime`

repeat time is the time `AvExceptions` will wait after an error is called before it will log another error with the same message.

if a number is passed in, this sets repeat time value. The default is 5 seconds.

returns repeatTime value.

## Behavior Notes

- On construction, `AvExceptions` automatically registers a global `window.addEventListener('error', ...)` listener to catch unhandled errors.
- Errors matching the built-in blacklist (e.g., `'ResizeObserver loop limit exceeded'`) are silently ignored.
- Repeated errors with the same message are deduplicated within the `repeatTime` window.

---

## @availity/exceptions-axios

A pre-configured instance of `AvExceptions` that uses `avLogMessagesApi` for logging. This is the recommended package for most applications.

[![Version](https://img.shields.io/npm/v/@availity/exceptions-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-axios)

### Installation

```bash
npm install @availity/exceptions-axios
```

### Usage

```js
import avExceptions from '@availity/exceptions-axios';

// Logging is active immediately — unhandled errors are captured automatically.

// Optionally set an app ID for tracking
avExceptions.appId('my-app-id');

// Manually submit an error
try {
  riskyOperation();
} catch (error) {
  avExceptions.submitError(error);
}
```

No configuration is needed — the package exports a singleton that is ready to use immediately after import.
