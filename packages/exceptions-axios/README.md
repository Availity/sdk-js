# @availity/exceptions-axios

> A package wrapping the Exceptions class to use axios. Using avLogMessagesApi to log errors.

[![Version](https://img.shields.io/npm/v/@availity/exceptions-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-axios)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/exceptions-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/exceptions-axios)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/exceptions-axios?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/exceptions-axios/package.json)

More details about configuration can be found in [Exceptions-Core](../exceptions-core)

## Install

### NPM

```bash
npm install @availity/exceptions-axios
```

### Yarn

```bash
yarn add @availity/exceptions-axios
```

## Usage

Add module to your app.

```js
import avExceptionsAxios from '@availity/exceptions-axios';
```

Configure the default options

```js
import avExceptionsAxios from '@availity/exceptions-axios';

avExceptionsAxios.enabled(false); // enabled defaults to true... this example would disable it
avExceptionsAxios.appId('exampleApp'); // if undefined, logs 'N/A'
avExceptionsAxios.repeatTime(5000); // sets the time in ms between logging calls for the same error message. (default 5 seconds)
```

It will automatically catch all error which bubble up to the window (error which are not caught and handled in code) and log those errors. So as long as you are not catching your error you should be able to throw and error to log it.

```js
// this import doesn't need to be on every file, just needs to be imported once somewhere like the main index.js or App.js
import avExceptionsAxios from '@availity/exceptions-axios';

// ... somewhere when something happened
throw new Error('As long as this error is not caught it will be logged');
```

Or you can manually log and error in the case where something is catching and handling errors before they bubble to the window:

```js
import avExceptionsAxios from '@availity/exceptions-axios';

// ... somewhere when something happened
avExceptionsAxios.submitError(new Error('Manually logging this error'));
```
