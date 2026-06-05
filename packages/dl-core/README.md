# @availity/dl-core

> Utility to download files from services

[![Version](https://img.shields.io/npm/v/@availity/dl-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-core)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/dl-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-core)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/dl-core?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/dl-core/package.json)

## Install

### NPM

```bash
npm install @availity/dl-core
```

### Yarn

```bash
yarn add @availity/dl-core
```

## Usage

`DownloadMicroservice` is the base class used by `@availity/dl-axios`. It extends `AvMicroservice` and provides methods for downloading file attachments.

```js
import DownloadMicroservice from '@availity/dl-core';

// Typically used through @availity/dl-axios rather than directly
// See @availity/dl-axios for the recommended approach
```

### Methods

#### `getAttachment(config)`

Fetches an attachment using the configured microservice endpoint.

#### `downloadAttachment(data, filename, mime)`

Triggers a file download in the browser using the provided data blob, filename, and MIME type.

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/api/downloads)
