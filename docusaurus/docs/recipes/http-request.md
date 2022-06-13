---
title: Making an HTTP Request
---

In this guide we outline ways to connect to endpoints inside the Availity portal.

## Getting Started

We begin by installing two libraries: [@availity/api-axios](https://availity.github.io/sdk-js/api/getting-started) and [axios](https://axios-http.com/docs/intro). You can use either `npm` or `yarn`to install them.

NPM

```bash
npm install @availity/api-axios axios
```

Yarn

```bash
yarn add @availity/api-axios axios
```

## Example

We use `@availity/api-axios` to send http requests to the endpoint `https://apps.availity.com/api/v1/test/example`.

If our endpoint starts with `/api/v1/`, then we only pass a `name` to the constructor.

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test/example' });
```

If your url is different from this, however, then you can also pass in a full url

```js
import AvApi from '@availity/api-axios';

// When we call our api it uses this url: https://apps.availity.com/not-api/v2/test
const api = new AvApi({ url: 'not-api/v2/test' });
```

Now that we have set up our api object, we can use a number of methods to call it. `GET`, `POST`, `PUT`, and `DELETE` are all available.

### GET

To make a call with `GET`, use either the provided `get` or `query` method. I use `get` to append an id to the url, `query` for all other scenarios

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test/example' });

// get
const getData = async () => {
  // This sends a request to https://apps.availity.com/api/v1/test/example/my-id
  const response = await api.get('my-id');

  // The response body is in response.data
  return response.data;
};

// query
const queryData = async () => {
  // This sends a request to https://apps.availity.com/api/v1/test/example?id=my-id
  const response = await api.query({ params: { id: 'my-id' } });

  // The response body is in response.data
  return response.data;
};
```

### POST

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test/example' });

const postData = async () => {
  // This sends a request to https://apps.availity.com/api/v1/test/example
  const response = await api.post({ id: '123' });

  // The response body is in response.data
  return response.data;
};
```

### PUT

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test/example' });

const putData = async () => {
  // This sends a request to https://apps.availity.com/api/v1/test/example/123
  const response = await api.put('123', { name: '123' });

  // The response body is in response.data
  return response.data;
};
```

### DELETE

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test/example' });

const postData = async () => {
  // This sends a request to https://apps.availity.com/api/v1/test/example/123
  const response = await api.delete('123');

  // The response body is in response.data
  return response.data;
};
```

## Error Handling

If you are familiar with `axios`, you might know that an http call causes an error to be thrown when the status code is in the 400s or 500s. We recommend the following pattern to handle this behavior:

```js
import { avUserApi } from '@availity/api-axios';

const getUser = async () => {
  try {
    const user = await avUserApi.me();

    // The `me` method returns the data directly.
    // No need to access `user.data`
    return user;
  } catch (error) {
    // You can either return something based on the message
    // or return the full error
    if (error.response?.status === 401) {
      return { error: 'You are unauthorized' };
    }
    return error;
  }
};
```

## FAQ

Q: Where does the `apps.availity.com` part of the url come from?

A: `@availity/api-axios` uses `axios` under the hood. This lets us use relative urls so you don't have to specify which environment you want to hit. e.g.: if the app is in qa-apps.availity.com, then that is the origin of the url rather than apps.availity.com as in the example.

---

Q: How do I add headers?

A: You can pass headers to the constructor or to the config for a specific request

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test', headers: { 'A-STATIC-HEADER': '987' } });
```

OR

```js
import AvApi from '@availity/api-axios';

const api = new AvApi({ name: 'test' });

const getWithHeaders = async (headerValue) => {
  // We are using the `get` method here, however all of
  // the http methods accept a config as the final argument
  const response = await api.get('123', {
    headers: { 'A-DYNAMIC-HEADER': headerValue },
  });

  return response.data;
};
```
