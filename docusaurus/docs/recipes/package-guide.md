---
title: Which Package Do I Use?
---

This guide helps you choose the right package when multiple options exist for similar functionality.

## Core vs. Axios Packages

The SDK uses a layered architecture: **`-core`** packages contain HTTP-client-agnostic logic, and **`-axios`** packages wire them up with [axios](https://axios-http.com). Unless you have a specific reason to use a `-core` package, **always use the `-axios` variant**.

| Need | Use This | Not This |
| --- | --- | --- |
| Make API calls to Availity services | `@availity/api-axios` | `@availity/api-core` |
| Log client-side errors | `@availity/exceptions-axios` | `@availity/exceptions-core` |
| Check user permissions | `@availity/authorizations-axios` | `@availity/authorizations-core` |
| Download files | `@availity/dl-axios` | `@availity/dl-core` |

### When to use a `-core` package

Only use `-core` packages if you:

- Need to use a different HTTP client (e.g., `fetch`, a custom wrapper, or testing with mocks)
- Are building a framework-level integration that needs to remain HTTP-client-agnostic
- Need to extend the base class with custom behavior before wiring up the HTTP layer

## AvApi vs. AvMicroserviceApi

Both are in `@availity/api-axios`. The difference is the URL structure and default behaviors:

| | `AvApi` | `AvMicroserviceApi` |
| --- | --- | --- |
| **Base path** | `/api` | `/ms/api/availity/internal` |
| **Default version** | `/v1` | _(none)_ |
| **URL pattern** | `/api/v1/{name}` | `/ms/api/availity/internal/{name}` |
| **Caching** | Enabled by default | Disabled by default |
| **Polling** | Enabled (handles 202s) | Disabled |
| **Polling method** | `GET` | `POST` |
| **Use for** | Platform APIs (permissions, orgs, regions, users) | Internal microservices (files, webQL, custom services) |

### Which should I extend?

```js
import AvApi, { AvMicroserviceApi } from '@availity/api-axios';

// Extend AvApi for platform REST APIs
class MyPlatformApi extends AvApi {
  constructor() {
    super({ name: 'my-resource' }); // => /api/v1/my-resource
  }
}

// Extend AvMicroserviceApi for internal microservices
class MyInternalApi extends AvMicroserviceApi {
  constructor() {
    super({ name: 'my-service' }); // => /ms/api/availity/internal/my-service
  }
}
```

## File Handling: Upload vs. Download vs. Files

| Need | Package | Description |
| --- | --- | --- |
| Upload files to the vault | `@availity/upload-core` | Resumable uploads via tus protocol, virus scanning, progress tracking |
| Download files to the browser | `@availity/dl-axios` | Fetch binary data and trigger browser download dialog |
| Manage file metadata | `AvFilesApi` (from `@availity/api-axios`) | List, query, and get download URLs for uploaded files |
| Deliver files to payers | `AvFilesDeliveryApi` (from `@availity/api-axios`) | Submit files for delivery to payer systems |

Typical flow: Upload with `upload-core` → manage with `AvFilesApi` → deliver with `AvFilesDeliveryApi`.

## Environment & URL Utilities

| Need | Package |
| --- | --- |
| Get different values per environment (test/qa/prod) | `@availity/env-var` |
| Resolve relative URLs to absolute | `@availity/resolve-url` |

---

## SSO & Navigation

| Need | Package |
| --- | --- |
| Navigate to a payer portal via SSO (SAML/OpenID) | `@availity/native-form` |
| Keep session alive in portal iframe | `@availity/user-activity-broadcaster` |

## Validation & Documentation

| Need | Package |
| --- | --- |
| Define validation schemas | [yup](https://github.com/jquense/yup) (with `@availity/yup` extensions) |
| Convert yup schemas to human-readable docs | `@availity/dockyard` |

## Error Handling & Logging

| Need | Package |
| --- | --- |
| Automatic error capture + logging to Availity | `@availity/exceptions-axios` |
| Custom error logging transport | `@availity/exceptions-core` |
| Analytics event tracking | `@availity/analytics-core` |

## Decision Flowchart

```
Do you need to call an Availity API?
├── Yes → Is it a platform API (/api/v1/...)?
│   ├── Yes → Use AvApi or a pre-built resource from api-axios
│   └── No → Use AvMicroserviceApi
└── No → See specific utility packages above

Do you need the -core or -axios variant?
├── Using axios (default) → Use -axios
└── Custom HTTP client → Use -core
```
