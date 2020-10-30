---
title: Uploads
---

Wrapper for tus-js-client

[![Version](https://img.shields.io/npm/v/@availity/upload-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/upload-core)

## Install

### NPM

```bash
$ npm install @availity/upload-core tus-js-client
```

### Yarn

```bash
$ yarn add @availity/upload-core tus-js-client
```

## Usage

### Required params

-   bucketId
-   customerId
-   clientId

### Optional params

-   fileTypes: string array of file extensions to allow (error thrown if file.name does not contain one of the types)
-   maxSize: maximum size allowed per file
-   metadata: object mapping metadata keys and values to add to the TUS upload
-   allowedFileNameCharacters: restrict the file name characters to a regex set
-   pollingTime: custom av scan polling time (default 5000ms)

```js
import Upload from '@availity/upload-core';

const upload = new Upload(file, {
    bucketId: 'a',
    customerId: 'b',
    clientId: 'c',
    fileTypes: ['.png', '.pdf'],
    maxSize: 3e8,
    metadata: { key: 'value' },
    allowedFileNameCharacters: '_a-zA-Z0-9 ', // alphanumeric, spaces, underscore
    pollingTime: 1000,
});
upload.start();
```
