---
title: Permissions
summary: A permission represents a relationship between an organization and a user, possibly in the context of one or more payers.
---

## GET /api/sdk/platform/v1/permissions

Find a user's permissions with a set of parameters. The request parameters act as filters on the collection.

-   **id** _(optional)_ — Allows the client to retrieve multiple permissions by their ids. Accepts multiple `id` parameters. Other parameters will be ignored if the `id` parameter is used.
-   **roleId** _(optional)_ — Allows the client to retrieve multiple permissions associated with the specified role. Accepts multiple `roleId` parameters.
-   **userId** _(optional)_ - Allows the client to retrieve permissions for the specified user. Accepts a single userId parameter.
-   **organizationId** _(optional)_ - Allows the client to retrieve permissions or the specified organizationId. Accepts a single userId parameter. Ignored unless `userId` is sent.
-   **includeResources** _(optional)_ - Allows the client to retrieve the resources assigned to the permission. Defaults to `false`.
-   **sortBy** _(optional)_ - Allows the client to sort the collection. Supports `id` and `description`. Defaults to description. Accepts a single `sortBy`parameter.
-   **sortDirection** _(optional)_ - Allows the client to specify a sort direction. Clients can sort by `asc` or `desc`. Defaults to asc.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`.

### Example Request

```
GET https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka987654321
```

### Example Response

```javascript
{
  "totalCount": 264,
  "count": 50,
  "offset": 0,
  "limit": 50,
  "links": {
    "next": {
      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka12345789&offset=50&limit=50"
    },
    "last": {
      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka12345789&offset=250&limit=50"
    },
    "self": {
      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions?userId=aka12345789"
    }
  },
  "permissions": [
    {
      "links": {
        "organizations": {
          "href": "https://apps.availity.com/api/sdk/platform/v1/organizations?permissionId=7052&userId=aka12345789"
        },
        "self": {
          "href": "https://apps.availity.com/api/sdk/platform/v1/permissions/7153"
        }
      },
      "id": "7153",
      "description": "Administrative Reports"
    }
  ]
}
```

## GET /api/sdk/platform/v1/permissions/:id

Retrieves a permission by its id.

### Example Request

    https:/apps.availity.com/api/sdk/platform/v1/permissions/7153

### Example Response

```javascript
{
  "links": {
    "self": {
      "href": "https://apps.availity.com/api/sdk/platform/v1/permissions/7153"
    }
  },
  "id": "7153",
  "description": "Administrative Reports"
}
```
