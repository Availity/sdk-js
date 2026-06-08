# API Resources

Base resource classes for the Availity REST API. These are HTTP-client-agnostic — pass any `http` function (e.g., axios) via the constructor config.

## Table of Contents

- [AvUser](#avuser)
- [AvRegions](#avregions)
- [AvPermissions](#avpermissions)
- [AvUserPermissions](#avuserpermissions)
- [AvNavigation](#avnavigation)
- [AvSpaces](#avspaces)
- [AvOrganizations](#avorganizations)
- [AvProviders](#avproviders)
- [AvCodes](#avcodes)
- [AvDisclaimers](#avdisclaimers)
- [AvLogMessages](#avlogmessages)
- [AvLogMessagesV2](#avlogmessagesv2)
- [AvLogMessagesV3](#avlogmessagesv3)
- [AvTelemetry](#avtelemetry)
- [AvNotification](#avnotification)
- [AvProxy](#avproxy)
- [AvFiles](#avfiles)
- [AvFilesDelivery](#avfilesdelivery)
- [AvPdf](#avpdf)
- [AvPdfMicroservice](#avpdfmicroservice)
- [AvRouteConfigurations](#avrouteconfigurations)
- [AvSettings](#avsettings)
- [AvStash](#avstash)
- [AvWebQL](#avwebql)

## Usage

All resource classes require an `http` function and accept optional config overrides:

```js
import AvApi, { AvRegions } from '@availity/api-core';

const regions = new AvRegions({ http: axiosInstance, avUsers: usersInstance });
const currentRegion = await regions.getCurrentRegion();
```

---

## AvUser

Get information about the currently logged-in user.

**Path:** `/api/v1/users`

### Methods

#### `me(config)`

Returns the current user's profile data.

```js
const user = await avUsers.me();
// user.id, user.firstName, user.lastName, etc.
```

---

## AvRegions

Get the logged-in user's current selected region and associated regions.

**Path:** `/api/sdk/platform/v1/regions`

### Methods

#### `getRegions(config)`

Get regions for the logged-in user. If `config.params.userId` is provided, skips the `avUsers.me()` call.

#### `getCurrentRegion()`

Returns only the currently selected region.

### Hooks

- `afterUpdate(response)` — Busts the page cache after a region update.
- `getQueryResultKey()` — Always returns `'regions'`.

```js
const regions = await avRegions.getRegions();
const current = await avRegions.getCurrentRegion();
```

---

## AvPermissions

Get permissions belonging to the logged-in user.

**Path:** `/api/sdk/platform/v1/permissions`

### Methods

#### `getPermissions(id, region)`

Query permissions filtered by ID and region.

```js
const perms = await avPermissions.getPermissions('7777', 'FL');
```

---

## AvUserPermissions

Get permissions with associated organizations and resources for the logged-in user.

**Path:** `/cloud/web/appl/feature-management/legacy/v1/user-permissions`

### Methods

#### `getPermissions(permissionId, region)`

Query user permissions by permission ID(s) and region.

```js
const userPerms = await avUserPermissions.getPermissions(['7777', '8888'], 'FL');
```

---

## AvNavigation

Get navigation metadata for Spaces.

**Path:** `/api/sdk/platform/v1/navigation/spaces`

No custom methods — uses the standard `query()` and `get()` from the base class.

---

## AvSpaces

Get metadata for content types on the Spaces platform.

**Path:** `/api/sdk/platform/v1/spaces`

### Methods

#### `parseSpaceId(query)`

Extracts `spaceId` from a query string.

#### `getSpaceName(spaceId)`

Fetches and returns the space name for the given ID.

```js
const spaceId = avSpaces.parseSpaceId('?spaceId=12345&foo=bar');
const name = await avSpaces.getSpaceName(spaceId);
```

---

## AvOrganizations

Get the logged-in user's active organizations with optional permission/resource filtering.

**Path:** `/api/sdk/platform/v1/organizations`

### Methods

#### `queryOrganizations(user, config)`

Returns organizations belonging to the given user.

#### `getOrganizations(config)`

Returns organizations for the logged-in user (calls `avUsers.me()` if no userId in config).

#### `postGet(data, config, additionalPostGetArgs)`

Filters returned organizations by permissions and resources when `additionalPostGetArgs` is provided.

#### `getFilteredOrganizations(additionalPostGetArgs, data)`

Performs permission/resource filtering against `avUserPermissions`.

#### `sanitizeIds(unsanitized)`

Converts number/string/array IDs to string format.

#### `arePermissionsEqual(permissionId)`

Compares a permission set against the previously cached set to determine if a re-fetch is needed.

---

## AvProviders

Get providers associated with an organization.

**Path:** `/api/internal/v1/providers`

### Methods

#### `getProviders(customerId, config)`

Query providers for the given customer ID.

#### `normalize(providers)`

Adds a computed `name` field (`businessName` or `lastName, firstName`) to each provider.

```js
const providers = await avProviders.getProviders('12345');
const normalized = avProviders.normalize(providers.data.providers);
```

---

## AvCodes

Look up Availity proprietary codes.

**Path:** `/api/v1/codes`

No custom methods — uses the standard CRUD operations from the base class.

```js
const response = await avCodes.query({ params: { list: 'MY_LIST', code: '1' } });
```

---

## AvDisclaimers

Get disclaimers for the platform.

**Path:** `/api/sdk/platform/v1/disclaimers`

### Methods

#### `getDisclaimers(id, config)`

Query disclaimers by ID.

```js
const disclaimers = await avDisclaimers.getDisclaimers('disclaimer-abc');
```

---

## AvLogMessages

Send log messages via the legacy logging endpoint using `sendBeacon`.

**Path:** `/api/v1/log-messages`

### Methods

#### `send(level, entries)`

Serializes entries into a URL-encoded string. Returns the encoded string (does not send).

#### `debug(entries)` / `info(entries)` / `warn(entries)` / `error(entries)`

Sends a beacon with the given log level.

```js
avLogMessages.info({ event: 'page_view', page: '/dashboard' });
```

---

## AvLogMessagesV2

Send log messages via the DMA microservice endpoint using `sendBeacon`. Supports `overrides` and filters null values.

**Path:** `/ms/api/availity/internal/spc/analytics/log`

### Methods

Same as [AvLogMessages](#avlogmessages): `send`, `debug`, `info`, `warn`, `error`.

```js
avLogMessagesV2.info({ event: 'click', overrides: { akaName: 'my-app' } });
```

---

## AvLogMessagesV3

Send log messages via the cloud DMA endpoint. Same interface as V2 but routed through the cloud path.

**Path:** `/cloud/web/appl/analytics/log`

### Methods

Same as [AvLogMessagesV2](#avlogmessagesv2): `send`, `debug`, `info`, `warn`, `error`.

---

## AvTelemetry

Send telemetry data via the analytics microservice using `sendBeacon`.

**Path:** `/ms/api/availity/internal/spc/analytics/telemetry`

### Methods

#### `send(level, data)`

Serializes telemetry data (including `telemetryBody`) into a URL-encoded string.

#### `debug(data)` / `info(data)` / `warn(data)` / `error(data)`

Sends a beacon with the given level.

```js
avTelemetry.info({
  customerId: '1194',
  telemetryBody: {
    source_system: 'my-app',
    entries: { event: 'page_load', action: 'render' },
  },
});
```

---

## AvNotification

Manage user notifications.

**Path:** `/api/v1/notifications`

### Methods

#### `deleteByTopic(topic, config)`

Delete all notifications for a given topic.

```js
await avNotifications.deleteByTopic('my-topic-id');
```

---

## AvProxy

Create API definitions for services proxied to a tenant's API gateway.

**Path:** `/api/v1/proxy/{tenant}`

### Options

#### `tenant` (required)

The customer/tenant name used in the proxy URL path.

```js
const proxyApi = new AvProxy({ http, tenant: 'healthplan' });
const response = await proxyApi.query({ params: { foo: 'bar' } });
```

---

## AvFiles

Upload files to a vault bucket.

**Path:** `/ms/api/availity/internal/core/vault/upload/v1`

### Methods

#### `uploadFile(data, config)`

Upload a file. `config` must include `customerId`, `clientId`, and `id` (bucket ID).

---

## AvFilesDelivery

Upload a batch of files to a configured delivery channel.

**Path:** `/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries`

### Methods

#### `uploadFilesDelivery(data, config)`

Submit file deliveries. `config` must include `customerId` and `clientId`.

```js
const data = {
  deliveries: [
    {
      fileURI: 'ref-from-upload',
      deliveryChannel: 'DEMO',
      metadata: { payerId: 'PAYER1', requestId: '123' },
    },
  ],
};
await avFilesDelivery.uploadFilesDelivery(data, { customerId: 'cust1', clientId: 'app1' });
```

---

## AvPdf

Generate PDFs from HTML content via the legacy API.

**Path:** `/api/utils/v1/pdfs`

### Methods

#### `getPdf(data, config)`

Generates a PDF and redirects to it. `data` must include `applicationId`, `fileName`, and `html`.

#### `onPdf(response)`

Redirects the browser to the generated PDF URL.

```js
await avPdf.getPdf({
  applicationId: 'app-123',
  fileName: 'report.pdf',
  html: '<h1>Hello</h1>',
});
```

---

## AvPdfMicroservice

Generate PDFs via the microservice endpoint.

**Path:** `/ms/api/availity/internal/spc/pdf/`

### Overrides

#### `getUrl(config, id)`

Custom URL builder that handles the trailing-slash pattern of this service.

```js
const pdf = new AvPdfMicroservice({ http });
const response = await pdf.create({ html: '<h1>Report</h1>' });
```

---

## AvRouteConfigurations

Look up EDI route configurations.

**Path:** `/ms/api/availity/internal/epdm/configuration-service/epdm/v1/route-configuration`

### Methods

#### `getConfiguration(transactionTypeCode, submissionModeCode, payerId)`

Query route configurations by transaction type, submission mode, and payer.

```js
const config = await avRouteConfigurations.getConfiguration('270', 'RT', 'PAYER1');
```

---

## AvSettings

Store and retrieve application settings per user.

**Path:** `/api/utils/v1/settings`

### Methods

#### `getApplication(applicationId, config)`

Get settings for an application. Resolves the current user if `userId` not provided.

#### `setApplication(applicationId, data, config)`

Create or update settings for an application. Resolves the current user if `userId` not in `data.scope`.

```js
const settings = await avSettings.getApplication('my-app');
await avSettings.setApplication('my-app', {
  scope: {},
  settings: { theme: 'dark' },
});
```

---

## AvStash

Create temporary session data and launch a target URL with the session ID.

**Path:** `/cloud/web/appl/stash/v1/session/data`

### Methods

#### `launch(params, linkTo)`

Creates a stash entry with `params`, then opens `linkTo` with the `sessionId` appended as a query parameter. Returns the session ID.

```js
const sessionId = await avStash.launch(
  { claimId: '12345', payerId: 'BCBS' },
  '/apps/claim-viewer'
);
// Opens: /apps/claim-viewer?sessionId=abc-123
```

---

## AvWebQL

Execute GraphQL queries against the Availity WebQL endpoint.

**Path:** `/ms/api/availity/internal/spc/web/graphql`

No custom methods — use `create()` (POST) with your GraphQL query/variables.

```js
const response = await avWebQL.create({
  query: '{ user { id firstName } }',
});
```
