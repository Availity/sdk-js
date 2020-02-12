---
title: Providers
summary: A provider represents a person or non person entity that provides healthcare service.
---

## GET /api/internal/v1/providers

Find provider information by organization.

### Parameters

-   **customerId** _(required)_ — List of organization ids to check for providers.
-   **providerId** _(optional)_ — The Provider Id to filter by. It is the last set digits of the id.
-   **role** _(optional)_ — List of provider roles to filter by. Examples: `ATNG`, `BILL`, `PAY`, etc.
-   **q** _(optional)_ - A list of search terms to filter by.
-   **sortBy** _(optional)_ - Allows the client to specify a field to sort results by. Example: `name`.
-   **sortDirection** _(optional)_ - Allows the client to specify a sort direction. Clients can sort by `asc` or `desc`. Defaults to `asc`.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.

### Example Request

```
GET https://apps.availity.com/api/internal/v1/providers?customerId=123456
```

### Example Response

```javascript
{
  "totalCount" : 2,
  "count" : 2,
  "offset" : 0,
  "limit" : 50,
  "links" : {
    "self" : {
      "href" : "https://apps.availity.com/api/internal/v1/providers?customerId=123456"
    }
  },
  "providers" : [ {
    "id" : "274929-269194-123456",
    "businessName" : "GENERIC PHARMACY",
    "uiDisplayName" : "GENERIC PHARMACY",
    "atypical" : false,
    "npi" : "1003921024",
    "customerIds" : [ "123456" ],
    "roles" : [ {
      "code" : "ATNG",
      "value" : "Attending"
    }, {
      "code" : "BILL",
      "value" : "Billing"
    }, {
      "code" : "OPRG",
      "value" : "Operating Physician"
    }, {
      "code" : "PAY",
      "value" : "Pay to Provider"
    }, {
      "code" : "RFAC",
      "value" : "Referred to Facility"
    }, {
      "code" : "RFRD",
      "value" : "Referred to Provider"
    }, {
      "code" : "RFRG",
      "value" : "Referring Provider"
    }, {
      "code" : "RNDG",
      "value" : "Rendering Provider"
    }, {
      "code" : "RQST",
      "value" : "Requesting Provider"
    }, {
      "code" : "SFAC",
      "value" : "Service Facility"
    } ],
    "primaryPhone" : {
      "internationalCellularCode" : "&#x2b;1",
      "areaCode" : "334",
      "phoneNumber" : "671-3784"
    },
    "primaryFax" : {
      "internationalCellularCode" : "&#x2b;1",
      "areaCode" : "334",
      "phoneNumber" : "671-0181"
    },
    "primaryAddress" : {
      "line1" : "2115 E MAIN ST",
      "line2" : "STE 3",
      "city" : "DOTHAN",
      "state" : "ALABAMA",
      "stateCode" : "AL",
      "zip" : {
        "code" : "36301",
        "addon" : "3044"
      }
    }
  }, {
    "id" : "274329-269194-123456",
    "lastName" : "LINCOLN",
    "firstName" : "ABE",
    "middleName" : "E",
    "uiDisplayName" : "LINCOLN, ABE E",
    "atypical" : false,
    "npi" : "1902208000",
    "customerIds" : [ "123456" ],
    "roles" : [ {
      "code" : "ATNG",
      "value" : "Attending"
    }, {
      "code" : "BILL",
      "value" : "Billing"
    }, {
      "code" : "OPRG",
      "value" : "Operating Physician"
    }, {
      "code" : "PAY",
      "value" : "Pay to Provider"
    }, {
      "code" : "RFAC",
      "value" : "Referred to Facility"
    } ],
    "primarySpecialty" : {
      "code" : "207X00000X",
      "value" : "Orthopaedic Surgery"
    },
    "primaryAddress" : {
      "line1" : "12901 BRUCE B DOWNS BLVD",
      "line2" : "UNIVERSITY OF SOUTH FLORIDA",
      "city" : "TAMPA",
      "state" : "FLORIDA",
      "stateCode" : "FL",
      "zip" : {
        "code" : "33612",
        "addon" : "4742"
      }
    }
  } ]
}
```
