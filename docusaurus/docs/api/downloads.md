---
title: Downloads
---

Utility to download files from services

[![Version](https://img.shields.io/npm/v/@availity/dl-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-core)

## Install

### NPM

```bash
npm install @availity/dl-axios axios
```

### Yarn

```bash
yarn add @availity/dl-axios axios
```

## Usage

```js
import AvDownloadApi from '@availity/dl-axios';

const downloadApi = new AvDownloadApi({
  clientId: '1234',
});

const download = async () => {
  const response = await downloadApi.getAttachment({
    params: { id: 'attachment-id' },
  });
  downloadApi.downloadAttachment(response.data, 'filename.csv', 'text/csv');
};
```

**Note:** `clientId` is required. It is sent as the `X-Client-ID` header on all requests.

## Methods

This class has the following methods to use.

### `getAttachment(config)`

Fetches the attachment from the server. The response type is automatically set to `'blob'`. Pass query parameters or headers via the `config` object.

### `downloadAttachment(data, filename, mime)`

Triggers a file download in the browser.

- **data** - Blob data from `getAttachment` response
- **filename** - The filename for the downloaded file
- **mime** - _(optional)_ MIME type of the file (e.g., `'text/csv'`, `'application/pdf'`)
