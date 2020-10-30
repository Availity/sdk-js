---
title: Navigation Spaces
---

A Navigation object returns the navigational hierarchy in the portal and lists the id, name, link, permissions, dates, child or parent ids, and icon information associated.

## GET /api/sdk/platform/v1/navigation/spaces

Find navigational objects using the spaces API. The request parameters act as filters on the collection.

### Parameters

> The client must send at least one of the following: `id`, `customerId`, `userId` or `q`.

-   **id** _(optional)_ — Allows the client to retrieve multiple spaces by their ids. Accepts multiple `id` parameters.
-   **authorized** _(optional)_ — Allows the client to filter by whether the current user is authorized for the spaces.
-   **region** _(optional)_ - Allows the client to filter by regions. Accepts multiple `region` parameters.
-   **output** _(optional)_ - Allows the client to retrieve result data by level. Allowed values: `sparse` or `full`.
-   **includeInactive** _(optional)_ - Allows the client to retrieve inactive spaces.
-   **ignoreOverrides** _(optional)_ - Allows the client to ignore any environment-specific overrides.
-   **childless** \_(optional) - Whether to retrieve spaces without children to the results.
-   **depth** _(optional)_ - Allows the client to specify the depth of the tree to return (0 = no limits).
-   **filterOnRegion** _(optional)_ - Allows the client to filter by region or only use the region for permission checks.
-   **offset** _(optional)_ - Paging offset. Defaults to `0`. This is the zero-based index of the first item to return.
-   **limit** _(optional)_ - Paging limit. Defaults to `50`. The maximum is `50`. This is the maximum number of items to return.

### Example Request

```
GET https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2
```

### Example Response

```javascript
{
  "totalCount" : 54,
  "count" : 2,
  "offset" : 0,
  "limit" : 2,
  "links" : {
    "next" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2&offset=2"
    },
    "last" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2&offset=53"
    },
    "self" : {
      "href" : "https://apps.availity.com/api/sdk/platform/v1/navigation/spaces?region=TX&limit=2"
    }
  },
  "spaces" : [ {
    "id" : "acme",
    "name" : "Acme",
    "description" : "Acme",
    "link" : {
      "text" : "Acme",
      "url" : "/availity/ServiceRegistrationServlet?menuTempl=6248",
      "target" : "newBody"
    },
    "version" : "1.0.0",
    "type" : "navigation",
    "brand" : {
      "name" : "Availity",
      "id" : "21907"
    },
    "owners" : [ {
      "id" : "aka86041677777"
    } ],
    "feature" : { },
    "permissions" : [ "6248" ],
    "icons" : {
      "dashboard" : "icon-doc-alt"
    },
    "activeDate" : "2016-03-31T20:08:00.000-0400",
    "createDate" : "2016-03-22T15:04:27.000-0400",
    "updateDate" : "2017-11-15T11:13:22.000-0500",
    "parentIds" : [ "enrollments_center_links" ],
    "hasAccess" : false
    }, {
    "id" : "Request Roster",
    "name" : "Request Roster",
    "description" : "Request Roster",
    "link" : {
      "text" : "Request Roster",
      "url" : "/availity/common/linkout_disclaimer.jsp",
      "target" : "_blank"
    },
    "version" : "1.0.0",
    "type" : "navigation",
    "brand" : {
      "name" : "Availity",
      "id" : "21907"
    },
    "owners" : [ {
      "id" : "aka86041677777"
    } ],
    "feature" : { },
    "permissions" : [ "7065" ],
    "activeDate" : "2016-03-14T18:14:00.000-0400",
    "createDate" : "2016-03-22T15:04:27.000-0400",
    "updateDate" : "2017-06-30T15:29:43.000-0400",
    "parentIds" : [ ],
    "metadata" : {
      "ghostText" : "This link has been moved to Payer Spaces/Resources.",
      "ghosted" : "true"
    },
    "hasAccess" : true
  } ]
}
```

## GET /api/sdk/platform/v1/navigation/spaces/:id

Retrieves a navigation space by its id.

### Example Request

    GET https://apps.availity.com/api/sdk/platform/v1/navigation/spaces/eligibility_benefits

### Example Response

```javascript
{
  "id" : "eligibility_benefits",
  "name" : "Eligibility and Benefits Inquiry",
  "shortName" : "EB",
   "description" : "Eligibility and Benefits Inquiry",
  "link" : {
    "text" : "Eligibility and Benefits Inquiry",
    "url" : "/public/apps/eligibility?cachebust=1454552674322",
    "target" : "newBody"
  },
  "version" : "1.0.0",
  "type" : "navigation",
  "keywords" : [ "benefits", "e&b", "carecalc", "care cost estimator", "inquiry", "patient", "service", "eligibility", "270", "copay", "benefit", "care calc" ],
  "brand" : {
    "name" : "Availity",
    "id" : "21907"
  },
  "owners" : [ {
    "id" : "aka86041677773",
    "name" : "Availity"
  } ],
  "permissions" : [ "7457", "7458", "7181" ],
  "icons" : {
    "navigation" : "app-icon-orange"
  },
  "activeDate" : "2016-03-08T16:27:23.000-0500",
  "createDate" : "2016-03-22T15:04:27.000-0400",
  "updateDate" : "2018-02-09T12:14:55.000-0500",
  "parentIds" : [ "top_applications", "patient_registration" ]
}
```
