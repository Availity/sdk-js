---
title: Dockyard
---

Convert [yup](https://github.com/jquense/yup) validation schemas into human-readable documentation objects. This lets you automatically generate user-facing validation rule descriptions from the same schema you use for runtime validation.

[![Version](https://img.shields.io/npm/v/@availity/dockyard.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/dockyard)

## When to Use This

Use `@availity/dockyard` when:

- You want to display field requirements to users. Instead of manually maintaining help text like "Name is required, max 100 characters," derive it directly from your yup schema so it stays accurate as validation rules change.
- You need to generate API documentation. Automatically produce field-level documentation from your request/response schemas.
- You want a "required fields" summary. Extract a flat list of all required fields from a deeply nested schema for display in a form header or tooltip.

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

| Parameter | Type | Description |
| --- | --- | --- |
| `validation` | yup schema | A yup schema (typically `yup.object()`) |
| `options` | `object` | Optional configuration (see below) |

#### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `compileRequiredFields` | `boolean` | `false` | When `true`, removes "required" from rule descriptions and adds a `requiredFields` array to the output |
| `excludeOneOf` | `boolean` | `false` | When `true`, excludes `oneOf` constraints from descriptions |
| `excludeTypes` | `boolean` | `false` | When `true`, excludes the field type from descriptions |

#### Return Value

An object mirroring the schema structure. Each leaf field is a string like `"Rules: string, max 100 chars, required."`.

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

### Displaying Validation Hints in a Form

```jsx
import getRules from '@availity/dockyard';
import * as yup from 'yup';

const schema = yup.object({
  memberId: yup.string().max(20).required(),
  dateOfBirth: yup.date().required(),
  notes: yup.string().max(500),
});

const docs = getRules(schema);

function MyForm() {
  return (
    <form>
      <label>
        Member ID
        <small>{docs.memberId}</small>
        {/* "Rules: string, max 20 chars, required." */}
        <input name="memberId" />
      </label>
      <label>
        Notes
        <small>{docs.notes}</small>
        {/* "Rules: string, max 500 chars." */}
        <textarea name="notes" />
      </label>
    </form>
  );
}
```

### Extracting Required Fields

```js
import getRules from '@availity/dockyard';
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  middleName: yup.string(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string(),
  }),
});

const docs = getRules(schema, { compileRequiredFields: true });
// docs.requiredFields => ['firstName', 'lastName', 'address.street', 'address.city']
// docs.firstName => "Rules: string."  (no "required" in the description)
```

### Excluding Types for Cleaner Output

```js
const docs = getRules(schema, { excludeTypes: true });
// docs.firstName => "Rules: required."
// docs.notes => "Rules: max 500 chars."
```

### Nested Objects and Arrays

```js
const schema = yup.object({
  user: yup.object({
    name: yup.string().required(),
    tags: yup.array(yup.string().max(50)).max(10),
  }).required(),
});

const docs = getRules(schema);
// docs.user._user => "Rules: object, required."
// docs.user.name => "Rules: string, required."
// docs.user.tags._tags => "Rules: array, max 10."
```
