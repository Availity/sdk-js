# @availity/native-form

> Submit JSON data via a native form, not AJAX. Useful when you need to open a new page with a POST action.

[![Version](https://img.shields.io/npm/v/@availity/native-form.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/native-form)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/native-form.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/native-form)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/native-form?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/native-form/package.json)

## Install

### NPM

```bash
npm install @availity/native-form
```

### Yarn

```bash
yarn add @availity/native-form
```

## Usage

Creates and submits a native HTML form to initiate SSO navigation to a space.

```js
import nativeForm from '@availity/native-form';

// Open a space via SSO with parameters
await nativeForm('space-id', { param1: 'value1' });

// With custom form attributes and explicit SSO type
await nativeForm(
  'space-id',
  { payerId: '123' },
  { target: '_self' },
  'saml',
  'my-client-id'
);
```

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `spaceId` | string | **Required.** The space ID to navigate to |
| `params` | object | Key-value pairs submitted as hidden form fields |
| `formAttributes` | object | HTML form attributes (default: `{ method: 'post', target: '_blank' }`) |
| `type` | string | SSO type (`'saml'` or `'openid'`). Auto-detected if not provided |
| `clientId` | string | Client ID for the API request (default: `'clientId'`) |

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/native-form)
