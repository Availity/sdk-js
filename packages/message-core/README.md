# @availity/message-core

> A package wrapping the postMessage function with helper functions and security checks.

[![Version](https://img.shields.io/npm/v/@availity/message-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/message-core)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/message-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/message-core)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/message-core?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/message-core/package.json)

## Install

### NPM

```bash
npm install @availity/message-core
```

### Yarn

```bash
yarn add @availity/message-core
```

## Usage

The default export is a pre-configured `AvMessage` instance for cross-frame communication within the Availity portal.

```js
import avMessage from '@availity/message-core';

// Send a message to the parent window
avMessage.send({ event: 'my-event', data: { key: 'value' } });

// Subscribe to messages
const unsubscribe = avMessage.subscribe('my-event', (data) => {
  console.log('Received:', data);
});

// Unsubscribe when done
unsubscribe();

// Or unsubscribe by event name
avMessage.unsubscribe('my-event');

// Remove all subscribers
avMessage.unsubscribeAll();

// Enable or disable message handling
avMessage.enabled(false);
```

Messages are validated against trusted Availity domains for security.

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/messaging)
