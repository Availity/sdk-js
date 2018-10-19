# native form
> Submit JSON data via a native form, not AJAX. Useful when you need to open a new page with a POST action.

## Install

```
npm install @availity/native-form --save
```

## Usage

```js
nativeForm(spaceId[, params[, formAttributes]]);
```

### Required params

- spaceId: String

### Optional params

- params: Object. Additional parameters you want sent in the post.
- formAttributes: Object. Set/override the form attributes like `target`, `method`, and `action`. `method` defaults to "post", `action` will default to "\`/ms/api/availity/internal/spc/magneto/sso/v1/saml/${spaceId}\`", and `target` will default to "_blank". Additional attributes can be defined and should be valid on an HTML form element.

###

```js
import nativeForm from '@availity/native-form';

nativeForm('12312312312', {myExtraParam: 'myExtraParamValue'}, {target: '_top'});
```

When `nativeForm` is called it wil create a native HTML form and submit it.
