# upload-core
> Wrapper for tus-js-client

## Install

```
npm install @availity/upload-core tus-js-client --save
```

## Usage

### Required params

- bucketId
- customerId
- clientId

### Optional params

- fileTypes: string array of file extensions to allow (error thrown if file.name does not contain one of the types)

```js
import Upload from '@availity/upload-core';

const upload = new Upload(file, {
    bucketId: 'a',
    customerId: 'b',
    clientId: 'c',
    fileTypes: ['.png', '.pdf']
});
upload.start();
```

