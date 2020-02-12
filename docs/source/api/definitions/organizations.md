---
title: Organizations
summary: An organization asset represents an entity that Availity does business with. These include payers, clearinghouses, providers, and vendors. This endpoint allows clients to query collection of organizations which are associated to a logged in user.
---

## GET /api/sdk/platform/v1/organizations

Find a user's organization collection with a set of parameters. The request parameters act as filters on the collection.

### Parameters

> The client must send at least one of the following: `id`, `customerId`, `userId` or `q`.

-   **id** _(optional)_ — Allows the client to retrieve multiple organizations by their ids. Accepts multiple `id` parameters.
-   **customerId** _(optional)_ — Allows the client to retrieve multiple organizations by their customer ids. Accepts multiple `customerId` parameters.
-   **userId** _(optional)_ - Allows the client to retrieve organizations that the user is a part of. Accepts a single user id parameter.
-   **regions.code** _(optional)_ - Allows the client to retrieve organizations within the specified regions. Accepts multiple `regions.code` parameters.
-   **statusCode** _(optional)_ - Allows the client to retrieve organizations with the specified status codes. Accepts multiple status code parameters. Defaults to `3`, `13` _(Live, Completed)_
-   **permissionId** _(optional)_ - Allows the client to retrieve organizations with the specified permission ids. Accepts multiple `permissiondId` parameters.
-   **getExtras** _(optional)_ - Retrieve other info (number of licensed physicians/clinicians, specialty types, etc) for the matched organizations. Defaults to `false`.
-   **primaryAdminsOnly** _(optional)_ - When using with getExtras, it specifies if we want to see just the primary administrators. Defaults to `false`.
-   **q** _(optional)_ - If an `id`, `customerId` or `userId` are not provided, we use this parameter to query a user's organizations. Other filter parameters will be ignored if `q` parameter is used. Sort and page parameters can still be used.
-   **sortBy** _(optional)_ - Clients can sort by name only for now.
-   **sortDirection** _(optional)_ - Allows the client to specify a sort direction. Clients can sort by `asc` or `desc`. Defaults to `asc`.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.

### Example Request

```
GET https://apps.availity.com/api/sdk/platform/v1/organizations?userId=aka987654321
```

### Example Response

```javascript
{
  "totalCount": 1,
  "count": 1,
  "offset": 0,
  "limit": 50,
  "links": {
    "self": {
      "href": "https://apps.availity.com/api/sdk/platform/v1/organizations?customerId=9999"
    }
  },
  "organizations": [
    {
      "links": {
        "self": {
          "href": "https://apps.availity.com/api/sdk/platform/v1/organizations/1111"
        },
        "admin": {
          "href": "https://apps.availity.com/api/sdk/platform/v1/users/aka987654321"
        },
        "businessArrangements": {
          "href": "https://apps.availity.com/api/sdk/platform/v1/business-arrangements?organizationId=1111"
        },
        "users": {
          "href": "https://apps.availity.com/api/sdk/platform/v1/users?organizationId=1111"
        }
      },
      "id": "1111",
      "customerId": "2222",
      "name": "Acme Medical Center",
      "dbaName": "Acme Medical Center",
      "status": "Live",
      "statusCode": "3",
      "types": [
        {
          "code": 18,
          "name": "Hospital"
        }
      ],
      "primaryControllingAuthority": {
        "lastName": "Lincoln",
        "firstName": "Abraham",
        "primaryPhone": "5555555555",
        "email": "abraham.lincoln@availity.com"
      },
      "physicalAddress": {
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256"
      },
      "mailingAddress": {
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256"
      },
      "billingAddress": {
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256"
      },
      "regions": [
        {
          "code": "TX",
          "value": "Texas"
        },
        {
          "code": "AK",
          "value": "Alaska"
        },
        {
          "code": "AL",
          "value": "Alabama"
        },
        {
          "code": "AR",
          "value": "Arkansas"
        },
        {
          "code": "AS",
          "value": "American Samoa"
        },
        {
          "code": "AZ",
          "value": "Arizona"
        },
        {
          "code": "CA",
          "value": "California"
        },
        {
          "code": "CO",
          "value": "Colorado"
        },
        {
          "code": "CT",
          "value": "Connecticut"
        },
        {
          "code": "DC",
          "value": "District of Columbia"
        },
        {
          "code": "DE",
          "value": "Delaware"
        },
        {
          "code": "FL",
          "value": "Florida"
        },
        {
          "code": "GA",
          "value": "Georgia"
        },
        {
          "code": "GU",
          "value": "Guam"
        },
        {
          "code": "HI",
          "value": "Hawaii"
        },
        {
          "code": "IA",
          "value": "Iowa"
        },
        {
          "code": "ID",
          "value": "Idaho"
        },
        {
          "code": "IL",
          "value": "Illinois"
        },
        {
          "code": "IN",
          "value": "Indiana"
        },
        {
          "code": "KS",
          "value": "Kansas"
        },
        {
          "code": "KY",
          "value": "Kentucky"
        },
        {
          "code": "LA",
          "value": "Louisiana"
        },
        {
          "code": "MA",
          "value": "Massachusetts"
        },
        {
          "code": "MD",
          "value": "Maryland"
        },
        {
          "code": "ME",
          "value": "Maine"
        },
        {
          "code": "MI",
          "value": "Michigan"
        },
        {
          "code": "MN",
          "value": "Minnesota"
        },
        {
          "code": "MO",
          "value": "Missouri"
        },
        {
          "code": "MP",
          "value": "Northern Mariana Islands"
        },
        {
          "code": "MS",
          "value": "Mississippi"
        },
        {
          "code": "MT",
          "value": "Montana"
        },
        {
          "code": "NC",
          "value": "North Carolina"
        },
        {
          "code": "ND",
          "value": "North Dakota"
        },
        {
          "code": "NE",
          "value": "Nebraska"
        },
        {
          "code": "NH",
          "value": "New Hampshire"
        },
        {
          "code": "NJ",
          "value": "New Jersey"
        },
        {
          "code": "NM",
          "value": "New Mexico"
        },
        {
          "code": "NV",
          "value": "Nevada"
        },
        {
          "code": "NY",
          "value": "New York"
        },
        {
          "code": "OH",
          "value": "Ohio"
        },
        {
          "code": "OK",
          "value": "Oklahoma"
        },
        {
          "code": "OR",
          "value": "Oregon"
        },
        {
          "code": "PA",
          "value": "Pennsylvania"
        },
        {
          "code": "PR",
          "value": "Puerto Rico"
        },
        {
          "code": "RI",
          "value": "Rhode Island"
        },
        {
          "code": "SC",
          "value": "South Carolina"
        },
        {
          "code": "SD",
          "value": "South Dakota"
        },
        {
          "code": "TN",
          "value": "Tennessee"
        },
        {
          "code": "UT",
          "value": "Utah"
        },
        {
          "code": "VA",
          "value": "Virginia"
        },
        {
          "code": "VI",
          "value": "Virgin Islands"
        },
        {
          "code": "VT",
          "value": "Vermont"
        },
        {
          "code": "WA",
          "value": "Washington"
        },
        {
          "code": "WI",
          "value": "Wisconsin"
        },
        {
          "code": "WV",
          "value": "West Virginia"
        },
        {
          "code": "WY",
          "value": "Wyoming"
        }
      ],
      "npis": [
        {
          "number": "1234567893"
        }
      ],
      "taxIds": [
        {
          "number": "999999999",
          "type": "E"
        },
        {
          "number": "888888889",
          "type": "ALTTAX"
        }
      ],
      "payerAssignedProviderIds": {
        "ACMEFL": [
          {
            "number": "20001"
          },
          {
            "number": "20002"
          }
        ],
        "ACMEGA": [
          {
            "number": "20005"
          }
        ]
      },
      "phoneNumber": {
        "areaCode": "555",
        "exchange": "555",
        "phoneNumber": "5555"
      },
      "faxNumber": {
        "areaCode": "555",
        "exchange": "555",
        "phoneNumber": "5555"
      },
      "numberOfLicensedPhysicians": "0",
      "numberOfLicensedClinicians": "2"
    }
  ]
}
```

## GET /api/sdk/platform/v1/navigation/spaces/:id

Retrieves by its id.

### Example Request

    https://apps.availity.com/api/sdk/platform/v1/organizations/1111

### Example Response

```javascript
{
  "links": {
    "self": {
      "href": "https:/apps.availity.com/api/sdk/platform/v1/organizations/1111"
    },
    "admin": {
      "href": "https:/apps.availity.com/api/sdk/platform/v1/users/aka987654321"
    },
    "businessArrangements": {
      "href": "https:/apps.availity.com/api/sdk/platform/v1/business-arrangements?organizationId=1111"
    },
    "users": {
      "href": "https:/apps.availity.com/api/sdk/platform/v1/users?organizationId=1111"
    }
  },
    "id": "1111",
    "customerId": "2222",
    "name": "Acme Medical Center",
    "dbaName": "Acme Medical Center",
    "status": "Live",
    "statusCode": "3",
    "types": [
      {
        "code": 18,
        "name": "Hospital"
      }
    ],
    "primaryControllingAuthority": {
      "lastName": "Lincoln",
      "firstName": "Abraham",
      "primaryPhone": "5555555555",
      "email": "abraham.lincoln@availity.com"
    },
    "physicalAddress": {
      "line1": "10752 Deerwood Pk. Blvd. S.",
      "line2": "Ste. 110",
      "city": "Jacksonville",
      "state": "Florida",
      "stateCode": "FL",
      "zipCode": "32256"
    },
    "mailingAddress": {
      "line1": "10752 Deerwood Pk. Blvd. S.",
      "line2": "Ste. 110",
      "city": "Jacksonville",
      "state": "Florida",
      "stateCode": "FL",
      "zipCode": "32256"
    },
    "billingAddress": {
      "line1": "10752 Deerwood Pk. Blvd. S.",
      "line2": "Ste. 110",
      "city": "Jacksonville",
      "state": "Florida",
      "stateCode": "FL",
      "zipCode": "32256"
    },
    "regions": [
      {
        "code": "TX",
        "value": "Texas"
      },
      {
        "code": "AK",
        "value": "Alaska"
      },
      {
        "code": "AL",
        "value": "Alabama"
      },
      {
        "code": "AR",
        "value": "Arkansas"
      },
      {
        "code": "AS",
        "value": "American Samoa"
      },
      {
        "code": "AZ",
        "value": "Arizona"
      },
      {
        "code": "CA",
        "value": "California"
      },
      {
        "code": "CO",
        "value": "Colorado"
      },
      {
        "code": "CT",
        "value": "Connecticut"
      },
      {
        "code": "DC",
        "value": "District of Columbia"
      },
      {
        "code": "DE",
        "value": "Delaware"
      },
      {
        "code": "FL",
        "value": "Florida"
      },
      {
        "code": "GA",
        "value": "Georgia"
      },
      {
        "code": "GU",
        "value": "Guam"
      },
      {
        "code": "HI",
        "value": "Hawaii"
      },
      {
        "code": "IA",
        "value": "Iowa"
      },
      {
        "code": "ID",
        "value": "Idaho"
      },
      {
        "code": "IL",
        "value": "Illinois"
      },
      {
        "code": "IN",
        "value": "Indiana"
      },
      {
        "code": "KS",
        "value": "Kansas"
      },
      {
        "code": "KY",
        "value": "Kentucky"
      },
      {
        "code": "LA",
        "value": "Louisiana"
      },
      {
        "code": "MA",
        "value": "Massachusetts"
      },
      {
        "code": "MD",
        "value": "Maryland"
      },
      {
        "code": "ME",
        "value": "Maine"
      },
      {
        "code": "MI",
        "value": "Michigan"
      },
      {
        "code": "MN",
        "value": "Minnesota"
      },
      {
        "code": "MO",
        "value": "Missouri"
      },
      {
        "code": "MP",
        "value": "Northern Mariana Islands"
      },
      {
        "code": "MS",
        "value": "Mississippi"
      },
      {
        "code": "MT",
        "value": "Montana"
      },
      {
        "code": "NC",
        "value": "North Carolina"
      },
      {
        "code": "ND",
        "value": "North Dakota"
      },
      {
        "code": "NE",
        "value": "Nebraska"
      },
      {
        "code": "NH",
        "value": "New Hampshire"
      },
      {
        "code": "NJ",
        "value": "New Jersey"
      },
      {
        "code": "NM",
        "value": "New Mexico"
      },
      {
        "code": "NV",
        "value": "Nevada"
      },
      {
        "code": "NY",
        "value": "New York"
      },
      {
        "code": "OH",
        "value": "Ohio"
      },
      {
        "code": "OK",
        "value": "Oklahoma"
      },
      {
        "code": "OR",
        "value": "Oregon"
      },
      {
        "code": "PA",
        "value": "Pennsylvania"
      },
      {
        "code": "PR",
        "value": "Puerto Rico"
      },
      {
        "code": "RI",
        "value": "Rhode Island"
      },
      {
        "code": "SC",
        "value": "South Carolina"
      },
      {
        "code": "SD",
        "value": "South Dakota"
      },
      {
        "code": "TN",
        "value": "Tennessee"
      },
      {
        "code": "UT",
        "value": "Utah"
      },
      {
        "code": "VA",
        "value": "Virginia"
      },
      {
        "code": "VI",
        "value": "Virgin Islands"
      },
      {
        "code": "VT",
        "value": "Vermont"
      },
      {
        "code": "WA",
        "value": "Washington"
      },
      {
        "code": "WI",
        "value": "Wisconsin"
      },
      {
        "code": "WV",
        "value": "West Virginia"
      },
      {
        "code": "WY",
        "value": "Wyoming"
      }
    ],
    "npis": [
      {
        "number": "1234567893"
      }
    ],
    "taxIds": [
      {
        "number": "999999999",
        "type": "E"
      },
      {
        "number": "888888889",
        "type": "ALTTAX"
      }
    ],
    "payerAssignedProviderIds": {
      "ACMEFL": [
        {
          "number": "20001"
        },
        {
          "number": "20002"
        }
      ],
      "ACMEGA": [
        {
          "number": "20005"
        }
      ]
    },
    "phoneNumber": {
      "areaCode": "555",
      "exchange": "555",
      "phoneNumber": "5555"
    },
    "faxNumber": {
      "areaCode": "555",
      "exchange": "555",
      "phoneNumber": "5555"
    },
    "numberOfLicensedPhysicians": "0",
    "numberOfLicensedClinicians": "2"
  }
```

## FAQ

-   Which taxId should I use?
    -   An array of taxIds is returned for each organization, and will have the first result as the "primary" taxId. The type will be either "E" (EIN) or "S" (SSN). Additional taxIds will have the type "ALTTAX" as secondary or alternative taxIds.
