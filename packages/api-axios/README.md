#  api-axios

A package wrapping [@av/api-core](../api-core/README.md) with axios and native ES6 Promise. 


## Install

```
npm install @availity/api-axios @availity/api-core @availity/localstorage-core --save
```

Polyfill `Promise` if needed:

```js
npm install es6-promise --save
```

## Usage

```js
import { userApi } from '@availity/api-axios'

function async getUser() {
    const user = await userApi.me();
}
```

## API Definitions

- `navigationApi`
- `notificationApi`
- `organizationsApi`
- `permissionsApi`
- `providersApi`
- `regionsApi`
- `pdfApi`
- `spacesApi`
- `userApi`
- `userPermissionsApi`

```js
// complete example
import { navigationApi, notificationApi, organizationsApi, permissionsApi, providersApi, regionsApi, pdfApi, spacesApi, userApi, userPermissionsApi } from '@availity/api-axios'
```

## Create New API Definitions
Create new API definitions by extending `AvApi`. Extending `AvApi` provides services the behaviors described in [@api-core/README#features](../api-core/README.md#features)

```js
import AvApi from '@availity/api-axios';
class AvExampleResource extends AvApi {
    constructor() {
        super({
            name: 'exampleApi'
        });
    }
}
export default new AvExampleResource();
```

## Create New Proxy API Definitions
Create new API definitions by extending `AvApi`. Extending `AvApi` provides services the behaviors described in [@api-core/README#features] (../api-core/README.md#features) as well as building

```js
import AvApi from '@availity/api-axios';
class AvExampleResource extends AvApi {
    constructor() {
        super({
            name: 'exampleApi'
        });
    }
}
export default new AvExampleResource();
```

