# @availity/relay-id

> Small package containing helpers for encoding/decoding IDs according to the Relay specification

[![Version](https://img.shields.io/npm/v/@availity/relay-id.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/relay-id)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/relay-id.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/relay-id)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/relay-id?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/relay-id/package.json)

## Install

### NPM

```bash
npm install @availity/relay-id
```

### Yarn

```bash
yarn add @availity/relay-id
```

## Usage

```js
import { toGlobalId, fromGlobalId, base64, unbase64 } from '@availity/relay-id';

// Encode a type and ID into a global relay ID
const globalId = toGlobalId('User', '123');
// => 'VXNlcjoxMjM='

// Decode a global relay ID back to type and ID
const { type, id } = fromGlobalId(globalId);
// => { type: 'User', id: '123' }

// Low-level base64 helpers
const encoded = base64('hello');
const decoded = unbase64(encoded);
```

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/relay-id)
