# @availity/dl-axios

> Utility to download files from services

[![Version](https://img.shields.io/npm/v/@availity/dl-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-axios)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/dl-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dl-axios)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/dl-axios?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/dl-axios/package.json)

## Install

### NPM

```bash
npm install @availity/dl-axios
```

### Yarn

```bash
yarn add @availity/dl-axios
```

## Usage

```js
import AvDownloadApi from '@availity/dl-axios';

const dl = new AvDownloadApi({ clientId: 'my-client-id' });

// Fetch an attachment
const response = await dl.getAttachment({ id: 'attachment-id' });

// Download the attachment to the user's browser
dl.downloadAttachment(response.data, 'report.pdf', 'application/pdf');
```

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/api/downloads)
