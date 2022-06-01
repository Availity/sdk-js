---
title: Creating a Proxy
---

The Availity portal does not allow traffic to come from anywhere by default. Our proxy service will map a route on our end to an external route configured by an administrator. Once that has been setup you can begin to use the `AvProxyApi` to fetch data from the external route.

## Getting Started

On this page, we will show you how to use `AvProxyApi` class to easily call the desired endpoint. If you need help mocking the data for local development then check out our [guide](https://availity.github.io/availity-workflow/tutorial/mocks/).

## Example

Below is an example `App` component where we create a proxy, and then call it.

### Adding API Code Snippet

```js
import React, { useEffect, useState } from 'react';
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async () => {
  try {
    const response = await proxyApi.query({ sessionBust: false });
    return response.data.climbingHolds || [];
  } catch {
    return [];
  }
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchData();
      setClimbingHolds(response);
      setLoading(false);
    };

    if (!loading) {
      fetchData();
    }
  }, []);

  return (
    <div>
      {data.map((item) => {
        return <li key={item.key}>{item.name}</li>;
      })}
    </div>
  );
};

export default App;
```

### Adding a new route for mocks

The above code snippet runs a method called `fetchData` on mount that will fetch the response from `AvProxyApi`.

Since we know the route is going go to `/api/v1/proxy/availity/my/proxy` we need to add our proxy route in the `routes.json` by adding the following to our file:

```json header=routes.json
{
  "v1/proxy/availity/my/proxy": {
    "file": "climbingholds.json"
  }
}
```

All proxy routes will begin with `v1/proxy/`. You will complete the route with the `tenant` and `name` you supplied when creating a new instance of AvProxyApi. In this case `tenant` would be `availity` and the `name` would be `/my/proxy` .

### Adding Response Data

Now that we have the route we need to test out our `climbingholds.json` response:

```json header=climbingholds.json
{
  "totalCount": 1,
  "page": 1,
  "perPage": 50,
  "climbingHolds": [
    {
      "name": "Jug"
    },
    {
      "name": "Pinch"
    },
    {
      "name": "Crimp"
    }
  ]
}
```

While the response we added was not simple, it is more indicative of a real response.

If you your application is currently running you will need to restart it as the proxy server will need to be restarted in order to get the updated proxy data.

To determine if your proxy is working correctly, open your browser to `localhost:3000` . Right click in the browser and select 'Inspect'. Navigate to the network tab and you should see your proxy response.

The climbing hold list should be rendered on the screen.

<img width="100%" src="browser-response.png" alt="Browser Response" />

You should also see this in your terminal

```bash
GET /v1/proxy/availity/my/proxy 200 climbingholds.json
```
