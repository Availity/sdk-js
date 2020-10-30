---
title: Regions
---

This endpoint allows clients to retrieve a list of all regions associated to a specific user.

## GET /api/sdk/platform/v1/regions

Find a user's regions collection.

### Parameters

-   **userId** _(optional)_ — Allows the client to view regions for a specific user. If sent, currentlySelected region will be indicated.
-   **currentlySelected** _(optional)_ — Allows the client to request to get only the region that is marked as `currentlySelected`. Accepts a single boolean value of `true` or `false`. If `true` and sent without a userId, currently logged in user with be used.
-   **sortBy** _(optional)_ - Allows the client to sort the result set. Supports `id` and `value`. Defaults to `value`.
-   **sortDirection** _(optional)_ - Allows the client to specify a sort direction. Clients can sort by `asc` or `desc`. Defaults to `asc`.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.

### Example Request

```
    GET https://apps.availity.com/api/sdk/platform/v1/regions?currentlySelected=true
```

### Example Response

```javascript
{
  "totalCount" : 1,
  "count" : 1,
  "offset" : 0,
   "limit" : 50,
  "regionAggregations" : [ {
   "type" : "hits",
    "hits" : [ {
      "key" : "userRegionCount",
      "count" : 56
    } ]
  } ],
  "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/regions?currentlySelected=true"
    },
    "user" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/users/aka01565563207"
    }
  },
  "regions" : [ {
    "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/regions/FL"
    }
  },
  "id" : "FL",
  "value" : "Florida",
  "currentlySelected" : true
  } ]
}
```

## GET /api/sdk/platform/v1/regions/:id

Allows the client to retrieve a region by id.

### Example Request

```
    GET https://apps.availity.com/api/sdk/platform/v1/regions/NM
```

### Example Response

```javascript
{
  "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/regions/NM"
    }
  },
  "id" : "NM",
  "value" : "New Mexico"
}
```
