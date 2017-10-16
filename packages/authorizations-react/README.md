# React Authorizations

A package providing a base authorizations class to help check which permissions a user has.

## Install
`npm install @availity/authorizations-react`

## Configuration

`AvAuthorizations` uses `AvPermissions`, and `AvRegions` from [Api-React](../api-react). To configure their default options,  `AvAuthorizations` takes in an options object that is passed onto them.

```javascript
  import AvAuthorizations from '@availity/authorizations-react';
  new AvAuthorizations(config);
```

## Methods

For all methods, if no region is passed in, defaults to current region.

### isAuthorized

`isAuthorized(permissionId, region)` resolves to true or false if the current user has access to this permissionId in this region.

### `isAnyAuthorized`

`isAnyAuthorized(permissionIds, region)` resolves to true or false if the current user has access to any of these permissionIds in this region.

### `getPermission`

`getPermission(permissionId, region)` resolves to the permission object for this permissionId in this region.

### `getPermissions`

`getPermissions(permissionIds, region)` resolves to an array of permission objects for these permissionIds in this region.

### `getOrganizations`

`getOrganizations(permissionId, region)` resolves to the organizations array for this permissionId, will be empty if not authorized

### `getPayers`

`getPayers(permissionId, organizationId, region)` will check permissionId for an organization with `organizationId` and resolve to its `resources` or an empty array.

## Authors
**Kasey Powers**
* [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License
[MIT](../../LICENSE)
