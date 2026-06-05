# @availity/api-core

> Base API definitions for the Availity REST API.

[![Version](https://img.shields.io/npm/v/@availity/api-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-core)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/api-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-core)

## Install

### NPM

```bash
npm install @availity/api-core
```

### Yarn

```bash
yarn add @availity/api-core
```

## Usage

This package provides the base `AvApi` and `AvMicroservice` classes used by `@availity/api-axios` and other packages. It is HTTP-client agnostic — you supply the `http` function.

```js
import AvApi from '@availity/api-core';

const api = new AvApi({ http: myHttpClient, name: 'users' });
const response = await api.get('123');
```

Most consumers should use [`@availity/api-axios`](../api-axios/README.md), which wraps this package with axios as the HTTP client.

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/api/getting-started)
