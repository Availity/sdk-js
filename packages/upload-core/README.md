# upload-core
> Wrapper for tus-js-client

## Install

```
npm install @availity/upload-core tus-js-client
```

## Usage

```js
import Upload from '@availity/upload-core';

const upload = Upload(files, {
    bucket: 'mybucket',
    clientId: 'a',
    customerId: 'b',
    onError(upload, err) {
      console.log(err); 
    },
    onProgress(upload, bytesUploaded, bytesTotal) {
      const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
      console.log('%s complete for %s', percentage, upload.file.name);
    },
    onSuccess(upload) {
      console.log('download %s from %s', upload.file.name, upload.url);
    },
})
```
