---
title: Native Form
---

Submit JSON data via a native form, not AJAX. Useful when you need to open a new page with a POST action.
[![Version](https://img.shields.io/npm/v/@availity/native-form.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/native-form)

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

async function onClick() {
  await nativeForm(spaceId, params, formAttributes, type);
}
```

### Required args

- spaceId: String. The SSO space ID for the integration to initiate.

### Optional args

- params: Object. Additional parameters you want sent in the post. Nested objects are automatically flattened to dot-notation keys for form submission.
- formAttributes: Object. Set/override the form attributes like `target`, `method`, and `action`.
  - `method` defaults to `"post"`
  - `action` will default to `/ms/api/availity/internal/spc/magneto/sso/v1/${typeLower}/${spaceId}` where `typeLower` is equal to `"saml"` or `"openid"`
  - `target` will default to `"_blank"`
  - Additional attributes can be defined and should be valid on an HTML form element
- type: String. Override the SSO integration type (`"saml"` or `"openid"`). If omitted, the type is auto-detected via a WebQL API call.
- clientId: String. Set the `clientId` for the API Connect header. Defaults to `"clientId"`

### Example

```js
import nativeForm from '@availity/native-form';

async function onEvent() {
  try {
    await nativeForm(
      '12312312312',
      { myExtraParam: 'myExtraParamValue' },
      { target: '_top' }
    );
  } catch (error) {
    log(error);
  }
}
```

When `nativeForm` is called it will create a native HTML form and submit it.

## Additional Exports

### `flattenObject`

Utility function that flattens nested objects into dot-notation keys suitable for form submission.

```js
import { flattenObject } from '@availity/native-form';

flattenObject({ user: { name: 'John', age: 30 } });
// { 'user.name': 'John', 'user.age': '30' }
```
