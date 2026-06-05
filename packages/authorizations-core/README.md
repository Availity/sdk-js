# @availity/authorizations-core

> Base authorizations class to help check which permissions a user has.

[![Version](https://img.shields.io/npm/v/@availity/authorizations-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/authorizations-core)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/authorizations-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/authorizations-core)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/authorizations-core?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/authorizations-core/package.json)

## Install

### NPM

```bash
npm install @availity/authorizations-core
```

### Yarn

```bash
yarn add @availity/authorizations-core
```

## Usage

This is the base class used by `@availity/authorizations-axios`. Most consumers should use that package directly.

```js
import AvAuthorizations from '@availity/authorizations-core';

const authorizations = new AvAuthorizations(avPermissions, avRegions, Promise);

// Check if a user is authorized for a permission
const authorized = await authorizations.isAuthorized('1234', 'FL');

// Check if authorized for any of multiple permissions
const anyAuthorized = await authorizations.isAnyAuthorized(['1234', '5678'], 'FL');

// Get the full permission object
const permission = await authorizations.getPermission('1234', 'FL');

// Get organizations for a permission
const orgs = await authorizations.getOrganizations('1234', 'FL');

// Get payers for a permission and organization
const payers = await authorizations.getPayers('1234', 'org-id', 'FL');
```

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/api/authorizations)
