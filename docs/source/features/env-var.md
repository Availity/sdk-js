---
title: Environment Vars
summary: Get run-time environment variables for immutable builds
---

[![Version](https://img.shields.io/npm/v/@availity/env-var.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/env-var)

## Install

```bash
npm install @availity/env-var --save
```

## Usage

### envVar (default export)

Given an object of possible values and get back the value for the current environment.

```js
import envVar from '@availity/env-var';
const myEnvVal = envVar(valuesObject[, windowOverride]);
```

#### Required params

- valuesObject: An object with keys which match the name of the potential environments. The value of the give for the current environment will be returned

#### Optional params

- windowOverride: String or Window Object which can be used to override the window which is used to determine the current hostname (which is used to determine the current environment)
  - When string, the string will be takes an a fully qualified URL and the hostname will be parsed from it.
  - When Window Object, the location hostname will be used.
- defaultVar: String or Object which will be the default value when the given var is not found. If not given, then
will use the `local` param in the `valuesObject` var.

#### Example

```js
import envVar from '@availity/env-var';
const myEnvVal = envVar({prod: '123', qa: '234', local: '345'});
/*
depending on which environment this is ran in, myEnvVal would be something different
in prod: myEnvVal will be '123'
in qa: myEnvVal will be '234'
in test: myEnvVal will be '345' (defaults to local if env is not found)
*/
```

### setEnvironments

Set the potential environments and the tests used to determine which environment the code is currently being executed in.

```js
import { setEnvironments } from '@availity/env-var';
setEnvironments(possibleEnvironments[, replaceExisting])
```

#### Required params

- possibleEnvironments: An object with keys which match the name of the potential environments and the values are the tests which are ran to determine if the environment is the current one.

These tests can be

- String: A string will be used to check an exact match.
- Regular Expression: A regex will be `test`d with the domain.
- Function: The function will be called and the result should be a boolean indicating if the environment is the current environment.
- Array: An array containing any of the above types.

#### Optional params

- replaceExisting: Boolean, when true possibleEnvironments will replace the existing environments instead of merging.

#### Example
```js
import { setEnvironments } from '@availity/env-var';
setEnvironments({
  local: ['127.0.0.1', 'localhost'],
  test: [/^t(?:(?:\d\d)|(?:est))-apps$/],
  qa: [/^q(?:(?:\d\d)|(?:ap?))-apps$/],
  prod: [/^apps$/],
  myEnv: ['custom-stuff-here']
});
```
