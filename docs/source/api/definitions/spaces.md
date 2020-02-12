---
title: Spaces
summary: A Space contains various configuation based information used to display entities such as payer spaces, applications, proxies, resources, etc. The Spaces enpoint allows clients to retrieve these spaces objects.
---

## GET /api/sdk/platform/v1/spaces

Find space information by parameters.

### Parameters

-   **id** _(required)_ — List of organization ids to check for providers.
-   **parentId** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **childId** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **ownerId** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **authorized** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **region** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **type** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **category** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **output** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **includeInactive** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **q** _(optional)_ - A list of search terms to filter by.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.

### Example Request

```
GET https://apps.availity.com/api/sdk/platform/v1/spaces?parentId=73162546201448291151598200008825&authorized=true&type=linkout
```

### Example Response

```javascript
{
  "totalCount" : 3,
  "count" : 3,
  "offset" : 0,
  "limit" : 50,
  "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/spaces?parentId=73162546201448291151598200008825&authorized=true&type=linkout"
    }
  },
  "spaces" : [ {
    "id" : "73162546201448292407979200009326",
    "name" : "Provider Home",
    "shortName" : "APH",
    "link" : {
      "text" : "Provider Home",
      "url" : "https://providers.com/pages/fl-2012.aspx",
      "target" : "_blank"
    },
    "type" : "linkout",
    "regions" : [ "FL" ],
    "permissions" : [ "7289" ],
    "images" : {
      "tile" : "/static/spaces/73162546201448291151598200008825/tile.png"
    },
    "icons" : {
      "navigation" : "app-icon-branded-black"
    },
    "activeDate" : "2016-03-17T10:41:00.000-0400",
    "createDate" : "2016-03-15T18:12:11.000-0400",
    "updateDate" : "2018-02-05T16:00:36.490-0500",
    "parentIds" : [ "73162546201448291151598200008825" ]
    }, {
    "id" : "10939061021472563249398300004776",
    "name" : "Provider Online Reporting",
    "shortName" : "POR",
    "description" : "",
    "link" : {
      "text" : "Provider Online Reporting",
      "url" : "/availity/sso?transactionCode=159",
      "target" : "newBody"
    },
    "type" : "linkout",
    "keywords" : [ "bcbsga", "anthem", "unicare", "empire", "amerigroup" ],
    "feature" : { },
    "regions" : [ "TX", "FL", "NV", "WA", "NY", "SC", "WI", "MA", "MD", "IA", "ME", "OH", "GA", "CA", "WV", "MO", "IN", "KS", "VA", "CO", "KY", "CT", "LA", "NH", "TN", "NJ", "NM", "DC" ],
    "permissions" : [ "7087" ],
    "resources" : [ "9498", "9752", "9499", "9540", "9496", "9541", "9497", "9502", "9503", "9511", "9500", "9501", "9494", "9495", "9492", "9493", "11503", "10507", "10849", "10369", "11589" ],
    "icons" : {
      "navigation" : "app-icon-branded-black"
    },
    "activeDate" : "2016-08-28T21:03:00.000-0400",
    "createDate" : "2016-08-30T09:20:49.000-0400",
    "updateDate" : "2018-02-14T14:24:17.361-0500",
    "url" : "",
    "tenant" : "anthem",
    "parentIds" : [ "10939061011461209623076300008435", "73162546201441029505527200009789", "10939061021461199517286300002469", "73162546201454636497931200000017", "rJcWJXkkBIZ", "73162546201454637346393200005396", "10939061021461210182611300007802", "10939060981461209894435300000144", "73162546201447266487306200008029", "73162546201446384016633200009498", "73162546201447337974492200008334", "10939061001461210065494300005943", "73162546201454618699260200009008", "73162546201455907487472200000710", "S1bHqkCVp7M", "10939061031461210295320300008011", "73162546201454636032295200007244", "73162546201454617923627200009866", "73162546201448291151598200008825", "BJ7XVOOpCGZ", "73162546201441030324898200006669", "10939061051465319170312300009905", "73162546201454636953685200002233", "73162546201454638201482200004817", "10939061021461210382604300003934", "10939060991461209801749300001023", "SJYWvQjBaNb", "10939061031461207831320300007406", "73162546201454638608627200001573", "73162546201453339953613200009408", "73162546201446435076352200000165", "73162546201454637891743200005651" ],
    "payerId" : ""
    }, {
    "id" : "SJQuvlh44M-",
    "name" : "Provider Self Service",
    "link" : {
    "text" : "Provider Self Service",
    "url" : "/availity/sso?transactionCode=174",
      "target" : "_blank"
    },
    "type" : "linkout",
    "categories" : [ "Provider Resources", "Portal" ],
    "keywords" : [ "Amerigroup" ],
    "feature" : { },
    "regions" : [ "TX", "FL", "KS", "NV", "WA", "LA", "MD", "IA", "GA", "TN", "NJ", "NM", "DC" ],
    "permissions" : [ "7152" ],
    "resources" : [ "10027" ],
    "activeDate" : "2017-06-06T10:43:00.000-0400",
    "createDate" : "2017-06-06T10:30:47.000-0400",
    "updateDate" : "2018-02-05T16:00:37.898-0500",
    "parentIds" : [ "10939061011461209623076300008435", "10939061031461210295320300008011", "10939061021461199517286300002469", "rJcWJXkkBIZ", "73162546201448291151598200008825", "10939061021461210182611300007802", "10939060981461209894435300000144", "10939061021461210382604300003934", "10939060991461209801749300001023", "10939061031461209982104300007146", "10939061031461207831320300007406", "10939061001461210065494300005943", "73162546201455907487472200000710" ]
  } ]
}
```

## GET /api/sdk/platform/v1/navigation/spaces/:spaceId

Retrieves a space by its id.

### Example Request

    https:/apps.availity.com/api/sdk/platform/v1/spaces/12346578909876543211234657890987

### Example Response

```javascript
    {
      "id": "12346578909876543211234657890987",
      "name": "835 Setup",
      "shortName": "8S",
      "description": "835 Setup",
      "link": {
        "text": "835 Setup",
        "url": "/public/spaces/availity-835-setup",
        "target": "_blank"
      },
      "spaceLinks": [{
        "text": "835 Setup",
        "url": "/public/spaces/availity-835-setup",
        "target": "_blank"
      }],
      "version": "1.0.0",
      "type": "application",
      "categories": [],
      "keywords": [
        "remit",
        "setup",
        "era",
        "835"
      ],
      "brand": {
        "name": "Availity",
        "id": "21907"
      },
      "owners": [
        {
          "id": "aka86041677773",
          "name": "Availity"
        }
      ],
      "permissions": [
        "5001"
      ],
      "icons": {
        "dashboard": "icon-edit"
      },
      "activeDate": "2016-03-08T21:34:40.000+0000",
      "parentIds": [ "73162546201437753273410200003882" ]
    }
```
