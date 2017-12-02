# LocalStorage Core

A package wrapping the browsers localStorage with utility functions.

## Install

`npm install @availity/localstorage-core`

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

## License
[MIT](../../LICENSE)
