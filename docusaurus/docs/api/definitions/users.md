---
title: Users
---

A user asset represents a profile in the Availity network. This API allows retrieval of the current logged-in user as well as users related to an organization.

## GET /api/sdk/platform/v1/users

Find a user's with a set of parameters. The request parameters act as filters on the collection.

### Parameters

> The client must send at least one of the following: `id`, `customerId`, `userId` or `q`.

-   **id** _(optional)_ — Allows the client to retrieve multiple users by their ids. Accepts multiple `id` parameters. If this parameter is sent other parameters will be ignored.
-   **organizationId** _(optional)_ — Allows the client to retrieve users associated with the organization. Accepts **ONE** `organizationId` parameter.
-   **status** _(optional)_ - Allows the client to specify the status of the relationship with the specified organization. Supports `ACTIVE`, `DORM`, and `REVOKE`. Defaults to `ACTIVE`.
-   **admin** _(optional)_ - Allows the client to specify whether to return only administrators for the specified organization. Accepts a single boolean value of `true` or `false`.
-   **roleId** _(optional)_ - Accepts multiple `roleId` parameters.
    -   **2**: Base role
    -   **50**: Administrator
    -   **51**: Administrator Assistant
    -   **52**: User Administration
    -   **270** Eligibility and Benefits
-   **sortBy** _(optional)_ - Clients can sort by name only for now.
-   **sortDirection** _(optional)_ - Allows the client to specify a sort direction. Clients can sort by `asc` or `desc`. Defaults to asc.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`.

### Example Request

```
GET https://apps.availity.com/api/sdk/platform/v1/users.json?organizationId=1111
```

### Example Response

```javascript
{
    "totalCount": 8,
    "count": 8,
    "offset": 0,
    "limit": 50,
    "links": {
        "organization": {
            "href": "https://apps.availity.com/api/sdk/platform/v1/organizations/1111"
        },
        "self": {
            "href": "https://apps.availity.com/api/sdk/platform/v1/users?organizationId=1111"
        }
    },
    "users": [
        {
            "links": {
                "regions": {
                    "href": "https://apps.availity.com/api/sdk/platform/v1/regions?userId=aka123456789"
                },
                "organizations": {
                    "href": "https://apps.availity.com/api/sdk/platform/v1/organizations?userId=aka123456789"
                },
                "self": {
                    "href": "https://apps.availity.com/api/sdk/platform/v1/users/aka123456789"
                }
            },
            "id": "jsmith",
            "userId": "aka123456789",
            "akaname": "aka123456789",
            "lastName": "Smith",
            "firstName": "Jane",
            "email": "jane.smith@example.com",
            "phone": "555555"
        }
    ]
}
```

## GET /api/sdk/platform/v1/users/:id

Retrieves an user by its id. Supports using `me` as a synonym for the current user's id.

### Attributes

-   **`id`** _(String)_: Correlation id for a user that is safe to use for integrations. Maximum length is 50 characters.
-   **`akaname`**: _(String)_: Same as `id`

### Example Request

    https:/apps.availity.com/api/sdk/platform/v1/users/id

### Example Response

```javascript
{
    "links": {
        "regions": {
            "href": "https://apps.availity.com/api/sdk/platform/v1/regions?userId=aka123456789"
        },
        "organizations": {
            "href": "https://apps.availity.com/api/sdk/platform/v1/organizations?userId=aka123456789"
        },
        "self": {
            "href": "https://apps.availity.com/api/sdk/platform/v1/users/aka123456789"
        }
    },
    "id": "aka123456789",
    "userId": "jsmith",
    "akaname": "aka123456789",
    "lastName": "Smith",
    "firstName": "Jane",
    "email": "jane.smith@example.com"
}
```
