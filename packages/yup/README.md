# yup

> Method extensions for the [yup](https://github.com/jquense/yup)

[![Version](https://img.shields.io/npm/v/@availity/yup.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/yup)

## Install

```bash
npm install @availity/yup yup --save
```

## Usage

Import the package in the root of your project somewhere and you will have access to all of the provided yup methods.

```javascript
import '@availity/yup';
import * as yup from 'yup';

const schema = yup.string().dateFormat('MM/DD/YYYY');

schema.isValid('12-12-2012');
```

## Table of Contents

-   [isRequired](#isRequired)
-   [dateRange](#dateRange)
-   [date](#dateFormat)

## Methods

---

### isRequired [**String**,**Array**,**Number**]

#### Parameters

-   **required** - `boolean`. Optional. Whether or not the given string is required. Default: `true`
-   **message** - `string`. Optional. Custom error message when invalid. Default: `This Field is Required.`

#### Example

```javascript
yup.string().isRequired();
yup.string().isRequired(true, 'Custom Error Message');
yup.number().isRequired();
yup.array().isRequired();
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

```javascript
const schema = yup.dateRange({
    min: '07/04/2012',
    max: '07/12/2012',
});

schema.isValid({
    startdate: '07/05/2012',
    endDate: '07/10/2012',
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

```javascript
const schema = yup.dateRange().between('12/01/2012', '12/10/2012');

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

```javascript
const schema = yup.dateRange().min('12/01/2012');

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

```javascript
const schema = yup.dateRange().max('12/10/2012');

schema.isValid({
    startDate: '12/02/2012',
    endDate: '12/03/2012',
}); // valid
```
## **date**
Overrides the default date yup object and accepts a string or `dayjs` object instead. See [Date](https://github.com/jquense/yup#date) for `min` and `max`

### **Methods**

### between

Takes an object of dates the given date must fall between

#### parameters

-   **minDate** - `string`. **required**. The minimum date.
-   **maxDate** - `string`. **required**. The max date.
-   **message** - `string`. Optional. Custom error message when invalid. Default: "Date must be between XX/XX/XXXX and XX/XX/XXXX."

#### example

```javascript
const schema = yup.date().between('12/01/2012', '12/10/2012');

schema.isValid('12/02/2012'); // valid
```
