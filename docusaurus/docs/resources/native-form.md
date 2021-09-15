---
title: Native Form
---

Submit JSON data via a native form, not AJAX. Useful when you need to open a new page with a POST action.
[![Version](https://img.shields.io/npm/v/@availity/native-form.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/native-form)

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

```js
import nativeForm from '@availity/native-form';

nativeForm(spaceId[, params[, formAttributes][, type]]);
```

### Required params

- spaceId: String

### Optional params

- params: Object. Additional parameters you want sent in the post.
- formAttributes: Object. Set/override the form attributes like `target`, `method`, and `action`. `method` defaults to "post", `action` will default to "\`/ms/api/availity/internal/spc/magneto/sso/v1/saml/\${spaceId}\`", and `target` will default to "\_blank". Additional attributes can be defined and should be valid on an HTML form element.
- type: String. Override the magneto integration type. Defaults to "saml"

###

```js
import nativeForm from '@availity/native-form';

nativeForm(
  '12312312312',
  { myExtraParam: 'myExtraParamValue' },
  { target: '_top' }
);
```

When `nativeForm` is called it wil create a native HTML form and submit it.
