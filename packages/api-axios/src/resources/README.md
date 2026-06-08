# API Resources

Pre-configured Axios-based resource instances for the Availity REST API. Each class extends its corresponding `@availity/api-core` base class with Axios wired in as the HTTP client.

All resources export both a class (for custom configuration) and a ready-to-use singleton instance.

## Table of Contents

- [AvUserApi](#avuserapi)
- [AvRegionsApi](#avregionsapi)
- [AvPermissionsApi](#avpermissionsapi)
- [AvUserPermissionsApi](#avuserpermissionsapi)
- [AvNavigationApi](#avnavigationapi)
- [AvSpacesApi](#avspacesapi)
- [AvOrganizationsApi](#avorganizationsapi)
- [AvProvidersApi](#avprovidersapi)
- [AvCodesApi](#avcodesapi)
- [AvDisclaimersApi](#avdisclaimersapi)
- [AvLogMessagesApi](#avlogmessagesapi)
- [AvLogMessagesApiV2](#avlogmessagesapiv2)
- [AvLogMessagesApiV3](#avlogmessagesapiv3)
- [AvTelemetryApi](#avtelemetryapi)
- [AvNotificationsApi](#avnotificationsapi)
- [AvProxyApi](#avproxyapi)
- [AvFilesApi](#avfilesapi)
- [AvFilesDeliveryApi](#avfilesdeliveryapi)
- [AvPdfApi](#avpdfapi)
- [AvPdfMicroserviceApi](#avpdfmicroserviceapi)
- [AvRouteConfigurationsApi](#avrouteconfigurationsapi)
- [AvSettingsApi](#avsettingsapi)
- [AvStashApi](#avstashapi)
- [AvWebQLApi](#avwebqlapi)

## Usage

```js
import { avUserApi, avRegionsApi } from '@availity/api-axios';

const user = await avUserApi.me();
const regions = await avRegionsApi.getRegions();
```

For custom configuration, instantiate the class directly:

```js
import { AvProxyApi } from '@availity/api-axios';

const customApi = new AvProxyApi({ tenant: 'my-tenant' });
```

---

## AvUserApi

Get information about the currently logged-in user.

**Singleton:** `avUserApi`

### Methods

#### `me(config)`

Returns the current user's profile data (unwraps `response.data`).

```js
import { avUserApi } from '@availity/api-axios';

const user = await avUserApi.me();
console.log(user.id, user.firstName);
```

---

## AvRegionsApi

Get the logged-in user's current selected region and associated regions.

**Singleton:** `avRegionsApi`

### Methods

#### `getRegions(config)`

Get regions for the logged-in user. Skips the user lookup if `config.params.userId` is provided.

#### `getCurrentRegion()`

Returns only the currently selected region.

### Hooks

- `afterUpdate` — Busts the page cache after a region update.
- `getQueryResultKey()` — Returns `'regions'` (for `all()` support).

```js
import { avRegionsApi } from '@availity/api-axios';

const regions = await avRegionsApi.getRegions();
const current = await avRegionsApi.getCurrentRegion();
```

---

## AvPermissionsApi

Get permissions belonging to the logged-in user.

**Singleton:** `avPermissionsApi`

### Methods

#### `getPermissions(id, region)`

Query permissions by ID and region.

```js
import { avPermissionsApi } from '@availity/api-axios';

const perms = await avPermissionsApi.getPermissions('7777', 'FL');
```

---

## AvUserPermissionsApi

Get permissions with associated organizations and resources.

**Singleton:** `avUserPermissionsApi`

### Methods

#### `getPermissions(permissionId, region)`

Query user permissions by permission ID(s) and region.

#### `afterQuery(response)`

Hook that unwraps `axiUserPermissions` from the response.

```js
import { avUserPermissionsApi } from '@availity/api-axios';

const userPerms = await avUserPermissionsApi.getPermissions(['7777', '8888'], 'FL');
```

---

## AvNavigationApi

Get navigation metadata for Spaces.

**Singleton:** `avNavigationApi`

No custom methods — uses standard `query()` and `get()`.

---

## AvSpacesApi

Get metadata for content types on the Spaces platform.

**Singleton:** `avSpacesApi`

### Methods

#### `parseSpaceId(query)`

Extracts `spaceId` from a query string.

#### `getSpaceName(spaceId)`

Fetches and returns the space name for the given ID.

```js
import { avSpacesApi } from '@availity/api-axios';

const name = await avSpacesApi.getSpaceName('12345');
```

---

## AvOrganizationsApi

Get the logged-in user's active organizations with optional permission/resource filtering.

**Singleton:** `avOrganizationsApi`

### Methods

#### `queryOrganizations(user, config)`

Returns organizations belonging to the given user.

#### `getOrganizations(config)`

Returns organizations for the logged-in user.

#### `postGet(data, config, additionalPostGetArgs)`

Filters returned organizations by permissions and resources when `additionalPostGetArgs` is provided.

#### `getFilteredOrganizations(additionalPostGetArgs, data)`

Performs permission/resource filtering using `avUserPermissionsApi`.

#### `sanitizeIds(unsanitized)`

Converts number/string/array IDs to string format.

#### `arePermissionsEqual(permissionId)`

Compares a permission set against the previously cached set.

```js
import { avOrganizationsApi } from '@availity/api-axios';

const orgs = await avOrganizationsApi.getOrganizations();
```

---

## AvProvidersApi

Get providers associated with an organization.

**Singleton:** `avProvidersApi`

### Methods

#### `getProviders(customerId, config)`

Query providers for the given customer ID.

#### `normalize(providers)`

Adds a computed `name` field (`businessName` or `lastName, firstName`) to each provider.

```js
import { avProvidersApi } from '@availity/api-axios';

const response = await avProvidersApi.getProviders('12345');
const providers = avProvidersApi.normalize(response.data.providers);
```

---

## AvCodesApi

Look up Availity proprietary codes.

**Singleton:** `avCodesApi`

No custom methods — uses standard CRUD operations.

```js
import { avCodesApi } from '@availity/api-axios';

const codes = await avCodesApi.query({ params: { list: 'MY_LIST', code: '1' } });
```

---

## AvDisclaimersApi

Get disclaimers for the platform.

**Singleton:** `avDisclaimersApi`

### Methods

#### `getDisclaimers(id, config)`

Query disclaimers by ID.

```js
import { avDisclaimersApi } from '@availity/api-axios';

const disclaimers = await avDisclaimersApi.getDisclaimers('disclaimer-abc');
```

---

## AvLogMessagesApi

Send log messages via `sendBeacon` to the legacy logging endpoint.

**Singleton:** `avLogMessagesApi`

### Methods

#### `send(level, entries)`

Serializes entries into a URL-encoded string. Returns the encoded string.

#### `debug(entries)` / `info(entries)` / `warn(entries)` / `error(entries)`

Sends a beacon with the given log level.

```js
import { avLogMessagesApi } from '@availity/api-axios';

avLogMessagesApi.info({ event: 'page_view', page: '/dashboard' });
```

---

## AvLogMessagesApiV2

Send log messages via the DMA microservice endpoint. Supports `overrides` and filters null values.

**Singleton:** `avLogMessagesApiV2`

### Methods

Same as [AvLogMessagesApi](#avlogmessagesapi): `send`, `debug`, `info`, `warn`, `error`.

```js
import { avLogMessagesApiV2 } from '@availity/api-axios';

avLogMessagesApiV2.info({ event: 'click', overrides: { akaName: 'my-app' } });
```

---

## AvLogMessagesApiV3

Send log messages via the cloud DMA endpoint. Same interface as V2, routed through the cloud path.

**Singleton:** `avLogMessagesApiV3`

### Methods

Same as [AvLogMessagesApiV2](#avlogmessagesapiv2): `send`, `debug`, `info`, `warn`, `error`.

---

## AvTelemetryApi

Send telemetry data via the analytics microservice using `sendBeacon`.

**Singleton:** `avTelemetryApi`

### Methods

#### `send(level, data)`

Serializes telemetry data (including `telemetryBody`) into a URL-encoded string.

#### `debug(data)` / `info(data)` / `warn(data)` / `error(data)`

Sends a beacon with the given level.

```js
import { avTelemetryApi } from '@availity/api-axios';

avTelemetryApi.info({
  customerId: '1194',
  telemetryBody: {
    source_system: 'my-app',
    entries: { event: 'page_load', action: 'render' },
  },
});
```

---

## AvNotificationsApi

Manage user notifications.

**Singleton:** `avNotificationsApi`

### Methods

#### `deleteByTopic(topic, config)`

Delete all notifications for a given topic.

```js
import { avNotificationsApi } from '@availity/api-axios';

await avNotificationsApi.deleteByTopic('my-topic-id');
```

---

## AvProxyApi

Create API definitions for services proxied to a tenant's API gateway.

**Class only** (no singleton — requires `tenant` config).

### Options

#### `tenant` (required)

The customer/tenant name used in the proxy URL path.

```js
import { AvProxyApi } from '@availity/api-axios';

const proxyApi = new AvProxyApi({ tenant: 'healthplan' });
const response = await proxyApi.query({ params: { foo: 'bar' } });
```

---

## AvFilesApi

Upload files to a vault bucket using resumable tus uploads via `@availity/upload-core`.

**Singleton:** `avFilesApi`

### Methods

#### `uploadFile(data, config)`

Uploads a JSON file using resumable upload. `config` must include `customerId`, `clientId`, and `id` (bucket ID). Optionally provide `fileName`.

```js
import { avFilesApi } from '@availity/api-axios';

const upload = await avFilesApi.uploadFile(
  { claimData: '...' },
  { customerId: 'cust1', clientId: 'app1', id: 'bucket-123' }
);
```

---

## AvFilesDeliveryApi

Upload a batch of files to a configured delivery channel with polling support.

**Singleton:** `avFilesDeliveryApi`

### Methods

#### `uploadFilesDelivery(data, config)`

Submit file deliveries. `config` must include `customerId` and `clientId`.

```js
import { avFilesDeliveryApi } from '@availity/api-axios';

const data = {
  deliveries: [
    {
      fileURI: 'ref-from-upload',
      deliveryChannel: 'DEMO',
      metadata: { payerId: 'PAYER1', requestId: '123' },
    },
  ],
};
await avFilesDeliveryApi.uploadFilesDelivery(data, { customerId: 'cust1', clientId: 'app1' });
```

---

## AvPdfApi

Generate PDFs from HTML content via the legacy API.

**Singleton:** `avPdfApi`

### Methods

#### `getPdf(data, config)`

Generates a PDF and redirects the browser to it. `data` must include `applicationId`, `fileName`, and `html`.

#### `onPdf(response)`

Redirects the browser to the generated PDF URL.

```js
import { avPdfApi } from '@availity/api-axios';

await avPdfApi.getPdf({
  applicationId: 'app-123',
  fileName: 'report.pdf',
  html: '<h1>Hello</h1>',
});
```

---

## AvPdfMicroserviceApi

Generate PDFs via the microservice endpoint.

**Singleton:** `avPdfMicroserviceApi`

Custom `getUrl` override handles the trailing-slash pattern of this service.

```js
import { avPdfMicroserviceApi } from '@availity/api-axios';

const response = await avPdfMicroserviceApi.create({ html: '<h1>Report</h1>' });
```

---

## AvRouteConfigurationsApi

Look up EDI route configurations.

**Singleton:** `avRouteConfigurationsApi`

### Methods

#### `getConfiguration(transactionTypeCode, submissionModeCode, payerId)`

Query route configurations by transaction type, submission mode, and payer.

```js
import { avRouteConfigurationsApi } from '@availity/api-axios';

const config = await avRouteConfigurationsApi.getConfiguration('270', 'RT', 'PAYER1');
```

---

## AvSettingsApi

Store and retrieve application settings per user.

**Singleton:** `avSettingsApi`

### Methods

#### `getApplication(applicationId, config)`

Get settings for an application. Resolves the current user if `userId` not provided.

#### `setApplication(applicationId, data, config)`

Create or update settings. Resolves the current user if `userId` not in `data.scope`.

```js
import { avSettingsApi } from '@availity/api-axios';

const settings = await avSettingsApi.getApplication('my-app');
await avSettingsApi.setApplication('my-app', {
  scope: {},
  settings: { theme: 'dark' },
});
```

---

## AvStashApi

Create temporary session data and launch a target URL with the session ID.

**Singleton:** `avStashApi`

### Methods

#### `launch(params, linkTo)`

Creates a stash entry with `params`, then opens `linkTo` with `sessionId` appended as a query parameter. Returns the session ID.

```js
import { avStashApi } from '@availity/api-axios';

const sessionId = await avStashApi.launch(
  { claimId: '12345', payerId: 'BCBS' },
  '/apps/claim-viewer'
);
// Opens: /apps/claim-viewer?sessionId=abc-123
```

---

## AvWebQLApi

Execute GraphQL queries against the Availity WebQL endpoint.

**Singleton:** `avWebQLApi`

No custom methods — use `create()` (POST) with your GraphQL query/variables.

```js
import { avWebQLApi } from '@availity/api-axios';

const response = await avWebQLApi.create({
  query: '{ user { id firstName } }',
});
```
