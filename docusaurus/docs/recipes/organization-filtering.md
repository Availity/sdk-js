---
title: Filtering Organizations
---

# Filtering Organizations by Permissions & Resources

A common need is showing only the organizations where a user has specific permissions and access to specific resources (e.g., payers). The `AvOrganizationsApi` provides built-in filtering through its `postGet` method.

## Basic Setup

```js
import { avOrganizationsApi } from '@availity/api-axios';
```

## Simple Filter: One Permission

Show organizations where the user has a single permission:

```js
const response = await avOrganizationsApi.postGet(
  { region: 'FL' },
  {},
  { permissionIds: ['7890'] }
);

const orgs = response.data.authorizedFilteredOrgs;
```

## Filter by Permission + Resources

Show organizations where the user has a permission AND the organization has specific payer resources:

```js
const response = await avOrganizationsApi.postGet(
  { region: 'FL' },
  {},
  {
    permissionIds: ['7890'],
    resourceIds: ['1234', '5678'], // payer IDs — OR logic
  }
);

const orgs = response.data.authorizedFilteredOrgs;
// Only orgs with permission 7890 AND at least one of the resources
```

## AND/OR Logic

Both `permissionIds` and `resourceIds` support nested arrays for complex logic:

```js
// OR: user needs ANY of these permissions
const orFilter = { permissionIds: ['7890', '7891'] };

// AND + OR: (perm1 AND perm2) OR perm3
// User must have BOTH 7890 and 7891, OR just 7892
const andOrFilter = { permissionIds: [['7890', '7891'], '7892'] };

// Same logic works for resources
// Org must have (resource A AND resource B) OR resource C
const resourceFilter = { resourceIds: [['resA', 'resB'], 'resC'] };
```

### Full AND/OR Example

```js
const response = await avOrganizationsApi.postGet(
  { region: 'FL' },
  {},
  {
    // User must have (claims AND eligibility) OR referrals
    permissionIds: [['1001', '1002'], '1003'],
    // Org must have Aetna OR Cigna
    resourceIds: ['payer-aetna', 'payer-cigna'],
  }
);
```

## Pagination

The `postGet` method handles pagination automatically. Pass `limit` and `offset` in the data:

```js
const page1 = await avOrganizationsApi.postGet(
  { region: 'FL', limit: 50, offset: 0 },
  {},
  { permissionIds: ['7890'], resourceIds: ['1234'] }
);

const { authorizedFilteredOrgs, totalCount, limit, offset } = page1.data;

// Fetch next page
const page2 = await avOrganizationsApi.postGet(
  { region: 'FL', limit: 50, offset: 50 },
  {},
  { permissionIds: ['7890'], resourceIds: ['1234'] }
);
```

## Caching Behavior

The API caches permission lookups by region and permission IDs. If you paginate with the same permissions and region, only the organization query is re-fetched — the permission check is cached from the first call. The cache resets when the region or permissions change.

## With React (AvOrganizationSelect)

If you're using React, the [AvOrganizationSelect](https://availity.github.io/availity-react/form/select/components/organization-select) component wraps this API with a dropdown UI. Pass `resourceIds` as a prop:

```jsx
<AvOrganizationSelect resourceIds={['1234', '5678']} permissionIds={['7890']} />
```
