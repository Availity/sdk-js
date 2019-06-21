# api-angular

> A package wrapping [@av/api-core](../api-core/README.md) with Angular `$http`.

[![Version](https://img.shields.io/npm/v/@availity/api-angular.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-angular)

## Install

`npm install @availity/api-angular @availity/api-core @availity/localstorage-core --save`

## Usage

```javascript
import availityApi from '@availity/api-angular';
angular.module('app', [availityApi]);
```

Inject one of the predefined API classes in a controller or service:

```javascript
app.service('myCustomService', avUsersApi => {
    return avUsersApi.me();
});
```

## API Definitions

> The services below can be injected into other services or controllers

-   `avApiOptions`
-   `AvMicroserviceApi`
-   `avLogMessagesApi`
-   `AvProxyApi`
-   `avPdfApi`
-   `avNavigationApi`
-   `avNotificationApi`
-   `avOrganizationsApi`
-   `avPermissionsApi`
-   `avProvidersApi`
-   `avRegionsApi`
-   `avSpacesApi`
-   `avUsersApi`
-   `avUserPermissionsApi`
-   `avFilesApi`
-   `avFilesDeliverApi`
-   `avSettingsApi`
-   `avCodesApi`

Details about each api can be found [here](../api-core/src/resources/README.md)

```js
app.service(
    'myCustomService',
    (
        avPdfApi,
        avNavigationApi,
        avNotificationApi,
        avOrganizationsApi,
        avPermissionsApi,
        avProvidersApi,
        AvProxyApi,
        avRegionsApi,
        avSpacesApi,
        avUsersApi,
        avUserPermissionsApi
    ) => {
        // code
    }
);
```

## Options

Configure the default options:

```javascript
config(avApiOptionsProvider => {
    avApiOptionsProvider.setOptions({
        version: 'v2',
    });
});
```

## Create API Definitions

Create API definitions by extending `AvApi`. Extending `AvApi` provides services the behaviors described in [@api-core/README#features](../api-core/README.md#features)

```js
function factory(AvApi) {
    class AvExampleResource extends AvApi {
        constructor() {
            super({
                name: 'exampleApi',
            });
        }
    }
    return new AvExampleResource();
}
```

## Create Proxy API Definitions

Create proxy API definitions by extending `AvApiProxy`. Extending `AvApiProxy` provides services the behaviors described in [@api-core/README#features](../api-core/README.md#features) as well as building the url to match your tenant's proxy REST conventions.

```js
function factory(AvApiProxy) {
    class AvExampleResource extends AvApiProxy {
        constructor() {
            super({
                tenant: 'myhealthplan',
                name: 'patients',
            });
        }
    }
    return new AvExampleResource();
}
```
