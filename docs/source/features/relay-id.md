---
title: relay-id
summary: Small package containing helpers for encoding/decoding ids according to the relay specification
---

[![Version](https://img.shields.io/npm/v/@availity/relay-id.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/relay-id)

## Install

### NPM

```bash
$ npm install @availity/relay-id
```

### Yarn

```bash
$ yarn add @availity/relay-id
```

## Usage

```js
import { fromGlobalId, toGlobalId } from '@availity/relay-id';

// Will return {type: 'User', id: '789'}
const { type, id } = fromGlobalId('VXNlcjo3ODk=');

// Will return global id of VXNlcjo3ODk=
const globalId = toGlobalId('User', '789');
```
