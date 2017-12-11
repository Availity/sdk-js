#  api-axios

A package wrapping the base api class with axios and ES6 Promise. More details about configuration can be found in [api-core](../api-core/)

## Install

```
npm install @availity/api-axios @availity/api-core --save;
```

## Configuration

All resources are configured by passing in options to its constructor. Unlike `AvApi` it does not require an http or promise library

```javascript
  new AvApiResource(config);
```

## Resources

### Proxy

```js
import { ProxyApi } from '@availity/api-axios'

const myProxy = new AvProxy({ tenant: 'healthplan' });
```
