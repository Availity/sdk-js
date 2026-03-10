---
title: Organizations
---

An organization asset represents an entity that Availity does business with. These include payers, clearinghouses, providers, and vendors. This endpoint allows clients to query collection of organizations which are associated to a logged in user.

## GET /cloud/web/appl/customer-management/legacy/sdk/platform/v1/organizations

Find a user's organization collection with a set of parameters. The request parameters act as filters on the collection.

### Parameters

| Name                                | Type      | Description                                                                                                                                   |
|-------------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **id**                              | String[ ] | Allows the client to retrieve multiple organizations by their ids (also known as partyId or applicationId). Accepts multiple `id` parameters. |
| **customerId**                      | String[ ] | Allows the client to retrieve multiple organizations by their customer ids. Accepts multiple `customerId` parameters.                         |
| **akaName**                         | String[ ] | Allows the client to retrieve multiple organization by akaName. Accepts multiple `akaName` parameters.                                        |
| **permissionId**                    | String[ ] | Allows the client to retrieve organizations with the specified permission ids. Accepts multiple `permissionId` parameters.                    |
| **region**                          | String    | Allows the client to retrieve organizations within the specified regions.                                                                     |
| **q**                               | String    | Filter organizations by partial match on name.                                                                                                |
| **dropdown**                        | Boolean   | Returns a simplified response for dropdown lists. only these fields (id, customerId, facilityId, name, dbaName)                               |
| **includeDefault**                  | Boolean   | For all include flags below this is default value, for backwards compatibility default to true                                                |
| **includeAddresses**                | Boolean   | Include address information                                                                                                                   |
| **includePhoneAndFax**              | Boolean   | Include phone and fax numbers.                                                                                                                |
| **includeNpis**                     | Boolean   | Include NPI identifiers                                                                                                                       |
| **includePayerAssignedProviderIds** | Boolean   | Include payer-assigned provider IDs                                                                                                           |
| **includeRegions**                  | Boolean   | Include region information                                                                                                                    |
| **includeSecondaryTaxIds**          | Boolean   | Include secondary tax IDs                                                                                                                     |
| **includeTradingPartnerId**         | Boolean   | Include trading partner ID                                                                                                                    |
| **addAdmins**                       | Boolean   | Include administrator users,                                                                                                                  |
| **primaryAdminsOnly**               | Boolean   | When using with addAdmins, it specifies if we want to see just the primary administrators. Defaults to `false`.                               |
| **accessId**                        | String[ ] | Allows the user to include specific payer specific access identifiers.                                                                        |
| **sortBy**                          | String    | Allow sorting organizations.  Default is "name"                                                                                               |
| **sortDirection**                   | String    | Determines sort directions.  "asc" or "desc"                                                                                                  |
| **offset**                          | Number    | Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.                                                     |
| **limit**                           | Number    | Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.                                           |

 

### Example Request

```bash
GET https://essentials.availity.com/cloud/web/appl/customer-management/legacy/sdk/platform/v1/organizations?userId=aka987654321
```

### Example Response

```json
{
  "totalCount": 1,
  "count": 1,
  "offset": 0,
  "limit": 50,
  "organizations": [
    {
      "id": "1111",
      "customerId": "2222",
      "name": "Acme Medical Center",
      "dbaName": "Acme Medical Center",
      "createDate" "2023-01-15T10:30:00Z",
      "status": "Live",
      "statusCode": "3",
      "statusDate": "2023-01-15T10:30:00Z",
      "tradingPartnerId": "3333",
      "phoneNumber": {
        "id": "",
        "icc": "",
        "areaCode": "555",
        "exchange": "555",
        "phoneNumber": "5555",
        "extension": "",
        "comment": "",
      },
      "faxNumber": {
        "id": "",
        "icc": "",
        "areaCode": "555",
        "exchange": "555",
        "phoneNumber": "5555",
        "extension": "",
        "comment": "",
      },
      "physicalAddress": {
        "id": "1234",
        "addressLine1": "10752 Deerwood Pk. Blvd. S.",
        "addressLine2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256",
        "country": "",
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
      },
      "mailingAddress": {
        "id": "2345",
        "addressLine1": "10752 Deerwood Pk. Blvd. S.",
        "addressLine2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256",
        "country": "",
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
      },
      "billingAddress": {
        "id": "3456",
        "addressLine1": "10752 Deerwood Pk. Blvd. S.",
        "addressLine2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256",
        "country": "",
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
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
      "types": [
        {
          "code": 18,
          "value": "Hospital"
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
      "administrators": [
        {
            "userId": "",
            "akaname": "",
            "firstName": "",
            "lastName": "",
            "legalFirstName": "",
            "jobTitle": "",
            "email": "",
            "phone": "",
            "phoneTypeCd": "",
            "roleIds": "",
            "userValidated": "",
            "userHasSecurityException": "",
            "userLatestVerifyStatusCode": "",
            "currentRegion": "",
            "salesforceContactId": "",
            "hasConfidentialVoicemail": "",
            "createDate": "",
            "lastUpdateDate": "",
        }
      ]
    }
  ]
}
```

## GET /cloud/web/appl/customer-management/legacy/sdk/platform/v1/organizations/:id

Retrieves by its id.

### Example Request

```bash
GET https://essentials.availity.com/cloud/web/appl/customer-management/legacy/sdk/platform/v1/organizations/1111
```

### Example Response

```json
{
    "id": "1111",
    "customerId": "2222",
    "name": "Acme Medical Center",
    "dbaName": "Acme Medical Center",
    "createDate" "2023-01-15T10:30:00Z",
    "status": "LIVE",
    "statusCode": "3",
    "statusDate": "2023-01-15T10:30:00Z",
    "tradingPartnerId": "3333",
    "phoneNumber": {
        "id": "",
        "icc": "",
        "areaCode": "555",
        "exchange": "555",
        "phoneNumber": "5555",
        "extension": "",
        "comment": "",
    },
    "faxNumber": {
        "id": "",
        "icc": "",
        "areaCode": "555",
        "exchange": "555",
        "phoneNumber": "5555",
        "extension": "",
        "comment": "",
    },
    "physicalAddress": {
        "id": "1234",
        "addressLine1": "10752 Deerwood Pk. Blvd. S.",
        "addressLine2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256",
        "country": "",
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
    },
    "mailingAddress": {
        "id": "2345",
        "addressLine1": "10752 Deerwood Pk. Blvd. S.",
        "addressLine2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256",
        "country": "",
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
    },
    "billingAddress": {
        "id": "3456",
        "addressLine1": "10752 Deerwood Pk. Blvd. S.",
        "addressLine2": "Ste. 110",
        "city": "Jacksonville",
        "state": "Florida",
        "stateCode": "FL",
        "zipCode": "32256",
        "country": "",
        "line1": "10752 Deerwood Pk. Blvd. S.",
        "line2": "Ste. 110",
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
    "types": [
        {
            "code": 18,
            "value": "Hospital"
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
    "administrators": [
        {
            "userId": "",
            "akaname": "",
            "firstName": "",
            "lastName": "",
            "legalFirstName": "",
            "jobTitle": "",
            "email": "",
            "phone": "",
            "phoneTypeCd": "",
            "roleIds": "",
            "userValidated": "",
            "userHasSecurityException": "",
            "userLatestVerifyStatusCode": "",
            "currentRegion": "",
            "salesforceContactId": "",
            "hasConfidentialVoicemail": "",
            "createDate": "",
            "lastUpdateDate": "",
        }
    ]
}
```

## FAQ

- Which taxId should I use?
  - An array of taxIds is returned for each organization, and will have the first result as the "primary" taxId. The type will be either "E" (EIN) or "S" (SSN). Additional taxIds will have the type "ALTTAX" as secondary or alternative taxIds.

## Securing the Back End

Generally, your application will make a call to your own back end services through the Availity proxy. When this is the case, open a request to Availity to secure the particular proxy configuration for organization validation. Note that you will need to pass the customer ID of the organization for validation in your proxy call.
