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

### `subscribe(event, callback)`

When a message event is received and verified, the callback function will be called with the event data. It returns a function that can be used to unsubscribe from that event.

```js
import avMessage from '@availity/message-core';

const unsubscribe = avMessage.subscribe(event, callback);
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

Send the payload to the target if AvMessage is enabled.
target defaults to the parent window. Payload will be converted to a string.
