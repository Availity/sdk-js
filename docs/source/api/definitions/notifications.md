---
title: Notifications
summary: Notifications are sent to users to inform or notify them of actions that should be performed.
---

## GET /api/v1/notifications

Find notifications for the current user. The request parameters act as filters on the list.

### Parameters

-   **to.userSource** _(optional)_ — Filter by user source system (available to support users only)
-   **to.userId** _(optional)_ — Filter by user ids (available to support users only)
-   **nature** _(optional)_ — Filter by the specified nature(s). Accepts multiple `nature` parameters.
-   **type** _(optional)_ — Filter by specified type of notification.
-   **topic** _(optional)_ — Filter by specified topic of notification.
-   **includeRead** _(optional)_ — Include read notifications. Defaults to false.
-   **includeUnread** \_(optional) — Include unread notifications. Defaults to true.
-   **includeViewed** _(optional)_ — Include viewed notifications. Defaults to true.
-   **includeUnviewed** _(optional)_ — Include unviewed notifications. Defaults to true.
-   **includeInactive** _(optional)_ — Include inactive notifications. Defaults to false.
-   **includeSources** _(optional)_ — Include notification sources. Defaults to false.
-   **sortBy** _(optional)_ — Field to sort by. The default is 'lastDeliveryDate'.
-   **sortDirection** _(optional)_ — Sort direction. The default is 'desc'.

### Example Request

```
GET https://apps.availity.com/api/notifications?type=PDM&includeRead=true
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
      "href" : "https://apps.availity.com/api/v1/notifications?type=PDM&includeRead=true"
    }
  },
  "notifications" : [ {
    "id" : "83582901741516995037509300045112",
    "createdDate" : "2018-01-26T19:31:03.000+0000",
    "updatedDate" : "2018-03-02T16:20:08.000+0000",
    "nature" : "Action Item",
    "type" : "PDM",
    "subject" : "Provider Data Management",
    "title" : "Acme provider directory - We have not received your verified Q1 information.  Please submit&#x21;",
    "subtitle" : "Quarterly submissions build trust with patients that your information is correct and reliable.",
    "message" : "Acme provider directory - We have not received your verified Q1 information.  Please submit&#x21;",
    "link" : "&#x2f;public&#x2f;apps&#x2f;provider-self-service-maintenance&#x2f;&#x23;&#x2f;cms",
    "linkTarget" : "_blank",
    "activeDate" : "2018-03-01T19:30:31.000+0000",
    "expirationDate" : "2018-03-30T04:00:00.000+0000",
    "lastDeliveryDate" : "2018-03-01T19:30:32.000+0000",
    "topic" : "PDM",
    "read" : false,
    "viewed" : true,
    "interruptIndicator" : false
  } ]
}
```
