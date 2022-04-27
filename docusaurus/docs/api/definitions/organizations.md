---
title: Organizations
---

An organization asset represents an entity that Availity does business with. These include payers, clearinghouses, providers, and vendors. This endpoint allows clients to query collection of organizations which are associated to a logged in user.

## GET /api/sdk/platform/v1/organizations

Find a user's organization collection with a set of parameters. The request parameters act as filters on the collection.

### Parameters

> The client must send at least one of the following: `id`, `customerId`, `userId` or `q`.

| Name                  | Type    | Description                                                                                                                                                                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**                | String  | Allows the client to retrieve multiple organizations by their ids. Accepts multiple `id` parameters.                                                                                                                        |
| **customerId**        | String  | Allows the client to retrieve multiple organizations by their customer ids. Accepts multiple `customerId` parameters.                                                                                                       |
| **userId**            | String  | Allows the client to retrieve organizations that the user is a part of. Accepts a single user id parameter.                                                                                                                 |
| **regions.code**      | String  | Allows the client to retrieve organizations within the specified regions. Accepts multiple `regions.code` parameters.                                                                                                       |
| **statusCode**        | String  | Allows the client to retrieve organizations with the specified status codes. Accepts multiple status code parameters. Defaults to `3`, `13` _(Live, Completed)_                                                             |
| **permissionId**      | String  | Allows the client to retrieve organizations with the specified permission ids. Accepts multiple `permissiondId` parameters.                                                                                                 |
| **getExtras**         | Boolean | Retrieve other info (number of licensed physicians/clinicians, specialty types, etc) for the matched organizations. Defaults to `false`.                                                                                    |
| **primaryAdminsOnly** | Boolean | When using with getExtras, it specifies if we want to see just the primary administrators. Defaults to `false`.                                                                                                             |
| **q**                 | String  | If an `id`, `customerId` or `userId` are not provided, we use this parameter to query a user's organizations. Other filter parameters will be ignored if `q` parameter is used. Sort and page parameters can still be used. Accepts an elaticsearch DSL (domain specific language) query. **Example:** to filter out organizations with the type code "18", use this query string `types.code:(-18)` |
| **sortBy**            | String  | Clients can sort by name only for now.                                                                                                                                                                                      |
| **sortDirection**     | String  | Allows the client to specify a sort direction. Clients can sort by `asc` or `desc`. Defaults to `asc`.                                                                                                                      |
| **offset**            | Number  | Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.                                                                                                                                   |
| **limit**             | Number  | Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.                                                                                                                         |

### Example Request

```bash
GET https://apps.availity.com/api/sdk/platform/v1/organizations?userId=aka987654321
```

### Example Response

```json
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
          "code": "CA",
          "value": "California"
        },
        {
          "code": "FL",
          "value": "Florida"
        },
        {
          "code": "AL",
          "value": "Alabama"
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

```bash
GET https://apps.availity.com/api/sdk/platform/v1/organizations/1111
```

### Example Response

```json
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

- Which taxId should I use?
  - An array of taxIds is returned for each organization, and will have the first result as the "primary" taxId. The type will be either "E" (EIN) or "S" (SSN). Additional taxIds will have the type "ALTTAX" as secondary or alternative taxIds.

## Validation Status

For selected payers, organizations can be validated using two checks. Note that the words "validated" and "verified" are used indiscriminately in all aspects of this process.

Organization validation comprises three components:

- Checking the validation status
- Prompting the user for check information
- Securing the back end

Generally, your application workflow should be:

1. Get user inputs, including the organization they're using
2. On submit, interrupt submission and check the organization's validation status
3. If the organization status is `VERIFIED`, skip to _step 6_
4. If the organization status is not `VERIFIED`, prompt the user for check information via the modal window
5. After the check information modal window is dismissed, loop back to _step 2_.
6. Allow submission, and on the back end, validate the organization again to guard against any request tampering

### Checking Validation Status

You can check the validation status of an organization by calling the Organization Validations endpoint. Validation is always performed in the context of an application, denoted by an application ID and a payer ID.

**Note: If organization validation has not been enabled for a specific application ID / payer ID combination, the organization will always show as `VERIFIED`.**

## GET /api/internal/v1/organization-validations

### Parameters

> The client must send all parameters

| Name              | Type   | Description                                                                                                  |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| **applicationId** | String | The application ID for which to validate the organization. Accepts a single application ID parameters.       |
| **customerId**    | String | The customer ID of the organization to validate. Accepts a single customer ID parameter.                     |
| **payerId**       | String | The payer ID of the application for which to validate the organization. Accepts a single payer ID parameter. |

### Example Request

```bash
GET https://apps.availity.com/api/internal/v1/organization-validations?applicationId=app123&customerId=1194&payerId=payerx
```

### Example Response

```json
{
  "totalCount": 1,
  "count": 1,
  "offset": 0,
  "limit": 1,
  "links": {
    "self": {
      "href": "https://apps.availity.com/api/internal/v1/organization-validations?applicationId=app123&customerId=1194&payerId=payerx"
    }
  },
  "orgValidationInfos": [
    {
      "status": "UNVERIFIED"
    }
  ]
}
```

### Possible Values for Status

- **LOCKED** - The organization has been locked, and will require manual intervention from Availity to unlock.
- **UNVERIFIED** - The organization has not yet been verified.
- **VERIFIED** - The organization has been verified.

## Prompting for Check Information

To prompt for check information, you post a specific message to the application's parent window. When you do this within the context of the Availity portal (e.g., within an Availity environment), the user sees a modal dialog for entering check information, as shown in Figure 1. While you are developing locally, however, _you will not see the modal_. You can verify your call is happening, however, using your browser's debugger.

The code to show the modal looks like this:

```javascript
window.parent.postMessage(
  {
    event: 'av:checkVerification:open',
    applicationId: applicationId,
    customerId: customerId,
    payerId: payerId,
  },
  window.location.origin
);
```

![check-validation](./check-validation.png)

## Securing the Back End

Generally, your application will make a call to your own back end services through the Availity proxy. When this is the case, open a request to Availity to secure the particular proxy configuration for organization validation. Note that you will need to pass the customer ID of the organization for validation in your proxy call.
