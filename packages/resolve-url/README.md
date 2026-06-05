# @availity/resolve-url

> Resolve URLs to absolute URI/IRI.

[![Version](https://img.shields.io/npm/v/@availity/resolve-url.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/resolve-url)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/resolve-url.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/resolve-url)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/resolve-url?style=for-the-badge)](https://github.com/Availity/sdk-js/blob/master/packages/resolve-url/package.json)

This library resolves relative IRIs to absolute IRIs given a base IRI, conforming to [RFC3986](https://www.ietf.org/rfc/rfc3986.txt). The code was borrowed from [relative-to-absolute-iri](https://github.com/rubensorks/relative-to-absolute-iri.js).

## Installation

### NPM

```bash
npm install @availity/resolve-url
```

### Yarn

```bash
yarn add @availity/resolve-url
```

## Usage

```js
import resolveUrl, { isAbsoluteUrl, relativeToAbsolute } from '@availity/resolve-url';

// Resolve a relative URL using window.location.origin as base
const url = resolveUrl({ relative: '/api/v1/users' });

// Resolve with an explicit base
const url = resolveUrl({
  relative: '/path/to/resource',
  base: 'https://apps.availity.com/',
});

// Check if a URL is absolute
isAbsoluteUrl('https://example.com'); // true
isAbsoluteUrl('/relative/path'); // false
```

## Documentation

Check out more documentation at [availity.github.io](https://availity.github.io/sdk-js/resources/resolve-url)
