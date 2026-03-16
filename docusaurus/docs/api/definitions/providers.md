---
title: Providers
---

A provider represents a person or non person entity that provides healthcare service.

## GET /cloud/web/onb/roster-api/roster/v1/providers

Find provider information by organization.

### Parameters

| Name                   | Type                | Description                                                                                                                                      |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **cusomerId**          | STRING _(required)_ | List of organization ids to check for providers.                                                                                                 |
| **role**               | STRING[ ]           | List of provider roles to filter by. Allowed: `ATNG`, `BILL`, `OPRG`, `PAY`, `RFAC`, `RFRD`, `RFRG`, `RNDG`, `RQST`, `SFAC`, `OFFICE`, `EXTERN`. |
| **p**                  | STRING[ ]           | A list of root level paths to display.                                                                                                           |
| **q**                  | STRING[ ]           | A list of search terms to filter by.                                                                                                             |
| **sortBy**             | STRING              | Allows the client to specify a field to sort results by. Allowed: `name`.                                                                        |
| **sortDirection**      | STRING              | Allows the client to specify a sort direction. Clients can sort by `asc` or `desc`. Defaults to `asc`.                                           |
| **refresh**            | BOOLEAN             | Flag whether to refresh the cache, when applicable.                                                                                              |
| **providerType**       | STRING              | The provider type to filter by. Whether organization (non-person entity), provider. Allowed: `organization`, `provider`, `all`.                  |
| **providerId**         | STRING              | The Provider Id to filter by. It is the last set digits of the id.                                                                               |
| **payerId**            | STRING              | The payer Id to filter by. Specifying a payer ID requires the provider to have at a PAPI with the payer.                                         |
| **searchAll**          | BOOLEAN             | Flag whether to allow searching for all providers.                                                                                               |
| **identifierType**     | STRING[ ]           | The identifier type to filter by. Allowed: `NPI`, `LPI`.                                                                                         |
| **providerIdentifier** | STRING[ ]           | The provider assigned identifier to filter by. It is used with the idenifier type (either npi or lpi).                                           |
| **excludeAtypical**    | BOOLEAN             | Indicates whether or not to exclude atypical providers.                                                                                          |

### Example Request

```
GET https://essentials.availity.com/cloud/web/onb/roster-api/roster/v1/providers?customerId=123456
```

### Example Response

```json
{
  "totalCount": 2,
  "count": 2,
  "offset": 0,
  "limit": 50,
  "providers": [
    {
      "id": "274929-269194-123456",
      "pvdrId": 123456,
      "businessName": "GENERIC PHARMACY",
      "uiDisplayName": "GENERIC PHARMACY",
      "npi": "1003921024",
      "createDate": "",
      "customerIds": ["123456"],
      "taxIds": [{
        "type": "TAXID",
        "value": "123456789",
        "desc": "",
        "meaning": "PRIMARY",
      }],
      "roles": [
        {
          "code": "ATNG",
          "value": "Attending"
        },
        {
          "code": "BILL",
          "value": "Billing"
        },
        {
          "code": "OPRG",
          "value": "Operating Physician"
        },
        {
          "code": "PAY",
          "value": "Pay to Provider"
        },
        {
          "code": "RFAC",
          "value": "Referred to Facility"
        },
        {
          "code": "RFRD",
          "value": "Referred to Provider"
        },
        {
          "code": "RFRG",
          "value": "Referring Provider"
        },
        {
          "code": "RNDG",
          "value": "Rendering Provider"
        },
        {
          "code": "RQST",
          "value": "Requesting Provider"
        },
        {
          "code": "SFAC",
          "value": "Service Facility"
        }
      ],
      "payerAssignedIdentifiers": [{
        "payerId": "12345",
        "identifier": "123456789"
      }],
      "atypical": false,
      "primaryPhone": {
        "internationalCellularCode": "&#x2b;1",
        "areaCode": "334",
        "phoneNumber": "671-3784"
      },
      "primaryFax": {
        "internationalCellularCode": "&#x2b;1",
        "areaCode": "334",
        "phoneNumber": "671-0181"
      },
      "primaryAddress": {
        "line1": "2115 E MAIN ST",
        "line2": "STE 3",
        "city": "DOTHAN",
        "state": "ALABAMA",
        "stateCode": "AL",
        "zip": {
          "code": "36301",
          "addon": "3044"
        },
        "billing": true,
        "physical": true,
        "phone": {
        "internationalCellularCode": "&#x2b;1",
        "areaCode": "334",
        "phoneNumber": "671-3784"
      }
      }
    }
  ]
}
```
