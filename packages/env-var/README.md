# @availity/env-var

> Get run-time environment variables for immutable builds

[![Version](https://img.shields.io/npm/v/@availity/env-var.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/env-var)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/env-var.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/env-var)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/env-var?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/env-var/package.json)

## Install

### NPM

```bash
npm install @availity/env-var
```

### Yarn

```bash
yarn add @availity/env-var
```

## Usage

The default export returns a value from an object based on the current Availity environment (local, test, qa, prod):

```js
import envVar from '@availity/env-var';

// Returns the value matching the current environment
const apiUrl = envVar({
  local: 'http://localhost:3000',
  test: 'https://t01-apps.availity.com',
  qa: 'https://qap-apps.availity.com',
  prod: 'https://apps.availity.com',
});
```

### Named Exports

```js
import { getCurrentEnv, getSpecificEnv } from '@availity/env-var';

// Get the general environment category: 'local', 'test', 'qa', or 'prod'
const env = getCurrentEnv();

// Get the specific environment identifier (e.g., 't01', 'stg', 'prd')
const specificEnv = getSpecificEnv();
```

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/env-var)
