# localstorage-core
> Wraps localStorage with utility functions

## Install

`npm install @availity/localstorage-core --save`

## Usage

```js
import AvLocalStorarge from '@availity/localstorage-core`;

const avLocalStorage = new AvLocalStorage();

avLocalStorage.set('myKey', 'myValue')
console.log(avLocalStorage('myKey')) // logs: "myValue"
```

## Methods

### `get(key)`
Returns value stored at `key`, will attempt to parse JSON stored there.

### `set(key, value)`
Sets `key` to `value` in localStorage. Will stringify objects if needed.

### `remove(key)`
Removes `key` from localStorage.

### `getKeys(searchKey)`
Returns array of all keys that match the `searchKey` string or `RegExp`.

### `removeKeys(searchKey)`
Remove all keys that match the `searchKey` string or RegExp.

### `getSessionBust()`
Returns session key set by Availity on login.
