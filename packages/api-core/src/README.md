# Availity API Resource

`AvApi` is a lightweight class that wraps a provided http calling service with helping functions designed for Availity's REST API.

Such as:
* Automatic polling of restful endpoints with timeouts
* Simple URI builder for API resources
* Life-cycle hooks into HTTP calls for GET, PUT, POST, and DELETE

## Links

* [Home](../)
* [Prebuilt Api's](prebuilt)
* [Configuration](#Configuration)
  * [http](#http)
  * [Options](#Options)
  * [Methods](#Methods)

## Configuration
`AvApi` is configured by passing in options to its constructor.
it also requires a http service to wrap, and a Promise function to use when polling.

```javascript
  new AvApi(http, promise, config);
```

### http
The `http` parameter is based off of the angular `$http` service. However, all that is required for `AvApi` to work is that it can be called with `http(config)` and return a promise that resolves the response.

### Options

#### `api`
Default `true`. When `true`, the url is built out by joining `path`, `version`, and `name` or just `url` if no name is defined. The `id` is also added when appropriate.
When `api` is `false`, all calls just use `url`.

#### `url`
This is used for requests when `api` is false or `name` is undefined;

#### `path`
Default `api`. Used for url building when `api` is true. (`path/version/name`)

#### `version`
Default `v1`. Used for url building when `api` is true. (`path/version/name`)

#### `name`
The name of the resource.  Used for url building when `api` is true. (`path/version/name`)

#### `cacheBust`
To force every call to hit the server instead of keeping cached results, by adding a `cacheBust` parameter to the call.
Accepts a boolean, function, or value:
- If `true`, a timestamp is generated and used
- If a function, it is called and return value is used
- If a value is passed in, this is used

#### `pageBust`
Bust the browser cache on page load, and keep its value for lifecycle of the page.
Same behavior as `cacheBust` except if true, a value is only generated once and re-used.

to manually set the pageBust value call without changing the config, use `setPageBust(value)` which will set the it to `value` or if undefined generate a timestamp.

#### `sessionBust`
Default `true`. Attempts to read a value in local storage that is generated at login. This forces the browser to bust the cache when a new session has started. If the local storage value is not found, uses the `pageBust` value.

#### `polling`
Default `true`. If true, and a call returns 202, `AvApi` will attempt to poll. Making the request until there are no more intervals or until there is a non-202 response.

#### `pollingIntervals`
An array of intervals (in ms) to wait before making another request.
Default is 1, 2, 5, then 20 seconds. After all the intervals have been used, `AvApi` will stop attempting requests and return the last response.

#### `getHeader`
Used for polling, if the `http` service used has special logic to get a header value, then define this function to handle that logic. If defined, it is called with `(response, headerKey)`.
If not defined, attempts to get `key` from `response.headers[key]`.


### Methods
Each method can use an after function, (ex. `afterGet` with `get`). These are available to modify the response before it is resolved.
Each method that has data available has a before function in order to modify data before the call is made.

All methods accept a config object, which is merged into the resources config for that call only.

#### create
Create an entity.
Makes POST call.
```javascript
create(data, config);
```

#### postGet
Makes POST call with `X-HTTP-Method-Override = 'GET'`.
```javascript
postGet(data, config);
```

#### get
Retrieves an entity by ID.
Makes GET call with `/id` in url
```javascript
get(id, config);
```

#### query
The query function is designed to fetch collections and search the API.
Makes GET call.
```javascript
query(config);
```

#### update
Update an entity with a PUT call.
When an id is passed in, `/id` is added to the url.
```javascript
  update(id, data, config);
```
or
```javascript
  update(data, config);
```

#### remove
Remove an entity with a DELETE call.
When an id is passed in, `/id` is added to the url.

If the first parameter is a string or number, it is treated as an ID, otherwise data.
```javascript
  remove(id, config);
```
or
```javascript
  remove(data, config);
```
