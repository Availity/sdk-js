# @availity/api-axios

> A package wrapping [axios](https://github.com/axios/axios) to help fetch data inside the Availity Portal

[![Version](https://img.shields.io/npm/v/@availity/api-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-axios)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/api-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-axios)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/api-axios?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/api-axios/package.json)

### What's new in version 6?

If you are looking for the old docs you can find them [here](./READMEv5)

- `@availity/api-core` is no longer required. It has been added to this package
- Switch to `lodash/merge` for merging config
- Change how args are passed to `AvApi` constructor
- Require a single version of `axios` instead of a range
- Update to use `async/await` where applicable

## Install

### NPM

```bash
npm install @availity/api-axios axios
```

### Yarn

```bash
yarn add @availity/api-axios axios
```

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/api/getting-started)

## Available Resources

This library exports several resources other than the `AvApi` class. There are several available classes which extend `AvApi` or `AvMicroserviceApi`. They offer the benefit of having pre-defined urls, and some even have methods available for easier data fetching.

The class for each resource is exported with a capital `A` while the instance is exported with a lowercase `a`. For example, `AvUserApi` vs `avUserApi`. If you need to extend the functionality of the resource then we recommend using the class. Otherwise, we recommend using the instance.

Details about each api can be found [here](../api-axios/src/resources/README.md)

- `AvMicroserviceApi`
- `AvProxyApi`
- `AvCodesApi`
- `AvDisclaimersApi`
- `AvFilesApi`
- `AvFilesDeliveryApi`
- `AvLogMessagesApi`
- `AvLogMessagesApiV2`
- `AvNavigationApi`
- `AvNotificationApi`
- `AvOrganizationsApi`
- `AvPdfApi`
- `AvPermissionsApi`
- `AvProvidersApi`
- `AvRegionsApi`
- `AvRouteConfigurationsApi`
- `AvSettingsApi`
- `AvSlotMachineApi`
- `AvSpacesApi`
- `AvTelemetryApi`
- `AvUserApi`
- `AvUserPermissionsApi`
- `AvWebQLApi`

## Usage

### Extending `AvApi`

Create new API definitions by extending `AvApi`.

```js
import AvApi from '@availity/api-axios';

class AvExampleResource extends AvApi {
  constructor() {
    super({
      name: 'exampleApi',
    });
  }
}

export const avExampleResource = new AvExampleResource();

export default AvExampleResource;
```

### Creating an instance of your api

You can use `AvApi` to create a new instance that will make connecting to an endpoint much easier

```js
import AvApi from '@availity/api-axios';

// Passing in claims as the name here means the url
// will get set to /api/v1/claims
// Now we can use the available functions to hit that url
const MyApi = new AvApi({ name: 'claims' });

// Create a function that will get entry with the id we pass in
// url will be /api/v1/claims/{id}
async function getClaim(id) {
  const response = await MyApi.get(id);
  return response.data;
}
```

### Using a pre-defined resource

Some of the pre-defined classes already have functions available to help make fetching data easier. One example is `avUserApi`. It has a method `me` which will fetch the currently logged in user

```js
import { avUserApi } from '@availity/api-axios';

async function getUser() {
  const user = await avUserApi.me();
  return user;
}
```

## Creating Proxy API Definitions

Create new API definitions by extending `AvProxyApi`. Extending `AvProxyApi` provides services the behaviors described in [@api-core/README#features](../api-core/README.md#features) as well as building the url to match your tenant's proxy REST conventions.

```js
import { AvProxyApi } from '@availity/api-axios';

class AvExampleResource extends AvProxyApi {
  constructor() {
    super({
      tenant: 'myhealthplan',
      name: 'patients',
    });
  }
}

export default new AvExampleResource();
```
