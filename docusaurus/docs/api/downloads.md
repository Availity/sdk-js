---
title: Downloads
---

A utility for downloading files from Availity services and saving them to the user's browser.

[![Version](https://img.shields.io/npm/v/@availity/dl-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-axios)

## When to Use This

Use `@availity/dl-axios` when your application needs to download files (PDFs, CSVs, images, documents) from an Availity API and present them to the user as a browser file download. Common scenarios include downloading report exports, claim attachments, or generated PDFs.

## Installation

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

const downloadReport = async () => {
  // Fetch the file as a Blob from the API
  const response = await downloadApi.getAttachment({
    params: { id: 'attachment-id' },
  });

  // Trigger the browser's download dialog
  downloadApi.downloadAttachment(response.data, 'report.pdf', 'application/pdf');
};
```

**Note:** `clientId` is required. It is sent as the `X-Client-ID` header on all requests.

## Methods

### `getAttachment(config)`

Fetches binary file data from the server. The response type is automatically set to `'blob'`. Pass query parameters or headers via the `config` object.

```js
const response = await downloadApi.getAttachment({
  params: { id: 'attachment-id' },
  headers: { 'X-Custom-Header': 'value' },
});
```

### `downloadAttachment(data, filename, mime)`

Triggers a file download in the user's browser using the Blob data from `getAttachment`.

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | `Blob` | The binary data from the `getAttachment` response |
| `filename` | `string` | The filename shown in the browser's download dialog |
| `mime` | `string` | _(optional)_ MIME type of the file (e.g., `'text/csv'`, `'application/pdf'`) |

### Example: CSV Export

```js
import AvDownloadApi from '@availity/dl-axios';

const downloadApi = new AvDownloadApi({ clientId: '1234' });

async function exportToCsv(reportId) {
  const response = await downloadApi.getAttachment({
    params: { id: reportId },
  });
  downloadApi.downloadAttachment(response.data, 'export.csv', 'text/csv');
}
```
