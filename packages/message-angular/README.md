# Availity message

A package wrapping the postMessage function with helper functions and security checks.

## Install
`npm install @availity/message-core`

## Usage

add module to your app.

```javascript
import LocalStorage from '@availity/message-angular';

angular.module('app', [
  LocalStorage
])
.service('ExampleService', class ExampleService{
  static $inject = ['AvMessage']
  constructor(AvMessage) {
    this.AvMessage = AvMessage;
  }
});
```

## Methods

### enabled

if a value is passed in, sets messaging's enabled flag true/false based on value.

returns boolean enabled flag value.

### domain

returns a string of the windows current domain.

## send

`AvMessage.send(payload, target)` will send the payload to the target if AvMessage is enabled.
target defaults to the parent window. payload will be stringified if not a string.

## Authors
**Kasey Powers**
* [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License
[MIT](../../LICENSE)
