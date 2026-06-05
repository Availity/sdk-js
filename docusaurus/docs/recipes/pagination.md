---
title: Pagination
---

# Pagination with `all()` and `getPage()`

The `AvApi` base class provides two pagination helpers for working with paginated REST endpoints.

## `all()` — Fetch Everything

Use `all()` when you need the complete dataset and the total size is manageable:

```js
import { avOrganizationsApi } from '@availity/api-axios';

// Fetches all pages automatically and combines results
const response = await avOrganizationsApi.all();
const allOrgs = response.data.organizations;
```

`all()` works by repeatedly calling the API, incrementing the offset until all records are returned. It respects the API's `totalCount` to know when to stop.

### With Query Parameters

```js
import { avProvidersApi } from '@availity/api-axios';

const response = await avProvidersApi.all({
  params: { customerId: '1234' },
});
```

### When to Use

- Populating a dropdown with all options
- Building a local search/filter over a small-to-medium dataset
- Exporting all records

### When NOT to Use

- Datasets with thousands of records (use manual pagination instead)
- When you only need the first page or a specific page
- Real-time UIs where loading all data upfront would be slow

## `getPage()` — Fetch a Specific Page

Use `getPage()` for manual pagination with page numbers:

```js
import { avProvidersApi } from '@availity/api-axios';

// getPage(page, config, limit)
const page1 = await avProvidersApi.getPage(1, {
  params: { customerId: '1234' },
});
const page2 = await avProvidersApi.getPage(2, {
  params: { customerId: '1234' },
});
```

### Parameters

- **page** — 1-based page number
- **config** — Standard request config (params, headers, etc.)
- **limit** — Items per page (optional, uses API default if omitted)

### Controlling Page Size

```js
// 25 items per page, get page 3
const response = await avProvidersApi.getPage(3, {}, 25);
```

## Building a Paginated UI

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'claims' });

const fetchPage = async (pageNumber, pageSize = 50) => {
  const response = await api.getPage(
    pageNumber,
    {
      params: { status: 'pending' },
    },
    pageSize
  );

  const { totalCount, limit, offset } = response.data;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    items: response.data.claims,
    currentPage: pageNumber,
    totalPages,
    totalCount,
  };
};
```

## Polling and Long-Running Queries

Some API endpoints return `202` for large queries that take time to process. `AvApi` handles this automatically when `config.polling` is `true` (the default):

```js
const api = new AvApi({ name: 'reports' });

// If the server returns 202, AvApi will poll at intervals:
// 1s, 2s, 5s, 10s — then stop and return the last response
const response = await api.query({
  params: { dateRange: '2024-01-01/2024-12-31' },
});
```

### Custom Polling Intervals

```js
const api = new AvApi({
  name: 'reports',
  pollingIntervals: [1000, 3000, 5000, 10000, 15000], // custom backoff
});
```

### Disabling Polling

```js
const api = new AvApi({
  name: 'quick-lookup',
  polling: false, // 202 responses returned as-is
});
```
