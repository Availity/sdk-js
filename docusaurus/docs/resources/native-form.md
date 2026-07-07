---
title: Native Form
---

Submit JSON data via a native HTML form to initiate SSO navigation to external payer or partner integrations. Unlike AJAX, a native form submission causes a full page navigation, which is required for SAML and OpenID Connect SSO flows.

[![Version](https://img.shields.io/npm/v/@availity/native-form.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/native-form)

## When to Use This

Use `@availity/native-form` when:

- Launching SSO integrations. When a user clicks a link to navigate to a payer portal or partner application that uses SAML or OpenID Connect, the handshake requires a form POST to the SSO endpoint. This package handles creating that form, injecting the parameters, and submitting it.
- Opening a new page via POST. Any time you need to navigate away from (or open a new tab with) a POST action rather than a GET. Native forms can target `_blank`, `_self`, or named frames.

This is not a general-purpose HTTP client. Use `@availity/api-axios` for AJAX requests.

## Installation

### NPM

```bash
npm install @availity/native-form
```

### Yarn

```bash
yarn add @availity/native-form
```

## Usage

```js
import nativeForm from '@availity/native-form';

// Navigate to a payer integration in a new tab
await nativeForm('space-id-12345', { payerId: 'BCBSFL', memberId: 'XYZ789' });
```

## API

### `nativeForm(spaceId, params?, formAttributes?, type?, clientId?)`

Creates a hidden HTML form with the given parameters and submits it.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `spaceId` | `string` | — | **Required.** The Availity space ID for the SSO integration |
| `params` | `object` | `{}` | Key-value pairs submitted as hidden form fields. Nested objects are flattened to dot-notation |
| `formAttributes` | `object` | `{ method: 'post', target: '_blank' }` | HTML form attributes (`method`, `target`, `action`, etc.) |
| `type` | `string` | resolved via WebQL | SSO type: `'saml'` or `'openid'`. If omitted, the function queries the WebQL API (`configurationFindOne`) to look up the SSO type for the given space ID |
| `clientId` | `string` | `'clientId'` | Client ID sent as the `X-Client-ID` header on the WebQL lookup request |

**Returns:** `Promise<void>` — Resolves after the form is submitted.

### `flattenObject(obj)`

Named export. Flattens nested objects into dot-notation keys for form submission.

```js
import { flattenObject } from '@availity/native-form';

flattenObject({ user: { name: 'John', age: 30 } });
// => { 'user.name': 'John', 'user.age': '30' }
```

## Examples

### Launch a Payer Portal via SSO

```js
import nativeForm from '@availity/native-form';

async function openPayerPortal(payerId, memberId) {
  try {
    await nativeForm(
      'payer-space-id',
      { payerId, memberId },
      { target: '_blank' } // open in new tab
    );
  } catch (error) {
    console.error('SSO navigation failed:', error);
  }
}
```

### Navigate in the Same Tab

```js
import nativeForm from '@availity/native-form';

// Replace current page with the SSO destination
await nativeForm(
  'space-id-12345',
  { claimId: 'CLM001' },
  { target: '_self' }
);
```

### Force a Specific SSO Type

```js
import nativeForm from '@availity/native-form';

// Skip the WebQL lookup and use SAML directly
await nativeForm('space-id-12345', { payerId: '123' }, {}, 'saml', 'my-app');
```
