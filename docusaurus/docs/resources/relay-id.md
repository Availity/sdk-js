---
title: Relay ID
---

Small package containing helpers for encoding and decoding IDs according to the [Relay GraphQL specification](https://relay.dev/graphql/objectidentification.htm).

[![Version](https://img.shields.io/npm/v/@availity/relay-id.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/relay-id)

## When to Use This

Use `@availity/relay-id` when:

- A backend returns Relay-style global IDs. Some GraphQL or REST APIs encode entity type and ID into a single opaque base64 string (e.g., `VXNlcjoxMjM=`). This package lets you decode them to extract the underlying type and ID.
- You need to construct Relay-compatible IDs. When building a BFF (Backend for Frontend) or adapter layer that must produce Relay-compatible global IDs from raw database identifiers.
- You are debugging API responses. Quickly decode opaque IDs during development to understand what entity and record they reference.

## Installation

### NPM

```bash
npm install @availity/relay-id
```

### Yarn

```bash
yarn add @availity/relay-id
```

## Usage

```js
import { toGlobalId, fromGlobalId, base64, unbase64 } from '@availity/relay-id';

// Encode a type and ID into a global Relay ID
const globalId = toGlobalId('User', '789');
// => 'VXNlcjo3ODk='

// Decode a global Relay ID back to its parts
const { type, id } = fromGlobalId('VXNlcjo3ODk=');
// => { type: 'User', id: '789' }
```

## API

### `toGlobalId(type, id)`

Encodes a type name and ID into a base64 Relay global ID.

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `string` | The GraphQL type name (e.g., `'User'`, `'Organization'`) |
| `id` | `string` | The underlying entity ID |

**Returns:** `string` — A base64-encoded string in the format `Base64("Type:id")`

### `fromGlobalId(globalId)`

Decodes a Relay global ID back to its type and ID components.

| Parameter | Type | Description |
| --- | --- | --- |
| `globalId` | `string` | A base64-encoded Relay global ID |

**Returns:** `{ type: string, id: string }`

### `base64(input)`

Low-level utility to base64-encode a string.

### `unbase64(encoded)`

Low-level utility to decode a base64 string.

## Example: Decoding API Responses

```js
import { fromGlobalId } from '@availity/relay-id';

// An API returns a list of items with opaque IDs
const items = await fetchItems();

for (const item of items) {
  const { type, id } = fromGlobalId(item.id);
  console.log(`${type} #${id}`); // e.g., "Claim #4567"
}
```

## Example: Building Relay-Compatible IDs

```js
import { toGlobalId } from '@availity/relay-id';

// Your service has a raw database record
const dbRecord = { table: 'providers', id: '42' };

// Encode it as a global ID for a GraphQL response
const globalId = toGlobalId('Provider', dbRecord.id);
// => 'UHJvdmlkZXI6NDI='
```
