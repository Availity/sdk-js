---
title: Axios Resources
---

This page has information on pre-defined resources you can import into your app.

## Table of Contents

- [AvUserApi](#avuserapi)
- [AvRegionsApi](#avregionsapi)
- [AvPermissionsApi](#avpermissionsapi)
- [AvUserPermissionsApi](#avuserpermissionsapi)
- [AvSpacesApi](#avspacesapi)
- [AvOrganizationsApi](#avorganizationsapi)
- [AvProvidersApi](#avprovidersapi)
- [AvLogMessageApi](#avlogmessageapi)
- [AvFilesApi](#avfilesapi)
- [AvFilesDeliveryApi](#avfilesdeliveryapi)
- [AvSettingsApi](#avsettingsapi)
- [AvDisclaimersApi](#avdisclaimersapi)
- [AvSlotmachineApi](#avslotmachineapi)
- [AvTelemetryApi](#avtelemetryapi)
- [AvProxyApi](#avproxyapi)

Each pre-defined resource has two exports: the class and an instance. The class follows the pattern `AvUserApi` and the instance is `avUserApi`. In other words, the class is uppercase and the instance is lowercase.

Use the class to extend functionality. Otherwise import the instance to hit the ground running. Follow [our guide](https://availity.github.io/sdk-js/recipes/http-Request) for more information on creating your own endpoint.

### AvUserApi

Get information about the logged in user.

#### `me(config)`

Helper function that returns information about the logged in user.

```js
import { avUserApi } from '@availity/api-axios';

const getUser = async (config) => {
  const user = await avUserApi.me(config);
  return user;
};
```

### AvRegionsApi

Get the logged in user's currently selected region. Can also get the user's associated regions.

#### `getRegions(config)`

Get all regions for the logged in user.

```js
import { avRegionsApi } from '@availity/api-axios';

const fetchRegions = async (userId) => {
  // This method will fetch the userId if you do not provide it
  const response = await avRegionsApi.getRegions({ params: { userId } });

  return response.data;
};
```

#### `getCurrentRegion()`

Returns the user's active region.

```js
import { avRegionsApi } from '@availity/api-axios';

const getRegion = async () => {
  const response = await avRegionsApi.getCurrentRegion();

  return response.data;
};
```

### AvPermissionsApi

Get permissions belonging to the logged in user.

#### `getPermissions(permissionId, region)`

```js
import { avPermissionsApi } from '@availity/api-axios';

const fetchPermissions = async (id, region) => {
  const response = await avPermissionsApi.getPermissions(id, region);

  return response.data;
};
```

### AvUserPermissionsApi

Get permissions and resources of the logged in user.

#### `getPermissions(permissionId, region)`

```js
import { avUserPermissionsApi } from '@availity/api-axios';

const fetchPermissions = async (id, region) => {
  const response = await avUserPermissionsApi.getPermissions(id, region);

  return response.data;
};
```

### AvSpacesApi

Get metadata for the content types for the Spaces platform.

#### `parseSpaceId(query)`

Get the `spaceId` from a query string

```js
import { avSpacesApi } from '@availity/api-axios';

// spaceId will be 123
const spaceId = avSpacesApi.parseSpaceId('?foo=bar&spaceId=123');
```

#### `getSpaceName(spaceId)`

Returns the `name` from the response

```js
import { avSpacesApi } from '@availity/api-axios';

const getName = async () => {
  // will return response.data.name
  const name = await avSpacesApi.getSpaceName('123');
  return name;
};
```

### AvOrganizationsApi

Service that allows you to get user's organizations.

#### `queryOrganizations(user, config)`

Returns organizations belonging to the `user`.

```js
function queryOrganizations(user, config) {
  const queryConfig = this.addParams({ userId: user.id }, config);
  return this.query(queryConfig);
}
```

#### `getOrganizations(config)`

Returns organizations belonging to the logged in user.

```js
function getOrganizations(config) {
  if (config && config.params && config.params.userId) {
    return this.query(config);
  }

  if (!this.avUsers || !this.avUsers.me) {
    throw new Error('avUsers must be defined');
  }

  return this.avUsers
    .me()
    .then((user) => this.queryOrganizations(user, config));
}
```

#### `postGet(data, config, additionalPostGetArgs)`

```js
async function postGet(data, config) {
  if (additionalPostGetArgs) {
    const { data: organizationsData } = await super.postGet(data, config);

    return this.getFilteredOrganizations(
      organizationsData,
      additionalPostGetArgs,
      data
    );
  }

  return super.postGet(data, config);
}
```

#### `getFilteredOrganizations(organizationsData, additionalPostGetArgs, restQueryParams)`

Returns organizations belonging to the logged in user that also have specified `resources`. Meant to be called by `AvOrganizationSelect`, but can be called directly if you already have `organizations` data.

> Please note that pagination does not occur for `organizationsData` when `getFilteredOrganizations` is called directly. For pagination, use [AvOrganizationSelect](https://availity.github.io/availity-react/storybook/?path=/docs/form-components-select-async-selects--organization-select) with the `resourceIds` prop or `postGet(data, config, additionalPostGetArgs)`, where `additionalPostGetArgs` is an object containing the `resourceIds` prop.

Structure arguments like this:

```js
const organizationsData = {
  organizations, // Array of organization objects
  limit,
  offset,
  totalCount,
};

const additionalPostGetArgs = {
  resourceIds, // string or array of strings
};

const data = {
  permissionId,
  region,
};
```

```js
async function getFilteredOrganizations(
  organizationsData,
  additionalPostGetArgs,
  data
) {
  const { resourceIds } = additionalPostGetArgs;
  const { permissionId, region } = data;
  const {
    organizations,
    limit: orgLimit,
    offset: orgOffset,
    totalCount: totalOrgCount,
  } = organizationsData;

  if (typeof permissionId !== 'string' && !Array.isArray(permissionId)) {
    throw new TypeError(
      'permissionId must be either an array of ids or a string'
    );
  }
  if (typeof resourceIds !== 'string' && !Array.isArray(resourceIds)) {
    throw new TypeError(
      'resourceIds must be either an array of ids or a string'
    );
  }

  // resourceIds is passed as readOnly, convert so that we can use Array methods on it
  const resourceIdsArray =
    typeof resourceIds === 'string' ? [resourceIds] : resourceIds;

  if (
    region !== this.previousRegionId ||
    !this.arePermissionsEqual(permissionId)
  ) {
    // avUserPermissions will return a list of user organizations that match given permission and region
    // This call does not need to be paginated and
    // we should not need to call it every time we paginate orgs if region and permissions are the same
    // Limit is set to permissionId.length because that represents maximum results we can get back
    const {
      data: { axiUserPermissions: userPermissions },
    } = await this.avUserPermissions.postGet({
      permissionId,
      region,
      limit: permissionId.length,
    });

    if (userPermissions) {
      this.userPermissions = userPermissions;
      this.previousPermissionIds = permissionId;
      this.previousRegionId = region;
    } else {
      throw new Error('avUserPermissions call failed');
    }
  }

  // Reduce the userPermissions result into a collection of orgs that contain a valid resource
  const authorizedOrgs = this.userPermissions.reduce(
    (accum, userPermission) => {
      userPermission.organizations.forEach((userOrg) => {
        const isDuplicate = accum.some((item) => item.id === userOrg.id);
        if (!isDuplicate) {
          // If this org contains one of the passed in resourceIds, it is an authorized org
          const match = userOrg.resources.some((userResource) => {
            return resourceIdsArray.some(
              (resource) => Number(resource) === Number(userResource.id)
            );
          });
          if (match) {
            accum.push({ id: userOrg.id });
          }
        }
      });

      return accum;
    },
    []
  );

  // avUserPermissions call doesn't return much useful organization data
  // but we can match valid ids to useful data returned from avOrganizations
  const authorizedFilteredOrgs = organizations.filter((org) =>
    authorizedOrgs.some((authorizedOrg) => authorizedOrg.id === org.id)
  );

  // Transform back into data object that ResourceSelect can use and paginate
  return {
    data: {
      authorizedFilteredOrgs,
      totalCount: totalOrgCount,
      limit: orgLimit,
      offset: orgOffset,
    },
  };
}

function arePermissionsEqual(permissionId) {
  if (typeof permissionId !== typeof this.previousPermissionIds) return false;

  if (typeof permissionId === 'string')
    return permissionId === this.previousPermissionIds;

  if (
    Array.isArray(permissionId) &&
    Array.isArray(this.previousPermissionIds)
  ) {
    if (permissionId.length !== this.previousPermissionIds.length) return false;

    // if lengths are equal, need a way to check if values are the same or not
    // Sets won't allow duplicate values
    // if size of Set is greater than length of original arrays
    // then a different value was inserted and they are not equal
    const idSet = new Set([...permissionId], [...this.previousPermissionIds]);
    if (idSet.size !== permissionId.length) return false;

    return true;
  }

  return false;
}
```

### AvProvidersApi

Get providers associated with the logged in user's organization.

#### `getProviders(customerId, config)`

Helper method that gets the providers for the `customerId`.

```js
function getProviders(customerId, config) {
  const queryConfig = this.addParams({ customerId }, config);
  return this.query(queryConfig);
}
```

#### `normalize(providers)`

Helper method that adds `name` field to the `providers` collection. The name field is computed from other properies of the provider object.

```js
function normalize(providers) {
  const cloned = providers.slice();

  cloned.forEach((provider) => {
    provider.name = provider.businessName
      ? provider.businessName
      : `${provider.lastName}, ${provider.firstName}`;
  });

  return cloned;
}
```

### AvLogMessagesApi

Create a log message.

#### `send(level, entires)`

All methods take a key value object. A key named 'level` determines the log level type in the logs.

```js
function send(level, entries) {
  delete entries.level;
  const payload = { level, entries };
  const flattened = flattenObject(payload);

  return Object.keys(flattened).reduce((accum, key) => {
    accum.append(key, flattened[key]);
    return accum;
  }, new FormData());
}
```

#### `debug(entries)`

```js
function debug(entries) {
  return this.sendBeacon(this.send('debug', entries));
}
```

#### `info(entries)`

```js
function info(entries) {
  return this.sendBeacon(this.send('info', entries));
}
```

#### `warn(entries)`

```js
function warn(entries) {
  return this.sendBeacon(this.send('warn', entries));
}
```

#### `error(entries)`

```js
function error(entries) {
  return this.sendBeacon(this.send('error', entries));
}
```

### AvPdfApi

#### `onPdf(response)`

```js
function onPdf(response) {
  window.location = response.data.links.pdf.href;
}
```

```js
function getPdf(data, config) {
  if (!data.applicationId || !data.fileName || !data.html) {
    throw new Error('[applicationId], [fileName] and [html] must be defined');
  }

  return this.post(data, config).then(this.onPdf);
}
```

### AvFilesApi

Upload a file to a bucket in the vault

#### `uploadFile(data, config)`

Method to upload a file. `data` contains FormData elements with a key of either `reference` (if pointed to an existing file) or `filedata` (if uploading a new file)
`config` should contain `customerId`, `id` (the bucketId), and `clientId`

```js
function uploadFile(data, config) {
  if (!config.customerId || !config.clientId) {
    throw new Error(
      '[config.customerId] and [config.clientId] must be defined'
    );
  }
  config = this.config(config);
  config.headers['X-Availity-Customer-ID'] = config.customerId;
  config.headers['X-Client-ID'] = config.clientId;

  return this.create(data, config);
}
```

### AvFilesDelivery

Upload a batch of files to a designated channel configured on the server.

#### `uploadFilesDelivery(data, config)`

Method to upload a batch of file deliveries. `data` contains an array of `deliveries`. Provide the `fileUri` (reference field from AvFiles), `deliveryChannel`, and the required `metadata` for that channel.

```js
function uploadFilesDelivery(data, config) {
  if (!config.customerId || !config.clientId) {
    throw new Error(
      '[config.customerId] and [config.clientId] must be defined'
    );
  }
  config = this.config(config);
  config.headers['X-Availity-Customer-ID'] = config.customerId;
  config.headers['X-Client-ID'] = config.clientId;

  return this.create(data || {}, config);
}
```

Example `data`

```js
const data = {
  deliveries: [
    {
      fileURI: upload.references[0],
      deliveryChannel: 'DEMO',
      metadata: {
        payerId: 'PAYERID',
        requestId: '123',
        patientLastName: 'lastName',
        patientFirstName: 'firstName',
      },
    },
  ],
};
```

`config` should contain `customerId` and `clientId`

#### Example Response

```json
{
  "id": "123456", // batchId "status": "COMPLETE", // COMPLETE/INPROGRESS
  "deliveries": [
    {
      "id": "56789", // deliveryId "deliveryBatchId": "123456",
      "fileURI": "<fileUri>",
      "deliveryChannel": "DEMO",
      "deliveryStatus": "ERRORED", // INPROGRESS/REJECTED/ERRORED/DELIVERED
      "errors": [{ "message": "error message", "subject": "subject of error" }],
      "metadata": {
        "payerId": "PAYERID",
        "requestId": "123",
        "patientLastName": "lastName",
        "patientFirstName": "firstName"
      }
    }
  ]
}
```

#### `getLocation(response)`

Return the url based on the response

```js
import { avFilesDeliveryApi } from '@availity/api-axios';

const getLocation = (response) => {
  const url = avFilesDeliveryApi.getLocation(response);
  return url;
};
```

### AvSettingsApi

Store and retrieve settings for reuse.

#### `getApplication(applicationdId, config)`

```js
import { avSettingsApi } from '@availity/api-axios';

const appId = 'test-app';

const getSettings = async () => {
  const response = await avSettingsApi.getApplication(appId);
  return response.data;
};
```

#### `setApplication(applicationId, data, config)`

```js
import { avSettingsApi } from '@availity/api-axios';

const appId = 'test-app';

const updateSettings = async (data) => {
  const response = await avSettingsApi.setApplication(appId, data);
  return response.data;
};
```

### AvDisclaimersApi

Get disclaimers for payer space.

#### `getDisclaimers(id, config)`

```js
import { avDisclaimersApi } from '@availity/api-axios';

const fetchDisclaimers = async (id) => {
  const response = await avDisclaimersApi.getDisclaimers(id);
  return response.data;
};
```

### AvSlotMachineApi

GraphQL Server containing different queries and mutation.

#### `query(query, variables)`

```js
import { avSlotMachineApi } from '@availity/api-axios';

const queryApi = async (query, variables) => {
  const response = await avSlotMachineApi.query(query, variables);
  return response.data;
};
```

### AvTelemetryApi

Endpoint to send telemetry data by level and key/value pairs.

#### `info(data)`

#### `warn(data)`

#### `error(data)`

#### `debug(data)`

```js
import { avTelemetryApi } from '@availity/api-axios';

const sendTelemetryMessages = async (data1, data2, data3, data4) => {
  const res1 = await avTelemetryApi.info(data1);
  const res2 = await avTelemetryApi.error(data2);
  const res3 = await avTelemetryApi.warn(data3);
  const res4 = await avTelemetryApi.debug(data4);
  return { res1, res2, res3, res4 };
};
```

### AvProxyApi

Endpoint for making outbound proxy calls. For a detailed example see [Creating a Proxy](../recipes/proxy.md)

#### `X-Availity-Customer-ID` Header

The `X-Availity-Customer-ID` header is required in the config for all methods. This can be done manually when the method is called as shown in the examples below. Alternatively, if the `X-Availity-Customer-ID` header needs to be added to all (or most) of your api calls, then it can be passed in axios.defaults.headers.common['X-Availity-Customer-ID'] when initializing axios. For more information, see [Config Defaults](https://axios-http.com/docs/config_defaults).

The `customerId` is a field in the response from the Organizations API. For more information on the API see the [AvOrganizationsApi](#avorganizationsapi) and the [Organizations API Definition](./definitions/organizations.md). For UIs, the [AvOrganizationSelect component](https://availity.github.io/availity-react/form/select/components/organization-select) provides a dropdown for the user to select an Organization they are associated with. By default the value returned from the AvOrganizationSelect component is the organization's `id`. Use the (valueKey)[https://availity.github.io/availity-react/form/select/components/select/#valuekey-string] prop to get the `customerId`.

#### `create(data, config)`

##### Params

`data`: Data to be sent in the body of the request

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.create(data, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response.data.climbingHolds || [];
  } catch {
    return [];
  }
};
```

#### `delete(id, config)`

##### Params

`id`: The id of the item to delete

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.delete(id, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `get(id, config)`

##### Params

`id`: The id of the item to get

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.get(id, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `patch(id, data, config)`

##### Params

`id`: The id of the item to patch

`data`: Data to be sent in the body of the request

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.patch(id, data, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `post(data, config)`

##### Params

`data`: Data to be sent in the body of the request

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.post(data, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `postGet(id, config)`

##### Params

`id`: The id of the item to get

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.postGet(id, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `put(id, data, config)`

##### Params

`id`: The id of the item to put

`data`: Data to be sent in the body of the request

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.put(id, data, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `onResponse(config, afterResponse)`

##### Params

`config`: The request config. For options see [Options](./getting-started.md#options)

`afterResponse`: Function to handle response

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.onResponse(
      {
        sessionBust: false,
        headers: { 'X-Availity-Customer-ID': 'customerId' },
      },
      afterResponse
    );
    return response || [];
  } catch {
    return [];
  }
};
```

#### `query(config)`

##### Params

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.config({
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': 'customerId' },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `remove(id, config)`

See [delete(id, config)](#deleteid-config)

#### `request(config, afterResponse)`

##### Params

`config`: The request config. For options see [Options](./getting-started.md#options)

`afterResponse`: Function to handle response

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (customerId) => {
  try {
    const response = await proxyApi.request(
      {
        sessionBust: false,
        headers: { 'X-Availity-Customer-ID': 'customerId' },
      },
      afterResponse
    );
    return response || [];
  } catch {
    return [];
  }
};
```

#### `update(id, data, config)`

See [put(id, data, config)](#putid-data-config)
