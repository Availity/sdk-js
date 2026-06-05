---
title: Dockyard
---

Convert yup validation schemas into human-readable documentation objects.

[![Version](https://img.shields.io/npm/v/@availity/dockyard.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dockyard)

## Installation

### NPM

```bash
npm install @availity/dockyard
```

### Yarn

```bash
yarn add @availity/dockyard
```

## Usage

```js
import getRules from '@availity/dockyard';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().max(100).required(),
  email: yup.string().email().required(),
  age: yup.number().min(18).max(120),
});

const docs = getRules(schema);
// {
//   name: 'Rules: string, max 100 chars, required.',
//   email: 'Rules: string, email, required.',
//   age: 'Rules: number, min 18, max 120.'
// }
```

## API

### `getRules(validation, options?)`

Converts a yup schema into an object where each key maps to a human-readable string describing the field's validation rules.

#### Parameters

- **validation** - A yup schema (typically `yup.object()`)
- **options** - `object`. Optional configuration.
  - **compileRequiredFields** - `boolean`. Default: `false`. When `true`, removes "required" from rule descriptions and adds a `requiredFields` array to the output listing all required field paths.
  - **excludeOneOf** - `boolean`. Default: `false`. When `true`, excludes `oneOf` constraints from the descriptions.
  - **excludeTypes** - `boolean`. Default: `false`. When `true`, excludes the field type (string, number, etc.) from the descriptions.

#### Return Value

An object mirroring the schema structure. Each field is a string like `"Rules: string, max 100 chars, required."`.

For nested objects, the structure includes a `_fieldName` key with the object-level rules:

```js
docs.address._address; // "Rules: object, required."
docs.address.street; // "Rules: string, max 200 chars."
```

When `compileRequiredFields` is `true`, the returned object also includes a `requiredFields` array:

```js
{
  requiredFields: ['name', 'email', 'address.street'];
}
```

## Examples

### Basic Schema Documentation

```js
import getRules from '@availity/dockyard';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().matches('/^[w-]*$/').required(),
  role: yup.string().max(250).oneOf(['admin', 'user', 'guest']),
  tags: yup.array(yup.string().max(50)).max(10),
});

const docs = getRules(schema);
// docs.name => "Rules: string, matches regex /^[w-]*$/, required."
// docs.role => "Rules: string, one of: [admin, user, guest], max 250 chars."
// docs.tags._tags => "Rules: array, max 10."
// docs.tags.* values follow array item schema
```

### With `compileRequiredFields`

```js
const docs = getRules(schema, { compileRequiredFields: true });
// docs.name => "Rules: string, matches regex /^[w-]*$/."
// docs.requiredFields => ['name']
```

### With `excludeOneOf`

```js
const docs = getRules(schema, { excludeOneOf: true });
// docs.role => "Rules: string, max 250 chars."
// (the oneOf constraint is excluded)
```

### With `excludeTypes`

```js
const docs = getRules(schema, { excludeTypes: true });
// docs.name => "Rules: matches regex /^[w-]*$/, required."
// (the "string" type is excluded)
```

### Nested Objects

```js
import getRules from '@availity/dockyard';
import * as yup from 'yup';

const schema = yup.object({
  user: yup
    .object({
      name: yup.string().required(),
      profile: yup.object({
        bio: yup.string().max(500),
      }),
    })
    .required(),
});

const docs = getRules(schema);
// docs.user._user => "Rules: object, required."
// docs.user.name => "Rules: string, required."
// docs.user.profile._profile => "Rules: object."
// docs.user.profile.bio => "Rules: string, max 500 chars."
```
