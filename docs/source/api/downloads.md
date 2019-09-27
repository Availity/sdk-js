---
title: Downloads
summary: Utility to download files from services
---

[![Version](https://img.shields.io/npm/v/@availity/dl-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-core)

## Install

`npm install @availity/dl-core`

## Usage

```javascript
const downloadApi = new AvDownloadApi({
    clientId: '1234',
});

dowloadApi.getAttachment().then(response => {
    const { data } = response;
    downloadApi.downloadAttachment(data, 'filename.csv');
});
```

## Methods

Todo

### `getAttachment`

### `downloadAttachment`
