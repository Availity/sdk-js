# Angular localStorage

Angular service for Availity localStorage.

## Install
`npm install @availity/localstorage-angular`

## Usage

add module to your app.

```javascript
import LocalStorage from '@availity/localstorage-angular';

angular.module('app', [
  LocalStorage
])
.service('ExampleService', class ExampleService{
  static $inject = ['AvLocalStorage']
  constructor(AvLocalStorage) {
    this.AvLocalStorage = AvLocalStorage;
  }
});
```

## Methods

### supportsLocalStorage

returns boolean result of check if localStorage is supported.

### get

`get(key)` returns value stored at `key`, will attempt to parse JSON stored there.

### set

`set(key, value)` sets `key` to `value` in localStorage. Will stringify objects if needed.

### remove

`remove(key)` removes `key` from localStorage.

### getKeys

`getKeys(searchKey)` returns array of all keys that match the `searchKey` string or RegExp.

### removeKeys

`removeKeys(searchKey)` remove all keys that match the `searchKey` string or RegExp.

### getSessionBust

`getSessionBust()` returns session key set by Availity on login.

## Authors
**Kasey Powers**
* [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License
[MIT](../../LICENSE)
