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
- [AvCodesApi](#avcodesapi)
- [AvNavigationApi](#avnavigationapi)
- [AvNotificationsApi](#avnotificationsapi)
- [AvLogMessagesApi](#avlogmessagesapi)
- [AvLogMessagesApiV2](#avlogmessagesapiv2)
- [AvLogMessagesApiV3](#avlogmessagesapiv3)
- [AvFilesApi](#avfilesapi)
- [AvFilesDeliveryApi](#avfilesdeliveryapi)
- [AvSettingsApi](#avsettingsapi)
- [AvDisclaimersApi](#avdisclaimersapi)
- [AvTelemetryApi](#avtelemetryapi)
- [AvPdfApi](#avpdfapi)
- [AvPdfMicroserviceApi](#avpdfmicroserviceapi)
- [AvStashApi](#avstashapi)
- [AvRouteConfigurationsApi](#avrouteconfigurationsapi)
- [AvWebQLApi](#avwebqlapi)
- [AvProxyApi](#avproxyapi)

Each pre-defined resource has two exports: the class and an instance. The class follows the pattern `AvUserApi` and the instance is `avUserApi`. In other words, the class is uppercase and the instance is lowercase.

Use the class to extend functionality. Otherwise import the instance to hit the ground running. Follow [our guide](https://availity.github.io/sdk-js/recipes/http-request) for more information on creating your own endpoint.

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

Service that allows you to get a user's organizations, optionally filtered by permissions and resources.

#### `queryOrganizations(user, config)`

Returns organizations belonging to the given `user`.

```js
import { avOrganizationsApi, avUserApi } from '@availity/api-axios';

const user = await avUserApi.me();
const response = await avOrganizationsApi.queryOrganizations(user);
const orgs = response.data.organizations;
```

#### `getOrganizations(config)`

Returns organizations belonging to the logged-in user. Automatically fetches the current user if no `userId` is provided in config.

```js
import { avOrganizationsApi } from '@availity/api-axios';

const response = await avOrganizationsApi.getOrganizations();
const orgs = response.data.organizations;

// Or pass a userId explicitly
const response2 = await avOrganizationsApi.getOrganizations({
  params: { userId: '12345' },
});
```

#### `postGet(data, config, additionalPostGetArgs)`

When `additionalPostGetArgs` is provided with `permissionIds` and/or `resourceIds`, returns only organizations that match the filtering criteria. Without `additionalPostGetArgs`, behaves like a standard `postGet`.

```js
import { avOrganizationsApi } from '@availity/api-axios';

// Standard postGet (no filtering)
const response = await avOrganizationsApi.postGet({ limit: 50, offset: 0 });

// Filtered by permissions and resources
const filtered = await avOrganizationsApi.postGet(
  { region: 'FL' },
  {},
  { permissionIds: ['7890'], resourceIds: ['1234'] }
);
// filtered.data.authorizedFilteredOrgs - array of matching organizations
// filtered.data.totalCount, filtered.data.limit, filtered.data.offset
```

#### `getFilteredOrganizations(additionalPostGetArgs, data)`

Filters organizations by permissions and/or resources. This is called internally by `postGet` but can be called directly if you need just the authorized org list.

##### Parameters

- **additionalPostGetArgs** - `object`
  - **permissionIds** - `string | string[] | string[][]`. Permission IDs to filter by. Supports AND/OR logic (see below).
  - **resourceIds** - `string | string[] | string[][]`. Resource IDs to further filter by. Supports AND/OR logic.
- **data** - `object | string`. Must contain `permissionId` (used as fallback if `additionalPostGetArgs.permissionIds` is not set).

##### AND/OR Logic for Permission and Resource IDs

Both `permissionIds` and `resourceIds` support nested arrays for AND/OR logic:

```js
// OR logic: user needs ANY of these permissions
const orFilter = { permissionIds: ['perm1', 'perm2', 'perm3'] };

// AND/OR logic: (perm1 AND perm2) OR perm3
const andOrFilter = { permissionIds: [['perm1', 'perm2'], 'perm3'] };

// Same logic applies to resourceIds
const resourceFilter = { resourceIds: [['res1', 'res2'], 'res3'] };
```

##### Example

```js
import { avOrganizationsApi } from '@availity/api-axios';

const authorizedOrgs = await avOrganizationsApi.getFilteredOrganizations(
  { permissionIds: ['7890'], resourceIds: ['1234', '5678'] },
  { permissionId: '7890' }
);
// Returns array of { id, resources, ... } for matching organizations
```

> **Note:** Results are cached by permission/region. Subsequent calls with the same permissions and region will not re-fetch from the API.

### AvProvidersApi

Get providers associated with the logged in user's organization.

#### `getProviders(customerId, config)`

Helper method that gets the providers for the `customerId`.

```js
import { avProvidersApi } from '@availity/api-axios';

const fetchProviders = async (customerId) => {
  const response = await avProvidersApi.getProviders(customerId);
  return response.data;
};
```

#### `normalize(providers)`

Helper method that adds `name` field to the `providers` collection. The name field is computed from other properties of the provider object.

```js
import { avProvidersApi } from '@availity/api-axios';

const providers = [
  { businessName: 'Acme Health' },
  { firstName: 'John', lastName: 'Doe' },
];

const normalized = avProvidersApi.normalize(providers);
// [{ businessName: 'Acme Health', name: 'Acme Health' },
//  { firstName: 'John', lastName: 'Doe', name: 'Doe, John' }]
```

### AvCodesApi

Query medical codes (CPT, ICD, etc.) from the Availity codes API.

```js
import { avCodesApi } from '@availity/api-axios';

const fetchCodes = async (listId, query) => {
  const response = await avCodesApi.postGet({ list: listId, q: query });
  return response.data;
};
```

### AvNavigationApi

Get navigation/spaces metadata for the platform.

```js
import { avNavigationApi } from '@availity/api-axios';

const fetchNavigation = async (spaceId) => {
  const response = await avNavigationApi.get(spaceId);
  return response.data;
};
```

### AvNotificationsApi

Get and manage user notifications.

#### `deleteByTopic(topic, config)`

Delete all notifications for a given topic.

```js
import { avNotificationsApi } from '@availity/api-axios';

// Get notifications
const response = await avNotificationsApi.query();

// Delete notifications for a topic
await avNotificationsApi.deleteByTopic('my-topic-id');
```

### AvLogMessagesApi

Create log messages via the legacy log endpoint. For most use cases, prefer `avLogMessagesApiV2` (see below).

#### Methods: `debug(entries)`, `info(entries)`, `warn(entries)`, `error(entries)`

Each method accepts a key/value object and sends it as a log entry at the corresponding level.

```js
import { avLogMessagesApi } from '@availity/api-axios';

avLogMessagesApi.info({ message: 'User clicked submit', appId: 'my-app' });
avLogMessagesApi.error({ message: 'Request failed', statusCode: 500 });
```

### AvLogMessagesApiV2

DMA (Data Management & Analytics) log messages. This is the **recommended** log API for Splunk and Insights integration. Uses the microservice path `/ms/api/availity/internal/spc/analytics/log`.

#### Methods: `debug(entries)`, `info(entries)`, `warn(entries)`, `error(entries)`

```js
import { avLogMessagesApiV2 } from '@availity/api-axios';

avLogMessagesApiV2.info({
  action: 'click',
  label: 'Submit Button',
  spaceId: 'ABC123',
});
```

> **Note:** `avLogMessagesApiV2` is also used as the logging backend for `AvSplunkAnalytics` in `@availity/analytics-core`.

### AvLogMessagesApiV3

DMA Cloud log messages. Uses the cloud path `/cloud/web/appl/analytics/log`. Same API as V2, but routes through the cloud gateway.

```js
import { avLogMessagesApiV3 } from '@availity/api-axios';

avLogMessagesApiV3.info({ action: 'page_view', url: '/dashboard' });
```

### AvPdfApi

Generate PDFs from HTML content.

#### `getPdf(data, config)`

Generates a PDF and redirects the browser to the download URL.

- **data.applicationId** - `string`. Required.
- **data.fileName** - `string`. Required. Output filename.
- **data.html** - `string`. Required. HTML content to convert.

```js
import { avPdfApi } from '@availity/api-axios';

await avPdfApi.getPdf({
  applicationId: 'my-app',
  fileName: 'report.pdf',
  html: '<h1>My Report</h1><p>Content here...</p>',
});
// Browser will navigate to the generated PDF URL
```

### AvPdfMicroserviceApi

PDF generation via the microservice gateway (v2). Same concept as `AvPdfApi` but uses the `/ms/api/availity/internal/spc/pdf/` path. Useful when you need the microservice routing.

```js
import { avPdfMicroserviceApi } from '@availity/api-axios';

const response = await avPdfMicroserviceApi.post({
  applicationId: 'my-app',
  fileName: 'report.pdf',
  html: '<h1>Report</h1>',
});
```

### AvStashApi

Session stash for passing data between applications. Creates temporary server-side sessions and opens the target app with a `sessionId` parameter.

#### `launch(params, linkTo)`

Creates a stash session with the given `params` and opens `linkTo` in the current window with the session ID appended.

- **params** - `object`. Data to store in the stash session.
- **linkTo** - `string`. Required. URL to open after creating the session.

```js
import { avStashApi } from '@availity/api-axios';

// Creates a session and opens the target app with ?sessionId=<id>
const sessionId = await avStashApi.launch(
  { patientId: '12345', returnUrl: '/dashboard' },
  'https://apps.availity.com/my-other-app'
);
```

### AvRouteConfigurationsApi

Look up EPDM route configuration for a given transaction type, submission mode, and payer.

#### `getConfiguration(transactionTypeCode, submissionModeCode, payerId)`

```js
import { avRouteConfigurationsApi } from '@availity/api-axios';

const response = await avRouteConfigurationsApi.getConfiguration(
  '270', // transaction type code
  'RealTime', // submission mode
  'AVAILITY' // payer ID
);
const config = response.data;
```

### AvWebQLApi

GraphQL endpoint for SPC (Spaces/Platform/Core) queries.

```js
import { avWebQLApi } from '@availity/api-axios';

const response = await avWebQLApi.create({
  query: `
    query GetSpace($id: ID!) {
      space(id: $id) {
        id
        name
        type
      }
    }
  `,
  variables: { id: '12345' },
});
const data = response.data;
```

### AvFilesApi

Upload a file to a bucket in the vault. The axios version uses `@availity/upload-core` for tus-based resumable uploads.

#### `uploadFile(data, config)`

Method to upload a file. `config` must contain `customerId`, `id` (the bucketId), and `clientId`.

```js
import { avFilesApi } from '@availity/api-axios';

const formData = new FormData();
formData.append('filedata', file);

const response = await avFilesApi.uploadFile(formData, {
  customerId: 'my-customer-id',
  clientId: 'my-client-id',
  id: 'my-bucket-id',
});
```

> For most upload scenarios, consider using `@availity/upload-core` directly which provides progress tracking, virus scanning, and resumable upload support.

### AvFilesDeliveryApi

Upload a batch of files to a designated channel configured on the server.

#### `uploadFilesDelivery(data, config)`

Method to upload a batch of file deliveries. `config` must contain `customerId` and `clientId`.

```js
import { avFilesDeliveryApi } from '@availity/api-axios';

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

const response = await avFilesDeliveryApi.uploadFilesDelivery(data, {
  customerId: 'my-customer-id',
  clientId: 'my-client-id',
});
```

#### Example Response

```js
// Response shape
{
  id: '123456', // batchId
  status: 'COMPLETE', // COMPLETE or INPROGRESS
  deliveries: [
    {
      id: '56789', // deliveryId
      deliveryBatchId: '123456',
      fileURI: '<fileUri>',
      deliveryChannel: 'DEMO',
      deliveryStatus: 'DELIVERED', // INPROGRESS, REJECTED, ERRORED, or DELIVERED
      errors: [{ message: 'error message', subject: 'subject of error' }],
      metadata: {
        payerId: 'PAYERID',
        requestId: '123',
        patientLastName: 'lastName',
        patientFirstName: 'firstName',
      },
    },
  ],
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

#### `getApplication(applicationId, config)`

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

The `customerId` is a field in the response from the Organizations API. For more information on the API see the [AvOrganizationsApi](#avorganizationsapi) and the [Organizations API Definition](./definitions/organizations.md). For UIs, the [AvOrganizationSelect component](https://availity.github.io/availity-react/form/select/components/organization-select) provides a dropdown for the user to select an Organization they are associated with. By default the value returned from the AvOrganizationSelect component is the organization's `id`. Use the [valueKey](https://availity.github.io/availity-react/form/select/components/select/#valuekey-string) prop to get the `customerId`.

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
      headers: { 'X-Availity-Customer-ID': customerId },
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
      headers: { 'X-Availity-Customer-ID': customerId },
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
      headers: { 'X-Availity-Customer-ID': customerId },
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
      headers: { 'X-Availity-Customer-ID': customerId },
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
      headers: { 'X-Availity-Customer-ID': customerId },
    });
    return response || [];
  } catch {
    return [];
  }
};
```

#### `postGet(data, config)`

##### Params

`data`: Data to be sent in the body of the request

`config`: The request config. For options see [Options](./getting-started.md#options)

##### Example

```js
import { AvProxyApi } from '@availity/api-axios';

// This will now let us make calls to /api/v1/proxy/availity/my/proxy
const proxyApi = new AvProxyApi({ tenant: 'availity', name: '/my/proxy' });

const fetchData = async (data, customerId) => {
  try {
    const response = await proxyApi.postGet(data, {
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': customerId },
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
      headers: { 'X-Availity-Customer-ID': customerId },
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
        headers: { 'X-Availity-Customer-ID': customerId },
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
    const response = await proxyApi.query({
      sessionBust: false,
      headers: { 'X-Availity-Customer-ID': customerId },
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
        headers: { 'X-Availity-Customer-ID': customerId },
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
