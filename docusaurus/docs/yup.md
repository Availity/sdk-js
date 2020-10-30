---
title: Yup Extensions
---

Method extensions for the [yup](https://github.com/jquense/yup)

[![Version](https://img.shields.io/npm/v/@availity/yup.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/yup)

## Install

### NPM

```bash
$ npm install @availity/yup yup
```

### Yarn

```bash
$ yarn add @availity/yup yup
```

## Usage

Import the package in the root of your project somewhere and you will have access to all of the provided yup methods.

```js
import '@availity/yup';
import * as yup from 'yup';

const schema = yup.string().isRequired(true, 'This field is required.');

schema.isValid('12-12-2012');
```

If you want to utilize the custom date validators you need to import them directly:

```js
import { avDate, dateRange } from '@availity/yup';

const dateSchema = avDate();
const dateRangeSchema = dateRange({
    startKey: 'helloDate',
    endKey: 'worldDate',
}).between('12/10/2012', '12/13/2012');

dateSchema.isValid('12-12-2012');
dateRangeSchema.isValid({
    helloDate: '12/11/2012',
    worldDate: '12/12/2012',
});
```

## Table of Contents

-   [isRequired](#isrequired-stringarraynumberobject)
-   [npi](#npi-string)
-   [phone](#phone-stringnumber)
-   [dateRange](#daterange)
-   [avDate](#avdate)

## Methods

---

### isRequired [**String**,**Array**,**Number**,**Object**]

#### Parameters

-   **required** - `boolean`. Optional. Whether or not the given string is required. Default: `true`
-   **message** - `string`. Optional. Custom error message when invalid. Default: `This Field is Required.`

#### Example

```js
import '@availity/yup';
import * as yup from 'yup';

yup.string().isRequired();
yup.string().isRequired(true, 'Custom Error Message');
yup.number().isRequired();
yup.array().isRequired();
yup.object().isRequired();
```

### npi [**String**]

#### Parameters

-   **message** - `string`. Optional. Custom error message when invalid. Default: `This field is invalid.`

#### Example

```js
import '@availity/yup';
import * as yup from 'yup';

const schema = yup.string().npi();
```

### phone [**String**,**Number**]

Validates a phone number. Must be 10 digits without country code, can be formatted when using string schema.

#### Parameters

-   **message** - `string`. Optional. Custom error message when invalid. Default: `This field is invalid.`

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

const schema = yup.number.phone();

schema.isValid('4444444444'); // true
schema.isValid('444 444 4444'); // true
schema.isValid('44444444445'); // false
schema.isValid('+14444444444'); // false
```

## Additional Schemas

---

## **dateRange**

Evaluates a date range object.

### Parameters

-   **options** - `object`. optional. Range Options.
    -   **format** - `string`. optional. The format to parse the dates with.
    -   **startKey** - `string`. optional. The key for the start date. Default: `startDate`
    -   **endKey** - `string`. optional. The key for the end date. Default: `endDate`
-   **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range is invalid."

### Example

```js
import { dateRange } from '@availity/yup';

const dateRangeSchema = dateRange({
    startKey: 'helloDate',
    endKey: 'worldDate',
}).between('12/10/2012', '12/13/2012');

dateRangeSchema.isValid({
    helloDate: '12/11/2012',
    worldDate: '12/12/2012',
});
```

### **methods**

### between

Accepts range of dates the date range can fall between.

#### parameters

-   **minDate** - `string`. **required**. The minimum date.
-   **maxDate** - `string`. **required**. The max date.
-   **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range must be between XX/XX/XXXX and XX/XX/XXXX."

#### example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange().between('12/01/2012', '12/10/2012');

schema.isValid({
    startDate: '12/02/2012',
    endDate: '12/03/2012',
}); // valid
```

### min

Accepts date the date range must start after.

#### parameters

-   **minDate** - `string`. **required**. The minimum date.
-   **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range must start after XX/XX/XXXX"

#### example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange().min('12/01/2012');

schema.isValid({
    startDate: '12/02/2012',
    endDate: '12/03/2012',
}); // valid
```

### max

Accepts date, the date range must start before.

#### parameters

-   **maxDate** - `string`. **required**. The max date.
-   **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range must start before XX/XX/XXXX"

#### example

```js
import { dateRange } from '@availity/yup';

const schema = dateRange().max('12/10/2012');

schema.isValid({
    startDate: '12/02/2012',
    endDate: '12/03/2012',
}); // valid
```

### distance

Evaluates if date range is within a set distance

#### parameters

-   **options** - `object`. **required**. distance options.
    -   **min** - `object`. optional. The minimum distance between the date ranges
        -   **value** - `number`. **required**. the value of the minimum distance
        -   **units** - `string`. optional. the weight of the value. default `day`
    -   **max** - `object`. optional. The maximum distance between the date ranges
        -   **value** - `number`. **required**. the value of the max distance
        -   **units** - `string`. optional. the weight of the value. default `day`
    -   **format** - `string`. optional. custom parse format for date validation

#### example

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
}); // valid
```

## **avDate**

Similar to the default date yup object and accepts a string or `moment` object instead. See [Date](https://github.com/jquense/yup#date) for `min` and `max`

### **Methods**

### between

Takes an object of dates the given date must fall between

#### parameters

-   **minDate** - `string`. **required**. The minimum date.
-   **maxDate** - `string`. **required**. The max date.
-   **message** - `string`. Optional. Custom error message when invalid. Default: "Date must be between XX/XX/XXXX and XX/XX/XXXX."

#### example

```js
import { avDate } from '@availity/yup';

const schema = avDate().between('12/01/2012', '12/10/2012');

schema.isValid('12/02/2012'); // valid
```
