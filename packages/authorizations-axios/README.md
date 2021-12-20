# @availity/authorizations-axios

> A package providing a base authorizations class to help check which permissions a user has.

[![Version](https://img.shields.io/npm/v/@availity/authorizations-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/authorizations-axios)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/authorizations-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/authorizations-axios)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/authorizations-axios?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/authorizations-axios/package.json)

## Install

### NPM

```bash
npm install @availity/authorizations-axios
```

### Yarn

```bash
yarn add @availity/authorizations-axios
```

## Configuration

`AvAuthorizations` uses `AvPermissions`, and `AvRegions` from [Api-Axios](../api-axios). To configure their default options, `AvAuthorizations` takes in an options object that is passed onto them.

```js
import AvAuthorizations from '@availity/authorizations-axios';
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

- [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License

[MIT](../../LICENSE)
