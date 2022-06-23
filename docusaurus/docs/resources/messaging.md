---
title: Messaging
---

A package wrapping the postMessage function with helper functions and security checks.

[![Version](https://img.shields.io/npm/v/@availity/message-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/message-core)

## Installation

### NPM

```bash
npm install @availity/message-core
```

### Yarn

```bash
yarn add @availity/message-core
```

## Usage

```js
import avMessage from '@availity/message-core';
```

## Methods

### `subscribe(eventName, callback)`

When a message event is received and verified, the callback function will be called with the event data. It returns a function that can be used to unsubscribe from that event.

Parameters:

- `eventName: string` — Name of the event you'd like to subscribe to. This is the event name given when using the `send` method of AvMessage. If `avMessage.send()` is call with only a string as the first argument, then that string will be the name of the event that is sent. Otherwise, if called with an object, the event name will be the `event` property of that object.
- `callback: (event) => void` —
- `options?: { ignoreSameWindow?: boolean }` — When `options` is omitted, or when `options.ignoreSameWindow` is omitted or set to `true` (true by default), the callback will not be called for events dispatched from the same `window`. If you wish to response to events emitted from the same `window`, you must pass `{ ignoreSameWindow: false }`.

Example:

```js
import avMessage from '@availity/message-core';

const unsubscribe = avMessage.subscribe(event, callback, {
  ignoreSameWindow: false,
});
```

### `unsubscribe(eventName)`

Remove all listeners for given event.

### `unsubscribeAll()`

Remove all listeners for all events.

### `enabled(value)`

If a value is passed in, sets messaging's enabled flag true/false based on value.

Returns boolean enabled flag value.

### `domain()`

Returns a string of the current domain.

## `send(payload, target)`

Send the payload to the target if AvMessage is enabled. `target` defaults to the parent window. If you wish to send an event with no data (just a name) you can pass the name as a string to the `payload` parameter, otherwise, pass an object with an `event` property containing the event name.

Example:

```js
import avMessage from '@availity/message-core';

avMessage.send('my-cool-event');

// or
avMessage.send({ event: 'my-cool-event', isCool: true });
```
