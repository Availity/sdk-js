---
title: Authorization
---

A package providing a base authorizations class to help check which permissions a user has.

[![Version](https://img.shields.io/npm/v/@availity/authorizations-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/authorizations-core)

## Installation

### NPM

```bash
npm install @availity/authorizations-axios @availity/api-axios
```

### Yarn

```bash
yarn add @availity/authorizations-axios @availity/api-axios
```

## Usage

`@availity/authorizations-axios` exports a pre-configured singleton that uses `AvPermissionsApi` and `AvRegionsApi` from [@availity/api-axios](/api/axios-resources/). You do not need to provide these yourself.

```js
import avAuthorizations from '@availity/authorizations-axios';

// Check if the user is authorized for a given permission
const authorized = await avAuthorizations.isAuthorized('7890', 'FL');
```

## Methods

For all methods, if no `region` is passed in, it defaults to the current region (resolved via `avRegionsApi.getCurrentRegion()`). Permissions are cached after the first fetch — subsequent calls for the same permission/region return cached results without additional network requests.

### `isAuthorized(permissionId, region)`

Returns `Promise<boolean>` — `true` if the current user has access to the permission in the given region.

```js
import avAuthorizations from '@availity/authorizations-axios';

const canAccess = await avAuthorizations.isAuthorized('7890');
if (canAccess) {
  // show feature
}
```

### `isAnyAuthorized(permissionIds, region)`

Returns `Promise<boolean>` — `true` if the current user has access to **any** of the permissions in the given region.

```js
const canAccessAny = await avAuthorizations.isAnyAuthorized(['7890', '7891']);
```

### `getPermission(permissionId, region)`

Returns `Promise<{ id, isAuthorized, organizations, geographies }>` — the full permission object.

```js
const permission = await avAuthorizations.getPermission('7890');
// {
//   id: '7890',
//   isAuthorized: true,
//   organizations: [{ id: '1234', resources: [...] }],
//   geographies: []
// }
```

### `getPermissions(permissionIds, region)`

Returns `Promise<Array<{ id, isAuthorized, organizations, geographies }>>` — an array of permission objects.

```js
const permissions = await avAuthorizations.getPermissions(['7890', '7891']);
```

### `getOrganizations(permissionId, region)`

Returns the `organizations` array for the given permission. Will be empty if not authorized.

```js
const orgs = await avAuthorizations.getOrganizations('7890');
// [{ id: '1234', resources: [...] }]
```

### `getPayers(permissionId, organizationId, region)`

Returns the `resources` array for the given organization within the permission. Returns an empty array if the organization is not found.

```js
const payers = await avAuthorizations.getPayers('7890', '1234');
// [{ id: 'payer1', ... }]
```
