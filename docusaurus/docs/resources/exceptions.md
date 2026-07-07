---
title: Error Logging
---

A package that catches errors in your application and logs formatted stack traces to the Availity log API.

[![Version](https://img.shields.io/npm/v/@availity/exceptions-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-axios)

## When to Use This

Use `@availity/exceptions-axios` (or the base `@availity/exceptions-core`) when you need:

- Automatic error visibility. Unhandled errors in production are silently swallowed by the browser. This package catches them and sends structured error reports to the Availity log API so your team sees them.
- Consistent error formatting. Each logged error includes a stack trace, browser info, page URL, hit counts, and your app ID, giving you the context needed to reproduce issues.
- Duplicate suppression. If the same error fires repeatedly (e.g., in a render loop), only the first occurrence is logged immediately. Subsequent duplicates within a configurable window are batched and summarized, preventing log flooding.

Most applications should use `@availity/exceptions-axios`. It is a pre-configured instance that logs errors through `avLogMessagesApi`. Use `@availity/exceptions-core` only if you need to provide a custom logging transport.

## Installation

```bash
npm install @availity/exceptions-axios
```

## Usage

```js
import avExceptions from '@availity/exceptions-axios';

// Set your app ID for tracking (shown in log messages)
avExceptions.appId('my-app-id');

// That's it — unhandled errors are captured automatically via window 'error' listener.

// Optionally submit caught errors for better stack traces:
try {
  riskyOperation();
} catch (error) {
  avExceptions.submitError(error);
}
```

No additional configuration is needed. The package exports a ready-to-use singleton.

## How It Works

1. On instantiation, registers a `window.addEventListener('error', ...)` listener
2. When an error occurs, generates a formatted stack trace using [stacktrace-js](https://github.com/nickersoft/stacktrace.js)
3. Builds a structured log message with metadata (see [Log Message Format](#log-message-format))
4. Deduplicates repeated errors within the configured time window
5. Sends the message to the Availity log API (via `avLogMessagesApi`)

### Log Message Format

Each logged error contains:

| Field | Description |
| --- | --- |
| `errorDate` | ISO timestamp of when the error occurred |
| `errorName` | The error's `name` property (e.g., `TypeError`) |
| `errorMessage` | The error's `message` property |
| `errorStack` | Formatted stack trace (source-mapped when possible) |
| `appId` | Your application ID (set via `.appId()`) or `'N/A'` |
| `appVersion` | Value of `window.APP_VERSION` or `'N/A'` |
| `totalHits` | Total times this error message has occurred since page load |
| `currentHits` | Times this error occurred since the last log |
| `userAgent` | Browser user agent string |
| `userLanguage` | Browser language setting |
| `referrer` | `document.referrer` |
| `host` | Current domain |
| `url` | Full page URL at time of error |

### Blacklisted Errors

Some errors are silently ignored and never logged:

- `'ResizeObserver loop limit exceeded'` — A benign browser error that has no user impact

## @availity/exceptions-core

The base class for custom logging transports. Use this if you need to send errors somewhere other than the Availity log API.

### Installation

```bash
npm install @availity/exceptions-core stacktrace-js
```

> `stacktrace-js` is a required peer dependency.

### Usage

```js
import AvExceptions from '@availity/exceptions-core';

// Provide your own logging function
const exceptions = new AvExceptions((message) => {
  // message is the structured log object described above
  return fetch('/my-logging-endpoint', {
    method: 'POST',
    body: JSON.stringify(message),
  });
});

// Configure
exceptions.appId('my-app-id');
exceptions.enabled(true);
exceptions.repeatTime(5000); // ms between duplicate error logs

// Manually submit errors for better stack traces
exceptions.submitError(new Error('Something went wrong'));
```

### Methods

#### `submitError(error)`

Accepts an `Error` object, generates a stack trace, and passes it to your log function.

```js
try {
  JSON.parse(badInput);
} catch (error) {
  exceptions.submitError(error);
}
```

#### `enabled(value?)`

Get or set the enabled state. When disabled, no errors are logged.

```js
exceptions.enabled(false); // disable logging
exceptions.enabled(); // => false
```

#### `appId(id?)`

Get or set the application ID included in every log message.

```js
exceptions.appId('my-app-id');
exceptions.appId(); // => 'my-app-id'
```

#### `repeatTime(ms?)`

Get or set the deduplication window (in milliseconds). Errors with the same message within this window are batched. Default: `5000` (5 seconds).

```js
exceptions.repeatTime(10000); // 10 seconds
```

#### `destroy()`

Removes the `window` error listener, clears all deduplication timers, and disables the instance. Call this when your app unmounts to prevent memory leaks in SPAs.

```js
// In a React useEffect cleanup or componentWillUnmount
exceptions.destroy();
```

## Integration with React

For React applications, combine with an [Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) to capture rendering errors:

```jsx
import avExceptions from '@availity/exceptions-axios';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    avExceptions.submitError(error);
  }

  render() {
    return this.props.children;
  }
}
```

Wrap your app (or key subtrees) in `<ErrorBoundary>` to ensure rendering errors are logged with full stack traces rather than relying on the generic `window` error handler.
