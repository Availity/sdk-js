# @availity/upload-core

> Wrapper for tus-js-client providing resumable file uploads

[![Version](https://img.shields.io/npm/v/@availity/upload-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/upload-core)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/upload-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/upload-core)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/upload-core?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/upload-core/package.json)

## Install

### NPM

```bash
npm install @availity/upload-core
```

### Yarn

```bash
yarn add @availity/upload-core
```

## Usage

```js
import Upload from '@availity/upload-core';

const upload = new Upload(file, {
  bucketId: 'my-bucket',
  customerId: 'customer-123',
  clientId: 'my-client-id',
});

// Add event handlers
upload.onProgress.push(() => {
  console.log(`Progress: ${upload.percentage}%`);
});

upload.onSuccess.push(() => {
  console.log('Upload complete', upload.references);
});

upload.onError.push((error) => {
  console.error('Upload failed', error);
});

// Generate a unique ID and start
await upload.generateId();
upload.start();
```

### Options

| Option | Type | Description |
| --- | --- | --- |
| `bucketId` | string | **Required.** Target bucket for the upload |
| `customerId` | string | **Required.** Customer ID |
| `clientId` | string | **Required.** Client ID for auth headers |
| `maxSize` | number | Maximum file size in bytes |
| `fileTypes` | string[] | Allowed file extensions (e.g., `['.pdf', '.png']`) |
| `allowedFileNameCharacters` | string | Regex character class for valid filenames |

### Methods

- `start()` — Begin the upload
- `abort()` — Cancel the upload
- `generateId()` — Generate a unique fingerprint ID
- `sendPassword(password)` — Submit a decryption password for encrypted files

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/api/uploads)
