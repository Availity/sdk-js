# Angular API

A package wrapping the base api class into angular

More details about configuration can be found in [Api-Core](../api-core)

## Install
`npm install @availity/api-angular`

add module to your app.

```javascript
import AvailityApi from '@availity/api-angular';
angular.module('app', [
  AvailityApi
]);
```

To configure the default Options
```javascript
config(AvApiOptionsProvider => {
  AvApiOptionsProvider.setOptions({
    version: 'v2'
  });
});
```

## Creating Resources
The AvApiResource is an extendable class to create new resources with

```javascript
  function AvExampleResourceFactory(AvApiResource) {
    class AvExampleResource extends AvApiResource {
      constructor() {
        const options = {
          name: 'exampleApi'
        };
        super(options);
      }
    }
    return new AvExampleResource();
  }
  AvExampleResourceFactory.$inject = ['AvApiResource'];
```

Predefined Resources are:
* `AvApiResource`
* `AvLogMessagesResource`
* `AvNavigationResource`
* `AvOrganizationsResource`
* `AvPermissionsResource`
* `AvProvidersResource`
* `AvProxyResource`
* `AvRegionsResource`
* `AvSpacesResource`
* `AvUsersResource`
* `AvUserPermissionsResource`


## Authors
**Kasey Powers**
* [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License
[MIT](../../LICENSE)
