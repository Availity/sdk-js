# api-angular

A package wrapping `@av/api-core` with Angular `$http`.

## Install
`npm install @availity/api-angular @availity/api-core @availity/localstorage-core --save`

## Usage
```javascript
import availityApi from '@availity/api-angular';
angular.module('app', [
  availityApi
]);
```

Inject one of the predefined API class a controller or service:
```javascript
app.service('myCustomService', avUsersApi => {
 return avUsersApi.me();
});
```

## API Definitions:
> Names below can be inject into any Angular service or controller
- `avLogMessagesApi`
- `avPdfApi`
- `avNavigationApi`
- `avNotificationApi`
- `avOrganizationsApi`
- `avPermissionsApi`
- `avProvidersApi`
- `AvProxyApi`
- `avRegionsApi`
- `avSpacesApi`
- `avUsersApi`
- `avUserPermissionsApi'`

## Options
Configure the default options:
```javascript
config(avApiOptionsProvider => {
  avApiOptionsProvider.setOptions({
    version: 'v2'
  });
});
```

## Extending AvApiResource
The AvApi is an extendable class to create new resources with

```javascript
  function factory(AvApiResource) {
    class AvExampleResource extends AvApiResource {
      constructor() {
        super({
          name: 'exampleApi'
        });
      }
    }
    return new AvExampleResource();
  }
```

## API Definitions
