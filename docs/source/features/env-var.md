---
title: Environment Vars
summary: Get run-time environment variables for immutable builds
---

[![Version](https://img.shields.io/npm/v/@availity/env-var.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/env-var)

## Install

### NPM

```bash
$ npm install @availity/env-var
```

### Yarn

```bash
$ yarn add @availity/env-var
```

## Usage

### envVar (default export)

Given an object of possible values and get back the value for the current environment.

```js
import envVar from '@availity/env-var';

const myEnvVal = envVar(valuesObject[, windowOverride]);

export default myEnvVal;
```

#### Required params

-   valuesObject: An object with keys which match the name of the potential environments. The value of the give for the current environment will be returned

#### Optional params

-   windowOverride: String or Window Object which can be used to override the window which is used to determine the current hostname (which is used to determine the current environment)
    -   When string, the string will be takes an a fully qualified URL and the hostname will be parsed from it.
    -   When Window Object, the location hostname will be used.
-   defaultVar: String or Object which will be the default value when the given var is not found. If not given, then
    will use the `local` param in the `valuesObject` var.

#### Example

```js
import envVar from '@availity/env-var';

/*
depending on which environment this is ran in, myEnvVal would be something different
in prod: myEnvVal will be '123'
in qa: myEnvVal will be '234'
in test: myEnvVal will be '345' (defaults to local if env is not found)
*/
const myEnvVal = envVar({ prod: '123', qa: '234', local: '345' });

export default myEnvVal;
```

### setEnvironments

Set the potential environments and the tests used to determine which environment the code is currently being executed in.

```js
import { setEnvironments } from '@availity/env-var';

setEnvironments(possibleEnvironments[, replaceExisting]);
```

#### Required params

-   possibleEnvironments: An object with keys which match the name of the potential environments and the values are the tests which are ran to determine if the environment is the current one.

These tests can be

-   String: A string will be used to check an exact match.
-   Regular Expression: A regex will be `test`d with the domain.
-   Function: The function will be called and the result should be a boolean indicating if the environment is the current environment.
-   Array: An array containing any of the above types.

#### Optional params

-   replaceExisting: Boolean, when true possibleEnvironments will replace the existing environments instead of merging.

#### Example

```js
import { setEnvironments } from '@availity/env-var';

setEnvironments({
    local: ['127.0.0.1', 'localhost'],
    test: [/^t(?:(?:\d\d)|(?:est))-apps$/],
    qa: [/^q(?:(?:\d\d)|(?:ap?))-apps$/],
    prod: [/^apps$/],
    myEnv: ['custom-stuff-here'],
});
```

### getSpecificEnv

Get the specific current environment, without rolling up to the general environment. Whereas `envVar` treats the `t01` environment as `test`, for example, `getSpecificEnv` returns `'t01'` for the `t01` environment.

```js
import { getSpecificEnv } from '@availity/env-var';

const specificEnv = getSpecificEnv([windowOverride]);
```

#### Required params

None

#### Optional params

-   windowOverride: String or Window Object which can be used to override the window which is used to determine the current hostname (which is used to determine the current environment)
    -   When string, the string will be takes an a fully qualified URL and the hostname will be parsed from it.
    -   When Window Object, the location hostname will be used.

#### Example

```js
import { getSpecificEnv } from '@availity/env-var';

/*
depending on the environment this code runs in, specificEnv would be something different,
like 't01' or 'stg' or 'prod'
*/
const specificEnv = getSpecificEnv();
```

### setSpecificEnvironments

Set the tests that will be used to determine the specific environment the code is currently being executed in.

```js
import { setSpecificEnvironments } from '@availity/env-var';

setSpecificEnvironments(possibleEnvironments[, replaceExisting]);
```

#### Required params

-   possibleEnvironments: An array of objects with the following keys:
    -  regex: the regular expression to match against the current subdomain
    -  fn: the function to run to return the name of the environment as a string

The code will iterate through the objects, matching the subdomain against the `regex`. If the regex matches, the code calls the corresponding `fn`, passing an object containing the match (capturing groups), subdomain, and pathname. The iteration stops when it receives a non-empty answer from a function or when it reaches the end, in which case it returns `'local'`.

#### Optional params

-   replaceExisting: Boolean, when true possibleEnvironments will replace the existing environments instead of merging.

#### Example

```js
import { setSpecificEnvironments } from '@availity/env-var';

setSpecificEnvironments([
    {
        regex: /^(?:(.*)-)?apps$/,
        fn: options => options.match[1] || 'prod',
    },
    {
        regex: /.*?\.(?:av|aw|gc)(n|p)$/,
        fn: options => options.subdomain || options.pathname.split('/')[2],
    }
]);
```
