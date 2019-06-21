# Angular Exceptions

> A package wrapping the Exceptions class into angular. Using avLogMessagesApi to log errors.

[![Version](https://img.shields.io/npm/v/@availity/exceptions-angular.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-angular)

More details about configuration can be found in [Exceptions-Core](../exceptions-core)

## Install
`npm install @availity/exceptions-angular`

add module to your app.

```javascript
import AvAngularExceptions from '@availity/exceptions-angular';
angular.module('app', [
  AvAngularExceptions
]);
```

To configure the default Options
```javascript
config(AvExceptionsProvider => {
  AvExceptionsProvider.enabled(false); // enabled default True
  AvExceptionsProvider.appId('exampleApp'); // if undefined, logs 'N/A'
  AvExceptionsProvider.repeatTime(5000); // sets the time in ms between logging calls for the same error message. (default 5 seconds)
});
```

## Authors
**Kasey Powers**
* [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License
[MIT](../../LICENSE)
