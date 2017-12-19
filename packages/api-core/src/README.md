# AvApi

`AvApi` is a lightweight class that wraps a provided http calling service with helping functions designed for Availity's REST API.

Such as:
* Automatic polling of restful endpoints with timeouts
* Simple URI builder for API resources
* Life-cycle hooks into HTTP calls for GET, PUT, POST, and DELETE

## Usage

```javascript
  new AvApi(http, promise, config);
```

### Options

#### `http`
Either Angular's `$http` service or Axios (or compatible lib). 

#### `promise`
Either Angular `$q` or equivalent `Promise` object. 

#### `config`
Either Angular `$http` or `axios` config object

### Config

#### `config.api`
Default `true`. When `true`, the url is built out by joining `path`, `version`, and `name` or just `url` if no name is defined. The `id` is also added when appropriate. When `api` is `false`, all calls just use `url`. URL pattern: `path/version/name`

#### `config.url`
This is used for requests when `config.api` is false or `name` is undefined;

#### `path`
Used for url building when `config.api` is true. URL pattern `path/version/name`

#### `version`
Default `v1`. Used for url building when `config.api` is true. URL pattern `path/version/name`

#### `name`
The name of the resource.  Used for url building when `api` is true. (`path/version/name`)

#### `cacheBust`
Disable caching for every request by adding a `cacheBust` parameter to the call.

Accepts a boolean, function, or some value:
- If `true`, a timestamp is generated and used
- If a function, it is called and return value is used
- If a value is passed then the cache bust param is set to this value. 

#### `pageBust`
Bust the browser cache on page load, and keep its value for lifecycle of the page. Same behavior as `cacheBust` except if true, a value is only generated once and re-used. A hard refresh of page resets the `pageBust` value. To manually set the `pageBust` value call without changing the config, use `setPageBust(value)` which will set the it to `value` or if undefined generate a timestamp.

#### `sessionBust`
Default `true`. Attempts to read a value in local storage that is generated at login. This forces the browser to bust the cache when a new session has started. If the local storage value is not found, uses the `pageBust` value.

#### `polling`
Default `true`. If true and rest services return `202` statuc code, `AvApi` will attempt to poll on predefined internvals until the retries are exhausted or the api returns non `202` response.

#### `pollingIntervals`
An array of intervals (in ms) to wait before making another request.
Default is 1, 2, 5, then 10 seconds. After all the intervals have been used, `AvApi` will stop attempting requests and return the last response.

#### `getHeader`
Used for polling, if the `http` service used has special logic to get a header value, then define this function to handle that logic. If defined, it is called with `(response, headerKey)`.
If not defined, attempts to get `key` from `response.headers[key]`.


### Methods
Each method can use an after function, (ex. `afterGet` with `get`). These are available to modify the response before it is resolved. Each method that has data available has a before function in order to modify data before the call is made. All methods accept a config object, which is merged into the resources config for that call only.

#### create or post
Makes HTTP`POST` request.
```javascript
create(data, config);
// or 
post(data, config);
```

#### postGet
Makes HTTP`POST` using `X-HTTP-Method-Override = `GET`. There server must support override methods for the request to succeed.

```javascript
postGet(data, config);
```

#### get
Retrieves an entity by ID. Makes HTTP`GET` call with `/id` in url. 
```javascript
get(id, config);
```

#### query
The query function is designed to fetch collections and search the API. Makes HTTP`GET` request with query params.

```javascript
query(config);
```

#### update or put
Update an entity with a `PUT` call. When an id is passed in, `/id` is added to the url.
```javascript
update(id, data, config);
// or wihthout id
update(data, config);
// or
put(id, data, config);
// or or without it
put(data, config);
```

#### remove or delete
Remove an entity with a `DELETE` call. When an `id` is passed in, `/id` is added to the url. If the first parameter is a string or number, it is treated as an ID, otherwise it is treated as an object.

```javascript
remove(id, config);
// or without id
remove(data, config);
// or
delete(data, config);
// or without id
delete(config);
```
