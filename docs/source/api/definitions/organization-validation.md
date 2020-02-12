---
title: Organization Validation
summary: Validates organizations using checks
---

## Overview

For selected payers, organizations can be validated using two checks. Note that the words "validated" and "verified" are used indiscriminately in all aspects of this process.

Organization validation comprises three components:

-   Checking the validation status
-   Prompting the user for check information
-   Securing the back end

Generally, your application workflow should be:

1. Get user inputs, including the organization they're using
2. On submit, interrupt submission and check the organization's validation status
3. If the organization status is `VERIFIED`, skip to _step 6_
4. If the organization status is not `VERIFIED`, prompt the user for check information via the modal window
5. After the check information modal window is dismissed, loop back to _step 2_.
6. Allow submission, and on the back end, validate the organization again to guard against any request tampering

## Checking Validation Status

You can check the validation status of an organization by calling the Organization Validations endpoint. Validation is always performed in the context of an application, denoted by an application ID and a payer ID.

**Note: If organization validation has not been enabled for a specific application ID / payer ID combination, the organization will always show as `VERIFIED`.**

```
GET api/internal/v1/organization-validations
```

### Parameters

> The client must send all parameters

-   **applicationId** - The application ID for which to validate the organization. Accepts a single application ID parameters.
-   **customerId** — The customer ID of the organization to validate. Accepts a single customer ID parameter.
-   **payerId** - The payer ID of the application for which to validate the organization. Accepts a single payer ID parameter.

### Example Request

```
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

-   **LOCKED** - The organization has been locked, and will require manual intervention from Availity to unlock.
-   **UNVERIFIED** - The organization has not yet been verified.
-   **VERIFIED** - The organization has been verified.

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

![Figure 1: Check Validation Modal](check-validation.png)

## Securing the Back End

Generally, your application will make a call to your own back end services through the Availity proxy. When this is the case, open a request to Availity to secure the particular proxy configuration for organization validation. Note that you will need to pass the customer ID of the organization for validation in your proxy call.
