# api-axios

> A package wrapping [@availity/api-core](../api-core/README.md) with axios and native ES6 Promise.

[![Version](https://img.shields.io/npm/v/@availity/api-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-axios)

## Install

### NPM

```bash
npm install @availity/api-axios @availity/api-core
```

### Yarn

```bash
yarn add @availity/api-axios @availity/api-core
```

Polyfill `Promise` if needed:

### NPM

```bash
npm install es6-promise
```

### Yarn

```bash
yarn add es6-promise
```

## Usage

```js
import { avUserApi } from '@availity/api-axios';

async function getUser() {
  const user = await avUserApi.me();
  return user;
}
```

## API Definitions

- `AvMicroserviceApi`
- `AvProxyApi`
- `avCodesApi`
- `avDisclaimersApi`
- `avFilesApi`
- `avFilesDeliveryApi`
- `avLogMessagesApi`
- `avLogMessagesApiV2`
- `avNavigationApi`
- `avNotificationApi`
- `avOrganizationsApi`
- `avPdfApi`
- `avPermissionsApi`
- `avProvidersApi`
- `avRegionsApi`
- `AvRouteConfigurationsApi`
- `avSettingsApi`
- `avSlotMachineApi`
- `avSpacesApi`
- `avTelemetryApi`
- `avUserApi`
- `avUserPermissionsApi`
- `avWebQLApi`

Details about each api can be found [here](../api-core/src/resources/README.md)

```js
// complete example
import AvApi, {
  AvMicroserviceApi,
  AvProxyApi,
  avCodesApi,
  avDisclaimersApi,
  avFilesApi,
  avFilesDeliveryApi,
  avLogMessagesApi,
  avLogMessagesApiV2,
  avNavigationApi,
  avNotificationApi,
  avOrganizationsApi,
  avPdfApi,
  avPermissionsApi,
  avProvidersApi,
  avRegionsApi,
  avRouteConfigurationsApi,
  avSettingsApi,
  avSlotMachineApi,
  avSpacesApi,
  avTelemetryApi,
  avUserApi,
  avUserPermissionsApi,
  avWebQLApi,
} from '@availity/api-axios';
```

## Create API Definitions

Create new API definitions by extending `AvApi`. Extending `AvApi` provides services the behaviors described in [@api-core/README#features](../api-core/README.md#features)

```js
import AvApi from '@availity/api-axios';

class AvExampleResource extends AvApi {
  constructor() {
    super({
      name: 'exampleApi',
    });
  }
}

export default new AvExampleResource();
```

## Create Proxy API Definitions

Create new API definitions by extending `AvApiProxy`. Extending `AvApiProxy` provides services the behaviors described in [@api-core/README#features](../api-core/README.md#features) as well as building the url to match your tenant's proxy REST conventions.

```js
import { AvApiProxy } from '@availity/api-axios';

class AvExampleResource extends AvApiProxy {
  constructor() {
    super({
      tenant: 'myhealthplan',
      name: 'patients',
    });
  }
}

export default new AvExampleResource();
```
