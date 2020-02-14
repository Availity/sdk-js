---
title: Axios Resources
summary: A package providing a base authorizations class to help check which permissions a user has.
---

# Availity API's

## Table of Contents

-   [Intro](#intro)
-   [AvUser](#avuser)
-   [AvRegions](#avregions)
-   [AvPermissions](#avpermissions)
-   [AvUserPermissions](#avuserpermissions)
-   [AvNavigation](#avnavigation)
-   [AvSpaces](#avspaces)
-   [AvOrganizations](#avorganizations)
-   [AvProviders](#avproviders)
-   [AvLogMessage](#avlogmessage)
-   [AvProxy](#avproxy)
-   [AvFiles](#avfiles)
-   [AvFilesDelivery](#avfilesdelivery)
-   [AvSettings](#avsettings)

<!-- ## Intro

View [AvApi](../../README.md) to see the details for configuring API definitions. -->

### `AvUser`

Get information about current logged in user.

#### Exported Classes

```javascript
import AvApi from '../api';

export default class AvUsers extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'users',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

```javascript
    me(config) {
    return this.get('me', config).then(response => response.data);
    }
```

Helper function that returns information about logged in user.

### `AvRegions`

Gets the logged in user's current selected region as well as the regions the user is associated with.

#### Exported Class

```javascript
import AvApi from '../api';

export default class AvRegions extends AvApi {
  constructor({ http, promise, merge, avUsers, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'regions',
      sessionBust: false,
      pageBust: true,
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
    this.avUsers = avUsers;
  }
```

#### Methods

##### `afterUpdate(response)`

```javascript
   afterUpdate(response) {
    this.setPageBust();
    return response;
  }
```

##### `getRegions(config)`

Get regions for logged in user.

```javascript
   getRegions(config) {
    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }
    return this.avUsers.me().then(user => {
      const queryConfig = this.addParams({ userId: user.id }, config);
      return this.query(queryConfig);
    });
  }
```

##### `getCurrentRegion()`

Returns just the current region for the logged in user.

```javascript
   getCurrentRegion() {
    return this.query({
      params: {
        currentlySelected: true,
      },
    });
  }
```

### `AvPermissions`

Get permissions belonging to the logged in user.

#### Exported Class

```javascript
export default class AvPermissions extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'permissions',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

```javascript
   getPermissions(id, region) {
    return this.query({
      params: { id, region },
    });
  }
```

### `AvUserPermissions`

Get permissions as well as resources of the logged in user.

#### Exported Class

```javascript
import qs from 'qs';
import AvApi from '../api';

export default class AvUserPermissions extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/internal',
      name: 'axi-user-permissions',
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

```javascript
   afterQuery(response) {
    return response && response.data && response.data.axiUserPermissions
      ? response.data.axiUserPermissions
      : [];
  }
```

```javascript
   getPermissions(permissionId, region) {
    return this.query({
      params: { permissionId, region },
    });
  }
```

### `AvSpaces`

Get metadata for the various content types for the Spaces platform.

#### Exported Classes

```javascript
import AvApi from '../api';

export default class AvSpaces extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'spaces',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

```javascript
   parseSpaceId(query) {
    const pairs = query.substr(1).split('&');

    let spaceId = '';

    if (Array.isArray(pairs)) {
      pairs.forEach(item => {
        const pair = item.split('=');
        const key = pair[0];
        if (key === 'spaceId') {
          spaceId = pair[1] && decodeURIComponent(pair[1]);
        }
      });
    }
    return spaceId;
  }
```

```javascript
   getSpaceName(spaceId) {
    if (!spaceId) {
      throw new Error('[spaceId] must be defined');
    }
    return this.get(spaceId).then(response => response.data.name);
  }
```

### `AvOrganizations`

Service that allows you to get logged=in user's active organizations.

#### Exported Class

```javascript
import AvApi from '../api';

export default class AvOrganizations extends AvApi {
  constructor({ http, promise, merge, avUsers, config }) {
    const options = {
      path: 'api/sdk/platform',
      name: 'organizations',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });

    this.avUsers = avUsers;
  }
```

#### Methods

#### `queryOrganizations(user, config)`

Returns organizations belonging to the `user`.

```javascript
   queryOrganizations(user, config) {
    const queryConfig = this.addParams({ userId: user.id }, config);
    return this.query(queryConfig);
  }
```

##### `getOrganizations(config)`

Returns organizations belonging to the logged in user.

```javascript
   getOrganizations(config) {
    if (config && config.params && config.params.userId) {
      return this.query(config);
    }

    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }

    return this.avUsers
      .me()
      .then(user => this.queryOrganizations(user, config));
  }
```

### `AvProviders`

Get providers associated to the logged in user's organization.

#### Exported Classes

```javascript
import AvApi from '../api';

export default class AvProviders extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/internal',
      name: 'providers',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

##### `getProviders(customerId, config)`

Helper method that gets the providers for the `customerId`.

```javascript
   getProviders(customerId, config) {
    const queryConfig = this.addParams({ customerId }, config);
    return this.query(queryConfig);
  }
```

##### `normalize(providers)`

Helper method that adds `name` field to the `providers` collection. The name field is computed from other properies of the provider object.

```javascript
   normalize(providers) {
    const cloned = providers.slice();

    cloned.forEach(provider => {
      provider.name = provider.businessName
        ? provider.businessName
        : `${provider.lastName}, ${provider.firstName}`;
    });

    return cloned;
  }
```

### `AvLogMessage`

Create a log message.

#### Exported Class

```javascript
import AvApi from '../api';
import flattenObject from '../flattenObject';

export default class AvLogMessages extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'log-messages',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

All methods take a key value object. A key named 'level` determines the log level type in the logs.

##### `send(level,entires)`

```javascript
   send(level, entries) {
    delete entries.level;
    const payload = { level, entries };
    const flattened = flattenObject(payload);
    return Object.keys(flattened).reduce((accum, key) => {
      accum.append(key, flattened[key]);
      return accum;
    }, new FormData());
  }
```

##### `debug(keyValue)`

```javascript
   debug(entries) {
    return this.sendBeacon(this.send('debug', entries));
  }
```

##### `info(keyValue)`

```javascript
   info(entries) {
    return this.sendBeacon(this.send('info', entries));
  }
```

##### `warn(keyValue)`

```javascript
   warn(entries) {
    return this.sendBeacon(this.send('warn', entries));
  }
```

##### `error(keyValue)`

```javascript
   error(entries) {
    return this.sendBeacon(this.send('error', entries));
  }
```

### `AvPdfs`

#### Exported Class

```javascript

import AvApi from '../api';

export default class AvPdfs extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: 'api/utils',
      name: 'pdfs',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

```javascript
   onPdf(response) {
    window.location = response.data.links.pdf.href;
  }
```

```javascript
   getPdf(data, config) {
    if (!data.applicationId || !data.fileName || !data.html) {
      throw new Error('[applicationId], [fileName] and [html] must be defined');
    }

    return this.post(data, config).then(this.onPdf);
  }
```

### `AvProxy`

Create API definitions for services that are proxied to a tenant's API gateway.

#### Exported Class

```javascript
import AvApi from '../api';

export default class AvProxy extends AvApi {
    constructor({ http, promise, merge, config }) {
        if (!config || !config.tenant) {
            throw new Error('Must specify tenant name for Proxy');
        }
        const options = {
            path: `api/v1/proxy/${config.tenant}`,
            version: '',
            ...config,
        };
        super({
            http,
            promise,
            merge,
            config: options,
        });
    }
}
```

#### Options

##### `tenant`

The Spaces platform customer name which is used as part of the url for API's proxied to 3rd party API gateway.

### `AvFiles`

Upload a file to a bucket in the vault

#### Exported Class

```javascript
   import AvMicroservice from '../ms';

export default class AvFiles extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'core/vault/upload/v1',
      headers: {
        'Content-Type': undefined,
      },
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

#### `uploadFile(data, config)`

Method to upload a file. `data` contains FormData elements with a key of either `reference` (if pointed to an existing file) or `filedata` (if uploading a new file)
`config` should contain `customerId`, `id` (the bucketId), and `clientId`

```javascript
   uploadFile(data, config) {
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

### `AvFilesDelivery`

Upload a batch of files to a designated channel configured on the server.

#### Exported Class

```javascript

import AvMicroservice from '../ms';

export default class AvFilesDelivery extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'platform/file-upload-delivery/v1/batch/deliveries',
      headers: {
        'Content-Type': 'application/json',
      },
      polling: true,
      pollingMethod: 'GET',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

#### `uploadFilesDelivery(data, config)`

Method to upload a batch of file deliveries. `data` contains an array of `deliveries`. Provide the `fileUri` (reference field from AvFiles), `deliveryChannel`, and the required `metadata` for that channel.

```javascript
   uploadFilesDelivery(data, config) {
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

Example `data`:

```html
data = { deliveries: [ { fileURI: upload.references[0], deliveryChannel: 'DEMO',
metadata: { payerId: "PAYERID", requestId: "123", patientLastName: "lastName",
patientFirstName: "firstName" }, } ] };
```

`config` should contain `customerId` and `clientId`

#### Example Response

```html
{ "id": "123456", // batchId "status": "COMPLETE", // COMPLETE/INPROGRESS
"deliveries": [ { "id": "56789", // deliveryId "deliveryBatchId": "123456",
"fileURI":
<fileUri
    >, "deliveryChannel": "DEMO", "deliveryStatus": "ERRORED", //
    INPROGRESS/REJECTED/ERRORED/DELIVERED "errors": [ { "message": "error
    message", "subject": "subject of error" } ], "metadata": { payerId:
    "PAYERID", requestId: "123", patientLastName: "lastName", patientFirstName:
    "firstName" } } ] }</fileUri
>
```

#### `getLocation(response)`

```javascript
   getLocation(response) {
    const baseUrl = super.getLocation(response.config);
    return `${baseUrl}/${response.data.id}`;
  }
```

### `AvSettings`

Store and retrieve settings to be reused.
Use `query(params)` with at least an `applicationId` in the `params` object
Use `update(data)` with at least an `applicationId` in the `scope` object, and key/value pairs of data

#### Exported Class

```javascript
import AvApi from '../api';

export default class AvSettings extends AvApi {
  constructor({ http, promise, merge, avUsers, config }) {
    const options = {
      path: 'api/utils',
      name: 'settings',
      sessionBust: false,
      pageBust: true,
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
    this.avUsers = avUsers;
  }
```

#### Methods

```javascript
   getApplication(applicationId, config) {
    if (!applicationId) {
      throw new Error('applicationId must be defined');
    }
    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }

    if (config && config.params && config.params.userId) {
      const queryConfig = this.addParams({ applicationId }, config);
      return this.query(queryConfig);
    }

    return this.avUsers.me().then(user => {
      const queryConfig = this.addParams(
        { applicationId, userId: user.id },
        config
      );
      return this.query(queryConfig);
    });
  }
```

```javascript
   setApplication(applicationId, data, config) {
    if (!this.avUsers || !this.avUsers.me) {
      throw new Error('avUsers must be defined');
    }

    if (
      typeof applicationId !== 'string' &&
      typeof applicationId !== 'number'
    ) {
      config = data;
      data = applicationId;
      applicationId = '';
    }

    if (!applicationId && (!data || !data.scope || !data.scope.applicationId)) {
      throw new Error('applicationId must be defined');
    }

    if (data && data.scope && data.scope.userId) {
      data.scope.applicationId = applicationId;
      return this.update(data, config);
    }

    return this.avUsers.me().then(user => {
      data = data || {};
      data.scope = data.scope || {};
      data.scope.applicationId = applicationId;
      data.scope.userId = user.id;
      return this.update(data, config);
    });
  }
```

### `AvDisclaimers`

Get disclaimers for payer space

#### Exported Class

```javascript

import AvApi from '../api';

export default class AvDisclaimers extends AvApi {
  constructor({ http, promise, merge, config }) {
    const options = {
      path: '/api/sdk/platform',
      name: '/disclaimers',

      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

```javascript
   getDisclaimers(id, config) {
    const queryConfig = this.addParams({ id }, config);
    return this.query(queryConfig);
  }
```

### `AvSlotMachine`

GraphQL Server containing different queries and mutation

#### Exported Class

```javascript
import AvMicroservice from '../ms';

export default class AvSlotMachine extends AvMicroservice {
  constructor({ http, promise, merge, config }) {
    const options = {
      name: 'spc/slotmachine/graphql',
      ...config,
    };
    super({
      http,
      promise,
      merge,
      config: options,
    });
  }
```

#### Methods

#### `query(data: string)`

```javascript
   query(data, variables) {
    return this.create({ query: data, variables });
  }
```
