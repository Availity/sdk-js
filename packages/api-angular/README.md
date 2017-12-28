# api-angular

A package wrapping [@av/api-core](../api-core/README.md) with Angular `$http`.

## Install
`npm install @availity/api-angular @availity/api-core @availity/localstorage-core --save`

## Usage
```javascript
import availityApi from '@availity/api-angular';
angular.module('app', [
  availityApi
]);
```

Inject one of the predefined API classes in a controller or service:
```javascript
app.service('myCustomService', avUsersApi => {
 return avUsersApi.me();
});
```

## API Definitions
> The services below can be injected into other services or controllers 
- `avPdfApi`
- `avNavigationApi`
- `avNotificationsApi`
- `avOrganizationsApi`
- `avPermissionsApi`
- `avProvidersApi`
- `AvProxyApi`
- `avRegionsApi`
- `avSpacesApi`
- `avUsersApi`
- `avUserPermissionsApi`



```js
app.service('myCustomService', (avPdfApi, avNavigationApi, avNotificationApi, avOrganizationsApi, avPermissionsApi, avProvidersApi, AvProxyApi, avRegionsApi, avSpacesApi, avUsersApi, avUserPermissionsApi) => {
 // code
});
```

## Options
Configure the default options:
```javascript
config(avApiOptionsProvider => {
  avApiOptionsProvider.setOptions({
    version: 'v2'
  });
});
```

## Create New API Definitions
Create new API definitions by extending `AvApi`. Extending `AvApi` provides services the behaviors described in [@api-core/README#features](../api-core/README.md#features)

```js
function factory(AvApi) {
    class AvExampleResource extends AvApi {
        constructor() {
            super({
                name: 'exampleApi'
            });
        }
    }
    return new AvExampleResource();
}
```
