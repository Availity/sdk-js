---
title: Yup Extensions
---

Method extensions for the [yup](https://github.com/jquense/yup)

[![Version](https://img.shields.io/npm/v/@availity/yup.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/yup)

## Install

This package includes `yup` as a dependency in version 4+. In version 3 and earlier you will need to provide `yup` version 0.29.3 or earlier.

If you need to use the `avDate` and `dateRange` schemas then you will have to add `moment` as a dependency.

### NPM

```bash
npm install @availity/yup
```

### Yarn

```bash
yarn add @availity/yup
```

## Usage

There are two ways to use methods provided in this package. `isRequired`, `npi`, and `phone` will all be added to existing `yup` schemas. On the other hand, `date` and `dateRange` must be imported from the package directly.

```js
// This import will add our methods to the existing `yup` schema
import '@availity/yup';
import * as yup from 'yup';

const schema = yup.string().isRequired(true, 'This field is required.');

schema.isValid('12-12-2012');
```

If you want to utilize the custom date validators you need to import them directly

```js
// This import will also add the other methods (npi, phone, isRequired)
// to the existing `yup` schema
import { avDate, dateRange } from '@availity/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  date: avDate(),
  range: dateRange(),
});

schema.isValid({
  date: '12-12-2012',
  range: {
    startDate: '12/11/2012',
    endDate: '12/12/2012',
  },
});
```

## Methods

These methods are added to the existing `yup` schema

### isRequired

This method is added to the following schema

- array
- number
- object
- string

#### Parameters

- **required** - `boolean`. Optional. Whether or not the given string is required. Default: `true`
- **message** - `string`. Optional. Custom error message when invalid. Default: `This Field is Required.`

#### Example

```js
import '@availity/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  required: {
    string: yup.string().isRequired(true, 'Custom Error Message'),
    number: yup.number().isRequired(true, 'Custom Error Message'),
    array: yup.array().isRequired(true, 'Custom Error Message'),
    object: yup.object().isRequired(true, 'Custom Error Message'),
  },
  optional: {
    string: yup.string().isRequired(false),
    number: yup.number().isRequired(false),
    array: yup.array().isRequired(false),
    object: yup.object().isRequired(false),
  },
});
```

### npi

Validate an NPI (National Provider Identifier)

This method is added to the following schema

- number
- string

#### Parameters

- **message** - `string`. Optional. Custom error message when invalid. Default: `This field is invalid.`

#### Example

```js
import '@availity/yup';
import * as yup from 'yup';

const schema = yup.string().npi();
```

### phone

Validate a phone number. Must be 10 digits without country code, can be formatted when using string schema.

This method is added to the following schema

- number
- string

#### Parameters

- **message** - `string`. Optional. Custom error message when invalid. Default: `This field is invalid.`

#### Example

```js
import '@availity/yup';
import * as yup from 'yup';

const schema = yup.string().phone();

schema.isValid('(444) 444-4444'); // true
schema.isValid('+1 (444) 444-4444'); // true
schema.isValid('444-444-4444'); // true
schema.isValid('+1 444-444-4444'); // true
schema.isValid('444.444.4444'); // true
schema.isValid('(444) 444 4444'); // true

const schema = yup.number().phone();

schema.isValid('4444444444'); // true
schema.isValid('444 444 4444'); // true
schema.isValid('44444444445'); // false
schema.isValid('+14444444444'); // false
```

## Schema

The `avDate` and `dateRange` schema exported from this package are used as you would `string` or `number` from `yup` directly.

### dateRange

Validate a daterange object

#### Parameters

- **options** - `object`. optional. Range Options.
  - **format** - `string`. optional. The format to parse the dates with.
  - **startKey** - `string`. optional. The key for the start date. Default: `startDate`
  - **endKey** - `string`. optional. The key for the end date. Default: `endDate`

#### Example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange();

schema.isValid({
  startDate: '12/11/2012',
  endDate: '12/12/2012',
});

// Schema with custom keys
const customKeySchema = dateRange({
  startKey: 'from',
  endKey: 'to',
});

customKeySchema.isValid({
  from: '12/11/2012',
  to: '12/12/2012',
});
```

#### Methods

##### between

Accepts range of dates the date range can fall between.

##### Parameters

- **minDate** - `string`. **required**. The minimum date.
- **maxDate** - `string`. **required**. The max date.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range must be between XX/XX/XXXX and XX/XX/XXXX."

##### Example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange().between('12/01/2012', '12/10/2012');

schema.isValid({
  startDate: '12/02/2012',
  endDate: '12/03/2012',
});
```

##### min

Set the minimum date the given range must start on or after

###### Parameters

- **min** - `string`. **required**. The minimum date.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range must start after XX/XX/XXXX"

###### Example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange().min('12/01/2012');

schema.isValid({
  startDate: '12/02/2012',
  endDate: '12/03/2012',
});
```

##### max

Set the maximum date the given range must end on or before

###### Parameters

- **max** - `string`. **required**. The max date.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range must start before XX/XX/XXXX"

###### Example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange().max('12/10/2012');

schema.isValid({
  startDate: '12/02/2012',
  endDate: '12/03/2012',
});
```

##### distance

Evaluates if date range is within a set distance

###### Parameters

- **options** - `object`. **required**. distance options.
  - **min** - `object`. optional. The minimum distance between the date ranges
    - **value** - `number`. **required**. the value of the minimum distance
    - **units** - `string`. optional. the weight of the value. default `day`
  - **max** - `object`. optional. The maximum distance between the date ranges
    - **value** - `number`. **required**. the value of the max distance
    - **units** - `string`. optional. the weight of the value. default `day`
  - **format** - `string`. optional. custom parse format for date validation

###### Example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange().distance({
  min: {
    value: 3,
    units: 'day',
  },
});

schema.isValid({
  startDate: '12/02/2012',
  endDate: '12/03/2012',
});
```

##### typeError

Sets a custom error message for invalid date ranges to override the 'Start and End Date are required.' default when only one of the start or end date is falsy. Useful when combined with @availity/date Date Range react component that rejects invalid dates.

###### Parameters

- **options** - `object`. typeError options.
  - **message** - `string`. optional. The custom error message to display

###### Example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange();

schema.isValid({
  startDate: '',
  endDate: '12/03/2012',
}); // throws 'Start and End Date are required.'

const customErrSchema = dateRange().typeError({ message: 'Custom error message' });

customErrSchema.isValid({
  startDate: '',
  endDate: '12/03/2012',
}); // throws 'Custom error message'
```

### avDate

Similar to the default date yup object and accepts a string or `moment` object instead. See [Date](https://github.com/jquense/yup#date) for `min` and `max`

#### Parameters

- **options** - `object`. optional. Range Options.
  - **format** - `string | string[]`. optional. Add to the list of accepted formats.

#### Methods

##### between

Set the min and max that the date must be inbetween

###### Parameters

- **min** - `string`. **required**. The minimum allowed date.
- **max** - `string`. **required**. The maximum allowed date.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date must be between ${min} and ${max}."
- **inclusivity** - `string`. Optional. Set whether the min and max should be inclusive. Default: "()"

[More information](https://momentjscom.readthedocs.io/en/latest/moment/05-query/06-is-between/) on inclusivity

###### Example

```js
import { avDate } from '@availity/yup';

const schema = avDate().between('12/01/2012', '12/10/2012');

schema.isValid('12/02/2012');
```

##### min

Validate the date is on or after the given minimum

###### Parameters

- **min** - `string`. **required**. The minimum date the given value must be on or after.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date must be ${min} or later."

###### Example

```js
import { avDate } from '@availity/yup';

const schema = avDate().min('12/01/2012');

schema.isValid('12/02/2012');
```

##### max

Validate the date is on or before the given maximum

###### Parameters

- **max** - `string`. **required**. The maximum date the given value must be on or before.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date must be ${max} or earlier."

###### Example

```js
import { avDate } from '@availity/yup';

const schema = avDate().max('12/01/2012');

schema.isValid('11/30/2012');
```

##### isRequired

Mark the date as required.

###### Parameters

- **isRequired** - `string`. **required**. Whether or not the value is required
- **message** - `string`. Optional. Custom error message when invalid. Default: "This field is required."

###### Example

```js
import { avDate } from '@availity/yup';

const schema = avDate().isRequired();

schema.isValid('11/30/2012');
```
