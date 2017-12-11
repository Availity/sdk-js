# Angular API

A package wrapping the base api class into angular

More details about configuration can be found in [Api-Core](../api-core)

## Install
`npm install @availity/api-angular @availity/api-core --save`

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
The AvApi is an extendable class to create new resources with

```javascript
  function factory(AvApiResource) {
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
```
