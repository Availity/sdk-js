---
title: Downloads
---

Utility to download files from services

[![Version](https://img.shields.io/npm/v/@availity/dl-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-core)

## Install

### NPM

```bash
npm install @availity/dl-axios @availity/dl-core axios
```

### Yarn

```bash
yarn add @availity/dl-axios @availity/dl-core axios
```

## Usage

```js
const downloadApi = new AvDownloadApi({
  clientId: '1234',
});

dowloadApi.getAttachment().then((response) => {
  const { data } = response;
  downloadApi.downloadAttachment(data, 'filename.csv');
});
```

## Methods

This class has the following methods to use.

### `getAttachment(config)`

### `downloadAttachment(data, filename, mime)`
