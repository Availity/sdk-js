---
title: Settings
summary: Settings are stored by several values such as applicationId, userId, payerId, customerId, and region. Each setting may contain a key value pair of data that can preserve specific information per application.
---

## GET /api/utils/v1/settings

Query settings by parameters

### Parameters

-   **applicationId** _(required)_ — Find settings associated to a specific application Id.
-   **payerId** _(optional)_ — Filter by payer Id.
-   **roleId** _(optional)_ — Filter by an associated role.
-   **regionId** _(optional)_ — Filter by region.
-   **customerType** _(optional)_ — Filter by the customer type.
-   **officeId** _(optional)_ — Filter by the office Id.
-   **userSource** _(optional)_ — Filter by source system of the user. Used by admins to look at non gateway users.
-   **userId** _(optional)_ — Filter by specific user Id.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.

### Example Request

```
GET https://apps.availity.com/api/utils/v1/settings?application=myApp&userId=myUserAka
```

### Example Response

```javascript
{
  "totalCount" : 1,
  "count" : 1,
  "offset" : 0,
  "limit" : 1,
  "links" : {
    "self" : {
      "href" : "https://test-apps.availity.com/api/utils/v1/settings?applicationId=myApp&userId=myUserAka"
    }
  },
  "settings" : [ {
    "settingKey" : "settingValue",
    "key2" : "value2"
  } ]
}
```

## PUT /api/utils/v1/settings

Saves a setting value for the given scope.

### Example Request

```bash
    $ curl -i -X PUT -H "Content-Type: application/json" -d '{"scope": { "applicationId": "myApp", "userId": "myUserAka"}, "myKey": "myData"}' "http://localhost:3000/api/utils/v1/settings"
```

### Example Response

```javascript
{
  "myKey" : "myData"
}
```
