# resolve-url

> Resolve URLs to absolute URI/IRI.

This library is a small wrapper around [relative-to-absolute-iri
](https://github.com/rubensworks/relative-to-absolute-iri.js) which resolve srelative IRIs to absolute IRIs given a base IRI, conforming to [RFC3986}(https://www.ietf.org/rfc/rfc3986.txt).

## Installation

```bash
npm install @av/resolve-url --save
```

## `relative()`

### Params

-   **`relative`**: Relative url to be converted to full url
-   **`base`** (_optional_): Base url used to convert the relative url. If base URL is not provided it is calculated from `window.location.href`.

## Usage

```js
import { resolveUrl } from "@availity/resolve-url";
resolveUrl({relative: '/a/b', base: 'https://example.com/})
// Outputs https://example.com/a/b
```

### URLs

When `base` option is not provided, this package will calculate the base from `window.location.href`. The example below returns server relative url if hostname was `https:example.com`

```js
resolveUrl({relative: '/a/b'})
// Outputs https://example.com/a/b
```

> The following examples were adapted from [relative-to-absolute-iri
](https://github.com/rubensworks/relative-to-absolute-iri.js)

### Hashes

Fragments/hashes in relative URIs are also taken into account.

```javascript
resolve('#abc', 'http://base.org/'); // Outputs 'http://base.org/#abc'
```

### Invalid base URI

Invalid base URIs cause an error to be thrown.

```javascript
resolve('abc', 'def'); // Error
```

### Protocol Relative

When a relative IRI starts with a `//`, then the scheme of the base IRI will be used.

```javascript
resolve('//abc', 'http://base.org/'); // Outputs 'http://abc'
```

### Root-Relative


Relative URIs that starts with a `/` erase the path of the base IRI.

```javascript
resolve('/abc/def/', 'http://base.org/123/456/'); // Outputs 'http://base.org/abc/def/'
```

### Relative Directory Traversal

Relative URIs that point to the current directory (`.`)
or parent directory (`..`) are collapsed.

```javascript
resolve('xyz', 'http://aa/parent/parent/../../a'); // Outputs 'http://aa/xyz'
resolve('xyz', 'http://aa/././a'); // Outputs 'http://aa/xyz'
```

## Notes

- `URI` - Uniform Resource Identifier allows ASCII characters
- `IRI` - Internationalized Resource Identifier allows Unicode typeset
