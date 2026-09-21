---
title: Environment Vars
---

Get environment-specific values at runtime without rebuilding your application.

[![Version](https://img.shields.io/npm/v/@availity/env-var.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/env-var)

## When to Use This

Use `@availity/env-var` when:

- You need different config values per environment. API base URLs, feature flags, client IDs, or any value that changes between test/QA/prod but shouldn't require a separate build.
- You are building an immutable artifact. A single JavaScript bundle that detects its environment at runtime via `window.location.hostname` and selects the appropriate value.
- You need the current environment name. Determine whether you are running in `'local'`, `'test'`, `'qa'`, or `'prod'` for conditional logic.

## Installation

### NPM

```bash
npm install @availity/env-var
```

### Yarn

```bash
yarn add @availity/env-var
```

## Supported URL Formats

The package detects the environment from `window.location` using two URL patterns:

### Portal URLs (`*.availity.com`)

Environment is determined by the subdomain:

| Subdomain                      | Category | Specific Slug   |
| ------------------------------ | -------- | --------------- |
| `localhost`, `127.0.0.1`       | `local`  | `local`         |
| `apps`, `essentials`           | `prod`   | `prod`          |
| `test-apps`, `test-essentials` | `test`   | `test`          |
| `t01-apps`, `t14-apps`, …      | `test`   | `t01`, `t14`, … |
| `qa-apps`, `qa-essentials`     | `qa`     | `qa`            |
| `qap-apps`, `q01-apps`, …      | `qa`     | `qap`, `q01`, … |

### Cloud URLs (`*.availity.com` — zone + path)

Format: `<team>.<provider><zone>.availity.com/<namespace>/<env-slug>/...`

- **Provider**: `aw` (AWS), `az` (Azure), `gc` (GCP)
- **Zone**: `p` (prod), `n` (non-prod), `s` (sandbox)
- **Namespace**: 3-char abbreviation, e.g. `cdn`, `api`
- **Env slug**: 3-char abbreviation, e.g. `prd`, `tst`, `stg`, `qua`, `qap`, `t01`

The zone letter and env slug must be consistent — a prod zone (`??p`) with a non-prod slug, or vice versa, will fall through to `local`.

| Example URL                            | Category | Specific Slug |
| -------------------------------------- | -------- | ------------- |
| `digital.awp.availity.com/cdn/prd/...` | `prod`   | `prd`         |
| `digital.awn.availity.com/cdn/tst/...` | `test`   | `tst`         |
| `digital.azn.availity.com/cdn/t01/...` | `test`   | `t01`         |
| `digital.awn.availity.com/cdn/stg/...` | `qa`     | `stg`         |
| `digital.gcn.availity.com/cdn/qua/...` | `qa`     | `qua`         |

Any URL that does not match a known pattern is treated as `local`.

## API Reference

### envVar (default export)

This function accepts an object, and will return a value based on what environment you are in. You can also pass in a window override as well as a default value.

```js
import envVar from '@availity/env-var';

const myEnvVal = envVar(values, windowOverride, defaultValue);

export default myEnvVal;
```

#### Required args

- values: An object with keys which match the name of the potential environments. The value for the current environment will be returned

#### Optional args

- windowOverride: String or Window Object which can be used to override the window which is used to determine the current hostname (which is used to determine the current environment)
  - When a string, it will be taken as a fully qualified URL and the hostname will be parsed from it.
  - When a Window Object, the location hostname will be used.
- defaultValue: The value returned when one does not exist for the specified environment. If no default is provided, then the function will use the value specified for `local`

#### Example

```js
import envVar from '@availity/env-var';

/*
    myEnvVal will be different depending on the environment the code runs in
        prod: myEnvVal will be '123'
        qa: myEnvVal will be '234'
        test: myEnvVal will be '345' (defaults to local if env is not found)
*/
const myEnvVal = envVar({ prod: '123', qa: '234', local: '345' });

export default myEnvVal;
```

### setEnvironments

Set the potential environments and the tests used to determine which environment the code is currently being executed in.

```js
import { setEnvironments } from '@availity/env-var';

setEnvironments(environments, override);
```

#### Required args

- environments: An object with keys which match the name of the potential environments and the values are the tests which are ran to determine if the environment is the current one.

These tests can be

- String: A string will be used to check an exact match.
- Regular Expression: A regex will be tested with the domain.
- Function: The function will be called and the result should be a boolean indicating if the environment is the current environment.
- Array: An array containing any of the above types.

#### Optional args

- override: Boolean, when true possibleEnvironments will replace the existing environments instead of merging.

#### Example

```js
import { setEnvironments } from '@availity/env-var';

setEnvironments({
  local: ['127.0.0.1', 'localhost'],
  test: [/^t(?:(?:\d\d)|(?:est))-(essentials)$/],
  qa: [/^q(?:(?:\d\d)|(?:ap?))-(essentials)$/],
  prod: [/^(essentials)$/],
  myEnv: ['custom-stuff-here'],
});
```

### getSpecificEnv

Get the specific current environment, without rolling up to the general environment. Whereas `envVar` treats the `t01` environment as `test`, for example, `getSpecificEnv` returns `'t01'` for the `t01` environment.

```js
import { getSpecificEnv } from '@availity/env-var';

const specificEnv = getSpecificEnv(windowOverride);
```

#### Required args

None

#### Optional args

- windowOverride: String or Window Object which can be used to override the window which is used to determine the current hostname (which is used to determine the current environment)
  - When a string, it will be taken as a fully qualified URL and the hostname will be parsed from it.
  - When a Window Object, the location hostname will be used.

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

setSpecificEnvironments(environments, override);
```

#### Required args

- environments: An array of objects with the following keys:
  - regex: the regular expression to match against the current subdomain
  - fn: the function to run to return the name of the environment as a string

The code will iterate through the objects, matching the subdomain against the `regex`. If the regex matches, the code calls the corresponding `fn`, passing an object containing the match (capturing groups), subdomain, and pathname. The iteration stops when it receives a non-empty answer from a function or when it reaches the end, in which case it returns `'local'`.

#### Optional args

- override: Boolean, when true possibleEnvironments will replace the existing environments instead of merging.

#### Example

```js
import { setSpecificEnvironments } from '@availity/env-var';

setSpecificEnvironments([
  {
    regex: /^(?:(.*)-)?(essentials)$/,
    fn: (options) => options.match[1] || 'prod',
  },
  {
    // Cloud URLs: match subdomain ending in .<provider><zone>
    // provider: aw | az | gc   zone: n | p | s
    regex: /.*?\.(?:aw|az|gc)([nps])$/,
    fn: (options) => {
      // options.match, options.subdomain, options.pathname available
      const pathParts = options.pathname.split('/');
      return pathParts[2] || null; // e.g. 'prd', 'tst', 't01'
    },
  },
]);
```

### getCurrentEnv

Get the general environment name (e.g., `'local'`, `'test'`, `'qa'`, `'prod'`) for the current hostname.

```js
import { getCurrentEnv } from '@availity/env-var';

const env = getCurrentEnv();
// => 'prod'
```

#### Optional args

- windowOverride: String or Window Object which can be used to override the window used to determine the hostname.

#### Example

```js
import { getCurrentEnv } from '@availity/env-var';

// Use a custom URL for testing
const env = getCurrentEnv(
  'https://test-essentials.availity.com/static/web/onb/onboarding-ui-apps/navigation/#/'
);
// => 'test'
```

### getEnvironmentInfo

Returns both the broad environment category and the specific slug in a single call. Useful when you need both values — avoids parsing the location twice.

```js
import { getEnvironmentInfo } from '@availity/env-var';

const { env, specificEnv } = getEnvironmentInfo();
// => { env: 'test', specificEnv: 't01' }
```

#### Optional args

- windowOverride: String, Window Object, or `null`. Same semantics as `getCurrentEnv`.

#### Example

```js
import { getEnvironmentInfo } from '@availity/env-var';

const { env, specificEnv } = getEnvironmentInfo(
  'https://t01-apps.availity.com'
);
// => { env: 'test', specificEnv: 't01' }
```

---

### isProd / isQa / isTest / isLocal

Convenience boolean helpers. Equivalent to `getCurrentEnv() === 'env'` but more readable and easier to autocomplete.

```js
import { isProd, isQa, isTest, isLocal } from '@availity/env-var';
```

Each accepts an optional `windowOverride` (String, Window Object, or `null`) with the same semantics as `getCurrentEnv`.

#### Example

```js
import { isProd, isLocal } from '@availity/env-var';

if (isProd()) {
  // only runs in prod
}

if (isLocal()) {
  // runs on localhost, 127.0.0.1, or any unrecognised host
}

// With a URL string (useful in tests or SSR)
isProd('https://apps.availity.com'); // => true
isTest('https://t01-apps.availity.com'); // => true
```

> **Note:** `isLocal` returns `true` for both `localhost`/`127.0.0.1` **and** any unrecognised host — the same fallback behaviour as `envVar`.

---

### resetEnvironments / resetSpecificEnvironments

Restore the built-in environment definitions after a `setEnvironments` or `setSpecificEnvironments` call. Primarily useful in tests to prevent state from bleeding between test cases.

```js
import { setEnvironments, resetEnvironments } from '@availity/env-var';
```

#### Example

```js
import { setEnvironments, resetEnvironments } from '@availity/env-var';

// In a test file
afterEach(() => {
  resetEnvironments(); // restore built-in environments
  resetSpecificEnvironments(); // restore built-in specific environments
});

test('custom environment', () => {
  setEnvironments({ staging: /^stg-apps$/ });
  // ... assertions ...
}); // resetEnvironments() called after each test — no state bleed
```
