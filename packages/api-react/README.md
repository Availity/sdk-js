# React API

A package wrapping the base api class with axios and ES6 Promise

More details about configuration can be found in [Api-Core](../api-core)

## Install

`npm install @availity/api-react`;

## Configuration

all resources are configured by passing in options to its constructor. Unlike AvApi it does not require an http or promise library

```javascript
  new AvApiResource(config);
```

## Resources

All resources build the same as in [Api-Core](../api-core) except without the http and Promise parameters.

* `new ApiResource(config)`
* `new LogMessagesResource(config)`
* `new NavigationResource(config)`
* `new OrganizationsResource(AvUsersResource, config)`
* `new PermissionsResource(config)`
* `new ProvidersResource(config)`
* `new ProxyResource(config)`
* `new RegionsResource(AvUsersResource, config)`
* `new SpacesResource(config)`
* `new UsersResource(config)`
* `new UserPermissionsResource(config)`

## Authors
**Kasey Powers**
* [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License
[MIT](../../LICENSE)
