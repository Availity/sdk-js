---
title: Resolving Urls
---

Resolve URLs to absolute URI/IRI.

[![Version](https://img.shields.io/npm/v/@availity/resolve-url.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/resolve-url)

This library resolves relative IRIs to absolute IRIs given a base IRI, conforming to [RFC3986](https://www.ietf.org/rfc/rfc3986.txt). The code was borrowed from [relative-to-absolute-iri](https://github.com/rubensworks/relative-to-absolute-iri.js).

## Installation

### NPM

```bash
npm install @availity/resolve-url
```

### Yarn

```bash
yarn add @availity/resolve-url
```

## `resolveUrl(params: { relative:string; base?: string })`

### Params

- **`relative`**: Relative url to be converted to full url
- **`base`** (_optional_): Base url used to convert the relative url. If base URL is not provided it is calculated from `window.location.href`.

## Usage

```js
import resolveUrl from '@availity/resolve-url';

// Outputs https://example.com/a/b
resolveUrl({ relative: '/a/b', base: 'https://example.com/' });
```

### URLs

When `base` option is not provided, this package will calculate the base from `window.location.href`. The example below returns server relative url if hostname was `https://example.com`

```js
import resolveUrl from '@availity/resolve-url';

// Outputs https://example.com/a/b
resolveUrl({ relative: '/a/b' });
```

> The following examples were adapted from [relative-to-absolute-iri](https://github.com/rubensworks/relative-to-absolute-iri.js)

### Hashes

Fragments/hashes in relative URIs are also taken into account.

```js
import resolveUrl from '@availity/resolve-url';

// Outputs 'http://base.org/#abc'
resolveUrl({ relative: '#abc', base: 'http://base.org/' });
```

### Invalid base URI

Invalid base URIs cause an error to be thrown.

```js
import resolveUrl from '@availity/resolve-url';

// Error
resolveUrl({ relative: 'abc', base: 'def' });
```

### Protocol Relative

When a relative IRI starts with a `//`, then the scheme of the base IRI will be used.

```js
import resolveUrl from '@availity/resolve-url';

// Outputs 'http://abc'
resolveUrl({ relative: '//abc', base: 'http://base.org/' });
```

### Root-Relative

Relative URIs that starts with a `/` erase the path of the base IRI.

```js
import resolveUrl from '@availity/resolve-url';

// Outputs 'http://base.org/abc/def/'
resolveUrl({ relative: '/abc/def/', base: 'http://base.org/123/456/' });
```

### Relative Directory Traversal

Relative URIs that point to the current directory (`.`)
or parent directory (`..`) are collapsed.

```js
import resolveUrl from '@availity/resolve-url';

// Outputs 'http://aa/xyz'
resolveUrl({ relative: 'xyz', base: 'http://aa/parent/parent/../../a' });

// Outputs 'http://aa/xyz'
resolveUrl('xyz', 'http://aa/././a');
```

## Notes

- `URI` - Uniform Resource Identifier allows ASCII characters
- `IRI` - Internationalized Resource Identifier allows Unicode typeset
