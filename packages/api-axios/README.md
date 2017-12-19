#  api-axios

A package wrapping the base api class with axios and ES6 Promise. More details about configuration can be found in [api-core](../api-core/)

## Install

```
npm install @availity/api-axios @availity/api-core @availity/localstorage-core --save
```

## Usage

### Proxy

```js
import { userApi } from '@availity/api-axios'

function async getUser() {
    const user = await userApi.me();
}
```

## API Definitions

- `logMessagesApi`
- `navigationApi`
- `notificationApi`
- `organizationsApi`
- `permissionsApi`
- `providersApi`
- `regionsApi`
- `pdfApi`
- `spacesApi`
- `userApi`
- `userPermissionsAp`

