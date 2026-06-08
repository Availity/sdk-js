# @availity/yup

> Method extensions for [yup](https://github.com/jquense/yup)

[![Version](https://img.shields.io/npm/v/@availity/yup.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/yup)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/yup.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/yup)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/yup?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/yup/package.json)

## Install

### NPM

```bash
npm install @availity/yup yup
```

### Yarn

```bash
yarn add @availity/yup yup
```

[moment](https://www.npmjs.com/package/moment) is required as a peer dependency if you use the `avDate` or `dateRange` schemas:

```bash
npm install moment
```

## Usage

Import the package to add the extended methods to yup schemas:

```js
import '@availity/yup';
import { string, number, array, object } from 'yup';

// isRequired - works on string, number, array, and object
const schema = string().isRequired(true, 'Name is required');

// npi - validates NPI numbers (string or number)
const npiSchema = string().npi('Invalid NPI');

// phone - validates phone numbers (string or number)
const phoneSchema = string().phone('Invalid phone number');
```

### Date Validation

```js
import { avDate } from '@availity/yup';

const schema = avDate()
  .isRequired(true, 'Date is required')
  .min('2020-01-01', 'Date must be after 2020')
  .max('2030-12-31');
```

### Date Range Validation

```js
import { dateRange } from '@availity/yup';

const schema = dateRange({ startKey: 'startDate', endKey: 'endDate' })
  .isRequired()
  .min('2020-01-01')
  .max('2030-12-31')
  .distance({ max: { value: 30, units: 'day' } })
  .typeError({ message: 'Invalid date range' });
```

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/yup)
