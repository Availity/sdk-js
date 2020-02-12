---
title: User Permissions
summary: A user can access services and applications based on assigned permissions in the Availity network. This API allows retrieval of the current logged-in user's permissions to organizations and payers.
---

## GET /api/internal/v1/axi-user-permissions

Find a user's assigned permissions. The request parameters act as filters on the collection.

### Parameters

-   **permissionId** _(required)_ — Allows the client to retrieve multiple users by their ids. Accepts multiple `id` parameters. If this parameter is sent other parameters will be ignored.
-   **region** _(optional)_ — Allows the client to retrieve users associated with the organization. Accepts **ONE** `organizationId` parameter.
-   **searchType** _(optional)_ - Allows the client to specify the status of the relationship with the specified organization. Supports `ACTIVE`, `DORM`, and `REVOKE`. Defaults to `ACTIVE`.
-   **userId** _(optional)_ - Allows the client to specify whether to return only administrators for the specified organization. Accepts a single boolean value of `true` or `false`.
-   **akaName** _(optional)_ - Accepts multiple `roleId` parameters.
-   **sessionDate** _(optional)_ - Clients can sort by name only for now.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`.

### Example Request

```
    GET https://apps.availity.com/api/internal/v1/axi-user-permissions?permissionId=7187&region=TX
```

### Example Response

```javascript
{
  "totalCount" : 1,
  "count" : 1,
  "offset" : 0,
  "limit" : 50,
  "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/internal/v1/axi-user-permissions?permissionId=7187&region=TX"
    }
  },
  "axiUserPermissions" : [ {
    "id" : "7187",
    "description" : "Payer New Claim Status",
    "organizations" : [ {
      "id" : "269194",
      "customerId" : "261361",
      "name" : "Test Org",
      "resources" : [ {
        "id" : "12345",
        "payerId" : "ACME",
        "payerName" : "ACME CORP"
      }, {
        "id" : "67890",
        "payerId" : "VANDELAY",
        "payerName" : "VANDELAY INDUSTRIES"
      } ]
    }, {
    "id" : "264320",
    "customerId" : "260881",
    "name" : "New Home Page",
    "resources" : [ {
      "id" : "10248",
      "payerId" : "ACME",
      "payerName" : "ACME CORP"
      } ]
    } ]
  } ]
}
```

## GET /api/internal/v1/axi-user-permissions/:id

Retreives a user's permissions given the id

### Example Request

```
    GET https://apps.availity.com/api/internal/v1/axi-user-permissions/7187
```

### Example Response

```javascript
{
  "id" : "7187",
  "description" : "Payer New Claim Status",
  "organizations" : [ {
    "id" : "269194",
    "customerId" : "261361",
    "name" : "Test Org",
    "resources" : [ {
      "id" : "10248",
      "payerId" : "ACME",
      "payerName" : "ACME CORP"
    }, {
      "id" : "11366",
      "payerId" : "VANDELAY",
      "payerName" : "VANDELAY INDUSTRIES"
    } ]
  }, {
    "id" : "264320",
    "customerId" : "260881",
    "name" : "New Home Page",
    "resources" : [ {
      "id" : "10248",
      "payerId" : "ACME",
      "payerName" : "ACME CORP"
    } ]
  } ]
}
```
