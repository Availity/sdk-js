---
title: Authorization
---

A package providing a base authorizations class to help check which permissions a user has.

[![Version](https://img.shields.io/npm/v/@availity/authorizations-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/authorizations-axios)

## When to Use This

Use `@availity/authorizations-axios` when your application needs to:

- Gate features by permission. Show or hide UI based on whether the user's organization has been granted a specific permission ID.
- Filter by organization or payer. Determine which organizations can access a feature, and which payers are available within each organization.
- Enforce access control client-side. Prevent users from accessing screens they don't have permissions for (complementing server-side enforcement).

## Understanding the Permission Model

Availity's permission model is hierarchical:

```
Permission (numeric ID, e.g., "7890")
  └── Organization (e.g., "Acme Health Org" #269194)
        └── Payer/Resource (e.g., "ACME" #12345)
```

- A **permission** represents access to a specific capability (identified by a numeric ID like `'7890'`).
- Each permission is scoped to one or more **organizations** the user belongs to.
- Within each organization, the permission may be further scoped to specific **payers** (called "resources" in the API response).
- A user **is authorized** for a permission if they have at least one organization with that permission granted.
- Permissions are also regional — a user may be authorized in Florida but not Texas.

## Installation

```bash
npm install @availity/authorizations-axios @availity/api-axios
```

## Quick Start

```js
import avAuthorizations from '@availity/authorizations-axios';

// Check if user has a specific permission in their current region
const canAccess = await avAuthorizations.isAuthorized('7890');

if (canAccess) {
  // Show feature
}
```

## Methods

All methods return Promises. If no `region` is passed, it defaults to the current region (resolved via `avRegionsApi.getCurrentRegion()`). Results are cached after the first fetch.

### `isAuthorized(permissionId, region?)`

Returns `Promise<boolean>` — `true` if the user has at least one organization with this permission.

```js
const canAccess = await avAuthorizations.isAuthorized('7890');
```

### `isAnyAuthorized(permissionIds, region?)`

Returns `Promise<boolean>` — `true` if the user has **any** of the listed permissions.

```js
// User needs at least one of these permissions
const canAccess = await avAuthorizations.isAnyAuthorized(['7890', '7891']);
```

### `getPermission(permissionId, region?)`

Returns `Promise<{ id, isAuthorized, organizations, geographies }>` — the full permission object.

```js
const permission = await avAuthorizations.getPermission('7890');
// {
//   id: '7890',
//   isAuthorized: true,
//   organizations: [
//     { id: '1234', name: 'Test Org', resources: [{ id: '5678', payerId: 'ACME' }] }
//   ],
//   geographies: []
// }
```

### `getPermissions(permissionIds, region?)`

Returns `Promise<Array<{ id, isAuthorized, organizations, geographies }>>` — an array of permission objects.

```js
const permissions = await avAuthorizations.getPermissions(['7890', '7891']);
```

### `getOrganizations(permissionId, region?)`

Returns `Promise<Array<{ id, customerId, name, resources }>>` — the organizations for the given permission. Empty array if not authorized.

```js
const orgs = await avAuthorizations.getOrganizations('7890');
// [{ id: '1234', name: 'Test Org', resources: [...] }]
```

### `getPayers(permissionId, organizationId, region?)`

Returns `Promise<Array<{ id, payerId, payerName }>>` — the resources for the given organization within the permission. Empty array if not found.

```js
const payers = await avAuthorizations.getPayers('7890', '1234');
// [{ id: '5678', payerId: 'ACME', payerName: 'ACME Corp' }]
```

## Combining with AvOrganizationsApi

If you need to filter organizations by permission and payer access, use `avOrganizationsApi.postGet()` which handles this server-side. See the [Filtering Organizations](/recipes/organization-filtering) recipe for the full pattern.

```js
import { avOrganizationsApi } from '@availity/api-axios';

// Get orgs where the user has permission '7890' and access to specific payers
const response = await avOrganizationsApi.postGet(
  { region: 'FL' },
  {},
  { permissionIds: ['7890'], resourceIds: ['payer-1', 'payer-2'] }
);

const orgs = response.data.authorizedFilteredOrgs;
```

## Caching Behavior

Permission results are cached in memory after the first fetch. This means:

- Multiple calls to `isAuthorized('7890')` only make one network request.
- If you need fresh data (e.g., after a permission change), create a new instance of the class.

## @availity/authorizations-core

The base class used by `authorizations-axios`. Use this only if you need to provide custom `avPermissions` and `avRegions` API instances (e.g., for testing or non-axios HTTP clients).

```js
import AvAuthorizations from '@availity/authorizations-core';
import { avUserPermissionsApi, avRegionsApi } from '@availity/api-axios';

const authorizations = new AvAuthorizations(avUserPermissionsApi, avRegionsApi, Promise);
```

The constructor requires:
- `avPermissions` — An API instance with a `getPermissions(ids, region)` method
- `avRegions` — An API instance with a `getCurrentRegion()` method
- `promise` — A Promise constructor (typically the global `Promise`)
