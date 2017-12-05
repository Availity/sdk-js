#  api-axios

A package wrapping the base api class with axios and ES6 Promise. More details about configuration can be found in [api-core](../api-core)

## Install

`npm install @availity/api-axios`;

## Configuration

All resources are configured by passing in options to its constructor. Unlike `AvApi` it does not require an http or promise library

```javascript
  new AvApiResource(config);
```

## Resources

All resources build the same as in [Api-Core](../api-core) except without the http and Promise parameters.

* `new AvApi(config)`
* `new LogMessagesApi(config)`
* `new NavigationApi(config)`
* `new OrganizationsApi(AvUsersApi, config)`
* `new PermissionsApi(config)`
* `new ProvidersApi(config)`
* `new ProxyApi(config)`
* `new RegionsApi(AvUsersApi, config)`
* `new SpacesApi(config)`
* `new UsersApi(config)`
* `new UserPermissionsApi(config)`
