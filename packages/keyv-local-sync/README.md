# @availity/keyv-local-sync

> Simple local real-time key-value storage with support for TTL

[![Build Status](https://travis-ci.org/availity/keyv-local-sync.svg?branch=master)](https://travis-ci.org/availity/keyv-local-sync)
[![Coverage Status](https://coveralls.io/repos/github/availity/keyv-local-sync/badge.svg?branch=master)](https://coveralls.io/github/availity/keyv-local-sync?branch=master)
[![npm](https://img.shields.io/npm/dm/keyv-local-sync.svg)](https://www.npmjs.com/package/keyv-local-sync)
[![npm](https://img.shields.io/npm/v/keyv-local-sync.svg)](https://www.npmjs.com/package/keyv-local-sync)

keyv-local-sync provides a consistent interface for key-value. It supports TTL based expiry, making it suitable as a cache key-value store.

## Features

There are a few existing modules similar to keyv-local-sync, however keyv-local-sync is different because it:

- Isn't bloated
- Isn't async, uses local memory-based storage for real-time lookups and storage
- Cache promises or anything, it's not serialized so you get back exactly what you put in
- Suitable as a TTL based cache key-value store
- [Easily embeddable](#add-cache-support-to-your-module) inside another module
- Works with any storage that implements the [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) API
- Supports namespaces
- Supports the current active LTS version of Node.js or higher

## Usage

Install keyv-local-sync.

```
npm install --save @availity/keyv-local-sync
```

Create a new keyv-local-sync instance. keyv-local-sync will automatically load the correct storage adapter.

```js
const KeyvLocalSync = require('@availity/keyv-local-sync');

// One of the following
const keyvLocalSync = new KeyvLocalSync(); // the default store uses quick-lru
const keyvLocalSync = new KeyvLocalSync({ store: new Map() });


keyvLocalSync.set('foo', 'expires in 1 second', 1000); // true
keyvLocalSync.set('foo', 'never expires'); // true
keyvLocalSync.get('foo'); // 'never expires'
keyvLocalSync.delete('foo'); // true
keyvLocalSync.clear(); // undefined
```

### Namespaces
keyv-local-sync instance to avoid key collisions and allow you to clear only a certain namespace while u
You can namespace your keyv-local-sync instance to avoid key collisions and allow you to clear only a certain namespace.

```js
const users = new KeyvLocalSync({ namespace: 'users' });
const cache = new KeyvLocalSync({ namespace: 'cache' });

users.set('foo', 'users'); // true
cache.set('foo', 'cache'); // true
users.get('foo'); // 'users'
cache.get('foo'); // 'cache'
users.clear(); // undefined
users.get('foo'); // undefined
cache.get('foo'); // 'cache'
```

## Third-party Storage Adapters

You can also use third-party storage adapters or build your own. keyv-local-sync will wrap these storage adapters in TTL functionality and handle complex types internally.

```js
const KeyvLocalSync = require('@availity/keyv-local-sync');
const myAdapter = require('./my-storage-adapter');

const keyvLocalSync = new KeyvLocalSync({ store: myAdapter });
```

Any store that follows the [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) api will work.

```js
new KeyvLocalSync({ store: new Map() });
```

For example, [`quick-lru`](https://github.com/sindresorhus/quick-lru) is a module that implements the Map API, it is used by default is no store is provided.

```js
const KeyvLocalSync = require('@availity/keyv-local-sync');

const keyvLocalSync = new KeyvLocalSync({ size: 1000 });
```

The following are third-party storage adapters compatible with keyv-local-sync:

- [quick-lru](https://github.com/sindresorhus/quick-lru) - Simple "Least Recently Used" (LRU) cache
- [keyv-local-sync-file](https://github.com/zaaack/keyv-local-sync-file) - File system storage adapter for keyv-local-sync

## Add Cache Support to your Module

keyv-local-sync is designed to be easily embedded into other modules to add cache support. The recommended pattern is to expose a `cache` option in your modules options which is passed through to keyv-local-sync. Caching will work in memory by default and users have the option to also install a keyv-local-sync storage adapter and pass in a connection string, or any other storage that implements the `Map` API.

You should also set a namespace for your module so you can safely call `.clear()` without clearing unrelated app data.

Inside your module:

```js
class AwesomeModule {
	constructor(opts) {
		this.cache = new KeyvLocalSync({
			store: opts.cache,
			namespace: 'awesome-module'
		});
	}
}
```

Now it can be consumed like this:

```js
const AwesomeModule = require('awesome-module');

// Caches stuff in memory by default
const awesomeModule = new AwesomeModule();

// After npm install --save keyv-local-sync-redis
const awesomeModule = new AwesomeModule({ cache: new Map() });

// Some third-party module that implements the Map API
const awesomeModule = new AwesomeModule({ cache: some3rdPartyStore });
```

## API

### new keyv-local-sync([options])

Returns a new keyv-local-sync instance.

### options

Type: `Object`

The options object is also passed through to the storage adapter. Check your storage adapter docs for any extra options.

#### options.namespace

Type: `String`<br>
Default: `'keyv-local-sync'`

Namespace for the current instance.

#### options.ttl

Type: `Number`<br>
Default: `undefined`

Default TTL. Can be overridden by specififying a TTL on `.set()`.

#### options.store

Type: `Storage adapter instance`<br>
Default: `new QuickLRU({maxSize: this.opts.maxSize || 1000})`

The storage adapter instance to be used by keyv-local-sync.

### Instance

Keys must always be strings. Values can be of any type.

#### .set(key, value, [ttl])

Set a value.

By default keys are persistent. You can set an expiry TTL in milliseconds.

Returns `true`.

#### .get(key)

Returns the value.

#### .delete(key)

Deletes an entry.

Returns `true` if the key existed, `false` if not.

#### .clear()

Delete all entries in the current namespace.

Returns `undefined`.

## License

Original work: MIT © Luke Childs
Modifications: MIT © Availity
