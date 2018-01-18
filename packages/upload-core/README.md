# upload-core
> Wrapper for tus-js-client

## Install

```
npm install @availity/upload-core tus-js-client --save
```

## Usage

```js
import Upload from '@availity/upload-core';

const upload = new Upload(file, {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
});
upload.start();
```
