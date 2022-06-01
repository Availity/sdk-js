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

`AvAuthorizations` uses `AvPermissionsApi` and `AvRegionsApi` which can be found in [@availity/api-axios](/api/axios-resources/). You do not need to provide these yourself.

```js
import AvAuthorizations from '@availity/authorizations-axios';

const authApi = new AvAuthorizations();
```

## Methods

For all methods, if no region is passed in, defaults to current region.

### `isAuthorized(permissionId, region)`

Returns true or false if the current user has access to the permission in the given region.

### `isAnyAuthorized(permissionIds, region)`

Returns true or false if the current user has access to any of the permissions in the given region.

### `getPermission(permissionId, region)`

Returns the permission object for the given permissionId and region.

### `getPermissions(permissionIds, region)`

Returns an array of permission objects for the permissionIds in the given region.

### `getOrganizations(permissionId, region)`

Returns the organizations array for the permissionId. Will be empty if not authorized.

### `getPayers(permissionId, organizationId, region)`

Check the permissionId for an organization with `organizationId`. Returns its `resources` or an empty array.
