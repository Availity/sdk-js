---
title: Getting Started
---

Learn how to use the [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios#readme) package for communicating with our APIs

[![Version](https://img.shields.io/npm/v/@availity/api-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-axios)

## Installation

Install the package through `npm`, `yarn`, or your favorite package manager. You must also install `axios` as well.

### NPM

```bash
npm install @availity/api-axios axios
```

### Yarn

```bash
yarn add @availity/api-axios axios
```

## AvApi

`AvApi` is the default export from `@availity/api-axios`. It is a class that wraps [axios](https://axios-http.com/docs/intro).

### Features

- Automatic polling of restful endpoints with timeouts
- Simple URI builder for API resources
- Life-cycle hooks into HTTP calls for GET, PUT, POST, and DELETE

### Usage

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });
```

### Options

#### `http`

The default http client used is `axios`. You can pass an object to this parameter in order to override `axios`.

#### `config`

[axios config object](https://axios-http.com/docs/req_config) that will be passed to each call.

### Request Config

Listed below are the options we primarily use from the `axios config` or ones we have added.

##### `config.api`

Default `true`. When `true`, the url is built out by joining `path`, `version`, and `name` or just `url` if no name is defined. The `id` is also added when appropriate. When `api` is `false`, all calls just use `url`. URL pattern: `path/version/name`

##### `config.url`

This is used for requests when `config.api` is false or `name` is undefined;

##### `config.path`

Used for url building when `config.api` is true. URL pattern `path/version/name`

##### `config.version`

Default `v1`. Used for url building when `config.api` is true. URL pattern `path/version/name`

##### `config.name`

The name of the resource. Used for url building when `api` is true. (`path/version/name`)

##### `config.cacheBust`

Disable caching for every request by adding a `cacheBust` parameter to the call.

Accepts a boolean, function, or some value:

- If `true`, a timestamp is generated and used
- If a function, it is called and return value is used
- If a value is passed then the cache bust param is set to this value.

##### `config.pageBust`

Bust the browser cache on page load, and keep its value for lifecycle of the page. Same behavior as `cacheBust` except if true, a value is only generated once and re-used. A hard refresh of page resets the `pageBust` value. To manually set the `pageBust` value call without changing the config, use `setPageBust(value)` which will set the it to `value` or if undefined generate a timestamp.

##### `config.sessionBust`

Default `true`. Attempts to read a value in local storage that is generated at login. This forces the browser to bust the cache when a new session has started. If the local storage value is not found, uses the `pageBust` value.

##### `config.polling`

Default `true`. If true and rest services return `202` statuc code, `AvApi` will attempt to poll on predefined internvals until the retries are exhausted or the api returns non `202` response.

##### `config.pollingIntervals`

An array of intervals (ms) to wait before making another request.
Default is 1, 2, 5, then 10 seconds. After all the intervals have been used, `AvApi` will stop attempting requests and return the last response.

##### `config.getHeader`

Used for polling, if the `http` service used has special logic to get a header value, then define this function to handle that logic. If defined, it is called with `(response, headerKey)`.
If not defined, attempts to get `key` from `response.headers[key]`.

##### `config.headers`

Headers to be passed to the request.

### Methods

Each method can use an after function, (ex. `afterGet` with `get`). These are available to modify the response before it is resolved. Each method that has data available has a before function in order to modify data before the call is made.

All methods accept a config object, which is merged into the resources config for that call only.

#### create or post

Makes `HTTP POST` request.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const post = async (data, config) => {
  const response = await api.post(data, config);
  return response.data;
};

// OR
const create = async (data, config) => {
  const response = await api.create(data, config);
  return response.data;
};
```

#### postGet

Makes `HTTP POST` using `X-HTTP-Method-Override = 'GET'`. There server must support override methods for the request to succeed.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const postGet = async (data, config) => {
  const response = await api.postGet(data, config);
  return response.data;
};
```

#### get

Retrieves an entity by ID. Makes `HTTP GET` call with `/id` in url.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const get = async (id, config) => {
  const response = await api.get(id, config);
  return response.data;
};
```

#### query

The query function is designed to fetch collections and search the API. Makes `HTTP GET` request with query params.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const query = async (config) => {
  const response = await api.query(config);
  return response.data;
};
```

#### update or put

Update an entity with a PUT call. When an id is passed in, `/id` is added to the url.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const put = async (id, data, config) => {
  const response = await api.put(id, data, config);
  return response.data;
};

// OR

const update = async (data, config) => {
  // You can also omit the id. this works for `put` as well
  const response = await api.update(data, config);
  return response.data;
};
```

#### patch

Update an entity with a PATCH call. When an id is passed in, `/id` is added to the url.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const patch = async (id, data, config) => {
  const response = await api.patch(id, data, config);
  // You can also omit id, and only pass in data and config
  // const response = await api.patch(data, config);
  return response.data;
};
```

#### remove or delete

Remove an entity with a DELETE call. When an id is passed in, `/id` is added to the url. If the first parameter is a string or number, it is treated as an ID, otherwise data.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const remove = async (id, config) => {
  const response = await api.remove(id, config);
  return response.data;
};

// OR

const delete = async (data, config) => {
  const response = await api.delete(data, config);
  return response.data;
};

```

## AvMicroserviceApi

`AvMicroservice` extends `AvApi` and thus can call the same methods. It has slightly different default [config options](https://github.com/Availity/sdk-js/blob/master/packages/api-axios/src/options.js).
