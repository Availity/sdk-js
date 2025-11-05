# Availity API's

## Table of Contents

- [Intro](#intro)
- [AvUser](#avuser)
- [AvRegions](#avregions)
- [AvPermissions](#avpermissions)
- [AvUserPermissions](#avuserpermissions)
- [AvNavigation](#avnavigation)
- [AvSpaces](#avspaces)
- [AvOrganizations](#avorganizations)
- [AvProviders](#avproviders)
- [AvLogMessage](#avlogmessage)
- [AvProxy](#avproxy)
- [AvFiles](#avfiles)
- [AvFilesDelivery](#avfilesdelivery)
- [AvSettings](#avsettings)

## Intro

View [AvApi](../../README.md) to see the details for configuring API definitions.

### `AvUser`

Get information about current logged in user.

#### Methods

##### `me()`

Helper function that returns information about logged in user.

### `AvRegions`

Gets the logged in user's current selected region as well as the regions the user is associated with.

#### Methods

##### `getRegions(config)`

Get regions for logged in user.

##### `getCurrentRegion()`

Returns just the current region for the logged in user.

### `AvPermissions`

Get permissions belonging to the logged in user.

### `AvUserPermissions`

Get permissions as well as resources of the logged in user.

### `AvSpaces`

Get metadata for the various content types for the Spaces platform.

### `AvOrganizations`

Service that allows you to get logged in user's active organizations.

#### Methods

#### `queryOrganizations(user, config)`

Returns organizations belonging to the `user`.

##### `getOrganizations(config)`

Returns organizations belonging to the logged in user.

##### `postGet(data, config, additionalPostGetArgs)`

Filters the returned organizations by permissions/resources if additionalPostGetArgs are passed

### `AvProviders`

Get providers associated to the logged in user's organization.

#### Methods

##### `getProviders(customerId, config)`

Helper method that gets the providers for the `customerId`.

##### `normalize(providers)`

Helper method that adds `name` field to the `providers` collection. The name field is computed from other properies of the provider object.

### `AvLogMessage`

Create a log message.

#### Methods

All methods take a key value object. A key named 'level` determines the log level type in the logs.

##### `debug(keyValue)`

##### `info(keyValue)`

##### `warn(keyValue)`

##### `error(keyValue)`

### `AvProxy`

Create API definitions for services that are proxied to a tenant's API gateway.

#### Options

##### `tenant`

The Spaces platform customer name which is used as part of the url for API's proxied to 3rd party API gateway.

### `AvFiles`

Upload a file to a bucket in the vault

#### Methods

#### `uploadFile(data, config)`

Method to upload a file. `data` contains FormData elements with a key of either `reference` (if pointed to an existing file) or `filedata` (if uploading a new file)
`config` should contain `customerId`, `id` (the bucketId), and `clientId`

### `AvFilesDelivery`

Upload a batch of files to a designated channel configured on the server.

#### Methods

#### `uploadFilesDelivery(data, config)`

Method to upload a batch of file deliveries. `data` contains an array of `deliveries`. Provide the `fileUri` (reference field from AvFiles), `deliveryChannel`, and the required `metadata` for that channel.

Example `data`:

```js
data = {
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
  "id": "123456", // batchId
  "status": "COMPLETE", // COMPLETE/INPROGRESS
  "deliveries": [
    {
      "id": "56789", // deliveryId
      "deliveryBatchId": "123456",
      "fileURI": "<fileUri>",
      "deliveryChannel": "DEMO",
      "deliveryStatus": "ERRORED", // INPROGRESS/REJECTED/ERRORED/DELIVERED
      "errors": [
        {
          "message": "error message",
          "subject": "subject of error"
        }
      ],
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

### `AvSettings`

Store and retrieve settings to be reused.
Use `query(params)` with at least an `applicationId` in the `params` object
Use `update(data)` with at least an `applicationId` in the `scope` object, and key/value pairs of data


#### methods

`query(data: string)`
