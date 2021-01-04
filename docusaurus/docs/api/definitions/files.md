---
title: Files
---

Files can be uploaded to configured buckets on servers.

## POST /ms/api/availity/internal/core/vault/upload/v1/:bucketId

Upload a file to the specified bucketId

### Headers

-   **X-Availity-Customer-ID** _(required)_ - Organization customer id is used by the system to identify the owner of the PDF document.

### Parameters

> The client must send the following `reference` or `filedata` identifying the file.

-   **reference** _(optional)_ — The reference location of a file already uploaded.
-   **filedata** _(optional)_ — The file to be uploaded.

### Example Request

```bash
$ curl -i -X POST -H 'Content-Type: multipart/form-data' -H 'X-Availity-Customer-Id: 1194' -F reference='bucket://vaultfs/105094/296778f1-4cf8-4d9e-be7e-72772227a958' 'https://apps.availity.com/ms/api/availity/internal/core/vault/upload/v1/myBucketId'
```

### Example Response

```javascript
[
    {
        files: [
            {
                filename: 'myfile.png',
                attachmentName: 'filedata',
                url: '/files/105094/296778f1-4cf8-4d9e-be7e-72772227a958',
                mimeType: 'image/png',
                size: 12157,
                bucketId: 'myBucketId',
                expiration: '2018-12-15T12:43:53.671+0000',
                reference:
                    'bucket://vaultfs/105094/296778f1-4cf8-4d9e-be7e-72772227a958',
            },
        ],
    },
];
```
