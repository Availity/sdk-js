---
title: Uploads
---

Wrapper for tus-js-client

[![Version](https://img.shields.io/npm/v/@availity/upload-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/upload-core)

`@availity/upload-core` is a powerful wrapper for the `tus-js-client` library, providing a high-level API for managing file uploads using the tus protocol. This package simplifies the process of initiating, monitoring, and handling file uploads in JavaScript applications. Key features include:

- Easy-to-use Upload class for managing file uploads
- Progress tracking and real-time status updates
- Robust error handling and retry mechanisms
- File validation (size, type, name)
- Support for encrypted file uploads
- Customizable upload options and callbacks

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

### Basic Usage

```js
import Upload from '@availity/upload-core';

const file = new File(['file content'], 'example.pdf', {
  type: 'application/pdf',
});

const upload = new Upload(file, {
  bucketId: 'YOUR_BUCKET_ID',
  customerId: 'YOUR_CUSTOMER_ID',
  clientId: 'YOUR_CLIENT_ID',
});

// Add event listeners
upload.onProgress.push(() => {
  console.log(`Upload progress: ${upload.percentage}%`);
});

upload.onSuccess.push(() => {
  console.log('Upload completed successfully!');
  console.log('File references:', upload.references);
  console.log('S3 references:', upload.s3References);
});

upload.onError.push((error) => {
  console.error('Upload failed:', error.message);
});

// Generate unique ID and start upload
await upload.generateId();
upload.start();
```

#### Required params

| Parameter  | Type   | Description                         |
| ---------- | ------ | ----------------------------------- |
| bucketId   | string | The target bucket                   |
| customerId | string | The customer id of the organization |
| clientId   | string | The client id for api calls         |

#### Optional params

| Parameter                 | Type    | Default | Description                                    |
| ------------------------- | ------- | ------- | ---------------------------------------------- |
| fileTypes                 | string  |         | Allowed file extensions (e.g., '.pdf', '.png') |
| maxSize                   | number  |         | Maximum file size in bytes                     |
| metadata                  | object  | {}      | Additional metadata for the upload             |
| allowedFileNameCharacters | string  |         | Regex pattern for allowed filename characters  |
| pollingTime               | number  | 5000    | Interval for virus scan polling (ms)           |
| maxAvScanRetries          | number  | 10      | Maximum retries for virus scan check           |
| stripFileNamePathSegments | boolean | true    | Remove path segments from filename             |

#### Upload event handlers

**Each one of these should be an array of functions**

- **onPreStart**: each function should return a boolean. If false, upload-core will not make xhr request.
- **onProgress**: occurs during initial and at various points of the Xhr call to backend.
- **onSuccess**: each function is called once if there is a success.
- **onError**: each function is called once if there is an error.

### Advanced Usage Examples

#### File Type Restrictions

```js
const upload = new Upload(file, {
  bucketId: 'bucket123',
  customerId: 'customer123',
  clientId: 'client123',
  fileTypes: ['.pdf', '.doc', '.docx'],
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedFileNameCharacters: '_a-zA-Z0-9 ', // alphanumeric, spaces, underscore
});
```

#### Custom Metadata

```js
const upload = new Upload(file, {
  bucketId: 'bucket123',
  customerId: 'customer123',
  clientId: 'client123',
  metadata: {
    'document-type': 'medical-record',
    'patient-id': '12345',
    department: 'cardiology',
  },
});
```

#### Handling Encrypted Files

```js
const upload = new Upload(file, {
  bucketId: 'bucket123',
  customerId: 'customer123',
  clientId: 'client123',
});

upload.onError.push((error) => {
  if (upload.status === 'encrypted') {
    // Prompt user for password
    const password = promptUserForPassword();
    upload.sendPassword(password);
  } else {
    console.error('Upload failed:', error.message);
  }
});
```

#### Progress Tracking

```js
const upload = new Upload(file, {
  bucketId: 'bucket123',
  customerId: 'customer123',
  clientId: 'client123',
});

upload.onProgress.push(() => {
  const uploadedSize = upload.bytesSent;
  const totalSize = upload.bytesTotal;
  const scannedBytes = upload.bytesScanned;
  const percentage = upload.percentage;

  console.log(`Uploaded: ${uploadedSize}/${totalSize} bytes`);
  console.log(`Scanned: ${scannedBytes} bytes`);
  console.log(`Overall progress: ${percentage}%`);
});
```

#### Pre-start Validation

```js
const upload = new Upload(file, {
  bucketId: 'bucket123',
  customerId: 'customer123',
  clientId: 'client123',
});

// Add custom validation before upload starts
upload.onPreStart.push((upload) => {
  if (upload.file.size === 0) {
    console.error('Cannot upload empty file');
    return false;
  }
  return true;
});
```

### Upload Status Values

The `upload.status` can be one of the following:

- `pending`: Initial state
- `accepted`: Upload completed successfully
- `rejected`: Upload failed
- `encrypted`: File is encrypted and requires a password
- `decrypting`: File is being decrypted

### Error Handling

```js
const upload = new Upload(file, {
  bucketId: 'bucket123',
  customerId: 'customer123',
  clientId: 'client123',
});

upload.onError.push((error) => {
  console.error('Status:', upload.status);
  console.error('Error Message:', upload.errorMessage);
  console.error('Error Details:', error);
});
```

### Aborting an Upload

```js
const upload = new Upload(file, {
  bucketId: 'bucket123',
  customerId: 'customer123',
  clientId: 'client123',
});

// Later in your code
upload.abort();
```
