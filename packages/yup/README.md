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
import '@availity/yup'
import * as yup from 'yup';

const schema = yup.string().dateFormat('MM/DD/YYYY');

schema.isValid('12-12-2012');
```

## Table of Contents

- [isRequired](#isRequired)
- [dateRange](#dateRange)
- [dateFormat](#dateFormat)
- [between](#between)

> Note any date validation methods will required [moment](https://www.npmjs.com/package/moment) to be installed



## Methods
### isRequired [**String**,**Array**,**Number**]
#### Parameters
- **required** - `boolean`. Optional. Whether or not the given string is required. Default: `true`
- **message** - `string`. Optional. Custom error message when invalid. Default: `This Field is Required.`

#### Example
```javascript
yup.string().isRequired();
yup.string().isRequired(true,"Custom Error Message");
yup.number().isRequired();
yup.array().isRequired();
```

### dateRange [**Object**]
Evaluates a date range object.
#### Parameters
- **options** - `object`. **required**. Range Options.
  - **min** - `string`. **required**. The min date that can be selected.
  - **max** - `string`. **required**. The max date that can be selected.
  - **format** - `string`. optional. The format to parse the dates with.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date Range must be between XX/XX/XXXX and XX/XX/XXXX."


#### Example
```javascript
yup.object().shape({
    startDate: '',
    endDate: ''
}).dateRange({
    min: '07/04/2012',
    max: '07/12/2012'
})
```

### between [**string**]
Evaluates a single date sring.
#### Parameters
- **options** - `object`. **required**. Range Options.
  - **min** - `string`. **required**. The min date that can be selected.
  - **max** - `string`. **required**. The max date that can be selected.
  - **format** - `string`. optional. The format to parse the dates with.
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date must be between XX/XX/XXXX and XX/XX/XXXX."

#### Example
```javascript
yup.string().between({
    min: '07/04/2012',
    max: '07/12/2012'
})
```

### dateFormat [**string**]
Evaluates a single date sring.
#### Parameters
- **format** - `string`. optional. The format to parse the dates with. Default MM/DD/YYYY
- **message** - `string`. Optional. Custom error message when invalid. Default: "Date must be between XX/XX/XXXX and XX/XX/XXXX."

#### Example
```javascript
yup.string().format('MM-DD-YYYY');
```

