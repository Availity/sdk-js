---
title: Resolving Urls
---

Resolve URLs to absolute URI/IRI.

[![Version](https://img.shields.io/npm/v/@availity/resolve-url.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/resolve-url)

This library resolves relative IRIs to absolute IRIs given a base IRI, conforming to [RFC3986](https://www.ietf.org/rfc/rfc3986.txt). The code was borrowed from [relative-to-absolute-iri
](https://github.com/rubensorks/relative-to-absolute-iri.js). ~There is an open issue to make the library compatible with IE11: [Issue #5](https://github.com/rubensworks/relative-to-absolute-iri.js/issues/5)~

## Installation

### NPM

```bash
npm install @availity/resolve-url
```

### Yarn

```bash
yarn add @availity/resolve-url
```

## `relative()`

### Params

- **`relative`**: Relative url to be converted to full url
- **`base`** (_optional_): Base url used to convert the relative url. If base URL is not provided it is calculated from `window.location.href`.

## Usage

```js
import resolveUrl from '@availity/resolve-url';

resolveUrl({ relative: '/a/b', base: 'https://example.com/' });
// Outputs https://example.com/a/b
```

### URLs

When `base` option is not provided, this package will calculate the base from `window.location.href`. The example below returns server relative url if hostname was `https://example.com`

```js
import resolveUrl from '@availity/resolve-url';

resolveUrl({ relative: '/a/b' });
// Outputs https://example.com/a/b
```

> The following examples were adapted from [relative-to-absolute-iri
> ](https://github.com/rubensworks/relative-to-absolute-iri.js)

### Hashes

Fragments/hashes in relative URIs are also taken into account.

```js
resolve('#abc', 'http://base.org/'); // Outputs 'http://base.org/#abc'
```

### Invalid base URI

Invalid base URIs cause an error to be thrown.

```js
resolve('abc', 'def'); // Error
```

### Protocol Relative

When a relative IRI starts with a `//`, then the scheme of the base IRI will be used.

```js
resolve('//abc', 'http://base.org/'); // Outputs 'http://abc'
```

### Root-Relative

Relative URIs that starts with a `/` erase the path of the base IRI.

```js
resolve('/abc/def/', 'http://base.org/123/456/'); // Outputs 'http://base.org/abc/def/'
```

### Relative Directory Traversal

Relative URIs that point to the current directory (`.`)
or parent directory (`..`) are collapsed.

```js
resolve('xyz', 'http://aa/parent/parent/../../a'); // Outputs 'http://aa/xyz'
resolve('xyz', 'http://aa/././a'); // Outputs 'http://aa/xyz'
```

## Notes

- `URI` - Uniform Resource Identifier allows ASCII characters
- `IRI` - Internationalized Resource Identifier allows Unicode typeset
