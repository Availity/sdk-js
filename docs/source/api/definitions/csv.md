---
title: CSV
summary: Endpoint converts JSON into a CSV for download.
---

## POST /api/utils/v1/csvs

### Headers

-   **X-Availity-Customer-ID** _(required)_ - Organization customer id is used by the system to identify the owner of the CSV document.

### Parameters

-   **applicationId** _(required)_ — Application name that created the CSV request. Examples: `credentialing-app`, `awesome-healthcare-app`
-   **rows** _(required)_ - This is the content of the CSV. Max of 5000 rows.
-   **columns** _(optional)_ - You can specify column names to appear on the first line of the CSV. We allow a max of 500 columns by default.
-   **fileName** _(optional)_ - If `fileName` is not assigned then the default CSV job id is used instead.

### Notes

-   Every row must have the same number of entries.
-   If you sent the columns property, every row must have the same number of entries as the columns.
-   We allow a max of 500 columns and 5000 rows.
-   Images can included using base64 encoded data URLs in image tags. Ex: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAb2Z0d2Fy..." />`
-   Make sure to use HTML entities in your templates. For example, if you want to render an apostrophe `'` then use entity `&apos;` instead. Please see [https://www.w3.org/wiki/Common_HTML_entities_used_for_typography](https://www.w3.org/wiki/Common_HTML_entities_used_for_typography) for references to other HTML entities.

### Response Codes

-   **200** - CSV created and can be downloaded
-   **202** - CSV is processing and is not ready for download
-   **400** - Client sent a bad request. This usually means the request was missing required fields or was malformed.
-   **500** - Internal server error. Let Availity know to help determine what went wrong.

### Example Request

```bash
$ curl -i -H "Content-Type: application/json" -H "X-Availity-Customer-ID: 1194" -X POST -d '{
  "applicationId" : "example",
  "columns": ["Name","Age"],
  "rows": [["James","31"],["Mary","25"]]
}' https://apps.availity.com/api/utils/v1/csvs
```

### Example Response

```bash
HTTP/1.1 202 Accepted
Content-Type: application/json
x-api-id: fec4cd7c-e940-47e5-912e-e78a8d09980b
X-Session-ID: fec4cd7c-e940-47e5-912e-e78a8d09980b
Cache-Control: private,no-store,max-age=0,must-revalidate
Location: https://apps.availity.com/api/utils/v1/csvs/-6746445849906334271
X-Status-Message: We are processing your request.
Date: Tue, 18 Aug 2015 15:28:22 GMT
Content-Length: 355
Server: Jetty(7.4.5.v20110725)
{
  "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/utils/v1/csvs/-6746445849906334271"
    }
  },
  "id" : "-6746445849906334271",
  "createdDate" : "2015-08-18T15:28:22.000+0000",
  "updatedDate" : "2015-08-18T15:28:25.000+0000",
  "expirationDate" : "2015-08-19T15:28:23.000+0000",
  "status" : "In Progress",
  "statusCode" : "0",
  "applicationId" : "example"
}
```

_Notice the Location header? GET that._

```bash
$ curl -i -H "X-Availity-Customer-ID: 1194" -X GET https://apps.availity.com/api/utils/v1/csvs/-6746445849906334271
```

```bash
HTTP/1.1 200 OK
Content-Type: application/json
x-api-id: fec4cd7c-e940-47e5-912e-e78a8d09980b
X-Session-ID: fec4cd7c-e940-47e5-912e-e78a8d09980b
Cache-Control: private,no-store,max-age=0,must-revalidate
Location: https://apps.availity.com/api/utils/v1/csvs/-6746445849906334271
X-Status-Message: Here is your CSV.
Date: Tue, 18 Aug 2015 15:28:22 GMT
Content-Length: 355
Server: Jetty(7.4.5.v20110725)
{
  "links" : {
    "csv": {
            "href": "https://apps.availity.com/api/utils/v1/csvs/-6746445849906334271.csv"
    },
    "self" : {
      "href" : "https://apps.availity.com/api/utils/v1/csvs/-6746445849906334271"
    }
  },
  "id" : "-6746445849906334271",
  "createdDate" : "2015-08-18T15:28:22.000+0000",
  "updatedDate" : "2015-08-18T15:28:25.000+0000",
  "expirationDate" : "2015-08-19T15:28:23.000+0000",
  "status": "Complete",
  "statusCode": "4",
  "applicationId" : "example"
}
```

_Notice the csv link? GET that. Its your CSV._

You can use `window.open()` with the csv link returned in the `200` to trigger the browser to download it for the user.
